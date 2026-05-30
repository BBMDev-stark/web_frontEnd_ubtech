'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const zalo  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
  const phone = process.env.NEXT_PUBLIC_PHONE || zalo;

  /* Logo IDs từ ubtechvietnam.edu.vn - đầy đủ 17 logo */
  const partnerLogos = [
    '1nyL_lq784JyipbXz409FvjwgZG8ejmj_','1x3S2wOUpBrYGxAKWOg9J_RtzQe139CvU',
    '1hqjBz3ht6iF4JUNqek_gFZNEUZOsxv4o','1bcqjlWNgawikjqQt-ua6q3K6X5Ty8ZY1',
    '11uM-ldKoFQeFIuJR67vfVaJxd109rXzh','1KVLf3dOxq5DN6LMIzTKjvqtsdJ7cbTjl',
    '1QRWTn0vq4_VyErfGV_pSPWOKUiF3wvEo','1Ajupr-6TNzMKulhlq8iIaYqljsozpRNY',
    '12S9ocUAC64kwtfkODAqxazEoMbLbUPap','1uXwP-j4KQNejcdoN8xkEzDg1u3NORWE_',
    '1sxlFS4mgIUbRcszOAYhmDlMwM7KCdlJp','1Gce5jrk6zLiok1W-CXMyTHhRZ-Uy4gLH',
    '1dK9RNEZH1bmOruUMHGOW18uxsTaYC4T-','1UpV9oHo0e2rjoUnz_l4QFQfuxwJCx6MD',
    '1HWWnwIfKn9hDXnFwoJdZgHqokKwNm9_x','1ah4cg1FnRpiWDKkFoCoQpeZBgpnwh2wz',
    '1osQp0YZqsMDWNBFTs4KEVvXrDkGrKm2e',
  ];

  return (
    <footer className="bg-[#0B1629] text-white">

      {/* ── CTA STRIP ── */}
      <div className="relative overflow-hidden bg-[#0057FF] py-10">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Cần tư vấn về AI & Robotics?</h3>
            <p className="text-blue-100 text-sm mt-1 font-light">Đội ngũ chuyên gia UBTECH Việt Nam luôn sẵn sàng hỗ trợ</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href={`https://zalo.me/${zalo}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0057FF] font-bold text-sm hover:bg-blue-50 transition-all shadow-lg">
              <MessageCircle className="w-4 h-4" /> Nhắn Zalo
            </a>
            <a href={`tel:${phone}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/30 text-white font-bold text-sm hover:bg-white/25 transition-all">
              <Phone className="w-4 h-4" /> {phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── PARTNER LOGOS — đầy đủ 17 đối tác từ ubtechvietnam.edu.vn ── */}
      <div className="border-b border-white/6 py-8 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-center text-[10px] text-[#3A5570] uppercase tracking-[0.22em] font-bold mb-8">Khách hàng & đối tác tin dùng</p>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {partnerLogos.map((id) => (
              <img key={id} src={`https://lh3.googleusercontent.com/d/${id}`}
                alt="Partner"
                className="h-9 w-auto object-contain max-w-[96px] grayscale invert opacity-55 hover:opacity-90 transition-opacity duration-200"
                onError={(e: any) => { e.target.style.display = 'none'; }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">

        {/* ── BRAND — 4 cols ── */}
        <div className="lg:col-span-4">
          {/* Logo thật */}
          <div className="mb-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfhqyaVMwIjSUwlvDADDX93fbyUNvXWGQbw&s"
              alt="UBTECH Vietnam"
              className="h-10 w-auto object-contain"
              style={{ filter: 'brightness(10) saturate(0)' }}
              onError={(e: any) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{display:'none'}} className="items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0057FF] flex items-center justify-center">
                <span className="text-white font-black text-lg">U</span>
              </div>
              <div>
                <p className="text-[16px] font-black">UBTECH <span className="text-[#4A8AFF]">Việt Nam</span></p>
                <p className="text-[10px] text-[#2A4060] uppercase tracking-[0.16em]">IPPTech – IPPG</p>
              </div>
            </div>
          </div>

          <p className="text-[#4A6A88] text-sm leading-relaxed mb-5">
            Nhà phân phối độc quyền chính hãng <strong className="text-[#6A8AB0]">UBTECH Robotics Corp.</strong> tại Việt Nam, thông qua Công ty TNHH Công nghệ và Giáo dục IPP (IPPTech) — thành viên Tập đoàn Liên Thái Bình Dương (IPPG). Hợp tác độc quyền từ ngày 9/9/2019.
          </p>

          <div className="space-y-2 mb-6">
            {[
              'Độc quyền phân phối chính hãng từ 2019',
              'Được Bộ GD&ĐT & Bộ KH&CN chứng nhận',
              'Hơn 500+ sản phẩm, 10.000+ khách hàng',
              'A.I. Center tại ĐH Đà Lạt & ĐHQG TP.HCM',
            ].map(t => (
              <div key={t} className="flex items-start gap-2 text-xs text-[#4A6A88]">
                <span className="w-3.5 h-px bg-[#0057FF] flex-shrink-0 mt-2" />
                {t}
              </div>
            ))}
          </div>

          {/* Mạng xã hội — thêm TikTok theo ubtechvietnam.edu.vn */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Facebook', href: 'https://www.facebook.com/ubtechvietnam' },
              { label: 'YouTube',  href: 'https://www.youtube.com/@ubtechvietnam' },
              { label: 'TikTok',   href: 'https://www.tiktok.com/@ubtechvietnam' },
              { label: 'Website',  href: 'https://ubtechvietnam.edu.vn' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-[#4A6A88] hover:text-white hover:border-[#0057FF]/40 hover:bg-[#0057FF]/10 text-xs font-medium transition-all">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── SẢN PHẨM — 2 cols ── */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-[#0057FF] rounded-full" /> Sản phẩm
          </h4>
          <ul className="space-y-2.5">
            {[
              ['/san-pham?category=robot',  'Robot UBTECH'],
              ['/san-pham?category=bo-kit', 'Bộ Kit AI & JIMU'],
              ['/san-pham?category=sach',   'Sách giáo trình STEM'],
              ['/san-pham?featured=true',   'Sản phẩm nổi bật'],
              ['/san-pham',                 'Tất cả sản phẩm'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-[#4A6A88] hover:text-white text-sm transition-colors block hover:translate-x-0.5 transform">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── GIỚI THIỆU — 2 cols ── */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-[#0057FF] rounded-full" /> Giới thiệu
          </h4>
          <ul className="space-y-2.5">
            {[
              ['/gioi-thieu',          'Về Chúng Tôi'],
              ['/cong-nghe',           'Công Nghệ AI'],
              ['/phan-mem',            'Phần Mềm & App'],
              ['/ai-center',           'A.I. Center'],
              ['/chuong-trinh-k12',    'Chương Trình K12'],
              ['/ai-robotic-giao-duc', 'AI Robotic Giáo Dục'],
              ['/giai-phap-robot',     'Giải Pháp Robot'],
              ['/tin-tuc',             'Tin Tức'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-[#4A6A88] hover:text-white text-sm transition-colors block hover:translate-x-0.5 transform">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── LIÊN HỆ — 4 cols — đầy đủ địa chỉ theo ubtechvietnam.edu.vn ── */}
        <div className="lg:col-span-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-[#0057FF] rounded-full" /> Liên hệ
          </h4>

          <ul className="space-y-4">
            {/* Hotline */}
            <li>
              <a href={`tel:${phone}`} className="group flex items-start gap-3 text-[#4A6A88] hover:text-white text-sm transition-colors">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0057FF]/30 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">Hotline / Zalo</p>
                  <p className="font-semibold text-white">{phone}</p>
                </div>
              </a>
            </li>

            {/* Email */}
            <li>
              <a href="mailto:webubtechvietnam@gmail.com" className="group flex items-start gap-3 text-[#4A6A88] hover:text-white text-sm transition-colors">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0057FF]/30 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">Email</p>
                  <p className="text-xs">webubtechvietnam@gmail.com</p>
                </div>
              </a>
            </li>

            {/* VP TP.HCM */}
            <li>
              <div className="flex items-start gap-3 text-[#4A6A88] text-sm">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">Văn phòng TP.HCM</p>
                  <p className="text-xs leading-relaxed text-[#4A6A88]">
                    Tầng 3, Tòa nhà Centec,<br />
                    72–74 Nguyễn Thị Minh Khai,<br />
                    Phường Võ Thị Sáu, Quận 3, TP.HCM
                  </p>
                </div>
              </div>
            </li>

            {/* VP Hà Nội */}
            <li>
              <div className="flex items-start gap-3 text-[#4A6A88] text-sm">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">Văn phòng Hà Nội</p>
                  <p className="text-xs leading-relaxed text-[#4A6A88]">
                    24 Hai Bà Trưng,<br />
                    Tràng Tiền, Hoàn Kiếm, Hà Nội
                  </p>
                </div>
              </div>
            </li>

            {/* AIC TP.HCM */}
            <li>
              <div className="flex items-start gap-3 text-[#4A6A88] text-sm">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">A.I. Center TP.HCM</p>
                  <p className="text-xs leading-relaxed text-[#4A6A88]">
                    Block 86, KCN Phần mềm,<br />
                    Võ Trường Toản, Thủ Đức<br />
                    (Làng ĐH Quốc Gia TP.HCM)
                  </p>
                </div>
              </div>
            </li>

            {/* AIC Đà Lạt */}
            <li>
              <div className="flex items-start gap-3 text-[#4A6A88] text-sm">
                <span className="w-7 h-7 rounded-lg bg-[#0057FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4A8AFF]" />
                </span>
                <div>
                  <p className="text-[10px] text-[#2A4060] uppercase tracking-wide font-bold mb-0.5">A.I. Center Đà Lạt</p>
                  <p className="text-xs leading-relaxed text-[#4A6A88]">
                    Trường Đại học Đà Lạt,<br />
                    01 Phù Đổng Thiên Vương, Đà Lạt, Lâm Đồng
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/6 bg-[#060C16] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#1E3050]">
          <p>© {new Date().getFullYear()} UBTECH Việt Nam · IPPTech – Tập đoàn Liên Thái Bình Dương (IPPG) · Nhà phân phối độc quyền UBTECH Robotics Corp.</p>
          <div className="flex items-center gap-4">
            {['Điều khoản sử dụng', 'Chính sách bảo mật', 'Chính sách đổi trả'].map(t => (
              <Link key={t} href="#" className="hover:text-[#4A7AAA] transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
