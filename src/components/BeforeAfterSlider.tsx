import React, { useState } from 'react';
import { GalleryProject } from '../types';
import { Layers, MapPin, Calendar, CheckCircle } from 'lucide-react';

interface BeforeAfterSliderProps {
  project: GalleryProject;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ project }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [mode, setMode] = useState<'slider' | 'toggle'>('slider');
  const [toggleState, setToggleState] = useState<'before' | 'after'>('after');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Media Box */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 select-none overflow-hidden group">
        {mode === 'slider' ? (
          <>
            {/* After Image (Full Background) */}
            <img
              src={project.afterImage}
              alt={`${project.title} - After Replacement`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase z-20">
              After
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={project.beforeImage}
                alt={`${project.title} - Before Repair`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', minWidth: '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-red-600/90 text-white px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase z-20">
                Before
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-slate-900 rounded-full shadow-lg flex items-center justify-center font-bold text-xs border-2 border-amber-500">
                ↔
              </div>
            </div>

            {/* Range Input Overlay for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Drag to compare before and after roofing photos"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </>
        ) : (
          /* Quick Toggle Mode */
          <div className="relative w-full h-full">
            <img
              src={toggleState === 'after' ? project.afterImage : project.beforeImage}
              alt={`${project.title} - ${toggleState}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 text-white px-2.5 py-1 rounded text-xs font-bold uppercase z-20">
              {toggleState === 'after' ? 'After Completion' : 'Before (Damage State)'}
            </div>
          </div>
        )}

        {/* View Mode Switcher in corner */}
        <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1 bg-slate-950/80 backdrop-blur-sm p-1 rounded-lg text-xs">
          <button
            onClick={() => setMode('slider')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              mode === 'slider' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Slider
          </button>
          <button
            onClick={() => {
              setMode('toggle');
              setToggleState(toggleState === 'after' ? 'before' : 'after');
            }}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              mode === 'toggle' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {mode === 'toggle' ? (toggleState === 'after' ? 'Show Before' : 'Show After') : 'Toggle'}
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="text-amber-700 font-semibold">{project.category}</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{project.completionDate}</span>
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 leading-snug">
          {project.title}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>{project.location}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
          {project.description}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Completed with 10-Yr Workmanship Guarantee</span>
        </div>
      </div>
    </div>
  );
};
