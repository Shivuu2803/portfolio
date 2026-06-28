"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "@/content";

/** Parses "99.9%" / "50+" / "<500ms" into a numeric target + prefix/suffix. */
function parse(value: string) {
  const match = value.match(/[\d.]+/);
  if (!match) return { num: null as number | null, prefix: "", suffix: "", raw: value };
  const num = parseFloat(match[0]);
  const idx = match.index ?? 0;
  return {
    num,
    prefix: value.slice(0, idx),
    suffix: value.slice(idx + match[0].length),
    decimals: match[0].includes(".") ? 1 : 0,
    raw: value,
  };
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");
  const parsed = parse(value);

  useEffect(() => {
    if (!inView || parsed.num === null) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.num, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(parsed.prefix + v.toFixed(parsed.decimals) + parsed.suffix);
      },
    });
    return () => controls.stop();
  }, [inView, value, parsed.num, parsed.prefix, parsed.suffix, parsed.decimals]);

  return (
    <span ref={ref}>{parsed.num === null ? value : display}</span>
  );
}

export default function Stats({ tinted }: { tinted?: boolean }) {
  return (
    <section className={tinted ? "bg-surface/60" : ""}>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-void p-8 text-center lg:text-left">
            <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
              <Counter value={s.value} />
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink">
              {s.label}
            </p>
            <p className="mt-1 text-sm text-muted">{s.context}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
