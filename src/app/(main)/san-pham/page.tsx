// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { useSearchParams } from 'next/navigation';
// // import { useQuery } from '@tanstack/react-query';
// // import { SlidersHorizontal, LayoutGrid, List, X, ChevronDown, Search, Sparkles, Bot, BookOpen, Package } from 'lucide-react';
// // import api from '@/lib/axios';
// // import ProductCard from '@/components/ui/ProductCard';
// // import { cn } from '@/lib/utils';

// // const fetchProducts = (p: Record<string, string>) =>
// //   api.get('/products', { params: p }).then(r => r.data);
// // const fetchCategories = () =>
// //   api.get('/products/categories').then(r => r.data.data);

// // type ViewMode = 'grid' | 'list';
// // const SORT_OPTIONS = [
// //   { value: 'newest',     label: 'Mới nhất' },
// //   { value: 'bestsell',   label: 'Bán chạy' },
// //   { value: 'rating',     label: 'Đánh giá cao' },
// //   { value: 'price_asc',  label: 'Giá tăng dần' },
// //   { value: 'price_desc', label: 'Giá giảm dần' },
// // ];
// // const PRICE_RANGES = [
// //   { label: 'Tất cả mức giá', min: '', max: '' },
// //   { label: 'Dưới 500.000đ',  min: '', max: '500000' },
// //   { label: '500K – 2 triệu', min: '500000', max: '2000000' },
// //   { label: '2 – 10 triệu',   min: '2000000', max: '10000000' },
// //   { label: '10 – 50 triệu',  min: '10000000', max: '50000000' },
// //   { label: 'Trên 50 triệu',  min: '50000000', max: '' },
// // ];

// // const CAT_ICONS: Record<string, React.ReactNode> = {
// //   'robot':  <Bot className="w-4 h-4" />,
// //   'bo-kit': <Package className="w-4 h-4" />,
// //   'sach':   <BookOpen className="w-4 h-4" />,
// // };

// // function SkeletonCard({ isBook = false }: { isBook?: boolean }) {
// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
// //       <div className={cn('bg-gradient-to-br from-gray-100 to-gray-50', isBook ? 'aspect-[3/4]' : 'aspect-square')} />
// //       <div className="p-3.5 space-y-2">
// //         <div className="h-2 bg-gray-100 rounded w-1/3" />
// //         <div className="h-3 bg-gray-100 rounded w-4/5" />
// //         <div className="h-3 bg-gray-100 rounded w-3/5" />
// //         <div className="pt-2 border-t border-gray-50">
// //           <div className="h-3.5 bg-blue-50 rounded w-1/2" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function ProductsPage() {
// //   const searchParams = useSearchParams();
// //   const [view, setView]       = useState<ViewMode>('grid');
// //   const [sidebar, setSidebar] = useState(false);
// //   const [params, setParams]   = useState({
// //     page: '1', limit: '12', sort: 'newest',
// //     search:   searchParams.get('search')   || '',
// //     category: searchParams.get('category') || '',
// //     minPrice: '', maxPrice: '',
// //     featured: searchParams.get('featured') || '',
// //   });

// //   useEffect(() => {
// //     setParams(p => ({
// //       ...p,
// //       search:   searchParams.get('search')   || '',
// //       category: searchParams.get('category') || '',
// //       featured: searchParams.get('featured') || '',
// //       page: '1',
// //     }));
// //   }, [searchParams.toString()]);

// //   const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
// //   const { data, isLoading, isFetching } = useQuery({
// //     queryKey: ['products', params],
// //     queryFn:  () => fetchProducts(cleanParams),
// //     placeholderData: (prev) => prev,
// //   });
// //   const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

// //   const products   = data?.data || [];
// //   const pagination = data?.pagination;

// //   const update = (key: string, value: string) =>
// //     setParams(p => ({ ...p, [key]: value, page: '1' }));
// //   const setPrice = (min: string, max: string) =>
// //     setParams(p => ({ ...p, minPrice: min, maxPrice: max, page: '1' }));

// //   const selectedPrice  = PRICE_RANGES.find(r => r.min === params.minPrice && r.max === params.maxPrice) || PRICE_RANGES[0];
// //   const hasFilter      = !!(params.search || params.category || params.minPrice || params.featured);
// //   const currentCatSlug = params.category;
// //   const isBook         = currentCatSlug === 'sach';

