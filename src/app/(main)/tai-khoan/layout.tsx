'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, MapPin, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/tai-khoan',             icon: User,    label: 'Thông tin cá nhân' },
  { href: '/tai-khoan/don-hang',    icon: Package, label: 'Đơn hàng của tôi' },
  { href: '/tai-khoan/dia-chi',     icon: MapPin,  label: 'Địa chỉ giao hàng' },
  { href: '/tai-khoan/mat-khau',    icon: Lock,    label: 'Đổi mật khẩu' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl font-black text-[#1A1F36] mb-6">Tài khoản của tôi</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-[#E4E8EF] overflow-hidden">
            {LINKS.map(item => (
              <Link key={item.href} href={item.href}
                className={cn('flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-b border-[#E4E8EF] last:border-0',
                  pathname === item.href ? 'bg-[#EEF3FF] text-[#0057FF]' : 'text-[#1A1F36] hover:bg-[#F5F7FA] hover:text-[#0057FF]')}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
