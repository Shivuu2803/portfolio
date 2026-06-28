import { Section } from "./Section";
import { Reveal } from "./Reveal";
import OrchestrationGraph from "./OrchestrationGraph";
import { about } from "@/content";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="The unglamorous parts">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        {/* Left: copy + current focus */}
        <div className="space-y-8">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-center text-lg leading-relaxed text-muted lg:text-left [&_strong]:text-ink">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="rounded-lg border border-line bg-surface/40 p-6 text-center font-mono text-sm lg:text-left">
              <p className="mb-4 text-xs uppercase tracking-widest text-signal">
                // current focus
              </p>
              <ul className="grid gap-3 text-muted sm:grid-cols-2">
                <li className="flex justify-center gap-3 lg:justify-start">
                  <span className="text-signal">→</span> Backend services &amp; APIs
                </li>
                <li className="flex justify-center gap-3 lg:justify-start">
                  <span className="text-signal">→</span> Resilient third-party integrations
                </li>
                <li className="flex justify-center gap-3 lg:justify-start">
                  <span className="text-signal">→</span> Internal tooling &amp; dashboards
                </li>
                <li className="flex justify-center gap-3 lg:justify-start">
                  <span className="text-signal">→</span> Full-stack product work
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right: the live orchestration graph */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <OrchestrationGraph />
            <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className="text-signal">●</span> live orchestration · routes around failure
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
