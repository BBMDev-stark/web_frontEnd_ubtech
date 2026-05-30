/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Tắt optimization để ảnh từ nhiều nguồn hiển thị được
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'img.vietqr.io' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      // Ảnh thật từ website UBTECH VN
      { protocol: 'https', hostname: 'www.ubtechvietnam.com' },
      { protocol: 'https', hostname: 'ubtechvietnam.edu.vn' },
      { protocol: 'https', hostname: 's4h.edu.vn' },
      // Logo UBTECH từ Google cache
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
    ],
  },
};

export default nextConfig;
