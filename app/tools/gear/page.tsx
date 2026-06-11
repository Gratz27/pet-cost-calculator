import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import { amazonSearchLink, productLinks, resolveLink } from "@/lib/affiliateLinks";

export const metadata: Metadata = {
  title: "Recommended Pet Gear & Supplies 2026 | PetCost-Calculator",
  description:
    "Hand-picked categories of high-quality dog and cat gear — crates, beds, food, litter, grooming tools, and more. Find well-reviewed essentials for every budget.",
};

type Pick = {
  emoji: string;
  title: string;
  description: string;
  query: string;
  badge?: string;
};

type Category = {
  id: string;
  title: string;
  intro: string;
  picks: Pick[];
};

const categories: Category[] = [
  {
    id: "crates-carriers",
    title: "Crates & Carriers",
    intro: "A properly sized crate or carrier makes crate training, vet visits, and travel far less stressful for both of you.",
    picks: [
      { emoji: "🏠", title: "Wire Dog Crates", description: "Collapsible, well-ventilated crates with divider panels — size up as your puppy grows.", query: "dog crate with divider panel" },
      { emoji: "🧳", title: "Soft-Sided Carriers", description: "Airline-compliant carriers for cats and small dogs — look for mesh panels and a washable liner.", query: "soft sided pet carrier airline approved", badge: "Popular" },
      { emoji: "🚙", title: "Car Travel Crates", description: "Crash-tested crates and seatbelt harnesses for safer car journeys.", query: "dog car travel crate crash tested" },
    ],
  },
  {
    id: "beds-bedding",
    title: "Beds & Bedding",
    intro: "Orthopedic support matters most for large breeds and senior pets — memory foam reduces joint pressure and improves sleep quality.",
    picks: [
      { emoji: "🛏️", title: "Orthopedic Memory Foam Beds", description: "Supportive foam beds for large or senior dogs with joint issues, with removable washable covers.", query: "orthopedic memory foam dog bed large breed", badge: "New" },
      { emoji: "🌙", title: "Calming Donut Beds", description: "Raised-rim beds that help anxious pets feel secure — great for crate inserts too.", query: "calming donut cat dog bed" },
      { emoji: "❄️", title: "Cooling Mats", description: "Pressure-activated cooling gel mats for hot climates or thick-coated breeds.", query: "cooling mat for dogs" },
    ],
  },
  {
    id: "food-feeding",
    title: "Food & Feeding",
    intro: "Slow feeders reduce bloat risk in large breeds, while automatic feeders help keep portion control consistent.",
    picks: [
      { emoji: "🥣", title: "Slow Feeder Bowls", description: "Maze-pattern bowls that slow down fast eaters and reduce digestive issues.", query: "slow feeder dog bowl", badge: "New" },
      { emoji: "⏱️", title: "Automatic Feeders", description: "Programmable feeders for consistent portions — useful for multi-pet households or busy schedules.", query: "automatic pet feeder programmable" },
      { emoji: "💧", title: "Pet Water Fountains", description: "Filtered, flowing water encourages cats especially to drink more.", query: "pet water fountain filtered" },
    ],
  },
  {
    id: "litter-cat-care",
    title: "Litter & Cat Care",
    intro: "The right litter box setup reduces odour and tracking — a big factor in keeping multi-cat homes pleasant.",
    picks: [
      { emoji: "📦", title: "Self-Cleaning Litter Boxes", description: "Automatic litter boxes that rake waste away — a popular upgrade for multi-cat homes.", query: "self cleaning litter box", badge: "New" },
      { emoji: "🌾", title: "Low-Tracking Litter", description: "Tight-clumping, low-dust litter that cuts down on mess around the box.", query: "low tracking clumping cat litter" },
      { emoji: "🧗", title: "Cat Trees & Scratchers", description: "Multi-level cat trees with scratching posts — vital for indoor cats' enrichment and claw health.", query: "cat tree with scratching post" },
    ],
  },
  {
    id: "grooming",
    title: "Grooming",
    intro: "Regular at-home grooming between professional visits cuts annual grooming costs significantly.",
    picks: [
      { emoji: "✂️", title: "Deshedding Tools", description: "Undercoat rakes and deshedding brushes — especially valuable for double-coated breeds.", query: "deshedding tool for dogs" },
      { emoji: "🛁", title: "Dog Clipper Kits", description: "Quiet, rechargeable clipper sets for at-home trims between groomer visits.", query: "dog grooming clipper kit" },
      { emoji: "🦷", title: "Dental Care Kits", description: "Toothbrushes, enzymatic toothpaste, and dental chews to help prevent costly dental disease.", query: "dog dental care kit toothbrush" },
    ],
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    intro: "Preventive products can reduce emergency vet visits — always check with your vet before starting supplements.",
    picks: [
      { emoji: "💊", title: "Joint Supplements", description: "Glucosamine and chondroitin chews to support joint health, especially for large or senior dogs.", query: "dog joint supplement glucosamine chondroitin" },
      { emoji: "🩹", title: "Pet First Aid Kits", description: "Compact kits with bandages, antiseptic, and tweezers for minor injuries at home or on the trail.", query: "pet first aid kit" },
      { emoji: "🪲", title: "Flea & Tick Prevention", description: "Topical and collar options — compare with what your vet prescribes for the best protection.", query: "flea and tick prevention for dogs" },
    ],
  },
  {
    id: "toys-enrichment",
    title: "Toys & Enrichment",
    intro: "Mental stimulation reduces destructive behaviour — puzzle feeders and durable chews are worth the investment.",
    picks: [
      { emoji: "🧩", title: "Puzzle Feeders", description: "Treat-dispensing puzzles that slow down eating and provide mental enrichment.", query: "dog puzzle feeder toy", badge: "New" },
      { emoji: "🦴", title: "Durable Chew Toys", description: "Long-lasting rubber chews for power chewers — look for vet-recommended brands.", query: "durable dog chew toy" },
      { emoji: "🐭", title: "Interactive Cat Toys", description: "Motion-activated and wand toys that encourage natural hunting play.", query: "interactive cat toy" },
    ],
  },
  {
    id: "training",
    title: "Training & Behaviour",
    intro: "A solid training foundation in the first year prevents costly behavioural issues later.",
    picks: [
      { emoji: "🎯", title: "Treat Training Pouches", description: "Hands-free treat pouches that clip to your belt — essential for consistent reward-based training.", query: "dog training treat pouch" },
      { emoji: "🪢", title: "No-Pull Harnesses", description: "Front-clip harnesses that reduce pulling without choking — better for joints than collars.", query: "no pull dog harness" },
      { emoji: "🔔", title: "Clicker Training Kits", description: "Clickers and guides for positive-reinforcement training at home.", query: "dog clicker training kit" },
    ],
  },
];

