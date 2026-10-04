import { TrendingUp, Users, DollarSign, CalendarCheck, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CRMMetricsProps {
  fourWeekBookingRate?: number; // e.g. 87%
  projectedRevenue?: number; // e.g. 48,250
  activeFleetVehicles?: number; // e.g. 26
  metaAdLeadsThisMonth?: number; // e.g. 64
  metaAdConversionRate?: number; // e.g. 38.5%
}

export default function CRMMetrics({
  fourWeekBookingRate = 87,
  projectedRevenue = 48250,
  activeFleetVehicles = 26,
  metaAdLeadsThisMonth = 64,
  metaAdConversionRate = 38.5,
}: CRMMetricsProps) {
  const cards = [
    {
      label: "4-Week Capacity Fill",
      value: `${fourWeekBookingRate}%`,
      subtitle: "Target: 90% full 4-weeks out",
      badge: "+12% vs last month",
      isHighlight: true,
      icon: CalendarCheck,
    },
    {
      label: "Projected Monthly Revenue",
      value: formatCurrency(projectedRevenue),
      subtitle: "Includes recurring fleet contracts",
      badge: "+18.4% YoY",
      icon: DollarSign,
    },
    {
      label: "Active Fleet Vehicles",
      value: `${activeFleetVehicles} Units`,
      subtitle: "3 Corporate retainer accounts",
      badge: "100% On-Schedule",
      icon: Users,
    },
    {
      label: "Meta Ads Funnel CVR",
      value: `${metaAdConversionRate}%`,
      subtitle: `${metaAdLeadsThisMonth} high-intent leads captured`,
      badge: "High ROAS (5.2x)",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={i}
            className={`p-5 rounded-2xl border transition-all ${
              c.isHighlight
                ? "bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/40 border-red-500/50 shadow-xl shadow-red-950/20"
                : "bg-slate-900/60 border-slate-800"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {c.label}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  c.isHighlight
                    ? "bg-red-600/20 text-red-400"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {c.value}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                {c.badge}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">{c.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
