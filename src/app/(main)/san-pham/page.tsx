// 'use client';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { SlidersHorizontal, LayoutGrid, List, X, ChevronDown, Search, Sparkles, Bot, BookOpen, Package } from 'lucide-react';
// import api from '@/lib/axios';
// import ProductCard from '@/components/ui/ProductCard';
// import { cn } from '@/lib/utils';

// const fetchProducts = (p: Record<string, string>) =>
//   api.get('/products', { params: p }).then(r => r.data);
// const fetchCategories = () =>
//   api.get('/products/categories').then(r => r.data.data);

// type ViewMode = 'grid' | 'list';
// const SORT_OPTIONS = [
//   { value: 'newest',     label: 'Mới nhất' },
//   { value: 'bestsell',   label: 'Bán chạy' },
//   { value: 'rating',     label: 'Đánh giá cao' },
//   { value: 'price_asc',  label: 'Giá tăng dần' },
//   { value: 'price_desc', label: 'Giá giảm dần' },
// ];
// const PRICE_RANGES = [
//   { label: 'Tất cả mức giá', min: '', max: '' },
//   { label: 'Dưới 500.000đ',  min: '', max: '500000' },
//   { label: '500K – 2 triệu', min: '500000', max: '2000000' },
//   { label: '2 – 10 triệu',   min: '2000000', max: '10000000' },
//   { label: '10 – 50 triệu',  min: '10000000', max: '50000000' },
//   { label: 'Trên 50 triệu',  min: '50000000', max: '' },
// ];

// const CAT_ICONS: Record<string, React.ReactNode> = {
//   'robot':  <Bot className="w-4 h-4" />,
//   'bo-kit': <Package className="w-4 h-4" />,
//   'sach':   <BookOpen className="w-4 h-4" />,
// };

// function SkeletonCard({ isBook = false }: { isBook?: boolean }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
//       <div className={cn('bg-gradient-to-br from-gray-100 to-gray-50', isBook ? 'aspect-[3/4]' : 'aspect-square')} />
//       <div className="p-3.5 space-y-2">
//         <div className="h-2 bg-gray-100 rounded w-1/3" />
//         <div className="h-3 bg-gray-100 rounded w-4/5" />
//         <div className="h-3 bg-gray-100 rounded w-3/5" />
//         <div className="pt-2 border-t border-gray-50">
//           <div className="h-3.5 bg-blue-50 rounded w-1/2" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   const searchParams = useSearchParams();
//   const [view, setView]       = useState<ViewMode>('grid');
//   const [sidebar, setSidebar] = useState(false);
//   const [params, setParams]   = useState({
//     page: '1', limit: '12', sort: 'newest',
//     search:   searchParams.get('search')   || '',
//     category: searchParams.get('category') || '',
//     minPrice: '', maxPrice: '',
//     featured: searchParams.get('featured') || '',
//   });

//   useEffect(() => {
//     setParams(p => ({
//       ...p,
//       search:   searchParams.get('search')   || '',
//       category: searchParams.get('category') || '',
//       featured: searchParams.get('featured') || '',
//       page: '1',
//     }));
//   }, [searchParams.toString()]);

//   const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ['products', params],
//     queryFn:  () => fetchProducts(cleanParams),
//     placeholderData: (prev) => prev,
//   });
//   const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

//   const products   = data?.data || [];
//   const pagination = data?.pagination;

//   const update = (key: string, value: string) =>
//     setParams(p => ({ ...p, [key]: value, page: '1' }));
//   const setPrice = (min: string, max: string) =>
//     setParams(p => ({ ...p, minPrice: min, maxPrice: max, page: '1' }));

//   const selectedPrice  = PRICE_RANGES.find(r => r.min === params.minPrice && r.max === params.maxPrice) || PRICE_RANGES[0];
//   const hasFilter      = !!(params.search || params.category || params.minPrice || params.featured);
//   const currentCatSlug = params.category;
//   const isBook         = currentCatSlug === 'sach';

//   const pageTitle = params.search ? `Kết quả: "${params.search}"`
//     : params.featured ? 'Sản phẩm nổi bật'
//     : categories.find((c: any) => c.slug === currentCatSlug)?.name || 'Tất cả sản phẩm';

