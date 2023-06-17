// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  async rewrites() {
    return {
      fallback: [{ source: "/:path*", destination: "/_404/:path*" }],
    };
  },
  staticPageGenerationTimeout: 3000,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["warn"] } : false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'unsplash.it',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
})
