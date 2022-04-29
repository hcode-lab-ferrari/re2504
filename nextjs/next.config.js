/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    MERCADOPAGO_KEY: process.env.MERCADO_PAGO_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
