export type VehicleType = 'coupe' | 'sedan' | 'suv' | 'truck' | 'fleet';

export interface VehicleCategory {
  id: VehicleType;
  name: string;
  description: string;
  multiplier: number;
  popularModels: string;
  iconName: string;
}

export type DetailingPackageId =
  | 'ceramic-signature'
  | 'paint-correction-pro'
  | 'interior-executive'
  | 'connoisseur-full'
  | 'fleet-shield';

export interface DetailingPackage {
  id: DetailingPackageId;
  name: string;
  badge?: string;
  tagline: string;
  basePrice: number;
  durationHours: number;
  warrantyYears?: number;
  features: string[];
  recommendedFor: string;
}

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: 'exterior' | 'interior' | 'protection';
}

export interface DetailBay {
  id: string;
  name: string;
  specialty: string;
  maxPerDay: number;
}

export interface TimeSlot {
  id: string;
  time: string; // e.g. "08:30 AM", "01:30 PM"
  period: 'morning' | 'afternoon';
  bayId: string;
  available: boolean;
  statusText?: string;
}

export type LeadStatus =
  | 'new_inquiry'
  | 'quote_sent'
  | 'deposit_paid'
  | 'in_bay'
  | 'quality_check'
  | 'completed';

export interface BookingRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleDetails: {
    year: string;
    make: string;
    model: string;
    color: string;
  };
  servicePackageId: DetailingPackageId;
  addons: string[];
  totalPrice: number;
  depositAmount: number;
  scheduledDate: string; // YYYY-MM-DD
  timeSlot: string;
  bayId: string;
  status: LeadStatus;
  leadSource: 'Meta Ad: 5Y Ceramic' | 'Meta Ad: Executive Fleet' | 'Google Search' | 'Direct Referral' | 'Organic Concierge';
  followUpStep?: number;
  notes?: string;
  address?: string;
  isMobileService: boolean;
}

export interface FleetAccount {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  totalVehicles: number;
  contractTier: 'Gold Fleet (Bi-Weekly)' | 'Platinum Corporate (Weekly)' | 'Titanium Executive';
  monthlyRetainer: number;
  activeStatus: 'active' | 'renewal_due' | 'in_discussion';
  lastServiceDate: string;
  nextScheduledDate: string;
}

export interface QuoteDripStep {
  step: number;
  delayHours: number;
  title: string;
  channel: 'SMS' | 'EMAIL' | 'CONCIERGE_CALL';
  contentPreview: string;
  conversionGoal: string;
}
