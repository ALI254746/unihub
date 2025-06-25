/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
