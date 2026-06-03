// 'use client';
// import { useQuery } from '@tanstack/react-query';
// import Link from 'next/link';
// import {
//   ArrowRight, Bot, Cpu, BookOpen, Shield, Truck, HeadphonesIcon, Award,
//   ChevronRight, GraduationCap, CheckCircle2, Building2, MessageSquare, Phone,
//   Star, Sparkles, BadgeCheck, Microscope, Users, Zap,
// } from 'lucide-react';
// import api from '@/lib/axios';
// import ProductCard from '@/components/ui/ProductCard';
// import HeroApple from '@/components/ui/HeroApple';

// const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
// const PHONE = process.env.NEXT_PUBLIC_PHONE || ZALO;

// const fetchFeatured = () => api.get('/products/featured').then(r => r.data.data);
// const fetchNewest   = () => api.get('/products?limit=8&sort=newest').then(r => r.data.data);

// const PARTNER_LOGOS = [
//   { id: '1nyL_lq784JyipbXz409FvjwgZG8ejmj_', name: 'Victoria School' },
//   { id: '1x3S2wOUpBrYGxAKWOg9J_RtzQe139CvU', name: 'Đối tác 2' },
//   { id: '1hqjBz3ht6iF4JUNqek_gFZNEUZOsxv4o', name: 'STEM Ai' },
//   { id: '1bcqjlWNgawikjqQt-ua6q3K6X5Ty8ZY1', name: 'Inspire' },
//   { id: '11uM-ldKoFQeFIuJR67vfVaJxd109rXzh', name: 'Đối tác 5' },
//   { id: '1KVLf3dOxq5DN6LMIzTKjvqtsdJ7cbTjl', name: 'OMT' },
//   { id: '1QRWTn0vq4_VyErfGV_pSPWOKUiF3wvEo', name: 'Đối tác 7' },
//   { id: '1Ajupr-6TNzMKulhlq8iIaYqljsozpRNY', name: 'VGU' },
//   { id: '12S9ocUAC64kwtfkODAqxazEoMbLbUPap', name: 'Duy Tân' },
//   { id: '1uXwP-j4KQNejcdoN8xkEzDg1u3NORWE_', name: 'Đối tác 10' },
//   { id: '1sxlFS4mgIUbRcszOAYhmDlMwM7KCdlJp', name: 'Đối tác 11' },
//   { id: '1Gce5jrk6zLiok1W-CXMyTHhRZ-Uy4gLH', name: 'Đối tác 12' },
//   { id: '1dK9RNEZH1bmOruUMHGOW18uxsTaYC4T-', name: 'Van Lang' },
//   { id: '1UpV9oHo0e2rjoUnz_l4QFQfuxwJCx6MD', name: 'KidKui' },
//   { id: '1HWWnwIfKn9hDXnFwoJdZgHqokKwNm9_x', name: 'Đối tác 15' },
//   { id: '1ah4cg1FnRpiWDKkFoCoQpeZBgpnwh2wz', name: 'Đối tác 16' },
//   { id: '1osQp0YZqsMDWNBFTs4KEVvXrDkGrKm2e', name: 'Đối tác 17' },
// ];

// const FEATURED_ROBOTS = [
//   { name: 'Alpha Mini', image: 'https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-', slug: 'alpha-mini', desc: 'Robot humanoid nhỏ gọn, tích hợp AI' },
//   { name: 'Cruzr', image: 'https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew', slug: 'cruzr', desc: 'Robot dịch vụ thương mại thông minh' },
//   { name: 'Yanshee', image: 'https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L', slug: 'yanshee', desc: 'Robot giáo dục lập trình nâng cao' },
//   { name: 'Adibot', image: 'https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz', slug: 'adibot', desc: 'Robot khử khuẩn UV-C tự hành' },
// ];

// const COMMERCIAL_SOLUTIONS = [
//   { title: 'Robot dịch vụ khách hàng', desc: 'Tự động hóa khâu tiếp đón và hỗ trợ khách hàng tại ngân hàng, bệnh viện, tòa nhà văn phòng.', icon: Users },
//   { title: 'Robot khử trùng y tế', desc: 'Robot tự động hóa khâu khử trùng tại bệnh viện, phòng khám bằng công nghệ UV-C tiên tiến.', icon: Microscope },
//   { title: 'Robot tương tác thông minh', desc: 'Giao tiếp và tương tác với con người thông qua ngôn ngữ tự nhiên và AI nhận diện.', icon: Zap },
// ];

// const AIC_IMAGES = [
//   'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-03-1024x724.jpg',
//   'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-01-1024x725.jpg',
//   'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-26-1024x724.jpg',
// ];

// const PROGRAM_LEVELS = [
//   { level: 'K1–K3', name: 'AI Fantasy Zoo', age: '6–9 tuổi', desc: 'Khám phá AI qua mô hình động vật, học lập trình cơ bản Blockly', color: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-700', img: 'https://isavn.edu.vn/upload/1757745207_Screenshot-2024-03-02-160449.png' },
//   { level: 'K4–K6', name: 'AI Smart Life', age: '9–12 tuổi', desc: 'Cảm biến IoT, dự án thùng rác thông minh, khu vườn tự động', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', img: 'https://bizmovn.com/wp-content/uploads/2026/01/AI-Smart-Life-1-Sach-hoc-sinh-lop-3.jpg' },
//   { level: 'K7–K9', name: 'AI Transformer', age: '12–15 tuổi', desc: 'Điện tử nâng cao, hệ thống cảnh báo thông minh, robot tấn công', color: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700', img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/Book_Transformer_Workshop_06.png' },
//   { level: 'K10–K12', name: 'AI Super Engineer', age: '15–18 tuổi', desc: 'Nghiên cứu khoa học AI, dự án nông nghiệp & công nghiệp', color: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700', img: 'https://vnsea.edu.vn/wp-content/uploads/2025/08/nganh-robot-va-tri-tue-nhan-tao-3.jpg' },
// ];

