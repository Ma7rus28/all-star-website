import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The card payment page was removed; send old links and bookmarks to the quote page.
  async redirects() {
    return [
      { source: "/:lang(en|ar)/pay/:path*", destination: "/:lang/contact", permanent: true },
      { source: "/:lang(en|ar)/pay", destination: "/:lang/contact", permanent: true },
    ]
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
