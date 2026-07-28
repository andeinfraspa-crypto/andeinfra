import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 👈 CAMBIO CLAVE: Genera la carpeta /out que exige Cloudflare Pages
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true, // 👈 REQUERIDO: Para que Next.js permita exportación estática de imágenes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
