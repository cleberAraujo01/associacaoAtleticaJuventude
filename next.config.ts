import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /contato foi absorvida por /canais (seção "Fale com a gente")
      { source: "/contato", destination: "/canais", permanent: true },
    ];
  },
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
