"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Calendar, LayoutDashboard, Sparkles, PhoneCall } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      {/* Top Scarcity Ticker */}
      <div className="bg-red-950/40 border-b border-red-900/40 py-1.5 px-4 text-xs font-medium text-red-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>
              <strong>October Detail Bays 87% Full:</strong> 4 Weeks advance booking currently required.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> Authorized System X & Carfax Partner
            </span>
            <span className="text-slate-600">|</span>
            <a href="tel:4158892020" className="hover:text-red-400 transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> (415) 889-2020
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-wider font-bold text-lg text-white leading-none">
              LUXE AUTO
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-mono uppercase">
              Bespoke Detailing & Fleet CRM
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
              pathname === "/"
                ? "text-white bg-slate-800/60"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Services & Proof
          </Link>

          <Link
            href="/book"
            className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
              pathname === "/book"
                ? "text-red-400 bg-red-950/40 border border-red-800/40"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4 text-red-500" />
            <span>Book Slot</span>
          </Link>

          <Link
            href="/crm"
            className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md flex items-center gap-1.5 ${
              pathname === "/crm"
                ? "text-white bg-slate-800"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Fleet & Quotes CRM</span>
            <span className="sm:hidden">CRM</span>
          </Link>

          <Link
            href="/book"
            className="ml-2 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md shadow-red-900/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Lock 4-Wk Slot
          </Link>
        </nav>
      </div>
    </header>
  );
}
