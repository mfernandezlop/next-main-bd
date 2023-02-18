
/** @type {import('next').NextConfig} */


const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.tobi.sh',
      'cloudflare-ipfs.com',
      'loremflickr.com'
    ]
  },
  experimental: {
    appDir: true,
    topLevelAwait: false
    
  },
};

module.exports = nextConfig;
