// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <div
        className="
          flex min-h-screen flex-1 flex-col
          bg-slate-100
          bg-[url('/main_bg.jpg')]  /* adjust extension if needed */
          bg-cover bg-center bg-no-repeat
        "
      >
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-slate-700/90 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
