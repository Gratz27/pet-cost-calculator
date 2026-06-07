import { MetadataRoute } from "next";
import { getAllBreeds } from "@/lib/calculator";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://petcost-calculator.com";
  const dogs = getAllBreeds("dog");
  const cats = getAllBreeds("cat");

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/calculator`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/breeds`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.4 },
  ];

  const breedPages = [...dogs, ...cats].map((b) => ({
    url: `${baseUrl}/breeds/${b.id}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...breedPages];
}
