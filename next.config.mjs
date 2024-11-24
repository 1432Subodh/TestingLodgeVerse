/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'qwymhkktvbieizekmchi.supabase.co',
          pathname: '/storage/v1/object/public/image/**', // Adjust pathname if needed
        },
      ],
    },
  };

export default nextConfig;
