/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // domains: ["naszsklep-api.vercel.app", "media.graphassets.com"],
    domains: [
      "naszsklep-api.vercel.app",
      "media.graphassets.com",
      "images.unsplash.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