// const NEWS_ITEMS = [
//   {
//     title: 'UBTECH XUẤT HIỆN TẠI TRIỂN LÃM ĐỔI MỚI SÁNG TẠO VIỆT NAM 2023',
//     date: 'Tháng 4, 2024',
//     excerpt: 'Cùng nhìn lại những hình ảnh nổi bật tại Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023 và Lễ khánh thành trung tâm NIC Hòa Lạc.',
//     image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/NIC-1.jpg',
//     slug: 'ubtech-xuat-hien-tai-trien-lam-doi-moi-sang-tao-viet-nam-2023',
//   },
//   {
//     title: 'UBTECH TRONG NGÀY HỘI GIÁO DỤC STEM',
//     date: 'Tháng 4, 2024',
//     excerpt: 'Ngày hội giáo dục STEM quận Tân Phú thu hút gần 1.000 học sinh và giáo viên cùng trải nghiệm Robotics và AI.',
//     image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Picture-2.jpg',
//     slug: 'ubtech-xuat-hien-trong-ngay-hoi-giao-duc-stem',
//   },
//   {
//     title: 'CHUYỂN ĐỔI SỐ CÙNG UBTECH VIỆT NAM',
//     date: 'Tháng 4, 2024',
//     excerpt: 'Chuyển đổi số đã trở thành xu hướng không thể thiếu. UBTECH đồng hành cùng doanh nghiệp và nhà trường trong hành trình này.',
//     image: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Chuong-trinh-chuyen-doi-so.jpg',
//     slug: 'chuyen-doi-so-cung-ubtech-viet-nam',
//   },
// ];

// export default function HomePage() {
//   const { data: featured = [] } = useQuery({ queryKey: ['featured'], queryFn: fetchFeatured });
//   const { data: newest   = [] } = useQuery({ queryKey: ['newest'],   queryFn: fetchNewest });

//   return (
//     <div className="bg-white">

//       {/* ══ HERO ══ */}
//       <HeroApple />

//       {/* ══ TRUST BAR ══ */}
//       <section className="bg-[#F8FAFF] border-y border-blue-100">
//         <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
//           {[
//             { icon: Shield,         title: 'Chính hãng 100%',    desc: 'Phân phối độc quyền UBTECH VN',  color: 'bg-blue-100 text-blue-600' },
//             { icon: Truck,          title: 'Giao hàng toàn quốc',desc: 'Miễn phí cho đơn từ 500.000đ',   color: 'bg-green-100 text-green-600' },
//             { icon: Award,          title: 'Bảo hành chính hãng',desc: '12 tháng, đổi trả 30 ngày',      color: 'bg-amber-100 text-amber-600' },
//             { icon: HeadphonesIcon, title: 'Hỗ trợ 24/7',        desc: 'Tư vấn qua Zalo & điện thoại',   color: 'bg-purple-100 text-purple-600' },
//           ].map(f => (
//             <div key={f.title} className="flex items-center gap-3.5">
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
//                 <f.icon className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-[#1A1F36]">{f.title}</p>
//                 <p className="text-xs text-[#6B7280]">{f.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ AI EDUCATION ══ */}
//       <section className="max-w-7xl mx-auto px-4 py-20">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">AI & ROBOTIC CHO GIÁO DỤC</span>
//             <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] leading-tight mb-6">
//               Chương trình AI & Robotics<br />
//               <span className="text-[#0057FF]">hoàn chỉnh nhất tại Việt Nam</span>
//             </h2>
//             <p className="text-[#6B7280] leading-relaxed mb-7">
//               UBTECH cung cấp chương trình về Trí tuệ nhân tạo và Robotics hoàn chỉnh phục vụ toàn bộ cấp học từ K1 đến K12.
//             </p>
//             <ul className="space-y-4 mb-9">
//               {[
//                 'Giáo trình được Bộ Khoa học và Công nghệ chứng nhận',
//                 'Bộ học cụ uKIT và sách học AI & Robotic từ lớp 1 đến 12',
//                 'Robot AI từ UBTECH phù hợp theo từng cấp độ',
//                 'Hỗ trợ tập huấn giáo viên, phần mềm, giáo cụ đầy đủ',
//               ].map(item => (
//                 <li key={item} className="flex items-start gap-3">
//                   <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
//                   </div>
//                   <span className="text-sm text-[#374151]">{item}</span>
//                 </li>
//               ))}
//             </ul>
//             <Link href="/chuong-trinh-k12"
//               className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0057FF] text-white font-bold rounded-xl hover:bg-[#003DA5] transition-all shadow-lg shadow-blue-200">
//               Khám phá chương trình học <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//           <div className="rounded-3xl overflow-hidden shadow-2xl">
//             <img
//               src="https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-08.jpg"
//               alt="Chương trình học AI Robotics UBTECH"
//               className="w-full object-cover"
//               style={{ maxHeight: 440 }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* ══ CHƯƠNG TRÌNH K12 ══ */}
//       <section className="bg-[#F8FAFF] py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-3 block">CHƯƠNG TRÌNH GIẢNG DẠY</span>
//             <h2 className="text-3xl font-black text-[#1A1F36]">Lộ trình học tập K1–K12</h2>
//             <p className="text-[#6B7280] mt-3 max-w-xl mx-auto text-sm">Hệ thống giáo trình được thiết kế khoa học theo từng cấp độ, đảm bảo tính liên tục và phù hợp với từng lứa tuổi.</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {PROGRAM_LEVELS.map(p => (
//               <Link key={p.level} href="/chuong-trinh-k12"
//                 className={`rounded-2xl border-2 ${p.color} hover:shadow-xl transition-all group overflow-hidden`}>
//                 <div className="w-full bg-white flex items-center justify-center" style={{height:'160px'}}>
//                   <img src={(p as any).img} alt={p.name}
//                     className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
//                 </div>
//                 <div className="p-5">
//                   <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${p.badge} mb-3`}>{p.level}</span>
//                   <h3 className="font-black text-[#1A1F36] mb-1 group-hover:text-[#0057FF] transition-colors">{p.name}</h3>
//                   <p className="text-xs text-[#6B7280] mb-2 font-medium">{p.age}</p>
//                   <p className="text-sm text-[#374151] leading-relaxed">{p.desc}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ ROBOT THƯƠNG MẠI ══ */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-3 block">ROBOT THƯƠNG MẠI PHỤC VỤ ĐA NGÀNH</span>
//             <h2 className="text-3xl font-black text-[#1A1F36]">Tự hào đi đầu thương mại hóa Robot AI</h2>
//             <p className="text-[#6B7280] mt-3 max-w-xl mx-auto text-sm">UBTECH cung cấp giải pháp robot tích hợp AI phục vụ đa lĩnh vực: dịch vụ khách hàng, y tế, du lịch.</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
//             {COMMERCIAL_SOLUTIONS.map(s => (
//               <div key={s.title} className="p-7 rounded-2xl bg-gradient-to-br from-[#F8FAFF] to-white border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
//                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
//                   <s.icon className="w-6 h-6 text-[#0057FF]" />
//                 </div>
//                 <h3 className="font-black text-[#1A1F36] mb-2">{s.title}</h3>
//                 <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
//               </div>
//             ))}
//           </div>

