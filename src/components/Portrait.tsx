"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content";

/**
 * Hero portrait — signal-blue framed photo.
 *
 * TO ADD YOUR REAL PHOTO:
 *   1. Drop the image in /public (e.g. public/me.jpg).
 *   2. Set profile.photo in content.ts to "/me.jpg".
 * Until then this renders a styled placeholder so the layout is ready.
 */
export default function Portrait() {
  const hasPhoto = Boolean(profile.photo);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[360px]"
    >
      {/* ambient glow behind the frame */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-signal/15 blur-3xl" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-signal/40 bg-surface">
        {/* corner ticks for the tech-frame feel */}
        <span className="absolute left-3 top-3 z-10 h-4 w-4 border-l border-t border-signal/60" />
        <span className="absolute right-3 top-3 z-10 h-4 w-4 border-r border-t border-signal/60" />
        <span className="absolute bottom-3 left-3 z-10 h-4 w-4 border-b border-l border-signal/60" />
        <span className="absolute bottom-3 right-3 z-10 h-4 w-4 border-b border-r border-signal/60" />

        {hasPhoto ? (
          <Image
            src={profile.photo as string}
            alt={profile.name}
            fill
            priority
            sizes="(max-width: 768px) 80vw, 360px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-grid">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-signal/40 bg-signal/10 font-display text-3xl font-bold text-signal">
              {profile.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              your photo here
            </p>
          </div>
        )}

        {/* subtle bottom gradient so text/labels read on any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void/70 to-transparent" />

        {/* status chip */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          {profile.location}
        </div>
      </div>
    </motion.div>
  );
}
