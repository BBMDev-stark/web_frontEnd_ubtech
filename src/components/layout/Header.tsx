'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Search, ShoppingCart, Menu, X, ChevronDown, LogOut,
  Package, MapPin, Lock, Bot, Phone, MessageCircle,
  User as UserIcon, ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { cn, formatPrice } from '@/lib/utils';
import api from '@/lib/axios';

const ZALO  = process.env.NEXT_PUBLIC_ZALO_PHONE || '0915594103';
const PHONE = process.env.NEXT_PUBLIC_PHONE || ZALO;

interface SuggestItem {
  _id: string; name: string; slug: string;
  images: { url: string; isPrimary: boolean }[];
  basePrice: number; salePrice?: number;
}

const MEGA_SECTIONS = [
  {
    title: 'ROBOT DỊCH VỤ',
    items: [
      { name: 'ADIBOT',       slug: 'adibot',      img: 'https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz', desc: 'Robot khử khuẩn UV-C' },
      { name: 'CRUZR',        slug: 'cruzr',        img: 'https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew', desc: 'Robot dịch vụ khách hàng' },
      { name: 'CADEBOT L100', slug: 'cadebot',      img: 'https://lh3.googleusercontent.com/d/1K5Tue2ITNasEiUJr2EM0HEueqvkToP9A', desc: 'Robot giao hàng tự động' },
    ],
  },
  {
    title: 'ROBOT GIÁO DỤC',
    items: [
      { name: 'YANSHEE',    slug: 'yanshee',   img: 'https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L', desc: 'Robot humanoid 17 servo' },
      { name: 'ALPHA MINI', slug: 'alpha-mini',img: 'https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-', desc: 'Robot mini 14 servo' },
      { name: 'ALPHA 1E',   slug: 'alpha-1e',  img: 'https://lh3.googleusercontent.com/d/1ZQfOilItslY3d5U_NPNvVLIqeYnMFiVO', desc: 'Robot giáo dục 16 servo' },
      { name: 'AI UGOT',    slug: 'ai-ugot',   img: 'https://lh3.googleusercontent.com/d/17-nzBOR9sO5C7wtX3TQLTj0nFGD6VwQm', desc: 'Robot mô-đun AI' },
      { name: 'WALKER S1',  slug: 'walker-s1', img: 'https://lh3.googleusercontent.com/d/1SEj7W9nXw8Axw8MUv8-z2Wk-9PhTPtpq', desc: 'Humanoid 36 DoF' },
      { name: 'WALKER E',   slug: 'walker-e',  img: 'https://lh3.googleusercontent.com/d/10iW5rVSC6C8LJSYv-nnoMycM9Nl6iLzF', desc: 'Humanoid thế hệ mới' },
    ],
  },
  {
    title: 'BỘ KIT JIMU',
    items: [
      { name: 'SCOREBOT',   slug: 'scorebot-kit',   img: 'https://lh3.googleusercontent.com/d/1kbjVT3GT8MnD6KA7vJJJYsZ07l-bI1AE', desc: 'Robot bóng đá' },
      { name: 'COURTBOT',   slug: 'courtbot-kit',   img: 'https://lh3.googleusercontent.com/d/1GjW_zAWyPNv2S9lgQPOeanmXYGUqLASd', desc: 'Robot bóng rổ' },
      { name: 'ASTROBOT',   slug: 'astrobot-kit',   img: 'https://ubtechvietnam.edu.vn/wp-content/uploads/2021/03/Astrobot_01.jpg', desc: 'Robot vũ trụ' },
      { name: 'TRACKBOT',   slug: 'trackbot-kit',   img: 'https://lh3.googleusercontent.com/d/1fTAP4QJNJx7hj5ajuTTCNRxlU9WGDxsQ', desc: 'Robot địa hình' },
      { name: 'UNICORNBOT', slug: 'unicornbot-kit', img: 'https://lh3.googleusercontent.com/d/1hOwSthB6t45QUEgFvVuybhOlB_UvfKXk', desc: 'Robot kỳ lân' },
    ],
  },
  {
    title: 'BỘ KIT AI',
    items: [
      { name: 'AI FANTASY ZOO',     slug: 'ai-fantasy-zoo',          img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K1-K3' },
      { name: 'AI SMART LIFE',      slug: 'ai-smart-life',           img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K4-K6' },
      { name: 'AI TRANSFORMER',     slug: 'ai-transformer-workshop', img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K7-K9' },
      { name: 'AI SUPER ASSISTANT', slug: 'ai-super-asistant',       img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K5-K8' },
      { name: 'AI SUPER ENGINEER',  slug: 'ai-super-engineer',       img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K9-K12' },
      { name: 'AI SUPER DESIGNER',  slug: 'ai-super-designer-1',     img: 'https://lh3.googleusercontent.com/d/12FekyybqvXMnb1dnFhjKNFG06H_cOYNf', desc: 'K8-K10' },
    ],
  },
  {
    title: 'SÁCH',
    items: [
      { name: 'AI FANTASY ZOO T1',     slug: 'sach-ai-fantasy-zoo-tap-1',        img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-FANTASY-ZOO-1.webp',          desc: 'Cap 1 - Tap 1' },
      { name: 'AI FANTASY ZOO T2',     slug: 'sach-ai-fantasy-zoo-tap-2',        img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-FANTASY-ZOO-2.webp',          desc: 'Cap 1 - Tap 2' },
      { name: 'AI SMART LIFE T1',      slug: 'sach-ai-smart-life-tap-1',         img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SMART-LIFE-1.webp',           desc: 'Cap 1 - Tap 1' },
      { name: 'AI SMART LIFE T2',      slug: 'sach-ai-smart-life-tap-2',         img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SMART-LIFE-2-1.webp',         desc: 'Cap 1 - Tap 2' },
      { name: 'AI MAGIC WORLD T1',     slug: 'sach-ai-magic-world-tap-1',        img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-MAGIC-WORLD-1.webp',          desc: 'Cap 1 - Tap 1' },
      { name: 'AI MAGIC WORLD T2',     slug: 'sach-ai-magic-world-tap-2',        img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-MAGIC-WORLD-2.webp',          desc: 'Cap 1 - Tap 2' },
      { name: 'AI TRANSFORMER WS T1',  slug: 'sach-ai-transformer-workshop-tap-1', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-TRANSFORMER-WORKSHOP-1.webp', desc: 'Cap 2 - Tap 1' },
      { name: 'AI TRANSFORMER WS T2',  slug: 'sach-ai-transformer-workshop-tap-2', img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-TRANSFORMER-WORKSHOP-2.webp', desc: 'Cap 2 - Tap 2' },
      { name: 'AI SUPER ASSISTANT T1', slug: 'sach-ai-super-assistant-tap-1',    img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-Super-Assistant-1-1.webp',    desc: 'Cap 2 - Tap 1' },
      { name: 'AI SUPER ASSISTANT T2', slug: 'sach-ai-super-assistant-tap-2',    img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-Super-Assistan-2-1.webp',     desc: 'Cap 2 - Tap 2' },
      { name: 'AI SUPER ENGINEER T1',  slug: 'sach-ai-super-engineer-tap-1',     img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SuperEngineer-1.webp',        desc: 'Cap 3 - Tap 1' },
      { name: 'AI SUPER ENGINEER T2',  slug: 'sach-ai-super-engineer-tap-2',     img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-Super-Engineer-2.webp',       desc: 'Cap 3 - Tap 2' },
      { name: 'AI SUPER DESIGNER T1',  slug: 'sach-ai-super-designer-tap-1',     img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SUPER-DESIGNER-1.webp',       desc: 'Cap 3 - Tap 1' },
      { name: 'AI SUPER DESIGNER T2',  slug: 'sach-ai-super-designer-tap-2',     img: 'https://s4h.edu.vn/wp-content/uploads/2024/01/AI-SUPER-DESIGNER-2.webp',       desc: 'Cap 3 - Tap 2' },
    ],
  },
];

const PLAIN_NAV = [
  { label: 'AI & Robotic Giáo Dục', href: '/ai-robotic-giao-duc' },
  { label: 'Chương Trình K12',       href: '/chuong-trinh-k12' },
  {
    label: 'Giới Thiệu',
    href: '/gioi-thieu',
    dropdown: [
      { label: 'Về Chúng Tôi',      href: '/gioi-thieu',  desc: 'Về UBTECH & IPPG' },
      { label: 'Công Nghệ AI',       href: '/cong-nghe',   desc: 'Công nghệ cốt lõi' },
      { label: 'Phần Mềm & App',     href: '/phan-mem',    desc: 'Tải ứng dụng UBTECH' },
      { label: 'A.I. Center',        href: '/ai-center',   desc: 'Trung tâm AI Giáo Dục' },
    ],
  },
  { label: 'Tin Tức',                href: '/tin-tuc' },
  { label: 'Liên Hệ',               href: '/lien-he' },
];

export default function Header() {
  const router   = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { totalItems, fetchCart } = useCartStore();
  const [search, setSearch]           = useState('');
  const [suggests, setSuggests]       = useState<SuggestItem[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userOpen, setUserOpen]       = useState(false);
  const [megaOpen, setMegaOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrolled, setScrolled]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const searchRef   = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaRef     = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer  = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { if (user) fetchCart(); }, [user]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 2);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!searchRef.current?.contains(t))  setShowSuggest(false);
      if (!userMenuRef.current?.contains(t)) setUserOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  const handleInput = (v: string) => {
    setSearch(v);
    clearTimeout(debounceRef.current);
    if (v.trim().length < 2) { setSuggests([]); setShowSuggest(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const r = await api.get(`/products/search-suggest?q=${encodeURIComponent(v)}`);
        const data = r.data.data || [];
        setSuggests(data); setShowSuggest(data.length > 0);
      } catch {}
    }, 280);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/san-pham?search=${encodeURIComponent(search.trim())}`);
    setSearch(''); setShowSuggest(false); setSearchOpen(false);
  };
  const handleLogout = async () => { await logout(); router.push('/dang-nhap'); };

  const openMega  = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 100); };

  return (
    <>
      {/* Topbar */}
      <div className="bg-[#003DA5] hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9 text-xs text-blue-100">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Nhà phân phối độc quyền chính hãng UBTECH Robotics Corp. tại Việt Nam
          </span>
          <div className="flex items-center gap-5">
            <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
              <Phone className="w-3 h-3" /> Hotline: {PHONE}
            </a>
            <a href={`https://zalo.me/${ZALO}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium">
              <MessageCircle className="w-3 h-3" /> Zalo: {ZALO}
            </a>
          </div>
        </div>
      </div>

      <header className={cn(
        'sticky top-0 z-50 bg-white transition-shadow duration-200',
        scrolled ? 'shadow-md' : 'shadow-sm'
      )}>
        {/* Main row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfhqyaVMwIjSUwlvDADDX93fbyUNvXWGQbw&s"
              alt="UBTECH Vietnam"
              className="h-9 w-auto object-contain"
              onError={(e: any) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span style={{display:'none'}} className="items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-[#0057FF] flex items-center justify-center text-white font-black text-base">U</span>
              <span className="font-black text-[#0057FF] text-xl tracking-tight">UBTECH<span className="text-sm ml-0.5 text-[#0057FF]/70">VN</span></span>
            </span>
          </Link>

          {/* Desktop search */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg mx-6 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input value={search} onChange={e => handleInput(e.target.value)}
                  onFocus={() => suggests.length > 0 && setShowSuggest(true)}
                  placeholder="Tìm kiếm robot, kit AI, sách..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] rounded-xl text-sm text-[#1A1F36] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0057FF]/30 focus:bg-white transition-all border border-transparent focus:border-[#0057FF]/20" />
              </div>
            </form>
            {showSuggest && suggests.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {suggests.map(item => {
                  const img = item.images?.find(i => i.isPrimary) || item.images?.[0];
                  return (
                    <Link key={item._id} href={`/san-pham/${item.slug}`}
                      onClick={() => { setShowSuggest(false); setSearch(''); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F4F6] transition-colors">
                      {img ? (
                        <img src={img.url} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#EEF3FF] flex items-center justify-center">
                          <Bot className="w-5 h-5 text-[#9CA3AF]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1A1F36] truncate">{item.name}</p>
                        <p className="text-xs text-[#0057FF] font-medium">{formatPrice(item.salePrice || item.basePrice)}</p>
                      </div>
                    </Link>
                  );
                })}
                <Link href={`/san-pham?search=${encodeURIComponent(search)}`}
                  onClick={() => { setShowSuggest(false); setSearch(''); }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-gray-100 text-sm text-[#0057FF] font-semibold hover:bg-[#EEF3FF] transition-colors">
                  Xem tất cả kết quả →
                </Link>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden w-9 h-9 rounded-xl hover:bg-[#F3F4F6] flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-[#374151]" />
            </button>
            <Link href="/gio-hang" className="relative w-9 h-9 rounded-xl hover:bg-[#F3F4F6] flex items-center justify-center transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#374151]" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0057FF] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#F3F4F6] transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0057FF] to-[#003DA5] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-[#374151] max-w-[80px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                </button>
                {userOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#1A1F36] truncate">{user.name}</p>
                      <p className="text-xs text-[#9CA3AF] truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      {[
                        { href: '/tai-khoan',          icon: UserIcon, label: 'Tài khoản của tôi' },
                        { href: '/tai-khoan/don-hang', icon: Package,  label: 'Đơn hàng' },
                        { href: '/tai-khoan/dia-chi',  icon: MapPin,   label: 'Địa chỉ giao hàng' },
                        { href: '/tai-khoan/mat-khau', icon: Lock,     label: 'Đổi mật khẩu' },
                      ].map(i => (
                        <Link key={i.href} href={i.href} onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#374151] hover:bg-[#EEF3FF] hover:text-[#0057FF] transition-colors">
                          <i.icon className="w-4 h-4 text-[#9CA3AF]" /> {i.label}
                        </Link>
                      ))}
                    </div>
                    <div className="p-1.5 border-t border-gray-100">
                      <button onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors w-full">
                        <LogOut className="w-4 h-4" /> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/dang-nhap" className="text-sm font-semibold text-[#003DA5] px-4 py-2 rounded-xl hover:bg-[#EEF3FF] transition-colors">Đăng nhập</Link>
                <Link href="/dang-ky" className="text-sm font-semibold bg-[#0057FF] text-white px-4 py-2 rounded-xl hover:bg-[#003DA5] transition-colors shadow-sm shadow-blue-200">Đăng ký</Link>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-xl hover:bg-[#F3F4F6] flex items-center justify-center transition-colors ml-1">
              {mobileOpen ? <X className="w-5 h-5 text-[#374151]" /> : <Menu className="w-5 h-5 text-[#374151]" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input value={search} onChange={e => handleInput(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..." autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF]/30" />
              </div>
            </form>
          </div>
        )}

        {/* Desktop nav bar */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-11">

            {/* Mega menu — Giải Pháp Robot */}
            <div ref={megaRef} className="relative h-full flex items-center"
              onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button className={cn(
                'flex items-center gap-1.5 px-4 h-11 text-[13px] font-semibold transition-colors border-b-2',
                megaOpen ? 'text-[#0057FF] border-[#0057FF]' : 'text-[#374151] hover:text-[#0057FF] border-transparent'
              )}>
                Giải Pháp Robot
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', megaOpen && 'rotate-180')} />
              </button>

              {megaOpen && (
                <div className="absolute top-full left-0 mt-0 z-50" style={{width:'860px'}}
                  onMouseEnter={openMega} onMouseLeave={closeMega}>
                  <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl border border-t-0 border-gray-100 overflow-hidden flex" style={{maxHeight:'500px'}}>
                    {/* Sidebar */}
                    <div className="w-44 flex-shrink-0 bg-[#050E2B] py-3">
                      {MEGA_SECTIONS.map((sec, idx) => (
                        <button key={sec.title} onMouseEnter={() => setActiveSection(idx)}
                          className={cn(
                            'w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] transition-all flex items-center justify-between',
                            activeSection === idx
                              ? 'text-white bg-[#0057FF]/20 border-r-2 border-[#0057FF]'
                              : 'text-blue-300/70 hover:text-white hover:bg-white/5'
                          )}>
                          {sec.title}
                          <ChevronDown className="w-3 h-3 -rotate-90 opacity-40" />
                        </button>
                      ))}
                      <div className="px-4 pt-4 mt-2 border-t border-white/10">
                        <Link href="/san-pham" onClick={() => setMegaOpen(false)}
                          className="text-[11px] text-blue-300/60 hover:text-blue-200 flex items-center gap-1 transition-colors">
                          Tất cả SP <ArrowRight className="w-3 h-3"/>
                        </Link>
                      </div>
                    </div>
                    {/* Grid */}
                    <div className="flex-1 p-5 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-[0.15em]">
                          {MEGA_SECTIONS[activeSection].title}
                        </h3>
                        <Link href="/san-pham" onClick={() => setMegaOpen(false)}
                          className="text-[11px] text-[#0057FF] font-semibold hover:underline">Xem tất cả →</Link>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {MEGA_SECTIONS[activeSection].items.map(item => (
                          <Link key={item.slug} href={`/san-pham/${item.slug}`} onClick={() => setMegaOpen(false)}
                            className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#EEF3FF] transition-all">
                            <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-white transition-colors overflow-hidden">
                              <img src={item.img} alt={item.name}
                                className="w-full h-full object-contain"
                                onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
                            </div>
                            <div className="text-center">
                              <p className="text-[11px] font-bold text-[#1A1F36] group-hover:text-[#0057FF] leading-tight">{item.name}</p>
                              <p className="text-[10px] text-[#9CA3AF] mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Plain nav */}
            {PLAIN_NAV.map(item => (
              (item as any).dropdown ? (
                <div key={item.label} className="relative group/nav">
                  <button className={cn(
                    'px-4 h-11 flex items-center gap-1 text-[13px] font-semibold transition-colors border-b-2',
                    ['/gioi-thieu','/cong-nghe','/phan-mem','/ai-center'].some(p => pathname === p)
                      ? 'text-[#0057FF] border-[#0057FF]'
                      : 'text-[#374151] hover:text-[#0057FF] border-transparent'
                  )}>
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover/nav:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-gray-100 p-2 w-56">
                      {((item as any).dropdown as {label:string;href:string;desc:string}[]).map((sub) => (
                        <Link key={sub.href} href={sub.href}
                          className="flex items-start gap-2 px-4 py-3 rounded-xl hover:bg-[#F0F5FF] transition-colors group/sub">
                          <div>
                            <p className="text-[13px] font-semibold text-[#1A1F36] group-hover/sub:text-[#0057FF] leading-tight">{sub.label}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{sub.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className={cn(
                  'px-4 h-11 flex items-center text-[13px] font-semibold transition-colors border-b-2',
                  pathname === item.href ? 'text-[#0057FF] border-[#0057FF]' : 'text-[#374151] hover:text-[#0057FF] border-transparent'
                )}>
                  {item.label}
                </Link>
              )
            ))}

            <div className="ml-auto flex items-center gap-1.5 text-[13px] font-semibold text-[#003DA5]">
              <Phone className="w-3.5 h-3.5" />
              <a href={`tel:${PHONE}`} className="hover:text-[#0057FF] transition-colors">{PHONE}</a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-gray-100 bg-white px-4 pb-5 pt-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {/* Mega — mobile accordion */}
            <div>
              <button onClick={() => setMobileExpanded(mobileExpanded === 'robot' ? null : 'robot')}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1A1F36] hover:bg-[#EEF3FF] hover:text-[#0057FF] transition-colors">
                Giải Pháp Robot
                <ChevronDown className={cn('w-4 h-4 transition-transform', mobileExpanded === 'robot' && 'rotate-180')} />
              </button>
              {mobileExpanded === 'robot' && (
                <div className="ml-3 mt-1 space-y-3">
                  {MEGA_SECTIONS.map(sec => (
                    <div key={sec.title}>
                      <p className="px-3 py-1 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{sec.title}</p>
                      {sec.items.map(item => (
                        <Link key={item.slug} href={`/san-pham/${item.slug}`} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#6B7280] hover:text-[#0057FF] hover:bg-[#EEF3FF] transition-colors">
                          <img src={item.img} alt={item.name} className="w-6 h-6 object-contain rounded" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {PLAIN_NAV.map(item => (
              (item as any).dropdown ? (
                <div key={item.label}>
                  <button onClick={() => setMobileExpanded(mobileExpanded === 'gioi-thieu' ? null : 'gioi-thieu')}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1A1F36] hover:bg-[#EEF3FF] hover:text-[#0057FF] transition-colors">
                    {item.label}
                    <ChevronDown className={cn('w-4 h-4 transition-transform', mobileExpanded === 'gioi-thieu' && 'rotate-180')} />
                  </button>
                  {mobileExpanded === 'gioi-thieu' && (
                    <div className="ml-3 mt-1 space-y-1">
                      {((item as any).dropdown as {label:string;href:string;desc:string}[]).map(sub => (
                        <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#6B7280] hover:text-[#0057FF] hover:bg-[#EEF3FF] transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                  className={cn('block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                    pathname === item.href ? 'text-[#0057FF] bg-[#EEF3FF]' : 'text-[#1A1F36] hover:bg-[#EEF3FF] hover:text-[#0057FF]')}>
                  {item.label}
                </Link>
              )
            ))}

            {!user && (
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link href="/dang-nhap" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-semibold text-[#003DA5] px-4 py-2.5 rounded-xl border border-[#003DA5] hover:bg-[#EEF3FF] transition-colors">Đăng nhập</Link>
                <Link href="/dang-ky" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center text-sm font-semibold bg-[#0057FF] text-white px-4 py-2.5 rounded-xl hover:bg-[#003DA5] transition-colors">Đăng ký</Link>
              </div>
            )}
          </nav>
        )}
      </header>
    </>
  );
}
