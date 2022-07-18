/** @type {import('next').NextConfig} */

// import pkg from './lib/image-server.js';
// const { galleryRoute } = pkg;

const nextConfig = {
  reactStrictMode: true
}

const rewrites = async() => {
  return [
    {
      source: `/api/gallery/:path*`,
      destination: 'https://nft-gallery.bigeyes.space/:path*' // Proxy to Backend
    }
  ]
}

export default { nextConfig, rewrites }
