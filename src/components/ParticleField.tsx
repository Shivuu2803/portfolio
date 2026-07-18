"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient hero visual — a drifting field of glowing particles, no labels
 * or structure (that's what OrchestrationGraph in About is for). Particles
 * ease away from the cursor and brighten near it. Reads the live theme so
 * it adapts to light/dark, and freezes to a static frame under
 * prefers-reduced-motion.
 */

type Particle = {
  x: number;
  y: number;
  z: number; // depth: 0 (far, small, dim) .. 1 (near, big, bright)
  baseX: number;
  baseY: number;
  driftSeed: number;
  dx: number; // live offset from cursor repulsion
  dy: number;
  mint: boolean;
};

type Palette = {
  signalRgb: string;
  mintRgb: string;
};

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
  return {
    signalRgb: toRgb(get("--c-signal", "#4f8fff"), "79, 143, 255"),
    mintRgb: toRgb(get("--c-mint", "#5eead4"), "94, 234, 212"),
  };
}

const COUNT = 70;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const particles: Particle[] = [];

    function buildParticles() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const z = Math.random();
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          driftSeed: Math.random() * Math.PI * 2,
          dx: 0,
          dy: 0,
          mint: Math.random() < 0.16,
        });
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

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

    let raf = 0;
    let tick = 0;

    function frame() {
      tick++;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        // slow independent float, farther particles drift less
        if (!reduced) {
          const amp = 6 + p.z * 10;
          p.baseX += Math.cos(tick * 0.003 + p.driftSeed) * 0.02 * amp * 0.02;
          p.baseY += Math.sin(tick * 0.004 + p.driftSeed) * 0.02 * amp * 0.02;
        }

        let targetX = 0;
        let targetY = 0;
        if (pointer.active && !reduced) {
          const ddx = p.baseX - pointer.x;
          const ddy = p.baseY - pointer.y;
          const dist = Math.hypot(ddx, ddy);
          const reach = 130;
          if (dist < reach) {
            const f = (1 - dist / reach) * (10 + p.z * 14);
            targetX = (ddx / (dist || 1)) * f;
            targetY = (ddy / (dist || 1)) * f;
          }
        }
        p.dx += (targetX - p.dx) * 0.08;
        p.dy += (targetY - p.dy) * 0.08;

        const x = p.baseX + p.dx;
        const y = p.baseY + p.dy;
        const near =
          pointer.active && Math.hypot(pointer.x - x, pointer.y - y) < 130;

        const r = 0.8 + p.z * 1.8;
        const rgb = p.mint ? COL.mintRgb : COL.signalRgb;
        const baseAlpha = 0.15 + p.z * 0.45;
        const alpha = near ? Math.min(1, baseAlpha + 0.35) : baseAlpha;

        const glow = ctx!.createRadialGradient(x, y, 0, x, y, r * (near ? 5 : 3.2));
        glow.addColorStop(0, `rgba(${rgb}, ${alpha})`);
        glow.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, r * (near ? 5 : 3.2), 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${rgb}, ${Math.min(1, alpha + 0.25)})`;
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fill();
      }

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
    <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
  );
}
