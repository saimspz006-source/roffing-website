import React, { useState } from 'react';
import { WebsiteSettings } from '../types';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { addLead } from '../services/db';

interface ContactPageProps {
  settings: WebsiteSettings;
  openEstimateModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  openEstimateModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      message: formData.message || 'Submitted general contact message.',
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Contact Summit Pro Roofing
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about an ongoing repair, need an emergency tarp crew dispatched, or want to speak with our owner? We are ready to help.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`tel:${settings.rawPhone}`}
              className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now ({settings.phone})</span>
            </a>
            <button
              onClick={openEstimateModal}
              className="px-6 py-3 bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info & Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Austin Headquarters & Dispatch
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Our main office and supply staging center is centrally positioned in Austin, Texas, allowing rapid response throughout Travis and Williamson counties.
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Office Address:</strong>
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Phone Number:</strong>
                  <a href={`tel:${settings.rawPhone}`} className="text-amber-700 font-bold hover:underline">
                    {settings.phone}
                  </a>
                  <div className="text-[11px] text-slate-500 mt-0.5">Click to call or text anytime</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Email Address:</strong>
                  <a href={`mailto:${settings.email}`} className="text-slate-700 hover:text-amber-600">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-bold">Business Hours:</strong>
                  <span>{settings.businessHours}</span>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                    Emergency Storm Tarp Dispatch: 24/7/365
                  </div>
                </div>
              </div>
            </div>

            {/* License & Insurance info */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-1.5 text-slate-800">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Verified Credentials</span>
              </div>
              <div>• Registered Texas Contractor: <strong>{settings.licenseNumber}</strong></div>
              <div>• Coverage: <strong>{settings.insuranceCoverage}</strong></div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our estimate coordinator will review your inquiry and call or message you back at <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        service: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-slate-500">
                  Fill out the form below and an Austin team member will respond within 30 minutes during business hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(512) 555-0148"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Roof Replacement">Roof Replacement</option>
                      <option value="Roof Repair">Roof Repair</option>
                      <option value="Storm Damage Assessment">Storm Damage</option>
                      <option value="Emergency Leak Service">Emergency Leak</option>
                      <option value="Metal Roofing">Metal Roofing</option>
                      <option value="Commercial Roofing">Commercial Roofing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message or Project Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your home, current roof condition, or any active leaks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{submitting ? 'Sending...' : 'Send Message to Austin Dispatch'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs">
            <span className="font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Location: {settings.address}</span>
            </span>
            <span className="text-slate-400">Austin, Texas Metro Coverage</span>
          </div>

          <div className="relative aspect-[21/9] w-full min-h-[300px]">
            <iframe
              title="Summit Pro Roofing Austin Office Location"
              src="https://maps.google.com/maps?q=3400+South+Congress+Ave,+Austin,+TX+78704&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
