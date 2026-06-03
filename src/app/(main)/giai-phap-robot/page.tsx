
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Cpu,
  Building2,
  Wrench,
  ChevronRight,
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'dich-vu',
    title: 'Robot Dịch Vụ Thương Mại',
    subtitle: 'Tự động hóa — Dịch vụ — Y tế',
    icon: Building2,
    gradient: 'from-blue-600 to-blue-800',
    products: [
      {
        name: 'ADIBOT',
        slug: 'adibot',
        img: 'https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz',
        tag: 'Khử khuẩn',
        tc: 'bg-red-100 text-red-700',
        desc: 'Robot tự hành UV-C, 99.9% hiệu quả. Bệnh viện, khách sạn, văn phòng.',
      },
      {
        name: 'CRUZR',
        slug: 'cruzr',
        img: 'https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew',
        tag: 'Dịch vụ',
        tc: 'bg-blue-100 text-blue-700',
        desc: 'Robot hình người tương tác khách hàng. Ngân hàng, bệnh viện, sân bay.',
      },
      {
        name: 'CADEBOT L100',
        slug: 'cadebot',
        img: 'https://lh3.googleusercontent.com/d/1K5Tue2ITNasEiUJr2EM0HEueqvkToP9A',
        tag: 'Giao hàng',
        tc: 'bg-green-100 text-green-700',
        desc: 'Robot giao hàng tự động. Nhà hàng, khách sạn, siêu thị.',
      },
    ],
  },
  {
    id: 'giao-duc',
    title: 'Robot Giáo Dục & Nghiên Cứu',
    subtitle: 'AI — Humanoid — Lập trình',
    icon: Cpu,
    gradient: 'from-indigo-600 to-purple-700',
    products: [
      {
        name: 'ALPHA 1E',
        slug: 'alpha-1e',
        img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/03/Alpha1E_01.jpg',
        tag: 'Giáo dục',
        tc: 'bg-teal-100 text-teal-700',
        desc: 'Robot hình người 16 servo, Blockly & Python. STEM K-12.',
      },
      {
        name: 'ALPHA MINI',
        slug: 'alpha-mini',
        img: 'https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-',
        tag: 'Giáo dục',
        tc: 'bg-teal-100 text-teal-700',
        desc: 'Robot mini 14 servo, camera HD 13MP, nhận diện khuôn mặt.',
      },
      {
        name: 'YANSHEE',
        slug: 'yanshee',
        img: 'https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L',
        tag: 'Nâng cao',
        tc: 'bg-purple-100 text-purple-700',
        desc: 'Robot humanoid 17 servo, Python/C/Blockly/Scratch/Java.',
      },
      {
        name: 'AI UGOT',
        slug: 'ai-ugot',
        img: 'https://lh3.googleusercontent.com/d/17-nzBOR9sO5C7wtX3TQLTj0nFGD6VwQm',
        tag: 'Mô-đun AI',
        tc: 'bg-orange-100 text-orange-700',
        desc: 'Robot mô-đun 7+ hình dạng, Blockly và Python.',
      },
      {
        name: 'WALKER S1',
        slug: 'walker-s1',
        img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/WalkerS1_01.jpg',
        tag: 'Humanoid Pro',
        tc: 'bg-slate-100 text-slate-700',
        desc: 'Humanoid 36 DoF, U-SLAM 3D, dây chuyền sản xuất EV.',
      },
      {
        name: 'WALKER E',
        slug: 'walker-e',
        img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/04/WalkerE_01.jpg',
        tag: 'Humanoid',
        tc: 'bg-indigo-100 text-indigo-700',
        desc: 'Humanoid thế hệ mới, nhận diện cảm xúc, dịch vụ cao cấp.',
      },
    ],
  },
  {
    id: 'jimu',
    title: 'Bộ Kit Robot JIMU',
    subtitle: 'Lắp ráp — Sáng tạo — STEM',
    icon: Wrench,
    gradient: 'from-orange-500 to-red-600',
    products: [
      {
        name: 'ASTROBOT KIT',
        slug: 'astrobot-kit',
        img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/03/Astrobot_01.jpg',
        tag: 'Vũ trụ',
        tc: 'bg-sky-100 text-sky-700',
        desc: 'Robot phi hành gia, cảm biến con quay, Blockly & Python. 300+ linh kiện.',
      },
      {
        name: 'COURTBOT KIT',
        slug: 'courtbot-kit',
        img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/03/Courtbot_01.jpg',
        tag: 'Bóng rổ',
        tc: 'bg-orange-100 text-orange-700',
        desc: 'Robot bóng rổ, 200+ linh kiện, vật lý + toán học + lập trình.',
      },
      {
        name: 'SCOREBOT KIT',
        slug: 'scorebot-kit',
        img: 'https://lh3.googleusercontent.com/d/1kbjVT3GT8MnD6KA7vJJJYsZ07l-bI1AE',
        tag: 'Bóng đá',
        tc: 'bg-green-100 text-green-700',
        desc: 'Robot bóng đá Manchester City FC. 261 linh kiện.',
      },
      {
        name: 'TRACKBOT KIT',
        slug: 'trackbot-kit',
        img: 'https://lh3.googleusercontent.com/d/1fTAP4QJNJx7hj5ajuTTCNRxlU9WGDxsQ',
        tag: 'Địa hình',
        tc: 'bg-yellow-100 text-yellow-700',
        desc: 'GrabberBot & DiggerBot, động cơ cao tốc, LED đa màu.',
      },
      {
        name: 'UNICORNBOT KIT',
        slug: 'unicornbot-kit',
        img: 'https://lh3.googleusercontent.com/d/1hOwSthB6t45QUEgFvVuybhOlB_UvfKXk',
        tag: 'Kỳ lân',
        tc: 'bg-pink-100 text-pink-700',
        desc: 'Robot kỳ lân Series Thần Thoại, cảm biến màu sắc, servo mượt.',
      },
    ],
  },
];

