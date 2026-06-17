import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";
import { allBlogArticles, type BlogCategory } from "@/data/blogArticles";

export const metadata: Metadata = {
  title: "Pet Ownership News & Articles | PetCost-Calculator",
  description: "The latest articles on pet ownership costs, vet fee trends, breed spotlights, insurance news, and money-saving tips from PetCost-Calculator.",
};

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

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "breed-guide": "badge-green",
  "cost-saving": "badge-blue",
  comparison: "badge-orange",
  guide: "badge-green",
  dogs: "badge-blue",
  cats: "badge-orange",
  insurance: "badge-green",
  "vet-costs": "badge-orange",
};

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const activeCategory = searchParams.category as BlogCategory | undefined;
  const articles = activeCategory
    ? allBlogArticles.filter((a) => a.category === activeCategory)
    : allBlogArticles;

  const featured = allBlogArticles[0];
  const rest = activeCategory ? articles : articles.slice(1);

  const categories: BlogCategory[] = [
    "breed-guide", "dogs", "cats", "cost-saving",
    "comparison", "insurance", "vet-costs", "guide",
  ];

  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12">
          <div className="badge badge-green mb-3">News &amp; Articles</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Pet Ownership News &amp; Articles</h1>
          <p className="text-[#5a7a5a] text-lg max-w-2xl">
            Timely articles on vet fee trends, breed spotlights, insurance news, and money-saving tips for US, UK, and Australian pet owners. For evergreen how-to guides, see our <a href="/guides" className="text-[#2E7D32] underline hover:no-underline">Cost Guides</a>.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <Link
              href="/blog"
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${!activeCategory ? "bg-[#2E7D32] text-white" : "bg-white border border-[#C8E6C9] text-[#5a7a5a] hover:border-[#2E7D32]"}`}
            >
              All ({allBlogArticles.length})
            </Link>
            {categories.map((cat) => {
              const count = allBlogArticles.filter((a) => a.category === cat).length;
              if (!count) return null;
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${activeCategory === cat ? "bg-[#2E7D32] text-white" : "bg-white border border-[#C8E6C9] text-[#5a7a5a] hover:border-[#2E7D32]"}`}
                >
                  {CATEGORY_LABELS[cat]} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        {/* Featured article */}
        {!activeCategory && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#C8E6C9] hover:border-[#4CAF50]/50 transition-all">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square bg-[#E8F5E9] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    style={featured.image.startsWith("http") ? { objectPosition: "50% 25%" } : undefined}
                    className={`${featured.image.startsWith("http") ? "object-cover" : "object-contain p-4"} group-hover:scale-105 transition-transform duration-300`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge ${CATEGORY_COLORS[featured.category]}`}>{CATEGORY_LABELS[featured.category]}</span>
                    <span className="badge badge-green">Featured</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1B2B1B] mb-3 group-hover:text-[#2E7D32] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[#5a7a5a] text-sm leading-relaxed mb-4 line-clamp-3">{featured.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readTime} min read</span>
                    <span>{new Date(featured.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group card overflow-hidden hover:border-[#4CAF50]/50">
              <div className="relative aspect-square bg-[#E8F5E9] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  style={article.image.startsWith("http") ? { objectPosition: "50% 25%" } : undefined}
                  className={`${article.image.startsWith("http") ? "object-cover" : "object-contain p-4"} group-hover:scale-105 transition-transform duration-300`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className={`badge ${CATEGORY_COLORS[article.category]} mb-2 inline-block`}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                <h2 className="text-sm font-bold text-[#1B2B1B] mb-2 group-hover:text-[#2E7D32] transition-colors leading-tight line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-xs text-[#5a7a5a] leading-relaxed mb-3 line-clamp-2">{article.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime} min</span>
                  <span>
                    {new Date(article.publishDate).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="text-center text-[#5a7a5a] py-16">No articles in this category yet.</p>
        )}

        <div className="mt-14 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Get a personalised cost estimate</h2>
          <p className="text-green-200 text-sm mb-5">
            Use our free calculator to see exact costs for your breed, location, and lifestyle.
          </p>
          <Link href="/calculator" className="btn-green inline-flex items-center gap-1.5">
            Start the Calculator <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
