'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/auth.store';
import { Eye, EyeOff, Loader2, Bot, Check } from 'lucide-react';

// FIX: thêm transform normalize phone (xóa spaces/dấu gạch) trước khi validate
const schema = z.object({
  name:     z.string().min(2, 'Tên ít nhất 2 ký tự'),
  email:    z.string().email('Email không hợp lệ'),
  phone:    z
    .string()
    .optional()
    .transform(val => val ? val.replace(/[\s\-().]/g, '') : val)
    .refine(
      val => !val || /^(0|\+84)[0-9]{8,9}$/.test(val),
      { message: 'SĐT không hợp lệ (VD: 0912345678)' }
    ),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  confirm:  z.string(),
}).refine(d => d.password === d.confirm, { message: 'Mật khẩu không khớp', path: ['confirm'] });

type Form = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: reg, isLoading } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const pw = watch('password', '');
  const strength = !pw ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500'];
  const strengthLabel = ['', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];

  const onSubmit = async (d: Form) => {
    setError('');
    try {
      await reg(d.name, d.email, d.password, d.phone as string | undefined);
      router.push('/');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
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
          <h1 className="text-2xl font-black text-[#1A1F36]">Tạo tài khoản</h1>
          <p className="text-[#6B7280] text-sm mt-1">Chỉ mất 1 phút để bắt đầu</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E8EF] shadow-sm p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { key: 'name'  as const, label: 'Họ tên',                       type: 'text',  ph: 'Nguyễn Văn A' },
              { key: 'email' as const, label: 'Email',                         type: 'email', ph: 'ban@email.com' },
              // FIX: placeholder không có dấu cách để tránh user copy/paste bị lỗi validation
              { key: 'phone' as const, label: 'Số điện thoại (tùy chọn)',      type: 'tel',   ph: '0912345678' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs font-bold text-[#1A1F36] mb-1.5 block uppercase tracking-wide">
                  {f.label}
                </label>
                <input
                  {...register(f.key)}
                  type={f.type}
                  placeholder={f.ph}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all"
                />
                {errors[f.key] && (
                  <p className="text-red-500 text-xs mt-1">{(errors[f.key] as any)?.message}</p>
                )}
              </div>
            ))}

            <div>
              <label className="text-xs font-bold text-[#1A1F36] mb-1.5 block uppercase tracking-wide">Mật khẩu</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Ít nhất 6 ký tự"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pw && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-[#E4E8EF]'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-1">{strengthLabel[strength]}</p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-[#1A1F36] mb-1.5 block uppercase tracking-wide">Xác nhận mật khẩu</label>
              <input
                {...register('confirm')}
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-3.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all"
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-[#0057FF] text-white font-bold hover:bg-[#003DC2] transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tạo...</> : 'Tạo tài khoản'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Đã có tài khoản?{' '}
          <Link href="/dang-nhap" className="text-[#0057FF] font-bold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
