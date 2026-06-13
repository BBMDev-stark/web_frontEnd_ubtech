"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cpu,
  BookOpen,
  Shield,
  Truck,
  HeadphonesIcon,
  Award,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  Building2,
  MessageSquare,
  Phone,
  Star,
  Sparkles,
  BadgeCheck,
  Microscope,
  Users,
  Zap,
  ChevronLeft,
} from "lucide-react";
import api from "@/lib/axios";
import ProductCard from "@/components/ui/ProductCard";
import HeroApple from "@/components/ui/HeroApple";

const ZALO = process.env.NEXT_PUBLIC_ZALO_PHONE || "0915594103";
const PHONE = process.env.NEXT_PUBLIC_PHONE || ZALO;

const fetchFeatured = () =>
  api.get("/products/featured").then((r) => r.data.data);
const fetchNewest = () =>
  api.get("/products?limit=8&sort=newest").then((r) => r.data.data);

const PARTNER_LOGOS = [
  { id: "1nyL_lq784JyipbXz409FvjwgZG8ejmj_", name: "Victoria School" },
  { id: "1x3S2wOUpBrYGxAKWOg9J_RtzQe139CvU", name: "Đối tác 2" },
  { id: "1hqjBz3ht6iF4JUNqek_gFZNEUZOsxv4o", name: "STEM Ai" },
  { id: "1bcqjlWNgawikjqQt-ua6q3K6X5Ty8ZY1", name: "Inspire" },
  { id: "11uM-ldKoFQeFIuJR67vfVaJxd109rXzh", name: "Đối tác 5" },
  { id: "1KVLf3dOxq5DN6LMIzTKjvqtsdJ7cbTjl", name: "OMT" },
  { id: "1QRWTn0vq4_VyErfGV_pSPWOKUiF3wvEo", name: "Đối tác 7" },
  { id: "1Ajupr-6TNzMKulhlq8iIaYqljsozpRNY", name: "VGU" },
  { id: "12S9ocUAC64kwtfkODAqxazEoMbLbUPap", name: "Duy Tân" },
  { id: "1uXwP-j4KQNejcdoN8xkEzDg1u3NORWE_", name: "Đối tác 10" },
  { id: "1sxlFS4mgIUbRcszOAYhmDlMwM7KCdlJp", name: "Đối tác 11" },
  { id: "1Gce5jrk6zLiok1W-CXMyTHhRZ-Uy4gLH", name: "Đối tác 12" },
  { id: "1dK9RNEZH1bmOruUMHGOW18uxsTaYC4T-", name: "Van Lang" },
  { id: "1UpV9oHo0e2rjoUnz_l4QFQfuxwJCx6MD", name: "KidKui" },
  { id: "1HWWnwIfKn9hDXnFwoJdZgHqokKwNm9_x", name: "Đối tác 15" },
  { id: "1ah4cg1FnRpiWDKkFoCoQpeZBgpnwh2wz", name: "Đối tác 16" },
  { id: "1osQp0YZqsMDWNBFTs4KEVvXrDkGrKm2e", name: "Đối tác 17" },
  // ── Thêm logo mới vào đây ──
  // { id: 'GOOGLE_DRIVE_FILE_ID', name: 'Tên đối tác' },
];

// Chia PARTNER_LOGOS thành 2 hàng
const ROW1 = PARTNER_LOGOS.slice(0, Math.ceil(PARTNER_LOGOS.length / 2));
const ROW2 = PARTNER_LOGOS.slice(Math.ceil(PARTNER_LOGOS.length / 2));

const FEATURED_ROBOTS = [
  {
    name: "Alpha Mini",
    image:
      "https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-",
    slug: "alpha-mini",
    desc: "Robot humanoid nhỏ gọn, tích hợp AI",
  },
  {
    name: "Cruzr",
    image:
      "https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew",
    slug: "cruzr",
    desc: "Robot dịch vụ thương mại thông minh",
  },
  {
    name: "Yanshee",
    image:
      "https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L",
    slug: "yanshee",
    desc: "Robot giáo dục lập trình nâng cao",
  },
  {
    name: "Adibot",
    image:
      "https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz",
    slug: "adibot",
    desc: "Robot khử khuẩn UV-C tự hành",
  },
];

