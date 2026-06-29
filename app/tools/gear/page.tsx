import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, ExternalLink, Home, Bed, Utensils, Bone,
  Scissors, HeartPulse, Puzzle, GraduationCap,
  Container, ShoppingBag, Car, BedDouble, Circle, Snowflake,
  Soup, Timer, Droplets, Box, Waves, TreePine, Brush, Sparkles,
  Pill, Plus, Bug, Mouse, Cookie, Link as LinkIcon, Bell,
} from "lucide-react";
import AdUnit from "@/components/AdUnit";
import { amazonSearchLink, productLinks, resolveLink } from "@/lib/affiliateLinks";
import { fetchTopItems } from "@/lib/amazonPaapi";

export const metadata: Metadata = {
  title: "Pet Essentials 2026 — Best Dog & Cat Gear | PetCost-Calculator",
  description:
    "The pet essentials every owner needs — crates, beds, food, litter, grooming tools, and more. Curated categories of well-reviewed dog and cat gear for every budget.",
  alternates: { canonical: "https://petcost-calculator.com/tools/gear" },
};

// Pull fresh top-product imagery once a day (PA-API runs at build / revalidate,
// never per user request).
export const revalidate = 86400;

type Pick = {
  emoji: string;
  icon: typeof Home;
  title: string;
  description: string;
  query: string;
  badge?: { label: string; color: "badge-green" | "badge-blue" | "badge-orange" };
};

type Category = {
  id: string;
  title: string;
  icon: typeof Home;
  intro: string;
  /** Representative search used for the category banner image (PA-API). */
  bannerQuery: string;
  picks: Pick[];
};

