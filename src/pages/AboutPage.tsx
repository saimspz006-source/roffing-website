import React from 'react';
import { Shield, Award, Users, CheckCircle, Clock, MapPin, Phone, ArrowRight } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface AboutPageProps {
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
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
            About Summit Pro Roofing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Austin Born. Craftsman Built.
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Founded in Central Texas to provide honest, master-quality residential and commercial roofing with zero sales shortcuts and uncompromising jobsite safety.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
              Our Texas Story
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Roofing Company Built on Genuine Accountability
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When intense Texas hailstorms strike, out-of-state "storm chasers" descend on Austin neighborhoods, collect down payments, rush installations, and vanish before warranty issues arise.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Summit Pro Roofing was created to be the exact opposite. Headquartered in South Congress, Austin, we live and work in the same neighborhoods we protect. Our crews are full-time W-2 craftsmen certified by North America’s leading manufacturers including GAF, CertainTeed, and Carlisle SynTec.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">450+</div>
                <div className="text-xs text-slate-500 font-semibold">Roofs Completed in Central TX</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">10 Years</div>
                <div className="text-xs text-slate-500 font-semibold">Workmanship Guarantee</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="/src/assets/images/roof_replacement_work_1791780533726.jpg"
                alt="Summit Pro Roofing professional installation crew in Austin"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              The Summit Standard
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Four fundamental rules every estimator, project manager, and installer adheres to on every Austin rooftop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'No Subcontracted Shortcuts',
                desc: 'All foremen have at least 8 years of steep-slope and flat roofing experience. We do not pawn jobs off to untracked random crews.',
              },
              {
                icon: Award,
                title: 'Certified Manufacturer Spec',
                desc: 'Every nail, drip edge, ridge cap, and synthetic underlayment roll follows strict ASTM and manufacturer specifications for valid lifetime warranties.',
              },
              {
                icon: Clock,
                title: 'Clean Jobsite Promise',
                desc: 'We protect your gutters, landscaping, and AC units with industrial catch tarps, ending each day with dual magnetic sweeps for nails.',
              },
              {
                icon: Users,
                title: 'Total Insurance Advocacy',
                desc: 'We speak the language of Texas insurance adjusters, utilizing industry-standard Xactimate estimating so no valid damage is overlooked.',
              },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Austin Community Presence & Office */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Local Texas Headquarters
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Visit or Contact Our Austin Office
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you need a quick shingle sample consultation or want to review architectural blueprints for a commercial build, our doors are open.
              </p>
              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct Line: {settings.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hours: {settings.businessHours}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={openEstimateModal}
                className="px-6 py-3.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md text-center"
              >
                Schedule Free Roof Inspection
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-6 py-3.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 border border-slate-700 transition-colors text-center"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
