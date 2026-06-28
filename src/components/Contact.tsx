import { Reveal } from "./Reveal";
import ContactForm from "./ContactForm";
import { profile } from "@/content";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <Reveal>
          <p className="eyebrow mb-6">Contact</p>
          <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Let&apos;s build something that <span className="text-gradient">stays up</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Open to interesting problems in infrastructure, fintech, and applied AI.
            Drop me a line below — or email me directly.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />

          <p className="mt-8 text-center text-sm text-muted">
            Prefer email?{" "}
            <a
              href={profile.links.email}
              className="text-signal underline-offset-4 hover:underline"
            >
              {profile.email}
            </a>
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 font-mono text-xs uppercase tracking-widest">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-signal"
            >
              GitHub ↗
            </a>
            <span className="text-line">·</span>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-signal"
            >
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
