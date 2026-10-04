import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import {
  Shield,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileCheck2,
  Users,
} from "lucide-react";
import {
  VEHICLE_CATEGORIES,
  DETAILING_PACKAGES,
} from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero with Meta Ads intent and interactive proof */}
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-900" />}>
        <HeroSection />
      </Suspense>

      {/* Meta Ads Conversion Bridge Section */}
      <section className="py-16 bg-[#0E131F] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              The 4-Week Advance Booking Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Why We Book 4 Weeks Out &amp; How It Protects Your Vehicle
            </h2>
            <p className="text-sm text-slate-400">
              High-end paint correction and graphene ceramic armor cannot be rushed in 90 minutes. Here is how our high-intent funnel guarantees your dedicated bay reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative group hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-red-950/70 text-red-400 flex items-center justify-center mb-4 border border-red-800/50">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Dedicated 16-Hour Bay Hold</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                When you reserve a slot, that cleanroom bay and master detailer are locked exclusively to your VIN. No rushed turnover or multitasking.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative group hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-950/70 text-amber-400 flex items-center justify-center mb-4 border border-amber-800/50">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Automated 3-Stage Drip Quoting</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Receive instant transparent estimates, paint condition walk-through videos, and guaranteed 48-hour slot hold reminders via SMS &amp; email.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 relative group hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-950/70 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-800/50">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Carfax Warranty &amp; Longevity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our 5 &amp; 7-year ceramic treatments are officially logged to Carfax vehicle history, significantly enhancing your private resale value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Detailing Packages */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Concourse-Grade Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Curated Detailing Packages
            </h2>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors"
          >
            <span>Open Custom Price Calculator</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DETAILING_PACKAGES.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border flex flex-col justify-between p-6 sm:p-8 relative transition-all duration-300 ${
                pkg.badge
                  ? "bg-gradient-to-b from-slate-900 via-slate-900 to-[#161f30] border-red-600/50 shadow-2xl shadow-red-950/30"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-lg">
                  {pkg.badge}
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                </div>
                <p className="text-xs text-slate-400 min-h-[38px] leading-relaxed mb-6">
                  {pkg.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-800">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {formatCurrency(pkg.basePrice)}
                  </span>
                  <span className="text-xs text-slate-400">
                    starting / ~{pkg.durationHours} hrs bay time
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Protocol Inclusions:
                  </p>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Sparkles className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <Link
                  href={`/book?package=${pkg.id}`}
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    pkg.badge
                      ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950/50"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  <span>Select &amp; Reserve Bay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet Care CRM Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-950 via-[#111726] to-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-xs font-semibold text-amber-400">
                <Users className="w-3.5 h-3.5" /> Commercial &amp; Executive Fleets
              </div>
              <h2 className="text-3xl font-serif font-bold text-white">
                Managing a Luxury Chauffeur, Rental, or Corporate Fleet?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Keep your entire fleet immaculate with our automated B2B portal. Track bi-weekly mobile detailing visits, automated invoicing, ceramic maintenance boosters, and 24/7 dedicated bay reservations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
                <span>✓ Dedicated On-Site Mobile Unit</span>
                <span>✓ Consolidated Monthly Billing</span>
                <span>✓ Guaranteed 48-Hour Priority Bays</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/crm"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wider uppercase text-center rounded-lg shadow-xl shadow-red-950/50 transition-all"
              >
                Launch Fleet CRM Portal
              </Link>
              <Link
                href="/book?vehicle=fleet"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold tracking-wider uppercase text-center rounded-lg border border-slate-700 transition-colors"
              >
                Request Commercial Fleet Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
