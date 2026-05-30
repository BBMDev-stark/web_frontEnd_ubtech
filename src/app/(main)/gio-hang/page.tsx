'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  X,
  Loader2,
  MessageCircle,
  Check,
  AlertTriangle,
  Package,
} from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    items, totalAmount, totalItems, couponCode, discount,
    fetchCart, updateItem, removeItem, clearCart, applyCoupon, removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg,   setCouponMsg]   = useState<{ text: string; ok: boolean } | null>(null);
  const [applying,    setApplying]    = useState(false);
  const [removing,    setRemoving]    = useState<string | null>(null);
  const [updating,    setUpdating]    = useState<string | null>(null);
  const [clearing,    setClearing]    = useState(false);
  // FIX: thay confirm() native bằng state inline confirm UX
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => { if (user) fetchCart(); }, [user]);

  // Sync couponInput với couponCode khi load lại trang
  useEffect(() => {
    if (couponCode) setCouponInput(couponCode);
  }, [couponCode]);

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4">
      <ShoppingBag className="w-16 h-16 text-gray-200" />
      <p className="text-lg font-semibold text-[#1A1F36]">Đăng nhập để xem giỏ hàng</p>
      <Link href="/dang-nhap" className="px-6 py-3 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#003DC2] transition-colors">
        Đăng nhập
      </Link>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4">
      <ShoppingBag className="w-16 h-16 text-gray-200" />
      <p className="text-lg font-semibold text-[#1A1F36]">Giỏ hàng trống</p>
      <p className="text-[#6B7280] text-sm">Thêm sản phẩm robot, kit hoặc sách vào giỏ nhé!</p>
      <Link href="/san-pham" className="flex items-center gap-2 px-6 py-3 bg-[#0057FF] text-white font-semibold rounded-xl hover:bg-[#003DC2] transition-colors">
        Mua sắm ngay <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  const shippingFee = totalAmount >= 500000 ? 0 : 30000;
  const finalAmount = Math.max(0, totalAmount + shippingFee - discount);

  // FIX: clamp quantity >= 1, không gửi qty = 0 lên server
  const handleUpdate = async (id: string, qty: number) => {
    const safeQty = Math.max(1, qty);
    setUpdating(id);
    try { await updateItem(id, safeQty); } finally { setUpdating(null); }
  };

  const handleRemove = async (id: string) => {
    setRemoving(id);
    try { await removeItem(id); } finally { setRemoving(null); }
  };

  // FIX: thay confirm() bằng inline confirm UI
  const handleClearConfirmed = async () => {
    setShowClearConfirm(false);
    setClearing(true);
    try { await clearCart(); } finally { setClearing(false); }
  };

  const handleCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setApplying(true); setCouponMsg(null);
    try {
      const r = await applyCoupon(code);
      setCouponMsg({ text: `Giảm ${formatPrice(r.discountAmount)}!`, ok: true });
    } catch (e: any) {
      setCouponMsg({ text: e?.response?.data?.message || 'Mã không hợp lệ', ok: false });
    } finally { setApplying(false); }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponInput('');
    setCouponMsg(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-black text-[#1A1F36] mb-8">
        Giỏ hàng <span className="text-[#6B7280] text-lg font-normal">({totalItems} sản phẩm)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Danh sách items ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => {
            const href = item.slug ? `/san-pham/${item.slug}` : `/san-pham`;
            return (
              <div key={item._id} className="flex gap-4 p-4 bg-white rounded-2xl border border-[#E4E8EF] hover:border-[#0057FF]/20 transition-colors">
                <Link href={href} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F5F7FA] overflow-hidden flex-shrink-0">
                  {item.image
                    ? <Image src={item.image} alt={item.name} fill className="object-contain p-1" unoptimized />
                    : <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-[#C4C9D4]" /></div>}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={href} className="text-sm font-semibold text-[#1A1F36] hover:text-[#0057FF] line-clamp-2 leading-snug">
                    {item.name}
                  </Link>
                  {item.variantName && <p className="text-xs text-[#6B7280] mt-0.5">Phiên bản: {item.variantName}</p>}
                  <p className="text-[#0057FF] font-bold mt-1.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    {/* FIX: nút "-" disabled khi quantity === 1 để tránh gửi qty=0 lên server */}
                    <div className="flex items-center border border-[#E4E8EF] rounded-lg overflow-hidden bg-[#F5F7FA]">
                      <button
                        onClick={() => handleUpdate(item._id, item.quantity - 1)}
                        disabled={updating === item._id || item.quantity <= 1}
                        aria-label="Giảm số lượng"
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#E4E8EF] text-[#6B7280] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-[#1A1F36]">
                        {updating === item._id
                          ? <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                          : item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdate(item._id, item.quantity + 1)}
                        disabled={updating === item._id}
                        aria-label="Tăng số lượng"
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#E4E8EF] text-[#6B7280] transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[#1A1F36]">{formatPrice(item.price * item.quantity)}</p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      disabled={removing === item._id}
                      aria-label="Xóa sản phẩm"
                      className="p-1.5 text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                    >
                      {removing === item._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* FIX: inline confirm UI thay cho confirm() native */}
          {showClearConfirm ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 flex-1">Xóa toàn bộ {totalItems} sản phẩm khỏi giỏ hàng?</p>
              <button
                onClick={handleClearConfirmed}
                disabled={clearing}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {clearing ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Xóa hết'}
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-lg border border-[#E4E8EF] text-xs font-semibold text-[#6B7280] hover:bg-[#F5F7FA] transition-colors"
              >
                Huỷ
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-red-500 transition-colors"
            >
              Xóa tất cả sản phẩm
            </button>
          )}
        </div>

        {/* ── Sidebar summary ──────────────────────────────── */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-[#E4E8EF] p-5">
            <h3 className="font-bold text-[#1A1F36] mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#0057FF]" /> Mã giảm giá
            </h3>
            {couponCode ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#EEF3FF] border border-[#0057FF]/20">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-mono font-bold text-[#0057FF] text-sm">{couponCode}</span>
                  </div>
                  <button onClick={handleRemoveCoupon} aria-label="Hủy mã giảm giá" className="text-[#9CA3AF] hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-xs text-green-600 font-medium">Tiết kiệm được {formatPrice(discount)}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponMsg(null); }}
                    onKeyDown={e => e.key === 'Enter' && handleCoupon()}
                    placeholder="Nhập mã khuyến mãi"
                    aria-label="Mã giảm giá"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-[#E4E8EF] text-sm font-mono focus:outline-none focus:border-[#0057FF] transition-colors bg-[#F5F7FA] uppercase"
                  />
                  <button
                    onClick={handleCoupon}
                    disabled={applying || !couponInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-[#003DC2] transition-colors disabled:opacity-50"
                  >
                    {applying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Áp dụng'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['WELCOME10', 'UBTECH500', 'STEM2025', 'FREESHIP'].map(code => (
                    <button
                      key={code}
                      onClick={() => { setCouponInput(code); setCouponMsg(null); }}
                      className="px-2 py-0.5 rounded-lg bg-[#F5F7FA] border border-[#E4E8EF] text-[10px] font-mono font-medium text-[#6B7280] hover:border-[#0057FF]/40 hover:text-[#0057FF] transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {couponMsg && (
              <p className={`text-xs mt-2 font-medium ${couponMsg.ok ? 'text-green-600' : 'text-red-500'}`}>
                {couponMsg.text}
              </p>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-[#E4E8EF] p-5">
            <h3 className="font-bold text-[#1A1F36] mb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#6B7280]">
                <span>Tạm tính ({totalItems} sản phẩm)</span>
                <span className="font-medium text-[#1A1F36]">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Phí vận chuyển</span>
                <span className={shippingFee === 0 ? 'text-green-600 font-semibold' : 'font-medium text-[#1A1F36]'}>
                  {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá ({couponCode})</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              {totalAmount > 0 && totalAmount < 500000 && (
                <p className="text-xs text-[#6B7280] bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  Mua thêm {formatPrice(500000 - totalAmount)} để được miễn phí vận chuyển
                </p>
              )}
              <div className="border-t border-[#E4E8EF] pt-3 flex justify-between items-center">
                <span className="font-bold text-[#1A1F36]">Tổng cộng</span>
                <span className="text-xl font-black text-[#0057FF]">{formatPrice(finalAmount)}</span>
              </div>
            </div>
            <Link
              href="/dat-hang"
              className="mt-5 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#0057FF] text-white font-bold hover:bg-[#003DC2] transition-all shadow-md"
            >
              Tiến hành đặt hàng <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/san-pham" className="mt-3 block text-center text-sm text-[#6B7280] hover:text-[#0057FF] transition-colors">
              Tiếp tục mua sắm
            </Link>
          </div>

          {/* Zalo support */}
          <a
            href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || '0973212834'}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#EEF3FF] border border-[#0057FF]/20 text-[#0057FF] text-sm font-medium hover:bg-[#0057FF]/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Cần hỗ trợ? Chat Zalo ngay
          </a>
        </div>
      </div>
    </div>
  );
}
