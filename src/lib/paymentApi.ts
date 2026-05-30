// src/lib/paymentApi.ts
// Tiện ích gọi API payment — tách riêng để dễ tái sử dụng
import api from './axios';

export interface VietQRData {
  bankName      : string;
  accountNumber : string;
  accountName   : string;
  amount        : number;
  content       : string;
  qrUrl         : string;
  orderCode     : string;
}

export interface PaymentStatusResult {
  found         : boolean;
  orderCode     : string;
  paymentStatus : 'unpaid' | 'paid' | 'refunded';
  orderStatus   : string;
  paidAt        : string | null;
  transactionId : string | null;
}

/** Tạo yêu cầu thanh toán VietQR, trả về dữ liệu QR */
export async function createVietQRPayment(orderId: string): Promise<VietQRData> {
  const { data } = await api.post('/payments/create', { orderId, provider: 'vietqr' });
  if (!data.success) throw new Error(data.message || 'Tạo QR thất bại');
  return data.data as VietQRData;
}

/** Kiểm tra trạng thái thanh toán — dùng cho polling 5 giây.
 *  Dùng fetch thuần (không cần JWT) vì endpoint là PUBLIC. */
export async function checkPaymentStatus(orderCode: string): Promise<PaymentStatusResult> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const res = await fetch(`${baseUrl}/payments/vietqr/status/${encodeURIComponent(orderCode)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.data as PaymentStatusResult;
}
