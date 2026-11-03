import React from 'react';
import { ServiceArea, ServiceItem, WebsiteSettings } from '../types';
import { MapPin, Phone, ArrowRight, Shield, CheckCircle, Clock, FileText } from 'lucide-react';

interface ServiceAreasPageProps {
  areas: ServiceArea[];
  services: ServiceItem[];
  settings: WebsiteSettings;
  selectedSlug?: string;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({
  areas,
  services,
  settings,
  selectedSlug,
  navigate,
  openEstimateModal,
}) => {
  const activeArea = selectedSlug
    ? areas.find((a) => a.slug === selectedSlug)
    : null;

  // If a specific area is selected, render the dedicated localized landing page
  if (activeArea) {
    return (
      <div className="space-y-16 pb-20">
        {/* Localized SEO Hero */}
        <section className="bg-slate-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dedicated Roofing Crew Dispatch: {activeArea.name}, Texas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {activeArea.headline}
            </h1>

            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              {activeArea.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={openEstimateModal}
                className="px-6 py-3.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 shadow-md inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get Free Estimate in {activeArea.name}</span>
              </button>

              <a
                href={`tel:${settings.rawPhone}`}
                className="px-6 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Local Hotline ({activeArea.phone || settings.phone})</span>
              </a>
            </div>
          </div>
        </section>

        {/* Localized Details & Landmarks */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Reliable Residential & Commercial Roofing in {activeArea.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether your roof suffered wind damage, missing asphalt granules, or you are looking to upgrade to an energy-saving standing seam metal roof, Summit Pro Roofing provides guaranteed craftsmanship for homeowners across {activeArea.name} and neighboring subdivisions.
              </p>

              {activeArea.landmarks && activeArea.landmarks.length > 0 && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Neighborhoods & Landmarks We Regularly Serve in {activeArea.name}:
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeArea.landmarks.map((lm, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                      >
                        {lm}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service list available in this city */}
              <div className="space-y-3 pt-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Roofing Services Available in {activeArea.name}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => navigate(svc.slug)}
                      className="p-3 bg-white border border-slate-200 rounded-xl text-left hover:border-amber-500 transition-colors flex items-center justify-between"
                    >
                      <span className="font-bold text-slate-800">{svc.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Local Trust & ZIP codes */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="font-extrabold text-base text-slate-900">
                {activeArea.name} Service Guarantees
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Licensed in Texas:</strong> Permitted in accordance with municipal city building codes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Same-Day Dispatch:</strong> Rapid response for emergency tarps and storm leaks in {activeArea.name}.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>10-Year Workmanship Warranty:</strong> Fully backed labor guarantee on full replacements.</span>
                </div>
              </div>

              {activeArea.zipCodes && activeArea.zipCodes.length > 0 && (
                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">Covered ZIP Codes:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeArea.zipCodes.map((zip) => (
                      <span key={zip} className="px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 font-mono text-[11px]">
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={openEstimateModal}
                className="w-full py-3 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow"
              >
                Book Inspection in {activeArea.name}
              </button>

              <button
                onClick={() => navigate('service-areas')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back to All Central Texas Service Areas
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, render full Central Texas Service Areas Catalog
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Central Texas Coverage
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Our Central Texas Service Areas
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Headquartered in Austin and dispatching certified roofing trucks across Travis, Williamson, and Hays counties daily.
          </p>
        </div>
      </section>

      {/* Grid of All Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.filter(a => a.active).map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:border-amber-500 hover:shadow-md transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                    {area.name}, TX
                  </h3>
                  <MapPin className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {area.description}
                </p>
                {area.zipCodes && area.zipCodes.length > 0 && (
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    ZIPs: {area.zipCodes.join(', ')}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate(`service-area/${area.slug}`)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Explore Local Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-3">
          <h3 className="text-2xl font-extrabold">Don’t see your city listed?</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            We service most properties within a 45-mile radius of downtown Austin. Call our dispatch desk at {settings.phone} to check scheduling availability.
          </p>
          <div className="pt-2">
            <button
              onClick={openEstimateModal}
              className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
            >
              Request Free Estimate Anywhere in Central Texas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
