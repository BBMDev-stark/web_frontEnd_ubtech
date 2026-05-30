'use client';
// src/app/(main)/dat-hang/page.tsx
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Loader2, CheckCircle, MessageCircle, ChevronDown,
  MapPin, Tag, Package, Banknote, QrCode, Truck, Copy, Check,
} from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { formatPrice } from '@/lib/utils';
import { createVietQRPayment, type VietQRData } from '@/lib/paymentApi';
import VietQRPaymentPanel from '@/components/payment/VietQRPaymentPanel';
import api from '@/lib/axios';

const schema = z.object({
  fullName: z.string().min(2, 'Nhập họ tên (ít nhất 2 ký tự)'),
  phone: z.string()
    .transform(val => val.replace(/[\s\-().]/g, ''))
    .refine(val => /^(0|\+84)[0-9]{8,9}$/.test(val), { message: 'Số điện thoại không hợp lệ' }),
  province     : z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
  district     : z.string().min(1, 'Nhập quận/huyện'),
  ward         : z.string().min(1, 'Nhập phường/xã'),
  street       : z.string().min(3, 'Nhập địa chỉ cụ thể'),
  note         : z.string().optional(),
  paymentMethod: z.enum(['cod', 'vietqr', 'bank_transfer']),
});
type Form = z.infer<typeof schema>;

const PROVINCES = [
  'TP. Hồ Chí Minh','Hà Nội','Đà Nẵng','Hải Phòng','Cần Thơ',
  'Bình Dương','Đồng Nai','Bà Rịa - Vũng Tàu','Long An','Tiền Giang',
  'Khánh Hòa','Lâm Đồng','Thừa Thiên Huế','Quảng Nam','Quảng Ngãi',
  'Bình Định','Phú Yên','Gia Lai','Đắk Lắk','Đắk Nông',
  'Bình Phước','Tây Ninh','An Giang','Kiên Giang','Đồng Tháp',
  'Vĩnh Long','Bến Tre','Trà Vinh','Sóc Trăng','Bạc Liêu',
  'Cà Mau','Hà Giang','Cao Bằng','Bắc Kạn','Tuyên Quang',
  'Lào Cai','Yên Bái','Thái Nguyên','Lạng Sơn','Quảng Ninh',
  'Bắc Giang','Phú Thọ','Vĩnh Phúc','Bắc Ninh','Hải Dương',
  'Hưng Yên','Thái Bình','Hà Nam','Nam Định','Ninh Bình',
  'Thanh Hóa','Nghệ An','Hà Tĩnh','Quảng Bình','Quảng Trị',
  'Ninh Thuận','Bình Thuận','Kon Tum','Điện Biên','Lai Châu','Sơn La','Hòa Bình','Khác',
];

const ZALO_PHONE = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';

