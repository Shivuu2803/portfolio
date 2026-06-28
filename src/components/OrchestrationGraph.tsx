"use client";

import { useEffect, useRef } from "react";

/**
 * The signature element: a live resilient-systems graph.
 * A central gateway routes traffic to service nodes. Packets pulse along
 * healthy edges in blue. Periodically a node "fails" (turns amber, edge dims)
 * and traffic visibly reroutes around it — the resilience mindset, visualized.
 *
 * Abstract by design: no product names or real service identities.
 * Honors prefers-reduced-motion: freezes to a static, all-healthy state.
 */

type Node = {
  id: number;
  label: string;
  angle: number;
  radius: number;
  x: number; // base position
  y: number;
  dx: number; // live offset (eased toward cursor pull)
  dy: number;
  failed: boolean;
  failTimer: number;
};

type Packet = {
  nodeId: number;
  t: number; // 0..1 along edge
  dir: 1 | -1; // outbound or returning
  speed: number;
};

// Abstract service labels — intentionally generic, no real product/vendor names.
const SERVICE_LABELS = [
  "SVC 01",
  "SVC 02",
  "SVC 03",
  "SVC 04",
  "SVC 05",
  "SVC 06",
  "SVC 07",
  "SVC 08",
  "SVC 09",
  "SVC 10",
];

type Palette = {
  void: string;
  signal: string;
  signalRgb: string;
  warn: string;
  warnRgb: string;
  mint: string;
  ink: string;
  muted: string;
};

// Read the live theme colors from CSS variables so the graph adapts to
// light/dark. Falls back to dark values if anything is unavailable.
function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const get = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
  const toRgb = (hex: string, fallback: string) => {
    const m = hex.replace("#", "");
    if (m.length !== 6) return fallback;
    const r = parseInt(m.slice(0, 2), 16);
    const g = parseInt(m.slice(2, 4), 16);
    const b = parseInt(m.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };
  const signal = get("--c-signal", "#4f8fff");
  const warn = get("--c-warn", "#ff7a45");
  return {
    void: get("--c-void", "#0a0e14"),
    signal,
    signalRgb: toRgb(signal, "79, 143, 255"),
    warn,
    warnRgb: toRgb(warn, "255, 122, 69"),
    mint: get("--c-mint", "#5eead4"),
    ink: get("--c-ink", "#e6edf5"),
    muted: get("--c-muted", "#7d8794"),
  };
}