export default function GearPage() {
  return (
    <div className="bg-[#F1F8F1] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#5a7a5a]">
            <Link href="/" className="hover:text-[#2E7D32]">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-[#2E7D32]">Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#1B2B1B] font-medium">Recommended Gear</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-[#C8E6C9]">
        <div className="container-xl py-12 max-w-3xl">
          <div className="badge badge-green mb-3">Updated for 2026</div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2B1B] mb-3">Recommended Pet Gear</h1>
          <p className="text-[#5a7a5a] text-lg leading-relaxed">
            Categories of well-reviewed dog and cat products, organised by what your pet actually needs at each
            stage of ownership. We link to Amazon and Chewy so you can compare prices, read reviews, and choose
            what fits your budget.
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="max-w-5xl space-y-10">
          {categories.map((cat, i) => (
            <div key={cat.id} id={cat.id}>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-[#1B2B1B] mb-2">{cat.title}</h2>
                <p className="text-sm text-[#5a7a5a] mb-5 leading-relaxed">{cat.intro}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cat.picks.map((pick) => (
                    <a
                      key={pick.title}
                      href={amazonSearchLink(pick.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col rounded-xl bg-[#F1F8F1] border border-[#C8E6C9] p-4 hover:border-[#4CAF50] transition-all group"
                    >
                      {pick.badge && (
                        <span className="absolute top-3 right-3 badge badge-green text-[10px]">{pick.badge}</span>
                      )}
                      <div className="text-2xl mb-2">{pick.emoji}</div>
                      <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32] mb-1">{pick.title}</div>
                      <p className="text-xs text-slate-500 leading-relaxed flex-1">{pick.description}</p>
                      <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#2E7D32]">
                        Shop on Amazon <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Ad every 3 categories */}
              {(i + 1) % 3 === 0 && i !== categories.length - 1 && (
                <div className="mt-6">
                  <AdUnit slot="2847391056" format="horizontal" />
                </div>
              )}
            </div>
          ))}

          {/* Chewy CTA */}
          <div className="card p-6 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Prefer auto-ship and free returns?</h3>
              <p className="text-green-200 text-sm">Chewy stocks most of these categories with autoship discounts of up to 30%.</p>
            </div>
            <a href={resolveLink(productLinks.chewy)} target="_blank" rel="noopener noreferrer" className="btn-green text-sm whitespace-nowrap">
              Shop on Chewy
            </a>
          </div>

          {/* Disclosure */}
          <div className="rounded-xl bg-white border border-[#C8E6C9] px-4 py-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-[#1B2B1B]">Affiliate disclosure:</span> Links on this page are
              affiliate links to Amazon and Chewy. If you make a purchase, we may earn a commission at no
              additional cost to you. We link to product categories rather than single items so you can compare
              options, read current reviews, and choose what's best for your pet and budget.
            </p>
          </div>

          {/* Back to calculator CTA */}
          <div className="text-center">
            <Link href="/calculator" className="btn-primary text-sm">Plan your pet's full budget in the calculator →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
