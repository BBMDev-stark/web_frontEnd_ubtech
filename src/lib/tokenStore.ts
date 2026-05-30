/**
 * FIX B-05: Token Memory Store
 *
 * accessToken KHÔNG được lưu trong localStorage vì dễ bị XSS đánh cắp.
 * Lưu trong module-level variable (memory) — biến mất khi reload trang,
 * nhưng axios interceptor sẽ tự refresh qua HttpOnly cookie.
 *
 * refreshToken vẫn dùng HttpOnly cookie (đúng cách, server set).
 */

let _accessToken: string | null = null;

export const tokenStore = {
  get: (): string | null => _accessToken,

  set: (token: string): void => {
    _accessToken = token;
  },

  clear: (): void => {
    _accessToken = null;
  },
};
