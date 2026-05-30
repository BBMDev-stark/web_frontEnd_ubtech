'use client';
// src/app/payment/result/page.tsx
// Trang kết quả thanh toán — VNPay / MoMo / ZaloPay redirect về đây
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

type Status = 'loading' | 'success' | 'failed' | 'invalid' | 'error';
const CONFIGS = {
  success: { icon: <CheckCircle2 className="w-14 h-14 text-green-500" />, title: 'Thanh toán thành công!',   sub: 'Đơn hàng đã xác nhận và đang được xử lý.',                    bg: 'bg-green-50', border: 'border-green-200' },
  failed:  { icon: <XCircle      className="w-14 h-14 text-red-400"   />, title: 'Thanh toán thất bại',      sub: 'Giao dịch không thành công. Vui lòng thử lại hoặc chọn phương thức khác.', bg: 'bg-red-50',   border: 'border-red-200'   },
  invalid: { icon: <AlertCircle  className="w-14 h-14 text-amber-400" />, title: 'Chữ ký không hợp lệ',     sub: 'Yêu cầu không được xác thực. Vui lòng liên hệ hỗ trợ.',        bg: 'bg-amber-50', border: 'border-amber-200' },
  error:   { icon: <AlertCircle  className="w-14 h-14 text-gray-400"  />, title: 'Đã xảy ra lỗi',           sub: 'Hệ thống gặp sự cố. Kiểm tra đơn hàng và liên hệ hỗ trợ.',      bg: 'bg-gray-50',  border: 'border-gray-200'  },
};

export default function PaymentResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');
  const rawStatus = params.get('status') as string;
  const orderCode = params.get('orderCode');
  const amount    = params.get('amount');
  const message   = params.get('message');

  useEffect(() => {
    const valid: Status[] = ['success','failed','invalid','error'];
    const t = setTimeout(() => setStatus(valid.includes(rawStatus as Status) ? rawStatus as Status : 'error'), 600);
    return () => clearTimeout(t);
  }, [rawStatus]);

  const ZALO = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';

  if (status === 'loading') return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <Loader2 className="w-10 h-10 text-[#0057FF] animate-spin mx-auto" />
        <p className="text-gray-400">Đang xử lý kết quả thanh toán...</p>
      </div>
    </div>
  );

  const cfg = CONFIGS[status];
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className={`w-full max-w-md rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-8 text-center space-y-5`}>
        <div className="flex justify-center">{cfg.icon}</div>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-black text-gray-900">{cfg.title}</h1>
          <p className="text-gray-500 text-sm">{cfg.sub}</p>
          {message && status === 'failed' && <p className="text-red-500 text-sm font-medium">{decodeURIComponent(message)}</p>}
        </div>
        {(orderCode || amount) && (
          <div className="bg-white rounded-xl p-4 space-y-2 text-sm border border-gray-100 text-left">
            {orderCode && <div className="flex justify-between"><span className="text-gray-400">Mã đơn hàng</span><span className="font-mono font-bold text-[#0057FF]">{orderCode}</span></div>}
            {amount && status === 'success' && <div className="flex justify-between"><span className="text-gray-400">Số tiền</span><span className="font-bold text-gray-900">{formatPrice(Number(amount))}</span></div>}
          </div>
        )}
        <div className="flex flex-col gap-3">
          <button onClick={() => router.push(status === 'success' ? '/tai-khoan/don-hang' : '/gio-hang')}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0057FF] text-white font-semibold hover:bg-blue-700 transition-colors">
            {status === 'success' ? 'Xem đơn hàng' : 'Thử lại'} <ArrowRight className="w-4 h-4" />
          </button>
          <a href={`https://zalo.me/${ZALO}`} target="_blank" rel="noopener noreferrer"
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Liên hệ hỗ trợ Zalo
          </a>
        </div>
      </div>
    </div>
  );
}
