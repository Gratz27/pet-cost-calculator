/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve modern formats — the PNG mascots compress to a fraction of their
    // size as AVIF/WebP, which directly improves mobile LCP
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.dog.ceo" },
      { protocol: "https", hostname: "cdn2.thecatapi.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Legacy blog slugs that no longer exist — redirect to their current
      // equivalents so Google stops reporting Soft 404 / redirect errors
      // for these URLs (found via GSC Page Indexing audit, June 2026).
      {
        source: "/blog/small-vs-large-dogs",
        destination: "/blog/small-vs-large-dog-costs",
        permanent: true,
      },
      {
        source: "/blog/labrador-retriever-costs",
        destination: "/blog/labrador-retriever-costs-complete-guide",
        permanent: true,
      },
      {
        source: "/blog/purebred-vs-mixed-breed",
        destination: "/blog/purebred-vs-mixed-breed-costs",
        permanent: true,
      },
      {
        source: "/blog/city-vs-rural-pet-costs",
        destination: "/blog/pet-costs-by-location",
        permanent: true,
      },
      {
        source: "/blog/adoption-vs-breeder",
        destination: "/guides/rescue-vs-breeder-cost-comparison",
        permanent: true,
      },
      {
        source: "/blog/diy-pet-care",
        destination: "/guides/professional-vs-diy-grooming-costs",
        permanent: true,
      },
      {
        source: "/blog/budget-friendly-pet-care",
        destination: "/guides/how-to-budget-for-a-new-pet",
        permanent: true,
      },
      {
        source: "/blog/budget-friendly-pet-care-tips",
        destination: "/guides/how-to-budget-for-a-new-pet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
