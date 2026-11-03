import React from 'react';
import { ROOFING_MATERIALS } from '../services/db';
import { WebsiteSettings } from '../types';
import { CheckCircle, Shield, Clock, Wrench, ArrowRight } from 'lucide-react';

interface MaterialsPageProps {
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({
  settings,
  navigate,
  openEstimateModal,
}) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Material Selection Guide
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Premium Roofing Materials Comparison
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Choosing the right roofing material for the Texas climate balance aesthetics, wind resistance, cooling efficiency, and longevity.
          </p>
        </div>
      </section>

      {/* Materials Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {ROOFING_MATERIALS.map((mat, idx) => (
          <div
            key={mat.id}
            id={mat.id}
            className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column */}
            <div className="lg:col-span-5 relative bg-slate-900 aspect-[4/3] lg:aspect-auto">
              <img
                src={mat.image}
                alt={mat.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                {mat.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">{mat.name}</h3>
                  <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                    {mat.lifespan}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {mat.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Durability:</strong>
                      <span className="text-slate-600">{mat.durability}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wrench className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Maintenance:</strong>
                      <span className="text-slate-600">{mat.maintenance}</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Core Benefits:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {mat.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 italic pt-1">
                  <strong>Ideal For:</strong> {mat.idealFor}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={openEstimateModal}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>Request Quote for {mat.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
