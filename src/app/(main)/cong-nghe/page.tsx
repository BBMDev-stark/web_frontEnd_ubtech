'use client';
import Link from 'next/link';
import { useState } from 'react';

/* ─────────────────────────────────────────────
   IMAGES — ubtrobot.com CDN cho Humanoid
           Google Drive cho EDU/Commercial (đã lưu sẵn)
───────────────────────────────────────────── */

const HUMANOID = [
  {
    name: 'Walker S1',
    tag: 'Industrial · Flagship',
    badge: 'Latest',
    img: 'https://i.ytimg.com/vi/UBbk18oZbTc/maxresdefault.jpg',
    href: 'https://www.ubtrobot.com/en/humanoid/products/walker-s1',
    specs: [
      { label: 'Degrees of Freedom', val: '36 DoF' },
      { label: 'Height / Weight', val: '145 cm · 77 kg' },
      { label: 'Walking Speed', val: '3 km/h' },
      { label: 'Payload per Hand', val: '3 kg × 2' },
    ],
    desc: 'Robot hình người tiên tiến nhất của UBTECH — đã triển khai thực tế trên dây chuyền sản xuất ô tô điện BYD. Tương tác ngôn ngữ tự nhiên, leo cầu thang, điều khiển nhà thông minh.',
  },
  {
    name: 'Walker S2',
    tag: 'Industrial · Next-Gen',
    badge: 'New',
    img: 'https://i.ytimg.com/vi/TNryO2uasws/maxresdefault.jpg',
    href: 'https://www.ubtrobot.com/en/humanoid/products/walker-s2',
    specs: [
      { label: 'Hand DoF', val: '12 DoF/hand' },
      { label: 'Vision System', val: 'Multi-modal AI' },
      { label: 'Manipulation', val: 'Precision grasping' },
      { label: 'Applications', val: 'Automotive · EV' },
    ],
    desc: 'Thế hệ kế tiếp — bàn tay khéo léo 12 DoF, hệ thống thị giác AI đa phương thức, tối ưu cho tự động hóa công nghiệp và dây chuyền sản xuất EV quy mô lớn.',
  },
  {
    name: 'Walker C',
    tag: 'Commercial · Service',
    badge: '',
    img: 'https://i.ytimg.com/vi/INZ5jXuyUBg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFiyYluRomBK0eKihj44JY3hBDhA',
    href: 'https://www.ubtrobot.com/en/humanoid/products/walker-c',
    specs: [
      { label: 'Environment', val: 'Hospitality · Retail' },
      { label: 'Interaction', val: 'NLP multi-language' },
      { label: 'Navigation', val: 'U-SLAM autonomous' },
      { label: 'Interface', val: '10" touchscreen' },
    ],
    desc: 'Humanoid thương mại cho khách sạn, bán lẻ và văn phòng. Tự điều hướng không gian phức tạp, giao tiếp đa ngôn ngữ và tích hợp hệ thống quản lý dịch vụ.',
  },
];

const COMMERCIAL = [
  {
    name: 'Cruzr S2',
    tag: 'Wheeled Service Robot',
    img: 'https://owebsite-cdn.ubtrobot.com/resources/image/2025/08/20/710747560288325.png',
    href: '/san-pham/cruzr-s2',
    desc: 'Robot dịch vụ bánh xe thế hệ mới — U-SLAM 10.000 m², nhận diện khuôn mặt và màn hình tương tác 10". Phù hợp ngân hàng, bệnh viện, trung tâm thương mại.',
    specs: ['U-SLAM 10,000 m²', 'Face recognition AI', '10" touchscreen', '24/7 autonomous'],
  },
  {
    name: 'Adibot',
    tag: 'Healthcare · UV-C',
    img: 'https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz',
    href: '/san-pham/adibot',
    desc: 'Robot khử khuẩn UV-C 360° hoàn toàn tự hành. Vô hiệu hoá vi khuẩn và virus tại bệnh viện, trường học, sân bay không cần nhân sự vận hành.',
    specs: ['UV-C 360° auto', 'U-SLAM navigation', 'Human-safe sensors', 'Unattended ops'],
  },
  {
    name: 'Cadebot L100',
    tag: 'Logistics · AMR',
    img: 'https://lh3.googleusercontent.com/d/1K5Tue2ITNasEiUJr2EM0HEueqvkToP9A',
    href: '/san-pham/cadebot',
    desc: 'Robot AMR logistics tự hành, tải trọng 100 kg — tự động hoá kho hàng và nhà máy, tích hợp WMS/ERP, vận hành 24/7 liên tục.',
    specs: ['100 kg payload', 'AMR autonomous', 'WMS/ERP ready', '24/7 operation'],
  },
];

