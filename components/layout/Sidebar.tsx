"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  MapPin,
  School,
  Users,
  FileText,
  Plane,
  LayoutDashboard,
  ShoppingBag,
  UserCircle  
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Pre-Arrival",
    href: "/pre-arrival",
    icon: Plane
  },
  {
    label: "Campus Navigation",
    href: "/campus-navigation",
    icon: MapPin
  },
  {
    label: "Academic Integration",
    href: "/academic-integration",
    icon: School
  },
  {
    label: "Social Networking",
    href: "/social-networking",
    icon: Users
  },
  {
    label: "Resource Directory",
    href: "/resource-directory",
    icon: FileText
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCircle
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        md:flex
        sticky top-0
        h-screen
        w-64 flex-shrink-0 flex-col
        bg-black/95
        shadow-2xl
      "
    >
      {/* Brand header */}
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white shadow-lg">
          <span className="text-lg font-bold">IIT</span>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-slate-50">
            IIT Intl Student Hub
          </p>
          <p className="text-xs text-slate-400">
            Illinois Institute of Technology · Chicago
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                "text-slate-200 hover:bg-red-600 hover:text-white",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
                isActive && "bg-red-600 text-white shadow-lg shadow-red-900/40"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer tip */}
      <div className="border-t border-slate-800 px-4 py-3">
        <p className="text-xs text-slate-500">
          Tip: Bookmark this dashboard to access your IIT support toolkit in one
          click.
        </p>
      </div>
    </aside>
  );
}
