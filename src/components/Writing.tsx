import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { articles } from "@/content";

export default function Writing({ tinted }: { tinted?: boolean }) {
  return (
    <Section id="writing" eyebrow="Writing" title="Notes from the stack" tinted={tinted}>
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((a, i) => (
          <Reveal key={a.href} delay={i * 0.08}>
            <TiltCard className="h-full">
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group/link flex h-full flex-col rounded-xl border border-line bg-surface/40 p-6 text-center transition-colors hover:border-signal/50 sm:p-7 lg:text-left"
              >
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted">
                  <span className="text-signal">{a.platform}</span>
                  <span>
                    {a.date} · {a.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                  {a.title}
                </h3>

                <p className="mt-3 flex-1 leading-relaxed text-muted">{a.blurb}</p>

                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
                  Read on {a.platform}
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
