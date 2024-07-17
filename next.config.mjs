/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tp.auziqni.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
