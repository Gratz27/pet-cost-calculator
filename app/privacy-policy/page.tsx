import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="container-xl max-w-3xl py-16">
      <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-8">Last updated: June 2026</p>
      <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Information We Collect</h2>
          <p>PetCost Calculator does not require account creation. Calculator inputs (pet type, breed, location) are processed locally in your browser and are not stored on our servers. We collect anonymous usage analytics to improve the service.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Cookies & Advertising</h2>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits. You can opt out of personalised advertising by visiting Google's Ad Settings. We also use Google Analytics to understand how visitors use our site.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Affiliate Links</h2>
          <p>Some links on this site are affiliate links. If you click these links and make a purchase, we may earn a commission at no additional cost to you. This does not influence our cost estimates or recommendations.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#0f172a]">Contact</h2>
          <p>For privacy concerns, contact us at hello@petcost-calculator.com.</p>
        </section>
      </div>
    </div>
  );
}
