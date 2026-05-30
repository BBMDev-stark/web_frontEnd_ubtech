'use client';
// src/app/(main)/tai-khoan/don-hang/page.tsx
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Package, ChevronDown, ChevronUp, Loader2, X,
  MessageCircle, AlertTriangle, QrCode, CheckCircle2,
} from 'lucide-react';
import api from '@/lib/axios';
import { formatPrice, formatDateTime, getOrderStatus } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { createVietQRPayment, type VietQRData } from '@/lib/paymentApi';
import VietQRPaymentPanel from '@/components/payment/VietQRPaymentPanel';

const fetchOrders = (status: string) =>
  api.get('/orders', { params: status ? { status } : {} }).then(r => r.data);

const STATUS_FILTERS = [
  { value: '',            label: 'Tất cả' },
  { value: 'pending',     label: 'Chờ xác nhận' },
  { value: 'confirmed',   label: 'Đã xác nhận' },
  { value: 'processing',  label: 'Đang xử lý' },
  { value: 'shipped',     label: 'Đang giao' },
  { value: 'delivered',   label: 'Đã giao' },
  { value: 'cancelled',   label: 'Đã hủy' },
];

function PaymentBadge({ status }: { status: string }) {
  return status === 'paid' ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
      <CheckCircle2 className="w-3 h-3" /> Đã TT
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
      Chưa TT
    </span>
  );
}

function paymentLabel(m: string) {
  return ({ cod:'COD', vietqr:'VietQR', bank_transfer:'Chuyển khoản', vnpay:'VNPay', momo:'MoMo', zalopay:'ZaloPay' }[m] || m);
}

// ── Modal QR thanh toán lại ────────────────────────────────────────────────
function VietQRModal({ order, onClose, onPaid }: { order: any; onClose: () => void; onPaid: () => void; }) {
  const [qrData,  setQrData]  = useState<VietQRData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setQrData(await createVietQRPayment(order._id)); }
    catch (e: any) { setError(e?.response?.data?.message || 'Không tạo được mã QR'); }
    finally { setLoading(false); }
  }, [order._id]);

  // Tải QR khi mount
  useEffect(() => { load(); }, [load]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-gray-900">Thanh toán VietQR</p>
            <p className="text-xs text-gray-400 font-mono">{order.orderCode}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="p-5">
          {loading && <div className="flex items-center justify-center gap-2 py-12 text-gray-400"><Loader2 className="w-5 h-5 animate-spin" /> Đang tạo mã QR...</div>}
          {error && (
            <div className="text-center py-8 space-y-4">
              <p className="text-red-500 text-sm">{error}</p>
              <button onClick={load} className="px-4 py-2 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-blue-700">Thử lại</button>
            </div>
          )}
          {!loading && !error && qrData && (
            <VietQRPaymentPanel qrData={qrData} onPaid={() => { onPaid(); onClose(); }} pollInterval={5000} />
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
export default function OrdersPage() {
  const qc = useQueryClient();
  const [filter,        setFilter]        = useState('');
  const [expanded,      setExpanded]      = useState<string | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
  const [qrModal,       setQrModal]       = useState<any | null>(null);

  const { data, isLoading } = useQuery({ queryKey: ['orders', filter], queryFn: () => fetchOrders(filter) });

  const cancelMutation = useMutation({
    mutationFn: (code: string) => api.put(`/orders/${code}/cancel`, { reason: 'Khách hủy đơn' }),
    onSuccess : () => { setCancelConfirm(null); qc.invalidateQueries({ queryKey: ['orders'] }); },
  });

  const orders = data?.data || [];

  return (
    <>
      <div className="space-y-5">
        <h3 className="font-bold text-gray-900 text-lg">Đơn hàng của tôi</h3>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {STATUS_FILTERS.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={cn('px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors border',
                filter === f.value ? 'bg-[#0057FF] text-white border-[#0057FF]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]')}>
              {f.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-7 h-7 text-[#0057FF] animate-spin" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">Chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order: any) => {
              const st = getOrderStatus(order.status);
              const isOpen = expanded === order._id;
              const isConfirmingCancel = cancelConfirm === order.orderCode;
              const canRepay = order.paymentStatus !== 'paid'
                && ['vietqr','bank_transfer'].includes(order.paymentMethod)
                && !['cancelled','refunded'].includes(order.status);

              return (
                <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button onClick={() => setExpanded(isOpen ? null : order._id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-sm text-[#0057FF]">{order.orderCode}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                        <PaymentBadge status={order.paymentStatus} />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(order.createdAt)} • {order.items?.length} sản phẩm</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#0057FF]">{formatPrice(order.totalAmount)}</p>
                      <p className="text-xs text-gray-400">{paymentLabel(order.paymentMethod)}</p>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-300 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-gray-100 p-5 space-y-4 bg-gray-50">
                      <div className="space-y-2.5">
                        {order.items?.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between items-start text-sm bg-white rounded-xl p-3">
                            <div className="flex-1 min-w-0 pr-4">
                              <p className="font-medium text-gray-800 line-clamp-2">{item.name}</p>
                              {item.variantName && <p className="text-xs text-gray-400">{item.variantName}</p>}
                              <p className="text-xs text-gray-400 mt-0.5">×{item.quantity} × {formatPrice(item.price)}</p>
                            </div>
                            <p className="font-bold text-[#0057FF] flex-shrink-0">{formatPrice(item.subtotal)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600"><span>Giảm giá</span><span className="font-semibold">-{formatPrice(order.discount)}</span></div>
                        )}
                        <div className="flex justify-between text-gray-400">
                          <span>Phí vận chuyển</span>
                          <span className={order.shippingFee === 0 ? 'text-green-600 font-semibold' : 'font-medium text-gray-700'}>
                            {order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                          <span>Tổng cộng</span><span className="text-[#0057FF]">{formatPrice(order.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-xs pt-1">
                          <span className="text-gray-400">Thanh toán</span>
                          <span className={order.paymentStatus === 'paid' ? 'text-green-600 font-semibold' : 'text-amber-600 font-semibold'}>
                            {order.paymentStatus === 'paid' ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {canRepay && order.paymentMethod === 'vietqr' && (
                          <button onClick={() => setQrModal(order)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                            <QrCode className="w-3.5 h-3.5" /> Thanh toán ngay
                          </button>
                        )}

                        {['pending','confirmed'].includes(order.status) && (
                          isConfirmingCancel ? (
                            <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl w-full">
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <p className="text-sm text-red-700 flex-1">Bạn chắc chắn muốn hủy đơn hàng này?</p>
                              <button onClick={() => cancelMutation.mutate(order.orderCode)} disabled={cancelMutation.isPending}
                                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 disabled:opacity-50">
                                {cancelMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Xác nhận hủy'}
                              </button>
                              <button onClick={() => setCancelConfirm(null)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-white">
                                Không
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setCancelConfirm(order.orderCode)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                              <X className="w-3.5 h-3.5" /> Hủy đơn hàng
                            </button>
                          )
                        )}

                        <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103'}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-100 text-[#0057FF] text-sm font-medium hover:bg-blue-50 transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> Liên hệ hỗ trợ
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {qrModal && (
        <VietQRModal
          order={qrModal}
          onClose={() => setQrModal(null)}
          onPaid={() => qc.invalidateQueries({ queryKey: ['orders'] })}
        />
      )}
    </>
  );
}
