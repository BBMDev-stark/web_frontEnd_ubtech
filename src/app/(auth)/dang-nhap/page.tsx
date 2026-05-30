'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth.store';
import { Eye, EyeOff, Loader2, Bot } from 'lucide-react';

const schema = z.object({
  email:    z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});
type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (d: Form) => {
    setError('');
    try { await login(d.email, d.password); router.push('/'); }
    catch (e: any) { setError(e?.response?.data?.message || 'Email hoặc mật khẩu không đúng'); }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0057FF] flex items-center justify-center shadow-lg">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-[#0057FF] leading-tight">UBTECH</p>
              <p className="text-xs text-[#6B7280] font-medium">Việt Nam</p>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-[#1A1F36]">Đăng nhập</h1>
          <p className="text-[#6B7280] text-sm mt-1">Chào mừng bạn trở lại!</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E8EF] shadow-sm p-8">
          {error && <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#1A1F36] mb-1.5 block uppercase tracking-wide">Email</label>
              <input {...register('email')} type="email" placeholder="ban@email.com"
                className="w-full px-4 py-3.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide">Mật khẩu</label>
                <Link href="/quen-mat-khau" className="text-xs text-[#0057FF] hover:underline">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isLoading}
              className="w-full py-4 rounded-xl bg-[#0057FF] text-white font-bold hover:bg-[#003DC2] transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...</> : 'Đăng nhập'}
            </button>
          </form>

          <div className="border-t border-[#E4E8EF] mt-6 pt-4">
            <p className="text-xs text-[#9CA3AF] mb-2 font-medium">Tài khoản demo:</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="font-semibold text-purple-600">Admin</span><span className="text-[#9CA3AF] font-mono">admin@ecommerce.vn / Admin@123456</span></div>
              <div className="flex justify-between"><span className="font-semibold text-green-600">Customer</span><span className="text-[#9CA3AF] font-mono">nguyenvanan@gmail.com / Customer@123</span></div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/dang-ky" className="text-[#0057FF] font-bold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}
