import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "robohash.org",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "api.multiavatar.com",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "i.pravatar.cc",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
