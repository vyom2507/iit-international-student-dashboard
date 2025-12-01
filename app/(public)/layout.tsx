// app/(public)/layout.tsx
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* You can keep or remove TopNavbar here depending on your taste */}
      <TopNavbar />
      <main className="mx-auto max-w-6xl p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
