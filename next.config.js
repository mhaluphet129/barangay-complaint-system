/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      tls: false,
      process: require.resolve("process/browser"),
    };

    return config;
  },
};

module.exports = nextConfig;
