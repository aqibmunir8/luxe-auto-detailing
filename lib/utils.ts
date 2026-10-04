import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateString(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateBookingRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "LX-";
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export function getDatesForNextWeeks(weeksAhead: number = 4): string[] {
  const dates: string[] = [];
  const today = new Date();

  // start tomorrow
  for (let i = 1; i <= weeksAhead * 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    // Exclude Sundays if shop is closed
    if (d.getDay() !== 0) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  return dates;
}
