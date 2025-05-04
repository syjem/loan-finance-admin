import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://athtstjfbpznnzulavnc.supabase.co/storage/v1/object/public/avatars/**"
      ),
    ],
  },
};

export default nextConfig;