//           <h3 className="text-xl font-black text-[#1A1F36] mb-7 text-center">Các dòng Robot nổi bật mang công nghệ AI mới nhất</h3>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//             {FEATURED_ROBOTS.map(robot => (
//               <Link key={robot.slug} href={`/san-pham/${robot.slug}`}
//                 className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
//                 <div className="aspect-square bg-[#F5F7FA] overflow-hidden p-4">
//                   <img src={robot.image} alt={robot.name}
//                     className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
//                 </div>
//                 <div className="p-4">
//                   <p className="font-black text-[#1A1F36] group-hover:text-[#0057FF] transition-colors">{robot.name}</p>
//                   <p className="text-xs text-[#6B7280] mt-1">{robot.desc}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ PARTNERS ══ */}
//       <section className="bg-[#F8FAFF] py-20 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-semibold mb-3">Đã tin dùng</p>
//             <h2 className="text-2xl font-bold text-[#0A0F1A]">Khách hàng & Đối tác</h2>
//             <p className="text-[#64748B] text-sm mt-2">Ứng dụng AI & Robotics từ UBTECH trong thực tế tại Việt Nam</p>
//           </div>
//           <div className="flex flex-wrap items-center justify-center gap-5">
//             {PARTNER_LOGOS.map((logo) => (
//               <div key={logo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-[120px] h-[72px] flex items-center justify-center hover:shadow-md hover:border-[#0057FF]/20 transition-all">
//                 <img
//                   src={`https://lh3.googleusercontent.com/d/${logo.id}`}
//                   alt={logo.name}
//                   className="max-w-full max-h-full object-contain"
//                   onError={(e: any) => { e.target.parentElement.style.display = 'none'; }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ AI CENTER ══ */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-14 items-center">
//             <div>
//               <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">A.I CENTER</span>
//               <h2 className="text-3xl font-black text-[#1A1F36] mb-6 leading-tight">
//                 Trung tâm trải nghiệm<br />AI & Robotic từ UBTECH
//               </h2>
//               <p className="text-[#6B7280] leading-relaxed mb-7">
//                 Tập đoàn IPPG – đơn vị chủ quản UBTECH tại Việt Nam – tài trợ thành lập các Trung tâm Giáo dục Đào tạo AI (AIC) tại Đại học Đà Lạt và Làng Đại Học Quốc Gia TP.HCM.
//               </p>
//               <Link href="/gioi-thieu"
//                 className="inline-flex items-center gap-2 text-[#0057FF] font-semibold hover:gap-3 transition-all">
//                 Xem thêm <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {AIC_IMAGES.map((img, i) => (
//                 <div key={i} className={`${i === 0 ? 'col-span-2' : ''} rounded-2xl overflow-hidden shadow-lg`}>
//                   <img src={img} alt={`AI Center ${i+1}`} className="w-full h-full object-cover" style={{ height: i === 0 ? 220 : 140 }} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ FEATURED PRODUCTS ══ */}
//       {featured.length > 0 && (
//         <section className="bg-[#F8FAFF] py-20">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex items-end justify-between mb-9">
//               <div>
//                 <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">SẢN PHẨM</span>
//                 <h2 className="text-2xl font-black text-[#1A1F36] flex items-center gap-2.5">
//                   <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
//                   Nổi bật & Bán chạy
//                 </h2>
//               </div>
//               <Link href="/san-pham?featured=true" className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline">
//                 Xem tất cả <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//               {featured.slice(0, 8).map((p: any) => <ProductCard key={p._id} product={p} />)}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ══ CƠ SỞ PHÁP LÝ ══ */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="bg-gradient-to-br from-[#003DA5] to-[#0057FF] rounded-3xl p-8 lg:p-14 text-white">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-blue-100 text-xs font-semibold mb-5 border border-white/20">
//                   <BadgeCheck className="w-3.5 h-3.5" />
//                   Pháp lý minh bạch
//                 </div>
//                 <h2 className="text-2xl font-black mb-5 leading-tight">
//                   CƠ SỞ PHÁP LÝ ĐỘC QUYỀN PHÂN PHỐI CHÍNH HÃNG UBTECH VIỆT NAM
//                 </h2>
//                 <p className="text-blue-100 text-sm leading-relaxed mb-7">
//                   Tập đoàn IPPG, thông qua IPPTech, là Nhà Phân Phối Độc Quyền Chính Hãng và Duy Nhất của UBTECH Robotics Corp. tại thị trường Việt Nam từ ngày 9 tháng 9 năm 2019.
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     'Giáo trình được Viện KHGD Việt Nam – Bộ GD&ĐT thẩm định',
//                     'Chương trình AI được Bộ KH&CN phê duyệt',
//                     'Letter of Authorized Distributor từ UBTECH Robotics Corp.',
//                   ].map(item => (
//                     <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
//                       <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-300" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-4">
//                 <div className="rounded-2xl shadow-xl bg-white p-4 flex items-center justify-center" style={{minHeight:'200px'}}>
//                   <img src="https://ubtechvietnam.edu.vn/img/T2.png" alt="UBTECH Agreement" className="w-full h-auto object-contain" style={{maxHeight:'260px'}} />
//                 </div>
//                 <div className="grid grid-cols-3 gap-3">
//                   {['https://ubtechvietnam.edu.vn/img/TD2.png','https://ubtechvietnam.edu.vn/img/TD1.png','https://ubtechvietnam.edu.vn/img/TD3.png'].map((src, i) => (
//                     <div key={i} className="rounded-xl shadow-lg bg-white p-3 flex items-center justify-center" style={{minHeight:'130px'}}>
//                       <img src={src} alt={`Chứng nhận ${i+1}`} className="w-full h-auto object-contain" style={{maxHeight:'170px'}} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ NEWEST PRODUCTS ══ */}
//       <section className="bg-[#F8FAFF] py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-end justify-between mb-9">
//             <div>
//               <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">MỚI NHẤT</span>
//               <h2 className="text-2xl font-black text-[#1A1F36] flex items-center gap-2.5">
//                 <Sparkles className="w-6 h-6 text-[#0057FF]" />
//                 Hàng mới về
//               </h2>
//             </div>
//             <Link href="/san-pham?sort=newest" className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline">
//               Xem tất cả <ChevronRight className="w-4 h-4" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//             {newest.map((p: any) => <ProductCard key={p._id} product={p} />)}
//           </div>
//         </div>
//       </section>

