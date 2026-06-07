import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us – PetCost-Calculator",
  description: "Get in touch with the PetCost-Calculator team for questions, feedback, or data corrections.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white py-14">
        <div className="container-xl max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-green-200 text-lg">Questions, feedback, or data corrections? We&apos;d love to hear from you.</p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-[#1B2B1B] mb-5">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5E9] flex-shrink-0">
                <Mail className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1B2B1B]">Email</div>
                <a href="mailto:hello@petcost-calculator.com" className="text-sm text-[#2E7D32] hover:underline">hello@petcost-calculator.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5E9] flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1B2B1B]">Response time</div>
                <div className="text-sm text-[#5a7a5a]">We aim to respond within 1–2 business days.</div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#E8F5E9] p-5">
            <h3 className="text-sm font-bold text-[#1B2B1B] mb-2">Data corrections</h3>
            <p className="text-sm text-[#5a7a5a] leading-relaxed">
              If you spot a cost figure that seems inaccurate for your region or breed, please let us know. We review all data submissions and update our database accordingly.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Send a Message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your name" className="input-field" />
            <input type="email" placeholder="Your email" className="input-field" />
            <select className="input-field">
              <option value="">Topic — select one</option>
              <option value="data">Data correction</option>
              <option value="feedback">General feedback</option>
              <option value="partnership">Partnership enquiry</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Your message..." rows={4} className="input-field resize-none" />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
