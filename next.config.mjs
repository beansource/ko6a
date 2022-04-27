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
  },
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  }
}

export default nextConfig