import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the PetCost Calculator team.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1E3A5F] text-white py-16">
        <div className="container-xl max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-blue-200 text-lg">Questions, feedback, or data corrections? We'd love to hear from you.</p>
        </div>
      </div>
      <div className="container-xl max-w-3xl py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-[#0f172a] mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#1E3A5F] mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-[#0f172a]">Email</div>
                <a href="mailto:hello@petcost-calculator.com" className="text-sm text-[#1E3A5F] hover:underline">hello@petcost-calculator.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-[#1E3A5F] mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-[#0f172a]">Response time</div>
                <div className="text-sm text-slate-500">We aim to respond within 1–2 business days.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-bold text-[#0f172a] mb-4">Send a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your name" className="input-field" />
            <input type="email" placeholder="Your email" className="input-field" />
            <textarea placeholder="Your message..." rows={4} className="input-field resize-none" />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
