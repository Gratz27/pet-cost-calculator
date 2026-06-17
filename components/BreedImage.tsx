"use client";

import { useState } from "react";
import Image from "next/image";
import { realBreedPhotoMap, realBreedPhotoPosition } from "@/lib/breedImages";

// ─────────────────────────────────────────────────────────────────────────────
// BreedImage — loads mascot illustration from /public/breeds/[slug].png
//
// Strategy (June 2026):
//   1. Try local mascot PNG at /breeds/[slug].png
//   2. If not found → show branded paw placeholder (never falls back to API)
//
// To add a breed mascot: drop a PNG at /public/breeds/[slug].png
// Naming: kebab-case slug, e.g. golden-retriever.png, french-bulldog.png
//
// See CLAUDE.md → "Images — Mascot Illustration Strategy" for the
// DALL-E prompt template and priority breed list.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  breedId: string;
  petType: "dog" | "cat";
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

// Branded paw-print placeholder — shown for breeds without a mascot image yet
function PawPlaceholder({ petType, alt, fill, className }: Pick<Props, "petType" | "alt" | "fill" | "className">) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#E8F5E9] text-[#2E7D32] gap-1 ${fill ? "absolute inset-0" : "w-full h-full"} ${className ?? ""}`}
      aria-label={alt}
    >
      {/* Paw SVG */}
      <svg
        viewBox="0 0 64 64"
        className="w-10 h-10 opacity-40"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main pad */}
        <ellipse cx="32" cy="38" rx="13" ry="11" />
        {/* Toes */}
        <ellipse cx="16" cy="24" rx="6" ry="7" />
        <ellipse cx="26" cy="18" rx="6" ry="7" />
        <ellipse cx="38" cy="18" rx="6" ry="7" />
        <ellipse cx="48" cy="24" rx="6" ry="7" />
      </svg>
      <span className="text-[10px] font-medium text-[#5a7a5a] leading-tight text-center px-2 max-w-[90px]">
        {petType === "dog" ? "🐕" : "🐈"} {alt}
      </span>
    </div>
  );
}

export default function BreedImage({ breedId, petType, alt, fill, className, sizes }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Real animal photos (homepage "Popular Breeds" cards) take priority over
  // mascot illustrations — added June 2026.
  const realPhoto = realBreedPhotoMap[breedId];
  const localSrc = realPhoto ?? `/breeds/${breedId}.png`;

  if (failed) {
    return <PawPlaceholder petType={petType} alt={alt} fill={fill} className={className} />;
  }

  // Mascot illustrations must use object-contain (not object-cover) so the
  // full animal is always visible. We strip any object-cover class the caller
  // passes and enforce object-contain with bottom-alignment so the dog/cat
  // appears to "sit" in the card rather than being letterboxed in the middle.
  // Real photos look best cropped to fill the card, so they keep object-cover.
  const safeClass = realPhoto
    ? (className ?? "")
    : (className ?? "")
        .replace(/object-cover/g, "")
        .replace(/object-center/g, "")
        .trim();

  return (
    <>
      {/* Skeleton shown until the (lazy-loaded) image paints — prevents
          empty white boxes on slow connections */}
      {!loaded && (
        <div
          aria-hidden
          className={`${fill ? "absolute inset-0" : "w-full h-full"} flex items-center justify-center bg-[#E8F5E9] animate-pulse`}
        >
          <svg viewBox="0 0 64 64" className="w-10 h-10 opacity-25 text-[#2E7D32]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="38" rx="13" ry="11" />
            <ellipse cx="16" cy="24" rx="6" ry="7" />
            <ellipse cx="26" cy="18" rx="6" ry="7" />
            <ellipse cx="38" cy="18" rx="6" ry="7" />
            <ellipse cx="48" cy="24" rx="6" ry="7" />
          </svg>
        </div>
      )}
      <Image
        src={localSrc}
        alt={alt}
        fill={fill}
        style={realPhoto ? { objectPosition: realBreedPhotoPosition[breedId] ?? "50% 25%" } : undefined}
        className={`${realPhoto ? "object-cover" : "object-contain object-bottom"} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${safeClass}`}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
