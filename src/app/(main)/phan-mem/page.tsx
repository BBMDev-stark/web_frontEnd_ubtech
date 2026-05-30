'use client';
import Link from 'next/link';

const APPS = [
  {
    num: '01', name: 'uCode', tag: 'Visual Programming',
    desc: 'Môi trường lập trình AI Robotics dựa trên Scratch — kéo-thả block để tạo trò chơi, hoạt hình và điều khiển trực tiếp robot UBTECH.',
    compatible: 'Hầu hết robot UBTECH',
    platforms: [
      { os: 'Windows', href: 'https://ippgvn-my.sharepoint.com/:u:/g/personal/minhta_ipptech_com_vn/EQzr9qsJ_eVOnPYiCEQC6PwBTCG7NPmhioP6eHAepPd9mQ?e=HNnlwC' },
      { os: 'macOS', href: 'https://ippgvn-my.sharepoint.com/:u:/g/personal/minhta_ipptech_com_vn/EdCVEc36PZ1BqEJxpxZPk8UBhMYpXass8s4KUzgABfCXSg?e=ThELDs' },
    ],
  },
  {
    num: '02', name: 'uCode Link', tag: 'Hardware Bridge',
    desc: 'Cầu nối cho phép uCode kết nối và điều khiển thiết bị phần cứng UBTECH. Bắt buộc cài khi lập trình trực tiếp lên robot và kit.',
    compatible: 'uCode + mọi kit UBTECH',
    platforms: [
      { os: 'Windows', href: 'https://ippgvn-my.sharepoint.com/:u:/g/personal/minhta_ipptech_com_vn/EQzr9qsJ_eVOnPYiCEQC6PwBTCG7NPmhioP6eHAepPd9mQ?e=I5BD8C' },
    ],
  },
  {
    num: '03', name: 'uFinder', tag: 'Offline IDE',
    desc: 'Hỗ trợ làm việc offline và chỉnh sửa mã trực tiếp — đảm bảo giảng dạy liên tục ngay cả khi không có internet. Hỗ trợ Windows XP+.',
    compatible: 'Mọi kit UBTECH',
    platforms: [{ os: 'Windows', href: '#' }],
  },
  {
    num: '04', name: 'Yanshee App', tag: 'Robot Yanshee',
    desc: 'App song hành với Yanshee: hướng dẫn lắp ráp 3D, điều khiển, lập trình Blockly/DRP. Điều chỉnh servo, cấu hình cảm biến và chia sẻ code cộng đồng.',
    compatible: 'Robot Yanshee',
    platforms: [
      { os: 'iOS', href: 'https://apps.apple.com/cn/app/yanshee/id1290088340' },
      { os: 'Android', href: '#' },
    ],
  },
  {
    num: '05', name: 'Alpha Mini App', tag: 'Robot Alpha Mini',
    desc: 'Điều khiển, cấu hình và lập trình đồ họa cho Alpha Mini. Xem trạng thái robot, tùy chỉnh hành vi AI và quản lý danh sách hành động.',
    compatible: 'Robot Alpha Mini',
    platforms: [
      { os: 'iOS', href: 'https://apps.apple.com/cn/app/alphamini/id1471118209' },
      { os: 'Android', href: '#' },
    ],
  },
  {
    num: '06', name: 'uKit Explore', tag: 'Advanced STEM',
    desc: 'PC software liên kết uKit Explore — lập trình Blockly, tương thích Arduino IDE và C/C++. Phù hợp học sinh THCS–THPT và maker.',
    compatible: 'uKit Explore Kit',
    platforms: [{ os: 'Windows', href: '#' }],
  },
  {
    num: '07', name: 'uKit EDU', tag: 'K12 Education',
    desc: 'Xây dựng, lập trình Blockly/PRP và điều khiển robot từ xa. Tích hợp sách giáo khoa AI chính thức: AI Series, Jimu Robot Nhập Môn & Nâng Cao.',
    compatible: 'uKit EDU Kit',
    platforms: [
      { os: 'iOS', href: 'https://apps.apple.com/cn/app/ukit-edu/id1446985636' },
      { os: 'Android', href: '#' },
    ],
  },
  {
    num: '08', name: 'UBTECH EDU', tag: 'Jimu Platform',
    desc: 'Phần mềm giáo dục cho Jimu Robot: lập trình Blockly/DRP, mô hình DIY và học theo chương trình Jimu Nhập Môn & Nâng Cao.',
    compatible: 'Jimu Robot Series',
    platforms: [
      { os: 'iOS', href: 'https://apps.apple.com/cn/app/ubtech-edu/id1227436069' },
      { os: 'Android', href: '#' },
    ],
  },
  {
    num: '09', name: 'Jimu App', tag: 'Jimu Robot',
    desc: 'Xây dựng, điều khiển và lập trình Jimu Robot. Hướng dẫn 3D step-by-step và chia sẻ sáng tạo với cộng đồng toàn cầu.',
    compatible: 'Jimu Robot, Scorebot, Courtbot',
    platforms: [
      { os: 'iOS', href: '#' },
      { os: 'Android', href: '#' },
    ],
  },
  {
    num: '10', name: 'uAPP Creator', tag: 'App Development',
    desc: 'Nền tảng phát triển ứng dụng Android trực quan: kéo-thả block để tạo app không cần Java. Phiên bản dùng thử dành cho Cruzr.',
    compatible: 'Robot Cruzr',
    platforms: [{ os: 'Windows', href: '#' }],
  },
];

