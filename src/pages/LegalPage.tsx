import React from 'react';
import { WebsiteSettings } from '../types';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  settings: WebsiteSettings;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, settings }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Effective Date: January 1, 2026 · {settings.companyName} ({settings.location})
        </p>
      </div>

      {isPrivacy ? (
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you request an estimate, schedule an inspection, or contact {settings.companyName}, we collect basic personal information including your full name, phone number, email address, property physical address, and photos of roof conditions.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            We use your information exclusively to provide roofing quotes, schedule on-site inspections, coordinate emergency tarping services, verify warranties, and communicate project updates.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. SMS & Text Messaging Compliance</h2>
          <p>
            By submitting your mobile number on our estimate forms, you consent to receive transactional SMS messages regarding appointment scheduling and estimate delivery from {settings.companyName} at {settings.phone}. You may reply STOP at any time to opt out. We never sell or share mobile numbers with third-party advertisers.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Data Security</h2>
          <p>
            We implement industry-standard encryption and operational safeguards to protect your personal contact records and property photographs.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Contact Our Privacy Officer</h2>
          <p>
            Questions regarding our privacy practices can be directed to {settings.email} or by mail to {settings.address}.
          </p>
        </div>
      ) : (
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900">1. Roofing Estimates & Inspections</h2>
          <p>
            Initial estimates and on-site visual roof inspections are provided free of charge. Written price proposals are valid for 30 calendar days from the date of issuance due to fluctuating raw material costs (shingles, underlayment, aluminum metals).
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Workmanship Warranty</h2>
          <p>
            Full roof replacement projects completed by {settings.companyName} include our standard 10-Year Workmanship Warranty covering installation craftsmanship and leak prevention. Manufacturer material warranties are subject to each specific manufacturer's published terms (e.g. GAF, CertainTeed, Carlisle).
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Insurance Claims Assistance</h2>
          <p>
            In accordance with Texas House Bill 2102, roofing contractors in Texas cannot waive, rebate, or pay a homeowner’s statutory property insurance deductible. Homeowners are required by Texas state law to pay their agreed policy deductible.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Safety & Site Access</h2>
          <p>
            Customer agrees to provide safe driveway access for our material delivery vehicles and debris trailers during project execution, and to keep pets indoors during active tear-off operations.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Texas and jurisdiction shall lie exclusively within Travis County, Texas.
          </p>
        </div>
      )}
    </div>
  );
};
