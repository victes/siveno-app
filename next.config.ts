import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    domains: ["lesyanebo.com", "avatars.mds.yandex.net", "i.pinimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.tildacdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pokupkalux.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
