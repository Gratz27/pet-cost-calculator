import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, ChevronRight, Calculator } from "lucide-react";
import {
  allBlogArticles,
  getBlogArticleBySlug,
  getRelatedArticles,
  type BlogCategory,
} from "@/data/blogArticles";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return allBlogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getBlogArticleBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://petcost-calculator.com/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://petcost-calculator.com/blog/${article.slug}`,
    },
  };
}

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "breed-guide": "Breed Guide",
  "cost-saving": "Cost Saving",
  comparison: "Comparison",
  guide: "Guide",
  dogs: "Dogs",
  cats: "Cats",
  insurance: "Insurance",
  "vet-costs": "Vet Costs",
};

export default function BlogArticlePage({ params }: Props) {
  const article = getBlogArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 3);

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-[#2E7D32]">News &amp; Articles</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium truncate max-w-[200px] md:max-w-none">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-10 md:py-14 max-w-4xl">
          <span className="badge badge-green mb-3 inline-block">{CATEGORY_LABELS[article.category]}</span>
          <h1 className="text-2xl md:text-4xl font-bold text-[#1B2B1B] mb-4 leading-tight">{article.title}</h1>
          <p className="text-[#5a7a5a] text-lg leading-relaxed mb-5">{article.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(article.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {article.readTime} min read
            </span>
            {article.author && <span className="font-medium text-[#5a7a5a]">By {article.author}</span>}
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-48 md:h-72 bg-[#E8F5E9] border-b border-[#C8E6C9]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Content + Sidebar */}
      <div className="container-xl py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
          {/* Article body */}
          <article className="lg:col-span-2">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Keywords */}
            {article.keywords.length > 0 && (
              <div className="mt-8 pt-5 border-t border-[#C8E6C9]">
                <p className="text-xs text-slate-400 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span key={kw} className="rounded-lg bg-[#E8F5E9] px-3 py-1 text-xs text-[#2E7D32] font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Calculator CTA */}
            <div className="card p-5 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0">
              <Calculator className="h-6 w-6 text-green-300 mb-2" />
              <h3 className="text-base font-bold mb-1">Get your personalised estimate</h3>
              <p className="text-green-200 text-xs mb-4 leading-relaxed">
                Costs vary by location, lifestyle, and breed. Our calculator gives you a precise figure for your situation.
              </p>
              <Link href="/calculator" className="btn-green w-full text-sm text-center block">
                Start the Calculator
              </Link>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-bold text-[#1B2B1B] mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/blog/${rel.slug}`} className="group flex gap-3">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#E8F5E9]">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32] transition-colors line-clamp-2 leading-tight">
                          {rel.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {rel.readTime} min
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Browse breeds */}
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[#1B2B1B] mb-2">Browse breed costs</h3>
              <p className="text-xs text-[#5a7a5a] mb-3">See first-year, annual, and lifetime costs for 300+ breeds.</p>
              <Link href="/breeds" className="btn-secondary w-full text-sm text-center block">
                View All Breeds
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
