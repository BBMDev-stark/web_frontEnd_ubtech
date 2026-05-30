// src/store/cart.store.ts
import { create } from 'zustand';
import api from '@/lib/axios';

export interface CartItem {
  _id: string;
  product: string;         // ObjectId string
  variantId: string | null;
  variantName: string;
  name: string;
  slug: string;            // slug để link tới trang SP
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

interface CouponInfo {
  discountAmount: number;
  finalAmount: number;
}

interface CartStore {
  items:       CartItem[];
  totalItems:  number;
  totalAmount: number;
  couponCode:  string | null;
  discount:    number;
  isLoading:   boolean;

  fetchCart:      () => Promise<void>;
  addToCart:      (productId: string, quantity?: number, variantId?: string | null) => Promise<void>;
  updateItem:     (itemId: string, quantity: number) => Promise<void>;
  removeItem:     (itemId: string) => Promise<void>;
  clearCart:      () => Promise<void>;
  applyCoupon:    (code: string) => Promise<CouponInfo>;
  removeCoupon:   () => Promise<void>;
  // FIX B-13: reset local state mà không gọi API (dùng khi forceLogout)
  resetLocalCart: () => void;
}

const syncFromResponse = (data: any) => ({
  items:       data.items       || [],
  totalItems:  data.totalItems  || 0,
  totalAmount: data.totalAmount || 0,
  couponCode:  data.couponCode  || null,
});

export const useCartStore = create<CartStore>((set, get) => ({
  items:       [],
  totalItems:  0,
  totalAmount: 0,
  couponCode:  null,
  discount:    0,
  isLoading:   false,

  // ── Lấy giỏ hàng từ server ────────────────────────
  fetchCart: async () => {
    try {
      const { data } = await api.get('/cart');
      set(syncFromResponse(data.data));
      // Nếu có couponCode đang active → tính lại discount từ server
      // (discount không persist trong DB, chỉ couponCode persist)
      // Discount sẽ được tính lại khi user áp dụng lại hoặc tại checkout
    } catch {}
  },

  // ── Thêm vào giỏ ──────────────────────────────────
  addToCart: async (productId, quantity = 1, variantId) => {
    set({ isLoading: true });
    try {
      const body: Record<string, unknown> = { productId, quantity };
      if (variantId) body.variantId = variantId;  // chỉ gửi nếu có variantId

      const { data } = await api.post('/cart', body);
      set(syncFromResponse(data.data));
    } finally {
      set({ isLoading: false });
    }
  },

  // ── Cập nhật số lượng (quantity < 1 → xóa item) ───
  updateItem: async (itemId, quantity) => {
    if (quantity < 1) {
      return get().removeItem(itemId);
    }
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    set(syncFromResponse(data.data));
  },

  // ── Xóa 1 item ────────────────────────────────────
  removeItem: async (itemId) => {
    const { data } = await api.delete(`/cart/${itemId}`);
    set(syncFromResponse(data.data));
  },

  // ── Xóa toàn bộ giỏ ───────────────────────────────
  clearCart: async () => {
    await api.delete('/cart');
    set({ items: [], totalItems: 0, totalAmount: 0, couponCode: null, discount: 0 });
  },

  // ── Áp dụng coupon ────────────────────────────────
  applyCoupon: async (code) => {
    const { data } = await api.post('/cart/coupon', { couponCode: code.trim().toUpperCase() });
    set({
      couponCode: data.data.couponCode,
      discount:   data.data.discountAmount,
    });
    return {
      discountAmount: data.data.discountAmount,
      finalAmount:    data.data.finalAmount,
    };
  },

  // ── Hủy coupon ────────────────────────────────────
  removeCoupon: async () => {
    await api.delete('/cart/coupon');
    set({ couponCode: null, discount: 0 });
  },

  // FIX B-13: Reset local cart state mà không gọi API
  // Dùng khi bị forceLogout từ axios interceptor
  resetLocalCart: () => {
    set({ items: [], totalItems: 0, totalAmount: 0, couponCode: null, discount: 0, isLoading: false });
  },
}));
