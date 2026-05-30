import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const NEWS_MAP: Record<string, { title: string; date: string; content: string; image: string; tag: string }> = {
  'ubtech-xuat-hien-tai-trien-lam-doi-moi-sang-tao-viet-nam-2023': {
    title: 'UBTECH XUẤT HIỆN TẠI TRIỂN LÃM ĐỔI MỚI SÁNG TẠO VIỆT NAM 2023',
    date: 'Tháng 4, 2024',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/NIC-1.jpg',
    tag: 'Sự kiện',
    content: `Cùng nhìn lại số hình ảnh của sự kiện Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023 và Lễ khánh thành trung tâm NIC Hòa Lạc.\n\nĐây là dịp để UBTECH Việt Nam khẳng định vị thế tiên phong trong lĩnh vực AI và Robotics, đồng thời giới thiệu các giải pháp công nghệ tiên tiến phục vụ đa ngành.\n\nTại sự kiện, UBTECH đã trình diễn các dòng robot thương mại như Cruzr, Adibot cùng hệ thống giáo dục AI K12 hoàn chỉnh, thu hút sự quan tâm đặc biệt từ đông đảo doanh nghiệp và cơ quan giáo dục.`,
  },
  'ubtech-xuat-hien-trong-ngay-hoi-giao-duc-stem': {
    title: 'UBTECH "XUẤT HIỆN" TRONG NGÀY HỘI GIÁO DỤC STEM',
    date: 'Tháng 4, 2024',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Picture-2.jpg',
    tag: 'Giáo dục',
    content: `Sáng 21-10, Ngày hội giáo dục STEM quận Tân Phú (TP.HCM) diễn ra tại Trường THCS Hoàng Diệu thu hút gần 1.000 học sinh, giáo viên đến tham gia.\n\nUBTECH đã mang đến các bộ kit lập trình robot và robot JIMU, tạo nên không gian trải nghiệm sáng tạo thú vị cho học sinh. Các em học sinh đã được trực tiếp lắp ráp, lập trình và điều khiển robot.\n\nSự kiện là minh chứng rõ ràng cho tầm quan trọng của giáo dục STEM trong thời đại công nghệ 4.0, và vai trò tiên phong của UBTECH trong việc đưa robot và AI vào giáo dục Việt Nam.`,
  },
  'chuyen-doi-so-cung-ubtech-viet-nam': {
    title: 'CHUYỂN ĐỔI SỐ CÙNG UBTECH VIỆT NAM',
    date: 'Tháng 4, 2024',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Chuong-trinh-chuyen-doi-so.jpg',
    tag: 'Công nghệ',
    content: `Ngày nay, chuyển đổi số đã trở thành một xu hướng quan trọng và không thể thiếu trong nhiều lĩnh vực của đời sống, công nghiệp và giáo dục.\n\nUBTECH Việt Nam đồng hành cùng doanh nghiệp và các tổ chức giáo dục trong hành trình chuyển đổi số, cung cấp các giải pháp robot thông minh giúp tự động hóa quy trình, nâng cao hiệu quả vận hành.\n\nVới hơn 5 năm kinh nghiệm tại thị trường Việt Nam, UBTECH đã triển khai thành công nhiều dự án chuyển đổi số tại các ngân hàng, bệnh viện, trung tâm thương mại và trường học trên toàn quốc.`,
  },
};

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const news = NEWS_MAP[params.slug];
  if (!news) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-[#6B7280]">Không tìm thấy bài viết</p>
      <Link href="/tin-tuc" className="text-[#0057FF] font-semibold mt-4 inline-block">← Quay lại tin tức</Link>
    </div>
  );
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-sm text-[#0057FF] font-semibold mb-8 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" /> Quay lại tin tức
      </Link>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-2.5 py-1 bg-blue-50 text-[#0057FF] text-xs font-bold rounded-lg">{news.tag}</span>
        <span className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Calendar className="w-3 h-3" />{news.date}</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-[#1A1F36] mb-6 leading-snug">{news.title}</h1>
      <img src={news.image} alt={news.title} className="w-full rounded-2xl shadow-xl mb-8 object-cover" style={{ maxHeight: 400 }} />
      <div className="prose prose-lg max-w-none">
        {news.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-[#374151] leading-relaxed mb-4">{para}</p>
        ))}
      </div>
    </div>
  );
}