const categories: Category[] = [
  {
    id: "crates-carriers",
    title: "Crates & Carriers",
    icon: Home,
    intro: "A properly sized crate or carrier makes crate training, vet visits, and travel far less stressful for both of you.",
    bannerQuery: "dog crate",
    picks: [
      { emoji: "🏠", icon: Container, title: "Wire Dog Crates", description: "Collapsible, well-ventilated crates with divider panels — size up as your puppy grows.", query: "dog crate with divider panel" },
      { emoji: "🧳", icon: ShoppingBag, title: "Soft-Sided Carriers", description: "Airline-compliant carriers for cats and small dogs — look for mesh panels and a washable liner.", query: "soft sided pet carrier airline approved", badge: { label: "Popular", color: "badge-blue" } },
      { emoji: "🚙", icon: Car, title: "Car Travel Crates", description: "Crash-tested crates and seatbelt harnesses for safer car journeys.", query: "dog car travel crate crash tested" },
    ],
  },
  {
    id: "beds-bedding",
    title: "Beds & Bedding",
    icon: Bed,
    intro: "Orthopedic support matters most for large breeds and senior pets — memory foam reduces joint pressure and improves sleep quality.",
    bannerQuery: "dog bed",
    picks: [
      { emoji: "🛏️", icon: BedDouble, title: "Orthopedic Memory Foam Beds", description: "Supportive foam beds for large or senior dogs with joint issues, with removable washable covers.", query: "orthopedic memory foam dog bed large breed", badge: { label: "New", color: "badge-green" } },
      { emoji: "🌙", icon: Circle, title: "Calming Donut Beds", description: "Raised-rim beds that help anxious pets feel secure — great for crate inserts too.", query: "calming donut cat dog bed" },
      { emoji: "❄️", icon: Snowflake, title: "Cooling Mats", description: "Pressure-activated cooling gel mats for hot climates or thick-coated breeds.", query: "cooling mat for dogs" },
    ],
  },
  {
    id: "food-feeding",
    title: "Food & Feeding",
    icon: Utensils,
    intro: "Slow feeders reduce bloat risk in large breeds, while automatic feeders help keep portion control consistent.",
    bannerQuery: "dog food bowl set",
    picks: [
      { emoji: "🥣", icon: Soup, title: "Slow Feeder Bowls", description: "Maze-pattern bowls that slow down fast eaters and reduce digestive issues.", query: "slow feeder dog bowl", badge: { label: "New", color: "badge-green" } },
      { emoji: "⏱️", icon: Timer, title: "Automatic Feeders", description: "Programmable feeders for consistent portions — useful for multi-pet households or busy schedules.", query: "automatic pet feeder programmable" },
      { emoji: "💧", icon: Droplets, title: "Pet Water Fountains", description: "Filtered, flowing water encourages cats especially to drink more.", query: "pet water fountain filtered" },
    ],
  },
  {
    id: "litter-cat-care",
    title: "Litter & Cat Care",
    icon: Bone,
    intro: "The right litter box setup reduces odour and tracking — a big factor in keeping multi-cat homes pleasant.",
    bannerQuery: "cat litter box",
    picks: [
      { emoji: "📦", icon: Box, title: "Self-Cleaning Litter Boxes", description: "Automatic litter boxes that rake waste away — a popular upgrade for multi-cat homes.", query: "self cleaning litter box", badge: { label: "New", color: "badge-green" } },
      { emoji: "🌾", icon: Waves, title: "Low-Tracking Litter", description: "Tight-clumping, low-dust litter that cuts down on mess around the box.", query: "low tracking clumping cat litter" },
      { emoji: "🧗", icon: TreePine, title: "Cat Trees & Scratchers", description: "Multi-level cat trees with scratching posts — vital for indoor cats' enrichment and claw health.", query: "cat tree with scratching post", badge: { label: "Popular", color: "badge-blue" } },
    ],
  },
  {
    id: "grooming",
    title: "Grooming",
    icon: Scissors,
    intro: "Regular at-home grooming between professional visits cuts annual grooming costs significantly.",
    bannerQuery: "dog grooming kit",
    picks: [
      { emoji: "✂️", icon: Brush, title: "Deshedding Tools", description: "Undercoat rakes and deshedding brushes — especially valuable for double-coated breeds.", query: "deshedding tool for dogs" },
      { emoji: "🛁", icon: Scissors, title: "Dog Clipper Kits", description: "Quiet, rechargeable clipper sets for at-home trims between groomer visits.", query: "dog grooming clipper kit" },
      { emoji: "🦷", icon: Sparkles, title: "Dental Care Kits", description: "Toothbrushes, enzymatic toothpaste, and dental chews to help prevent costly dental disease.", query: "dog dental care kit toothbrush", badge: { label: "Saves $$", color: "badge-orange" } },
    ],
  },
  {
    id: "health-wellness",
    title: "Health & Wellness",
    icon: HeartPulse,
    intro: "Preventive products can reduce emergency vet visits — always check with your vet before starting supplements.",
    bannerQuery: "dog health supplements",
    picks: [
      { emoji: "💊", icon: Pill, title: "Joint Supplements", description: "Glucosamine and chondroitin chews to support joint health, especially for large or senior dogs.", query: "dog joint supplement glucosamine chondroitin" },
      { emoji: "🩹", icon: Plus, title: "Pet First Aid Kits", description: "Compact kits with bandages, antiseptic, and tweezers for minor injuries at home or on the trail.", query: "pet first aid kit", badge: { label: "Saves $$", color: "badge-orange" } },
      { emoji: "🪲", icon: Bug, title: "Flea & Tick Prevention", description: "Topical and collar options — compare with what your vet prescribes for the best protection.", query: "flea and tick prevention for dogs" },
    ],
  },
  {
    id: "toys-enrichment",
    title: "Toys & Enrichment",
    icon: Puzzle,
    intro: "Mental stimulation reduces destructive behaviour — puzzle feeders and durable chews are worth the investment.",
    bannerQuery: "dog toys",
    picks: [
      { emoji: "🧩", icon: Puzzle, title: "Puzzle Feeders", description: "Treat-dispensing puzzles that slow down eating and provide mental enrichment.", query: "dog puzzle feeder toy", badge: { label: "New", color: "badge-green" } },
      { emoji: "🦴", icon: Bone, title: "Durable Chew Toys", description: "Long-lasting rubber chews for power chewers — look for vet-recommended brands.", query: "durable dog chew toy" },
      { emoji: "🐭", icon: Mouse, title: "Interactive Cat Toys", description: "Motion-activated and wand toys that encourage natural hunting play.", query: "interactive cat toy" },
    ],
  },
  {
    id: "training",
    title: "Training & Behaviour",
    icon: GraduationCap,
    intro: "A solid training foundation in the first year prevents costly behavioural issues later.",
    bannerQuery: "dog training supplies",
    picks: [
      { emoji: "🎯", icon: Cookie, title: "Treat Training Pouches", description: "Hands-free treat pouches that clip to your belt — essential for consistent reward-based training.", query: "dog training treat pouch" },
      { emoji: "🪢", icon: LinkIcon, title: "No-Pull Harnesses", description: "Front-clip harnesses that reduce pulling without choking — better for joints than collars.", query: "no pull dog harness", badge: { label: "Popular", color: "badge-blue" } },
      { emoji: "🔔", icon: Bell, title: "Clicker Training Kits", description: "Clickers and guides for positive-reinforcement training at home.", query: "dog clicker training kit" },
    ],
  },
];

