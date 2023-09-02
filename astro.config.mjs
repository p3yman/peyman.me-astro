import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: `https://${import.meta.env.VERCEL_URL}`,
  integrations: [tailwind(), robotsTxt(), sitemap()],
  output: "server",
  adapter: vercel()
});