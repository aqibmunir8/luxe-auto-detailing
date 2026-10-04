"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  VEHICLE_CATEGORIES,
  DETAILING_PACKAGES,
  SERVICE_ADDONS,
  DETAIL_BAYS,
} from "@/lib/mockData";
import { VehicleType, DetailingPackageId, BookingRecord } from "@/lib/types";
import { formatCurrency, formatDateString, generateBookingRef } from "@/lib/utils";
import ServiceCalculator from "@/components/ServiceCalculator";
import BookingCalendar from "@/components/BookingCalendar";
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Download,
  Share2,
} from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const initialPackage = (searchParams.get("package") as DetailingPackageId) || "ceramic-signature";
  const initialVehicle = (searchParams.get("vehicle") as VehicleType) || "coupe";

  // Step Tracker (1: Package & Options, 2: Slot & Location, 3: Vehicle & Contact, 4: Confirmed Receipt)
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(initialVehicle);
  const [selectedPackage, setSelectedPackage] = useState<DetailingPackageId>(initialPackage);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["wheel-ceramic"]);

  // Date and location state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const [selectedDate, setSelectedDate] = useState<string>(tomorrow.toISOString().split("T")[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("08:00 AM");
  const [selectedBayId, setSelectedBayId] = useState<string>("bay-1");
  const [isMobileService, setIsMobileService] = useState<boolean>(false);

  // Customer & Vehicle details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleYear: "2024",
    vehicleMake: "",
    vehicleModel: "",
    vehicleColor: "",
    notes: "",
    address: "",
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Calculations
  const currentVehicleObj =
    VEHICLE_CATEGORIES.find((v) => v.id === selectedVehicle) || VEHICLE_CATEGORIES[0];
  const currentPackageObj =
    DETAILING_PACKAGES.find((p) => p.id === selectedPackage) || DETAILING_PACKAGES[0];

  const basePackagePrice = Math.round(currentPackageObj.basePrice * currentVehicleObj.multiplier);
  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = basePackagePrice + addonsTotal;
  const depositRequired = Math.round(totalPrice * 0.2); // 20% deposit hold
  const totalDurationHours = currentPackageObj.durationHours + Math.ceil(selectedAddons.length * 0.75);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingRef = generateBookingRef();
    const newBooking: BookingRecord = {
      id: bookingRef,
      createdAt: new Date().toISOString(),
      customerName: formData.name || "VIP Client",
      customerEmail: formData.email || "client@vip.com",
      customerPhone: formData.phone || "(415) 000-0000",
      vehicleType: selectedVehicle,
      vehicleDetails: {
        year: formData.vehicleYear,
        make: formData.vehicleMake || "Exotic",
        model: formData.vehicleModel || "Vehicle",
        color: formData.vehicleColor || "Custom",
      },
      servicePackageId: selectedPackage,
      addons: selectedAddons,
      totalPrice,
      depositAmount: depositRequired,
      scheduledDate: selectedDate,
      timeSlot: selectedTimeSlot,
      bayId: selectedBayId,
      status: "deposit_paid",
      leadSource: "Meta Ad: 5Y Ceramic",
      notes: formData.notes,
      address: formData.address,
      isMobileService,
    };

    setConfirmedBooking(newBooking);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Concourse Detailing In-Take
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Custom Quote &amp; 4-Week Bay Reservation
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep === step
                      ? "bg-red-600 text-white"
                      : currentStep > step
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {currentStep > step ? "✓" : step}
                </div>
                {step < 3 && <div className="w-6 h-0.5 bg-slate-800" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Wizard */}
        <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {currentStep === 1 && (
            <div>
              <ServiceCalculator
                selectedVehicle={selectedVehicle}
                onVehicleChange={setSelectedVehicle}
                selectedPackage={selectedPackage}
                onPackageChange={setSelectedPackage}
                selectedAddons={selectedAddons}
                onAddonToggle={toggleAddon}
                totalPrice={totalPrice}
                totalDurationHours={totalDurationHours}
              />
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-red-950/50 flex items-center gap-2"
                >
                  <span>Proceed to Slot &amp; Bay Selection</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Select Detailing Bay &amp; Arrival Slot</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reserving this date locks out all competing inquiries for that bay during your service window.
                </p>
              </div>

              <BookingCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotChange={setSelectedTimeSlot}
                selectedBayId={selectedBayId}
                onBayChange={setSelectedBayId}
                isMobileService={isMobileService}
                onMobileServiceToggle={setIsMobileService}
              />

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Options</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-red-950/50 flex items-center gap-2"
                >
                  <span>Proceed to Vehicle &amp; Contact Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Client &amp; Vehicle Specifications</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Please provide vehicle specifics so our cleanroom technician can prepare the matching chemical chemistry and compound pads.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number (for SMS Slot Hold) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(415) 883-2901"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="julian@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Vehicle Year &amp; Make *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024 Porsche"
                    value={formData.vehicleMake}
                    onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 911 GT3 RS"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Paint Color / Finish
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shark Blue (Gloss) or Satin Black"
                    value={formData.vehicleColor}
                    onChange={(e) => setFormData({ ...formData, vehicleColor: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {isMobileService && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service Address for Mobile Concierge Van *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street, City, Zip Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Special Instructions or Problem Areas
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. heavy bird dropping etchings on hood, requires extra fine rotary jewel pass, or enclosed transport request."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Slots</span>
                </button>
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-xl shadow-red-950/60 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock Slot &amp; Generate Bespoke Quote</span>
                </button>
              </div>
            </form>
          )}

          {currentStep === 4 && confirmedBooking && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  VIP Bay Reservation Confirmed!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Booking Reference <strong className="text-white font-mono">{confirmedBooking.id}</strong> has been logged to the cleanroom operations calendar.
                </p>
              </div>

              {/* Automated Quote Follow-up Simulation Banner */}
              <div className="p-4 rounded-xl bg-slate-900 border border-red-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs text-red-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Automated Meta Ads Quote Drip Active</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We have dispatched an automated SMS with your bespoke PDF quote and private payment link to{" "}
                  <strong>{confirmedBooking.customerPhone}</strong>. Your slot is guaranteed held for 48 hours.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Scheduled Date:</span>
                  <span className="text-white font-semibold">{formatDateString(confirmedBooking.scheduledDate)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Arrival Time Slot:</span>
                  <span className="text-white font-semibold">{confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Assigned Studio Bay:</span>
                  <span className="text-white font-semibold">
                    {DETAIL_BAYS.find((b) => b.id === confirmedBooking.bayId)?.name || "Cleanroom Suite"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="text-white font-semibold">
                    {confirmedBooking.vehicleDetails.year} {confirmedBooking.vehicleDetails.make} {confirmedBooking.vehicleDetails.model}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Selected Package:</span>
                  <span className="text-white font-semibold">{currentPackageObj.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Deposit Amount (20%):</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(confirmedBooking.depositAmount)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-300 font-bold text-sm">Total Investment:</span>
                  <span className="text-white font-bold text-base">{formatCurrency(confirmedBooking.totalPrice)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/crm"
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wider uppercase text-center rounded-lg shadow-lg shadow-red-950/40"
                >
                  View Lead in CRM Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => alert("Calendar (.ics) invite downloaded.")}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold tracking-wider uppercase rounded-lg border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ICS Invite</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Sticky Summary & Trust Badges */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Live Quote Breakdown</span>
              <span className="text-[11px] font-mono text-red-400">{currentVehicleObj.name}</span>
            </h3>

            {/* Package details */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="text-slate-300 font-medium">{currentPackageObj.name}</span>
                <span className="text-white font-bold">{formatCurrency(basePackagePrice)}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{currentPackageObj.tagline}</p>
            </div>

            {/* Addons summary */}
            {selectedAddons.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 font-semibold block">Selected Add-Ons:</span>
                {selectedAddons.map((addonId) => {
                  const addon = SERVICE_ADDONS.find((a) => a.id === addonId);
                  if (!addon) return null;
                  return (
                    <div key={addonId} className="flex justify-between items-center text-slate-300">
                      <span>+ {addon.name}</span>
                      <span className="font-medium text-white">{formatCurrency(addon.price)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Total and bay hours */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-baseline text-xs text-slate-400">
                <span>Estimated Bay Duration:</span>
                <span className="text-white font-semibold">{totalDurationHours} Hours</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold text-white">Estimated Total:</span>
                <span className="text-2xl font-bold text-white">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs pt-1 text-slate-400">
                <span>Slot Lock Deposit (20%):</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(depositRequired)}</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Carfax Registered Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>48-Hour Free Cancellation or Reschedule</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center text-slate-400">Loading Concierge Booking Engine...</div>}>
      <BookingContent />
    </Suspense>
  );
}

