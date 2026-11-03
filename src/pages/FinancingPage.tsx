import React, { useState } from 'react';
import { WebsiteSettings } from '../types';
import { DollarSign, CheckCircle, Calculator, Shield, ArrowRight, Phone } from 'lucide-react';
import { addLead } from '../services/db';

interface FinancingPageProps {
  settings: WebsiteSettings;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const FinancingPage: React.FC<FinancingPageProps> = ({
  settings,
  navigate,
  openEstimateModal,
}) => {
  const [loanAmount, setLoanAmount] = useState(12000);
  const [termMonths, setTermMonths] = useState(60);
  const [apr, setApr] = useState(7.99);

  // Quick financing inquiry form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Monthly payment calculation
  const monthlyRate = apr / 100 / 12;
  const estimatedMonthly =
    monthlyRate > 0
      ? Math.round(
          (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
            (Math.pow(1 + monthlyRate, termMonths) - 1)
        )
      : Math.round(loanAmount / termMonths);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email,
      service: 'Financing Consultation',
      message: `Inquiring about financing for ~$${loanAmount.toLocaleString()} over ${termMonths} months.`,
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Affordable Home Improvements
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Flexible Financing Options
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Don't compromise on home protection due to upfront costs. We offer comfortable monthly payment plans and fast online pre-approvals with zero impact on your credit score.
          </p>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Monthly Payment Options',
              desc: 'Plans tailored to fit your household budget, with fixed monthly rates as low as $99/mo.',
            },
            {
              title: 'Easy Application',
              desc: 'Simple 60-second digital application process. Most applicants receive instant credit decisions.',
            },
            {
              title: 'Flexible Plans',
              desc: 'Choose from 0% interest promotional terms to low-APR long-term 60, 84, or 120-month loans.',
            },
            {
              title: 'Subject to Approval',
              desc: 'Options available for prime and near-prime credit tiers. No prepayment penalties on any loan.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Payment Calculator & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Calculator Slider */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Payment Estimator</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Estimate Your Monthly Roofing Investment
            </h2>

            <div className="space-y-4 bg-slate-950/70 p-6 rounded-2xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Estimated Project Amount:</span>
                  <span className="text-amber-400 text-sm font-mono">${loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>$5,000 (Repairs)</span>
                  <span>$20,000 (Average Reroof)</span>
                  <span>$35,000 (Metal/Large)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Term Length:</span>
                  <span className="text-amber-400 text-sm font-mono">{termMonths} Months ({termMonths / 12} Years)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 60, 120].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTermMonths(t)}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                        termMonths === t
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t} mos
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Display */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Estimated Payment</div>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    ${estimatedMonthly} <span className="text-xs text-slate-400 font-sans font-normal">/ month*</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 text-right max-w-[180px]">
                  *Subject to credit approval. Example based on {apr}% APR. Terms vary.
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Lead Box */}
          <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold">Inquiry Sent!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, {name}. Our financing coordinator will reach out to discuss plans and provide you with a secure pre-qualification link.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                >
                  Calculate Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Ask About Financing
                </h3>
                <p className="text-xs text-slate-600">
                  Find out what rate you qualify for with zero impact on your credit score.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0148"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md"
                >
                  Ask About Financing Plans
                </button>

                <div className="text-[10px] text-slate-400 text-center">
                  Zero pre-payment penalties · Fast 60-second review
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimers & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 space-y-2 border-t border-slate-200 pt-8">
        <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
          Financing Disclosures:
        </h4>
        <p>
          Financing programs and promotional interest plans are provided through licensed third-party lending partners and are subject to final credit approval. Terms, rates, and minimum required monthly payments may vary depending on borrower creditworthiness and loan amount. Summit Pro Roofing is not a direct lender.
        </p>
      </section>
    </div>
  );
};
