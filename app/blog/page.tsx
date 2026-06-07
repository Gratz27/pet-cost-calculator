import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Cost Guides & Articles",
  description: "Expert guides on pet ownership costs. Learn how much different breeds cost, how to save on pet expenses, and how to budget for a new pet.",
};

const articles = [
  { slug: "golden-retriever-cost-guide", title: "How Much Does a Golden Retriever Cost? Complete 2026 Guide", excerpt: "Golden Retrievers are one of the most popular breeds — but the costs go far beyond the purchase price. Here's the complete breakdown.", category: "Dog Costs", readTime: "8 min", date: "Jun 2026" },
  { slug: "french-bulldog-cost-guide", title: "French Bulldog Ownership Costs: The Full Picture", excerpt: "French Bulldogs are charming but expensive. Health issues, breathing problems, and C-section births mean higher-than-average costs.", category: "Dog Costs", readTime: "7 min", date: "Jun 2026" },
  { slug: "cat-vs-dog-cost", title: "Cat vs Dog: Which Is Really Cheaper to Own?", excerpt: "The classic debate, finally answered with real data. We break down the costs across purchase, feeding, vet care, and more.", category: "Comparison", readTime: "6 min", date: "May 2026" },
  { slug: "pet-insurance-worth-it", title: "Is Pet Insurance Worth It? A Data-Driven Answer", excerpt: "We analysed 10,000+ pet insurance claims to answer whether insurance pays off — and which breeds benefit most.", category: "Insurance", readTime: "9 min", date: "May 2026" },
  { slug: "first-year-pet-costs", title: "The True Cost of Owning a Pet in Year One", excerpt: "The first year is always the most expensive. Here's exactly what to budget for so there are no surprises.", category: "Budgeting", readTime: "7 min", date: "Apr 2026" },
  { slug: "save-money-pet-owner", title: "12 Proven Ways to Cut Your Pet Costs Without Cutting Quality", excerpt: "Smart pet owners spend 20-30% less without compromising their pet's health or happiness. Here's how.", category: "Budgeting", readTime: "8 min", date: "Apr 2026" },
];

const categoryColors: Record<string, string> = {
  "Dog Costs": "badge-blue",
  "Cat Costs": "badge-green",
  "Comparison": "badge-orange",
  "Insurance": "badge-blue",
  "Budgeting": "badge-green",
};

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-100">
        <div className="container-xl py-12">
          <div className="badge badge-green mb-3">Cost Guides</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">Pet Cost Guides & Articles</h1>
          <p className="text-slate-600 text-lg max-w-2xl">Data-driven guides to help you understand, plan, and manage the real cost of pet ownership.</p>
        </div>
      </div>
      <div className="container-xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="card p-6 group flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className={`badge ${categoryColors[article.category] ?? "badge-blue"} text-xs`}>{article.category}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-[#0f172a] group-hover:text-[#1E3A5F] transition-colors mb-2 leading-snug">{article.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{article.excerpt}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
