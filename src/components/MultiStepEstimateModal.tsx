import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Upload, CheckCircle, Shield, Home, Building2, Calendar, Phone, MessageSquare, Mail } from 'lucide-react';
import { addEstimate } from '../services/db';
import { WebsiteSettings } from '../types';

interface MultiStepEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WebsiteSettings;
}

export const MultiStepEstimateModal: React.FC<MultiStepEstimateModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Austin',
    zip: '',
    propertyType: 'Residential' as 'Residential' | 'Commercial',
    serviceNeeded: 'Roof Replacement',
    photos: [] as string[],
    contactMethod: 'Phone' as 'Phone' | 'SMS' | 'Email',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimateId, setEstimateId] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is larger than 5MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, uploadEvent.target!.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
      if (!formData.phone.trim() || formData.phone.length < 10)
        newErrors.phone = 'Please enter a valid US phone number.';
      if (!formData.email.trim() || !formData.email.includes('@'))
        newErrors.email = 'Please enter a valid email address.';
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Street address is required.';
      if (!formData.city.trim()) newErrors.city = 'City is required.';
      if (!formData.zip.trim() || formData.zip.length < 5)
        newErrors.zip = 'Please enter a 5-digit ZIP code.';
    }

    if (currentStep === 7) {
      if (!formData.preferredDate)
        newErrors.preferredDate = 'Please select a preferred inspection date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const created = addEstimate({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        propertyType: formData.propertyType,
        serviceNeeded: formData.serviceNeeded,
        photos: formData.photos,
        contactMethod: formData.contactMethod,
        preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      });

      setEstimateId(created.id);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('An error occurred submitting your estimate. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: 'Austin',
      zip: '',
      propertyType: 'Residential',
      serviceNeeded: 'Roof Replacement',
      photos: [],
      contactMethod: 'Phone',
      preferredDate: '',
    });
    onClose();
  };

  const totalSteps = 7;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
              SP
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">Request a FREE Estimate</h3>
              <p className="text-xs text-slate-300">Fast on-site inspection · 100% Guaranteed Pricing</p>
            </div>
          </div>
          <button
            onClick={resetForm}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>
                {step === 1 && 'Contact Information'}
                {step === 2 && 'Property Location'}
                {step === 3 && 'Property Type'}
                {step === 4 && 'Roofing Service Needed'}
                {step === 5 && 'Upload Photos (Optional)'}
                {step === 6 && 'Preferred Contact Method'}
                {step === 7 && 'Schedule Inspection Date'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {isSubmitted ? (
            /* Confirmation State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900">
                Estimate Request Confirmed!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your estimate ticket (Ref: <span className="font-mono text-amber-700 font-bold">{estimateId}</span>) has been scheduled. One of our Austin roofing specialists will reach out via <strong className="text-slate-900">{formData.contactMethod}</strong> shortly to confirm your inspection.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs text-slate-700 space-y-1.5">
                <div><strong>Address:</strong> {formData.address}, {formData.city}, TX {formData.zip}</div>
                <div><strong>Service:</strong> {formData.serviceNeeded} ({formData.propertyType})</div>
                <div><strong>Target Date:</strong> {formData.preferredDate}</div>
                {formData.photos.length > 0 && (
                  <div><strong>Uploaded Photos:</strong> {formData.photos.length} image(s) attached</div>
                )}
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <a
                  href={`tel:${settings.rawPhone}`}
                  className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now ({settings.phone})</span>
                </a>
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Close & Return to Site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 1: Your Contact Details</h4>
                  <p className="text-xs text-slate-500">We will never sell or spam your contact information.</p>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Miller"
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(512) 555-0199"
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.email ? 'border-red-500 bg-red-50/50' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Property Location */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 2: Property Location</h4>
                  <p className="text-xs text-slate-500">Provide the address for roof inspection satellite assessment.</p>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. 1204 Barton Springs Rd"
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.address ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Austin"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="78704"
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.zip ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.zip && <p className="text-red-600 text-xs mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Property Type */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 3: Property Type</h4>
                  <p className="text-xs text-slate-500">Select whether this is a home or commercial building.</p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: 'Residential' })}
                      className={`p-6 rounded-xl border text-center transition-all ${
                        formData.propertyType === 'Residential'
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Home className={`w-8 h-8 mx-auto mb-2 ${formData.propertyType === 'Residential' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div className="font-extrabold text-sm text-slate-900">Residential Home</div>
                      <div className="text-xs text-slate-500 mt-1">Single family, townhome, condo</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: 'Commercial' })}
                      className={`p-6 rounded-xl border text-center transition-all ${
                        formData.propertyType === 'Commercial'
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <Building2 className={`w-8 h-8 mx-auto mb-2 ${formData.propertyType === 'Commercial' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div className="font-extrabold text-sm text-slate-900">Commercial Property</div>
                      <div className="text-xs text-slate-500 mt-1">Office, warehouse, retail plaza</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Service Needed */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 4: Roofing Service Needed</h4>
                  <p className="text-xs text-slate-500">What type of work does your roof require?</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'Roof Replacement',
                      'Roof Repair',
                      'New Roof',
                      'Storm Damage',
                      'Inspection',
                      'Other',
                    ].map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, serviceNeeded: svc })}
                        className={`p-3.5 rounded-xl border text-center font-bold text-xs transition-all ${
                          formData.serviceNeeded === svc
                            ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Upload Photos */}
              {step === 5 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 5: Upload Photos (Optional)</h4>
                  <p className="text-xs text-slate-500">
                    Upload photos of roof leaks, exterior shingles, or hail damage to speed up your quote.
                  </p>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <label className="cursor-pointer font-bold text-xs text-amber-600 hover:text-amber-700">
                      <span>Click to upload photos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, HEIC up to 5MB each</p>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {formData.photos.map((photo, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                          <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Preferred Contact Method */}
              {step === 6 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 6: Preferred Contact Method</h4>
                  <p className="text-xs text-slate-500">How would you prefer our estimate coordinator contact you?</p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { method: 'Phone' as const, icon: Phone, label: 'Phone Call' },
                      { method: 'SMS' as const, icon: MessageSquare, label: 'Text Message' },
                      { method: 'Email' as const, icon: Mail, label: 'Email' },
                    ].map(({ method, icon: Icon, label }) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, contactMethod: method })}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          formData.contactMethod === method
                            ? 'border-amber-500 bg-amber-50/50 shadow-sm font-bold text-amber-800'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                        <span className="text-xs">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Preferred Date */}
              {step === 7 && (
                <div className="space-y-4 animate-in fade-in">
                  <h4 className="text-lg font-bold text-slate-900">Step 7: Preferred Inspection Date</h4>
                  <p className="text-xs text-slate-500">Select when you would like an on-site roof inspection.</p>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.preferredDate ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="text-red-600 text-xs mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Summary recap */}
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs space-y-1 text-slate-800">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span>Estimate Guarantee:</span>
                    </div>
                    <div>• 100% Free 21-point on-site inspection</div>
                    <div>• Drone photography & attic moisture scan included</div>
                    <div>• No pressure, itemized proposal guaranteed for 30 days</div>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-lg hover:bg-amber-400 transition-all shadow-md inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Request FREE Estimate</span>
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
