import { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog-data";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wedev.ma";
const LOCALES = ["fr", "ar", "en"];

const STATIC_ROUTES = [
  "",
  "/marketplace",
  "/marketplace/restaurant-pos-pro",
  "/marketplace/cafe-pos-light",
  "/marketplace/stock-manager-pro",
  "/marketplace/crm-business",
  "/marketplace/elearning-platform",
  "/marketplace/rh-paie",
  "/marketplace/reservation-system",
  "/marketplace/ecommerce-starter",
  "/blog",
  "/auth/login",
  "/auth/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes for each locale
  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}${route}`])),
        },
      });
    }
  }

  // Blog articles
  for (const article of ARTICLES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${article.slug}`,
        lastModified: new Date(article.dateISO),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}/blog/${article.slug}`])),
        },
      });
    }
  }

  return entries;
}
