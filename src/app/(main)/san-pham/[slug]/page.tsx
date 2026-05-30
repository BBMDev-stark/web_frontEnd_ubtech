'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  MessageCircle,
  ChevronRight,
  Loader2,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Send,
  Package,
} from 'lucide-react';
import api from '@/lib/axios';
import { formatPrice, formatDate, getDisplayPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';

const fetchProduct = (slug: string) => api.get(`/products/${slug}`).then(r => r.data.data);
const fetchReviews = (id: string, page: number) =>
  api.get(`/reviews/product/${id}?page=${page}&limit=5`).then(r => r.data);
const fetchRelated = (slug: string) =>
  api.get(`/products/${slug}/related`).then(r => r.data.data);

export default function ProductDetail() {
  const { slug }   = useParams<{ slug: string }>();
  const router     = useRouter();
  const qc         = useQueryClient();
  const { user }   = useAuthStore();
  const { addToCart } = useCartStore();

  const [selVariant, setSelVariant] = useState<string | null>(null);
  const [qty,     setQty]     = useState(1);
  const [imgIdx,  setImgIdx]  = useState(0);
  const [tab,     setTab]     = useState<'desc' | 'spec' | 'reviews'>('desc');
  const [adding,  setAdding]  = useState(false);
  const [added,   setAdded]   = useState(false);
  const [reviewPage, setReviewPage] = useState(1);

  // Review form state
  const [reviewRating,  setReviewRating]  = useState(5);
  const [hoverStar,     setHoverStar]     = useState(0);
  const [reviewTitle,   setReviewTitle]   = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewErr,     setReviewErr]     = useState('');
  const [reviewOk,      setReviewOk]      = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn:  () => fetchProduct(slug),
    enabled:  !!slug,
  });

  const { data: reviewData } = useQuery({
    queryKey: ['reviews', product?._id, reviewPage],
    queryFn:  () => fetchReviews(product._id, reviewPage),
    enabled:  !!product?._id,
  });

  const { data: related = [] } = useQuery({
    queryKey: ['related', slug],
    queryFn:  () => fetchRelated(slug),
    enabled:  !!slug,
  });

  const reviewMutation = useMutation({
    mutationFn: (body: object) => api.post('/reviews', body),
    onSuccess: () => {
      setReviewOk(true);
      setReviewTitle(''); setReviewContent(''); setReviewRating(5); setReviewErr('');
      // FIX: invalidate bằng prefix ['reviews', productId] để cover tất cả các page
      // không invalidate với full key ['reviews', product?._id, reviewPage] vì sẽ miss các page khác
      qc.invalidateQueries({ queryKey: ['reviews', product?._id] });
      qc.invalidateQueries({ queryKey: ['product', slug] });
      setTimeout(() => setReviewOk(false), 4000);
    },
    onError: (e: any) => setReviewErr(e?.response?.data?.message || 'Gửi đánh giá thất bại'),
  });

  const submitReview = () => {
    setReviewErr('');
    if (!user) { router.push('/dang-nhap'); return; }
    if (!reviewContent.trim()) { setReviewErr('Vui lòng nhập nội dung đánh giá'); return; }
    reviewMutation.mutate({
      productId: product._id,
      rating:    reviewRating,
      title:     reviewTitle.trim(),
      content:   reviewContent.trim(),
    });
  };

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#0057FF] animate-spin" />
    </div>
  );
  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      
      <p className="text-[#6B7280]">Không tìm thấy sản phẩm</p>
      <Link href="/san-pham" className="mt-4 inline-block text-[#0057FF] hover:underline">← Quay lại danh sách</Link>
    </div>
  );

  const variant     = product.variants?.find((v: any) => v._id === selVariant);
  const price       = variant?.salePrice || variant?.price || product.salePrice || product.basePrice || 0;
  const origPrice   = product.basePrice || 0;
  const stock       = variant?.stock ?? product.stock ?? 0;
  const hasDiscount = product.salePrice && product.basePrice && product.salePrice < product.basePrice;
  const discountPct = hasDiscount ? Math.round((1 - product.salePrice / product.basePrice) * 100) : 0;
  const images      = product.images?.length ? product.images : [];
  const needVariant = product.variants?.length > 0 && !selVariant;

  const handleAddCart = async (goCart = false) => {
    if (!user) { router.push('/dang-nhap'); return; }
    if (needVariant) return;
    setAdding(true);
    try {
      await addToCart(product._id, qty, selVariant || undefined);
      if (goCart) router.push('/gio-hang');
      else { setAdded(true); setTimeout(() => setAdded(false), 2500); }
    } finally { setAdding(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-6">
        <Link href="/" className="hover:text-[#0057FF]">Trang chủ</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/san-pham" className="hover:text-[#0057FF]">Sản phẩm</Link>
        {product.category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/san-pham?category=${product.category.slug}`} className="hover:text-[#0057FF]">
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A1F36] truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* ── Images ──────────────────────────────── */}
        <div className="space-y-3">
          <div className="relative aspect-square rounded-2xl bg-white border border-[#E4E8EF] overflow-hidden">
            {images[imgIdx]?.url
              ? <Image src={images[imgIdx].url} alt={product.name} fill className="object-contain p-4" unoptimized />
              : <div className="w-full h-full flex items-center justify-center"><Package className="w-16 h-16 text-[#C4C9D4]" /></div>}
            {discountPct > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-xl">
                -{discountPct}%
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  aria-label={`Xem ảnh ${i + 1}`}
                  className={cn(
                    'relative w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all bg-white',
                    i === imgIdx ? 'border-[#0057FF]' : 'border-[#E4E8EF] hover:border-[#0057FF]/50'
                  )}
                >
                  {img.url && <Image src={img.url} alt="" fill className="object-contain p-1" unoptimized />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ────────────────────────────────── */}
        <div className="space-y-5">
          {product.brand && (
            <Link
              href={`/san-pham?brand=${product.brand}`}
              className="inline-block text-xs font-bold text-[#0057FF] bg-[#EEF3FF] px-3 py-1 rounded-full hover:bg-[#0057FF] hover:text-white transition-colors"
            >
              {product.brand}
            </Link>
          )}
          <h1 className="text-2xl font-black text-[#1A1F36] leading-tight">{product.name}</h1>

          {/* Rating + Sold */}
          {(product.ratingCount > 0 || product.soldCount > 0) && (
            <div className="flex items-center gap-4 text-sm">
              {product.ratingCount > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#1A1F36]">{product.ratingAvg?.toFixed(1)}</span>
                  <div className="flex" role="img" aria-label={`${product.ratingAvg?.toFixed(1)} sao`}>
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(product.ratingAvg) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-[#6B7280]">({product.ratingCount} đánh giá)</span>
                </div>
              )}
              {product.soldCount > 0 && (
                <span className="text-[#6B7280] border-l border-[#E4E8EF] pl-4">
                  Đã bán {product.soldCount.toLocaleString('vi-VN')}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="bg-[#F5F7FA] rounded-2xl p-4">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-[#0057FF]">{formatPrice(price)}</span>
              {hasDiscount && origPrice > 0 && (
                <span className="text-lg text-[#9CA3AF] line-through mb-0.5">{formatPrice(origPrice)}</span>
              )}
              {discountPct > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-sm font-bold rounded-lg mb-0.5">-{discountPct}%</span>
              )}
            </div>
            {stock <= 5 && stock > 0 && (
              <p className="text-amber-600 text-xs mt-2 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Chỉ còn {stock} sản phẩm
              </p>
            )}
            {stock === 0 && <p className="text-red-500 text-sm font-semibold mt-2">Hết hàng</p>}
          </div>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-[#1A1F36] mb-2.5">Phiên bản:</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn phiên bản">
                {product.variants.filter((v: any) => v.isActive !== false).map((v: any) => (
                  <button
                    key={v._id}
                    onClick={() => setSelVariant(v._id)}
                    aria-pressed={selVariant === v._id}
                    className={cn(
                      'px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                      selVariant === v._id
                        ? 'border-[#0057FF] bg-[#EEF3FF] text-[#0057FF] shadow-sm'
                        : 'border-[#E4E8EF] bg-white text-[#1A1F36] hover:border-[#0057FF]/50'
                    )}
                  >
                    {v.name}
                    {v.salePrice || v.price ? (
                      <span className="ml-1.5 text-[#6B7280] font-normal text-xs">({formatPrice(v.salePrice || v.price)})</span>
                    ) : null}
                  </button>
                ))}
              </div>
              {needVariant && (
                <p className="text-amber-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Vui lòng chọn phiên bản
                </p>
              )}
            </div>
          )}

          {/* Qty */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#E4E8EF] rounded-xl overflow-hidden bg-white" role="group" aria-label="Số lượng">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Giảm số lượng"
                className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F7FA] text-[#6B7280] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-semibold text-[#1A1F36]" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(stock || 99, q + 1))}
                disabled={qty >= (stock || 99)}
                aria-label="Tăng số lượng"
                className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F7FA] text-[#6B7280] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-[#6B7280]">Còn lại: {stock}</span>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAddCart(false)}
              disabled={adding || stock === 0 || (product.variants?.length > 0 && !selVariant)}
              className={cn(
                'flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all',
                added
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-[#0057FF] text-[#0057FF] hover:bg-[#EEF3FF] disabled:opacity-40 disabled:cursor-not-allowed'
              )}
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
            </button>
            <button
              onClick={() => handleAddCart(true)}
              disabled={adding || stock === 0 || (product.variants?.length > 0 && !selVariant)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0057FF] text-white font-bold text-sm hover:bg-[#003DC2] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Mua ngay
            </button>
          </div>

          {/* Zalo */}
          <a
            href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || '0973212834'}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EEF3FF] text-[#0057FF] font-medium text-sm hover:bg-[#0057FF]/10 transition-colors border border-[#0057FF]/20"
          >
            <MessageCircle className="w-4 h-4" />
            Hỏi thêm về sản phẩm qua Zalo
          </a>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { icon: Truck,  label: 'Miễn ship đơn ≥500K', sub: 'Giao toàn quốc' },
              { icon: Shield, label: 'Bảo hành 12 tháng',   sub: 'Đổi trả 30 ngày' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E4E8EF]">
                <f.icon className="w-5 h-5 text-[#0057FF] flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[#1A1F36]">{f.label}</p>
                  <p className="text-xs text-[#6B7280]">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────── */}
      <div className="mt-12 bg-white rounded-2xl border border-[#E4E8EF] overflow-hidden">
        <div className="flex border-b border-[#E4E8EF]" role="tablist">
          {[
            { key: 'desc',    label: 'Mô tả sản phẩm' },
            { key: 'spec',    label: 'Thông số kỹ thuật' },
            { key: 'reviews', label: `Đánh giá (${reviewData?.stats?.total || 0})` },
          ].map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key as any)}
              className={cn(
                'px-6 py-4 text-sm font-semibold transition-all border-b-2 -mb-px',
                tab === t.key ? 'text-[#0057FF] border-[#0057FF]' : 'text-[#6B7280] border-transparent hover:text-[#1A1F36]'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="p-6" role="tabpanel">
          {tab === 'desc' && (
            <div className="space-y-8">
              {/* Description */}
              <div className="prose max-w-none text-[#374151] leading-relaxed text-sm">
                {product.description || product.shortDesc
                  ? <p className="whitespace-pre-wrap">{product.description || product.shortDesc}</p>
                  : <p className="text-[#9CA3AF] italic">Chưa có mô tả chi tiết.</p>}
              </div>

              {/* Đặc điểm nổi bật — hiển thị khi có attributes */}
              {product.attributes?.length > 0 && (
                <div>
                  <h3 className="text-base font-black text-[#1A1F36] mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#0057FF] rounded-full inline-block"/>
                    Đặc điểm nổi bật
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.attributes.slice(0, 6).map((a: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-[#F5F7FA] to-[#EEF3FF] border border-[#E4E8EF]">
                        <div className="w-8 h-8 rounded-lg bg-[#0057FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0057FF] uppercase tracking-wide mb-1">{a.key}</p>
                          <p className="text-sm font-semibold text-[#1A1F36]">{a.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-[#F5F7FA] text-[#6B7280] rounded-full border border-[#E4E8EF]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'spec' && (
            product.attributes?.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {product.attributes.map((a: any, i: number) => (
                  <div key={i} className={cn('flex justify-between px-4 py-3 rounded-xl text-sm', i % 2 === 0 ? 'bg-[#F5F7FA]' : 'bg-white border border-[#E4E8EF]')}>
                    <span className="text-[#6B7280] font-medium">{a.key}</span>
                    <span className="text-[#1A1F36] font-semibold text-right max-w-[55%]">{a.value}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-[#9CA3AF] italic text-sm">Chưa có thông số kỹ thuật.</p>
          )}

          {tab === 'reviews' && (
            <div className="space-y-6">
              {/* Stats */}
              {reviewData?.stats && reviewData.stats.total > 0 && (
                <div className="flex flex-col sm:flex-row gap-6 p-5 bg-[#F5F7FA] rounded-2xl">
                  <div className="text-center sm:border-r border-[#E4E8EF] sm:pr-6 flex-shrink-0">
                    <p className="text-5xl font-black text-[#0057FF]">{Number(reviewData.stats.avg).toFixed(1)}</p>
                    <div className="flex justify-center gap-0.5 my-2" role="img" aria-label={`${reviewData.stats.avg} sao`}>
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(reviewData.stats.avg) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-[#6B7280] text-sm">{reviewData.stats.total} đánh giá</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => {
                      const count = reviewData.stats.breakdown?.[star] || 0;
                      const pct   = reviewData.stats.total > 0 ? (count / reviewData.stats.total) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3 text-sm">
                          <span className="text-[#6B7280] w-2 text-right">{star}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <div className="flex-1 h-2 bg-[#E4E8EF] rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[#9CA3AF] w-5 text-right text-xs">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Write review */}
              {user ? (
                <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-[#E4E8EF]">
                  <h4 className="font-bold text-[#1A1F36] mb-4">Viết đánh giá của bạn</h4>
                  {reviewOk && (
                    <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" /> Đánh giá đã được gửi! Cảm ơn bạn.
                    </div>
                  )}
                  {reviewErr && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{reviewErr}</div>
                  )}
                  {/* Star rating */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#6B7280] mb-2">Đánh giá *</p>
                    <div className="flex gap-1" role="group" aria-label="Chọn số sao">
                      {[1,2,3,4,5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverStar(star)}
                          onMouseLeave={() => setHoverStar(0)}
                          aria-label={`${star} sao`}
                          aria-pressed={reviewRating === star}
                          className="transition-transform hover:scale-110"
                        >
                          <Star className={`w-8 h-8 transition-colors ${
                            star <= (hoverStar || reviewRating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`} />
                        </button>
                      ))}
                      <span className="ml-2 self-center text-sm text-[#6B7280]">
                        {['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Xuất sắc'][hoverStar || reviewRating]}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-[#6B7280] mb-1.5">Tiêu đề (tuỳ chọn)</p>
                      <input
                        value={reviewTitle}
                        onChange={e => setReviewTitle(e.target.value)}
                        placeholder="Tiêu đề đánh giá..."
                        maxLength={100}
                        aria-label="Tiêu đề đánh giá"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-white transition-all placeholder:text-[#9CA3AF]"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#6B7280] mb-1.5">Nội dung đánh giá *</p>
                      <textarea
                        value={reviewContent}
                        onChange={e => setReviewContent(e.target.value)}
                        placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        rows={3}
                        maxLength={1000}
                        aria-label="Nội dung đánh giá"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-white transition-all resize-none placeholder:text-[#9CA3AF]"
                      />
                      <p className="text-xs text-[#9CA3AF] text-right mt-0.5">{reviewContent.length}/1000</p>
                    </div>
                    <button
                      onClick={submitReview}
                      disabled={reviewMutation.isPending}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-[#003DC2] transition-colors disabled:opacity-50"
                    >
                      {reviewMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Gửi đánh giá
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#EEF3FF] rounded-2xl p-5 text-center border border-[#0057FF]/20">
                  <p className="text-[#374151] mb-3 text-sm">Đăng nhập để viết đánh giá sản phẩm</p>
                  <Link href="/dang-nhap" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-[#003DC2] transition-colors">
                    Đăng nhập ngay
                  </Link>
                </div>
              )}

              {/* Reviews list */}
              {(!reviewData?.data || reviewData.data.length === 0) && (
                <div className="text-center py-10 text-[#9CA3AF]">
                  <Star className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                  <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                </div>
              )}
              <div className="space-y-4">
                {reviewData?.data?.map((r: any) => (
                  <div key={r._id} className="p-5 rounded-2xl border border-[#E4E8EF] bg-white">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0057FF] text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                          {r.user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1A1F36]">{r.user?.name}</p>
                          {r.isVerifiedPurchase && (
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                              <Check className="w-3 h-3" /> Đã mua hàng
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-0.5 justify-end" role="img" aria-label={`${r.rating} sao`}>
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-[#9CA3AF] mt-1">{formatDate(r.createdAt)}</p>
                      </div>
                    </div>
                    {r.title && <p className="text-sm font-bold text-[#1A1F36] mb-1">{r.title}</p>}
                    <p className="text-sm text-[#374151] leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>

              {/* Review pagination */}
              {reviewData?.pagination?.totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                  {Array.from({ length: reviewData.pagination.totalPages }, (_, i) => (
                    <button
                      key={i+1}
                      onClick={() => setReviewPage(i+1)}
                      aria-label={`Trang ${i+1}`}
                      aria-current={reviewPage === i+1 ? 'page' : undefined}
                      className={cn(
                        'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
                        reviewPage === i+1
                          ? 'bg-[#0057FF] text-white'
                          : 'border border-[#E4E8EF] text-[#6B7280] hover:border-[#0057FF] hover:text-[#0057FF]'
                      )}
                    >
                      {i+1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-black text-[#1A1F36] mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.slice(0, 4).map((p: any) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
