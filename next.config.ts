import type { NextConfig } from 'next'

// GITHUB_PAGES=true produces a static export served from https://<user>.github.io/code/
const isGithubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: 'export' as const,
        basePath: '/code',
        assetPrefix: '/code/',
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'],
        },
      }),
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
