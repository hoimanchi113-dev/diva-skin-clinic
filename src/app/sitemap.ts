import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/programs",
    "/about",
    "/contact",
    ...programs.map((p) => `/programs/${p.slug}`),
  ].map((path) => ({ url: `${siteUrl()}${path}` }));
}
