"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

// Mobile-only sticky bottom CTA. Appears after the user scrolls past the hero
// so it never competes with the hero's own calculator entry point.
// Hidden on the calculator page itself.
export default function StickyCalculatorCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/calculator")) return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-white/95 backdrop-blur border-t border-[#C8E6C9] px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <Link
          href="/calculator"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm px-6 py-3 w-full hover:bg-[#1B5E20] transition-colors"
        >
          <Calculator className="h-4 w-4" /> Calculate My Costs — Free
        </Link>
      </div>
    </div>
  );
}
