'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Loader2,
  Package,
  ArrowLeft,
  Phone,
  CalendarDays,
  MessageSquare,
  Users,
  Cpu,
  Layers,
  CheckCircle2,
  ChevronLeft,
  Building2,
  GraduationCap,
  School,
  Zap,
  ArrowRight,
  Mail,
} from 'lucide-react';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';

// ─── Data fetchers (unchanged logic) ───────────────────────────────────────────
const fetchProduct = (slug: string) => api.get(`/products/${slug}`).then(r => r.data.data);
const fetchRelated = (slug: string) =>
  api.get(`/products/${slug}/related`).then(r => r.data.data);

// ─── Static UI data ─────────────────────────────────────────────────────────────
const TARGET_AUDIENCES = [
  { icon: School,        label: 'K12',        desc: 'Trường tiểu học, THCS, THPT' },
  { icon: GraduationCap, label: 'Đại học',     desc: 'AI Lab, AI Center, Nghiên cứu' },
  { icon: Building2,     label: 'Doanh nghiệp', desc: 'Triển khai & tự động hóa' },
];

const CTA_BUTTONS = [
  {
    icon: Phone,
    label: 'Nhận tư vấn thiết bị',
    sub: 'Miễn phí · Phản hồi trong 24h',
    href: '/lien-he',
    primary: true,
  },
  {
    icon: CalendarDays,
    label: 'Đặt lịch demo',
    sub: 'Trực tiếp hoặc online',
    href: '/lien-he?type=demo',
    primary: false,
  },
  {
    icon: MessageSquare,
    label: 'Trao đổi giải pháp',
    sub: 'Zalo / Email / Gặp trực tiếp',
    href: `https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || '0973212834'}`,
    primary: false,
    external: true,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────────

/** Skeleton loader */
function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse space-y-10">
      <div className="h-4 w-64 bg-gray-100 rounded-full" />
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="aspect-[4/3] rounded-3xl bg-gray-100" />
        <div className="space-y-6">
          <div className="h-3 w-24 bg-gray-100 rounded-full" />
          <div className="h-8 w-3/4 bg-gray-100 rounded-xl" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded-full" />
            <div className="h-3 bg-gray-100 rounded-full w-5/6" />
            <div className="h-3 bg-gray-100 rounded-full w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Empty / not-found state */
function NotFoundState({ related }: { related: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      {/* Illustration */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-[#EEF3FF] to-[#E0E9FF] mb-8 shadow-inner">
          <Package className="w-14 h-14 text-[#0057FF]/40" />
        </div>
        <h1 className="text-3xl font-black text-[#1A1F36] mb-4 tracking-tight">
          Không tìm thấy thiết bị
        </h1>
        <p className="text-[#6B7280] max-w-md mx-auto leading-relaxed">
          Thiết bị bạn đang tìm có thể đã được cập nhật hoặc chưa có trên hệ thống.
          Vui lòng xem catalogue đầy đủ hoặc liên hệ để được tư vấn trực tiếp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0057FF] text-white font-semibold text-sm hover:bg-[#003DC2] transition-colors shadow-lg shadow-[#0057FF]/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Xem toàn bộ catalogue
          </Link>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-[#E4E8EF] text-[#1A1F36] font-semibold text-sm hover:border-[#0057FF] hover:text-[#0057FF] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Liên hệ tư vấn
          </Link>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-[#1A1F36]">Thiết bị gợi ý</h2>
            <Link href="/san-pham" className="text-sm text-[#0057FF] font-medium hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.slice(0, 4).map((p: any) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/** Image gallery */
function ImageGallery({ images, name }: { images: any[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#F5F7FA] to-[#EEF3FF] overflow-hidden border border-[#E4E8EF]/60 shadow-lg shadow-black/5">
        {images[idx]?.url ? (
          <Image
    src={images[idx].url}
    alt={`${name} - ảnh ${idx + 1}`}
    fill
    className="object-contain p-4 transition-opacity duration-300"
    unoptimized
    priority
  />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#E4E8EF] flex items-center justify-center">
              <Package className="w-10 h-10 text-[#9CA3AF]" />
            </div>
            <p className="text-xs text-[#9CA3AF] font-medium">Đang cập nhật hình ảnh</p>
          </div>
        )}

        {/* Navigation arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center border border-white/50 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#1A1F36]" />
            </button>
            <button
              onClick={next}
              aria-label="Ảnh tiếp"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center border border-white/50 hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#1A1F36]" />
            </button>
            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Ảnh ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-200',
                    i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img: any, i: number) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              className={cn(
                'relative w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all bg-white',
                i === idx
                  ? 'border-[#0057FF] shadow-sm shadow-[#0057FF]/20'
                  : 'border-[#E4E8EF] hover:border-[#0057FF]/40'
              )}
            >
              {img.url ? (
                <Image src={img.url} alt="" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#C4C9D4]" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────────
export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSpec, setActiveSpec] = useState<'features' | 'spec'>('features');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  });

  const { data: related = [] } = useQuery({
    queryKey: ['related', slug],
    queryFn: () => fetchRelated(slug),
    enabled: !!slug,
  });

  // ── Loading state ──
  if (isLoading) return <PageSkeleton />;

  // ── Not found state ──
  if (!product) return <NotFoundState related={related} />;

  const images = product.images?.length ? product.images : [];
  const hasAttributes = product.attributes?.length > 0;

  // Parse use cases and features from description / tags if present
  // We'll gracefully show whatever data exists
  const useCaseTags = (product.tags || []).filter(
    (t: string) => !['mới', 'nổi bật', 'hot'].includes(t.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#F0F3F8]">
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-1.5 text-xs text-[#9CA3AF]"
        >
          <Link href="/" className="hover:text-[#0057FF] transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/san-pham" className="hover:text-[#0057FF] transition-colors">Catalogue</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/san-pham?category=${product.category.slug}`}
                className="hover:text-[#0057FF] transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1F36] font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── HERO SECTION ────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Gallery */}
          <ImageGallery images={images} name={product.name} />

          {/* Info panel */}
          <div className="space-y-8">

            {/* Brand + category badge */}
            <div className="flex flex-wrap gap-2">
              {product.brand && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0057FF]/8 text-[#0057FF] text-xs font-bold uppercase tracking-wider border border-[#0057FF]/15">
                  <Zap className="w-3 h-3" />
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F7FA] text-[#6B7280] text-xs font-semibold border border-[#E4E8EF]">
                  <Layers className="w-3 h-3" />
                  {product.category.name}
                </span>
              )}
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold border border-amber-200/60">
                  Nổi bật
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#1A1F36] leading-tight tracking-tight">
                {product.name}
              </h1>
              {product.shortDesc && (
                <p className="mt-3 text-[#6B7280] leading-relaxed text-base">
                  {product.shortDesc}
                </p>
              )}
            </div>

            {/* Target audience */}
            <div>
              <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Đối tượng sử dụng
              </p>
              <div className="flex flex-wrap gap-2">
                {TARGET_AUDIENCES.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5F7FA] border border-[#E4E8EF] hover:border-[#0057FF]/30 hover:bg-[#EEF3FF] transition-all duration-200 cursor-default group"
                  >
                    <Icon className="w-4 h-4 text-[#0057FF] flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#1A1F36]">{label}</p>
                      <p className="text-[10px] text-[#9CA3AF] hidden sm:block">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key highlights from attributes */}
            {hasAttributes && (
              <div>
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  Điểm nổi bật
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.attributes.slice(0, 4).map((a: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E4E8EF] hover:border-[#0057FF]/25 hover:shadow-sm transition-all duration-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0057FF] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide truncate">{a.key}</p>
                        <p className="text-sm font-semibold text-[#1A1F36] truncate">{a.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Use case tags */}
            {useCaseTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {useCaseTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-[#F5F7FA] text-[#6B7280] rounded-full border border-[#E4E8EF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA block — desktop */}
            <div className="hidden sm:block space-y-3 pt-2">
              {CTA_BUTTONS.map(btn => {
                const Icon = btn.icon;
                const El = btn.external ? 'a' : Link;
                const props = btn.external
                  ? { href: btn.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: btn.href };
                return (
                  <El
                    key={btn.label}
                    {...(props as any)}
                    className={cn(
                      'flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200 group',
                      btn.primary
                        ? 'bg-[#0057FF] border-[#0057FF] text-white hover:bg-[#003DC2] hover:border-[#003DC2] shadow-lg shadow-[#0057FF]/20 hover:shadow-xl hover:shadow-[#0057FF]/25'
                        : 'bg-white border-[#E4E8EF] text-[#1A1F36] hover:border-[#0057FF] hover:text-[#0057FF]'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                      btn.primary ? 'bg-white/15' : 'bg-[#F5F7FA] group-hover:bg-[#EEF3FF]'
                    )}>
                      <Icon className={cn('w-5 h-5', btn.primary ? 'text-white' : 'text-[#0057FF]')} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={cn('font-bold text-sm', btn.primary ? 'text-white' : 'text-[#1A1F36] group-hover:text-[#0057FF]')}>
                        {btn.label}
                      </p>
                      <p className={cn('text-xs mt-0.5', btn.primary ? 'text-white/70' : 'text-[#9CA3AF]')}>
                        {btn.sub}
                      </p>
                    </div>
                    <ArrowRight className={cn('w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform', btn.primary ? 'text-white' : '')} />
                  </El>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── OVERVIEW SECTION ────────────────────────────────────────────── */}
        {(product.description || product.shortDesc) && (
          <section className="py-12 border-t border-[#F0F3F8]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 bg-[#0057FF] rounded-full" />
                <h2 className="text-2xl font-black text-[#1A1F36] tracking-tight">Tổng quan</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-[#374151] leading-relaxed text-base whitespace-pre-wrap">
                  {product.description || product.shortDesc}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── USE CASES SECTION ───────────────────────────────────────────── */}
        <section className="py-12 border-t border-[#F0F3F8]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-7 bg-[#0057FF] rounded-full" />
            <h2 className="text-2xl font-black text-[#1A1F36] tracking-tight">Ứng dụng thực tế</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: School,
                title: 'Giáo dục K12',
                color: 'from-blue-50 to-indigo-50',
                border: 'border-blue-100',
                iconColor: 'text-blue-600',
                items: [
                  'Phòng STEM & Robotics',
                  'Tiết học AI tương tác',
                  'Cuộc thi lập trình robot',
                  'Phát triển tư duy logic',
                ],
              },
              {
                icon: GraduationCap,
                title: 'Đại học & Nghiên cứu',
                color: 'from-violet-50 to-purple-50',
                border: 'border-violet-100',
                iconColor: 'text-violet-600',
                items: [
                  'AI Lab & AI Center',
                  'Nghiên cứu & phát triển',
                  'Demo công nghệ',
                  'Đào tạo kỹ sư AI',
                ],
              },
              {
                icon: Building2,
                title: 'Doanh nghiệp',
                color: 'from-emerald-50 to-teal-50',
                border: 'border-emerald-100',
                iconColor: 'text-emerald-600',
                items: [
                  'Tự động hóa dây chuyền',
                  'Robot tiếp tân & hướng dẫn',
                  'Triển lãm & giới thiệu',
                  'Giải pháp tùy chỉnh',
                ],
              },
            ].map(col => {
              const Icon = col.icon;
              return (
                <div
                  key={col.title}
                  className={cn(
                    'rounded-2xl bg-gradient-to-br p-6 border',
                    col.color, col.border
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm', col.iconColor)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#1A1F36] mb-3">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#374151]">
                        <CheckCircle2 className="w-4 h-4 text-[#0057FF] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FEATURES + SPECS TABS ───────────────────────────────────────── */}
        {hasAttributes && (
          <section className="py-12 border-t border-[#F0F3F8]">
            {/* Tab switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#F5F7FA] rounded-2xl w-fit mb-8">
              {[
                { key: 'features', label: 'Tính năng chính', icon: Zap },
                { key: 'spec',     label: 'Thông số kỹ thuật', icon: Cpu },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveSpec(t.key as any)}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                      activeSpec === t.key
                        ? 'bg-white text-[#1A1F36] shadow-sm'
                        : 'text-[#6B7280] hover:text-[#1A1F36]'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Features panel */}
            {activeSpec === 'features' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.attributes.map((a: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-[#E4E8EF] hover:border-[#0057FF]/25 hover:shadow-md hover:shadow-[#0057FF]/5 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#0057FF]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{a.key}</p>
                      <p className="text-sm font-semibold text-[#1A1F36] leading-snug">{a.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Spec table panel */}
            {activeSpec === 'spec' && (
              <div className="rounded-2xl border border-[#E4E8EF] overflow-hidden">
                {product.attributes.map((a: any, i: number) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center justify-between px-6 py-4 gap-6',
                      i % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'
                    )}
                  >
                    <span className="text-sm text-[#6B7280] font-medium min-w-[140px]">{a.key}</span>
                    <span className="text-sm font-semibold text-[#1A1F36] text-right">{a.value}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
        <section className="py-12 border-t border-[#F0F3F8]">
          <div className="rounded-3xl bg-gradient-to-br from-[#0057FF] via-[#0041CC] to-[#002EA8] p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative lg:flex items-center justify-between gap-10">
              <div className="mb-8 lg:mb-0">
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Bắt đầu ngay hôm nay</p>
                <h2 className="text-2xl lg:text-3xl font-black leading-tight mb-3">
                  Khám phá {product.name}<br className="hidden lg:block" /> cho tổ chức của bạn
                </h2>
                <p className="text-white/70 text-sm max-w-md leading-relaxed">
                  Đội ngũ chuyên gia UBTECH Việt Nam sẵn sàng tư vấn giải pháp phù hợp với K12, Đại học và Doanh nghiệp.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#0057FF] font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Nhận tư vấn ngay
                </Link>
                <Link
                  href="/lien-he?type=demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-white/25 text-white font-bold text-sm hover:bg-white/10 hover:border-white/40 transition-colors"
                >
                  <CalendarDays className="w-4 h-4" />
                  Đặt lịch demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PRODUCTS ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-12 border-t border-[#F0F3F8]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-[#0057FF] rounded-full" />
                <h2 className="text-2xl font-black text-[#1A1F36] tracking-tight">Thiết bị liên quan</h2>
              </div>
              <Link
                href="/san-pham"
                className="flex items-center gap-1.5 text-sm font-medium text-[#0057FF] hover:underline"
              >
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.slice(0, 4).map((p: any) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom spacer */}
        <div className="h-16" />
      </div>

      {/* ── STICKY MOBILE CTA ───────────────────────────────────────────────
           Only visible on mobile (sm:hidden), fixed to bottom               */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E4E8EF] px-4 py-3 safe-area-inset-bottom shadow-xl shadow-black/10">
        <div className="flex gap-2.5">
          <a
            href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || '0973212834'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-[#0057FF] text-[#0057FF] font-bold text-xs hover:bg-[#EEF3FF] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Trao đổi
          </a>
          <Link
            href="/lien-he?type=demo"
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-[#E4E8EF] text-[#1A1F36] font-bold text-xs hover:border-[#0057FF] hover:text-[#0057FF] transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            Đặt demo
          </Link>
          <Link
            href="/lien-he"
            className="flex-[1.5] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#0057FF] text-white font-bold text-xs hover:bg-[#003DC2] transition-colors shadow-lg shadow-[#0057FF]/25"
          >
            <Phone className="w-4 h-4" />
            Nhận tư vấn
          </Link>
        </div>
      </div>
    </div>
  );
}