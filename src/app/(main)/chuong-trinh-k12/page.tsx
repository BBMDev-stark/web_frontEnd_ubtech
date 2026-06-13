import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Chương trình AI & Robotics K12 | UBTECH Việt Nam' };

const PROGRAMS = [
  {
    id: 'k1-k3',
    level: 'K1–K3', name: 'AI FANTASY ZOO',
    color: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50 border-green-200',
    image: 'https://lh3.googleusercontent.com/d/1RTKSLUhDzH9H4xVNYUMkH2gZmRl9RnsU',
    desc: 'Khóa học áp dụng phương pháp làm việc nhóm để giúp học viên khám phá các phương pháp xây dựng các mô hình động vật khác nhau và có được kiến thức lập trình cơ bản để mô phỏng hành vi và cách thức của các loài động vật khác nhau.',
    skills: ['Lập trình Blockly cơ bản', 'Làm việc nhóm', 'Tư duy đa chiều', 'Giải quyết vấn đề'],
    product: 'AI FANTASY ZOO Kit',
    slug: 'ai-fantasy-zoo',
  },
  {
    id: 'k4-k6',
    level: 'K4–K6', name: 'AI SMART LIFE',
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50 border-blue-200',
    image: 'https://lh3.googleusercontent.com/d/1RTKSLUhDzH9H4xVNYUMkH2gZmRl9RnsU',
    desc: 'Khóa học giúp học viên hiểu nguyên lý và ứng dụng của các loại cảm biến thông dụng qua hoạt động nhóm và các dự án thực tế như thùng rác, khu vườn hay xe quét rác thông minh.',
    skills: ['Cảm biến IoT', 'Dự án thực tế', 'Kỹ năng hợp tác', 'Tư duy sáng tạo'],
    product: 'AI SMART LIFE Kit',
    slug: 'ai-smart-life',
  },
  {
    id: 'k7-k9',
    level: 'K7–K9', name: 'AI TRANSFORMER WORKSHOP',
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50 border-purple-200',
    image: 'https://lh3.googleusercontent.com/d/1RTKSLUhDzH9H4xVNYUMkH2gZmRl9RnsU',
    desc: 'Khóa học giúp học sinh khám phá hiện tượng thực tế qua việc xây dựng mô hình như bảng quảng cáo chuyển đổi, robot tấn công, hay hệ thống cảnh báo. Bằng cách sử dụng các cảm biến và linh kiện điện tử.',
    skills: ['Điện tử nâng cao', 'Lập trình ứng dụng', 'Tư duy đổi mới', 'Thiết kế kỹ thuật'],
    product: 'AI TRANSFORMER WORKSHOP Kit',
    slug: 'ai-transformer-workshop',
  },
  {
    id: 'k10-k12',
    level: 'K10–K12', name: 'AI SUPER ENGINEER',
    color: 'from-orange-500 to-red-600',
    bgLight: 'bg-orange-50 border-orange-200',
    image: 'https://lh3.googleusercontent.com/d/1RTKSLUhDzH9H4xVNYUMkH2gZmRl9RnsU',
    desc: 'Khóa học giúp học sinh phát triển AI một cách chủ động thông qua nghiên cứu khoa học và các dự án thực tế trong lĩnh vực nông nghiệp, công nghiệp và robot.',
    skills: ['Nghiên cứu khoa học AI', 'Dự án nông nghiệp/công nghiệp', 'Tư duy phản biện', 'Python & AI thuật toán'],
    product: 'AI SUPER ENGINEER Kit',
    slug: 'ai-super-engineer',
  },
];

export default function K12Page() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#001F6B] to-[#0057FF] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-3">CHƯƠNG TRÌNH HỌC</p>
          <h1 className="text-4xl sm:text-5xl font-black mb-5">AI & Robotics K12</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Chương trình học AI & Robotics hoàn chỉnh nhất tại Việt Nam — từ lớp 1 đến lớp 12. Được Bộ GD&ĐT và Bộ KH&CN chứng nhận.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#F8FAFF] border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { num: '12 cấp độ', desc: 'Từ K1 đến K12' },
            { num: 'Bộ GD&ĐT', desc: 'Chứng nhận chất lượng' },
            { num: 'Bộ KH&CN', desc: 'Phê duyệt nội dung' },
            { num: '1.800+', desc: 'AI Labs triển khai' },
          ].map(item => (
            <div key={item.desc}>
              <p className="text-xl font-black text-[#0057FF]">{item.num}</p>
              <p className="text-sm text-[#6B7280] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#1A1F36]">Lộ trình học tập theo cấp độ</h2>
          <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">Mỗi cấp độ được thiết kế phù hợp với khả năng nhận thức và trình độ của học sinh, đảm bảo tính liên tục và logic trong quá trình học.</p>
        </div>
        <div className="space-y-12">
          {PROGRAMS.map((prog, idx) => (
            <div key={prog.id} id={prog.id}
              className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className={`inline-block px-3 py-1.5 rounded-xl text-sm font-black text-white bg-gradient-to-r ${prog.color} mb-4 shadow-md`}>
                  {prog.level} · {prog.age}
                </div>
                <h3 className="text-2xl font-black text-[#1A1F36] mb-3">{prog.name}</h3>
                <p className="text-[#6B7280] leading-relaxed mb-5">{prog.desc}</p>
                <div className="mb-6">
                  <p className="text-sm font-bold text-[#1A1F36] mb-3">Kỹ năng phát triển:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {prog.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0057FF] flex-shrink-0" />
                        <span className="text-sm text-[#374151]">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href={`/san-pham/${prog.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0057FF] text-white font-bold rounded-xl hover:bg-[#003DA5] transition-all shadow-lg shadow-blue-200 text-sm">
                  Xem sản phẩm: {prog.product} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={idx % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className={`rounded-2xl border-2 ${prog.bgLight} p-6 flex items-center justify-center min-h-[280px]`}>
                  <img src={prog.image} alt={prog.name} className="max-h-60 object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#003DA5] to-[#0057FF] py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black text-white mb-4">Đăng ký tư vấn chương trình học</h2>
          <p className="text-blue-200 mb-8">Chuyên gia UBTECH sẽ tư vấn chương trình học phù hợp nhất với nhu cầu của trường học và trung tâm của bạn.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/san-pham?category=bo-kit"
              className="px-8 py-4 bg-white text-[#003DA5] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl">
              Xem bộ kit học tập
            </Link>
            <Link href="/lien-he"
              className="px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
