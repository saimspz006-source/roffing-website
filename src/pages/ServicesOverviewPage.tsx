import React from 'react';
import { ServiceItem, WebsiteSettings } from '../types';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';

interface ServicesOverviewPageProps {
  services: ServiceItem[];
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const ServicesOverviewPage: React.FC<ServicesOverviewPageProps> = ({
  services,
  settings,
  navigate,
  openEstimateModal,
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Professional Roofing Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Complete Roofing Systems for Central Texas
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            From precision leak repair and hail restorations to standing seam metal installations and commercial flat roof systems.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={svc.image}
                  alt={svc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                  {svc.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-amber-600 transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    {svc.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Estimated Investment</div>
                    <div className="text-xs font-bold text-slate-800">{svc.priceRange}</div>
                  </div>
                  <button
                    onClick={() => navigate(svc.slug)}
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unsure which roofing service your home requires?
            </h3>
            <p className="text-amber-950 text-sm font-medium">
              We provide free forensic drone inspections with detailed photos and honest recommendations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openEstimateModal}
              className="px-6 py-3 bg-slate-950 text-white font-bold text-xs rounded-xl hover:bg-slate-900 transition-colors shadow"
            >
              Get Free Estimate
            </button>
            <a
              href={`tel:${settings.rawPhone}`}
              className="px-6 py-3 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-50 transition-colors shadow flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call ({settings.phone})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