// //   const pageTitle = params.search ? `Kết quả: "${params.search}"`
// //     : params.featured ? 'Sản phẩm nổi bật'
// //     : categories.find((c: any) => c.slug === currentCatSlug)?.name || 'Tất cả sản phẩm';

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFE]">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

// //         {/* Breadcrumb */}
// //         <div className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
// //           <span className="hover:text-[#0057FF] cursor-pointer transition-colors">Trang chủ</span>
// //           <span className="text-gray-300">/</span>
// //           <span className="text-[#1A1F36] font-medium">{pageTitle}</span>
// //         </div>

// //         <div className="flex gap-6">
// //           {/* ── Sidebar ── */}
// //           <aside className={cn(
// //             'w-60 flex-shrink-0 space-y-3',
// //             sidebar
// //               ? 'fixed inset-0 z-50 w-72 bg-white p-5 overflow-y-auto shadow-2xl'
// //               : 'hidden lg:block'
// //           )}>
// //             {sidebar && (
// //               <div className="flex justify-between items-center mb-5">
// //                 <h3 className="font-bold text-[#1A1F36]">Bộ lọc</h3>
// //                 <button onClick={() => setSidebar(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
// //                   <X className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             )}

// //             {/* Danh mục */}
// //             <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
// //               <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
// //                 <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
// //                 Danh mục
// //               </h4>
// //               <div className="space-y-0.5">
// //                 <button onClick={() => update('category', '')}
// //                   className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
// //                     !params.category
// //                       ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
// //                       : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
// //                   <Sparkles className="w-4 h-4 opacity-70" />
// //                   Tất cả sản phẩm
// //                 </button>
// //                 {categories.map((cat: any) => (
// //                   <button key={cat._id} onClick={() => update('category', cat.slug)}
// //                     className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
// //                       params.category === cat.slug
// //                         ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
// //                         : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
// //                     <span className="opacity-60">{CAT_ICONS[cat.slug] || <Package className="w-4 h-4" />}</span>
// //                     {cat.name}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Khoảng giá */}
// //             <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
// //               <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wide mb-3 flex items-center gap-1.5">
// //                 <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
// //                 Khoảng giá
// //               </h4>
// //               <div className="space-y-0.5">
// //                 {PRICE_RANGES.map(r => (
// //                   <button key={r.label} onClick={() => setPrice(r.min, r.max)}
// //                     className={cn('w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all',
// //                       selectedPrice.label === r.label
// //                         ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
// //                         : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50')}>
// //                     {r.label}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {hasFilter && (
// //               <button
// //                 onClick={() => setParams({ page:'1', limit:'12', sort:'newest', search:'', category:'', minPrice:'', maxPrice:'', featured:'' })}
// //                 className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-500 text-sm font-medium hover:bg-red-50 hover:border-red-200 transition-all">
// //                 <X className="w-3.5 h-3.5" /> Xóa tất cả bộ lọc
// //               </button>
// //             )}
// //           </aside>

// //           {/* ── Main ── */}
// //           <div className="flex-1 min-w-0">

