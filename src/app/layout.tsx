import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: { default: 'UBTECH Việt Nam — Nhà phân phối độc quyền Robot & AI Giáo Dục', template: '%s | UBTECH Việt Nam' },
  description: 'Nhà phân phối độc quyền chính hãng UBTECH Robotics Corp. tại Việt Nam. Robot AI giáo dục, bộ kit lập trình và sách STEM K1-12 được Bộ GD&ĐT chứng nhận.',
  keywords: ['UBTECH', 'Robot giáo dục', 'AI Robotics', 'STEM', 'robot trẻ em', 'Alpha Mini', 'Yanshee', 'Cruzr'],
  openGraph: {
    title: 'UBTECH Việt Nam — Robot & AI Giáo Dục chính hãng',
    description: 'Nhà phân phối độc quyền UBTECH tại Việt Nam. Robot AI, bộ kit Robotics, sách STEM K1-12.',
    locale: 'vi_VN',
    type: 'website',
  },
};

const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
const PHONE = process.env.NEXT_PUBLIC_PHONE || ZALO;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Floating contact buttons */}
        <div className="fixed bottom-6 right-5 z-[999] flex flex-col items-end gap-3">
          <a href={`https://zalo.me/${ZALO}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-xl hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(135deg, #0068ff, #00c6ff)' }}
            aria-label="Chat Zalo">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.15" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">Z</text>
            </svg>
          </a>
          <a href={`tel:${PHONE}`}
            className="flex items-center justify-center w-12 h-12 bg-[#0057FF] rounded-full shadow-xl hover:scale-110 transition-transform hover:bg-[#003DA5]"
            aria-label="Gọi điện">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>
      </body>
    </html>
  );
}
