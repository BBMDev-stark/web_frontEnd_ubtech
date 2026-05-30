'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import api from '@/lib/axios';

const schema = z.object({
  currentPassword: z.string().min(1, 'Nhập mật khẩu hiện tại'),
  newPassword:     z.string().min(6, 'Mật khẩu mới ít nhất 6 ký tự'),
  confirm:         z.string(),
}).refine(d => d.newPassword === d.confirm, { message: 'Mật khẩu không khớp', path: ['confirm'] });
type Form = z.infer<typeof schema>;

export default function ChangePasswordPage() {
  const [show,    setShow]    = useState({ cur: false, new: false, cfm: false });
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = async (d: Form) => {
    setSaving(true); setError(''); setSuccess(false);
    try { await api.put('/users/change-password', { currentPassword: d.currentPassword, newPassword: d.newPassword }); setSuccess(true); reset(); }
    catch (e: any) { setError(e?.response?.data?.message || 'Đổi mật khẩu thất bại'); }
    finally { setSaving(false); }
  };
  const fields = [
    { key: 'currentPassword' as const, label: 'Mật khẩu hiện tại', show: show.cur, toggle: () => setShow(s => ({ ...s, cur: !s.cur })) },
    { key: 'newPassword'     as const, label: 'Mật khẩu mới',       show: show.new, toggle: () => setShow(s => ({ ...s, new: !s.new })) },
    { key: 'confirm'         as const, label: 'Xác nhận mật khẩu',  show: show.cfm, toggle: () => setShow(s => ({ ...s, cfm: !s.cfm })) },
  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E4E8EF] p-6 max-w-md">
      <h3 className="font-bold text-[#1A1F36] mb-5">Đổi mật khẩu</h3>
      {error   && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" />Đổi mật khẩu thành công!</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-[#6B7280] mb-1.5 block">{f.label}</label>
            <div className="relative">
              <input {...register(f.key)} type={f.show ? 'text' : 'password'} placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all" />
              <button type="button" onClick={f.toggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]?.message}</p>}
          </div>
        ))}
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0057FF] text-white font-semibold text-sm hover:bg-[#003DC2] transition-colors disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}
