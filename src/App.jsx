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
import { CoupleGuestDashboard } from './components/CoupleGuestDashboard';

import { TEMPLATE_PAGES } from './data/templates';
import { getClientInvite, unpackInviteData } from './data/clientInvites';

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
  const [viewingCustomData, setViewingCustomData] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [guestDashboardSlug, setGuestDashboardSlug] = useState(null);

  // Check URL pathname and hash on load and listen for changes
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace('#', '').trim();
      const urlParams = new URLSearchParams(window.location.search);

      // Check for Couple's Guest Dashboard routes
      // 1. /invite/:slug/guests or /invite/:slug/rsvp
      const inviteGuestMatch = path.match(/^invite\/([a-z0-9_-]+)\/(guests|rsvp|tracker)$/i);
      if (inviteGuestMatch && inviteGuestMatch[1]) {
        setGuestDashboardSlug(inviteGuestMatch[1]);
        setViewingTemplateId(null);
        setClientProfile(null);
        return;
      }

      // 2. /guests/:slug or /rsvp/:slug
      const directGuestMatch = path.match(/^(guests|rsvp|tracker)\/([a-z0-9_-]+)$/i);
      if (directGuestMatch && directGuestMatch[2]) {
        setGuestDashboardSlug(directGuestMatch[2]);
        setViewingTemplateId(null);
        setClientProfile(null);
        return;
      }

      // 3. Query param ?guests=true or ?dashboard=true
      if (urlParams.get('guests') || urlParams.get('dashboard') || hash === 'guests' || hash === 'rsvp') {
        const slug = path.startsWith('invite/') ? path.replace('invite/', '') : (path || 'hadi');
        setGuestDashboardSlug(slug);
        setViewingTemplateId(null);
        setClientProfile(null);
        return;
      }

      setGuestDashboardSlug(null);

      // Check for packed invite data in hash (#d=... or #data=...) or query (?d=... or ?data=...)
      const encodedPayload = urlParams.get('d') || urlParams.get('data') || (hash.startsWith('d=') ? hash.replace('d=', '') : hash.startsWith('data=') ? hash.replace('data=', '') : null);
      if (encodedPayload) {
        const unpacked = unpackInviteData(encodedPayload);
        if (unpacked && unpacked.tpl) {
          setViewingTemplateId(unpacked.tpl);
          setViewingCustomData(unpacked.data || null);
          setClientProfile({ clientName: unpacked.data?.partner1 ? `${unpacked.data.partner1} & ${unpacked.data.partner2}` : 'Client Preview', slug: 'preview' });
          return;
        }
      }

      if (path) {
        if (path.startsWith('template/')) {
          const id = path.replace('template/', '');
          setViewingTemplateId(id);
          setViewingCustomData(null);
          setClientProfile(null);
          return;
        }
        if (path.startsWith('invite/')) {
          const slug = path.replace('invite/', '');
          const client = getClientInvite(slug);
          if (client) {
            setViewingTemplateId(client.templateId);
            setViewingCustomData(client.customData);
            setClientProfile(client);
            return;
          }
          // Fallback to session/local storage if any
          const savedCustom = sessionStorage.getItem('wbg_custom_' + slug.replace(/[^a-z0-9]/gi, '')) ||
                              localStorage.getItem('wbg_custom_' + slug.replace(/[^a-z0-9]/gi, ''));
          setViewingTemplateId('dolce-vita');
          if (savedCustom) {
            try { setViewingCustomData(JSON.parse(savedCustom)); } catch (e) {}
          }
          return;
        }
        // Direct customer slug e.g. /hadi
        const directClient = getClientInvite(path);
        if (directClient) {
          setViewingTemplateId(directClient.templateId);
          setViewingCustomData(directClient.customData);
          setClientProfile(directClient);
          return;
        }
        if (TEMPLATE_PAGES[path]) {
          setViewingTemplateId(path);
          setViewingCustomData(null);
          setClientProfile(null);
          return;
        }
      }

      // 2. Check URL hash (e.g. #template/the-sacred-garden)
      if (hash.startsWith('template/')) {
        const id = hash.replace('template/', '');
        setViewingTemplateId(id);
        setViewingCustomData(null);
        setClientProfile(null);
      } else if (TEMPLATE_PAGES[hash]) {
        setViewingTemplateId(hash);
        setViewingCustomData(null);
        setClientProfile(null);
      } else if (!hash || ['hero', 'templates', 'pricing', 'reviews', 'faq', 'how-it-works'].includes(hash)) {
        setViewingTemplateId(null);
        setViewingCustomData(null);
        setClientProfile(null);
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

  // If Couple's Guest Dashboard is active, render it
  if (guestDashboardSlug) {
    return (
      <CoupleGuestDashboard
        clientSlug={guestDashboardSlug}
        onBackToHome={() => {
          setGuestDashboardSlug(null);
          window.history.pushState(null, '', '/');
        }}
        onOpenInvite={(slug) => {
          setGuestDashboardSlug(null);
          const client = getClientInvite(slug);
          setViewingTemplateId(client ? client.templateId : 'dolce-vita');
          setViewingCustomData(client ? client.customData : null);
          setClientProfile(client);
          window.history.pushState(null, '', `/invite/${slug}`);
        }}
      />
    );
  }

  // If a template is actively being viewed, render the self-hosted invitation page!
  if (viewingTemplateId) {
    return (
      <InvitationTemplateView
        templateId={viewingTemplateId}
        onBack={handleBackFromTemplate}
        initialCustomData={viewingCustomData}
        clientProfile={clientProfile}
        onOpenDashboard={(slug) => {
          setViewingTemplateId(null);
          setGuestDashboardSlug(slug);
          window.history.pushState(null, '', `/invite/${slug}/guests`);
        }}
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
