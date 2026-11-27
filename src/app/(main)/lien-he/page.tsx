'use client';
import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import api from '@/lib/axios';

const PHONE = process.env.NEXT_PUBLIC_PHONE || '0915594103';
const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
const CONTACT_EMAIL = 'ubtechvietnam@ipptech.com.vn';
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError('');
    try {
      if (WEB3FORMS_ACCESS_KEY) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...form,
            subject: form.subject.trim() || 'Yêu cầu tư vấn từ UBTECH Việt Nam',
            access_key: WEB3FORMS_ACCESS_KEY,
          }),
        });
        const data = await response.json();
        if (!response.ok || data?.success !== true) {
          if (response.status === 429) {
            setError('Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.');
            return;
          }
          throw new Error('Web3Forms did not accept the contact request');
        }
      } else {
        const { data } = await api.post<{ success?: boolean }>('/contact', form);
        if (data?.success !== true) throw new Error('Contact request was not accepted');
      }
      setSent(true);
    } catch (err) {
      const response = isAxiosError<{ message?: string }>(err) ? err.response : undefined;
      const message = response && [400, 429, 502, 503].includes(response.status)
        ? response.data?.message
        : undefined;
      setError(message || 'Chưa thể gửi yêu cầu. Vui lòng thử lại hoặc liên hệ qua hotline.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-[#001F6B] to-[#0057FF] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-3">LIÊN HỆ</p>
          <h1 className="text-4xl font-black mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-blue-100">Đội ngũ chuyên gia UBTECH Việt Nam sẵn sàng hỗ trợ bạn</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-black text-[#1A1F36] mb-6">Thông tin liên hệ</h2>
            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Hotline', value: PHONE, href: `tel:${PHONE}`, color: 'bg-blue-50 text-blue-600' },
                { icon: MessageCircle, label: 'Zalo', value: ZALO, href: `https://zalo.me/${ZALO}`, color: 'bg-green-50 text-green-600' },
                { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: 'bg-purple-50 text-purple-600' },
                { icon: MapPin, label: 'Địa chỉ', value: 'TP. Hồ Chí Minh, Việt Nam', href: null, color: 'bg-orange-50 text-orange-600' },
                { icon: Clock, label: 'Giờ làm việc', value: 'Thứ 2 – Thứ 7: 8:00 – 18:00', href: null, color: 'bg-gray-50 text-gray-600' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF] font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        className="font-semibold text-[#1A1F36] hover:text-[#0057FF] transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-semibold text-[#1A1F36]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#EEF3FF] to-white rounded-2xl border border-blue-100">
              <p className="font-bold text-[#1A1F36] mb-2">Về UBTECH Việt Nam</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                Công ty TNHH Công nghệ và Giáo dục IPP (IPPTech) — thuộc Tập đoàn Liên Thái Bình Dương (IPPG) — là Nhà Phân Phối Độc Quyền Chính Hãng UBTECH Robotics Corp. tại Việt Nam từ năm 2019.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-black text-[#1A1F36] mb-6">Gửi yêu cầu tư vấn</h2>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1F36] mb-2">Cảm ơn bạn đã liên hệ!</h3>
                <p className="text-[#6B7280]">Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" aria-busy={sending}>
                {([
                  { field: 'name', label: 'Họ và tên *', type: 'text', placeholder: 'Nguyễn Văn A', required: true, maxLength: 120 },
                  { field: 'phone', label: 'Số điện thoại *', type: 'tel', placeholder: '0912 345 678', required: true, maxLength: 30 },
                  { field: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com', required: false, maxLength: 254 },
                  { field: 'subject', label: 'Chủ đề', type: 'text', placeholder: 'Tư vấn sản phẩm / Hợp tác...', required: false, maxLength: 160 },
                ] as const).map(item => (
                  <div key={item.field}>
                    <label htmlFor={`contact-${item.field}`} className="block text-sm font-semibold text-[#374151] mb-1.5">{item.label}</label>
                    <input
                      id={`contact-${item.field}`}
                      type={item.type}
                      placeholder={item.placeholder}
                      required={item.required}
                      maxLength={item.maxLength}
                      value={form[item.field]}
                      onChange={e => setForm(f => ({ ...f, [item.field]: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl text-sm focus:outline-none focus:border-[#0057FF] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-[#374151] mb-1.5">Nội dung</label>
                  <textarea
                    id="contact-message"
                    placeholder="Mô tả nhu cầu của bạn..."
                    rows={4}
                    maxLength={3000}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl text-sm focus:outline-none focus:border-[#0057FF] transition-colors resize-none"
                  />
                </div>
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                <button type="submit" disabled={sending}
                  className="w-full py-3.5 bg-[#0057FF] text-white font-bold rounded-xl hover:bg-[#003DA5] disabled:opacity-60 transition-colors shadow-lg shadow-blue-200 text-sm">
                  {sending ? 'Đang gửi…' : 'Gửi yêu cầu tư vấn'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
