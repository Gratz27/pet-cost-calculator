"use client";

import { useState } from "react";

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}

export default function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", topic: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.email.includes("@") || !fields.message.trim()) return;
    setStatus("submitting");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...fields }),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[280px]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9]">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="font-bold text-[#1B2B1B]">Message sent!</h3>
        <p className="text-sm text-[#5a7a5a]">Thanks for getting in touch. We&apos;ll get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={fields.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={fields.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <select
          name="topic"
          value={fields.topic}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="">Topic — select one</option>
          <option value="data">Data correction</option>
          <option value="feedback">General feedback</option>
          <option value="partnership">Partnership enquiry</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="message"
          placeholder="Your message..."
          rows={4}
          value={fields.message}
          onChange={handleChange}
          required
          className="input-field resize-none"
        />
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong — please try emailing us directly at hello@petcost-calculator.com</p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
