import React from 'react';
import { Phone, MessageSquare, ClipboardCheck } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface MobileStickyBarProps {
  settings: WebsiteSettings;
  openEstimateModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  settings,
  openEstimateModal,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 md:hidden">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Now */}
        <a
          href={`tel:${settings.rawPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-800 text-center transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* Text Us (SMS) */}
        <a
          href={`sms:${settings.rawPhone}?body=Hello%20Summit%20Pro%20Roofing,%20I%20would%20like%20information%20about%20a%20roofing%20estimate.`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-800 text-center transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Text Us</span>
        </a>

        {/* Free Estimate */}
        <button
          onClick={openEstimateModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 text-center shadow-md transition-colors"
        >
          <ClipboardCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Free Estimate</span>
        </button>
      </div>
    </div>
  );
};
