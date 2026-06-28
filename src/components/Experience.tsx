import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { experience } from "@/content";

export default function Experience({ tinted }: { tinted?: boolean }) {
  return (
    <Section id="experience" eyebrow="Trajectory" title="Where I've shipped" tinted={tinted}>
      <div className="relative">
        {/* vertical line — desktop only; mobile is centered without a rail */}
        <div className="absolute left-[120px] top-2 bottom-2 hidden w-px bg-line md:block" />
        <div className="space-y-12">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.1}>
              <div className="relative grid grid-cols-1 gap-4 text-center md:grid-cols-[120px_1fr] md:gap-8 md:text-left">
                {/* node — desktop only */}
                <span
                  className={`absolute left-[113px] top-1.5 hidden h-4 w-4 rounded-full border-2 md:block ${
                    job.status === "current"
                      ? "border-signal bg-signal/30"
                      : "border-line bg-surface"
                  }`}
                >
                  {job.status === "current" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-signal/40" />
                  )}
                </span>

                <p className="font-mono text-xs uppercase tracking-widest text-muted md:pr-7 md:text-right">
                  {job.period}
                </p>

                <div className="md:pl-8">
                  <div className="flex flex-wrap items-baseline justify-center gap-x-3 md:justify-start">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {job.role}
                    </h3>
                    <span className="font-mono text-sm text-signal">@ {job.company}</span>
                  </div>
                  <p className="mx-auto mt-2 max-w-2xl leading-relaxed text-muted md:mx-0">
                    {job.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex justify-center gap-3 text-sm leading-relaxed text-muted md:justify-start"
                      >
                        <span className="mt-1 hidden shrink-0 text-signal md:inline">▹</span>
                        <span className="max-w-prose">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
