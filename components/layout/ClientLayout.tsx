"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/(auth)/signin");

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {!isAuthRoute && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        {!isAuthRoute && <Header onMenuClick={() => setSidebarOpen(true)} />}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
