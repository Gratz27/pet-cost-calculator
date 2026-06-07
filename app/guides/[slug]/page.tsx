import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { getGuideBySlug, getAllGuideSlugs, guides } from "@/data/guides";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} | PetCost-Calculator`,
    description: guide.description,
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: `https://petcost-calculator.com/guides/${guide.slug}`,
    dateModified: guide.lastUpdated,
    publisher: { "@type": "Organization", name: "PetCost-Calculator", url: "https://petcost-calculator.com" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://petcost-calculator.com" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://petcost-calculator.com/guides" },
        { "@type": "ListItem", position: 3, name: guide.title, item: `https://petcost-calculator.com/guides/${guide.slug}` },
      ],
    },
  };

  const relatedGuides = guide.relatedSlugs
    .map((s) => guides.find((g) => g.slug === s))
    .filter(Boolean);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/guides" className="hover:text-[#2E7D32]">Guides</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium truncate max-w-xs">{guide.category}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 max-w-4xl">
          <div className="badge badge-green mb-4">{guide.category}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className="text-[#5a7a5a] text-lg leading-relaxed mb-6 max-w-2xl">
            {guide.description}
          </p>
          <div className="flex items-center gap-5 text-sm text-[#5a7a5a]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {guide.readMins} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Updated {guide.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <div className="container-xl py-10 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key takeaways */}
            <div className="card p-6 bg-[#E8F5E9] border-[#C8E6C9]">
              <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Key Takeaways</h2>
              <ul className="space-y-2.5">
                {guide.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#1B2B1B]">
                    <CheckCircle2 className="h-4 w-4 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article sections */}
            {guide.sections.map((section, i) => (
              <div key={i} className="card p-6">
                <h2 className="text-xl font-bold text-[#1B2B1B] mb-4">{section.heading}</h2>
                <div className="prose prose-sm max-w-none text-[#3a5a3a] leading-relaxed space-y-4">
                  {section.body.split("\n\n").map((para, j) => {
                    // Render bold markdown inline
                    const rendered = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
                    if (para.startsWith("- ") || para.includes("\n- ")) {
                      const items = para.split("\n").filter(l => l.startsWith("- ") || l.startsWith("**"));
                      return (
                        <ul key={j} className="space-y-2 list-none pl-0">
                          {items.map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-sm">
                              <span className="text-[#2E7D32] font-bold mt-0.5 flex-shrink-0">→</span>
                              <span dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={j} className="text-sm" dangerouslySetInnerHTML={{ __html: rendered }} />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="card p-6 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0">
              <h3 className="text-lg font-bold mb-2">Get your personalised cost estimate</h3>
              <p className="text-green-200 text-sm mb-4">
                Use our free calculator to see exact costs for your breed and location. Takes under 2 minutes.
              </p>
              <Link href="/calculator" className="inline-flex items-center gap-2 rounded-xl bg-white text-[#2E7D32] font-bold text-sm px-5 py-3 hover:bg-green-50 transition-colors">
                Start the Calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Related guides */}
            {relatedGuides.length > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-bold text-[#1B2B1B] mb-3">Related Guides</h3>
                <div className="space-y-2">
                  {relatedGuides.map((related) => related && (
                    <Link
                      key={related.slug}
                      href={`/guides/${related.slug}`}
                      className="flex items-start gap-2 rounded-xl hover:bg-[#F1F8F1] p-2 transition-colors group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-[#2E7D32] flex-shrink-0 mt-1" />
                      <span className="text-sm text-[#5a7a5a] group-hover:text-[#2E7D32] leading-snug">
                        {related.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Browse breeds */}
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[#1B2B1B] mb-2">Browse Breed Costs</h3>
              <p className="text-xs text-[#5a7a5a] mb-3">See first-year, annual, and lifetime costs for 300+ breeds.</p>
              <Link href="/breeds" className="btn-secondary w-full text-sm text-center block">Browse All Breeds</Link>
            </div>

            {/* Methodology */}
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[#1B2B1B] mb-2">Our Data Sources</h3>
              <p className="text-xs text-[#5a7a5a] mb-3">All cost estimates are sourced from vet fee surveys, consumer spending data, and pet industry reports.</p>
              <Link href="/methodology" className="text-sm font-semibold text-[#2E7D32] hover:underline">Read our methodology →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