//       {/* ══ TIN TỨC ══ */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-end justify-between mb-9">
//             <div>
//               <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">TIN TỨC</span>
//               <h2 className="text-2xl font-black text-[#1A1F36]">Tin tức về AI & Robotics</h2>
//               <p className="text-[#6B7280] text-sm mt-1.5">Cập nhật thông tin mới nhất từ UBTECH Việt Nam.</p>
//             </div>
//             <Link href="/tin-tuc" className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline">
//               Xem thêm <ChevronRight className="w-4 h-4" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
//             {NEWS_ITEMS.map(news => (
//               <Link key={news.slug} href={`/tin-tuc/${news.slug}`}
//                 className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
//                 <div className="aspect-[16/9] overflow-hidden bg-gray-100">
//                   <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                 </div>
//                 <div className="p-6">
//                   <p className="text-xs text-[#9CA3AF] mb-2.5 font-medium">{news.date}</p>
//                   <h3 className="font-bold text-[#1A1F36] line-clamp-2 group-hover:text-[#0057FF] transition-colors leading-snug mb-3">{news.title}</h3>
//                   <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">{news.excerpt}</p>
//                   <span className="text-xs text-[#0057FF] font-semibold mt-4 flex items-center gap-1">
//                     Đọc thêm <ArrowRight className="w-3 h-3" />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ CTA ZALO ══ */}
//       <section className="bg-gradient-to-r from-[#001F6B] via-[#003DA5] to-[#0057FF] py-20">
//         <div className="max-w-2xl mx-auto text-center px-4">
//           <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6">
//             <MessageSquare className="w-8 h-8 text-white" />
//           </div>
//           <h3 className="text-3xl font-black text-white mb-5">Cần tư vấn chuyên sâu?</h3>
//           <p className="text-blue-200 mb-10 leading-relaxed text-lg">
//             Đội ngũ chuyên gia UBTECH Việt Nam sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp nhất cho trường học, trung tâm hoặc gia đình.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a href={`https://zalo.me/${ZALO}`} target="_blank" rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#003DA5] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl text-base">
//               <MessageSquare className="w-5 h-5" />
//               Chat Zalo ngay
//             </a>
//             <a href={`tel:${PHONE}`}
//               className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-base">
//               <Phone className="w-5 h-5" />
//               {PHONE}
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  Building2,
  MessageSquare,
  Phone,
  Sparkles,
  BadgeCheck,
  Microscope,
  Users,
  Zap,
  School,
  CalendarDays,
  ArrowUpRight,
  Bot,
  Cpu,
  FlaskConical,
  Layers,
} from 'lucide-react';
import api from '@/lib/axios';
import HeroApple from '@/components/ui/HeroApple';

// ─── Constants ────────────────────────────────────────────────────────────────
const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
const PHONE = process.env.NEXT_PUBLIC_PHONE || ZALO;

// ─── Data fetchers (unchanged) ────────────────────────────────────────────────
const fetchFeatured = () => api.get('/products/featured').then(r => r.data.data);
const fetchNewest   = () => api.get('/products?limit=6&sort=newest').then(r => r.data.data);

