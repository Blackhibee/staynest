/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/payment.html',
        destination: '/payment',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;