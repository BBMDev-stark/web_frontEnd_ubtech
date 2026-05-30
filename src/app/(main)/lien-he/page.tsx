'use client';
import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const PHONE = process.env.NEXT_PUBLIC_PHONE || '0915594103';
const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
                { icon: Mail, label: 'Email', value: 'info@ubtechvietnam.edu.vn', href: 'mailto:info@ubtechvietnam.edu.vn', color: 'bg-purple-50 text-purple-600' },
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { field: 'name', label: 'Họ và tên *', type: 'text', placeholder: 'Nguyễn Văn A', required: true },
                  { field: 'phone', label: 'Số điện thoại *', type: 'tel', placeholder: '0912 345 678', required: true },
                  { field: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com', required: false },
                  { field: 'subject', label: 'Chủ đề', type: 'text', placeholder: 'Tư vấn sản phẩm / Hợp tác...', required: false },
                ].map(item => (
                  <div key={item.field}>
                    <label className="block text-sm font-semibold text-[#374151] mb-1.5">{item.label}</label>
                    <input
                      type={item.type}
                      placeholder={item.placeholder}
                      required={item.required}
                      value={(form as any)[item.field]}
                      onChange={e => setForm(f => ({ ...f, [item.field]: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl text-sm focus:outline-none focus:border-[#0057FF] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Nội dung</label>
                  <textarea
                    placeholder="Mô tả nhu cầu của bạn..."
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl text-sm focus:outline-none focus:border-[#0057FF] transition-colors resize-none"
                  />
                </div>
                <button type="submit"
                  className="w-full py-3.5 bg-[#0057FF] text-white font-bold rounded-xl hover:bg-[#003DA5] transition-colors shadow-lg shadow-blue-200 text-sm">
                  Gửi yêu cầu tư vấn
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
