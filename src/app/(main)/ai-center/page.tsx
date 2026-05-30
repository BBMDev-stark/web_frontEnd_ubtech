'use client';
import Link from 'next/link';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────
   9 ẢNH THỰC TẾ từ ubtechvietnam.edu.vn
   (đúng như trong code gốc — đã có URL đầy đủ)
───────────────────────────────────────────────────────── */
const GALLERY = [
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-01-1024x725.jpg',  caption: 'Không gian trưng bày chính — A.I. Center ĐHQG TP.HCM' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-03-1024x724.jpg',  caption: 'Khu vực trải nghiệm AI Center' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-08.jpg',           caption: 'Học viên thực hành robot UBTECH' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-26-1024x724.jpg',  caption: 'Khu trưng bày robot thương mại' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-27-1024x724.jpg',  caption: 'Khu vực tương tác với robot UBTECH' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-29-1024x725.jpg',  caption: 'Hội trường thực hành AI' },
  { src: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-07.jpg',           caption: 'Khu lắp ráp và lập trình' },
  { src: 'https://owebsite-cdn.ubtrobot.com/en/uploadfiles/home8mo.png',                  caption: 'Hệ sinh thái robot UBTECH toàn diện' },
  { src: 'https://owebsite-cdn.ubtrobot.com/en/uploadfiles/education/aEduNeeds_03.jpg',   caption: 'Chương trình giáo dục AI — UBTECH toàn cầu' },
];

const MISSIONS = [
  { n: '01', title: 'Trải nghiệm Robot thực tế',    desc: 'Học viên được thực hành trực tiếp với robot UBTECH — Yanshee, Alpha Mini, Walker. Không chỉ lý thuyết trên giấy mà là tương tác với thiết bị thật trong môi trường thực.' },
  { n: '02', title: 'Lập trình AI ứng dụng',        desc: 'Chương trình từ Scratch/Blockly đến Python và AI frameworks — theo chuẩn UBTECH toàn cầu, được Bộ KH&CN Việt Nam thẩm định và phê duyệt.' },
  { n: '03', title: 'Đào tạo & chứng nhận GV',      desc: 'Tập huấn và cấp chứng nhận giáo viên AI & Robotics theo chuẩn quốc tế, đảm bảo chất lượng giảng dạy nhất quán tại các trường triển khai.' },
  { n: '04', title: 'Thi đấu & kết nối quốc tế',    desc: 'Tổ chức cuộc thi robotics, hackathon AI và kết nối cộng đồng UBTECH tại 50+ quốc gia — mở rộng cơ hội học tập và cạnh tranh cho học sinh Việt Nam.' },
  { n: '05', title: 'Nghiên cứu & Phát triển',      desc: 'Không gian R&D cho sinh viên và giảng viên hợp tác phát triển ứng dụng AI thực tiễn — có thiết bị, mentor và kết nối với hệ sinh thái UBTECH toàn cầu.' },
  { n: '06', title: 'Kết nối doanh nghiệp',         desc: 'Cầu nối chiến lược giữa trường đại học và doanh nghiệp lĩnh vực AI & Robotics — tạo cơ hội việc làm, thực tập và hợp tác nghiên cứu cho sinh viên.' },
];

const STATS = [
  { val: '2', label: 'Trung tâm', sub: 'TP.HCM & Đà Lạt' },
  { val: '1.5M+', label: 'Học sinh', sub: 'toàn hệ thống' },
  { val: '3', label: 'Đối tác', sub: 'IPPG · IPPTech · UBTECH' },
  { val: '2021', label: 'Thành lập', sub: 'tại Việt Nam' },
];

