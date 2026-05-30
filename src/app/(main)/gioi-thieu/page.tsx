'use client';
import { CheckCircle2, Award, Globe, FileText, ShieldCheck, Users, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#001F6B] via-[#003DA5] to-[#0057FF] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize:'48px 48px'}} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-4 border border-blue-400/40 px-4 py-1.5 rounded-full">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">UBTECH Việt Nam</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Nhà phân phối độc quyền chính hãng UBTECH Robotics Corp. — Tiên phong AI & Robotics tại Việt Nam
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">GIỚI THIỆU</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A1F36] mb-6 leading-tight">
              Tập đoàn IPPG — Nhà phân phối<br />
              <span className="text-[#0057FF]">độc quyền UBTECH tại Việt Nam</span>
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-5">
              Tập đoàn Liên Thái Bình Dương (IPPG), thông qua công ty thành viên chủ chốt là Công ty TNHH Công nghệ và Giáo dục IPP (IPPTech), trân trọng thông báo và khẳng định vị thế Nhà Phân Phối Độc Quyền Chính Hãng và Duy Nhất của UBTECH Robotics Corp. tại thị trường Việt Nam.
            </p>
            <p className="text-[#6B7280] leading-relaxed mb-8">
              Mối quan hệ đối tác độc quyền được thiết lập từ ngày 9 tháng 9 năm 2019, căn cứ vào Thỏa thuận Phân phối SA-OS20190830002. UBTECH Robotics Corp. đã cấp Giấy chứng nhận ủy quyền phân phối chính thức, công nhận IPPG được độc quyền phân phối các sản phẩm và giải pháp dưới thương hiệu UBTECH tại Việt Nam.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '2019', label: 'Năm thiết lập quan hệ' },
                { num: '10.000+', label: 'Khách hàng phục vụ' },
                { num: '1.800+', label: 'AI Labs triển khai' },
                { num: '10', label: 'AI Centers tại VN' },
              ].map(stat => (
                <div key={stat.label} className="bg-[#F8FAFF] border border-blue-50 rounded-2xl p-5">
                  <p className="text-2xl font-black text-[#0057FF]">{stat.num}</p>
                  <p className="text-xs text-[#6B7280] mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-[#F8FAFF] aspect-[4/3] flex items-center justify-center">
              <img
                src="https://ubtechvietnam.edu.vn/img/T2.png"
                alt="UBTECH Distributor Agreement"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-blue-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1A1F36]">Độc quyền chính hãng</p>
                <p className="text-xs text-[#6B7280]">UBTECH Robotics Corp.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHỨNG NHẬN ── */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-3 block">PHÁP LÝ & CHỨNG NHẬN</span>
            <h2 className="text-3xl font-black text-[#1A1F36]">Cơ sở pháp lý độc quyền phân phối</h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">Được xác nhận và chứng thực bởi các cơ quan nhà nước uy tín tại Việt Nam</p>
          </div>

          {/* Main cert card */}
          <div className="bg-gradient-to-br from-[#003DA5] to-[#0057FF] rounded-3xl p-8 lg:p-12 text-white mb-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-black mb-5">CƠ SỞ PHÁP LÝ ĐỘC QUYỀN PHÂN PHỐI CHÍNH HÃNG UBTECH VIỆT NAM</h3>
                <p className="text-blue-100 leading-relaxed mb-6 text-sm">
                  Tập đoàn IPPG, thông qua IPPTech, là Nhà Phân Phối Độc Quyền Chính Hãng và Duy Nhất của UBTECH Robotics Corp. tại thị trường Việt Nam từ ngày 9 tháng 9 năm 2019.
                </p>
                <ul className="space-y-3">
                  {[
                    'Giáo trình được Viện KHGD Việt Nam – Bộ GD&ĐT thẩm định',
                    'Chương trình AI được Bộ KH&CN phê duyệt',
                    'Letter of Authorized Distributor từ UBTECH Robotics Corp.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl overflow-hidden p-3 shadow-lg">
                  <img src="https://ubtechvietnam.edu.vn/img/T2.png" alt="UBTECH Authorization Letter" className="w-full object-contain" style={{maxHeight:'260px'}} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['https://ubtechvietnam.edu.vn/img/TD2.png', 'https://ubtechvietnam.edu.vn/img/TD1.png', 'https://ubtechvietnam.edu.vn/img/TD3.png'].map((src, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden p-2 shadow-md flex items-center justify-center" style={{minHeight:'140px'}}>
                      <img src={src} alt={`Chứng nhận ${i+1}`} className="w-full h-auto object-contain" style={{maxHeight:'180px'}} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Two certification cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: 'Viện Khoa học Giáo dục Việt Nam – Bộ GD&ĐT',
                desc: 'Chương trình và sản phẩm UBTECH Việt Nam đã được Viện Khoa học Giáo dục Việt Nam – Bộ Giáo dục và Đào tạo thẩm định, đánh giá và công nhận chất lượng, đáp ứng tiêu chí sư phạm và tính phù hợp với học sinh Việt Nam.',
                color: 'bg-amber-50 text-amber-600',
              },
              {
                icon: Globe,
                title: 'Bộ Khoa học và Công nghệ',
                desc: 'IPPG đã hợp tác với Đại học Quốc gia TP.HCM hoàn thiện chương trình đào tạo AI, được Bộ Khoa học và Công nghệ thẩm định và phê duyệt, đảm bảo tính ứng dụng cao và phù hợp với định hướng chuyển đổi số Quốc Gia.',
                color: 'bg-blue-50 text-[#0057FF]',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-7 shadow-sm border border-blue-50 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-[#1A1F36] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CENTER ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">A.I CENTER</span>
              <h2 className="text-3xl font-black text-[#1A1F36] mb-6 leading-tight">
                Trung tâm trải nghiệm<br />AI & Robotic từ UBTECH
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-7">
                Tập đoàn Liên Thái Bình Dương (IPPG) tài trợ việc thành lập các Trung tâm Giáo dục Đào tạo Trí tuệ nhân tạo (AIC) tại Trường Đại học Đà Lạt và Làng Đại Học Quốc Gia TP.HCM.
              </p>
              <ul className="space-y-4">
                {[
                  'AIC đầu tiên tại Đại học Quốc gia TP.HCM, tháng 4/2021',
                  'Chiến lược 5 năm phát triển AI (2021–2025)',
                  'Mục tiêu 10 AI Centers và 1.800 AI Labs',
                  'Đào tạo thế hệ trẻ về AI và Robotics',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
                    </div>
                    <span className="text-sm text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-03-1024x724.jpg',
                'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-01-1024x725.jpg',
                'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-26-1024x724.jpg',
                'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-29-1024x725.jpg',
              ].map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-md">
                  <img src={img} alt={`AI Center ${i+1}`} className="w-full object-cover h-36" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-[#001F6B] to-[#0057FF] py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-5">Hợp tác cùng UBTECH Việt Nam</h2>
          <p className="text-blue-200 mb-10 leading-relaxed max-w-lg mx-auto">
            Liên hệ với chúng tôi để tìm hiểu về các giải pháp AI & Robotics phù hợp với nhu cầu của trường học, trung tâm hoặc doanh nghiệp bạn.
          </p>
          <Link href="/lien-he"
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-[#003DA5] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl text-base">
            Liên hệ ngay <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
