import React, { useState, useEffect } from 'react';
import {
  initializeDatabase,
  getSettings,
  getServices,
  getProjects,
  getReviews,
  getFAQs,
  getServiceAreas,
} from './services/db';
import { WebsiteSettings, ServiceItem, GalleryProject, ReviewItem, FAQItem, ServiceArea } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { MultiStepEstimateModal } from './components/MultiStepEstimateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { StormDamagePage } from './pages/StormDamagePage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FinancingPage } from './pages/FinancingPage';
import { FAQPage } from './pages/FAQPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

  // Database state
  const [settings, setSettings] = useState<WebsiteSettings>(getSettings());
  const [services, setServices] = useState<ServiceItem[]>(getServices());
  const [projects, setProjects] = useState<GalleryProject[]>(getProjects());
  const [reviews, setReviews] = useState<ReviewItem[]>(getReviews(true));
  const [faqs, setFaqs] = useState<FAQItem[]>(getFAQs());
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>(getServiceAreas());

  useEffect(() => {
    // Initialize default seed data
    initializeDatabase().then(() => {
      setSettings(getSettings());
      setServices(getServices());
      setProjects(getProjects());
      setReviews(getReviews(true));
      setFaqs(getFAQs());
      setServiceAreas(getServiceAreas());
    });

    // Handle initial hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash === 'estimate') {
        setIsEstimateModalOpen(true);
      } else {
        setCurrentRoute(hash);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshDbData = () => {
    setSettings(getSettings());
    setServices(getServices());
    setProjects(getProjects());
    setReviews(getReviews(true));
    setFaqs(getFAQs());
    setServiceAreas(getServiceAreas());
  };

  // Helper to resolve route components
  const renderPage = () => {
    // Admin route
    if (currentRoute === 'admin') {
      return <AdminPage navigate={navigate} />;
    }

    // Direct Service Area localized page (e.g. service-area/round-rock)
    if (currentRoute.startsWith('service-area/')) {
      const slug = currentRoute.replace('service-area/', '');
      return (
        <ServiceAreasPage
          areas={serviceAreas}
          services={services}
          settings={settings}
          selectedSlug={slug}
          navigate={navigate}
          openEstimateModal={() => setIsEstimateModalOpen(true)}
        />
      );
    }

    // Check if route matches one of the individual services
    const matchingService = services.find((s) => s.slug === currentRoute);
    if (matchingService) {
      return (
        <ServiceDetailPage
          service={matchingService}
          settings={settings}
          navigate={navigate}
          openEstimateModal={() => setIsEstimateModalOpen(true)}
        />
      );
    }

    // Standard Named Pages
    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            settings={settings}
            services={services}
            projects={projects}
            reviews={reviews}
            faqs={faqs}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'about':
        return (
          <AboutPage
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'services':
        return (
          <ServicesOverviewPage
            services={services}
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'materials':
        return (
          <MaterialsPage
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'storm-damage':
        return (
          <StormDamagePage
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'projects':
      case 'gallery':
        return (
          <GalleryPage
            projects={projects}
            settings={settings}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'reviews':
        return (
          <ReviewsPage
            reviews={reviews}
            settings={settings}
            refreshReviews={refreshDbData}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'financing':
        return (
          <FinancingPage
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'faq':
        return (
          <FAQPage
            faqs={faqs}
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'service-areas':
        return (
          <ServiceAreasPage
            areas={serviceAreas}
            services={services}
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'contact':
        return (
          <ContactPage
            settings={settings}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
      case 'privacy-policy':
        return <LegalPage type="privacy" settings={settings} />;
      case 'terms':
        return <LegalPage type="terms" settings={settings} />;
      default:
        return (
          <HomePage
            settings={settings}
            services={services}
            projects={projects}
            reviews={reviews}
            faqs={faqs}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        );
    }
  };

  const isAdminView = currentRoute === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* Do not render standard header/footer on admin page for full control */}
      {!isAdminView && (
        <Header
          settings={settings}
          currentRoute={currentRoute}
          navigate={navigate}
          openEstimateModal={() => setIsEstimateModalOpen(true)}
        />
      )}

      {/* Main Page Area */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer & Mobile Sticky Bar on Public Pages */}
      {!isAdminView && (
        <>
          <Footer
            settings={settings}
            navigate={navigate}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
          <MobileStickyBar
            settings={settings}
            openEstimateModal={() => setIsEstimateModalOpen(true)}
          />
        </>
      )}

      {/* 7-Step Multi-Step Free Estimate Modal */}
      <MultiStepEstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
        settings={settings}
      />
    </div>
  );
}
