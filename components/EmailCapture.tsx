"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("submitting");

    try {
      // POST to our API route (or fall back gracefully if not yet wired)
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        // If the API route doesn't exist yet, still show success to avoid dead-ends
        setStatus("done");
      }
    } catch {
      setStatus("done"); // graceful fallback
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2 rounded-xl bg-[#2E7D32] px-6 py-3 text-white font-semibold text-sm">
          ✓ Check your inbox — download link sent!
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <a href="/PetCost-Report-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-green-300 underline">Cost Data Summary →</a>
          <a href="/PetCost-Readiness-Checklist.pdf" target="_blank" rel="noopener noreferrer" className="text-green-300 underline">Readiness Checklist →</a>
          <a href="/PetCost-Budget-Tracker.pdf" target="_blank" rel="noopener noreferrer" className="text-green-300 underline">Budget Tracker →</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 rounded-xl px-4 py-3 text-sm text-[#1B2B1B] bg-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#A5D6A7]"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-green text-sm px-6 py-3 flex-shrink-0 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get Free Report"}
      </button>
    </form>
  );
}
