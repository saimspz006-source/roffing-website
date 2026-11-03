import React from 'react';
import { ServiceItem, WebsiteSettings } from '../types';
import {
  CheckCircle,
  Phone,
  Shield,
  ArrowRight,
  Clock,
  Award,
  AlertTriangle,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  settings,
  navigate,
  openEstimateModal,
}) => {
  // Check if this is the Roof Repair page
  const isRepairPage = service.slug === 'roof-repair';
  // Check if this is the Roof Replacement page
  const isReplacementPage = service.slug === 'roof-replacement';

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
            <button onClick={() => navigate('services')} className="hover:underline">
              Services
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{service.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                {service.name} in Austin, TX
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {service.shortDesc}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={openEstimateModal}
                  className="px-6 py-3.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 shadow-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {isRepairPage
                      ? 'Schedule a Roof Inspection'
                      : isReplacementPage
                      ? 'Request Replacement Estimate'
                      : 'Get Free Estimate'}
                  </span>
                </button>
                <a
                  href={`tel:${settings.rawPhone}`}
                  className="px-6 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
              <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                Service Specifications
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Coverage:</span>
                <span className="text-white font-semibold">Greater Austin Metro</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Estimated Cost:</span>
                <span className="text-amber-400 font-semibold">{service.priceRange}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Workmanship Warranty:</span>
                <span className="text-emerald-400 font-semibold">10-Year Guarantee</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Emergency Dispatch:</span>
                <span className="text-white font-semibold">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Visual */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Description & Sub-sections */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                About Our {service.name} Process
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                {service.fullDesc}
              </p>
            </div>

            {/* SPECIAL SECTION FOR ROOF REPAIR */}
            {isRepairPage && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Common Roof Damage We Repair Across Austin:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { title: 'Roof Leak Repair', desc: 'Forensic dye and moisture probe detection to locate concealed punctures.' },
                    { title: 'Missing Shingles', desc: 'Surgically matched shingle replacement sealed with hot asphalt adhesive.' },
                    { title: 'Damaged & Curled Shingles', desc: 'Replaced before wind can catch edges and rip out entire planes.' },
                    { title: 'Wind Damage', desc: 'Repair of unsealed starter strips and uplifted valleys.' },
                    { title: 'Storm Damage', desc: 'Hail bruise repair and impact fracture stabilization.' },
                    { title: 'Flashing Repair', desc: 'Custom copper or galvanized counter-flashing around chimneys, skylights, and valleys.' },
                    { title: 'Structural Damage', desc: 'Plywood sheathing replacement, rafter shoring, and rot mitigation.' },
                  ].map((r, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="font-bold text-slate-900">{r.title}</div>
                      <div className="text-slate-600 mt-1">{r.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={openEstimateModal}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 inline-flex items-center gap-2"
                  >
                    <span>Schedule a Roof Inspection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SPECIAL SECTION FOR ROOF REPLACEMENT */}
            {isReplacementPage && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Our Step-by-Step Austin Roof Replacement Protocol:
                </h3>
                <div className="space-y-3">
                  {[
                    { step: '01. Comprehensive Inspection', desc: 'We inspect decking condition, attic ventilation balance, and current shingle layers.' },
                    { step: '02. Complete Old Roof Tear-Off', desc: 'We strip down to bare plywood sheathing, never nailing over failing shingles.' },
                    { step: '03. Decking Repair & Substrate Prep', desc: 'Damaged or rotted CDX plywood boards are replaced to ensure solid anchor holding power.' },
                    { step: '04. Synthetic Underlayment & Ice Barrier', desc: 'High-temperature leak barriers installed in all roof valleys, eaves, and penetrations.' },
                    { step: '05. Precision Material Installation', desc: 'GAF, CertainTeed, or Standing Seam installed with 6-nail high-wind fastener patterns.' },
                    { step: '06. Thorough Magnetic Cleanup', desc: 'Driveways, grass, and flower beds swept multiple times with high-power magnets.' },
                    { step: '07. Warranty Registration & Certificate', desc: 'We deliver your 10-Year Workmanship Certificate and register your manufacturer warranty.' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex gap-3 items-start">
                      <div className="font-mono font-bold text-amber-700 shrink-0">{item.step.split('.')[0]}</div>
                      <div>
                        <div className="font-bold text-slate-900">{item.step.split('. ')[1]}</div>
                        <div className="text-slate-600 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={openEstimateModal}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 inline-flex items-center gap-2"
                  >
                    <span>Request Replacement Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Key Features Bullet List */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Included in Every Project:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual & Direct Request Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src={service.image}
                alt={service.name}
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Guaranteed Trust Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Why Choose Summit Pro For {service.name}?
              </h4>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>100% Licensed & Insured:</strong> We carry $2M liability so your property is shielded completely.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Class 4 Impact Certified:</strong> Qualifies Texas homeowners for up to 25% insurance premium discounts.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Rapid Turnaround:</strong> Most residential roof replacements are completed in a single 10-hour day.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openEstimateModal}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-colors shadow text-center"
                >
                  Schedule Your Free On-Site Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross Navigation to Other Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-12">
        <h3 className="text-xl font-bold text-slate-900 mb-6">
          Explore Other Roofing Solutions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Roof Replacement', route: 'roof-replacement' },
            { label: 'Roof Repair', route: 'roof-repair' },
            { label: 'Metal Roofing', route: 'metal-roofing' },
            { label: 'Commercial Flat Roofing', route: 'commercial-roofing' },
            { label: 'Storm Damage Claims', route: 'storm-damage' },
            { label: 'Emergency 24/7 Tarping', route: 'emergency-roofing' },
            { label: 'New Construction', route: 'roof-installation' },
            { label: 'Seamless Gutters', route: 'gutter-services' },
          ].map((item) => (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className="p-3 bg-white border border-slate-200 rounded-xl text-left hover:border-amber-500 font-semibold text-slate-800 transition-colors"
            >
              {item.label} →
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