// ─── Static data (unchanged) ──────────────────────────────────────────────────
const PARTNER_LOGOS = [
  { id: '1nyL_lq784JyipbXz409FvjwgZG8ejmj_', name: 'Victoria School' },
  { id: '1x3S2wOUpBrYGxAKWOg9J_RtzQe139CvU', name: 'Đối tác 2' },
  { id: '1hqjBz3ht6iF4JUNqek_gFZNEUZOsxv4o', name: 'STEM Ai' },
  { id: '1bcqjlWNgawikjqQt-ua6q3K6X5Ty8ZY1', name: 'Inspire' },
  { id: '11uM-ldKoFQeFIuJR67vfVaJxd109rXzh', name: 'Đối tác 5' },
  { id: '1KVLf3dOxq5DN6LMIzTKjvqtsdJ7cbTjl', name: 'OMT' },
  { id: '1QRWTn0vq4_VyErfGV_pSPWOKUiF3wvEo', name: 'Đối tác 7' },
  { id: '1Ajupr-6TNzMKulhlq8iIaYqljsozpRNY', name: 'VGU' },
  { id: '12S9ocUAC64kwtfkODAqxazEoMbLbUPap', name: 'Duy Tân' },
  { id: '1uXwP-j4KQNejcdoN8xkEzDg1u3NORWE_', name: 'Đối tác 10' },
  { id: '1sxlFS4mgIUbRcszOAYhmDlMwM7KCdlJp', name: 'Đối tác 11' },
  { id: '1Gce5jrk6zLiok1W-CXMyTHhRZ-Uy4gLH', name: 'Đối tác 12' },
  { id: '1dK9RNEZH1bmOruUMHGOW18uxsTaYC4T-', name: 'Van Lang' },
  { id: '1UpV9oHo0e2rjoUnz_l4QFQfuxwJCx6MD', name: 'KidKui' },
  { id: '1HWWnwIfKn9hDXnFwoJdZgHqokKwNm9_x', name: 'Đối tác 15' },
  { id: '1ah4cg1FnRpiWDKkFoCoQpeZBgpnwh2wz', name: 'Đối tác 16' },
  { id: '1osQp0YZqsMDWNBFTs4KEVvXrDkGrKm2e', name: 'Đối tác 17' },
];

const FEATURED_ROBOTS = [
  { name: 'Alpha Mini',  image: 'https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-', slug: 'alpha-mini', desc: 'Robot humanoid nhỏ gọn, tích hợp AI',         badge: 'Giáo dục' },
  { name: 'Cruzr',       image: 'https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew',  slug: 'cruzr',      desc: 'Robot dịch vụ thương mại thông minh',       badge: 'Doanh nghiệp' },
  { name: 'Yanshee',     image: 'https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L',  slug: 'yanshee',    desc: 'Robot giáo dục lập trình nâng cao',         badge: 'K12 / ĐH' },
  { name: 'Adibot',      image: 'https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz',  slug: 'adibot',     desc: 'Robot khử khuẩn UV-C tự hành',             badge: 'Y tế' },
];

const COMMERCIAL_SOLUTIONS = [
  { title: 'Robot dịch vụ khách hàng', desc: 'Tự động hóa tiếp đón và hỗ trợ khách hàng tại ngân hàng, bệnh viện, tòa nhà văn phòng.', icon: Users },
  { title: 'Robot khử trùng y tế',     desc: 'Robot tự hóa khử trùng tại bệnh viện, phòng khám bằng công nghệ UV-C tiên tiến.',       icon: Microscope },
  { title: 'Robot tương tác AI',        desc: 'Giao tiếp với con người qua ngôn ngữ tự nhiên và nhận diện AI thế hệ mới.',               icon: Zap },
];

const AIC_IMAGES = [
  'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-03-1024x724.jpg',
  'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-01-1024x725.jpg',
  'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/AIC-26-1024x724.jpg',
];

