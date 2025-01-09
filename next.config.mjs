/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qwymhkktvbieizekmchi.supabase.co',
        pathname: '/storage/v1/object/public/image/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lodgeverse.netlify.app',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizeFonts: true,
  },
  webpack(config) {
    config.optimization.minimize = true;
    return config;
  },
};

export default nextConfig;
