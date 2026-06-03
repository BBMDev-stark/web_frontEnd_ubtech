// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Star, Loader2, Eye, Zap, Package, Check } from 'lucide-react';
// import { useState } from 'react';
// import { cn, formatPrice, getDisplayPrice, getProductImage } from '@/lib/utils';
// import { useCartStore } from '@/store/cart.store';
// import { useAuthStore } from '@/store/auth.store';
// import { useRouter } from 'next/navigation';

// interface Product {
//   _id: string; name: string; slug: string;
//   images?: { url: string; isPrimary: boolean }[];
//   basePrice?: number; salePrice?: number;
//   ratingAvg?: number; ratingCount?: number; soldCount?: number;
//   brand?: string; tags?: string[];
//   variants?: { _id: string; name: string; price: number; salePrice?: number; isActive?: boolean }[];
//   isFeatured?: boolean;
//   category?: { name: string; slug: string };
// }

// export default function ProductCard({ product, view = 'grid' }: { product: Product; view?: 'grid' | 'list' }) {
//   const router = useRouter();
//   const { user } = useAuthStore();
//   const { addToCart } = useCartStore();
//   const [adding, setAdding] = useState(false);
//   const [addedOk, setAddedOk] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   const image = getProductImage(product.images);
//   const priceInfo = getDisplayPrice(product);
//   const hasDiscount = product.salePrice && product.basePrice && product.salePrice < product.basePrice;
//   const discountPct = hasDiscount ? Math.round((1 - product.salePrice! / product.basePrice!) * 100) : 0;
//   const hasVariants = product.variants && product.variants.length > 0;
//   const isBook = product.category?.slug === 'sach' || (product.tags ?? []).includes('sách');

//   const handleCart = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!user) { router.push('/dang-nhap'); return; }
//     if (hasVariants) { router.push(`/san-pham/${product.slug}`); return; }
//     setAdding(true);
//     try {
//       await addToCart(product._id);
//       setAddedOk(true);
//       setTimeout(() => setAddedOk(false), 2000);
//     } finally { setAdding(false); }
//   };

//   if (view === 'list') {
//     return (
//       <Link href={`/san-pham/${product.slug}`}
//         className="group flex gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-[0_4px_24px_rgba(0,87,255,0.10)] transition-all duration-300">
//         <div className="relative w-32 h-32 rounded-xl bg-gradient-to-br from-[#F0F5FF] to-[#E8EFFF] overflow-hidden flex-shrink-0 shadow-sm">
//           {!imgError && image !== '/placeholder-product.png' ? (
//             <Image src={image} alt={product.name} fill
//               className={cn('transition-transform duration-500 group-hover:scale-110',
//                 isBook ? 'object-cover' : 'object-contain p-2')}
//               unoptimized onError={() => setImgError(true)} />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <Package className="w-10 h-10 text-blue-200" />
//             </div>
//           )}
//           {discountPct > 0 && (
//             <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-red-400 text-white text-[10px] font-bold rounded-md shadow">
//               -{discountPct}%
//             </span>
//           )}
//         </div>
//         <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
//           <div>
//             {product.brand && (
//               <p className="text-[10px] text-[#0057FF] font-bold uppercase tracking-widest mb-1">{product.brand}</p>
//             )}
//             <h3 className="text-sm font-semibold text-[#1A1F36] line-clamp-2 group-hover:text-[#0057FF] transition-colors leading-snug">
//               {product.name}
//             </h3>
//             {(product.ratingCount ?? 0) > 0 && (
//               <div className="flex items-center gap-1 mt-1.5">
//                 <div className="flex">
//                   {[1,2,3,4,5].map(i => (
//                     <Star key={i} className={`w-3 h-3 ${i <= Math.round(product.ratingAvg!) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
//                   ))}
//                 </div>
//                 <span className="text-xs text-gray-400">({product.ratingCount})</span>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center justify-between mt-2">
//             <div>
//               <p className="text-[#0057FF] font-bold text-base leading-tight">
//                 {priceInfo.isRange ? `${formatPrice(priceInfo.min)} – ${formatPrice(priceInfo.max)}` : formatPrice(priceInfo.min)}
//               </p>
//               {hasDiscount && <p className="text-xs text-gray-400 line-through">{formatPrice(product.basePrice!)}</p>}
//               {(product.soldCount ?? 0) > 0 && (
//                 <p className="text-[10px] text-gray-400 mt-0.5">Đã bán {product.soldCount!.toLocaleString('vi-VN')}</p>
//               )}
//             </div>
//             <button onClick={handleCart} disabled={adding || addedOk}
//               className={cn(
//                 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all duration-200 active:scale-95',
//                 addedOk ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-[#0057FF] to-[#0041CC] text-white hover:shadow-[0_4px_16px_rgba(0,87,255,0.35)] hover:-translate-y-0.5',
//                 'disabled:opacity-70 disabled:cursor-not-allowed'
//               )}>
//               {adding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : addedOk ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
//               {addedOk ? 'Đã thêm' : 'Thêm vào giỏ'}
//             </button>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   return (
//     <Link href={`/san-pham/${product.slug}`}
//       className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200/70 hover:shadow-[0_12px_40px_rgba(0,87,255,0.13)] transition-all duration-350 flex flex-col cursor-pointer">