const PROGRAM_LEVELS = [
  { level: 'K1–K3',   name: 'AI Fantasy Zoo',    age: '6–9 tuổi',   desc: 'Khám phá AI qua mô hình động vật, học lập trình cơ bản Blockly',                        badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-100', img: 'https://isavn.edu.vn/upload/1757745207_Screenshot-2024-03-02-160449.png' },
  { level: 'K4–K6',   name: 'AI Smart Life',     age: '9–12 tuổi',  desc: 'Cảm biến IoT, dự án thùng rác thông minh, khu vườn tự động',                           badge: 'bg-blue-100 text-blue-700',     border: 'border-blue-100',    img: 'https://bizmovn.com/wp-content/uploads/2026/01/AI-Smart-Life-1-Sach-hoc-sinh-lop-3.jpg' },
  { level: 'K7–K9',   name: 'AI Transformer',    age: '12–15 tuổi', desc: 'Điện tử nâng cao, hệ thống cảnh báo thông minh, robot tấn công',                        badge: 'bg-violet-100 text-violet-700', border: 'border-violet-100',  img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/Book_Transformer_Workshop_06.png' },
  { level: 'K10–K12', name: 'AI Super Engineer', age: '15–18 tuổi', desc: 'Nghiên cứu khoa học AI, dự án nông nghiệp & công nghiệp',                              badge: 'bg-orange-100 text-orange-700', border: 'border-orange-100',  img: 'https://vnsea.edu.vn/wp-content/uploads/2025/08/nganh-robot-va-tri-tue-nhan-tao-3.jpg' },
];

const NEWS_ITEMS = [
  {
    title:   'UBTECH XUẤT HIỆN TẠI TRIỂN LÃM ĐỔI MỚI SÁNG TẠO VIỆT NAM 2023',
    date:    'Tháng 4, 2024',
    excerpt: 'Cùng nhìn lại những hình ảnh nổi bật tại Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023 và Lễ khánh thành trung tâm NIC Hòa Lạc.',
    image:   'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/NIC-1.jpg',
    slug:    'ubtech-xuat-hien-tai-trien-lam-doi-moi-sang-tao-viet-nam-2023',
  },
  {
    title:   'UBTECH TRONG NGÀY HỘI GIÁO DỤC STEM',
    date:    'Tháng 4, 2024',
    excerpt: 'Ngày hội giáo dục STEM quận Tân Phú thu hút gần 1.000 học sinh và giáo viên cùng trải nghiệm Robotics và AI.',
    image:   'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Picture-2.jpg',
    slug:    'ubtech-xuat-hien-trong-ngay-hoi-giao-duc-stem',
  },
  {
    title:   'CHUYỂN ĐỔI SỐ CÙNG UBTECH VIỆT NAM',
    date:    'Tháng 4, 2024',
    excerpt: 'Chuyển đổi số đã trở thành xu hướng không thể thiếu. UBTECH đồng hành cùng doanh nghiệp và nhà trường trong hành trình này.',
    image:   'https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Chuong-trinh-chuyen-doi-so.jpg',
    slug:    'chuyen-doi-so-cung-ubtech-viet-nam',
  },
];

// ─── Section label component ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.22em] mb-3 flex items-center gap-2">
      <span className="inline-block w-4 h-px bg-[#0057FF] opacity-50" />
      {children}
    </p>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: featured = [] } = useQuery({ queryKey: ['featured'], queryFn: fetchFeatured });
  const { data: newest   = [] } = useQuery({ queryKey: ['newest'],   queryFn: fetchNewest });

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════════
          1. HERO — giữ nguyên HeroApple (existing component)
      ════════════════════════════════════════════════════════════════ */}
      <HeroApple />

      {/* ════════════════════════════════════════════════════════════════
          STATS RIBBON — positioning statement
      ════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0057FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
          {[
            { n: '500+',     l: 'Thiết bị & Giải pháp' },
            { n: '10.000+',  l: 'Học sinh & Người dùng' },
            { n: 'Bộ GD&ĐT', l: 'Chứng nhận giáo trình' },
            { n: 'Từ 2019',  l: 'Độc quyền tại VN' },
          ].map(({ n, l }) => (
            <div key={l} className="px-4 sm:px-6 py-1 first:pl-0 last:pr-0 text-center sm:text-left">
              <p className="text-white font-black text-xl sm:text-2xl leading-tight">{n}</p>
              <p className="text-blue-200 text-xs mt-0.5 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. THREE SOLUTION CARDS — K12 · Đại học · Doanh nghiệp
      ════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-14">
          <SectionLabel>Hệ sinh thái giải pháp</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] tracking-tight leading-tight">
            AI & Robotics cho mọi<br className="hidden sm:block" /> đối tượng, mọi quy mô
          </h2>
          <p className="text-[#6B7280] mt-4 max-w-xl mx-auto text-base leading-relaxed">
            UBTECH Việt Nam cung cấp hệ sinh thái AI & Robotics hoàn chỉnh — từ chương trình K12 đến AI Lab đại học và triển khai doanh nghiệp.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* ── K12 ── */}
          <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EEF8F0] to-[#D6F0DC] border border-emerald-100 p-8 flex flex-col hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
              <School className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Giáo dục phổ thông</span>
            <h3 className="text-2xl font-black text-[#1A1F36] mb-3 leading-tight">Giải pháp K12</h3>
            <p className="text-[#374151] text-sm leading-relaxed flex-1 mb-6">
              Chương trình AI & Robotics chuẩn quốc gia từ lớp 1 đến lớp 12. Giáo trình được Bộ GD&ĐT thẩm định, thiết bị đồng bộ, hỗ trợ tập huấn giáo viên toàn diện.
            </p>
            <ul className="space-y-2 mb-8">
              {['Lộ trình K1–K12 hoàn chỉnh', 'Bộ kit uKIT & sách chuyên biệt', 'Cuộc thi Robotics cấp quốc gia'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#374151]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/chuong-trinh-k12"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-200 w-fit"
            >
              Tư vấn chương trình K12
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Đại học ── */}
          <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EEF3FF] to-[#D9E6FF] border border-blue-100 p-8 flex flex-col hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0057FF] flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#0057FF] uppercase tracking-widest mb-2">Giáo dục đại học</span>
            <h3 className="text-2xl font-black text-[#1A1F36] mb-3 leading-tight">AI Lab / AI Center</h3>
            <p className="text-[#374151] text-sm leading-relaxed flex-1 mb-6">
              Giải pháp xây dựng phòng lab AI & Robotics chuẩn quốc tế cho trường đại học. Thiết bị nghiên cứu, hệ thống demo và chương trình đào tạo kỹ sư AI.
            </p>
            <ul className="space-y-2 mb-8">
              {['Thiết kế & lắp đặt AI Lab', 'Robot giảng dạy & nghiên cứu', 'Chương trình đào tạo kỹ sư AI'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#374151]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/lien-he?type=ailab"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0057FF] text-white font-bold text-sm hover:bg-[#003DC2] transition-colors shadow-md shadow-blue-200 w-fit"
            >
              Tư vấn AI Lab / AI Center
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Doanh nghiệp ── */}
          <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A1F36] to-[#2D3459] border border-[#3D4470] p-8 flex flex-col hover:shadow-2xl hover:shadow-[#0057FF]/20 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">Enterprise Solutions</span>
            <h3 className="text-2xl font-black text-white mb-3 leading-tight">Giải pháp Doanh nghiệp</h3>
            <p className="text-blue-200 text-sm leading-relaxed flex-1 mb-6">
              Robot AI thương mại phục vụ đa ngành: dịch vụ khách hàng, khử trùng y tế, tự động hóa tòa nhà. Tích hợp và triển khai theo yêu cầu riêng.
            </p>
            <ul className="space-y-2 mb-8">
              {['Robot tiếp tân & hỗ trợ khách hàng', 'Hệ thống khử khuẩn tự động', 'Tích hợp API & phần mềm doanh nghiệp'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/lien-he?type=demo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#1A1F36] font-bold text-sm hover:bg-blue-50 transition-colors shadow-md w-fit"
            >
              Đặt lịch demo robot
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. PRODUCT ECOSYSTEM — catalogue showcase (NO prices)
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Hệ sinh thái thiết bị</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] tracking-tight leading-tight">
                Robot & Thiết bị AI<br className="hidden sm:block" /> hàng đầu thế giới
              </h2>
              <p className="text-[#6B7280] mt-3 max-w-lg text-sm leading-relaxed">
                Toàn bộ dòng sản phẩm UBTECH được phân phối độc quyền chính hãng tại Việt Nam — từ robot giáo dục đến robot thương mại.
              </p>
            </div>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-[#E4E8EF] text-[#1A1F36] font-semibold text-sm hover:border-[#0057FF] hover:text-[#0057FF] transition-all flex-shrink-0 w-fit"
            >
              Xem toàn bộ catalogue
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Robot cards — NO price, NO cart */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {FEATURED_ROBOTS.map(robot => (
              <Link
                key={robot.slug}
                href={`/san-pham/${robot.slug}`}
                className="group bg-white rounded-2xl border border-[#E4E8EF] overflow-hidden hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-[#0057FF]/8 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-[#F4F7FF] to-[#EBF0FF] overflow-hidden p-5 relative">
                  <img
                    src={robot.image}
                    alt={robot.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#0057FF] border border-[#0057FF]/15 shadow-sm">
                    {robot.badge}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-[#1A1F36] group-hover:text-[#0057FF] transition-colors mb-1.5">{robot.name}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed flex-1">{robot.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#0057FF] group-hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured from API — solution catalogue style */}
          {featured.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-bold text-[#6B7280] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0057FF]" />
                  Thiết bị nổi bật
                </p>
                <Link href="/san-pham?featured=true" className="text-xs text-[#0057FF] font-semibold flex items-center gap-1 hover:underline">
                  Tất cả <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {featured.slice(0, 6).map((p: any) => (
                  <Link
                    key={p._id}
                    href={`/san-pham/${p.slug}`}
                    className="group bg-white rounded-xl border border-[#E4E8EF] overflow-hidden hover:border-[#0057FF]/25 hover:shadow-lg transition-all p-3 flex flex-col items-center text-center gap-2"
                  >
                    <div className="w-full aspect-square bg-[#F5F7FA] rounded-lg overflow-hidden">
                      {p.images?.[0]?.url ? (
                        <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Bot className="w-8 h-8 text-[#C4C9D4]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#1A1F36] group-hover:text-[#0057FF] transition-colors line-clamp-2 leading-snug">{p.name}</p>
                    <span className="text-[10px] text-[#0057FF] font-semibold flex items-center gap-0.5">
                      Xem chi tiết <ChevronRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          K12 CURRICULUM — lộ trình học tập
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <SectionLabel>Chương trình giảng dạy</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] tracking-tight leading-tight">
              Lộ trình AI & Robotics<br className="hidden sm:block" /> từ K1 đến K12
            </h2>
            <p className="text-[#6B7280] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Hệ thống giáo trình thiết kế khoa học theo từng cấp độ, liên tục và phù hợp lứa tuổi — được Bộ KH&CN phê duyệt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAM_LEVELS.map((p, idx) => (
              <Link
                key={p.level}
                href="/chuong-trinh-k12"
                className={`group rounded-2xl border-2 ${p.border} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}
              >
                {/* Step indicator */}
                <div className="px-5 pt-5 flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${p.badge}`}>
                    {p.level}
                  </span>
                  <span className="text-xs text-[#9CA3AF] font-medium">Step {idx + 1}</span>
                </div>

                {/* Image */}
                <div className="mx-5 rounded-xl overflow-hidden bg-[#F5F7FA] h-36 mb-4">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="px-5 pb-6 flex flex-col flex-1">
                  <h3 className="font-black text-[#1A1F36] group-hover:text-[#0057FF] transition-colors mb-1 leading-snug">{p.name}</h3>
                  <p className="text-[11px] text-[#9CA3AF] font-semibold mb-2">{p.age}</p>
                  <p className="text-sm text-[#374151] leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#0057FF] group-hover:gap-2 transition-all">
                    Tìm hiểu thêm <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/chuong-trinh-k12"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#0057FF] text-white font-bold hover:bg-[#003DC2] transition-colors shadow-lg shadow-[#0057FF]/20"
            >
              Xem toàn bộ chương trình K1–K12
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. AI LAB / AI CENTER
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <div>
              <SectionLabel>A.I Center & AI Lab</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] mb-5 leading-tight tracking-tight">
                Trung tâm trải nghiệm<br />
                <span className="text-[#0057FF]">AI & Robotics</span> chuẩn quốc tế
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-8 text-base">
                Tập đoàn IPPG – đơn vị chủ quản UBTECH tại Việt Nam – tài trợ thành lập các Trung tâm Giáo dục Đào tạo AI (AIC) tại Đại học Đà Lạt và Làng Đại Học Quốc Gia TP.HCM.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: FlaskConical, label: 'Lab thiết kế chuẩn quốc tế' },
                  { icon: Cpu,          label: 'Thiết bị AI thế hệ mới' },
                  { icon: Layers,       label: 'Chương trình đào tạo riêng' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center p-4 rounded-2xl bg-white border border-[#E4E8EF]">
                    <Icon className="w-5 h-5 text-[#0057FF] mx-auto mb-2" />
                    <p className="text-[11px] text-[#374151] font-semibold leading-tight">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/lien-he?type=ailab"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0057FF] text-white font-bold text-sm hover:bg-[#003DC2] transition-colors shadow-lg shadow-[#0057FF]/20"
                >
                  <CalendarDays className="w-4 h-4" />
                  Tư vấn AI Lab cho trường ĐH
                </Link>
                <Link
                  href="/gioi-thieu"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-[#E4E8EF] text-[#1A1F36] font-semibold text-sm hover:border-[#0057FF] hover:text-[#0057FF] transition-all"
                >
                  Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg aspect-video">
                <img src={AIC_IMAGES[0]} alt="AI Center" className="w-full h-full object-cover" />
              </div>
              {AIC_IMAGES.slice(1).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-md aspect-video">
                  <img src={img} alt={`AI Center ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          ENTERPRISE / COMMERCIAL ROBOTS
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <SectionLabel>Robot thương mại</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] tracking-tight leading-tight">
              Tự động hóa thông minh<br className="hidden sm:block" /> cho doanh nghiệp
            </h2>
            <p className="text-[#6B7280] mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Robot AI UBTECH được triển khai tại ngân hàng, bệnh viện, sân bay và các tổ chức lớn trên toàn quốc.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {COMMERCIAL_SOLUTIONS.map(s => (
              <div
                key={s.title}
                className="group p-8 rounded-2xl bg-white border border-[#E4E8EF] hover:border-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] flex items-center justify-center mb-5 group-hover:bg-[#0057FF] transition-colors">
                  <s.icon className="w-6 h-6 text-[#0057FF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-[#1A1F36] mb-2.5 text-lg">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/lien-he?type=demo"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-[#0057FF] text-[#0057FF] font-bold text-sm hover:bg-[#EEF3FF] transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Đặt lịch demo robot tại doanh nghiệp
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. PARTNERS — trusted by
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <SectionLabel>Khách hàng & Đối tác</SectionLabel>
            <h2 className="text-2xl font-black text-[#1A1F36]">
              Tin dùng bởi 10.000+ người dùng
            </h2>
            <p className="text-[#6B7280] text-sm mt-2">Từ trường học, đại học đến doanh nghiệp và bệnh viện trên toàn quốc.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNER_LOGOS.map(logo => (
              <div
                key={logo.id}
                className="bg-white rounded-xl shadow-sm border border-[#E4E8EF] p-3.5 w-[112px] h-[68px] flex items-center justify-center hover:shadow-md hover:border-[#0057FF]/25 transition-all"
              >
                <img
                  src={`https://lh3.googleusercontent.com/d/${logo.id}`}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e: any) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          LEGAL / CREDENTIALS — authority section
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0D1B4B] via-[#002E8A] to-[#0057FF] p-8 lg:p-14 overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-blue-100 text-xs font-semibold mb-6 border border-white/20">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-300" />
                  Pháp lý minh bạch
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-5 leading-tight">
                  Phân phối độc quyền<br />UBTECH Robotics tại Việt Nam
                </h2>
                <p className="text-blue-200 text-sm leading-relaxed mb-7">
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
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-white p-4 flex items-center justify-center min-h-[200px] shadow-xl">
                  <img src="https://ubtechvietnam.edu.vn/img/T2.png" alt="UBTECH Agreement" className="w-full h-auto object-contain max-h-[240px]" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['https://ubtechvietnam.edu.vn/img/TD2.png','https://ubtechvietnam.edu.vn/img/TD1.png','https://ubtechvietnam.edu.vn/img/TD3.png'].map((src, i) => (
                    <div key={i} className="rounded-xl bg-white p-3 flex items-center justify-center min-h-[110px] shadow-lg">
                      <img src={src} alt={`Chứng nhận ${i+1}`} className="w-full h-auto object-contain max-h-[140px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          6. NEWS
      ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <SectionLabel>Tin tức & Hoạt động</SectionLabel>
              <h2 className="text-3xl font-black text-[#1A1F36] tracking-tight">
                Cập nhật mới nhất
              </h2>
            </div>
            <Link
              href="/tin-tuc"
              className="flex items-center gap-1.5 text-sm text-[#0057FF] font-semibold hover:underline flex-shrink-0"
            >
              Xem tất cả tin tức <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-7">
            {NEWS_ITEMS.map((news, idx) => (
              <Link
                key={news.slug}
                href={`/tin-tuc/${news.slug}`}
                className="group bg-white rounded-2xl border border-[#E4E8EF] overflow-hidden hover:shadow-xl hover:border-[#0057FF]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {idx === 0 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0057FF] text-white text-[10px] font-bold">
                      Nổi bật
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs text-[#9CA3AF] mb-3 font-medium">{news.date}</p>
                  <h3 className="font-bold text-[#1A1F36] line-clamp-2 group-hover:text-[#0057FF] transition-colors leading-snug mb-3 text-base">
                    {news.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed mb-4">{news.excerpt}</p>
                  <span className="text-xs text-[#0057FF] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc thêm <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. CONTACT CTA — full-width
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#001F6B] via-[#003DA5] to-[#0057FF] py-20 px-8 lg:px-20 text-center relative overflow-hidden">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[600px] h-[600px] rounded-full border border-white/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full border border-white/8" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Đội ngũ tư vấn đang hoạt động
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5 leading-tight tracking-tight">
                Bắt đầu hành trình AI & Robotics<br className="hidden sm:block" /> cùng UBTECH Việt Nam
              </h2>
              <p className="text-blue-200 mb-12 leading-relaxed text-base max-w-xl mx-auto">
                Chuyên gia của chúng tôi sẵn sàng tư vấn giải pháp phù hợp — từ chương trình K12, AI Lab đại học đến triển khai robot doanh nghiệp.
              </p>

              {/* CTA grid */}
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
                {[
                  { label: 'Tư vấn K12',   href: '/lien-he?type=k12',   sub: 'Cho trường học' },
                  { label: 'Tư vấn AI Lab', href: '/lien-he?type=ailab', sub: 'Cho đại học' },
                  { label: 'Demo Robot',    href: '/lien-he?type=demo',  sub: 'Cho doanh nghiệp' },
                ].map(btn => (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    className="flex flex-col items-center py-4 px-4 rounded-2xl bg-white/15 border border-white/25 hover:bg-white/25 hover:border-white/40 transition-all group"
                  >
                    <p className="text-white font-bold text-sm">{btn.label}</p>
                    <p className="text-blue-200 text-xs mt-0.5">{btn.sub}</p>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/50 mt-1.5 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>

              {/* Contact methods */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://zalo.me/${ZALO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white text-[#0057FF] font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-black/20 text-sm"
                >
                  <MessageSquare className="w-5 h-5" />
                  Nhắn Zalo ngay
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/15 text-white font-semibold rounded-2xl hover:bg-white/25 transition-all border border-white/30 text-sm"
                >
                  <Phone className="w-5 h-5" />
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}