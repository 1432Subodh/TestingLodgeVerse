/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'qwymhkktvbieizekmchi.supabase.co',
          pathname: '/storage/v1/object/public/image/**', // Adjust pathname if needed
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          // pathname: '/storage/v1/object/public/image/**', // Adjust pathname if needed
        },
        {
          protocol: 'https',
          hostname: 'lh5.googleusercontent.com',
          // pathname: '/storage/v1/object/public/image/**', // Adjust pathname if needed
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          // pathname: '/storage/v1/object/public/image/**', // Adjust pathname if needed
        },
      ],
    },
  };

export default nextConfig;
