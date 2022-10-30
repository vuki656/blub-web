/** @type { import('next').NextConfig } */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    },
    reactStrictMode: true,
}

module.exports = nextConfig
