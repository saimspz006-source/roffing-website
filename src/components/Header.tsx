import React, { useState, useEffect } from 'react';
import { Phone, FileText, Menu, X, Shield, Clock } from 'lucide-react';
import { WebsiteSettings } from '../types';

interface HeaderProps {
  settings: WebsiteSettings;
  currentRoute: string;
  navigate: (route: string) => void;
  openEstimateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  currentRoute,
  navigate,
  openEstimateModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Projects', route: 'projects' },
    { label: 'Reviews', route: 'reviews' },
    { label: 'Areas', route: 'service-areas' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <>
      {/* Top Emergency & Trust Alert Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Licensed & Insured ({settings.licenseNumber})</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">·</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>24/7 Emergency Dispatch Across Greater Austin</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <a
              href={`tel:${settings.rawPhone}`}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 shrink-0" />
              <span>Emergency 24/7: {settings.phone}</span>
            </a>
            <button
              onClick={() => navigate('admin')}
              className="text-slate-400 hover:text-slate-200 transition-colors text-xs"
              title="Admin Portal"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Brand Logo / Wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
              }}
              className="flex items-center gap-3 shrink-0 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center text-white shadow-sm font-black text-xl tracking-tighter">
                SP
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  {settings.companyName}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Austin, TX · Roofing Contractor
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
              {navLinks.map((item) => (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.route);
                  }}
                  className={`hover:text-amber-600 transition-colors whitespace-nowrap ${
                    currentRoute === item.route
                      ? 'text-amber-600 border-b-2 border-amber-600 pb-0.5'
                      : 'text-slate-700'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href={`tel:${settings.rawPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Call Now</span>
              </a>

              <button
                onClick={openEstimateModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-sm rounded-lg transition-all transform active:scale-95 whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>Get Free Estimate</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${settings.rawPhone}`}
                className="p-2 text-slate-700 hover:text-amber-600 bg-slate-100 rounded-lg"
                aria-label="Call Now"
              >
                <Phone className="w-5 h-5 text-amber-600" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <a
                href={`tel:${settings.rawPhone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-slate-100 text-slate-900 text-xs font-bold text-center"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call (512) 555-0148</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEstimateModal();
                }}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold text-center shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Free Estimate</span>
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.route}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(item.route);
                  }}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    currentRoute === item.route
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
              <span>Austin, TX · 24/7 Emergency</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('admin');
                }}
                className="text-amber-600 font-semibold"
              >
                Admin Login →
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