export default async function GearPage() {
  // Real Amazon product imagery for each curated query (top current result).
  // Returns an empty map if PA-API isn't configured → cards fall back to emoji.
  const allQueries = categories.flatMap((c) => [
    c.bannerQuery,
    ...c.picks.map((p) => p.query),
  ]);
  const items = await fetchTopItems(allQueries);

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
            <span className="text-[#1B2B1B] font-medium">Pet Essentials</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white overflow-hidden relative">
        <div className="container-xl py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="badge bg-white/20 text-green-100 mb-4">Updated for 2026</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Pet Essentials</h1>
              <p className="text-green-200 text-lg leading-relaxed max-w-xl mb-6">
                Curated categories of well-reviewed dog and cat products — organised by what your pet actually
                needs at each stage of ownership. Compare options on Amazon and Chewy and pick what fits your budget.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm text-green-100">
                  🐾 8 essential categories
                </div>
                <div className="inline-flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm text-green-100">
                  🛒 24 hand-picked product searches
                </div>
              </div>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <Image src="/guides/budget-new-pet.png" alt="A happy puppy and kitten" width={220} height={220} className="rounded-2xl object-cover w-[220px] h-[220px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Amazon Pet Supplies banner */}
      <div className="container-xl pt-8">
        <a
          href={resolveLink(productLinks.amazonPetSupplies)}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-[#C8E6C9] bg-[#E8F5E9] hover:shadow-md transition-shadow p-5 md:p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="badge badge-blue mb-2">Shop on Amazon</div>
              <h2 className="text-lg md:text-xl font-bold text-[#1B2B1B] mb-1">
                Browse the full Amazon Pet Supplies store
              </h2>
              <p className="text-sm text-[#5a7a5a]">
                Looking for something not listed below? Explore the entire Amazon pet supplies category —
                food, gear, health, and more.
              </p>
            </div>
            <span className="btn-green text-sm whitespace-nowrap inline-flex items-center gap-1">
              Shop Pet Supplies <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </div>
        </a>
      </div>

      {/* Quick category nav */}
      <div className="bg-white border-b border-[#C8E6C9] sticky top-0 z-20 shadow-sm">
        <div className="container-xl py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#C8E6C9] px-3 py-1.5 text-xs font-semibold text-[#2E7D32] hover:bg-[#E8F5E9] transition-colors whitespace-nowrap"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="max-w-5xl space-y-8 mx-auto">
          {categories.map((cat, i) => {
            // Real PA-API product photo if configured; otherwise a clean
            // branded icon band (no stock animals).
            const bannerImg = items.get(cat.bannerQuery)?.imageUrl;
            return (
            <div key={cat.id} id={cat.id} className="scroll-mt-20">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9] flex-shrink-0">
                    <cat.icon className="h-5 w-5 text-[#2E7D32]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1B2B1B]">{cat.title}</h2>
                </div>
                <p className="text-sm text-[#5a7a5a] mb-5 leading-relaxed">{cat.intro}</p>

                {/* Category visual — representative product (PA-API). Hidden when
                    no image is available so the section still looks intentional. */}
                {bannerImg ? (
                  <div className="relative w-full h-40 sm:h-52 rounded-xl mb-5 overflow-hidden bg-gradient-to-br from-[#E8F5E9] to-[#F1F8F1] border border-[#C8E6C9]">
                    <Image
                      src={bannerImg}
                      alt={`${cat.title} — pet essentials`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-24 sm:h-28 rounded-xl mb-5 bg-gradient-to-br from-[#E8F5E9] to-[#F1F8F1] border border-[#C8E6C9]">
                    <cat.icon className="h-10 w-10 text-[#2E7D32]" strokeWidth={1.5} />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {cat.picks.map((pick) => {
                    const item = items.get(pick.query);
                    const pickImg = item?.imageUrl; // PA-API product photo if configured
                    const PickIcon = pick.icon;
                    return (
                    <a
                      key={pick.title}
                      href={amazonSearchLink(pick.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex flex-col rounded-xl bg-[#F1F8F1] border border-[#C8E6C9] p-4 hover:border-[#4CAF50] hover:shadow-md transition-all group"
                    >
                      {pick.badge && (
                        <span className={`absolute top-3 right-3 z-10 ${pick.badge.color} text-[10px]`}>{pick.badge.label}</span>
                      )}
                      {pickImg ? (
                        <div className="relative w-full aspect-[4/3] rounded-lg border border-[#C8E6C9] mb-3 overflow-hidden bg-white">
                          <Image
                            src={pickImg}
                            alt={pick.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 240px"
                            className="object-contain p-2"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full h-20 rounded-lg bg-white border border-[#C8E6C9] mb-3">
                          <PickIcon className="h-8 w-8 text-[#2E7D32]" strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32] mb-1">{pick.title}</div>
                      <p className="text-xs text-slate-500 leading-relaxed flex-1">{pick.description}</p>
                      {item?.price && (
                        <div className="mt-2 text-sm font-bold text-[#1B2B1B]">{item.price}</div>
                      )}
                      <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#2E7D32]">
                        Shop on Amazon <ExternalLink className="h-3 w-3" />
                      </div>
                    </a>
                    );
                  })}
                </div>
              </div>

              {/* Ad every 3 categories */}
              {(i + 1) % 3 === 0 && i !== categories.length - 1 && (
                <div className="mt-6">
                  <AdUnit slot="2847391056" format="horizontal" />
                </div>
              )}
            </div>
            );
          })}

          {/* Chewy + BarkBox + YumWoof CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card p-6 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white border-0 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Prefer auto-ship and free returns?</h3>
                <p className="text-green-200 text-sm">Chewy stocks most of these categories with autoship discounts of up to 30%.</p>
              </div>
              <a href={resolveLink(productLinks.chewy)} target="_blank" rel="noopener noreferrer" className="btn-green text-sm whitespace-nowrap self-start">
                Shop on Chewy
              </a>
            </div>
            <div className="card p-6 bg-gradient-to-br from-[#4a2c6e] to-[#6d3f9e] text-white border-0 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">Spoil your dog every month 🐾</h3>
                <p className="text-purple-200 text-sm">BarkBox delivers themed toys and treats straight to your door — tailored to your dog's size.</p>
              </div>
              <a href={resolveLink(productLinks.barkBox)} target="_blank" rel="noopener noreferrer" className="btn-green text-sm whitespace-nowrap self-start">
                Try BarkBox
              </a>
            </div>
            <div className="card p-6 bg-gradient-to-br from-[#92400e] to-[#b45309] text-white border-0 flex flex-col justify-between gap-4">
              <div>
                <div className="inline-block bg-white/20 text-orange-100 text-xs font-semibold rounded-full px-2.5 py-0.5 mb-2">
                  5% off — code <span className="font-bold">{productLinks.yumWoof.couponCode}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Premium dog food, vet-designed 🥩</h3>
                <p className="text-orange-200 text-sm">YumWoof's air-dried, grain-free recipes skip seed oils and synthetic fillers — personalised to your dog's breed and health goals.</p>
              </div>
              <a href={resolveLink(productLinks.yumWoof)} target="_blank" rel="noopener noreferrer" className="btn-green text-sm whitespace-nowrap self-start">
                Get 5% Off at YumWoof
              </a>
            </div>
          </div>

          {/* Disclosure */}
          <div className="rounded-xl bg-white border border-[#C8E6C9] px-4 py-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-semibold text-[#1B2B1B]">Affiliate disclosure:</span> Links on this page are
              affiliate links to Amazon, Chewy, BarkBox, and YumWoof. If you make a purchase, we may earn a commission at no
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
