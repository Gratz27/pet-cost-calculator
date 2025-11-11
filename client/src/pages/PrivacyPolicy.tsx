import SEO from "@/components/SEO";
import { APP_TITLE } from "@/const";

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SEO
        title={`Privacy Policy & Disclaimer | ${APP_TITLE}`}
        description="Privacy Policy and Disclaimer for PetCost-Calculator.com. Learn how we collect, use, and protect your data."
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 pb-4 border-b-2 border-border">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            <strong>Last updated:</strong> {currentDate}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              1. Introduction
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Welcome to <strong>PetCost-Calculator.com</strong> ("we," "us,"
              or "our"). We value your privacy and are committed to protecting
              your personal information. This Privacy Policy explains how we
              collect, use, and protect data when you use our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                <strong>Non-personal data:</strong> browser type, device
                information, IP address, and general usage analytics.
              </li>
              <li>
                <strong>Voluntary submissions:</strong> if you contact us
                through forms or email, we may store your name, email address,
                and message content.
              </li>
              <li>
                <strong>Cookies:</strong> small files stored on your device that
                help us analyze site traffic, personalize content, and serve
                ads.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              3. Use of Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>Improve website performance and user experience.</li>
              <li>Monitor site traffic and usage patterns.</li>
              <li>Display relevant advertising (including Google Ads).</li>
              <li>Respond to user inquiries or feedback.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              4. Google AdSense and Cookies
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              We use <strong>Google AdSense</strong> to display ads. Google may
              use cookies (such as the <em>DoubleClick DART cookie</em>) to
              serve ads based on a user's prior visits to our site or other
              sites.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You can opt out of personalized ads by visiting:{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.google.com/settings/ads
              </a>
              .
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Learn more about Google advertising practices:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Advertising Privacy & Terms
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              5. Data Retention
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              We retain non-personal analytics and log data for as long as
              necessary to improve site performance and comply with applicable
              laws. We do not sell, trade, or rent personal data to others.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              6. Third-Party Links
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Our website may include links to third-party websites or affiliate
              programs. We are not responsible for the privacy practices or
              content of those external sites. We recommend reviewing their
              policies before providing any personal data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              7. Your Rights
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt out of cookie tracking or personalized advertising.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed">
              To exercise these rights, contact us at:{" "}
              <strong>
                <a
                  href="mailto:hello@petcost-calculator.com"
                  className="text-primary hover:underline"
                >
                  hello@petcost-calculator.com
                </a>
              </strong>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              8. Data Security
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              We implement reasonable technical and organizational measures to
              protect your information against unauthorized access, loss, or
              misuse.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              9. Policy Updates
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              We may update this Privacy Policy periodically. All changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              10. Contact Us
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-foreground/90 leading-relaxed mt-4">
              📧{" "}
              <strong>
                <a
                  href="mailto:hello@petcost-calculator.com"
                  className="text-primary hover:underline"
                >
                  hello@petcost-calculator.com
                </a>
              </strong>
              <br />
              🌐{" "}
              <a
                href="https://www.petcost-calculator.com"
                className="text-primary hover:underline"
              >
                https://www.petcost-calculator.com
              </a>
            </p>
          </section>

          <hr className="my-12 border-border" />

          <h1 className="text-4xl font-bold mb-4 pb-4 border-b-2 border-border">
            Disclaimer & Affiliate Disclosure
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              1. General Information
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              The content and tools on <strong>PetCost-Calculator.com</strong>{" "}
              are for informational purposes only. Estimates are provided as
              general guidance and should not be considered financial,
              veterinary, or professional advice. Always consult qualified
              professionals before making pet ownership decisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              2. Accuracy of Information
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              While we strive for accuracy, data and costs can change over time.
              We do not guarantee the completeness or reliability of any content
              on this website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              3. Advertising & Affiliate Relationships
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              To support our operations, we may partner with advertisers or
              affiliate programs. Some links on this site are affiliate links,
              meaning we may earn a commission if you make a purchase after
              clicking. This comes at no extra cost to you.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              We only recommend products or services that we believe are
              relevant and helpful to pet owners.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              4. Google AdSense Disclosure
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              We use <strong>Google AdSense</strong> to serve ads. Third-party
              vendors, including Google, use cookies to serve ads based on
              users' prior visits to this and other websites. You can opt out of
              personalized advertising by visiting:{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.google.com/settings/ads
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              5. External Links
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              This website may contain links to third-party sites. We are not
              responsible for their content, accuracy, or reliability. Visiting
              such sites is at your own discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              6. Limitation of Liability
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              By using this website, you agree that{" "}
              <strong>PetCost-Calculator.com</strong> and its owners will not be
              liable for any losses, damages, or decisions made based on the
              information or tools provided here.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              7. Contact
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              For any questions or partnership inquiries, please contact us at:
              <br />
              📧{" "}
              <strong>
                <a
                  href="mailto:hello@petcost-calculator.com"
                  className="text-primary hover:underline"
                >
                  hello@petcost-calculator.com
                </a>
              </strong>
              <br />
              🌐{" "}
              <a
                href="https://www.petcost-calculator.com"
                className="text-primary hover:underline"
              >
                https://www.petcost-calculator.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