//   return (
//     <div className="min-h-screen bg-[#F8FAFE]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

//         {/* Breadcrumb */}
//         <div className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
//           <span className="hover:text-[#0057FF] cursor-pointer transition-colors">Trang chủ</span>
//           <span className="text-gray-300">/</span>
//           <span className="text-[#1A1F36] font-medium">{pageTitle}</span>
//         </div>

//         <div className="flex gap-6">
//           {/* ── Sidebar ── */}
//           <aside className={cn(
//             'w-60 flex-shrink-0 space-y-3',
//             sidebar
//               ? 'fixed inset-0 z-50 w-72 bg-white p-5 overflow-y-auto shadow-2xl'
//               : 'hidden lg:block'
//           )}>
//             {sidebar && (
//               <div className="flex justify-between items-center mb-5">
//                 <h3 className="font-bold text-[#1A1F36]">Bộ lọc</h3>
//                 <button onClick={() => setSidebar(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             {/* Danh mục */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
//               <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
//                 <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
//                 Danh mục
//               </h4>
//               <div className="space-y-0.5">
//                 <button onClick={() => update('category', '')}
//                   className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
//                     !params.category
//                       ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
//                       : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
//                   <Sparkles className="w-4 h-4 opacity-70" />
//                   Tất cả sản phẩm
//                 </button>
//                 {categories.map((cat: any) => (
//                   <button key={cat._id} onClick={() => update('category', cat.slug)}
//                     className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
//                       params.category === cat.slug
//                         ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
//                         : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
//                     <span className="opacity-60">{CAT_ICONS[cat.slug] || <Package className="w-4 h-4" />}</span>
//                     {cat.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Khoảng giá */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
//               <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
//                 <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
//                 Khoảng giá
//               </h4>
//               <div className="space-y-0.5">
//                 {PRICE_RANGES.map(r => (
//                   <button key={r.label} onClick={() => setPrice(r.min, r.max)}
//                     className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all',
//                       selectedPrice.label === r.label
//                         ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
//                         : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
//                     {r.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {hasFilter && (
//               <button
//                 onClick={() => setParams({ page:'1', limit:'12', sort:'newest', search:'', category:'', minPrice:'', maxPrice:'', featured:'' })}
//                 className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-500 text-sm font-medium hover:bg-red-50 hover:border-red-200 transition-all">
//                 <X className="w-3.5 h-3.5" /> Xóa tất cả bộ lọc
//               </button>
//             )}
//           </aside>

//           {/* ── Main ── */}
//           <div className="flex-1 min-w-0">

//             {/* Toolbar */}
//             <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
//               <div className="flex items-center gap-3">
//                 <h1 className="text-lg font-black text-[#1A1F36]">{pageTitle}</h1>
//                 {pagination && (
//                   <span className="text-xs text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200 font-medium">
//                     {pagination.total} sản phẩm
//                   </span>
//                 )}
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="relative hidden sm:block">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
//                   <input
//                     value={params.search}
//                     onChange={e => update('search', e.target.value)}
//                     placeholder="Tìm trong danh mục..."
//                     className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36] placeholder:text-gray-400
//                       focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 w-44 transition-all focus:w-56"
//                   />
//                 </div>
//                 <div className="relative">
//                   <select value={params.sort} onChange={e => update('sort', e.target.value)}
//                     className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36]
//                       focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 cursor-pointer">
//                     {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
//                 </div>
//                 <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
//                   <button onClick={() => setView('grid')}
//                     className={cn('p-2.5 transition-all', view === 'grid' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
//                     <LayoutGrid className="w-4 h-4" />
//                   </button>
//                   <button onClick={() => setView('list')}
//                     className={cn('p-2.5 transition-all', view === 'list' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <button onClick={() => setSidebar(true)}
//                   className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors">
//                   <SlidersHorizontal className="w-4 h-4" /> Lọc
//                 </button>
//               </div>
//             </div>

