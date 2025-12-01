// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
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
          {children}
        </I18nProvider>
        {/* Floating chat widget */}
        <IStudentsChatWidget />
      </body>
    </html>
  );
}
