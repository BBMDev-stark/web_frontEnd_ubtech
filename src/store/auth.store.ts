'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { tokenStore } from '@/lib/tokenStore';

export interface User {
  _id: string; name: string; email: string; phone?: string;
  avatar?: string; role: 'admin' | 'editor' | 'customer';
}

interface AuthStore {
  user: User | null; accessToken: string | null; isLoading: boolean;
  login:     (email: string, password: string) => Promise<void>;
  register:  (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout:    () => Promise<void>;
  setUser:   (user: User) => void;
  clearUser: () => void; // FIX B-13: dùng bởi forceLogout
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, accessToken: null, isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          // FIX B-05: lưu accessToken vào memory, không localStorage
          tokenStore.set(data.accessToken);
          set({ user: data.user, accessToken: data.accessToken });
        } finally { set({ isLoading: false }); }
      },

      register: async (name, email, password, phone) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register', { name, email, password, phone });
          // FIX B-05: lưu accessToken vào memory, không localStorage
          tokenStore.set(data.accessToken);
          set({ user: data.user, accessToken: data.accessToken });
        } finally { set({ isLoading: false }); }
      },

      logout: async () => {
        try { await api.post('/auth/logout'); } catch {}
        // FIX B-05: clear memory token thay localStorage
        tokenStore.clear();
        set({ user: null, accessToken: null });
      },

      setUser: (user) => set({ user }),

      // FIX B-13: dùng bởi forceLogout trong axios interceptor
      clearUser: () => {
        tokenStore.clear();
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: 'auth-storage',
      // Chỉ persist user info (không persist accessToken — token lưu trong memory)
      partialize: (s) => ({ user: s.user }),
    }
  )
);
