import { MetadataRoute } from "next";
import { KEYWORDS } from "./keywords/[slug]/page";

const CATEGORY_SLUGS = ["love", "work", "money", "health", "general"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://uranai-ai-sigma.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/uranai`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${base}/uranai/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...Object.keys(KEYWORDS).map((slug) => ({
      url: `${base}/keywords/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
