"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Users2,
  FileText,
  ClipboardList,
  UserCheck,
  MessageSquare,
  ChevronDown,
  Shield,
  Heart,
  MessageCircle,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    href: "/users",
    icon: Users,
  },
  {
    name: "Yuva Shakthi Members",
    href: "/yuva-shakthi",
    icon: Users2,
  },
  {
    name: "Complaints",
    href: "/complaints",
    icon: FileText,
  },
  {
    name: "Scheme Eligibility",
    href: "/scheme-eligibility",
    icon: ClipboardList,
  },
  {
    name: "Volunteers",
    href: "/volunteers",
    icon: UserCheck,
  },
];

const grievanceSubmenu = [
  {
    name: "General Grievances",
    href: "/grievances/general",
    icon: MessageSquare,
  },
  {
    name: "Mahila Shakti Grievances",
    href: "/grievances/mahila-shakti",
    icon: Heart,
  },
  {
    name: "Social Media Grievances",
    href: "/grievances/social-media",
    icon: MessageCircle,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [grievancesOpen, setGrievancesOpen] = useState(
    pathname.startsWith("/grievances")
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:translate-x-3 transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 shadow-sm border border-yellow-100"
                      : "text-gray-600 hover:text-yellow-900 hover:bg-yellow-50"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

            {/* Grievances with submenu */}
            <div>
              <button
                onClick={() => setGrievancesOpen(!grievancesOpen)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  pathname.startsWith("/grievances")
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 shadow-sm border border-yellow-100"
                    : "text-gray-600 hover:text-yellow-900 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">Grievances</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform flex-shrink-0",
                    grievancesOpen && "rotate-180"
                  )}
                />
              </button>

              {grievancesOpen && (
                <div className="ml-8 mt-2 space-y-1">
                  {grievanceSubmenu.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg hover:translate-x-3 transition-all duration-200",
                          isActive
                            ? "bg-yellow-50 text-yellow-700 font-medium"
                            : "text-gray-500 hover:text-yellow-700 hover:bg-gray-50"
                        )}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