const COMMERCIAL_SOLUTIONS = [
  {
    title: "Robot dịch vụ khách hàng",
    desc: "Tự động hóa khâu tiếp đón và hỗ trợ khách hàng tại ngân hàng, bệnh viện, tòa nhà văn phòng.",
    icon: Users,
  },
  {
    title: "Robot khử trùng y tế",
    desc: "Robot tự động hóa khâu khử trùng tại bệnh viện, phòng khám bằng công nghệ UV-C tiên tiến.",
    icon: Microscope,
  },
  {
    title: "Robot tương tác thông minh",
    desc: "Giao tiếp và tương tác với con người thông qua ngôn ngữ tự nhiên và AI nhận diện.",
    icon: Zap,
  },
];

const AIC_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSudFY2lXBinYnK90XdUNJpoMw9cug6-Hq07_wzlWJSzH3sTBiplunKabk&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_agV09OjQKlo2pzFCyDdv-30mnGkM1vuKt5TFiNcKacc1e-7nQbkFPGTt&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhjlqmL--QuV1_nhp1rdB9er-hUt6RmfRAi_Rz1ILXr9CUn6x1ZQUuTZw&s=10",
];

const PROGRAM_LEVELS = [
  {
    level: "K1–K3",
    name: "AI Fantasy Zoo",
    age: "6–9 tuổi",
    desc: "Khám phá AI qua mô hình động vật, học lập trình cơ bản Blockly",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    img: "https://isavn.edu.vn/upload/1757745207_Screenshot-2024-03-02-160449.png",
  },
  {
    level: "K4–K6",
    name: "AI Smart Life",
    age: "9–12 tuổi",
    desc: "Cảm biến IoT, dự án thùng rác thông minh, khu vườn tự động",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    img: "https://bizmovn.com/wp-content/uploads/2026/01/AI-Smart-Life-1-Sach-hoc-sinh-lop-3.jpg",
  },
  {
    level: "K7–K9",
    name: "AI Transformer",
    age: "12–15 tuổi",
    desc: "Điện tử nâng cao, hệ thống cảnh báo thông minh, robot tấn công",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToplGFOruLs8CUmYn5WJM1U6nlfQT8muFAepZlUo00vg&s=10",
  },
  {
    level: "K10–K12",
    name: "AI Super Engineer",
    age: "15–18 tuổi",
    desc: "Nghiên cứu khoa học AI, dự án nông nghiệp & công nghiệp",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    img: "https://vnsea.edu.vn/wp-content/uploads/2025/08/nganh-robot-va-tri-tue-nhan-tao-3.jpg",
  },
];

const NEWS_ITEMS = [
  {
    title: "UBTECH XUẤT HIỆN TẠI TRIỂN LÃM ĐỔI MỚI SÁNG TẠO VIỆT NAM 2023",
    date: "Tháng 4, 2024",
    excerpt:
      "Cùng nhìn lại những hình ảnh nổi bật tại Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023 và Lễ khánh thành trung tâm NIC Hòa Lạc.",
    image: "https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/NIC-1.jpg",
    slug: "ubtech-xuat-hien-tai-trien-lam-doi-moi-sang-tao-viet-nam-2023",
  },
  {
    title: "UBTECH TRONG NGÀY HỘI GIÁO DỤC STEM",
    date: "Tháng 4, 2024",
    excerpt:
      "Ngày hội giáo dục STEM quận Tân Phú thu hút gần 1.000 học sinh và giáo viên cùng trải nghiệm Robotics và AI.",
    image:
      "https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Picture-2.jpg",
    slug: "ubtech-xuat-hien-trong-ngay-hoi-giao-duc-stem",
  },
  {
    title: "CHUYỂN ĐỔI SỐ CÙNG UBTECH VIỆT NAM",
    date: "Tháng 4, 2024",
    excerpt:
      "Chuyển đổi số đã trở thành xu hướng không thể thiếu. UBTECH đồng hành cùng doanh nghiệp và nhà trường trong hành trình này.",
    image:
      "https://ubtechvietnam.edu.vn/wp-content/uploads/2024/04/Chuong-trinh-chuyen-doi-so.jpg",
    slug: "chuyen-doi-so-cung-ubtech-viet-nam",
  },
];