// //             {/* Toolbar */}
// //             <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
// //               <div className="flex items-center gap-3">
// //                 <h1 className="text-lg font-black text-[#1A1F36]">{pageTitle}</h1>
// //                 {pagination && (
// //                   <span className="text-xs text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200 font-medium">
// //                     {pagination.total} sản phẩm
// //                   </span>
// //                 )}
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <div className="relative hidden sm:block">
// //                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
// //                   <input
// //                     value={params.search}
// //                     onChange={e => update('search', e.target.value)}
// //                     placeholder="Tìm trong danh mục..."
// //                     className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36] placeholder:text-gray-400
// //                       focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 w-44 transition-all focus:w-56"
// //                   />
// //                 </div>
// //                 <div className="relative">
// //                   <select value={params.sort} onChange={e => update('sort', e.target.value)}
// //                     className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36]
// //                       focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 cursor-pointer">
// //                     {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
// //                   </select>
// //                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
// //                 </div>
// //                 <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
// //                   <button onClick={() => setView('grid')}
// //                     className={cn('p-2.5 transition-all', view === 'grid' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
// //                     <LayoutGrid className="w-4 h-4" />
// //                   </button>
// //                   <button onClick={() => setView('list')}
// //                     className={cn('p-2.5 transition-all', view === 'list' ? 'bg-[#0057FF] text-white shadow-inner' : 'text-gray-400 hover:bg-gray-50')}>
// //                     <List className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //                 <button onClick={() => setSidebar(true)}
// //                   className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors">
// //                   <SlidersHorizontal className="w-4 h-4" /> Lọc
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Active filter chips */}
// //             {hasFilter && (
// //               <div className="flex flex-wrap gap-2 mb-5">
// //                 {params.search && (
// //                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
// //                     "{params.search}"
// //                     <button onClick={() => update('search', '')} className="hover:bg-blue-200 rounded-full p-0.5">
// //                       <X className="w-2.5 h-2.5" />
// //                     </button>
// //                   </span>
// //                 )}
// //                 {params.category && (
// //                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
// //                     {categories.find((c: any) => c.slug === params.category)?.name || params.category}
// //                     <button onClick={() => update('category', '')} className="hover:bg-blue-200 rounded-full p-0.5">
// //                       <X className="w-2.5 h-2.5" />
// //                     </button>
// //                   </span>
// //                 )}
// //                 {(params.minPrice || params.maxPrice) && (
// //                   <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
// //                     {selectedPrice.label}
// //                     <button onClick={() => setPrice('', '')} className="hover:bg-blue-200 rounded-full p-0.5">
// //                       <X className="w-2.5 h-2.5" />
// //                     </button>
// //                   </span>
// //                 )}
// //               </div>
// //             )}

