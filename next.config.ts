import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    domains: ["lesyanebo.com", "avatars.mds.yandex.net"], // Добавь домен изображения
  },
};

export default nextConfig;
