import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – PetCost-Calculator",
  description: "Privacy policy for PetCost-Calculator.com",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-[#1B2B1B] mb-2">Privacy Policy</h1>
          <p className="text-[#5a7a5a] text-sm">Last updated: June 2026</p>
        </div>
      </div>

      <div className="container-xl max-w-3xl py-10">
        <div className="card p-8 space-y-7 article-content">
          <section>
            <h2>Information We Collect</h2>
            <p>PetCost-Calculator does not require account creation. Calculator inputs (pet type, breed, location) are processed in your browser and are not stored on our servers. We collect anonymous usage analytics via Google Analytics 4 to improve the service.</p>
          </section>
          <section>
            <h2>Cookies &amp; Analytics</h2>
            <p>We use Google Analytics 4 to understand how visitors use our site. This involves setting cookies in your browser. You can opt out by using a browser extension such as Google Analytics Opt-out or by enabling Do Not Track in your browser settings.</p>
          </section>
          <section>
            <h2>Affiliate Links</h2>
            <p>Some links on this site are affiliate links (e.g. to Chewy or pet insurance providers). If you click these links and make a purchase, we may earn a commission at no additional cost to you. This does not influence our cost estimates or editorial content.</p>
          </section>
          <section>
            <h2>Email Subscriptions</h2>
            <p>If you submit your email address to receive our Annual Pet Cost Report or newsletter, your address is stored securely and used only to send the requested content. You can unsubscribe at any time using the link in any email we send.</p>
          </section>
          <section>
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services which may set their own cookies: Google Analytics 4, Google Fonts. We do not sell or share your data with advertisers or data brokers.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>For privacy concerns, contact us at <a href="mailto:hello@petcost-calculator.com">hello@petcost-calculator.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
