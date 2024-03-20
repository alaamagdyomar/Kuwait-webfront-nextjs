/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["picks.testbedbynd.com", "localhost"],
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:lang/home",
        destination: "/:lang",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:lang/:path/orders",
        missing: [
          {
            type: "cookie",
            key: "NEXT_AUTH",
          },
        ],
        permanent: false,
        destination: "/:lang/:path",
      },
      {
        source: "/:lang/:path/account",
        missing: [
          {
            type: "cookie",
            key: "NEXT_AUTH",
          },
        ],
        permanent: false,
        destination: "/:lang/:path",
      },
      {
        source: "/:lang/:path/favorites",
        missing: [
          {
            type: "cookie",
            key: "NEXT_AUTH",
          },
        ],
        permanent: false,
        destination: "/:lang/:path",
      },
      {
        source: "/:lang/:path/promotions",
        missing: [
          {
            type: "cookie",
            key: "NEXT_AUTH",
          },
        ],
        permanent: false,
        destination: "/:lang/:path",
      },
      {
        source: "/:lang/:path/addresses",
        missing: [
          {
            type: "cookie",
            key: "NEXT_AUTH",
          },
        ],
        permanent: false,
        destination: "/:lang/:path",
      },
    ];
  },
  async headers() {
    return [];
  },
  env: {
    SECRET_APP_KEY: "",
    NEXT_PUBLIC_URL: "/",
    PUBLIC_URL: "/",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.testbedbynd.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ondigitalocean.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "queue-spaces.nyc3.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
