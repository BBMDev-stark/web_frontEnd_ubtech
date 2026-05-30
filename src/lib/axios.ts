// src/lib/axios.ts
import axios from 'axios';
import { tokenStore } from './tokenStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // gửi HttpOnly cookie refreshToken tự động
  headers: { 'Content-Type': 'application/json' },
});

// ── FIX B-05: Gắn accessToken từ memory (không dùng localStorage) ────────
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Tự động refresh token khi hết hạn (401) ──────────────────────────────
let isRefreshing = false;
let failedQueue: { resolve: (v: string) => void; reject: (e: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  failedQueue = [];
};

// FIX B-13: Reset toàn bộ app state khi bị logout forced
// Lazy import để tránh circular dependency với stores
const forceLogout = () => {
  tokenStore.clear();

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useCartStore } = require('@/store/cart.store');
    useCartStore.getState().resetLocalCart();
  } catch {}

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useAuthStore } = require('@/store/auth.store');
    useAuthStore.getState().clearUser();
  } catch {}

  if (typeof window !== 'undefined') {
    window.location.href = '/dang-nhap';
  }
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = data.accessToken;
        // FIX B-05: lưu vào memory, không localStorage
        tokenStore.set(newToken);
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (err) {
        processQueue(err, null);
        // FIX B-13: clear toàn bộ state trước khi redirect
        forceLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