// //             {/* Products */}
// //             {isLoading ? (
// //               <div className={cn(
// //                 view === 'grid'
// //                   ? isBook
// //                     ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
// //                     : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
// //                   : 'space-y-3'
// //               )}>
// //                 {Array.from({ length: 8 }).map((_, i) => (
// //                   view === 'grid'
// //                     ? <SkeletonCard key={i} isBook={isBook} />
// //                     : <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32 animate-pulse" />
// //                 ))}
// //               </div>
// //             ) : products.length === 0 ? (
// //               <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
// //                 <div className="text-6xl mb-4 text-[#C4C9D4] flex justify-center"><Search className="w-14 h-14" /></div>
// //                 <p className="text-lg font-bold text-[#1A1F36] mb-2">Không tìm thấy sản phẩm</p>
// //                 <p className="text-gray-500 text-sm mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
// //                 <button onClick={() => setParams({ page:'1', limit:'12', sort:'newest', search:'', category:'', minPrice:'', maxPrice:'', featured:'' })}
// //                   className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0057FF] to-[#003DA5] text-white text-sm font-bold hover:shadow-[0_4px_16px_rgba(0,87,255,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0">
// //                   Xem tất cả sản phẩm
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className={cn(
// //                   'transition-opacity duration-200',
// //                   isFetching ? 'opacity-60' : 'opacity-100',
// //                   view === 'grid'
// //                     ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
// //                     : 'space-y-3'
// //                 )}>
// //                   {products.map((p: any, idx: number) => (
// //                     <div key={p._id}
// //                       style={{ animationDelay: `${idx * 40}ms` }}
// //                       className="animate-fadeIn">
// //                       <ProductCard product={p} view={view} />
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* Pagination */}
// //                 {pagination && pagination.totalPages > 1 && (
// //                   <div className="flex justify-center items-center gap-2 mt-10">
// //                     <button
// //                       onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) - 1) }))}
// //                       disabled={!pagination.hasPrev}
// //                       className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
// //                         hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
// //                       ← Trước
// //                     </button>
// //                     {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
// //                       const cur = Number(params.page);
// //                       let page: number;
// //                       if (pagination.totalPages <= 5) page = i + 1;
// //                       else if (cur <= 3) page = i + 1;
// //                       else if (cur >= pagination.totalPages - 2) page = pagination.totalPages - 4 + i;
// //                       else page = cur - 2 + i;
// //                       return (
// //                         <button key={page}
// //                           onClick={() => setParams(p => ({ ...p, page: String(page) }))}
// //                           className={cn(
// //                             'w-10 h-10 rounded-xl text-sm font-bold transition-all',
// //                             String(page) === params.page
// //                               ? 'bg-gradient-to-br from-[#0057FF] to-[#003DA5] text-white shadow-[0_4px_12px_rgba(0,87,255,0.3)]'
// //                               : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] hover:-translate-y-0.5'
// //                           )}>
// //                           {page}
// //                         </button>
// //                       );
// //                     })}
// //                     <button
// //                       onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) + 1) }))}
// //                       disabled={!pagination.hasNext}
// //                       className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
// //                         hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
// //                       Tiếp →
// //                     </button>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';
// import { Suspense } from 'react';
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

// function ProductsContent() {
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
//           </aside>

//           {/* ── Main ── */}
//           <div className="flex-1 min-w-0">
//             {/* Toolbar */}
//             <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
//               <p className="text-sm text-gray-500">
//                 {pagination ? (
//                   <><span className="font-bold text-[#1A1F36]">{pagination.totalItems}</span> sản phẩm</>
//                 ) : '…'}
//               </p>
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

// export default function ProductsPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#F8FAFE] flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
//       </div>
//     }>
//       <ProductsContent />
//     </Suspense>
//   );
// }

'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  SlidersHorizontal, X, Search, Sparkles, Bot, BookOpen, Package,
  GraduationCap, Building2, ArrowRight, ChevronDown, ImageOff,
  LayoutGrid, List,
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';

// ── Fetch logic (unchanged) ────────────────────────────────────────────────
const fetchProducts = (p: Record<string, string>) =>
  api.get('/products', { params: p }).then(r => r.data);
const fetchCategories = () =>
  api.get('/products/categories').then(r => r.data.data);

// ── Types & constants ──────────────────────────────────────────────────────
type ViewMode = 'grid' | 'list';

const SORT_OPTIONS = [
  { value: 'newest',   label: 'Mới nhất' },
  { value: 'bestsell', label: 'Phổ biến' },
  { value: 'rating',   label: 'Đánh giá cao' },
];

const SEGMENTS = [
  { value: '',             label: 'Tất cả giải pháp', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { value: 'k12',          label: 'K12',               icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { value: 'dai-hoc',      label: 'Đại học',           icon: <BookOpen className="w-3.5 h-3.5" /> },
  { value: 'doanh-nghiep', label: 'Doanh nghiệp',      icon: <Building2 className="w-3.5 h-3.5" /> },
];

const SEGMENT_BADGES: Record<string, { label: string; className: string }> = {
  'k12':          { label: 'K12',          className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'dai-hoc':      { label: 'Đại học',      className: 'bg-violet-50 text-violet-700 border-violet-200' },
  'doanh-nghiep': { label: 'Doanh nghiệp', className: 'bg-sky-50 text-sky-700 border-sky-200' },
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  'robot':  <Bot className="w-4 h-4" />,
  'bo-kit': <Package className="w-4 h-4" />,
  'sach':   <BookOpen className="w-4 h-4" />,
};

function getCtaLabel(segment?: string): string {
  switch (segment) {
    case 'k12':          return 'Tư vấn chương trình K12';
    case 'dai-hoc':      return 'Tư vấn AI Lab';
    case 'doanh-nghiep': return 'Đặt lịch demo';
    default:             return 'Nhận tư vấn';
  }
}

// ── Skeleton Card ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 bg-gray-100 rounded-md w-16" />
          <div className="h-5 bg-gray-100 rounded-md w-20" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="h-4 bg-gray-100 rounded w-3/5" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="pt-3 border-t border-gray-50">
          <div className="h-4 bg-blue-50 rounded w-2/5" />
        </div>
      </div>
    </div>
  );
}

function SkeletonListCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse flex">
      <div className="w-40 sm:w-52 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-50" />
      <div className="flex-1 p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 bg-gray-100 rounded-md w-16" />
          <div className="h-5 bg-gray-100 rounded-md w-20" />
        </div>
        <div className="h-4 bg-gray-100 rounded w-3/5" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="pt-3 border-t border-gray-50">
          <div className="h-4 bg-blue-50 rounded w-2/5" />
        </div>
      </div>
    </div>
  );
}

