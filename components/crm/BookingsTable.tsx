"use client";

import { useState } from "react";
import { BookingRecord, LeadStatus } from "@/lib/types";
import { formatCurrency, formatDateString } from "@/lib/utils";
import { DETAILING_PACKAGES, DETAIL_BAYS } from "@/lib/mockData";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  MoreVertical,
  Car,
  ChevronRight,
  Phone,
  Mail,
  Shield,
} from "lucide-react";

interface BookingsTableProps {
  bookings: BookingRecord[];
  onStatusChange: (id: string, newStatus: LeadStatus) => void;
  onSendFollowUp: (booking: BookingRecord) => void;
}

export default function BookingsTable({
  bookings,
  onStatusChange,
  onSendFollowUp,
}: BookingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleDetails.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleDetails.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "new_inquiry":
        return { label: "New Inquiry", bg: "bg-blue-950/80 text-blue-400 border-blue-800/40" };
      case "quote_sent":
        return { label: "Quote Drip Sent", bg: "bg-amber-950/80 text-amber-400 border-amber-800/40" };
      case "deposit_paid":
        return { label: "Slot Locked (Deposit)", bg: "bg-emerald-950/80 text-emerald-400 border-emerald-800/40" };
      case "in_bay":
        return { label: "In Cleanroom Bay", bg: "bg-purple-950/80 text-purple-400 border-purple-800/40" };
      case "quality_check":
        return { label: "Quality Inspection", bg: "bg-cyan-950/80 text-cyan-400 border-cyan-800/40" };
      case "completed":
        return { label: "Completed & Carfax", bg: "bg-slate-800 text-slate-300 border-slate-700" };
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Table Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, VIN, vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Filter by status */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Pipeline:
          </span>
          {["all", "new_inquiry", "quote_sent", "deposit_paid", "in_bay"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-red-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Ref &amp; Client</th>
              <th className="py-3.5 px-4">Vehicle &amp; Package</th>
              <th className="py-3.5 px-4">Reserved Bay Slot</th>
              <th className="py-3.5 px-4">Lead Source</th>
              <th className="py-3.5 px-4">Total / Deposit</th>
              <th className="py-3.5 px-4">Pipeline Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {filtered.map((b) => {
              const badge = getStatusBadge(b.status);
              const pkgName =
                DETAILING_PACKAGES.find((p) => p.id === b.servicePackageId)?.name || b.servicePackageId;
              const bayName = DETAIL_BAYS.find((bay) => bay.id === b.bayId)?.name || "Mobile Van";

              return (
                <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                  {/* Client Info */}
                  <td className="py-4 px-4">
                    <div className="font-mono text-[11px] text-red-400 font-bold">{b.id}</div>
                    <div className="font-semibold text-white text-xs">{b.customerName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{b.customerPhone}</span>
                    </div>
                  </td>

                  {/* Vehicle & Package */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {b.vehicleDetails.year} {b.vehicleDetails.make} {b.vehicleDetails.model}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{pkgName}</div>
                  </td>

                  {/* Reserved Bay & Date */}
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-200">
                      {formatDateString(b.scheduledDate)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {b.timeSlot} • <span className="text-amber-400/90">{bayName}</span>
                    </div>
                  </td>

                  {/* Lead Source */}
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {b.leadSource}
                    </span>
                  </td>

                  {/* Total & Deposit */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{formatCurrency(b.totalPrice)}</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">
                      Dep: {formatCurrency(b.depositAmount)}
                    </div>
                  </td>

                  {/* Pipeline Status Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={b.status}
                      onChange={(e) => onStatusChange(b.id, e.target.value as LeadStatus)}
                      className={`text-[11px] font-semibold rounded-md px-2.5 py-1 border bg-slate-900 cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-500 ${badge.bg}`}
                    >
                      <option value="new_inquiry">New Inquiry</option>
                      <option value="quote_sent">Quote Drip Sent</option>
                      <option value="deposit_paid">Deposit Paid (Locked)</option>
                      <option value="in_bay">In Bay Detailing</option>
                      <option value="quality_check">Quality Check</option>
                      <option value="completed">Completed &amp; Warranty</option>
                    </select>
                  </td>

                  {/* Quick Action Button */}
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSendFollowUp(b)}
                      title="Send Next Automated Drip Sequence"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 border border-red-500/40 text-red-300 hover:text-white transition-all text-[11px] font-semibold"
                    >
                      <Send className="w-3 h-3" />
                      <span>Trigger Drip</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
