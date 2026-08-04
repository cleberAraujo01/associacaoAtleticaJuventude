import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // /apoie foi absorvida pela /parceiros (mural + formas de apoiar + conversão);
    // redirect permanente preserva links já compartilhados ou indexados.
    return [{ source: "/apoie", destination: "/parceiros", permanent: true }];
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
