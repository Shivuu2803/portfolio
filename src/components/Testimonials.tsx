import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { testimonials } from "@/content";

export default function Testimonials() {
  const hasAny = testimonials.length > 0;

  return (
    <Section id="testimonials" eyebrow="Recommendations" title="What people say">
      {hasAny ? (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="h-full rounded-xl border border-line bg-surface/40 p-8">
                <blockquote className="text-lg leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 font-mono text-sm text-muted">
                  <span className="text-signal">{t.author}</span> · {t.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="rounded-xl border border-dashed border-line bg-surface/20 p-12 text-center">
            <p className="mx-auto max-w-xl leading-relaxed text-muted">
              Kind words from people I&apos;ve built with — managers, teammates, and
              collaborators.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-signal">
              // coming soon
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
