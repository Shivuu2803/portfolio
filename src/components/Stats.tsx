"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { TiltCard } from "./TiltCard";
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
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s) => (
          // max={0}: spotlight-only, no rotation — keeps the hairline grid seams flush
          <TiltCard key={s.label} max={0} className="group h-full">
            <div className="relative h-full overflow-hidden bg-void p-5 text-center transition-colors duration-300 group-hover:bg-surface/60 sm:p-8 lg:text-left">
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
              <div className="font-display text-3xl font-bold text-gradient transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl lg:text-5xl">
                <Counter value={s.value} />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink sm:text-xs">
                {s.label}
              </p>
              <p className="mt-1 text-sm text-muted">{s.context}</p>
            </div>
          </TiltCard>
        ))}
        </div>
      </div>
    </section>
  );
}
