"use client";

import { useState } from "react";
import { QUOTE_DRIP_STEPS } from "@/lib/mockData";
import { BookingRecord } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  MessageSquare,
  Mail,
  PhoneCall,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  ArrowRight,
} from "lucide-react";

interface FollowUpSequencesProps {
  activeLead?: BookingRecord | null;
}

export default function FollowUpSequences({ activeLead }: FollowUpSequencesProps) {
  const [dispatchedSteps, setDispatchedSteps] = useState<number[]>([1]);
  const [activeLog, setActiveLog] = useState<string[]>([]);

  const handleSimulateSend = (stepNumber: number) => {
    if (!dispatchedSteps.includes(stepNumber)) {
      setDispatchedSteps([...dispatchedSteps, stepNumber]);
    }
    const step = QUOTE_DRIP_STEPS.find((s) => s.step === stepNumber);
    const targetName = activeLead ? activeLead.customerName : "Julian Vance";
    const targetPhone = activeLead ? activeLead.customerPhone : "(415) 883-2901";

    const logEntry = `[${new Date().toLocaleTimeString()}] Dispatched Step ${stepNumber} via ${step?.channel} to ${targetName} (${targetPhone}) - Status: Delivered (200 OK)`;
    setActiveLog((prev) => [logEntry, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Target Lead Context Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold font-mono">
            {activeLead ? activeLead.id : "LX-DEMO"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {activeLead ? activeLead.customerName : "Julian Vance (Active Meta Ad Lead)"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                Holding Bay 1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Vehicle: {activeLead ? `${activeLead.vehicleDetails.year} ${activeLead.vehicleDetails.make} ${activeLead.vehicleDetails.model}` : "2024 Porsche 911 GT3 RS"} • Total Quote: {activeLead ? formatCurrency(activeLead.totalPrice) : "$2,350"}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Automated Meta Cadence: <strong className="text-emerald-400">Step {dispatchedSteps.length} of 3 Triggered</strong>
        </div>
      </div>

      {/* 3-Stage Drip Pipeline Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {QUOTE_DRIP_STEPS.map((drip) => {
          const isTriggered = dispatchedSteps.includes(drip.step);

          return (
            <div
              key={drip.step}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all relative ${
                isTriggered
                  ? "bg-slate-900/80 border-red-500/60 ring-1 ring-red-500/30"
                  : "bg-slate-900/40 border-slate-800 opacity-90"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {drip.delayHours === 0 ? "Immediate (Hour 0)" : `Hour ${drip.delayHours}`}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase ${
                      drip.channel === "SMS"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-blue-950 text-blue-400 border border-blue-800"
                    }`}
                  >
                    {drip.channel}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2">{drip.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    Goal: <span className="text-slate-300 font-medium">{drip.conversionGoal}</span>
                  </p>
                </div>

                {/* Message Payload Preview */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono leading-relaxed relative">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1 font-sans">
                    Simulated Payload:
                  </div>
                  &ldquo;{drip.contentPreview}&rdquo;
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => handleSimulateSend(drip.step)}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isTriggered
                      ? "bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-600/50 text-emerald-300"
                      : "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-950/40"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTriggered ? "Re-Dispatch Message" : "Dispatch Trigger"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Activity & Drip Dispatch Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Live Automation Transmission Stream
          </h4>
          <span className="text-[10px] text-slate-500 font-mono">Meta Ads API Webhook Active</span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px] max-h-36 overflow-y-auto">
          {activeLog.length === 0 ? (
            <p className="text-slate-500 italic">No manual triggers fired in this view. Automated Day 0 SMS sent at booking creation.</p>
          ) : (
            activeLog.map((log, index) => (
              <div key={index} className="text-emerald-400 flex items-center gap-2">
                <span className="text-slate-600">›</span>
                <span>{log}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
