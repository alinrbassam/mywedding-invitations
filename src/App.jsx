import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhoneShowcase } from './components/PhoneShowcase';
import { OurDifference } from './components/OurDifference';
import { TemplateGallery } from './components/TemplateGallery';
import { WhatsIncluded } from './components/WhatsIncluded';
import { PricingPackages } from './components/PricingPackages';
import { Reviews } from './components/Reviews';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { OrderConfiguratorModal } from './components/OrderConfiguratorModal';
import { TemplatePreviewModal } from './components/TemplatePreviewModal';
import { LegalModals } from './components/LegalModals';
import { InvitationTemplateView } from './components/InvitationTemplateView';

import { TEMPLATE_PAGES } from './data/templates';

export function App() {
  const [orderModal, setOrderModal] = useState({
    isOpen: false,
    pkg: 'template',
    designId: null,
    customData: null,
  });

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [legalType, setLegalType] = useState(null); // 'privacy' or 'terms'
  const [viewingTemplateId, setViewingTemplateId] = useState(null);

  // Check URL pathname and hash on load and listen for changes
  useEffect(() => {
    const handleRouteChange = () => {
      // 1. Check clean path first (e.g. /the-sacred-garden, /dolce-vita, /template/timeless-grace)
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').trim();

      if (path) {
        if (path.startsWith('template/')) {
          const id = path.replace('template/', '');
          setViewingTemplateId(id);
          return;
        }
        if (path.startsWith('invite/')) {
          const slug = path.replace('invite/', '');
          const savedCustom = sessionStorage.getItem('wbg_custom_' + slug.replace(/[^a-z0-9]/gi, '')) ||
                              localStorage.getItem('wbg_custom_' + slug.replace(/[^a-z0-9]/gi, ''));
          setViewingTemplateId('the-sacred-garden');
          return;
        }
        if (TEMPLATE_PAGES[path]) {
          setViewingTemplateId(path);
          return;
        }
      }

      // 2. Check URL hash (e.g. #template/the-sacred-garden)
      if (hash.startsWith('template/')) {
        const id = hash.replace('template/', '');
        setViewingTemplateId(id);
      } else if (TEMPLATE_PAGES[hash]) {
        setViewingTemplateId(hash);
      } else if (!hash || ['hero', 'templates', 'pricing', 'reviews', 'faq', 'how-it-works'].includes(hash)) {
        setViewingTemplateId(null);
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleOpenOrder = (pkg = 'template', designId = null, customData = null) => {
    setOrderModal({
      isOpen: true,
      pkg,
      designId,
      customData,
    });
  };

  const handleCloseOrder = () => {
    setOrderModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleScrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFullTemplate = (templateId) => {
    setPreviewTemplate(null);
    setViewingTemplateId(templateId);
    window.history.pushState(null, '', `/${templateId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromTemplate = () => {
    setViewingTemplateId(null);
    window.history.pushState(null, '', '/');
  };

  // If a template is actively being viewed, render the self-hosted invitation page!
  if (viewingTemplateId) {
    return (
      <InvitationTemplateView
        templateId={viewingTemplateId}
        onBack={handleBackFromTemplate}
        onOrder={(designId, customData) => {
          handleBackFromTemplate();
          handleOpenOrder('template', designId, customData);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-[#1a1a1a] flex flex-col font-sans selection:bg-[#006989]/15 selection:text-[#006989]">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenOrder={handleOpenOrder} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenOrder={handleOpenOrder}
          onScrollToSection={handleScrollToSection}
        />

        <PhoneShowcase onOpenOrder={handleOpenOrder} />

        <OurDifference />

        <TemplateGallery
          onSelectTemplate={(id, pkg) => handleOpenOrder(pkg, id)}
          onPreviewTemplate={(template) => setPreviewTemplate(template)}
          onOpenFullTemplate={handleOpenFullTemplate}
        />

        <WhatsIncluded onOpenOrder={handleOpenOrder} />

        <PricingPackages onOpenOrder={handleOpenOrder} />

        <Reviews />

        <HowItWorks onOpenOrder={handleOpenOrder} />

        <FAQ />

        <CtaBanner
          onOpenOrder={handleOpenOrder}
          onScrollToSection={handleScrollToSection}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenLegal={(type) => setLegalType(type)}
      />

      {/* Floating WhatsApp Action Pill */}
      <WhatsAppWidget />

      {/* Order Configurator Multi-Step Wizard Modal */}
      {orderModal.isOpen && (
        <OrderConfiguratorModal
          isOpen={orderModal.isOpen}
          onClose={handleCloseOrder}
          initialPackage={orderModal.pkg}
          initialDesign={orderModal.designId}
          initialCustomData={orderModal.customData}
          onOpenFullTemplate={handleOpenFullTemplate}
        />
      )}

      {/* Template Fullscreen Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelectOrder={(designId, pkg) => handleOpenOrder(pkg, designId)}
          onOpenFullTemplate={handleOpenFullTemplate}
        />
      )}

      {/* Legal Modals (Privacy / Terms) */}
      {legalType && (
        <LegalModals
          type={legalType}
          onClose={() => setLegalType(null)}
        />
      )}
    </div>
  );
}

export default App;
