import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { skills } from "@/content";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="What I work with">
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <TiltCard max={5} className="group h-full">
              <div
                className={`relative h-full min-h-40 overflow-hidden rounded-xl border p-6 transition-colors ${
                  group.highlight
                    ? "border-signal/40 bg-signal/[0.04]"
                    : "border-line bg-surface/40 group-hover:border-signal/30"
                }`}
              >
                {/* accent line that grows in on hover */}
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />

                <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      group.highlight ? "animate-pulse bg-signal" : "bg-muted"
                    }`}
                  />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-ink">
                    {group.label}
                  </h3>
                  {group.highlight && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                      primary
                    </span>
                  )}
                </div>
                <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`cursor-default rounded-full border px-3.5 py-1.5 font-mono text-sm transition-all hover:-translate-y-0.5 ${
                        group.highlight
                          ? "border-signal/30 text-ink hover:border-signal hover:bg-signal/10"
                          : "border-line text-muted hover:border-signal/50 hover:text-ink"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
