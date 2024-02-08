/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { // used for viewing demo images, delete if the client will not be using images from Wikimedia Commons
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static.thenounproject.com',
        port: '',
      }
    ],
  },
}

module.exports = nextConfig
