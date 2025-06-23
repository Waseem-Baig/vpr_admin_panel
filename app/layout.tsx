"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/(auth)/signin");

  return (
    <html lang="en">
      <body className={inter.className}>
        <head>
          <title>VPR Admin Panel</title>
          <meta name="description" content="Admin panel for VPR platform" />
        </head>
        <div className="h-screen flex overflow-hidden bg-gray-50">
          {!isAuthRoute && (
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          )}
          <div className="flex-1 flex flex-col min-w-0">
            {!isAuthRoute && (
              <Header onMenuClick={() => setSidebarOpen(true)} />
            )}
            <main className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
