import type { NextConfig } from 'next';
const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }], deviceSizes: [360, 640, 828, 1080, 1280, 1600], imageSizes: [64, 96, 128, 160, 200, 256, 320, 400] } };
export default nextConfig;
