/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser"),
        util: require.resolve("util/"),
      };

      config.plugins.push(
        new (require("webpack").ProvidePlugin)({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        })
      );
    }

    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // body limit shu yerga qo‘shiladi
    },
  },
  images: {
    domains: ["storage.googleapis.com"], // ruxsat berilgan domenlar
  },
};

module.exports = nextConfig;
