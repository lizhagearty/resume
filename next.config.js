/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
      });
    }
    return config;
  },
  // Add these lines
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

module.exports = nextConfig;
