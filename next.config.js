/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    API_URL:process.env.API_URL,
  },
  reactStrictMode: true,
  typescript:{
    ignoreBuildErrors:true,
  
  }
}

module.exports = nextConfig
