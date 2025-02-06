import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    domains: ["lesyanebo.com", "avatars.mds.yandex.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ], // Добавь домен изображения
  },
};

export default nextConfig;
