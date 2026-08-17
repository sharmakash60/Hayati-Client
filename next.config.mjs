/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: '/media/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 1. Mismatched Shopify handle fixes
      {
        source: '/collections/hopp-prebiotic-soda-copy',
        destination: '/#variants',
        permanent: true,
      },
      // 2. Collection URLs -> Landing section
      {
        source: '/collections',
        destination: '/#variants',
        permanent: true,
      },
      {
        source: '/collections/all',
        destination: '/#variants',
        permanent: true,
      },
      {
        source: '/collections/:collection',
        destination: '/#variants',
        permanent: true,
      },
      // 3. Nested collection product URLs -> Canonical PDP
      {
        source: '/collections/:collection/products/:product',
        destination: '/products/:product',
        permanent: true,
      },
      // 4. Shopify /pages/* URLs -> Canonical App Router pages
      {
        source: '/pages/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/contact',
        destination: '/#newsletter',
        permanent: true,
      },
      {
        source: '/pages/contact-us',
        destination: '/#newsletter',
        permanent: true,
      },
      {
        source: '/pages/faq',
        destination: '/#faq',
        permanent: true,
      },
      {
        source: '/pages/terms-and-conditions',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/pages/terms',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/pages/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/pages/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/pages/refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/pages/cancellation-and-refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/pages/legal-notice',
        destination: '/legal-notice',
        permanent: true,
      },
      // 5. Shopify /policies/* URLs -> Canonical legal routes
      {
        source: '/policies/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/policies/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/policies/refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/policies/shipping-policy',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/policies/legal-notice',
        destination: '/legal-notice',
        permanent: true,
      },
      // 6. Generic aliases
      {
        source: '/shop',
        destination: '/#variants',
        permanent: true,
      },
      {
        source: '/catalog',
        destination: '/#variants',
        permanent: true,
      },
      {
        source: '/flavors',
        destination: '/#variants',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
