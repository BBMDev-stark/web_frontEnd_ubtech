import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));

export const formatDateTime = (date: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));

export const getOrderStatus = (status: string) => {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending:    { label: 'Chờ xác nhận', color: '#D97706', bg: '#FEF3C7' },
    confirmed:  { label: 'Đã xác nhận',  color: '#2563EB', bg: '#DBEAFE' },
    processing: { label: 'Đang xử lý',   color: '#7C3AED', bg: '#EDE9FE' },
    shipped:    { label: 'Đang giao',     color: '#0891B2', bg: '#CFFAFE' },
    delivered:  { label: 'Đã giao',       color: '#059669', bg: '#D1FAE5' },
    cancelled:  { label: 'Đã hủy',        color: '#DC2626', bg: '#FEE2E2' },
    refunded:   { label: 'Hoàn tiền',     color: '#6B7280', bg: '#F3F4F6' },
  };
  return map[status] || { label: status, color: '#6B7280', bg: '#F3F4F6' };
};

// Lấy ảnh chính hoặc placeholder phù hợp UBTECH
export const getProductImage = (images?: { url: string; isPrimary: boolean }[]) => {
  if (!images || images.length === 0) return '/placeholder-product.png';
  return images.find(i => i.isPrimary)?.url || images[0]?.url || '/placeholder-product.png';
};

export const getDisplayPrice = (product: {
  basePrice?: number; salePrice?: number;
  variants?: { price: number; salePrice?: number; isActive?: boolean }[];
}) => {
  if (product.variants && product.variants.length > 0) {
    const active = product.variants.filter(v => v.isActive !== false);
    if (active.length > 0) {
      const prices = active.map(v => v.salePrice || v.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return { min, max, isRange: min !== max };
    }
  }
  return {
    min: product.salePrice || product.basePrice || 0,
    max: product.basePrice || 0,
    isRange: false,
  };
};
