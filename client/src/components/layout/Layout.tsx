import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-muted/20">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
