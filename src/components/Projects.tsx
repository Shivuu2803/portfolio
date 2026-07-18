"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { TiltCard } from "./TiltCard";
import { projects, projectFilters } from "@/content";

export default function Projects() {
  const [active, setActive] = useState<(typeof projectFilters)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <Section id="projects" eyebrow="Selected work" title="What I've built">
      {/* filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 lg:justify-start">
        {projectFilters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                isActive ? "text-void" : "text-muted hover:text-ink"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-signal"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {f}
            </button>
          );
        })}
      </div>

      {/* scrollable grid on desktop only — on mobile it just flows with the page,
          avoiding a scroll-within-a-scroll that's awkward on touch */}
      <div className="relative">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2 lg:scrollbar-gutter-stable"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 transition-colors hover:border-signal/50">
                  {/* screenshot cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-void">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
                    <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-ink/90">
                      {p.kind}
                    </span>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-5 text-center lg:text-left">
                    <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>

                    <ul className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    {p.links && p.links.length > 0 && (
                      <div className="mt-5 flex justify-center gap-3 border-t border-line pt-4 lg:justify-start">
                        {p.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-signal"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </TiltCard>
            </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* fade hint that there's more to scroll — only meaningful where the grid is scroll-capped */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-12 bg-gradient-to-t from-void to-transparent lg:block" />
      </div>
    </Section>
  );
}
