/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uwja77bygk2kgfqe.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "scontent.fjsr1-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