const PAYMENT_METHODS = [
  { value: 'cod'          as const, label: 'Thanh toán khi nhận hàng (COD)',  desc: 'Trả tiền mặt khi nhận hàng',                          Icon: Truck,   color: 'text-orange-500', bg: 'bg-orange-50' },
  { value: 'vietqr'       as const, label: 'VietQR — Xác nhận tự động',       desc: 'Quét QR → hệ thống xác nhận ngay, không cần chờ admin', Icon: QrCode,  color: 'text-[#0057FF]', bg: 'bg-blue-50',   badge: '⚡ Tự động' },
  { value: 'bank_transfer'as const, label: 'Chuyển khoản ngân hàng thủ công', desc: 'Chuyển khoản và chờ admin xác nhận trong 2-4h',         Icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

type SuccessData = { orderCode: string; total: number; paymentMethod: string; orderId: string; };

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, totalAmount, couponCode, discount, clearCart, fetchCart } = useCartStore();

  const [loading,    setLoading]    = useState(false);
  const [success,    setSuccess]    = useState<SuccessData | null>(null);
  const [qrData,     setQrData]     = useState<VietQRData | null>(null);
  const [loadingQR,  setLoadingQR]  = useState(false);
  const [qrPaid,     setQrPaid]     = useState(false);
  const [bankInfo,   setBankInfo]   = useState<VietQRData | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Form>({
    resolver    : zodResolver(schema),
    defaultValues: { paymentMethod: 'vietqr' },
  });
  const paymentMethod = watch('paymentMethod');

  useEffect(() => { if (!user) { router.push('/dang-nhap'); return; } fetchCart(); }, [user]);
  useEffect(() => { if (items.length === 0 && !success && !loading) router.push('/gio-hang'); }, [items, success, loading]);
  useEffect(() => { if (user) { setValue('fullName', user.name || ''); if (user.phone) setValue('phone', user.phone); } }, [user]);

  const shippingFee = totalAmount >= 500000 ? 0 : 30000;
  const finalAmount = Math.max(0, totalAmount + shippingFee - discount);

  const fetchVietQR = async (orderId: string) => {
    setLoadingQR(true);
    try { setQrData(await createVietQRPayment(orderId)); }
    catch { setQrData(null); }
    finally { setLoadingQR(false); }
  };

  const fetchBankTransfer = async (orderId: string, amount: number, orderCode: string) => {
    try {
      const res = await api.post('/payments/create', { orderId, provider: 'bank_transfer' });
      if (res.data?.success && res.data?.data) setBankInfo(res.data.data);
    } catch {
      setBankInfo({
        bankName: process.env.NEXT_PUBLIC_BANK_NAME || 'HDBank',
        accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '1234567890',
        accountName: process.env.NEXT_PUBLIC_BANK_OWNER || 'NGUYEN VAN A',
        amount, content: `TT ${orderCode}`,
        qrUrl: `https://img.vietqr.io/image/${process.env.NEXT_PUBLIC_BANK_BIN||'970437'}-${process.env.NEXT_PUBLIC_BANK_ACCOUNT}-compact2.jpg?amount=${amount}&addInfo=TT%20${orderCode}`,
        orderCode,
      });
    }
  };

  const onSubmit = async (data: Form) => {
    setLoading(true); setOrderError(null);
    try {
      const payload: Record<string, unknown> = {
        paymentMethod: data.paymentMethod, note: data.note || '',
        shippingAddress: { fullName: data.fullName, phone: data.phone, province: data.province, district: data.district, ward: data.ward, street: data.street },
      };
      if (couponCode) payload.couponCode = couponCode;
      const res = await api.post('/orders', payload);
      const od  = res.data.data;
      setSuccess({ orderCode: od.orderCode, total: od.totalAmount, paymentMethod: data.paymentMethod, orderId: od._id });
      try { await clearCart(); } catch {}
      if (data.paymentMethod === 'vietqr')       fetchVietQR(od._id);
      if (data.paymentMethod === 'bank_transfer') fetchBankTransfer(od._id, od.totalAmount, od.orderCode);
    } catch (e: any) {
      setOrderError(e?.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại');
    } finally { setLoading(false); }
  };

  // ── Màn hình sau khi đặt hàng ────────────────────────────────────
  if (success) return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-500 ${qrPaid ? 'bg-green-100 scale-110' : 'bg-blue-50'}`}>
          <CheckCircle className={`w-10 h-10 transition-colors ${qrPaid ? 'text-green-500' : 'text-[#0057FF]'}`} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Đặt hàng thành công!</h2>
        <p className="text-gray-400 mb-1">Mã đơn hàng</p>
        <p className="text-3xl font-black text-[#0057FF] font-mono mb-3">{success.orderCode}</p>
        <p className="text-gray-500">Tổng: <span className="font-bold text-gray-900 text-lg">{formatPrice(success.total)}</span></p>
      </div>

      {success.paymentMethod === 'vietqr' && (
        <>
          {loadingQR && (
            <div className="flex items-center justify-center gap-2 py-10 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" /> Đang tạo mã QR...
            </div>
          )}
          {!loadingQR && qrData && !qrPaid && (
            <VietQRPaymentPanel qrData={qrData} onPaid={() => setQrPaid(true)} pollInterval={5000} />
          )}
          {qrPaid && (
            <div className="mt-6 p-6 rounded-2xl bg-green-50 border-2 border-green-200 text-center space-y-2">
              <p className="text-2xl">✅</p>
              <p className="text-green-700 font-bold text-lg">Thanh toán đã xác nhận!</p>
              <p className="text-sm text-green-600">Đơn hàng chuyển sang trạng thái <strong>Đang xử lý</strong>.</p>
            </div>
          )}
        </>
      )}

      {success.paymentMethod === 'bank_transfer' && bankInfo && <ManualBankPanel info={bankInfo} />}

      {success.paymentMethod === 'cod' && (
        <div className="mt-6 bg-orange-50 rounded-2xl p-5 text-sm text-gray-700 border border-orange-100">
          <p className="font-semibold text-orange-600 mb-2">Bước tiếp theo:</p>
          <p>Đơn COD đã ghi nhận. Chúng tôi sẽ liên hệ xác nhận trong 24h và giao hàng sớm nhất.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <a href={`https://zalo.me/${ZALO_PHONE}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0057FF] text-white font-semibold hover:bg-blue-700 transition-colors">
          <MessageCircle className="w-4 h-4" /> Liên hệ Zalo
        </a>
        <button onClick={() => router.push('/tai-khoan/don-hang')}
          className="px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
          Xem đơn hàng
        </button>
      </div>
    </div>
  );

  // ── Form đặt hàng ────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-8">Đặt hàng</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">

            {/* Địa chỉ */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0057FF]" /> Địa chỉ giao hàng
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { key: 'fullName', label: 'Họ và tên *',     placeholder: 'Nguyễn Văn An' },
                  { key: 'phone',    label: 'Số điện thoại *', placeholder: '0912345678' },
                  { key: 'district', label: 'Quận / Huyện *',  placeholder: 'Quận 1' },
                  { key: 'ward',     label: 'Phường / Xã *',   placeholder: 'Phường Bến Nghé' },
                ] as { key: 'fullName'|'phone'|'district'|'ward'; label: string; placeholder: string }[]).map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block">{f.label}</label>
                    <input {...register(f.key)} placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0057FF] bg-gray-50 focus:bg-white transition-all placeholder:text-gray-300" />
                    {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]?.message}</p>}
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Tỉnh / Thành phố *</label>
                  <div className="relative">
                    <select {...register('province')}
                      className="w-full appearance-none px-4 py-3 pr-9 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0057FF] bg-gray-50 focus:bg-white transition-all cursor-pointer">
                      <option value="">Chọn tỉnh / thành phố</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 pointer-events-none" />
                  </div>
                  {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Địa chỉ cụ thể *</label>
                  <input {...register('street')} placeholder="Số nhà, tên đường..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0057FF] bg-gray-50 focus:bg-white transition-all placeholder:text-gray-300" />
                  {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 mb-1.5 block">Ghi chú (tuỳ chọn)</label>
                  <textarea {...register('note')} placeholder="Giao giờ hành chính, gọi trước khi giao..." rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#0057FF] bg-gray-50 focus:bg-white transition-all resize-none placeholder:text-gray-300" />
                </div>
              </div>
            </div>

            {/* Thanh toán */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5">Phương thức thanh toán</h3>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(opt => {
                  const selected = paymentMethod === opt.value;
                  return (
                    <label key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? 'border-[#0057FF] bg-blue-50' : 'border-gray-100 hover:border-blue-200 bg-white'}`}>
                      <input type="radio" {...register('paymentMethod')} value={opt.value} className="hidden" />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? opt.bg : 'bg-gray-50'}`}>
                        <opt.Icon className={`w-5 h-5 ${selected ? opt.color : 'text-gray-300'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                          {'badge' in opt && opt.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-[#0057FF] text-white text-[10px] font-bold">{opt.badge}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-[#0057FF]' : 'border-gray-300'}`}>
                        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#0057FF]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
              {paymentMethod === 'vietqr' && (
                <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-700 flex items-start gap-2">
                    <QrCode className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Mã QR hiển thị ngay sau khi đặt. Khi bạn chuyển khoản đúng nội dung, hệ thống tự xác nhận trong vài giây — không cần chờ admin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tóm tắt đơn */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Đơn hàng <span className="text-gray-400 font-normal text-sm">({items.length} sp)</span></h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item._id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                      {item.image
                        ? <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" unoptimized />
                        : <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-gray-200" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
                      {item.variantName && <p className="text-xs text-gray-400">{item.variantName}</p>}
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[#0057FF] flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-500"><span>Tạm tính</span><span className="font-medium text-gray-800">{formatPrice(totalAmount)}</span></div>
                <div className="flex justify-between text-gray-500">
                  <span>Vận chuyển</span>
                  <span className={shippingFee === 0 ? 'text-green-600 font-semibold' : 'font-medium text-gray-800'}>
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Giảm ({couponCode})</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold text-base border-t border-gray-100 pt-2.5">
                  <span className="text-gray-900">Tổng cộng</span>
                  <span className="text-xl text-[#0057FF]">{formatPrice(finalAmount)}</span>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="mt-5 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#0057FF] text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md disabled:opacity-50">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Đang xử lý...</> : 'Xác nhận đặt hàng'}
              </button>
              {orderError && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">{orderError}</div>
              )}
              <p className="text-xs text-gray-400 text-center mt-3">Bằng cách đặt hàng, bạn đồng ý với điều khoản dịch vụ</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ManualBankPanel({ info }: { info: VietQRData }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, k: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(k); setTimeout(() => setCopied(null), 2000);
  };
  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button onClick={() => copy(text, id)} className="ml-2 p-1 rounded hover:bg-emerald-100 transition-colors">
      {copied === id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  );
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden">
      <div className="bg-emerald-600 px-5 py-3"><p className="text-white font-bold text-sm">Thông tin chuyển khoản</p></div>
      <div className="p-5 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-gray-400">Ngân hàng</span><span className="font-bold text-gray-900">{info.bankName}</span></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Số tài khoản</span>
          <div className="flex items-center"><span className="font-bold font-mono text-gray-900">{info.accountNumber}</span><CopyBtn text={info.accountNumber} id="acc" /></div>
        </div>
        <div className="flex justify-between"><span className="text-gray-400">Chủ tài khoản</span><span className="font-bold text-gray-900">{info.accountName}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Số tiền</span><span className="font-black text-emerald-700 text-base">{info.amount.toLocaleString('vi-VN')}đ</span></div>
        <div className="bg-white rounded-xl p-3 border-2 border-amber-300">
          <p className="text-xs text-gray-400 mb-1">Nội dung CK <span className="text-red-500">*</span></p>
          <div className="flex items-center"><span className="font-black font-mono text-gray-900 tracking-wide">{info.content}</span><CopyBtn text={info.content} id="content" /></div>
          <p className="text-[11px] text-amber-600 mt-1">⚠ Nhập đúng để đơn được xác nhận</p>
        </div>
        <p className="text-xs text-gray-400 text-center">Xác nhận trong <strong>2-4h làm việc</strong></p>
      </div>
    </div>
  );
}
