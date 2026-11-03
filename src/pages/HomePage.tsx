import React, { useState } from 'react';
import {
  Shield,
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Wrench,
  AlertTriangle,
  Star,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { WebsiteSettings, ServiceItem, GalleryProject, ReviewItem, FAQItem } from '../types';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { addLead } from '../services/db';

interface HomePageProps {
  settings: WebsiteSettings;
  services: ServiceItem[];
  projects: GalleryProject[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  services,
  projects,
  reviews,
  faqs,
  navigate,
  openEstimateModal,
}) => {
  // Quick hero quote form
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickService, setQuickService] = useState('Roof Replacement');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  // FAQ accordion open state
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    addLead({
      name: quickName,
      phone: quickPhone,
      email: '',
      service: quickService,
      message: 'Fast quote request from Homepage Hero bar.',
    });
    setQuickSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* ======================================================== */}
      {/* 4. HOMEPAGE HERO SECTION                                */}
      {/* ======================================================== */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold tracking-wide">
                <Shield className="w-3.5 h-3.5" />
                <span>Austin’s #1 Rated Master Roofing Contractor</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Reliable Roofing. <br />
                <span className="text-amber-400">Built to Last.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Professional roof repair, replacement and installation services for homeowners and businesses across Austin, Texas. Certified installations backed by guaranteed 10-year workmanship warranties.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={openEstimateModal}
                  className="px-6 py-3.5 bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <span>Get a FREE Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${settings.rawPhone}`}
                  className="px-6 py-3.5 bg-slate-900 border border-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Free Estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>10+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual & Quick Callout Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src="/src/assets/images/hero_summit_roofing_1791780518538.jpg"
                  alt="Austin Texas suburban home with architectural roofing"
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating On-Image Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs flex items-center justify-between text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      ★ 4.9
                    </div>
                    <div>
                      <div className="font-bold text-white">450+ Austin Roofs Replaced</div>
                      <div className="text-[11px] text-slate-400">Class 4 Hail Impact Rated</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('projects')}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    View Gallery →
                  </button>
                </div>
              </div>

              {/* Fast Callback Card Below Hero Image */}
              <div className="mt-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                {quickSubmitted ? (
                  <div className="text-center py-2 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Thanks! Our estimator will call you within 15 minutes.</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickLeadSubmit} className="space-y-2.5">
                    <div className="text-xs font-bold text-slate-300">
                      ⚡ Need an instant callback? Enter your phone number:
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        required
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:w-1/3"
                      />
                      <input
                        type="tel"
                        placeholder="Phone (512) 555-..."
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        required
                        className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 flex-1"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 whitespace-nowrap transition-colors"
                      >
                        Call Me Fast
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Callout Bar directly in Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border border-red-800/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Roof Damage? Don't Wait.
                </h3>
                <p className="text-xs text-red-200">
                  Call now for fast emergency roofing service. Water intrusions worsen every hour.
                </p>
              </div>
            </div>
            <a
              href={`tel:${settings.rawPhone}`}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency Hotline ({settings.phone})</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TRUST SECTION                                         */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
            Why Austin Trusts Summit Pro
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Built on Integrity, Verified by Craftsmanship
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every project is backed by licensed credentials, rigorous jobsite safety, and comprehensive manufacturer warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Licensed & Insured',
              desc: 'Fully registered in Texas with $2,000,000 commercial liability and full worker’s compensation to protect your property.',
            },
            {
              icon: CheckCircle,
              title: 'Free Estimates',
              desc: 'Comprehensive 21-point on-site attic & roof inspections with drone photography and zero high-pressure sales.',
            },
            {
              icon: Wrench,
              title: 'Experienced Roofers',
              desc: 'Master Elite certified installers who specialize in steep-slope architectural shingles and Texas standing seam metal.',
            },
            {
              icon: Award,
              title: 'Quality Materials',
              desc: 'Top-tier roofing materials from GAF, CertainTeed, Owens Corning, and Berridge Metal with Class 4 hail resistance.',
            },
            {
              icon: Sparkles,
              title: 'Warranty Available',
              desc: 'Guaranteed 10-year Summit Pro workmanship warranty plus up to lifetime non-prorated manufacturer warranty.',
            },
            {
              icon: Clock,
              title: '24/7 Emergency Service',
              desc: 'Rapid on-call emergency response crews ready with industrial poly tarps and water mitigation anytime severe weather hits.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SERVICES SECTION                                      */}
      {/* ======================================================== */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
                Comprehensive Solutions
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Our Roofing Services
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                From simple shingle leak repairs to full architectural replacements and commercial TPO systems.
              </p>
            </div>
            <button
              onClick={() => navigate('services')}
              className="text-amber-700 hover:text-amber-800 font-bold text-xs inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                    {svc.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {svc.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">{svc.priceRange}</span>
                    <button
                      onClick={() => navigate(svc.slug)}
                      className="px-3.5 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FEATURED BEFORE / AFTER TRANSFORMATION SECTION           */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
            Recent Transformations
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Before & After Austin Projects
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Drag the comparison slider below to inspect actual storm repair and reroofing transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((proj) => (
            <BeforeAfterSlider key={proj.id} project={proj} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('projects')}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <span>View Full Project Gallery ({projects.length} Showcases)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. ROOFING MATERIALS HIGHLIGHT                          */}
      {/* ======================================================== */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
                Engineered for Texas Weather
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                Premium Roofing Materials
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                We install only battle-tested materials designed to withstand 100°F+ Texas heat, torrential rain, and golf-ball hail.
              </p>
            </div>
            <button
              onClick={() => navigate('materials')}
              className="text-amber-400 hover:text-amber-300 font-bold text-xs inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Compare All Materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Architectural Shingles',
                lifespan: '25–30 Years',
                desc: 'Multi-layered fiberglass construction with dimensional shadows and algae-resistant granules.',
                img: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
                route: 'shingle-roofing',
              },
              {
                title: 'Standing Seam Metal',
                lifespan: '50–70 Years',
                desc: '24-gauge Galvalume steel with concealed fasteners. Reflects solar heat and slashes AC bills.',
                img: '/src/assets/images/metal_standing_seam_roof_1791780546881.jpg',
                route: 'metal-roofing',
              },
              {
                title: 'Commercial Flat TPO',
                lifespan: '20–30 Years',
                desc: 'Heat-welded single ply reflective white membrane designed for zero standing water penetration.',
                img: '/src/assets/images/commercial_flat_roofing_1791780560405.jpg',
                route: 'flat-roofing',
              },
            ].map((mat, i) => (
              <div
                key={i}
                className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 flex flex-col group hover:border-amber-500/50 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={mat.img}
                    alt={mat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[11px] font-bold text-amber-400">
                    Lifespan: {mat.lifespan}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-white">{mat.title}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{mat.desc}</p>
                  </div>
                  <button
                    onClick={() => navigate(mat.route)}
                    className="text-amber-400 hover:text-amber-300 font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Request Quote for {mat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. STORM DAMAGE CALLOUT SECTION                          */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-slate-950 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                Hail & Wind Claim Specialists
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Storm Damage to Your Roof? We Deal Directly With Your Insurance.
              </h2>
              <p className="text-amber-950 font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                Did Central Texas spring hail hit your neighborhood? Do not climb on a wet or damaged roof. We provide free forensic hail inspections, document shingle bruisings with high-res photos, and meet your adjuster on-site so you receive maximum insurance payout.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-950">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  <span>Free Hail Inspection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  <span>Xactimate Estimates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-slate-950" />
                  <span>Zero Out-of-Pocket*</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => navigate('storm-damage')}
                className="w-full px-6 py-3.5 bg-slate-950 text-white font-extrabold text-sm rounded-xl hover:bg-slate-900 transition-colors shadow-lg text-center"
              >
                Get Emergency Inspection
              </button>
              <a
                href={`tel:${settings.rawPhone}`}
                className="w-full px-6 py-3.5 bg-white text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-50 transition-colors shadow text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call (512) 555-0148</span>
              </a>
              <div className="text-[11px] text-amber-950 text-center">
                *Only your statutory homeowner insurance deductible applies.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 15. CUSTOMER REVIEWS PREVIEW                             */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
              Verified Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What Austin Homeowners Say
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">4.9 / 5.0 Star Rating</span>
              <span className="text-xs text-slate-400">· Over 120+ Verified Local Reviews</span>
            </div>
          </div>
          <button
            onClick={() => navigate('reviews')}
            className="text-amber-700 hover:text-amber-800 font-bold text-xs inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Read All Reviews & Leave Feedback</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.isSample && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      Demo Sample
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>
                <div className="text-[11px] text-amber-700 font-medium">{rev.serviceType}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 13. SERVICE AREAS QUICK LOCATIONS                        */}
      {/* ======================================================== */}
      <section className="bg-slate-100/70 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
              Local Presence
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Central Texas Service Areas
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Fast, reliable roofing trucks dispatching daily across Austin and adjacent counties.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Austin', slug: 'austin', desc: 'Central, South & North Austin' },
              { name: 'Round Rock', slug: 'round-rock', desc: 'I-35 Corridor & Teravista' },
              { name: 'Cedar Park', slug: 'cedar-park', desc: 'Twin Lakes & Lakeline' },
              { name: 'Pflugerville', slug: 'pflugerville', desc: 'Lake Pflugerville & SH-130' },
              { name: 'Georgetown', slug: 'georgetown', desc: 'Historic Square & Sun City' },
              { name: 'Leander', slug: 'leander', desc: 'Crystal Falls & US-183' },
              { name: 'Kyle', slug: 'kyle', desc: 'Plum Creek & Hays County' },
              { name: 'Buda', slug: 'buda', desc: 'Downtown Buda & Sunfield' },
            ].map((loc) => (
              <button
                key={loc.slug}
                onClick={() => navigate(`service-area/${loc.slug}`)}
                className="bg-white p-4 rounded-xl border border-slate-200 text-left hover:border-amber-500 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    {loc.name}, TX
                  </div>
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{loc.desc}</div>
                <div className="text-[11px] text-amber-600 font-bold mt-2">View local services →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 17. FAQ ACCORDION SECTION                                */}
      {/* ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-amber-600 text-xs font-extrabold uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear, honest answers about roofing costs, warranties, and insurance claims.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.slice(0, 6).map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('faq')}
            className="text-amber-700 hover:text-amber-800 font-bold text-xs inline-flex items-center gap-1.5"
          >
            <span>Have more questions? Read our full 10-Question FAQ guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 18. CALL TO ACTION SECTION                               */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Ready To Upgrade Your Roof?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Protect Your Home With a Stronger Roof.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule your free 21-point on-site inspection today. We will evaluate your roof, provide drone footage, and deliver a transparent estimate with zero obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={openEstimateModal}
                className="px-7 py-3.5 bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all"
              >
                Get Free Estimate
              </button>
              <a
                href={`tel:${settings.rawPhone}`}
                className="px-7 py-3.5 bg-slate-900 border border-slate-700 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Now ({settings.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
