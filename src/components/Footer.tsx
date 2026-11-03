import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface FooterProps {
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  navigate,
  openEstimateModal,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 md:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-footer Callout Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 mb-16 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Protect Your Home With a Stronger Roof.
            </h3>
            <p className="text-amber-950 font-medium text-sm sm:text-base">
              Call our Austin team today for a free on-site roof inspection and guaranteed estimate.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${settings.rawPhone}`}
              className="px-6 py-3 bg-slate-950 text-white font-bold text-sm rounded-lg hover:bg-slate-900 transition-colors shadow-md inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {settings.phone}</span>
            </a>
            <button
              onClick={openEstimateModal}
              className="px-6 py-3 bg-white text-slate-950 font-bold text-sm rounded-lg hover:bg-amber-50 transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-black text-lg">
                SP
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {settings.companyName}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Austin’s trusted, licensed & insured roofing contractor. We specialize in residential roof replacement, commercial flat roofing, storm damage insurance claims, and emergency leak repair.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Texas License: {settings.licenseNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.insuranceCoverage}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Roofing Services
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                { label: 'Roof Replacement', route: 'roof-replacement' },
                { label: 'Roof Repair', route: 'roof-repair' },
                { label: 'New Roof Installation', route: 'roof-installation' },
                { label: 'Storm Damage & Hail', route: 'storm-damage' },
                { label: 'Metal Standing Seam', route: 'metal-roofing' },
                { label: 'Architectural Shingles', route: 'shingle-roofing' },
                { label: 'Commercial Flat Roofing', route: 'commercial-roofing' },
                { label: '24/7 Emergency Service', route: 'emergency-roofing' },
              ].map((s) => (
                <li key={s.route}>
                  <button
                    onClick={() => navigate(s.route)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Central Texas Service Areas
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {[
                { label: 'Austin', slug: 'austin' },
                { label: 'Round Rock', slug: 'round-rock' },
                { label: 'Cedar Park', slug: 'cedar-park' },
                { label: 'Pflugerville', slug: 'pflugerville' },
                { label: 'Georgetown', slug: 'georgetown' },
                { label: 'Leander', slug: 'leander' },
                { label: 'Kyle', slug: 'kyle' },
                { label: 'Buda', slug: 'buda' },
              ].map((a) => (
                <li key={a.slug}>
                  <button
                    onClick={() => navigate(`service-area/${a.slug}`)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {a.label}, TX
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-900 space-y-2">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                Explore More
              </h5>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                <button onClick={() => navigate('materials')} className="hover:text-amber-400">Roof Materials</button>
                <button onClick={() => navigate('financing')} className="hover:text-amber-400">Financing Plans</button>
                <button onClick={() => navigate('reviews')} className="hover:text-amber-400">Reviews</button>
                <button onClick={() => navigate('faq')} className="hover:text-amber-400">FAQ</button>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Business Hours & Office
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${settings.rawPhone}`} className="text-white font-medium hover:text-amber-400">
                    {settings.phone}
                  </a>
                  <div className="text-xs text-slate-500">Dispatch & Office</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-amber-400">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{settings.businessHours}</div>
                  <div className="text-xs text-emerald-400 font-semibold">Emergency Tarping: 24/7/365</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved. Registered roofing contractor in Austin, Texas.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('privacy-policy')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('terms')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => navigate('admin')}
              className="hover:text-amber-400 font-semibold text-slate-400 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Sample notice indicator for transparency */}
        {settings.isDemoMode && (
          <div className="mt-4 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-600">
            Notice: This website is configured in Demo Mode for Summit Pro Roofing. Customer reviews and project showcases are realistic sample representations for sales demonstration purposes and can be edited or replaced anytime in the Admin Dashboard.
          </div>
        )}
      </div>
    </footer>
  );
};
