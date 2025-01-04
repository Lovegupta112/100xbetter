import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    JWTSECRETKEY:process.env.JWTSECRETKEY,
  }
};

export default nextConfig;
