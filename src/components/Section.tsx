import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
  tinted = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${tinted ? "bg-surface/60" : ""}`}
    >
      <div className={`mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24 ${className}`}>
        {(eyebrow || title) && (
          <Reveal>
            <div className="mb-8 text-center sm:mb-12">
              {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
              {title && (
                <h2 className="font-display text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h2>
              )}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
