"use client";

import { useState } from "react";
import { FleetAccount } from "@/lib/types";
import { INITIAL_FLEET_ACCOUNTS } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  Building2,
  Car,
  Calendar,
  DollarSign,
  Plus,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

export default function FleetManager() {
  const [fleetAccounts, setFleetAccounts] = useState<FleetAccount[]>(INITIAL_FLEET_ACCOUNTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    totalVehicles: 5,
    monthlyRetainer: 3500,
    contractTier: "Gold Fleet (Bi-Weekly)" as FleetAccount["contractTier"],
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newAcct: FleetAccount = {
      id: `FL-${Math.floor(100 + Math.random() * 900)}`,
      companyName: newCompany.companyName,
      contactPerson: newCompany.contactPerson,
      email: newCompany.email,
      phone: newCompany.phone,
      totalVehicles: Number(newCompany.totalVehicles),
      contractTier: newCompany.contractTier,
      monthlyRetainer: Number(newCompany.monthlyRetainer),
      activeStatus: "active",
      lastServiceDate: new Date().toISOString().split("T")[0],
      nextScheduledDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    };

    setFleetAccounts([newAcct, ...fleetAccounts]);
    setShowAddModal(false);
    setNewCompany({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      totalVehicles: 5,
      monthlyRetainer: 3500,
      contractTier: "Gold Fleet (Bi-Weekly)",
    });
  };

  const totalMonthlyRetainers = fleetAccounts.reduce((acc, ac) => acc + ac.monthlyRetainer, 0);
  const totalFleetVehicles = fleetAccounts.reduce((acc, ac) => acc + ac.totalVehicles, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner KPI for B2B Accounts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Active Fleet Retainers
          </span>
          <span className="text-2xl font-bold text-white">
            {formatCurrency(totalMonthlyRetainers)} / mo
          </span>
          <p className="text-[11px] text-emerald-400 mt-1">Guaranteed recurring monthly volume</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Total Contracted Units
          </span>
          <span className="text-2xl font-bold text-white">
            {totalFleetVehicles} Commercial Vehicles
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Executive transport, luxury rentals</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Contract Renewal Rate
            </span>
            <span className="text-2xl font-bold text-emerald-400">96.8%</span>
            <p className="text-[11px] text-slate-400 mt-1">Zero churn last 6 months</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-950/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Fleet</span>
          </button>
        </div>
      </div>

      {/* Corporate Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fleetAccounts.map((fleet) => (
          <div
            key={fleet.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono text-red-400 block mb-0.5">{fleet.id}</span>
                  <h4 className="text-base font-bold text-white leading-snug">{fleet.companyName}</h4>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                    fleet.activeStatus === "active"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-amber-950 text-amber-400 border border-amber-800"
                  }`}
                >
                  {fleet.activeStatus.replace("_", " ")}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tier Contract:</span>
                  <span className="font-semibold text-white">{fleet.contractTier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Fleet Size:</span>
                  <span className="font-semibold text-white">{fleet.totalVehicles} Vehicles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Monthly Retainer:</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(fleet.monthlyRetainer)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Service Visit:</span>
                  <span className="text-amber-400 font-medium">{fleet.nextScheduledDate}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>POC: {fleet.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{fleet.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{fleet.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Dispatching Mobile Detailing Van to ${fleet.companyName}`)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors text-center"
              >
                Dispatch Mobile Unit
              </button>
              <button
                type="button"
                onClick={() => alert(`Generated B2B Monthly Invoice for ${fleet.companyName}`)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                title="Generate Invoice PDF"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Fleet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Enroll Corporate Fleet Account</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company / Fleet Entity *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Luxury Rentals"
                  value={newCompany.companyName}
                  onChange={(e) => setNewCompany({ ...newCompany, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fleet Manager Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={newCompany.contactPerson}
                    onChange={(e) => setNewCompany({ ...newCompany, contactPerson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(415) 555-0199"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Billing Email *</label>
                <input
                  type="email"
                  required
                  placeholder="accounts@apexrentals.com"
                  value={newCompany.email}
                  onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Vehicles Enrolled</label>
                  <input
                    type="number"
                    min="2"
                    value={newCompany.totalVehicles}
                    onChange={(e) => setNewCompany({ ...newCompany, totalVehicles: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Monthly Retainer ($)</label>
                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={newCompany.monthlyRetainer}
                    onChange={(e) => setNewCompany({ ...newCompany, monthlyRetainer: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                >
                  Confirm Fleet Retainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
