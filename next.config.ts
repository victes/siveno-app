import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    domains: ["lesyanebo.com"], // Добавь домен изображения
  },
};

export default nextConfig;
