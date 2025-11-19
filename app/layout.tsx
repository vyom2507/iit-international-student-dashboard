import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { IStudentsChatWidget } from "./api/chat/IStudentsChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IIT International Student Onboarding Dashboard",
  description:
    "Modern dashboard to support international students transitioning to Illinois Institute of Technology (IIT)."
};


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <div className="flex min-h-screen bg-slate-950 text-slate-100">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col">
              <TopNavbar />
              <main className="flex-1 overflow-y-auto bg-slate-900 p-4 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </I18nProvider>
        {/* Floating chat widget */}
        <IStudentsChatWidget />
      </body>
    </html>
  );
}
