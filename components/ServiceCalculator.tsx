"use client";

import { useState } from "react";
import {
  VEHICLE_CATEGORIES,
  DETAILING_PACKAGES,
  SERVICE_ADDONS,
} from "@/lib/mockData";
import { VehicleType, DetailingPackageId } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Check, Sparkles, Car, Shield, Plus, Info } from "lucide-react";

interface ServiceCalculatorProps {
  selectedVehicle: VehicleType;
  onVehicleChange: (v: VehicleType) => void;
  selectedPackage: DetailingPackageId;
  onPackageChange: (p: DetailingPackageId) => void;
  selectedAddons: string[];
  onAddonToggle: (id: string) => void;
  totalPrice: number;
  totalDurationHours: number;
}

export default function ServiceCalculator({
  selectedVehicle,
  onVehicleChange,
  selectedPackage,
  onPackageChange,
  selectedAddons,
  onAddonToggle,
  totalPrice,
  totalDurationHours,
}: ServiceCalculatorProps) {
  const currentVehicle =
    VEHICLE_CATEGORIES.find((v) => v.id === selectedVehicle) ||
    VEHICLE_CATEGORIES[0];
  const currentPackage =
    DETAILING_PACKAGES.find((p) => p.id === selectedPackage) ||
    DETAILING_PACKAGES[0];

  return (
    <div className="space-y-10">
      {/* 1. Vehicle Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">
                1
              </span>
              Select Vehicle Classification
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pricing accounts for surface area, paint hardness, and correction complexity.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Size Multiplier: {currentVehicle.multiplier}x
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {VEHICLE_CATEGORIES.map((cat) => {
            const isSelected = cat.id === selectedVehicle;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onVehicleChange(cat.id)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-red-950/40 border-red-500 shadow-lg shadow-red-950/40 ring-1 ring-red-500"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Car
                      className={`w-5 h-5 ${
                        isSelected ? "text-red-400" : "text-slate-500"
                      }`}
                    />
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {cat.popularModels}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Service Package */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">
              2
            </span>
            Choose Core Detailing Package
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Every core package includes multi-stage paint decontamination bath &amp; iron cleanse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DETAILING_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackage;
            const packagePrice = Math.round(
              pkg.basePrice * currentVehicle.multiplier
            );

            return (
              <div
                key={pkg.id}
                onClick={() => onPackageChange(pkg.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-gradient-to-b from-slate-900 to-[#1b2438] border-red-500 ring-2 ring-red-500/80 shadow-xl"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-2.5 right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-white">
                      {pkg.name}
                    </h4>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-1.5 mb-5">
                    {pkg.features.slice(0, 3).map((f, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-300"
                      >
                        <Sparkles className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Est. {pkg.durationHours} hrs in Cleanroom
                  </span>
                  <span className="text-lg font-bold text-white">
                    {formatCurrency(packagePrice)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bespoke Add-Ons */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono">
              3
            </span>
            Customize Bespoke Add-Ons
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Optional precision protections applied while the vehicle is secured in the bay.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICE_ADDONS.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);

            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => onAddonToggle(addon.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? "bg-slate-900 border-red-500 ring-1 ring-red-500/60"
                    : "bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {addon.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {addon.description}
                  </p>
                  <div className="text-xs font-semibold text-red-400 pt-1">
                    +{formatCurrency(addon.price)}{" "}
                    <span className="text-[10px] text-slate-500 font-normal">
                      (~{addon.durationMinutes} min)
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-red-600 border-red-500 text-white"
                      : "border-slate-700 bg-slate-800 text-transparent"
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
