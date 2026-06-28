"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Web3Forms access key — submissions email straight to the configured inbox.
// To change the destination, create a new form at https://web3forms.com and
// swap this key. (Public by design; it only allows submitting to your form.)
const ACCESS_KEY = "3d75a066-8318-4916-a921-214ede922dc6";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New message from your portfolio");
    data.append("from_name", "Portfolio Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please email me directly.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't send right now. Please email me directly.");
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-line bg-surface/60 px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-signal focus:outline-none";

  return (
    <div className="mx-auto mt-12 max-w-xl text-left">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-mint/40 bg-mint/[0.06] p-8 text-center"
          >
            <p className="font-display text-xl font-semibold text-ink">
              Message sent — thanks.
            </p>
            <p className="mt-2 text-muted">
              I&apos;ll get back to you soon. In the meantime, feel free to connect on
              LinkedIn.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-5 font-mono text-xs uppercase tracking-widest text-signal hover:text-ink"
            >
              ← Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className={`${fieldClass} resize-none`}
              />
            </div>

            {/* honeypot — bots fill this, humans don't */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
            />

            {status === "error" && (
              <p className="font-mono text-xs text-warn">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-signal px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-void transition-all hover:shadow-[0_0_30px_0_rgba(79,143,255,0.45)] disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
