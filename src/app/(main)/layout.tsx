import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="site-header"><Header /></div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