// Component hàng logo tự scroll
function LogoRow({
  logos,
  direction = 1,
}: {
  logos: typeof PARTNER_LOGOS;
  direction?: 1 | -1;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const animRef = useRef<number>();

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // Hàng ngược: bắt đầu từ giữa để có thể scroll sang trái
    if (direction === -1) el.scrollLeft = el.scrollWidth / 2;
  }, [direction]);

  const scroll = useCallback(() => {
    const el = rowRef.current;
    if (!el || isPaused.current) {
      animRef.current = requestAnimationFrame(scroll);
      return;
    }
    if (direction === 1) {
      el.scrollLeft += 0.7;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    } else {
      el.scrollLeft -= 0.7;
      if (el.scrollLeft <= 0) el.scrollLeft = el.scrollWidth / 2;
    }
    animRef.current = requestAnimationFrame(scroll);
  }, [direction]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(scroll);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [scroll]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
      className="flex items-center gap-5 overflow-x-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {[...logos, ...logos].map((logo, i) => (
        <div
          key={`${logo.id}-${i}`}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex-shrink-0 w-[120px] h-[72px] flex items-center justify-center hover:shadow-md hover:border-[#0057FF]/20 transition-all"
        >
          <img
            src={`https://lh3.googleusercontent.com/d/${logo.id}`}
            alt={logo.name}
            className="max-w-full max-h-full object-contain"
            onError={(e: any) => {
              e.target.parentElement.style.opacity = "0";
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { data: featured = [] } = useQuery({
    queryKey: ["featured"],
    queryFn: fetchFeatured,
  });
  const { data: newest = [] } = useQuery({
    queryKey: ["newest"],
    queryFn: fetchNewest,
  });

  return (
    <div className="bg-white">
      {/* ══ HERO ══ */}
      <HeroApple />

      {/* ══ TRUST BAR ══ */}
      <section className="bg-[#F8FAFF] border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Shield,
              title: "Chính hãng 100%",
              desc: "Phân phối độc quyền UBTECH VN",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: Truck,
              title: "Giao hàng toàn quốc",
              desc: "Miễn phí cho đơn từ 500.000đ",
              color: "bg-green-100 text-green-600",
            },
            {
              icon: Award,
              title: "Bảo hành chính hãng",
              desc: "12 tháng, đổi trả 30 ngày",
              color: "bg-amber-100 text-amber-600",
            },
            {
              icon: HeadphonesIcon,
              title: "Hỗ trợ 24/7",
              desc: "Tư vấn qua Zalo & điện thoại",
              color: "bg-purple-100 text-purple-600",
            },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A1F36]">{f.title}</p>
                <p className="text-xs text-[#6B7280]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ AI EDUCATION ══ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">
              AI & ROBOTIC CHO GIÁO DỤC
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1F36] leading-tight mb-6">
              Chương trình AI & Robotics
              <br />
              <span className="text-[#0057FF]">
                hoàn chỉnh nhất tại Việt Nam
              </span>
            </h2>
            <p className="text-[#6B7280] leading-relaxed mb-7">
              UBTECH cung cấp chương trình về Trí tuệ nhân tạo và Robotics hoàn
              chỉnh phục vụ toàn bộ cấp học từ K1 đến K12.
            </p>
            <ul className="space-y-4 mb-9">
              {[
                "Giáo trình được Bộ Khoa học và Công nghệ chứng nhận",
                "Bộ học cụ uKIT và sách học AI & Robotic từ lớp 1 đến 12",
                "Robot AI từ UBTECH phù hợp theo từng cấp độ",
                "Hỗ trợ tập huấn giáo viên, phần mềm, giáo cụ đầy đủ",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0057FF]" />
                  </div>
                  <span className="text-sm text-[#374151]">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/chuong-trinh-k12"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0057FF] text-white font-bold rounded-xl hover:bg-[#003DA5] transition-all shadow-lg shadow-blue-200"
            >
              Khám phá chương trình học <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://www.teq.com/wp-content/uploads/2025/04/UBTech_feature_reflect_04-25.png"
              alt="Chương trình học AI Robotics UBTECH"
              className="w-full object-cover"
              style={{ maxHeight: 440 }}
            />
          </div>
        </div>
      </section>

      {/* ══ CHƯƠNG TRÌNH K12 ══ */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-3 block">
              CHƯƠNG TRÌNH GIẢNG DẠY
            </span>
            <h2 className="text-3xl font-black text-[#1A1F36]">
              Lộ trình học tập K1–K12
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto text-sm">
              Hệ thống giáo trình được thiết kế khoa học theo từng cấp độ, đảm
              bảo tính liên tục và phù hợp với từng lứa tuổi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAM_LEVELS.map((p) => (
              <Link
                key={p.level}
                href="/chuong-trinh-k12"
                className={`rounded-2xl border-2 ${p.color} hover:shadow-xl transition-all group overflow-hidden`}
              >
                <div
                  className="w-full bg-white flex items-center justify-center"
                  style={{ height: "160px" }}
                >
                  <img
                    src={(p as any).img}
                    alt={p.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${p.badge} mb-3`}
                  >
                    {p.level}
                  </span>
                  <h3 className="font-black text-[#1A1F36] mb-1 group-hover:text-[#0057FF] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-2 font-medium">
                    {p.age}
                  </p>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROBOT THƯƠNG MẠI ══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-3 block">
              ROBOT THƯƠNG MẠI PHỤC VỤ ĐA NGÀNH
            </span>
            <h2 className="text-3xl font-black text-[#1A1F36]">
              Tự hào đi đầu thương mại hóa Robot AI
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto text-sm">
              UBTECH cung cấp giải pháp robot tích hợp AI phục vụ đa lĩnh vực:
              dịch vụ khách hàng, y tế, du lịch.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {COMMERCIAL_SOLUTIONS.map((s) => (
              <div
                key={s.title}
                className="p-7 rounded-2xl bg-gradient-to-br from-[#F8FAFF] to-white border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-[#0057FF]" />
                </div>
                <h3 className="font-black text-[#1A1F36] mb-2">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-black text-[#1A1F36] mb-7 text-center">
            Các dòng Robot nổi bật mang công nghệ AI mới nhất
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_ROBOTS.map((robot) => (
              <Link
                key={robot.slug}
                href={`/san-pham/${robot.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-square bg-[#F5F7FA] overflow-hidden p-4">
                  <img
                    src={robot.image}
                    alt={robot.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-black text-[#1A1F36] group-hover:text-[#0057FF] transition-colors">
                    {robot.name}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">{robot.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTNERS ══ */}
      <section className="bg-[#F8FAFF] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#0057FF] font-semibold mb-3">
              Đã tin dùng
            </p>
            <h2 className="text-2xl font-bold text-[#0A0F1A]">
              Khách hàng & Đối tác
            </h2>
            <p className="text-[#64748B] text-sm mt-2">
              Ứng dụng AI & Robotics từ UBTECH trong thực tế tại Việt Nam
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {/* Hàng 1 — lướt sang phải */}
            <LogoRow logos={ROW1} direction={1} />
            {/* Hàng 2 — lướt sang trái */}
            <LogoRow logos={ROW2} direction={-1} />
          </div>
        </div>
      </section>

      {/* ══ AI CENTER ══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-4 block">
                A.I CENTER
              </span>
              <h2 className="text-3xl font-black text-[#1A1F36] mb-6 leading-tight">
                Trung tâm trải nghiệm
                <br />
                AI & Robotic từ UBTECH
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-7">
                Tập đoàn IPPG – đơn vị chủ quản UBTECH tại Việt Nam – tài trợ
                thành lập các Trung tâm Giáo dục Đào tạo AI (AIC) tại Đại học Đà
                Lạt và Làng Đại Học Quốc Gia TP.HCM.
              </p>
              <Link
                href="/gioi-thieu"
                className="inline-flex items-center gap-2 text-[#0057FF] font-semibold hover:gap-3 transition-all"
              >
                Xem thêm <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {AIC_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`${i === 0 ? "col-span-2" : ""} rounded-2xl overflow-hidden shadow-lg`}
                >
                  <img
                    src={img}
                    alt={`AI Center ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ height: i === 0 ? 220 : 140 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      {featured.length > 0 && (
        <section className="bg-[#F8FAFF] py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-9">
              <div>
                <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">
                  SẢN PHẨM
                </span>
                <h2 className="text-2xl font-black text-[#1A1F36] flex items-center gap-2.5">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  Nổi bật
                </h2>
              </div>
              <Link
                href="/san-pham?featured=true"
                className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline"
              >
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featured.slice(0, 8).map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CƠ SỞ PHÁP LÝ ══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#003DA5] to-[#0057FF] rounded-3xl p-8 lg:p-14 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-blue-100 text-xs font-semibold mb-5 border border-white/20">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Pháp lý minh bạch
                </div>
                <h2 className="text-2xl font-black mb-5 leading-tight">
                  CƠ SỞ PHÁP LÝ ĐỘC QUYỀN PHÂN PHỐI CHÍNH HÃNG UBTECH VIỆT NAM
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed mb-7">
                  Tập đoàn IPPG, thông qua IPPTech, là Nhà Phân Phối Độc Quyền
                  Chính Hãng và Duy Nhất của UBTECH Robotics Corp. tại thị
                  trường Việt Nam từ ngày 9 tháng 9 năm 2019.
                </p>
                <ul className="space-y-3">
                  {[
                    "Giáo trình được Viện KHGD Việt Nam – Bộ GD&ĐT thẩm định",
                    "Chương trình AI được Bộ KH&CN phê duyệt",
                    "Letter of Authorized Distributor từ UBTECH Robotics Corp.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-blue-100"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-2xl shadow-xl bg-white p-4 flex items-center justify-center"
                  style={{ minHeight: "200px" }}
                >
                  <img
                    src="https://ubtechvietnam.edu.vn/img/T2.png"
                    alt="UBTECH Agreement"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "260px" }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "https://ubtechvietnam.edu.vn/img/TD2.png",
                    "https://ubtechvietnam.edu.vn/img/TD1.png",
                    "https://ubtechvietnam.edu.vn/img/TD3.png",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="rounded-xl shadow-lg bg-white p-3 flex items-center justify-center"
                      style={{ minHeight: "130px" }}
                    >
                      <img
                        src={src}
                        alt={`Chứng nhận ${i + 1}`}
                        className="w-full h-auto object-contain"
                        style={{ maxHeight: "170px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEWEST PRODUCTS ══ */}
      <section className="bg-[#F8FAFF] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-9">
            <div>
              <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">
                MỚI NHẤT
              </span>
              <h2 className="text-2xl font-black text-[#1A1F36] flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-[#0057FF]" />
                Hàng mới về
              </h2>
            </div>
            <Link
              href="/san-pham?sort=newest"
              className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline"
            >
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {newest.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIN TỨC ══ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-9">
            <div>
              <span className="text-[11px] font-bold text-[#0057FF] uppercase tracking-[0.2em] mb-2 block">
                TIN TỨC
              </span>
              <h2 className="text-2xl font-black text-[#1A1F36]">
                Tin tức về AI & Robotics
              </h2>
              <p className="text-[#6B7280] text-sm mt-1.5">
                Cập nhật thông tin mới nhất từ UBTECH Việt Nam.
              </p>
            </div>
            <Link
              href="/tin-tuc"
              className="flex items-center gap-1 text-sm text-[#0057FF] font-semibold hover:underline"
            >
              Xem thêm <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            {NEWS_ITEMS.map((news) => (
              <Link
                key={news.slug}
                href={`/tin-tuc/${news.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-[#9CA3AF] mb-2.5 font-medium">
                    {news.date}
                  </p>
                  <h3 className="font-bold text-[#1A1F36] line-clamp-2 group-hover:text-[#0057FF] transition-colors leading-snug mb-3">
                    {news.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <span className="text-xs text-[#0057FF] font-semibold mt-4 flex items-center gap-1">
                    Đọc thêm <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ZALO ══ */}
      <section className="bg-gradient-to-r from-[#001F6B] via-[#003DA5] to-[#0057FF] py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white mb-5">
            Cần tư vấn chuyên sâu?
          </h3>
          <p className="text-blue-200 mb-10 leading-relaxed text-lg">
            Đội ngũ chuyên gia UBTECH Việt Nam sẵn sàng hỗ trợ bạn lựa chọn sản
            phẩm phù hợp nhất cho trường học, trung tâm hoặc gia đình.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://zalo.me/${ZALO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#003DA5] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl text-base"
            >
              <MessageSquare className="w-5 h-5" />
              Chat Zalo ngay
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-base"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
