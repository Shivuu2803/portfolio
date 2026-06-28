import { profile } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>© 2026 {profile.name}</p>

        <p className="uppercase tracking-widest">
          SDE · {profile.location}
        </p>

        <a href="#top" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
