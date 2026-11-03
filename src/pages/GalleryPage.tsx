import React, { useState } from 'react';
import { GalleryProject, WebsiteSettings } from '../types';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { X, Filter, MapPin, Calendar } from 'lucide-react';

interface GalleryPageProps {
  projects: GalleryProject[];
  settings: WebsiteSettings;
  openEstimateModal: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  projects,
  settings,
  openEstimateModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxProject, setLightboxProject] = useState<GalleryProject | null>(null);

  const categories = [
    'All',
    'Roof Repair',
    'Roof Replacement',
    'Shingle Roofing',
    'Metal Roofing',
    'Storm Damage',
    'Commercial Roofing',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Portfolio of Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Before & After Project Gallery
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Real Austin and Central Texas residential and commercial transformations. Drag each slider to see the structural difference.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-200">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            No projects found in this category yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div key={proj.id} className="relative">
                <BeforeAfterSlider project={proj} />
                <div className="mt-2 text-right">
                  <button
                    onClick={() => setLightboxProject(proj)}
                    className="text-xs text-amber-700 hover:text-amber-800 font-bold underline"
                  >
                    View in Full-Screen Lightbox →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">{lightboxProject.title}</h4>
                <div className="text-xs text-slate-400">{lightboxProject.location} · {lightboxProject.category}</div>
              </div>
              <button
                onClick={() => setLightboxProject(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-red-600 uppercase">Before (Damaged State)</div>
                  <img
                    src={lightboxProject.beforeImage}
                    alt="Before"
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-600 uppercase">After (Finished Roof)</div>
                  <img
                    src={lightboxProject.afterImage}
                    alt="After"
                    className="w-full aspect-[4/3] object-cover rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-700 leading-relaxed">
                <p>{lightboxProject.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Finished in {lightboxProject.completionDate}</span>
                <button
                  onClick={() => {
                    setLightboxProject(null);
                    openEstimateModal();
                  }}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400"
                >
                  Request Similar Roofing Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to transform your home’s roof?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Get an exact on-site estimate with zero sales pressure. Backed by our 10-year workmanship guarantee.
          </p>
          <div className="pt-2">
            <button
              onClick={openEstimateModal}
              className="px-7 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
