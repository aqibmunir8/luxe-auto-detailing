import { AlertCircle, CalendarClock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CapacityNoticeProps {
  percentageBooked?: number;
  availableBays?: number;
}

export default function CapacityNotice({
  percentageBooked = 87,
  availableBays = 4,
}: CapacityNoticeProps) {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-red-950/40 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white flex items-center gap-1">
              <CalendarClock className="w-3 h-3" /> 4-Week Advance Window
            </span>
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> High Demand Season
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            October Detailing Bays are {percentageBooked}% Booked
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Due to our stringent 24-hour climate cleanroom infrared curing protocols, we strictly limit capacity to preserve concourse-grade quality. Only{" "}
            <span className="text-white font-semibold underline decoration-red-500 decoration-2">
              {availableBays} VIP Detailing Bay reservations
            </span>{" "}
            remain for the next 28 days.
          </p>
        </div>

        {/* Progress bar & CTA */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 min-w-[220px]">
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-red-700 to-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentageBooked}%` }}
            />
          </div>
          <div className="flex items-center justify-between w-full text-[11px] text-slate-400">
            <span>Shop Capacity: {percentageBooked}%</span>
            <span className="text-emerald-400 font-semibold">{availableBays} Slots Open</span>
          </div>
          <Link
            href="/book"
            className="w-full text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all shadow-md shadow-red-950/40 hover:-translate-y-0.5"
          >
            Claim Bay Slot
          </Link>
        </div>
      </div>
    </div>
  );
}
