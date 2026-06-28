"use client";

import { motion } from "framer-motion";

/**
 * Personal monogram — interlocked "S" and "M" rendered as gradient strokes.
 * The paths draw themselves in on mount; the mark sits in a subtle rounded
 * frame. Reduced-motion users simply see the finished monogram.
 */
export default function LogoMark({ size = 32 }: { size?: number }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 0.2, delay: 0.15 * i },
      },
    }),
  };

  return (
    <span
      className="relative flex items-center justify-center rounded-lg border border-line bg-surface/60 transition-colors duration-300 group-hover:border-signal/50"
      style={{ width: size + 8, height: size + 8 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mono-grad" x1="4" y1="6" x2="36" y2="34">
            <stop offset="0%" stopColor="#4f8fff" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>

        {/* M — drawn first, sits behind as the wider letter */}
        <motion.path
          d="M7 31 L7 13 L16 25 L25 13 L25 31"
          stroke="url(#mono-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          variants={draw}
          custom={1}
          initial="hidden"
          animate="visible"
        />

        {/* S — drawn on top, overlapping the right of the M */}
        <motion.path
          d="M33 13 C33 10, 28 9, 25 11 C22 13, 23 17, 27 18.5 C31 20, 32 24, 29 26 C26 28, 21 27, 21 24"
          stroke="url(#mono-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={draw}
          custom={0}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </span>
  );
}
