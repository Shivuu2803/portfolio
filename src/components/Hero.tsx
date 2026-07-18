"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content";
import { MagneticButton } from "./MagneticButton";
import ParticleField from "./ParticleField";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const word = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -40 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: graph & glow drift up slightly as you scroll past the hero.
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const graphY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nameWords = profile.name.split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-svh overflow-hidden bg-grid pt-28"
    >
      {/* ambient radial glow (parallax) */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <motion.div
        style={{ opacity: copyOpacity }}
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6"
      >
        {/* Left: copy */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          {/* Name — word-by-word reveal */}
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            className="font-display text-4xl font-bold leading-[1.05] [perspective:600px] sm:text-5xl lg:text-6xl"
          >
            {nameWords.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                className="mr-[0.25em] inline-block origin-bottom"
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-signal"
          >
            {profile.role}
          </motion.p>

          <motion.p
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-8 max-w-xl text-balance text-xl leading-relaxed text-ink sm:text-2xl lg:mx-0"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            custom={5}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-lg leading-relaxed text-muted lg:mx-0"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            custom={6}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton
              href="#projects"
              className="inline-block rounded-full bg-signal px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-void shadow-[0_0_0_0_rgba(79,143,255,0.5)] transition-shadow hover:shadow-[0_0_30px_0_rgba(79,143,255,0.45)]"
            >
              View the work
            </MagneticButton>
            <MagneticButton
              href={profile.links.cv}
              download
              target="_blank"
              rel="noreferrer"
              strength={0.25}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-signal hover:text-signal"
            >
              Download CV
              <span aria-hidden="true">↓</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: ambient particle field — desktop only, keeps mobile focused on copy */}
        <motion.div
          style={{ y: graphY }}
          className="hidden lg:order-2 lg:mx-auto lg:block lg:aspect-4/5 lg:w-full lg:max-w-105"
        >
          <ParticleField />
        </motion.div>
      </motion.div>

      {/* scroll cue — jumps to the next section */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-ink"
      >
        scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-signal"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
