import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio.shmin-ib.com",
        port: "",
        pathname: "/landings/**",
      },
      {
        protocol: "https",
        hostname: "portfolio.shmin-ib.com",
        port: "",
        pathname: "/projects/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
