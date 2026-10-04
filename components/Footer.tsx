import Link from "next/link";
import { Shield, Sparkles, MapPin, Phone, Mail, Award, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080B11] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-white text-lg">
                LUXE AUTO
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bespoke automotive detailing, certified ceramic coating suites, and executive fleet account management. Designed for vehicle owners and fleet managers who demand uncompromising precision.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> 5.0 Star Rated (140+ Concierge Reviews)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Signature Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/book" className="hover:text-red-400 transition-colors">
                  5-Year Graphene Ceramic Armor
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-red-400 transition-colors">
                  Multi-Stage Paint Correction & Gloss Revival
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-red-400 transition-colors">
                  Executive Leather & Sanctuary Sanitization
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-red-400 transition-colors">
                  Self-Healing Headlight PPF & Glass Shields
                </Link>
              </li>
              <li>
                <Link href="/crm" className="hover:text-red-400 transition-colors">
                  Commercial Fleet Maintenance Retainers
                </Link>
              </li>
            </ul>
          </div>

          {/* Operations & Capacity */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Capacity & Hours
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Mon – Fri: 7:30 AM – 6:30 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Saturday: 8:00 AM – 4:00 PM (VIP Only)</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Sunday: Closed (Cleanroom Air Curing)</span>
              </li>
              <li className="pt-2 text-[11px] text-amber-300">
                Notice: Bay slots must be reserved 3–4 weeks in advance.
              </li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Private Studio
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>850 Montgomery Blvd, Suite 100, Bay Area Cleanroom Facility</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href="tel:4158892020" className="hover:text-white transition-colors">
                  (415) 889-2020 (VIP Concierge)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:concierge@luxeautodetail.com" className="hover:text-white transition-colors">
                  concierge@luxeautodetail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LUXE Auto Detailing & Fleet CRM. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3 h-3 text-red-500" /> Carfax Licensed Warranty Reporter
            </span>
            <span>•</span>
            <Link href="/crm" className="hover:text-slate-300">
              Internal CRM Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