const EDU = [
  {
    name: 'Walker Tienkung',
    tag: 'University · Humanoid',
    img: 'https://owebsite-cdn.ubtrobot.com/resources/image/2025/12/18/753204368146501.png',
    href: 'https://www.ubtrobot.com/en/ai-education/products/walker-tienkung',
    desc: 'Dòng Walker thu nhỏ cho phòng thí nghiệm đại học — thực hành AI, điều khiển robot hai chân, Python và ROS với phần cứng thực tế.',
    specs: ['Biped humanoid', 'Python / ROS', 'AI Vision system', 'University-grade'],
  },
  {
    name: 'Yanshee',
    tag: 'STEM · Open Platform',
    img: 'https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L',
    href: '/san-pham/yanshee',
    desc: 'Robot humanoid giáo dục nền tảng mở — 17 servo, Raspberry Pi 3B+, lập trình Python và AI thực chiến cho THCS, THPT và Đại học.',
    specs: ['17 servo actuators', 'Raspberry Pi 3B+', 'Python · Blockly · DRP', 'Open API/SDK'],
  },
  {
    name: 'AI UGOT',
    tag: 'Modular · AI Vision',
    img: 'https://lh3.googleusercontent.com/d/17-nzBOR9sO5C7wtX3TQLTj0nFGD6VwQm',
    href: '/san-pham/ai-ugot',
    desc: 'Hệ thống robot mô-đun tích hợp AI Vision — nhận diện vật thể thời gian thực, lập trình đa cấp từ Blockly kéo-thả đến Python nâng cao.',
    specs: ['Modular system', 'AI Vision camera', 'Blockly → Python', 'Arduino compat.'],
  },
  {
    name: 'uKit AI',
    tag: 'K12 · Curriculum',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShRmKYOS6RIzm_2h-xUvpZZ2pDB8PW8MJLA&s',
    href: 'https://www.ubtrobot.com/en/ai-education/products/ukit-ai',
    desc: 'Bộ kit giáo dục AI chuẩn K12 — kết hợp lắp ráp phần cứng với lập trình AI và machine learning theo chương trình UBTECH toàn cầu.',
    specs: ['AI + hardware kit', 'Machine learning', 'K12 curriculum', 'Cloud platform'],
  },
];

const CORE_TECH = [
  {
    n: '01', metric: '700+ Patents',
    en: 'Servo Actuator',
    title: 'Hệ Servo Độc Quyền',
    desc: 'Hơn 700 bằng sáng chế toàn cầu. Mô-men xoắn cao, phản hồi lực tức thì với độ chính xác đến 0.1° — nền tảng công nghệ của mọi robot UBTECH.',
  },
  {
    n: '02', metric: '60fps Real-time',
    en: 'Perception Intelligence',
    title: 'Computer Vision & AI',
    desc: 'Nhận diện khuôn mặt, phát hiện vật thể, theo dõi mục tiêu và ước tính tư thế theo thời gian thực trong môi trường động phức tạp.',
  },
  {
    n: '03', metric: '10,000 m² Map',
    en: 'Autonomous Navigation',
    title: 'U-SLAM Navigation',
    desc: 'Lập bản đồ và định vị đồng thời đến 10.000 m², né tránh chướng ngại vật động và điều hướng tự hành hoàn toàn không cần cơ sở hạ tầng phụ.',
  },
  {
    n: '04', metric: '<10ms Response',
    en: 'Dynamic Balance Control',
    title: 'Bipedal Locomotion',
    desc: 'Thuật toán điều phối chuyển động hai chân — duy trì thăng bằng động, leo cầu thang và vượt địa hình bất thường với phản ứng dưới 10ms.',
  },
];

