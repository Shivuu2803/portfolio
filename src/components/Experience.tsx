import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { renderEmphasis } from "@/lib/emphasis";
import { experience } from "@/content";

export default function Experience({ tinted }: { tinted?: boolean }) {
  return (
    <Section id="experience" eyebrow="Trajectory" title="Where I've shipped" tinted={tinted}>
      <div className="relative">
        {/* vertical line — desktop only; mobile gets bordered cards instead of a rail */}
        <div className="absolute left-[120px] top-2 bottom-2 hidden w-px bg-line md:block" />
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.1}>
              <div className="group relative grid grid-cols-1 gap-4 rounded-2xl border border-line bg-surface/40 p-5 text-center transition-colors sm:p-6 md:grid-cols-[120px_1fr] md:gap-8 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-left">
                {/* node — desktop only */}
                <span
                  className={`absolute left-[113px] top-1.5 hidden h-4 w-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-110 md:block ${
                    job.status === "current"
                      ? "border-signal bg-signal/30"
                      : "border-line bg-surface"
                  }`}
                >
                  {job.status === "current" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-signal/40" />
                  )}
                </span>

                {/* period + current badge — badge only shown here on mobile, where the desktop ping-node isn't visible */}
                <div className="flex items-center justify-center gap-3 md:block md:pr-7 md:text-right">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {job.period}
                  </p>
                  {job.status === "current" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal md:hidden">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                      Current
                    </span>
                  )}
                </div>

                <div className="md:pl-8">
                  <div className="flex flex-wrap items-baseline justify-center gap-x-3 transition-transform duration-300 group-hover:translate-x-1 md:justify-start">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {job.role}
                    </h3>
                    <span className="font-mono text-sm text-signal">@ {job.company}</span>
                  </div>
                  <p className="mx-auto mt-2 max-w-2xl leading-relaxed text-muted md:mx-0">
                    {job.summary}
                  </p>
                  <ul className="mt-4 space-y-2 text-left">
                    {job.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="group/bullet flex gap-3 text-sm leading-relaxed text-muted transition-colors duration-300 hover:text-ink"
                      >
                        <span className="mt-1 shrink-0 text-signal transition-transform duration-300 group-hover/bullet:translate-x-1">
                          ▹
                        </span>
                        <span className="max-w-prose">{renderEmphasis(h)}</span>
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
