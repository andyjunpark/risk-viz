const Dotenv = require('dotenv-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.plugins.push(new Dotenv());
    return config;
  },
};

module.exports = nextConfig;