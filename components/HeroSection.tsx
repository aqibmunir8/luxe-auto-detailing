"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, CheckCircle2, Star, Zap } from "lucide-react";
import CapacityNotice from "./CapacityNotice";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function HeroSection() {
  const searchParams = useSearchParams();
  const utmCampaign = searchParams.get("utm_campaign") || "Meta Ad: 5Y Graphene Ceramic Priority";
  const utmSource = searchParams.get("utm_source") || "facebook";

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Meta Ads Campaign Intent Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-red-950/30 border border-red-800/40 px-4 py-2 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs text-red-200">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-red-400">
              Active Meta Campaign:
            </span>
            <span className="font-mono text-slate-300">
              {utmCampaign}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Includes <strong>$200 Off Ceramic Armor</strong> with 4-week advance booking</span>
          </div>
        </div>

        {/* Hero Copy & Core Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Certified 10H Ceramic Cleanroom Facility</span>
              <span className="text-slate-500">•</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              Flawless Paint. <br />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-300 bg-clip-text text-transparent">
                5-Year Hydrophobic Armor.
              </span>
              <br />
              Booked 4 Weeks Out.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              We don&apos;t do high-volume tunnel washes. We cater to exotic owners, executive vehicles, and luxury corporate fleets requiring multi-stage optical paint jewel correction and climate-cured ceramic coatings.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 98% swirl & scratch eradication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10H Extreme Graphene Hydrophobic Depth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Carfax-Verified Warranty Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Corporate Fleet Retainer Accounts</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-red-950/60 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Calculate Quote & Lock Slot</span>
              </Link>

              <Link
                href="/crm"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 text-sm font-semibold rounded-lg transition-colors hover:text-white"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Fleet CRM & Drip Portal</span>
              </Link>
            </div>
          </div>

          {/* Interactive Before/After Visual Proof */}
          <div className="lg:col-span-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Studio Proof
                </span>
                <span>Swirl Removal &amp; Optical Jewel Polish</span>
              </div>
              <BeforeAfterSlider beforeImage="/images/before.jpg" />
            </div>
          </div>
        </div>

        {/* Dynamic Capacity Scarcity Bar */}
        <CapacityNotice percentageBooked={87} availableBays={4} />
      </div>
    </section>
  );
}
