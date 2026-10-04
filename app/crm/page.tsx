"use client";

import { useState } from "react";
import CRMMetrics from "@/components/crm/CRMMetrics";
import BookingsTable from "@/components/crm/BookingsTable";
import FleetManager from "@/components/crm/FleetManager";
import FollowUpSequences from "@/components/crm/FollowUpSequences";
import { INITIAL_BOOKINGS } from "@/lib/mockData";
import { BookingRecord, LeadStatus } from "@/lib/types";
import {
  CalendarDays,
  Users,
  Send,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "fleets" | "sequences">("pipeline");
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [selectedLeadForFollowUp, setSelectedLeadForFollowUp] = useState<BookingRecord | null>(
    INITIAL_BOOKINGS[0]
  );

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleSendFollowUp = (booking: BookingRecord) => {
    setSelectedLeadForFollowUp(booking);
    setActiveTab("sequences");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top CRM Title & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Operations Headquarters
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              Bay 1-3 &amp; Mobile 1 Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Fleet CRM &amp; Meta Ad Lead Engine
          </h1>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "pipeline"
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Bookings &amp; Bay Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fleets")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "fleets"
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Fleet Retainers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sequences")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "sequences"
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Automated Drip Sequences</span>
          </button>
        </div>
      </div>

      {/* Top KPIs & 4-Week Gauge */}
      <CRMMetrics
        fourWeekBookingRate={87}
        projectedRevenue={48250}
        activeFleetVehicles={26}
        metaAdLeadsThisMonth={64}
        metaAdConversionRate={38.5}
      />

      {/* Active Tab View */}
      {activeTab === "pipeline" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Active Detailing Bay Reservations &amp; Inquiries</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                {bookings.length} Records
              </span>
            </h2>
          </div>
          <BookingsTable
            bookings={bookings}
            onStatusChange={handleStatusChange}
            onSendFollowUp={handleSendFollowUp}
          />
        </div>
      )}

      {activeTab === "fleets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Corporate &amp; Executive Fleet Accounts</h2>
          </div>
          <FleetManager />
        </div>
      )}

      {activeTab === "sequences" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">3-Stage Automated Quote Follow-Up Sequences</h2>
              <p className="text-xs text-slate-400">
                Drives 4-week advance booking lockouts by establishing urgency, social proof, and cleanroom slot reservation expiration.
              </p>
            </div>
          </div>
          <FollowUpSequences activeLead={selectedLeadForFollowUp} />
        </div>
      )}
    </div>
  );
}
