import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Thumbnails do YouTube usadas pela facade (evita carregar o iframe no load).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
