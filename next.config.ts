import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3021/:path*',
      },
      {
        source: '/chat/:path*',
        destination: 'http://localhost:3021/chat/:path*',
      },
      {
        source: '/socket.io',
        destination: 'http://localhost:3021/socket.io',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://localhost:3021/socket.io/:path*',
      },
    ]
  },
}

export default nextConfig