export default function GiaiPhapRobotPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#050E2B] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle,#0057FF 0%,transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/6 text-[11px] font-semibold text-blue-300 uppercase tracking-[0.18em] mb-6">
            <Cpu className="w-3.5 h-3.5" />
            Danh mục giải pháp AI & Robotics
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white mb-5">
            Giải Pháp Robot
          </h1>

          <p className="text-[16px] text-blue-200/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Hệ sinh thái robot UBTECH dành cho giáo dục, nghiên cứu,
            doanh nghiệp và tự động hóa dịch vụ hiện đại.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-5 py-2.5 rounded-full bg-white/8 border border-white/15 text-white text-[13px] font-semibold hover:bg-white/15 transition-all"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {SECTIONS.map((sec) => (
          <section key={sec.id} id={sec.id}>
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sec.gradient} flex items-center justify-center shadow-lg`}
                >
                  <sec.icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-[#050E2B]">
                    {sec.title}
                  </h2>

                  <p className="text-[13px] text-[#6B7280] mt-0.5">
                    {sec.subtitle}
                  </p>
                </div>
              </div>

              <Link
                href="/san-pham"
                className="hidden sm:flex items-center gap-1.5 text-[13px] text-[#0057FF] font-semibold hover:gap-2.5 transition-all"
              >
                Xem tất cả <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sec.products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/san-pham/${p.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 hover:border-[#0057FF]/20"
                >
                  <div className="bg-[#F8F9FA] h-[220px] flex items-center justify-center overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.15';
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.tc}`}
                    >
                      {p.tag}
                    </span>

                    <h3 className="font-black text-[#050E2B] text-base mt-2 mb-1">
                      {p.name}
                    </h3>

                    <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                      {p.desc}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[12px] text-[#6B7280] font-medium">
                        Giải pháp AI & Robotics
                      </span>

                      <span className="text-[12px] text-[#0057FF] font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Nhận tư vấn{' '}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-[#050E2B] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Cần tư vấn giải pháp robot?
          </h2>

          <p className="text-[15px] text-blue-200/70 mb-8">
            Đội ngũ UBTECH Việt Nam sẵn sàng hỗ trợ bạn lựa chọn giải
            pháp phù hợp nhất cho giáo dục, doanh nghiệp và nghiên cứu.
          </p>

          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#0048d4] transition-all text-[15px]"
          >
            Liên hệ tư vấn <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}