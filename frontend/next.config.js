/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        net: false,
        tls: false,
      },
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/holyaustin/precedentdao",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
