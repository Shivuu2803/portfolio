import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { testimonials } from "@/content";

export default function Testimonials() {
  const hasAny = testimonials.length > 0;

  return (
    <Section id="testimonials" eyebrow="Recommendations" title="What people say">
      {hasAny ? (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <TiltCard className="h-full">
                <figure className="h-full rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-signal/40 sm:p-8">
                  <blockquote className="text-lg leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-mono text-sm text-muted">
                    <span className="text-signal">{t.author}</span> · {t.title}
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-dashed border-line bg-surface/20 p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,var(--glow-signal),transparent_60%)]" />
            <p className="mx-auto max-w-xl leading-relaxed text-muted">
              Kind words from people I&apos;ve built with — managers, teammates, and
              collaborators.
            </p>
            <p className="mt-6 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-signal">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              coming soon
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
