/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    outputStandalone: true
  }
}

export default nextConfig