//             {/* Active filter chips */}
//             {hasFilter && (
//               <div className="flex flex-wrap gap-2 mb-5">
//                 {params.search && (
//                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
//                     "{params.search}"
//                     <button onClick={() => update('search', '')} className="hover:bg-blue-200 rounded-full p-0.5">
//                       <X className="w-2.5 h-2.5" />
//                     </button>
//                   </span>
//                 )}
//                 {params.category && (
//                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
//                     {categories.find((c: any) => c.slug === params.category)?.name || params.category}
//                     <button onClick={() => update('category', '')} className="hover:bg-blue-200 rounded-full p-0.5">
//                       <X className="w-2.5 h-2.5" />
//                     </button>
//                   </span>
//                 )}
//                 {(params.minPrice || params.maxPrice) && (
//                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
//                     {selectedPrice.label}
//                     <button onClick={() => setPrice('', '')} className="hover:bg-blue-200 rounded-full p-0.5">
//                       <X className="w-2.5 h-2.5" />
//                     </button>
//                   </span>
//                 )}
//               </div>
//             )}

//             {/* Products */}
//             {isLoading ? (
//               <div className={cn(
//                 view === 'grid'
//                   ? isBook
//                     ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
//                     : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
//                   : 'space-y-3'
//               )}>
//                 {Array.from({ length: 8 }).map((_, i) => (
//                   view === 'grid'
//                     ? <SkeletonCard key={i} isBook={isBook} />
//                     : <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32 animate-pulse" />
//                 ))}
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
//                 <div className="text-6xl mb-4 text-[#C4C9D4] flex justify-center"><Search className="w-14 h-14" /></div>
//                 <p className="text-lg font-bold text-[#1A1F36] mb-2">Không tìm thấy sản phẩm</p>
//                 <p className="text-gray-500 text-sm mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
//                 <button onClick={() => setParams({ page:'1', limit:'12', sort:'newest', search:'', category:'', minPrice:'', maxPrice:'', featured:'' })}
//                   className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0057FF] to-[#003DA5] text-white text-sm font-bold hover:shadow-[0_4px_16px_rgba(0,87,255,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0">
//                   Xem tất cả sản phẩm
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className={cn(
//                   'transition-opacity duration-200',
//                   isFetching ? 'opacity-60' : 'opacity-100',
//                   view === 'grid'
//                     ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
//                     : 'space-y-3'
//                 )}>
//                   {products.map((p: any, idx: number) => (
//                     <div key={p._id}
//                       style={{ animationDelay: `${idx * 40}ms` }}
//                       className="animate-fadeIn">
//                       <ProductCard product={p} view={view} />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {pagination && pagination.totalPages > 1 && (
//                   <div className="flex justify-center items-center gap-2 mt-10">
//                     <button
//                       onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) - 1) }))}
//                       disabled={!pagination.hasPrev}
//                       className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
//                         hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
//                       ← Trước
//                     </button>
//                     {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                       const cur = Number(params.page);
//                       let page: number;
//                       if (pagination.totalPages <= 5) page = i + 1;
//                       else if (cur <= 3) page = i + 1;
//                       else if (cur >= pagination.totalPages - 2) page = pagination.totalPages - 4 + i;
//                       else page = cur - 2 + i;
//                       return (
//                         <button key={page}
//                           onClick={() => setParams(p => ({ ...p, page: String(page) }))}
//                           className={cn(
//                             'w-10 h-10 rounded-xl text-sm font-bold transition-all',
//                             String(page) === params.page
//                               ? 'bg-gradient-to-br from-[#0057FF] to-[#003DA5] text-white shadow-[0_4px_12px_rgba(0,87,255,0.3)]'
//                               : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] hover:-translate-y-0.5'
//                           )}>
//                           {page}
//                         </button>
//                       );
//                     })}
//                     <button
//                       onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) + 1) }))}
//                       disabled={!pagination.hasNext}
//                       className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
//                         hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
//                       Tiếp →
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, LayoutGrid, List, X, ChevronDown, Search, Sparkles, Bot, BookOpen, Package } from 'lucide-react';
import api from '@/lib/axios';
import ProductCard from '@/components/ui/ProductCard';
import { cn } from '@/lib/utils';

const fetchProducts = (p: Record<string, string>) =>
  api.get('/products', { params: p }).then(r => r.data);
const fetchCategories = () =>
  api.get('/products/categories').then(r => r.data.data);

type ViewMode = 'grid' | 'list';
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Mới nhất' },
  { value: 'bestsell',   label: 'Bán chạy' },
  { value: 'rating',     label: 'Đánh giá cao' },
  { value: 'price_asc',  label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
];
const PRICE_RANGES = [
  { label: 'Tất cả mức giá', min: '', max: '' },
  { label: 'Dưới 500.000đ',  min: '', max: '500000' },
  { label: '500K – 2 triệu', min: '500000', max: '2000000' },
  { label: '2 – 10 triệu',   min: '2000000', max: '10000000' },
  { label: '10 – 50 triệu',  min: '10000000', max: '50000000' },
  { label: 'Trên 50 triệu',  min: '50000000', max: '' },
];

const CAT_ICONS: Record<string, React.ReactNode> = {
  'robot':  <Bot className="w-4 h-4" />,
  'bo-kit': <Package className="w-4 h-4" />,
  'sach':   <BookOpen className="w-4 h-4" />,
};

function SkeletonCard({ isBook = false }: { isBook?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className={cn('bg-gradient-to-br from-gray-100 to-gray-50', isBook ? 'aspect-[3/4]' : 'aspect-square')} />
      <div className="p-3.5 space-y-2">
        <div className="h-2 bg-gray-100 rounded w-1/3" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-3/5" />
        <div className="pt-2 border-t border-gray-50">
          <div className="h-3.5 bg-blue-50 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [view, setView]       = useState<ViewMode>('grid');
  const [sidebar, setSidebar] = useState(false);
  const [params, setParams]   = useState({
    page: '1', limit: '12', sort: 'newest',
    search:   searchParams.get('search')   || '',
    category: searchParams.get('category') || '',
    minPrice: '', maxPrice: '',
    featured: searchParams.get('featured') || '',
  });

  useEffect(() => {
    setParams(p => ({
      ...p,
      search:   searchParams.get('search')   || '',
      category: searchParams.get('category') || '',
      featured: searchParams.get('featured') || '',
      page: '1',
    }));
  }, [searchParams.toString()]);

  const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', params],
    queryFn:  () => fetchProducts(cleanParams),
    placeholderData: (prev) => prev,
  });
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const products   = data?.data || [];
  const pagination = data?.pagination;

  const update = (key: string, value: string) =>
    setParams(p => ({ ...p, [key]: value, page: '1' }));
  const setPrice = (min: string, max: string) =>
    setParams(p => ({ ...p, minPrice: min, maxPrice: max, page: '1' }));

  const selectedPrice  = PRICE_RANGES.find(r => r.min === params.minPrice && r.max === params.maxPrice) || PRICE_RANGES[0];
  const hasFilter      = !!(params.search || params.category || params.minPrice || params.featured);
  const currentCatSlug = params.category;
  const isBook         = currentCatSlug === 'sach';

  const pageTitle = params.search ? `Kết quả: "${params.search}"`
    : params.featured ? 'Sản phẩm nổi bật'
    : categories.find((c: any) => c.slug === currentCatSlug)?.name || 'Tất cả sản phẩm';

  return (
    <div className="min-h-screen bg-[#F8FAFE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
          <span className="hover:text-[#0057FF] cursor-pointer transition-colors">Trang chủ</span>
          <span className="text-gray-300">/</span>
          <span className="text-[#1A1F36] font-medium">{pageTitle}</span>
        </div>

        <div className="flex gap-6">
          {/* ── Sidebar ── */}
          <aside className={cn(
            'w-60 flex-shrink-0 space-y-3',
            sidebar
              ? 'fixed inset-0 z-50 w-72 bg-white p-5 overflow-y-auto shadow-2xl'
              : 'hidden lg:block'
          )}>
            {sidebar && (
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-[#1A1F36]">Bộ lọc</h3>
                <button onClick={() => setSidebar(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Danh mục */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
                Danh mục
              </h4>
              <div className="space-y-0.5">
                <button onClick={() => update('category', '')}
                  className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
                    !params.category
                      ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                      : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
                  <Sparkles className="w-4 h-4 opacity-70" />
                  Tất cả sản phẩm
                </button>
                {categories.map((cat: any) => (
                  <button key={cat._id} onClick={() => update('category', cat.slug)}
                    className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
                      params.category === cat.slug
                        ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                        : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
                    <span className="opacity-60">{CAT_ICONS[cat.slug] || <Package className="w-4 h-4" />}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Khoảng giá */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
                Khoảng giá
              </h4>
              <div className="space-y-0.5">
                {PRICE_RANGES.map(r => (
                  <button key={r.label} onClick={() => setPrice(r.min, r.max)}
                    className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all',
                      selectedPrice.label === r.label
                        ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                        : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">
                {pagination ? (
                  <><span className="font-bold text-[#1A1F36]">{pagination.totalItems}</span> sản phẩm</>
                ) : '…'}
              </p>
              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    value={params.search}
                    onChange={e => update('search', e.target.value)}
                    placeholder="Tìm trong danh mục..."
                    className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36] placeholder:text-gray-400
                      focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 w-44 transition-all focus:w-56"
                  />
                </div>
                <div className="relative">
                  <select value={params.sort} onChange={e => update('sort', e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36]
                      focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 cursor-pointer">
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setView('grid')}
                    className={cn('p-2.5 transition-all', view === 'grid' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView('list')}
                    className={cn('p-2.5 transition-all', view === 'list' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => setSidebar(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors">
                  <SlidersHorizontal className="w-4 h-4" /> Lọc
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilter && (
              <div className="flex flex-wrap gap-2 mb-5">
                {params.search && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    "{params.search}"
                    <button onClick={() => update('search', '')} className="hover:bg-blue-200 rounded-full p-0.5">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {params.category && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    {categories.find((c: any) => c.slug === params.category)?.name || params.category}
                    <button onClick={() => update('category', '')} className="hover:bg-blue-200 rounded-full p-0.5">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {(params.minPrice || params.maxPrice) && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    {selectedPrice.label}
                    <button onClick={() => setPrice('', '')} className="hover:bg-blue-200 rounded-full p-0.5">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {isLoading ? (
              <div className={cn(
                view === 'grid'
                  ? isBook
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                  : 'space-y-3'
              )}>
                {Array.from({ length: 8 }).map((_, i) => (
                  view === 'grid'
                    ? <SkeletonCard key={i} isBook={isBook} />
                    : <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-6xl mb-4 text-[#C4C9D4] flex justify-center"><Search className="w-14 h-14" /></div>
                <p className="text-lg font-bold text-[#1A1F36] mb-2">Không tìm thấy sản phẩm</p>
                <p className="text-gray-500 text-sm mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button onClick={() => setParams({ page:'1', limit:'12', sort:'newest', search:'', category:'', minPrice:'', maxPrice:'', featured:'' })}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0057FF] to-[#003DA5] text-white text-sm font-bold hover:shadow-[0_4px_16px_rgba(0,87,255,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0">
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <>
                <div className={cn(
                  'transition-opacity duration-200',
                  isFetching ? 'opacity-60' : 'opacity-100',
                  view === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'space-y-3'
                )}>
                  {products.map((p: any, idx: number) => (
                    <div key={p._id}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="animate-fadeIn">
                      <ProductCard product={p} view={view} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) - 1) }))}
                      disabled={!pagination.hasPrev}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
                        hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      ← Trước
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const cur = Number(params.page);
                      let page: number;
                      if (pagination.totalPages <= 5) page = i + 1;
                      else if (cur <= 3) page = i + 1;
                      else if (cur >= pagination.totalPages - 2) page = pagination.totalPages - 4 + i;
                      else page = cur - 2 + i;
                      return (
                        <button key={page}
                          onClick={() => setParams(p => ({ ...p, page: String(page) }))}
                          className={cn(
                            'w-10 h-10 rounded-xl text-sm font-bold transition-all',
                            String(page) === params.page
                              ? 'bg-gradient-to-br from-[#0057FF] to-[#003DA5] text-white shadow-[0_4px_12px_rgba(0,87,255,0.3)]'
                              : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] hover:-translate-y-0.5'
                          )}>
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) + 1) }))}
                      disabled={!pagination.hasNext}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
                        hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      Tiếp →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFE] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}