/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://kasamadigital.com http://localhost:3000;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;