// ── Solution Card ──────────────────────────────────────────────────────────
function SolutionCard({
  product,
  activeSegment,
  view = 'grid',
}: {
  product: any;
  activeSegment: string;
  view?: ViewMode;
}) {
  const imageUrl = product.images?.[0]?.url || product.images?.[0] || product.image || '';
  const hasImage = !!imageUrl;

  const categoryName   = product.category?.name || '';
  const productSegment = product.segment || product.targetSegment || product.group || '';
  const displaySegment = productSegment || activeSegment;
  const segmentBadge   = SEGMENT_BADGES[displaySegment];

  const useCase =
    product.shortDescription ||
    product.useCase ||
    (typeof product.description === 'string' ? product.description.slice(0, 100) : '') ||
    'Giải pháp AI & Robotics tiên tiến cho giáo dục và doanh nghiệp.';

  const ctaLabel = getCtaLabel(displaySegment);

  const imagePlaceholder = (compact = false) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className={cn(
        'rounded-2xl bg-white shadow-sm flex items-center justify-center',
        compact ? 'w-10 h-10' : 'w-14 h-14'
      )}>
        <ImageOff className={cn('text-gray-300', compact ? 'w-5 h-5' : 'w-7 h-7')} />
      </div>
      <span className={cn('text-gray-400 font-medium text-center leading-tight px-3',
        compact ? 'text-[10px]' : 'text-xs')}>
        {compact ? 'Đang cập nhật' : 'Đang cập nhật hình ảnh'}
      </span>
    </div>
  );

  const badges = (
    <div className="flex flex-wrap gap-1.5">
      {categoryName && (
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EEF3FF] text-[#0057FF] border border-blue-100">
          {categoryName}
        </span>
      )}
      {segmentBadge && (
        <span className={cn('px-2 py-0.5 rounded-md text-xs font-semibold border', segmentBadge.className)}>
          {segmentBadge.label}
        </span>
      )}
    </div>
  );

  // ── List view ────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <Link href={`/san-pham/${product.slug}`} className="group block">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex
          hover:border-[#0057FF]/20 hover:shadow-[0_4px_24px_rgba(0,87,255,0.08)] transition-all duration-300">
          {/* Image */}
          <div className="w-40 sm:w-52 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
            {hasImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
            ) : (
              imagePlaceholder(true)
            )}
          </div>
          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0 gap-3">
            <div className="space-y-2">
              {badges}
              <h3 className="text-sm sm:text-base font-bold text-[#1A1F36] line-clamp-2 leading-snug
                group-hover:text-[#0057FF] transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {useCase}
              </p>
            </div>
            <div className="pt-3 border-t border-gray-50">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0057FF]
                group-hover:gap-2.5 transition-all duration-200">
                {ctaLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ── Grid view ────────────────────────────────────────────────────────────
  return (
    <Link href={`/san-pham/${product.slug}`} className="group block h-full">
      <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col
        hover:border-[#0057FF]/20 hover:shadow-[0_8px_40px_rgba(0,87,255,0.09)] transition-all duration-300">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
          ) : (
            imagePlaceholder()
          )}
        </div>
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="mb-3">{badges}</div>
          <h3 className="text-[0.9375rem] font-bold text-[#1A1F36] mb-2 line-clamp-2 leading-snug
            group-hover:text-[#0057FF] transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
            {useCase}
          </p>
          <div className="pt-4 mt-4 border-t border-gray-50">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0057FF]
              group-hover:gap-2.5 transition-all duration-200">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Main content ───────────────────────────────────────────────────────────
function ProductsContent() {
  const searchParams = useSearchParams();
  const [view,    setView]    = useState<ViewMode>('grid');
  const [sidebar, setSidebar] = useState(false);
  const [params,  setParams]  = useState({
    page:     '1',
    limit:    '12',
    sort:     'newest',
    search:   searchParams.get('search')   || '',
    category: searchParams.get('category') || '',
    segment:  searchParams.get('segment')  || '',
    featured: searchParams.get('featured') || '',
  });

  useEffect(() => {
    setParams(p => ({
      ...p,
      search:   searchParams.get('search')   || '',
      category: searchParams.get('category') || '',
      segment:  searchParams.get('segment')  || '',
      featured: searchParams.get('featured') || '',
      page: '1',
    }));
  }, [searchParams.toString()]);

  const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== ''));
  const { data, isLoading, isFetching } = useQuery({
    queryKey:        ['products', params],
    queryFn:         () => fetchProducts(cleanParams),
    placeholderData: (prev) => prev,
  });
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const products   = data?.data || [];
  const pagination = data?.pagination;

  const update = (key: string, value: string) =>
    setParams(p => ({ ...p, [key]: value, page: '1' }));

  const resetFilters = () =>
    setParams({ page: '1', limit: '12', sort: 'newest', search: '', category: '', segment: '', featured: '' });

  const hasFilter = !!(params.search || params.category || params.segment || params.featured);

  const activeSegmentLabel = SEGMENTS.find(s => s.value === params.segment)?.label || 'Tất cả giải pháp';

  const pageTitle = params.search
    ? `Kết quả: "${params.search}"`
    : params.featured
    ? 'Giải pháp nổi bật'
    : params.segment
    ? `Giải pháp ${activeSegmentLabel}`
    : categories.find((c: any) => c.slug === params.category)?.name || 'Catalogue Giải Pháp';

  return (
    <div className="min-h-screen bg-[#F8FAFE]">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">

          {/* Breadcrumb */}
          <div className="text-xs text-gray-400 mb-5 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0057FF] transition-colors">Trang chủ</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#1A1F36] font-medium">Sản phẩm</span>
          </div>

          {/* Title row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1A1F36] tracking-tight mb-1.5">
                {pageTitle}
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                Hệ sinh thái AI & Robotics dành cho{' '}
                <span className="text-emerald-600 font-semibold">K12</span>,{' '}
                <span className="text-violet-600 font-semibold">Đại học</span> và{' '}
                <span className="text-sky-600 font-semibold">Doanh nghiệp</span>
              </p>
            </div>
            {pagination && (
              <span className="self-start sm:self-auto text-sm text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 font-medium whitespace-nowrap">
                {pagination.totalItems ?? pagination.total ?? products.length} giải pháp
              </span>
            )}
          </div>

          {/* ── Segment filter pills ─────────────────────────────────────── */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {SEGMENTS.map(seg => (
              <button
                key={seg.value}
                onClick={() => update('segment', seg.value)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap',
                  'border transition-all duration-200 flex-shrink-0',
                  params.segment === seg.value
                    ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-[0_4px_14px_rgba(0,87,255,0.25)]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]'
                )}
              >
                {seg.icon}
                {seg.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content area ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className={cn(
            'w-56 flex-shrink-0 space-y-3',
            sidebar
              ? 'fixed inset-0 z-50 w-72 bg-white p-5 overflow-y-auto shadow-2xl'
              : 'hidden lg:block'
          )}>
            {sidebar && (
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-[#1A1F36]">Bộ lọc</h3>
                <button onClick={() => setSidebar(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Danh mục */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
                Danh mục
              </h4>
              <div className="space-y-0.5">
                <button
                  onClick={() => update('category', '')}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
                    !params.category
                      ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                      : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50'
                  )}
                >
                  <Sparkles className="w-4 h-4 opacity-70" />
                  Tất cả danh mục
                </button>
                {categories.map((cat: any) => (
                  <button
                    key={cat._id}
                    onClick={() => update('category', cat.slug)}
                    className={cn(
                      'w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
                      params.category === cat.slug
                        ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                        : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50'
                    )}
                  >
                    <span className="opacity-60">{CAT_ICONS[cat.slug] || <Package className="w-4 h-4" />}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Nhóm sử dụng – only shown inside drawer on mobile */}
            {sidebar && (
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <h4 className="text-xs font-bold text-[#1A1F36] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="w-1 h-3.5 rounded-full bg-[#0057FF] inline-block" />
                  Nhóm sử dụng
                </h4>
                <div className="space-y-0.5">
                  {SEGMENTS.map(seg => (
                    <button
                      key={seg.value}
                      onClick={() => update('segment', seg.value)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2',
                        params.segment === seg.value
                          ? 'bg-[#EEF3FF] text-[#0057FF] font-semibold shadow-sm'
                          : 'text-gray-500 hover:text-[#1A1F36] hover:bg-gray-50'
                      )}
                    >
                      {seg.icon}
                      {seg.label || 'Tất cả'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasFilter && (
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-500 text-sm font-medium hover:bg-red-50 hover:border-red-200 transition-all"
              >
                <X className="w-3.5 h-3.5" />
                Xóa tất cả bộ lọc
              </button>
            )}
          </aside>

          {/* Mobile overlay */}
          {sidebar && (
            <div
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setSidebar(false)}
            />
          )}

          {/* ── Main ────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {/* Category chips */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                  {categories.map((cat: any) => (
                    <button
                      key={cat._id}
                      onClick={() => update('category', params.category === cat.slug ? '' : cat.slug)}
                      className={cn(
                        'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border',
                        params.category === cat.slug
                          ? 'bg-[#1A1F36] text-white border-[#1A1F36]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A1F36] hover:text-[#1A1F36]'
                      )}
                    >
                      <span className="opacity-70">{CAT_ICONS[cat.slug] || <Package className="w-3 h-3" />}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 ml-auto">
                {/* Search */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input
                    value={params.search}
                    onChange={e => update('search', e.target.value)}
                    placeholder="Tìm sản phẩm..."
                    className="pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#1A1F36]
                      placeholder:text-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2
                      focus:ring-[#0057FF]/10 w-40 transition-all focus:w-52"
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={params.sort}
                    onChange={e => update('sort', e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 bg-white
                      text-sm text-[#1A1F36] focus:outline-none focus:border-[#0057FF]
                      focus:ring-2 focus:ring-[#0057FF]/10 cursor-pointer"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setView('grid')}
                    className={cn('p-2.5 transition-all', view === 'grid' ? 'bg-[#0057FF] text-white' : 'text-gray-400 hover:bg-gray-50')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={cn('p-2.5 transition-all', view === 'list' ? 'bg-[#0057FF] text-white' : 'text-gray-400 hover:bg-gray-50')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebar(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white
                    text-sm text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden xs:inline">Lọc</span>
                </button>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilter && (
              <div className="flex flex-wrap gap-2 mb-4">
                {params.search && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    &ldquo;{params.search}&rdquo;
                    <button onClick={() => update('search', '')} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {params.category && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    {categories.find((c: any) => c.slug === params.category)?.name || params.category}
                    <button onClick={() => update('category', '')} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {params.segment && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    {SEGMENTS.find(s => s.value === params.segment)?.label || params.segment}
                    <button onClick={() => update('segment', '')} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                {params.featured && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FF] text-[#0057FF] text-xs font-medium border border-blue-100">
                    Nổi bật
                    <button onClick={() => update('featured', '')} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-medium border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                  Xóa lọc
                </button>
              </div>
            )}

            {/* ── Products ────────────────────────────────────────────── */}
            {isLoading ? (
              view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonListCard key={i} />)}
                </div>
              )
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-lg font-bold text-[#1A1F36] mb-2">
                  Không tìm thấy giải pháp phù hợp
                </p>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Thử thay đổi bộ lọc hoặc liên hệ đội tư vấn để được hỗ trợ tìm giải pháp phù hợp
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0057FF] to-[#003DA5] text-white
                      text-sm font-bold hover:shadow-[0_4px_16px_rgba(0,87,255,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Xem tất cả giải pháp
                  </button>
                  <Link
                    href="/lien-he"
                    className="px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-[#1A1F36]
                      text-sm font-semibold hover:border-[#0057FF] hover:text-[#0057FF] transition-all"
                  >
                    Liên hệ tư vấn
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className={cn(
                  'transition-opacity duration-200',
                  isFetching ? 'opacity-60' : 'opacity-100',
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                    : 'space-y-4'
                )}>
                  {products.map((p: any, idx: number) => (
                    <div
                      key={p._id}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="animate-fadeIn"
                    >
                      <SolutionCard product={p} activeSegment={params.segment} view={view} />
                    </div>
                  ))}
                </div>

                {/* Pagination (unchanged logic) */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) - 1) }))}
                      disabled={!pagination.hasPrev}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
                        hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      ← Trước
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const cur = Number(params.page);
                      let page: number;
                      if (pagination.totalPages <= 5)              page = i + 1;
                      else if (cur <= 3)                           page = i + 1;
                      else if (cur >= pagination.totalPages - 2)   page = pagination.totalPages - 4 + i;
                      else                                         page = cur - 2 + i;
                      return (
                        <button
                          key={page}
                          onClick={() => setParams(p => ({ ...p, page: String(page) }))}
                          className={cn(
                            'w-10 h-10 rounded-xl text-sm font-bold transition-all',
                            String(page) === params.page
                              ? 'bg-gradient-to-br from-[#0057FF] to-[#003DA5] text-white shadow-[0_4px_12px_rgba(0,87,255,0.3)]'
                              : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0057FF] hover:text-[#0057FF] hover:-translate-y-0.5'
                          )}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setParams(p => ({ ...p, page: String(Number(p.page) + 1) }))}
                      disabled={!pagination.hasNext}
                      className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-500
                        hover:border-[#0057FF] hover:text-[#0057FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
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

// ── Page export ────────────────────────────────────────────────────────────
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