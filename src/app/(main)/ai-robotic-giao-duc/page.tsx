'use client';
import Link from 'next/link';
import { ArrowRight, GraduationCap, BookOpen, Award, CheckCircle2, ChevronRight } from 'lucide-react';

const CURRICULUM = [
  { level: 'K1–K3', age: '6–9 tuổi', kit: 'AI FANTASY ZOO', slug: 'ai-fantasy-zoo', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-FANTASY-ZOO-1.webp', color: 'from-green-400 to-teal-500', bg: 'bg-green-50', border: 'border-green-100', books: ['AI Fantasy Zoo 1', 'AI Fantasy Zoo 2'], skills: ['Lập trình Blockly cơ bản', 'Tư duy đa chiều', 'Làm việc nhóm', 'Mô phỏng hành vi động vật'], desc: 'Khám phá thế giới động vật qua lập trình. Phát triển tư duy logic từ sớm.' },
  { level: 'K3–K5', age: '8–11 tuổi', kit: 'AI MAGIC WORLD', slug: 'ai-magic-world', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/MW.png', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50', border: 'border-blue-100', books: ['AI Magic World'], skills: ['Lập trình uCode', 'Thiết kế hoạt hình', 'Lập trình game', 'Thuật toán cơ bản'], desc: 'Khám phá lập trình qua hoạt hình và game với phần mềm uCode thân thiện.' },
  { level: 'K4–K6', age: '9–12 tuổi', kit: 'AI SMART LIFE', slug: 'ai-smart-life', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SMART-LIFE-1.webp', color: 'from-orange-400 to-amber-500', bg: 'bg-orange-50', border: 'border-orange-100', books: ['AI Smart Life 1', 'AI Smart Life 2'], skills: ['Cảm biến IoT', 'Nhà thông minh', 'Dự án thực tế', 'Tư duy sáng tạo'], desc: 'Hiểu nguyên lý cảm biến và IoT qua dự án thùng rác, khu vườn thông minh.' },
  { level: 'K5–K8', age: '10–14 tuổi', kit: 'AI SUPER ASSISTANT', slug: 'ai-super-asistant', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/SA.png', color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50', border: 'border-purple-100', books: ['AI Super Assistant 1', 'AI Super Assistant 2'], skills: ['Robot Alpha Mini', 'Project-based Learning', 'STEM tích hợp', 'Giải quyết vấn đề'], desc: 'Học STEM qua robot Alpha Mini với phương pháp dự án sáng tạo.' },
  { level: 'K7–K9', age: '12–15 tuổi', kit: 'AI TRANSFORMER WORKSHOP', slug: 'ai-transformer-workshop', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-TRANSFORMER-WORKSHOP-1.webp', color: 'from-red-400 to-orange-500', bg: 'bg-red-50', border: 'border-red-100', books: ['AI Transformer Workshop 1', 'AI Transformer Workshop 2'], skills: ['Điện tử nâng cao', 'Hệ thống cảnh báo', 'Lập trình ứng dụng', 'Tư duy đổi mới'], desc: 'Xây dựng hệ thống thông minh thực tế với cảm biến và linh kiện điện tử.' },
  { level: 'K8–K10', age: '13–16 tuổi', kit: 'AI SUPER DESIGNER', slug: 'ai-super-designer-1', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SUPER-DESIGNER-1.webp', color: 'from-indigo-400 to-blue-600', bg: 'bg-indigo-50', border: 'border-indigo-100', books: ['AI Super Designer 1', 'AI Super Designer 2'], skills: ['Thiết kế hệ thống AI', 'Ứng dụng nông nghiệp', 'Kỹ thuật công nghiệp', 'Nghiên cứu khoa học'], desc: 'Đóng vai kỹ sư AI, thiết kế hệ thống thông minh cho nông nghiệp và công nghiệp.' },
  { level: 'K9–K12', age: '14–18 tuổi', kit: 'AI SUPER ENGINEER', slug: 'ai-super-engineer', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SuperEngineer-1.webp', color: 'from-gray-600 to-slate-800', bg: 'bg-gray-50', border: 'border-gray-200', books: ['AI Super Engineer 1', 'AI Super Engineer 2', 'AI Application & Exploration 1', 'AI Application & Exploration 2'], skills: ['Nghiên cứu khoa học', 'AI ứng dụng cao', 'Tư duy phản biện', 'Định hướng nghề nghiệp'], desc: 'Phát triển AI chủ động qua nghiên cứu khoa học. Chuẩn bị cho đại học.' },
];

export default function AIRoboticGiaoDucPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#050E2B] via-[#0A2060] to-[#0057FF] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'radial-gradient(circle,rgba(255,255,255,1) 1px,transparent 1px)',backgroundSize:'36px 36px'}}/>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/8 text-[11px] font-semibold text-blue-200 uppercase tracking-[0.2em] mb-6">
            <GraduationCap className="w-3.5 h-3.5"/> Chương trình K1 – K12
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            AI & Robotic<br/><span className="text-blue-300">Giáo Dục</span>
          </h1>
          <p className="text-[16px] text-blue-200/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Chương trình học AI & Robotics hoàn chỉnh nhất Việt Nam — được Bộ GD&ĐT và Bộ KH&CN chứng nhận — dành cho học sinh lớp 1 đến lớp 12.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Award, text: 'Bộ GD&ĐT thẩm định', color: 'bg-amber-400/15 border-amber-400/25 text-amber-300' },
              { icon: Award, text: 'Bộ KH&CN phê duyệt', color: 'bg-green-400/15 border-green-400/25 text-green-300' },
              { icon: Award, text: 'UBTECH Chính hãng', color: 'bg-blue-400/15 border-blue-400/25 text-blue-300' },
            ].map(b => (
              <div key={b.text} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${b.color} text-[12px] font-semibold`}>
                <b.icon className="w-3.5 h-3.5"/> {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#0057FF] to-[#00C4FF] rounded"/>
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em]">Lộ trình học tập</span>
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#00C4FF] to-[#0057FF] rounded"/>
          </div>
          <h2 className="text-4xl font-black text-[#050E2B]">Chương trình theo cấp độ</h2>
        </div>

        <div className="space-y-8">
          {CURRICULUM.map(c => (
            <div key={c.level} className={`${c.bg} border ${c.border} rounded-3xl p-6 lg:p-8 hover:shadow-lg transition-shadow`}>
              <div className="grid lg:grid-cols-4 gap-6 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden border border-gray-100">
                    <img src={c.img} alt={c.kit} className="w-full h-full object-contain p-2" />
                  </div>
                  <Link href={`/san-pham/${c.slug}`} className="text-[12px] text-[#0057FF] font-semibold hover:underline text-center leading-tight">{c.kit}</Link>
                </div>
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`px-3 py-1 rounded-full text-white text-[11px] font-bold bg-gradient-to-r ${c.color}`}>{c.level}</div>
                    <span className="text-[12px] text-[#6B7280]">{c.age}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#050E2B] mb-2">{c.kit}</h3>
                  <p className="text-[14px] text-[#4A5568] leading-relaxed mb-4">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {c.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF] flex-shrink-0"/>
                        <span className="text-[12px] text-[#374151]">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5"/> Sách giáo trình
                  </p>
                  <div className="space-y-1.5 mb-5">
                    {c.books.map(b => (
                      <p key={b} className="text-[12px] text-[#374151] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF]/40 flex-shrink-0"/>
                        {b}
                      </p>
                    ))}
                  </div>
                  <Link href={`/san-pham/${c.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0057FF] text-white text-[13px] font-semibold rounded-xl hover:bg-[#0048d4] transition-all">
                    Tìm hiểu thêm <ChevronRight className="w-4 h-4"/>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5F6FA] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#050E2B] mb-4">Đăng ký chương trình cho trường học</h2>
          <p className="text-[15px] text-[#6B7280] mb-8 max-w-xl mx-auto">Liên hệ để nhận tư vấn lộ trình AI & Robotics phù hợp với cấp học của trường bạn.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lien-he" className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#0048d4] transition-all text-[15px]">
              Đăng ký tư vấn <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link href="/san-pham?category=bo-kit" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white border border-[#E8ECF4] text-[#374151] font-semibold rounded-xl hover:bg-[#EEF3FF] hover:text-[#0057FF] transition-all text-[15px]">
              Xem tất cả bộ kit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