export default function AICenterPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white min-h-screen">

      {/* ══ HERO ══ */}
      <section className="relative bg-[#020C1B] text-white overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,87,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,87,255,0.05) 1px,transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-[#0057FF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0057FF]/10 border border-[#0057FF]/20 text-[#5A9AFF] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-pulse" />
                Artificial Intelligence Center
              </div>

              <h1 className="text-[52px] lg:text-[62px] font-black leading-[0.95] tracking-tighter mb-8">
                A.I. Center<br />
                <span className="text-[#0057FF]">Trung tâm</span><br />
                Đào tạo AI
              </h1>

              <p className="text-[#4A6A8A] text-lg leading-relaxed mb-10 max-w-lg">
                Tập đoàn Liên Thái Bình Dương (IPPG) tài trợ thành lập các Trung tâm Giáo dục Đào tạo Trí tuệ nhân tạo tại các trường đại học hàng đầu Việt Nam — nơi thực hành AI với robot thật.
              </p>

              <div className="grid grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-10">
                {STATS.map(s => (
                  <div key={s.label} className="bg-[#020C1B] px-3 py-5 text-center">
                    <p className="text-lg font-black text-[#0057FF]">{s.val}</p>
                    <p className="text-[9px] text-[#1A3050] uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Location pills */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { city: 'TP.HCM', uni: 'ĐHQG TP.HCM', dot: true },
                  { city: 'Đà Lạt', uni: 'ĐH Đà Lạt', dot: true },
                ].map(loc => (
                  <div key={loc.city} className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0B1629] rounded-xl border border-white/8">
                    <span className="w-2 h-2 rounded-full bg-[#0057FF] flex-shrink-0" />
                    <div>
                      <p className="text-white font-bold text-sm leading-none">{loc.city}</p>
                      <p className="text-[#1A3050] text-[10px] mt-0.5">{loc.uni}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-white/8 aspect-[4/3] bg-[#0B1629]">
                <img src={GALLERY[0].src} alt="A.I. Center"
                  className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B]/70 via-transparent to-transparent" />
              </div>
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="bg-[#020C1B]/85 backdrop-blur-md rounded-xl px-5 py-3.5 border border-white/10">
                  <p className="font-bold text-sm text-white">A.I. Center — ĐHQG TP.HCM</p>
                  <p className="text-[#4A6A8A] text-xs mt-0.5">Block 86, KCN Phần mềm, Võ Trường Toản, Thủ Đức</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[#0057FF] text-white px-4 py-2 rounded-xl font-black text-sm shadow-lg shadow-[#0057FF]/40">
                Đang mở cửa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY — FULL 9 IMAGES ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Hình ảnh thực tế</p>
            <h2 className="text-4xl font-black text-[#0A0F1A]">Bên trong A.I. Center</h2>
            <p className="text-[#6B7280] mt-3">Không gian trải nghiệm và đào tạo AI & Robotics hiện đại bậc nhất Việt Nam</p>
          </div>

          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden bg-[#F4F7FF] mb-4" style={{ aspectRatio: '16/7' }}>
            <img
              src={GALLERY[active].src}
              alt={GALLERY[active].caption}
              className="w-full h-full object-cover transition-all duration-500"
              key={active}
            />
            {/* Gradient + caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-semibold text-base drop-shadow-lg">{GALLERY[active].caption}</p>
              <p className="text-white/60 text-sm mt-0.5">{active + 1} / {GALLERY.length}</p>
            </div>
            {/* Prev/Next arrows */}
            <button
              onClick={() => setActive(i => (i - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-sm text-lg font-bold">
              ‹
            </button>
            <button
              onClick={() => setActive(i => (i + 1) % GALLERY.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-sm text-lg font-bold">
              ›
            </button>
          </div>

          {/* Thumbnails — 9 ảnh, 3 hàng × 3 cột trên mobile, 9 cột trên desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {GALLERY.map((g, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`aspect-square rounded-xl overflow-hidden transition-all duration-200 border-2
                  ${active === i
                    ? 'border-[#0057FF] ring-2 ring-[#0057FF]/30 opacity-100'
                    : 'border-transparent opacity-55 hover:opacity-90 hover:border-gray-200'
                  }`}>
                <img src={g.src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSIONS ══ */}
      <section className="py-24 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            <div className="lg:sticky lg:top-8">
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-4">Sứ mệnh & Mục tiêu</p>
              <h2 className="text-4xl font-black text-[#0A0F1A] leading-tight mb-5">
                Trang bị năng lực AI cho thế hệ tương lai
              </h2>
              <p className="text-[#64748B] leading-relaxed">
                A.I. Center là nơi học sinh, sinh viên và giáo viên thực hành trực tiếp với robot và công nghệ AI tiên tiến theo chuẩn quốc tế UBTECH.
              </p>
            </div>

            <div className="lg:col-span-2 divide-y divide-gray-200">
              {MISSIONS.map(m => (
                <div key={m.n} className="py-7 grid grid-cols-12 gap-5 group">
                  <div className="col-span-2">
                    <span className="text-4xl font-black text-[#E2E8F0] group-hover:text-[#0057FF]/20 transition-colors">{m.n}</span>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-base font-black text-[#0A0F1A] mb-2 group-hover:text-[#0057FF] transition-colors">{m.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOCATIONS ══ */}
      <section className="py-24 bg-[#020C1B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Địa điểm</p>
            <h2 className="text-4xl font-black text-white">Hệ thống A.I. Center</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            {[
              {
                num: '01', badge: 'Trung tâm chính · Quy mô lớn nhất',
                name: 'A.I. Center — TP. Hồ Chí Minh',
                uni: 'Đại học Quốc Gia TP.HCM',
                addr: 'Block 86, Khu Công nghệ Phần mềm\nVõ Trường Toản, Khu phố 6\nThủ Đức, TP.HCM',
                img: GALLERY[0].src,
              },
              {
                num: '02', badge: 'Trung tâm khu vực Tây Nguyên',
                name: 'A.I. Center — Đà Lạt',
                uni: 'Trường Đại học Đà Lạt',
                addr: '1 Phù Đổng Thiên Vương\nPhường 8, Đà Lạt, Lâm Đồng',
                img: GALLERY[3].src,
              },
            ].map(loc => (
              <div key={loc.name}
                className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-[#0057FF]/40 transition-all duration-300">
                {/* Background image */}
                <div className="h-48 overflow-hidden">
                  <img src={loc.img} alt={loc.name}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-300 group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#020C1B]/20 to-[#020C1B]" />
                </div>
                {/* Content */}
                <div className="relative bg-[#0B1629] p-7 -mt-1">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#0057FF] text-white mb-4">{loc.badge}</div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white mb-1 group-hover:text-[#0057FF] transition-colors">{loc.name}</h3>
                      <p className="text-[#0057FF] font-bold text-sm mb-4">{loc.uni}</p>
                      <p className="text-[#3A5A7A] text-sm leading-relaxed whitespace-pre-line">{loc.addr}</p>
                    </div>
                    <span className="text-5xl font-black text-white/5 leading-none">{loc.num}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTNERS ══ */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Được tài trợ & đồng hành</p>
            <h2 className="text-3xl font-black text-[#0A0F1A]">Đối tác thành lập A.I. Center</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: 'IPPG',    full: 'Tập đoàn Liên Thái Bình Dương', role: 'Đơn vị chủ quản & tài trợ' },
              { name: 'IPPTech', full: 'Công ty TNHH Công nghệ và Giáo dục IPP', role: 'Đối tác triển khai chính' },
              { name: 'UBTECH',  full: 'UBTECH Robotics Corp.', role: 'Cung cấp công nghệ & robot' },
            ].map(p => (
              <div key={p.name}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#0057FF]/20 hover:shadow-[0_4px_24px_rgba(0,87,255,0.07)] transition-all text-center">
                <p className="text-4xl font-black text-[#0A0F1A] mb-3 group-hover:text-[#0057FF] transition-colors">{p.name}</p>
                <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">{p.full}</p>
                <p className="text-[10px] font-bold text-[#0057FF] uppercase tracking-wider">{p.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 bg-[#0057FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Muốn đưa A.I. Center về trường bạn?</h2>
            <p className="text-[#A0C4FF]">Liên hệ UBTECH Việt Nam để tìm hiểu chương trình hợp tác thành lập Trung tâm AI & Robotics</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/lien-he" className="px-7 py-3.5 bg-white text-[#0057FF] text-sm font-black rounded-xl hover:bg-blue-50 transition-colors">
              Liên hệ hợp tác
            </Link>
            <Link href="/chuong-trinh-k12" className="px-7 py-3.5 border border-white/30 text-white text-sm font-black rounded-xl hover:bg-white/10 transition-colors">
              Chương trình K12
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