const PLATFORMS = ['Windows', 'macOS', 'iOS', 'Android'];

const PLATFORM_COLORS: Record<string, string> = {
  Windows: 'bg-[#0078D4] text-white',
  macOS:   'bg-[#1D1D1F] text-white',
  iOS:     'bg-[#0A84FF] text-white',
  Android: 'bg-[#3DDC84] text-[#0A1A0F]',
};

export default function PhanMemPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ══ HERO ══ */}
      <section className="bg-[#020C1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,87,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,87,255,0.05) 1px,transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#0057FF]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0057FF]/10 border border-[#0057FF]/20 text-[#5A9AFF] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-pulse" />
              UBTECH Software Ecosystem
            </div>
            <h1 className="text-[52px] lg:text-[64px] font-black leading-[0.95] tracking-tighter mb-6">
              Phần Mềm &<br />
              <span className="text-[#0057FF]">Ứng Dụng</span><br />
              UBTECH
            </h1>
            <p className="text-[#4A6A8A] text-lg leading-relaxed max-w-2xl mb-10">
              10 ứng dụng miễn phí — từ lập trình Scratch cho tiểu học đến Arduino/C++ cho sinh viên. Phủ toàn bộ cấp độ, mọi nền tảng.
            </p>
            <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden max-w-md">
              {[['10+','Ứng dụng'],['K1–University','Cấp độ'],['4 platforms','Win · Mac · iOS · Android']].map(([n, l]) => (
                <div key={l} className="bg-[#020C1B] px-5 py-5 text-center">
                  <p className="text-xl font-black text-[#0057FF]">{n}</p>
                  <p className="text-[10px] text-[#1A3050] uppercase tracking-wider mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLATFORM FILTER LEGEND ══ */}
      <div className="bg-[#F4F7FF] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-4 flex-wrap">
          <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider font-semibold">Nền tảng:</span>
          {PLATFORMS.map(p => (
            <span key={p} className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${PLATFORM_COLORS[p]}`}>{p}</span>
          ))}
          <span className="text-[11px] text-[#9CA3AF] ml-2">— Màu xám = Sắp có</span>
        </div>
      </div>

      {/* ══ APPS GRID ══ */}
      <section className="py-20 bg-[#F4F7FF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Tải miễn phí</p>
            <h2 className="text-4xl font-black text-[#0A0F1A]">Danh sách ứng dụng</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {APPS.map(app => (
              <div key={app.name}
                className="group bg-white rounded-2xl border border-gray-100 p-7 hover:border-[#0057FF]/20 hover:shadow-[0_4px_32px_rgba(0,87,255,0.07)] transition-all duration-300">
                <div className="flex items-start gap-5 mb-4">
                  <span className="text-[42px] font-black text-[#EBF0F8] group-hover:text-[#0057FF]/15 transition-colors leading-none flex-shrink-0 mt-0.5">
                    {app.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="text-[#0A0F1A] font-black text-lg group-hover:text-[#0057FF] transition-colors">{app.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF3FF] text-[#0057FF] uppercase tracking-wider">
                        {app.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-medium">Compatible: {app.compatible}</p>
                  </div>
                </div>

                <p className="text-[#64748B] text-sm leading-relaxed mb-5 pl-16">{app.desc}</p>

                <div className="flex flex-wrap gap-2 pl-16">
                  {app.platforms.map(p => (
                    p.href === '#' ? (
                      <span key={p.os}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-gray-50 border border-gray-200 text-gray-400">
                        {p.os}
                        <span className="text-[9px] bg-gray-200 px-1.5 py-0.5 rounded font-black uppercase">Soon</span>
                      </span>
                    ) : (
                      <a key={p.os} href={p.href} target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-80 ${PLATFORM_COLORS[p.os]}`}>
                        ↓ {p.os}
                      </a>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SUPPORT ══ */}
      <section className="py-16 bg-[#020C1B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Technical Support</p>
              <h3 className="text-3xl font-black text-white mb-3">Cần hỗ trợ cài đặt & sử dụng?</h3>
              <p className="text-[#4A6A8A] mb-7 max-w-xl">Đội ngũ kỹ thuật UBTECH Việt Nam hỗ trợ giáo viên và học sinh qua Hotline và Zalo trong giờ hành chính.</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="border-l-2 border-[#0057FF] pl-4">
                  <p className="text-[10px] text-[#1A3050] uppercase tracking-widest font-bold mb-1">Hotline</p>
                  <a href="tel:0915594103" className="text-white font-bold hover:text-[#0057FF] transition-colors text-lg">0915 594 103</a>
                </div>
                <div className="border-l-2 border-[#0057FF] pl-4">
                  <p className="text-[10px] text-[#1A3050] uppercase tracking-widest font-bold mb-1">Email</p>
                  <a href="mailto:webubtechvietnam@gmail.com" className="text-[#4A6A8A] hover:text-white transition-colors text-sm">webubtechvietnam@gmail.com</a>
                </div>
              </div>
            </div>
            <Link href="/lien-he"
              className="flex-shrink-0 px-8 py-4 bg-[#0057FF] text-white font-black rounded-xl hover:bg-[#0046CC] transition-colors shadow-lg shadow-[#0057FF]/30">
              Liên hệ ngay →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ OFFICES ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-bold mb-3">Địa điểm</p>
            <h2 className="text-3xl font-black text-[#0A0F1A]">Văn phòng UBTECH Việt Nam</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { num: '01', label: 'Văn phòng Phía Nam', addr: 'Tầng 3, Tòa nhà Centec\n72–74 Nguyễn Thị Minh Khai\nQuận 3, TP.HCM', time: 'T2–CN: 09:00–18:00', href: 'https://goo.gl/maps/ir5TsXD7UszYxREi8' },
              { num: '02', label: 'Văn phòng Phía Bắc', addr: '24 Hai Bà Trưng\nTràng Tiền, Hoàn Kiếm, Hà Nội', time: 'T2–CN: 09:00–18:00', href: 'https://goo.gl/maps/s9amaR9Z5mv8oY5EA' },
              { num: '03', label: 'A.I. Center TP.HCM', addr: 'Block 86, KCN Phần mềm\nVõ Trường Toản, Thủ Đức\nTP.HCM', time: 'T2–CN: 08:00–17:00', href: '/ai-center' },
            ].map(o => (
              <a key={o.label} href={o.href} target={o.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="group p-7 rounded-2xl border border-gray-100 hover:border-[#0057FF]/20 hover:shadow-[0_4px_24px_rgba(0,87,255,0.07)] transition-all">
                <span className="text-5xl font-black text-[#EBF0F8] group-hover:text-[#0057FF]/15 transition-colors block mb-5">{o.num}</span>
                <h3 className="font-black text-[#0A0F1A] mb-3 group-hover:text-[#0057FF] transition-colors">{o.label}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3 whitespace-pre-line">{o.addr}</p>
                <p className="text-[11px] text-[#0057FF] font-bold uppercase tracking-wider">{o.time}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
