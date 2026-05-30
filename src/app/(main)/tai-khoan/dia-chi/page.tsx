'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Star, Loader2, X } from 'lucide-react';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';

const fetchAddresses = () => api.get('/users/addresses').then(r => r.data.data);
type AddrForm = { label: string; fullName: string; phone: string; province: string; district: string; ward: string; street: string; };
const empty: AddrForm = { label: 'Nhà', fullName: '', phone: '', province: '', district: '', ward: '', street: '' };

export default function AddressPage() {
  const qc = useQueryClient();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<AddrForm>(empty);
  const [err,  setErr]  = useState('');
  const { data: addrs = [], isLoading } = useQuery({ queryKey: ['addresses'], queryFn: fetchAddresses });
  const invalidate = () => qc.invalidateQueries({ queryKey: ['addresses'] });
  const addMut     = useMutation({ mutationFn: (d: AddrForm) => api.post('/users/addresses', d), onSuccess: () => { invalidate(); setShow(false); setForm(empty); }, onError: (e: any) => setErr(e?.response?.data?.message || 'Thất bại') });
  const delMut     = useMutation({ mutationFn: (id: string) => api.delete(`/users/addresses/${id}`), onSuccess: invalidate });
  const defMut     = useMutation({ mutationFn: (id: string) => api.put(`/users/addresses/${id}/default`), onSuccess: invalidate });
  const f = (key: keyof AddrForm) => ({ value: form[key], onChange: (e: any) => setForm(p => ({ ...p, [key]: e.target.value })) });
  const handleAdd = () => {
    setErr('');
    if (!form.fullName || !form.phone || !form.province || !form.district || !form.ward || !form.street) { setErr('Vui lòng điền đầy đủ'); return; }
    addMut.mutate(form);
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1A1F36] text-lg">Địa chỉ giao hàng</h3>
        {addrs.length < 5 && (
          <button onClick={() => setShow(!show)} className={cn('flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border', show ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-[#0057FF]/30 text-[#0057FF] hover:bg-[#EEF3FF]')}>
            {show ? <><X className="w-4 h-4" /> Đóng</> : <><Plus className="w-4 h-4" /> Thêm địa chỉ</>}
          </button>
        )}
      </div>
      {show && (
        <div className="bg-white rounded-2xl border border-[#E4E8EF] p-5 space-y-3">
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <div className="grid sm:grid-cols-2 gap-3">
            {([['label','Nhãn','Nhà, Công ty...'],['fullName','Họ tên *','Nguyễn Văn A'],['phone','SĐT *','0909...'],['province','Tỉnh/Thành *','TP. HCM'],['district','Quận/Huyện *','Quận 1'],['ward','Phường/Xã *','P. Bến Nghé']] as [keyof AddrForm, string, string][]).map(([key, label, ph]) => (
              <div key={key}>
                <label className="text-xs font-semibold text-[#6B7280] mb-1 block">{label}</label>
                <input {...f(key)} placeholder={ph} className="w-full px-3 py-2.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all placeholder:text-[#9CA3AF]" />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#6B7280] mb-1 block">Địa chỉ cụ thể *</label>
              <input {...f('street')} placeholder="123 Nguyễn Huệ" className="w-full px-3 py-2.5 rounded-xl border border-[#E4E8EF] text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF] bg-[#F5F7FA] focus:bg-white transition-all placeholder:text-[#9CA3AF]" />
            </div>
          </div>
          <button onClick={handleAdd} disabled={addMut.isPending} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-semibold hover:bg-[#003DC2] transition-colors disabled:opacity-50">
            {addMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Lưu địa chỉ
          </button>
        </div>
      )}
      {isLoading ? <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 text-[#0057FF] animate-spin" /></div>
        : addrs.length === 0 ? <div className="text-center py-12 text-[#9CA3AF] bg-white rounded-2xl border border-[#E4E8EF]">Chưa có địa chỉ nào</div>
        : <div className="space-y-3">{addrs.map((addr: any) => (
          <div key={addr._id} className={cn('p-4 rounded-2xl border-2 bg-white transition-colors', addr.isDefault ? 'border-[#0057FF]' : 'border-[#E4E8EF]')}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-[#1A1F36]">{addr.label}</span>
                  {addr.isDefault && <span className="px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-semibold">Mặc định</span>}
                </div>
                <p className="text-sm text-[#374151]">{addr.fullName} • {addr.phone}</p>
                <p className="text-sm text-[#6B7280]">{addr.street}, {addr.ward}, {addr.district}, {addr.province}</p>
              </div>
              <div className="flex items-center gap-1">
                {!addr.isDefault && (
                  <button onClick={() => defMut.mutate(addr._id)} title="Đặt mặc định" className="p-2 rounded-xl text-[#9CA3AF] hover:text-amber-500 hover:bg-amber-50 transition-all">
                    <Star className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => { if (confirm('Xóa địa chỉ này?')) delMut.mutate(addr._id); }} className="p-2 rounded-xl text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}</div>}
    </div>
  );
}