export default function OrchestrationGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Live palette — rebuilt whenever the theme class changes.
    let COL = readPalette();
    const themeObserver = new MutationObserver(() => {
      COL = readPalette();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cx = 0;
    let cy = 0;

    const nodes: Node[] = [];
    const packets: Packet[] = [];

    function buildNodes() {
      nodes.length = 0;
      const count = SERVICE_LABELS.length;
      // radius scales with the smaller dimension so it always fits
      const base = Math.min(width, height) * 0.36;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        nodes.push({
          id: i,
          label: SERVICE_LABELS[i],
          angle,
          radius: base,
          x: cx + Math.cos(angle) * base,
          y: cy + Math.sin(angle) * base,
          dx: 0,
          dy: 0,
          failed: false,
          failTimer: 0,
        });
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer tracking — nodes lean toward the cursor while it's over the graph.
    let pointer = { x: -9999, y: -9999, active: false };
    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    if (!reduced) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    // Seed packets — a few in flight per node
    function spawnPacket() {
      const healthy = nodes.filter((n) => !n.failed);
      if (!healthy.length) return;
      const n = healthy[Math.floor((tick * 13.37) % healthy.length)];
      packets.push({
        nodeId: n.id,
        t: 0,
        dir: 1,
        speed: 0.006 + ((n.id * 7) % 5) * 0.001,
      });
    }

    let raf = 0;
    let tick = 0;
    let failCooldown = 180;

    function frame() {
      tick++;
      ctx!.clearRect(0, 0, width, height);

      // Occasionally fail a node, then heal it (skip when reduced motion)
      if (!reduced) {
        failCooldown--;
        if (failCooldown <= 0) {
          const candidates = nodes.filter((n) => !n.failed);
          if (candidates.length > 1) {
            const victim = candidates[Math.floor((tick * 2.71) % candidates.length)];
            victim.failed = true;
            victim.failTimer = 120 + Math.floor((tick * 1.3) % 90);
          }
          failCooldown = 220 + Math.floor((tick * 0.7) % 160);
        }
        for (const n of nodes) {
          if (n.failed) {
            n.failTimer--;
            if (n.failTimer <= 0) n.failed = false;
          }
        }
      }

      // Ease each node's offset toward the cursor (closer = stronger pull).
      for (const n of nodes) {
        let targetX = 0;
        let targetY = 0;
        if (pointer.active) {
          const ddx = pointer.x - n.x;
          const ddy = pointer.y - n.y;
          const dist = Math.hypot(ddx, ddy);
          const reach = 160;
          if (dist < reach) {
            const f = (1 - dist / reach) * 14; // up to 14px pull
            targetX = (ddx / (dist || 1)) * f;
            targetY = (ddy / (dist || 1)) * f;
          }
        }
        n.dx += (targetX - n.dx) * 0.12;
        n.dy += (targetY - n.dy) * 0.12;
      }

      const lx = (n: Node) => n.x + n.dx;
      const ly = (n: Node) => n.y + n.dy;

      // Draw edges
      for (const n of nodes) {
        const near =
          pointer.active && Math.hypot(pointer.x - lx(n), pointer.y - ly(n)) < 140;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(lx(n), ly(n));
        if (n.failed) {
          ctx!.strokeStyle = `rgba(${COL.warnRgb}, 0.18)`;
          ctx!.setLineDash([4, 6]);
          ctx!.lineWidth = 1;
        } else {
          ctx!.strokeStyle = near
            ? `rgba(${COL.signalRgb}, 0.4)`
            : `rgba(${COL.signalRgb}, 0.16)`;
          ctx!.setLineDash([]);
          ctx!.lineWidth = near ? 1.4 : 1;
        }
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      // Spawn / advance packets
      if (!reduced && tick % 6 === 0) spawnPacket();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const n = nodes[p.nodeId];
        if (n.failed) {
          packets.splice(i, 1);
          continue;
        }
        p.t += p.speed * p.dir;
        if (p.t >= 1) {
          p.dir = -1;
          p.t = 1;
        }
        if (p.t <= 0 && p.dir === -1) {
          packets.splice(i, 1);
          continue;
        }
        const px = cx + (lx(n) - cx) * p.t;
        const py = cy + (ly(n) - cy) * p.t;
        const glow = ctx!.createRadialGradient(px, py, 0, px, py, 6);
        glow.addColorStop(0, p.dir === 1 ? COL.signal : COL.mint);
        glow.addColorStop(1, `rgba(${COL.signalRgb}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(px, py, 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = p.dir === 1 ? COL.signal : COL.mint;
        ctx!.beginPath();
        ctx!.arc(px, py, 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw service nodes
      for (const n of nodes) {
        const nx = lx(n);
        const ny = ly(n);
        const c = n.failed ? COL.warn : COL.signal;
        const pulse = reduced ? 0 : Math.sin(tick * 0.05 + n.id) * 0.5 + 0.5;
        const r = 5 + (n.failed ? 0 : pulse * 1.2);

        // ring
        ctx!.beginPath();
        ctx!.arc(nx, ny, r + 4, 0, Math.PI * 2);
        ctx!.strokeStyle = n.failed
          ? `rgba(${COL.warnRgb}, 0.35)`
          : `rgba(${COL.signalRgb}, 0.3)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // core
        ctx!.beginPath();
        ctx!.arc(nx, ny, r, 0, Math.PI * 2);
        ctx!.fillStyle = c;
        ctx!.fill();

        // label — anchored just beyond the base position so it stays legible
        ctx!.font = "9px var(--font-mono), monospace";
        ctx!.fillStyle = n.failed ? COL.warn : COL.muted;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        const labelX = cx + Math.cos(n.angle) * (n.radius + 18) + n.dx;
        const labelY = cy + Math.sin(n.angle) * (n.radius + 18) + n.dy;
        ctx!.fillText(n.label, labelX, labelY);
      }

      // Central hub (gateway)
      const hubPulse = reduced ? 0.5 : Math.sin(tick * 0.04) * 0.5 + 0.5;
      const hubGlow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 40);
      hubGlow.addColorStop(0, `rgba(${COL.signalRgb}, ${0.25 + hubPulse * 0.15})`);
      hubGlow.addColorStop(1, `rgba(${COL.signalRgb}, 0)`);
      ctx!.fillStyle = hubGlow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.beginPath();
      ctx!.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx!.fillStyle = COL.void;
      ctx!.fill();
      ctx!.strokeStyle = COL.signal;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      ctx!.font = "700 9px var(--font-mono), monospace";
      ctx!.fillStyle = COL.ink;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText("GATEWAY", cx, cy);

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
