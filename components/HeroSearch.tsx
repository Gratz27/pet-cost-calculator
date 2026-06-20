"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { getAllBreeds, type Breed } from "@/lib/calculator";
import Image from "next/image";

function getMonthlyRange(breed: Breed): string {
  const base = breed.annualFood + breed.annualVet + breed.annualGrooming + breed.annualSupplies;
  const low = Math.round(base / 12);
  const high = Math.round((base + breed.annualInsurance) / 12);
  return `$${low}–$${high}/month`;
}

export default function HeroSearch() {
  const router = useRouter();
  const [petType, setPetType] = useState<"dog" | "cat">("dog");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const breeds = useMemo(() => getAllBreeds(petType), [petType]);

  const filtered = useMemo(() => {
    if (!query.trim()) return breeds.slice(0, 6);
    return breeds.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  }, [breeds, query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(breed: Breed) {
    setOpen(false);
    router.push(`/breeds/${breed.id}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Mascot pair — clickable, switches pet type */}
      <div className="flex items-end justify-center gap-6 sm:gap-10 mb-2">
        {/* Golden Retriever — Dogs */}
        <button
          onClick={() => { setPetType("dog"); setQuery(""); setOpen(false); }}
          className="flex flex-col items-center gap-1 group focus:outline-none"
          aria-label="Show dog breeds"
        >
          <div className={`relative transition-all duration-300 ${petType === "dog" ? "w-28 h-28 sm:w-36 sm:h-36 drop-shadow-xl" : "w-20 h-20 sm:w-28 sm:h-28 opacity-50"}`}>
            <Image
              src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=1100&q=80"
              alt="Golden Retriever"
              fill
              className="object-cover rounded-full ring-2 ring-white/40"
              sizes="144px"
            />
          </div>
          <span className={`text-xs font-semibold transition-all duration-300 ${petType === "dog" ? "text-white" : "text-white/40"}`}>Dogs</span>
        </button>

        {/* Persian — Cats */}
        <button
          onClick={() => { setPetType("cat"); setQuery(""); setOpen(false); }}
          className="flex flex-col items-center gap-1 group focus:outline-none"
          aria-label="Show cat breeds"
        >
          <div className={`relative transition-all duration-300 ${petType === "cat" ? "w-28 h-28 sm:w-36 sm:h-36 drop-shadow-xl" : "w-20 h-20 sm:w-28 sm:h-28 opacity-50"}`}>
            <Image
              src="https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?w=1100&q=80"
              alt="Persian Cat"
              fill
              className="object-cover rounded-full ring-2 ring-white/40"
              sizes="144px"
            />
          </div>
          <span className={`text-xs font-semibold transition-all duration-300 ${petType === "cat" ? "text-white" : "text-white/40"}`}>Cats</span>
        </button>
      </div>

      {/* Dog / Cat toggle */}
      <div className="flex gap-2 mb-4 justify-center">
        {(["dog", "cat"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setPetType(t); setQuery(""); setOpen(false); }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border-2 transition-all ${petType === t ? "bg-white text-[#2E7D32] border-white shadow-sm" : "bg-white/15 text-green-100 border-white/20 hover:bg-white/25"}`}
          >
            {t === "dog" ? "🐕" : "🐈"} {t === "dog" ? "Dogs" : "Cats"}
          </button>
        ))}
      </div>

      {/* Search box */}
      <div ref={wrapperRef} className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent focus-within:border-[#A5D6A7] transition-all">
          <Search className="ml-3 sm:ml-4 h-5 w-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={`Search ${breeds.length}+ ${petType} breeds…`}
            className="flex-1 min-w-0 px-3 sm:px-4 py-4 text-base text-[#1B2B1B] placeholder-slate-400 bg-transparent outline-none"
          />
          <button
            onClick={() => router.push(`/calculator`)}
            className="m-2 flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white font-semibold px-4 sm:px-5 py-2.5 text-sm hover:bg-[#1B5E20] transition-all flex-shrink-0"
          >
            Calculate <ArrowRight className="hidden sm:block h-4 w-4" />
          </button>
        </div>

        {/* Dropdown */}
        {open && filtered.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#C8E6C9] shadow-xl overflow-hidden z-50">
            {!query && (
              <div className="px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-[#E8F5E9]">
                Popular breeds
              </div>
            )}
            {filtered.map((breed) => (
              <button
                key={breed.id}
                onMouseDown={() => handleSelect(breed)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F1F8F1] transition-colors text-left group"
              >
                <div>
                  <div className="text-sm font-semibold text-[#1B2B1B] group-hover:text-[#2E7D32]">{breed.name}</div>
                  <div className="text-xs text-slate-400 capitalize">{breed.size} · {breed.lifespan} yr lifespan</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#2E7D32]">{getMonthlyRange(breed)}</div>
                  <div className="text-xs text-slate-400">ongoing costs</div>
                </div>
              </button>
            ))}
            <div className="px-4 py-3 bg-[#F1F8F1] border-t border-[#E8F5E9]">
              <button
                onMouseDown={() => router.push(`/calculator`)}
                className="text-sm text-[#2E7D32] font-semibold hover:underline"
              >
                → Get a full personalised estimate with the calculator
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-green-200">
        <span>✓ Free, no signup</span>
        <span>✓ 300+ breeds</span>
        <span>✓ US · UK · AU prices</span>
      </div>
    </div>
  );
}