//       {/* Image */}
//       <div className={cn(
//         'relative overflow-hidden bg-gradient-to-br from-[#F4F7FF] to-[#EBF0FF]',
//         isBook ? 'aspect-[3/4]' : 'aspect-square'
//       )}>
//         {!imgError && image !== '/placeholder-product.png' ? (
//           <Image src={image} alt={product.name} fill
//             className={cn(
//               'transition-all duration-500 ease-out',
//               isBook ? 'object-cover group-hover:scale-105' : 'object-contain p-4 group-hover:scale-110'
//             )}
//             unoptimized onError={() => setImgError(true)} />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center gap-2">
//             <Package className="w-12 h-12 text-blue-200" />
//             <span className="text-xs text-gray-300 font-medium px-2 text-center line-clamp-2">{product.name}</span>
//           </div>
//         )}

//         {/* Hover overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
//           {discountPct > 0 && (
//             <span className="flex items-center gap-0.5 px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-lg shadow-md">
//               <Zap className="w-2.5 h-2.5" /> -{discountPct}%
//             </span>
//           )}
//           {product.isFeatured && !discountPct && (
//             <span className="px-2 py-0.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white text-[10px] font-bold rounded-lg shadow-md">
//               Nổi bật
//             </span>
//           )}
//         </div>

//         {/* Quick view icon */}
//         <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
//           <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/50">
//             <Eye className="w-3.5 h-3.5 text-[#0057FF]" />
//           </div>
//         </div>

