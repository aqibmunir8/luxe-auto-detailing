"use client";

import { useState } from "react";
import { DETAIL_BAYS } from "@/lib/mockData";
import { formatDateString, getDatesForNextWeeks } from "@/lib/utils";
import { Calendar, Clock, AlertTriangle, ShieldCheck, Check } from "lucide-react";

interface BookingCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedTimeSlot: string;
  onTimeSlotChange: (slot: string) => void;
  selectedBayId: string;
  onBayChange: (bayId: string) => void;
  isMobileService: boolean;
  onMobileServiceToggle: (mobile: boolean) => void;
}

export default function BookingCalendar({
  selectedDate,
  onDateChange,
  selectedTimeSlot,
  onTimeSlotChange,
  selectedBayId,
  onBayChange,
  isMobileService,
  onMobileServiceToggle,
}: BookingCalendarProps) {
  const dates = getDatesForNextWeeks(4);

  // Time options for the selected bay
  const timeSlots = [
    { time: "08:00 AM", period: "Morning VIP In-Take", available: true },
    { time: "09:30 AM", period: "Morning Secondary", available: true },
    { time: "01:00 PM", period: "Afternoon Infrared Curing", available: true },
    { time: "02:30 PM", period: "Afternoon Secondary", available: false, reason: "Reserved" },
  ];

  return (
    <div className="space-y-8">
      {/* Detailing Location: Cleanroom Bay vs Mobile Van */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Service Location Preference</h4>
          <p className="text-xs text-slate-400">
            Choose our climate-controlled dust-free facility or our self-contained mobile concierge van.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMobileServiceToggle(false)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              !isMobileService
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Cleanroom Studio (Bay 1-3)
          </button>
          <button
            type="button"
            onClick={() => onMobileServiceToggle(true)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              isMobileService
                ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            Mobile Concierge Van
          </button>
        </div>
      </div>

      {/* Detailing Bay Selector (if studio) */}
      {!isMobileService && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Dedicated Cleanroom Suite
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DETAIL_BAYS.slice(0, 3).map((bay) => {
              const isSelected = selectedBayId === bay.id;
              return (
                <div
                  key={bay.id}
                  onClick={() => onBayChange(bay.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-left transition-all ${
                    isSelected
                      ? "bg-red-950/30 border-red-500 ring-1 ring-red-500/80"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{bay.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-red-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">{bay.specialty}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Date Picker: 4-Week Advance Availability Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            Select Appointment Date (Next 4-Week Window)
          </label>
          <span className="text-[11px] text-amber-400 font-medium">
            Limited VIP Bays Open
          </span>
        </div>

        {/* Scrollable date strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {dates.map((dateStr) => {
            const isSelected = selectedDate === dateStr;
            const d = new Date(dateStr + "T00:00:00");
            const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
            const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const isSaturday = d.getDay() === 6;

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onDateChange(dateStr)}
                className={`flex-shrink-0 w-24 p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/50"
                    : "bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {dayName}
                </span>
                <span className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-100"}`}>
                  {monthDay}
                </span>
                {isSaturday && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                    VIP Sat
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <p className="text-xs text-slate-400">
            Selected Date: <strong className="text-white">{formatDateString(selectedDate)}</strong>
          </p>
        )}
      </div>

      {/* Available Slot Hours */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-red-500" />
          Select In-Take Arrival Slot
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timeSlots.map((slot, index) => {
            const isSelected = selectedTimeSlot === slot.time;
            return (
              <button
                key={index}
                type="button"
                disabled={!slot.available}
                onClick={() => onTimeSlotChange(slot.time)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  !slot.available
                    ? "bg-slate-900/20 border-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                    : isSelected
                    ? "bg-red-950/40 border-red-500 ring-1 ring-red-500 text-white shadow-lg"
                    : "bg-slate-900/50 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold">{slot.time}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {slot.available ? slot.period : slot.reason}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
