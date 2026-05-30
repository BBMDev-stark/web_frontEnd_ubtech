import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = { title: 'Tin tức AI & Robotics | UBTECH Việt Nam' };

const NEWS = [
  {
    title: 'UBTECH XUẤT HIỆN TẠI TRIỂN LÃM ĐỔI MỚI SÁNG TẠO VIỆT NAM 2023',
    date: 'Tháng 4, 2024',
    excerpt: 'Cùng nhìn lại số hình ảnh của sự kiện Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023 và Lễ khánh thành trung tâm NIC Hòa Lạc. Đây là dịp để UBTECH khẳng định vị thế tiên phong trong lĩnh vực AI và Robotics tại Việt Nam.',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/NIC-1.jpg',
    slug: 'ubtech-xuat-hien-tai-trien-lam-doi-moi-sang-tao-viet-nam-2023',
    tag: 'Sự kiện',
  },
  {
    title: 'UBTECH "XUẤT HIỆN" TRONG NGÀY HỘI GIÁO DỤC STEM',
    date: 'Tháng 4, 2024',
    excerpt: 'Sáng 21-10, Ngày hội giáo dục STEM quận Tân Phú (TP.HCM) diễn ra tại Trường THCS Hoàng Diệu thu hút gần 1.000 học sinh, giáo viên đến tham gia. Sự kiện đánh dấu bước tiến quan trọng trong giáo dục STEM tại TP.HCM.',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Picture-2.jpg',
    slug: 'ubtech-xuat-hien-trong-ngay-hoi-giao-duc-stem',
    tag: 'Giáo dục',
  },
  {
    title: 'CHUYỂN ĐỔI SỐ CÙNG UBTECH VIỆT NAM',
    date: 'Tháng 4, 2024',
    excerpt: 'Ngày nay, chuyển đổi số đã trở thành một xu hướng quan trọng và không thể thiếu trong nhiều lĩnh vực của đời sống, công nghiệp và giáo dục. UBTECH Việt Nam đồng hành cùng doanh nghiệp trong hành trình này.',
    image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Chuong-trinh-chuyen-doi-so.jpg',
    slug: 'chuyen-doi-so-cung-ubtech-viet-nam',
    tag: 'Công nghệ',
  },
];

export default function NewsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#001F6B] to-[#0057FF] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-3">TIN TỨC</p>
          <h1 className="text-4xl font-black mb-4">Tin tức về AI & Robotics</h1>
          <p className="text-blue-100">Cập nhật những thông tin, kiến thức mới nhất về AI và Robotics từ UBTECH.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS.map(news => (
            <Link key={news.slug} href={`/tin-tuc/${news.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#0057FF] text-xs font-bold rounded-lg">{news.tag}</span>
                  <span className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Calendar className="w-3 h-3" />{news.date}</span>
                </div>
                <h3 className="font-bold text-[#1A1F36] line-clamp-2 group-hover:text-[#0057FF] transition-colors leading-snug mb-3">{news.title}</h3>
                <p className="text-sm text-[#6B7280] line-clamp-3 leading-relaxed mb-4">{news.excerpt}</p>
                <p className="text-xs text-[#0057FF] font-semibold flex items-center gap-1">Xem thêm <ArrowRight className="w-3 h-3" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
