'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import api from '@/lib/axios';

const schema = z.object({
  name:  z.string().min(2, 'Tên ít nhất 2 ký tự'),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,9}$/, 'SĐT không hợp lệ').optional().or(z.literal('')),
});
type Form = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [saved,  setSaved]  = useState(false);
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name || '', phone: user?.phone || '' },
  });
  const onSubmit = async (data: Form) => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const r = await api.put('/users/profile', data);
      setUser(r.data.data); setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (e: any) { setError(e?.response?.data?.message || 'Cập nhật thất bại'); }
    finally { setSaving(false); }
  };
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-[#E4E8EF] p-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#0057FF] flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-lg text-[#1A1F36]">{user?.name}</p>
          <p className="text-[#6B7280] text-sm">{user?.email}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-semibold capitalize">
            {user?.role === 'admin' ? 'Admin' : 'Khách hàng'}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E4E8EF] p-6">
        <h3 className="font-bold text-[#1A1F36] mb-5">Thông tin cá nhân</h3>
        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
        {saved && <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" />Đã lưu thành công!</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <div>
            <label className="text-xs font-semibold text-[#6B7280] mb-1.5 block">Email (không thể thay đổi)</label>
            <input value={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-[#E4E8EF] text-[#9CA3AF] text-sm bg-[#F5F7FA] cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6B7280] mb-1.5 block">Họ tên *</label>
            <input {...register('name')} className="w-full px-4 py-3 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold text-[#6B7280] mb-1.5 block">Số điện thoại</label>
            <input {...register('phone')} placeholder="0909 123 456" className="w-full px-4 py-3 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all placeholder:text-[#9CA3AF]" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0057FF] text-white font-semibold text-sm hover:bg-[#003DC2] transition-colors disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
}
