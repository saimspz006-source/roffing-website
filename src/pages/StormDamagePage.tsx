import React from 'react';
import { WebsiteSettings } from '../types';
import {
  AlertTriangle,
  Wind,
  CloudHail,
  TreeDeciduous,
  Droplets,
  ShieldCheck,
  FileCheck2,
  Phone,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface StormDamagePageProps {
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const StormDamagePage: React.FC<StormDamagePageProps> = ({
  settings,
  navigate,
  openEstimateModal,
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Central Texas Hail & Wind Emergency Response</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Storm Damage to Your Roof?
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Central Texas storms can deliver devastating hail impact and straight-line wind damage. We provide rapid emergency tarping, forensic roof inspections, and complete insurance claim assistance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={openEstimateModal}
              className="px-6 py-3.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Get Emergency Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${settings.rawPhone}`}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Call 24/7 Dispatch ({settings.phone})</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Damage Visual & Forensic Analysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="/src/assets/images/storm_damage_inspection_1791780571369.jpg"
                alt="Forensic inspection of hail-damaged asphalt shingle in Austin"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">
              Don’t Wait For Leaks To Show Up Inside
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hidden Hail Damage Voids Manufacturer Warranties
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Hail stones as small as 1 inch can fracture the fiberglass mat of an asphalt shingle without tearing a visible hole immediately. Over the next 3 to 6 months, sunlight and rain wash away the loose protective granules, leaving the underlayment exposed to sudden attic leaks.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Texas insurance policies enforce strict filing deadlines (typically 12 months from the date of the certified storm event). Our team pulls official meteorological radar records for your exact address to validate the claim.
            </p>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1 text-slate-800">
              <div className="font-bold text-amber-900">Did You Know?</div>
              <div>Upgrading to a Class 4 impact-resistant roof after a hail storm can reduce your annual Texas homeowner insurance policy premium by up to 25%!</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Required Storm Services Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">
            Specialized Restoration Services
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Full-Spectrum Storm Recovery
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We handle everything from immediate stabilization to final insurance settlement checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Wind,
              title: 'Wind Damage Repair',
              desc: 'High wind gusts unseal shingle adhesive strips, lifting shingles and tearing off ridge caps. We re-seal loose areas and replace blown-off shingles.',
            },
            {
              icon: CloudHail,
              title: 'Hail Damage Restoration',
              desc: 'We map hail strikes using digital test squares, inspect soft metal vents, gutters, and AC fins for impact proof that insurance adjusters accept.',
            },
            {
              icon: TreeDeciduous,
              title: 'Fallen Tree & Limb Damage',
              desc: 'Emergency structural stabilization, rafter repair, damaged truss reinforcement, and removal of hazardous branches from your roof line.',
            },
            {
              icon: Droplets,
              title: 'Emergency Leak Inspection',
              desc: 'Moisture meters, infrared thermal cameras, and attic cavity scans to isolate the exact entry point of water before mold colonies form.',
            },
            {
              icon: ShieldCheck,
              title: 'Emergency Repair & Tarping',
              desc: '24/7 on-call dispatch with heavy-duty 10-mil industrial tarps securely battened down with 2x4 framing to keep your home 100% dry.',
            },
            {
              icon: FileCheck2,
              title: 'Insurance Claim Assistance',
              desc: 'We attend the insurance adjuster walkthrough in person, provide full Xactimate line-item estimates, and ensure all necessary supplements are paid.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Insurance Claims Step-by-Step Flow */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Step Insurance Claim Workflow
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              How we help Austin homeowners replace their roof with zero hassle and zero out-of-pocket beyond their deductible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Step 1',
                title: 'Free Forensic Inspection',
                desc: 'We thoroughly inspect the roof, document hail & wind damage with photos, and verify whether a claim is warranted.',
              },
              {
                step: 'Step 2',
                title: 'File The Claim',
                desc: 'We assist you in calling your insurance claims department with exact storm dates, hail sizes, and damage scope.',
              },
              {
                step: 'Step 3',
                title: 'Adjuster Meeting',
                desc: 'Our project manager climbs onto the roof alongside your adjuster to ensure every bruised shingle is counted.',
              },
              {
                step: 'Step 4',
                title: 'New Roof Installation',
                desc: 'We install your premium new roofing system, complete cleanup, and bill insurance directly for depreciation payout.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">{step.step}</span>
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-950 text-white rounded-3xl p-10 max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold">Suspect Storm Damage On Your Roof?</h2>
          <p className="text-slate-300 text-sm">
            Schedule an on-site inspection today before the next rain event causes thousands of dollars in interior ceiling damage.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={openEstimateModal}
              className="px-7 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
            >
              Get Emergency Inspection
            </button>
            <a
              href={`tel:${settings.rawPhone}`}
              className="px-7 py-3 bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl hover:bg-slate-800 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call ({settings.phone})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
