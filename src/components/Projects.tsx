"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { TiltCard } from "./TiltCard";
import { projects } from "@/content";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="What I've built">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/40 transition-colors hover:border-signal/50">
                {/* screenshot cover */}
                <div className="relative aspect-16/10 overflow-hidden bg-void">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void/80 via-void/10 to-transparent" />
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
      </div>
    </Section>
  );
}