//         {/* Add to cart button */}
//         <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
//           <button onClick={handleCart} disabled={adding || addedOk}
//             className={cn(
//               'w-full py-3 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99]',
//               addedOk ? 'bg-green-500' : 'bg-gradient-to-r from-[#0057FF] to-[#003DA5] hover:from-[#003DA5] hover:to-[#002E8A]'
//             )}>
//             {adding ? <Loader2 className="w-4 h-4 animate-spin" />
//               : addedOk ? <><Check className="w-4 h-4" /> Đã thêm vào giỏ</>
//               : <><ShoppingCart className="w-4 h-4" /> {hasVariants ? 'Chọn phiên bản' : 'Thêm vào giỏ'}</>}
//           </button>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-3.5 flex flex-col flex-1 gap-1.5">
//         {product.brand && (
//           <p className="text-[9px] text-[#0057FF] font-bold uppercase tracking-[0.12em] opacity-75">{product.brand}</p>
//         )}
//         <h3 className="text-[13px] font-semibold text-[#1A1F36] line-clamp-2 leading-snug group-hover:text-[#0057FF] transition-colors duration-200">
//           {product.name}
//         </h3>
//         {(product.ratingCount ?? 0) > 0 && (
//           <div className="flex items-center gap-1.5">
//             <div className="flex items-center">
//               {[1,2,3,4,5].map(i => (
//                 <Star key={i} className={cn('w-2.5 h-2.5', i <= Math.round(product.ratingAvg!) ? 'fill-amber-400 text-amber-400' : 'text-gray-200')} />
//               ))}
//             </div>
//             <span className="text-[10px] text-gray-400">({product.ratingCount})</span>
//           </div>
//         )}
//         <div className="mt-auto pt-2 border-t border-gray-50">
//           <div className="flex items-end justify-between gap-1">
//             <div>
//               <p className="text-[#0057FF] font-black text-[13px] leading-tight">
//                 {priceInfo.isRange ? `Từ ${formatPrice(priceInfo.min)}` : formatPrice(priceInfo.min)}
//               </p>
//               {hasDiscount && (
//                 <p className="text-[10px] text-gray-400 line-through leading-tight">{formatPrice(product.basePrice!)}</p>
//               )}
//             </div>
//             {(product.soldCount ?? 0) > 0 && (
//               <p className="text-[10px] text-gray-400 whitespace-nowrap">
//                 Đã bán {product.soldCount! >= 1000 ? `${(product.soldCount! / 1000).toFixed(1)}k` : product.soldCount!.toLocaleString('vi-VN')}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Eye, ArrowRight, GraduationCap, Building2, School } from 'lucide-react';
import { useState } from 'react';
import { cn, getProductImage } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  _id: string;
  name: string;
  slug: string;
  images?: { url: string; isPrimary: boolean }[];
  basePrice?: number;
  salePrice?: number;
  ratingAvg?: number;
  ratingCount?: number;
  soldCount?: number;
  brand?: string;
  tags?: string[];
  variants?: { _id: string; name: string; price: number; salePrice?: number; isActive?: boolean }[];
  isFeatured?: boolean;
  category?: { name: string; slug: string };
  shortDescription?: string;
}

// ─── Audience Badge Logic ─────────────────────────────────────────────────────

type AudienceKey = 'k12' | 'daihoc' | 'doanhnghiep';

interface AudienceBadge {
  label: string;
  icon: React.ElementType;
  className: string;
}

const AUDIENCE_MAP: Record<AudienceKey, AudienceBadge> = {
  k12: {
    label: 'K12',
    icon: School,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
  daihoc: {
    label: 'Đại học',
    icon: GraduationCap,
    className: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
  doanhnghiep: {
    label: 'Doanh nghiệp',
    icon: Building2,
    className: 'bg-slate-100 text-slate-700 border-slate-200/80',
  },
};

const AUDIENCE_KEYWORDS: { key: AudienceKey; terms: string[] }[] = [
  { key: 'k12',        terms: ['k12', 'tiểu học', 'thpt', 'thcs', 'phổ thông', 'stem', 'học sinh'] },
  { key: 'daihoc',     terms: ['đại học', 'đh', 'ai lab', 'ai center', 'sinh viên', 'university'] },
  { key: 'doanhnghiep', terms: ['doanh nghiệp', 'enterprise', 'công ty', 'business', 'robot công nghiệp'] },
];

function resolveAudience(product: Product): AudienceBadge | null {
  const haystack = [
    ...(product.tags ?? []),
    product.category?.name ?? '',
    product.brand ?? '',
  ]
    .join(' ')
    .toLowerCase();

  for (const { key, terms } of AUDIENCE_KEYWORDS) {
    if (terms.some((t) => haystack.includes(t))) return AUDIENCE_MAP[key];
  }
  // Fallback: if product is featured assume enterprise-grade
  if (product.isFeatured) return AUDIENCE_MAP['doanhnghiep'];
  return null;
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function AudiencePill({ badge }: { badge: AudienceBadge }) {
  const Icon = badge.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wide',
        badge.className,
      )}
    >
      <Icon className="w-3 h-3 shrink-0" />
      {badge.label}
    </span>
  );
}

function ImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 select-none">
      <Package className="w-10 h-10 text-slate-300" />
      <span className="text-[11px] text-slate-300 font-medium px-4 text-center line-clamp-2 leading-snug">
        {name}
      </span>
    </div>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────

function ProductCardList({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const image = getProductImage(product.images);
  const audience = resolveAudience(product);
  const isBook = product.category?.slug === 'sach' || (product.tags ?? []).includes('sách');

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex gap-4 bg-white rounded-2xl border border-slate-100 p-4 hover:border-slate-200 hover:shadow-[0_6px_32px_rgba(0,0,0,0.07)] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-28 h-28 rounded-xl bg-slate-50 overflow-hidden flex-shrink-0">
        {!imgError && image !== '/placeholder-product.png' ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className={cn(
              'transition-transform duration-500 group-hover:scale-105',
              isBook ? 'object-cover' : 'object-contain p-2',
            )}
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder name={product.name} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-1.5">
          {audience && <AudiencePill badge={audience} />}

          {product.brand && (
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
              {product.brand}
            </p>
          )}

          <h3 className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-slate-900 transition-colors">
            {product.name}
          </h3>

          {product.shortDescription && (
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/lien-he"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-semibold hover:bg-slate-700 transition-colors duration-200"
        >
          Nhận tư vấn
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Link>
  );
}

// ─── Grid View ────────────────────────────────────────────────────────────────

function ProductCardGrid({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  const image = getProductImage(product.images);
  const audience = resolveAudience(product);
  const isBook = product.category?.slug === 'sach' || (product.tags ?? []).includes('sách');

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-[0_12px_48px_rgba(0,0,0,0.09)] transition-all duration-350 flex flex-col cursor-pointer"
    >
      {/* ── Image area ── */}
      <div
        className={cn(
          'relative overflow-hidden bg-slate-50',
          isBook ? 'aspect-[3/4]' : 'aspect-[4/3]',
        )}
      >
        {!imgError && image !== '/placeholder-product.png' ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className={cn(
              'transition-transform duration-500 ease-out will-change-transform',
              isBook ? 'object-cover group-hover:scale-[1.03]' : 'object-contain p-5 group-hover:scale-[1.06]',
            )}
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder name={product.name} />
        )}

        {/* Subtle hover veil */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-300" />

        {/* Featured badge */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-slate-200/80 text-slate-600 text-[10px] font-semibold rounded-full shadow-sm">
              Nổi bật
            </span>
          </div>
        )}

        {/* Quick-view hint on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-250 delay-75">
          <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/60">
            <Eye className="w-3.5 h-3.5 text-slate-600" />
          </div>
        </div>
      </div>

      {/* ── Info area ── */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Audience + brand row */}
        <div className="flex items-center gap-2 flex-wrap">
          {audience && <AudiencePill badge={audience} />}
          {product.brand && (
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
              {product.brand}
            </span>
          )}
        </div>

        {/* Product name */}
        <h3 className="text-[13.5px] font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-slate-900 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Short description */}
        {product.shortDescription ? (
          <p className="text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        ) : (product.tags ?? []).length > 0 ? (
          <p className="text-[11.5px] text-slate-500 line-clamp-1 leading-relaxed">
            {product.tags!.slice(0, 3).join(' · ')}
          </p>
        ) : null}

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-slate-50">
          <Link
            href="/lien-he"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'w-full flex items-center justify-center gap-1.5',
              'py-2.5 rounded-xl text-[12px] font-semibold',
              'bg-slate-900 text-white',
              'hover:bg-slate-700 active:scale-[0.98]',
              'transition-all duration-200',
            )}
          >
            Nhận tư vấn
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </Link>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProductCard({
  product,
  view = 'grid',
}: {
  product: Product;
  view?: 'grid' | 'list';
}) {
  if (view === 'list') return <ProductCardList product={product} />;
  return <ProductCardGrid product={product} />;
}