/* ─── Sub-components ─── */

function HumanoidSelector({ robots, active, onSelect }: { robots: typeof HUMANOID; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="space-y-2">
      {robots.map((r, i) => (
        <button key={r.name} onClick={() => onSelect(i)}
          className={`w-full text-left rounded-xl border transition-all duration-200 overflow-hidden flex items-center gap-4 px-4 py-3.5
            ${active === i
              ? 'border-[#0057FF]/50 bg-[#0D1A30] shadow-[0_0_30px_rgba(0,87,255,0.12)]'
              : 'border-white/6 bg-[#0B1629] hover:border-white/15'
            }`}>
          <div className={`w-1.5 h-8 rounded-full transition-all ${active === i ? 'bg-[#0057FF]' : 'bg-white/10'}`} />
          <div className="w-12 h-12 rounded-lg bg-[#060E1E] flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src={r.img} alt={r.name} className="w-10 h-10 object-contain"
              onError={(e: any) => { e.target.style.opacity = '0.1'; }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-sm transition-colors ${active === i ? 'text-white' : 'text-[#4A6A8A]'}`}>{r.name}</span>
              {r.badge && (
                <span className="px-1.5 py-0.5 bg-[#0057FF] text-white text-[9px] rounded font-black uppercase tracking-wider">{r.badge}</span>
              )}
            </div>
            <p className="text-[10px] text-[#1A3050] uppercase tracking-wider truncate">{r.tag}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function CongNghePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = HUMANOID[activeIdx];

  return (
    <div className="bg-white min-h-screen">

      {/* ══ HERO — HUMANOID ══ */}
      <section className="relative bg-[#020C1B] overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(0,87,255,0.06) 0%, transparent 60%), linear-gradient(rgba(0,87,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,87,255,0.05) 1px,transparent 1px)',
            backgroundSize: 'auto, 80px 80px, 80px 80px'
          }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020C1B] to-transparent pointer-events-none z-10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text + selector */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#0057FF]/25 bg-[#0057FF]/8 text-[#5A9AFF] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-pulse" />
                UBTECH Humanoid Robotics Leader
              </div>

              <h1 className="text-[56px] lg:text-[68px] font-black leading-[0.95] tracking-tighter mb-8 text-white">
                Dẫn đầu<br />
                <em className="not-italic text-[#0057FF]">Humanoid</em><br />
                Toàn cầu
              </h1>

              <p className="text-[#4A6A8A] text-lg leading-relaxed mb-10 max-w-md">
                Công ty đầu tiên thương mại hoá thành công robot hình người — từ nhà máy BYD đến không gian dịch vụ và giáo dục trên toàn thế giới.
              </p>

              <div className="grid grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-10">
                {[['700+','Patents'],['4','R&D Labs'],['50+','Countries'],['2019','Since']].map(([n, l]) => (
                  <div key={l} className="bg-[#020C1B] px-3 py-5 text-center">
                    <p className="text-xl font-black text-[#0057FF]">{n}</p>
                    <p className="text-[9px] text-[#1A3050] uppercase tracking-widest mt-1">{l}</p>
                  </div>
                ))}
              </div>

              <HumanoidSelector robots={HUMANOID} active={activeIdx} onSelect={setActiveIdx} />
            </div>

            {/* Featured robot */}
            <div>
              <div className="relative bg-[#0B1629] rounded-3xl border border-white/8 overflow-hidden p-8">
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#0057FF]/8 rounded-full blur-3xl pointer-events-none" />

                {/* Robot image */}
                <div className="relative h-80 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 bg-radial-gradient" />
                  <img key={featured.name} src={featured.img} alt={featured.name}
                    className="relative h-full w-full object-contain drop-shadow-[0_20px_80px_rgba(0,87,255,0.25)] transition-all duration-500"
                    onError={(e: any) => { e.target.style.opacity = '0.08'; }} />
                </div>

                <div className="relative border-t border-white/8 pt-7">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-[10px] text-[#0057FF] font-bold uppercase tracking-widest mb-2">{featured.tag}</p>
                      <h3 className="text-3xl font-black text-white">{featured.name}</h3>
                    </div>
                    {featured.badge && (
                      <span className="px-3 py-1.5 bg-[#0057FF] text-white text-xs font-black rounded-lg uppercase tracking-wider flex-shrink-0">
                        {featured.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-[#3A5A7A] text-sm leading-relaxed mb-6">{featured.desc}</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {featured.specs.map(s => (
                      <div key={s.label} className="bg-[#060E1E] rounded-xl px-4 py-3 border border-white/5">
                        <p className="text-[10px] text-[#1A3050] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className="text-white font-bold text-sm">{s.val}</p>
                      </div>
                    ))}
                  </div>

                  <a href={featured.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0057FF] hover:text-[#5A9AFF] transition-colors">
                    Xem thông số đầy đủ tại ubtrobot.com →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMERCIAL ROBOTS ══ */}
      <section className="py-24 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Banking · Healthcare · Logistics</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0A0F1A]">Robot Thương Mại & Công Nghiệp</h2>
              <p className="text-[#6B7280] mt-3 max-w-xl">Giải pháp robot AI cho dịch vụ khách hàng, y tế và tự động hoá kho hàng quy mô lớn.</p>
            </div>
            <Link href="/san-pham" className="text-sm font-bold text-[#0057FF] hover:underline whitespace-nowrap">Xem tất cả →</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {COMMERCIAL.map(r => (
              <Link key={r.name} href={r.href}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0057FF]/25 hover:shadow-[0_8px_40px_rgba(0,87,255,0.09)] transition-all duration-300 flex flex-col">
                <div className="h-56 bg-[#F0F4FF] flex items-center justify-center p-6 overflow-hidden">
                  <img src={r.img} alt={r.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                    onError={(e: any) => { e.target.style.opacity = '0.1'; }} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0057FF] bg-[#EEF3FF] px-3 py-1 rounded-full self-start mb-3">{r.tag}</span>
                  <h3 className="text-[#0A0F1A] font-bold text-lg mb-2 group-hover:text-[#0057FF] transition-colors">{r.name}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4 flex-1">{r.desc}</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {r.specs.map(s => (
                      <div key={s} className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                        <span className="w-1 h-1 rounded-full bg-[#0057FF]/50 flex-shrink-0" />{s}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDU ROBOTS ══ */}
      <section className="py-24 bg-[#020C1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">K1 → University</p>
              <h2 className="text-3xl lg:text-4xl font-black text-white">Robot & Kit Giáo Dục</h2>
              <p className="text-[#4A6A8A] mt-3 max-w-xl">Hệ thống học cụ AI & Robotics phủ toàn bộ cấp học — từ Blockly kéo-thả đến Python và ROS.</p>
            </div>
            <Link href="/san-pham" className="text-sm font-bold text-[#0057FF] hover:underline whitespace-nowrap">Xem tất cả →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EDU.map(r => (
              <Link key={r.name} href={r.href}
                className="group bg-[#0B1629] rounded-2xl overflow-hidden border border-white/6 hover:border-[#0057FF]/35 transition-all duration-300 flex flex-col">
                <div className="h-48 bg-[#060E1E] flex items-center justify-center p-5 overflow-hidden">
                  <img src={r.img} alt={r.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    onError={(e: any) => { e.target.style.opacity = '0.08'; }} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0057FF] bg-[#0057FF]/10 px-2.5 py-1 rounded-full self-start mb-3">{r.tag}</span>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#0057FF] transition-colors">{r.name}</h3>
                  <p className="text-[#3A5A7A] text-xs leading-relaxed mb-3 flex-1">{r.desc}</p>
                  <div className="space-y-1">
                    {r.specs.map(s => (
                      <div key={s} className="flex items-center gap-2 text-[11px] text-[#1A3050]">
                        <span className="w-1 h-1 rounded-full bg-[#0057FF]/50 flex-shrink-0" />{s}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE TECHNOLOGY ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-8">
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-4">Core Technology</p>
              <h2 className="text-4xl font-black text-[#0A0F1A] leading-tight mb-5">
                4 Công nghệ<br />cốt lõi<br />độc quyền
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-8">
                Mỗi sản phẩm UBTECH xây dựng trên bốn trụ cột kỹ thuật tạo ra sự vượt trội bền vững.
              </p>
              <div className="flex items-center gap-3 text-sm font-bold text-[#0057FF]">
                <span className="w-10 h-px bg-[#0057FF]" />
                4 trung tâm R&D toàn cầu
              </div>
            </div>
            <div className="lg:col-span-3 space-y-3">
              {CORE_TECH.map(t => (
                <div key={t.n}
                  className="group grid grid-cols-12 gap-5 p-7 rounded-2xl border border-gray-100 hover:border-[#0057FF]/20 hover:bg-[#FAFBFF] hover:shadow-[0_4px_24px_rgba(0,87,255,0.06)] transition-all duration-300">
                  <div className="col-span-2 flex flex-col gap-3">
                    <span className="text-4xl font-black text-[#EBF0F8] group-hover:text-[#0057FF]/15 transition-colors leading-none">{t.n}</span>
                    <span className="text-[9px] font-black text-[#0057FF] bg-[#EEF3FF] px-2 py-1.5 rounded-lg text-center leading-tight">{t.metric}</span>
                  </div>
                  <div className="col-span-10">
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mb-1">{t.en}</p>
                    <h3 className="text-[#0A0F1A] font-bold text-lg mb-2 group-hover:text-[#0057FF] transition-colors">{t.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ R&D LABS ══ */}
      <section className="py-24 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Global Network</p>
            <h2 className="text-4xl font-black text-[#0A0F1A]">4 Trung tâm R&D Quốc tế</h2>
            <p className="text-[#6B7280] mt-3">Hơn 2,000 kỹ sư và nhà khoa học tại 4 châu lục</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { city: 'Beijing', country: 'China', role: 'AI & Deep Learning HQ', n: '01', hq: true },
              { city: 'Shenzhen', country: 'China', role: 'Hardware & Manufacturing', n: '02', hq: false },
              { city: 'Tokyo', country: 'Japan', role: 'Precision Mechanics', n: '03', hq: false },
              { city: 'Sydney', country: 'Australia', role: 'Education Technology', n: '04', hq: false },
            ].map(lab => (
              <div key={lab.city}
                className="group relative p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#0057FF]/20 hover:shadow-[0_4px_24px_rgba(0,87,255,0.07)] transition-all">
                {lab.hq && (
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-wider px-2 py-1 bg-[#0057FF] text-white rounded-lg">HQ</span>
                )}
                <span className="text-5xl font-black text-[#EBF0F8] group-hover:text-[#0057FF]/15 transition-colors block mb-5">{lab.n}</span>
                <h3 className="text-xl font-black text-[#0A0F1A] mb-1 group-hover:text-[#0057FF] transition-colors">{lab.city}</h3>
                <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-3">{lab.country}</p>
                <p className="text-[#6B7280] text-sm">{lab.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-20 bg-[#0057FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Sẵn sàng triển khai Robot UBTECH?</h2>
            <p className="text-[#A0C4FF] text-base">Từ robot giáo dục K12 đến humanoid công nghiệp — chúng tôi có giải pháp cho bạn.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/san-pham" className="px-7 py-3.5 bg-white text-[#0057FF] text-sm font-black rounded-xl hover:bg-blue-50 transition-colors shadow-lg">Xem sản phẩm</Link>
            <Link href="/lien-he" className="px-7 py-3.5 border border-white/30 text-white text-sm font-black rounded-xl hover:bg-white/10 transition-colors">Liên hệ tư vấn</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
