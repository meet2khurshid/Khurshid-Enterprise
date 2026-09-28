/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveToolsSection } from './components/InteractiveToolsSection';
import { WhatWeCreateSection } from './components/WhatWeCreateSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { OurWorkSection } from './components/OurWorkSection';
import { ProjectCtaBanner } from './components/ProjectCtaBanner';
import { QuoteAndContactSection } from './components/QuoteAndContactSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { COMPANY_CONFIG } from './config/company';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('apps-development');
  const [prefilledRequirements, setPrefilledRequirements] = useState<string>('');
  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    deliverables?: string[];
    bullets?: string[];
    image?: string;
    scope?: string;
    serviceId?: string;
  } | null>(null);

  const scrollToId = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
    scrollToId('#quote');
  };

  const handleApplyEstimateToQuote = (details: string, serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
    setPrefilledRequirements(details);
    scrollToId('#quote');
  };

  const handleOpenServiceDetails = (service: typeof COMPANY_CONFIG.services[0]) => {
    setModalData({
      title: service.title,
      description: service.description,
      deliverables: service.deliverables,
      bullets: service.bullets,
      image: service.image,
      scope: `${service.number} · ${service.code}`,
      serviceId: service.id,
    });
  };

  const handleOpenWhatWeCreateDetails = (item: typeof COMPANY_CONFIG.whatWeCreate[0]) => {
    // Map to relevant service ID
    let svcId = 'apps-development';
    if (item.categoryTag.includes('WEB')) svcId = 'web-development';
    if (item.categoryTag.includes('GRAPHIC')) svcId = 'graphics-prepress';
    if (item.categoryTag.includes('PRINTING') || item.categoryTag.includes('SUPPLIES')) {
      svcId = 'commercial-printing';
    }

    setModalData({
      title: item.title,
      description: item.description,
      deliverables: [
        'Custom production blueprint',
        'Direct project supervision and quality audits',
        'Industry standard export deliverables',
        'Turnkey fulfillment in Saddar Town, Karachi',
      ],
      image: item.image,
      scope: item.categoryTag,
      serviceId: svcId,
    });
  };

  const handleOpenWorkDetails = (work: typeof COMPANY_CONFIG.ourWork[0]) => {
    let svcId = 'apps-development';
    if (work.id === 'work-2') svcId = 'web-development';
    if (work.id === 'work-3' || work.id === 'work-4') svcId = 'graphics-prepress';
    if (work.id === 'work-5' || work.id === 'work-6') svcId = 'commercial-printing';

    setModalData({
      title: `${work.category}: ${work.subtitle}`,
      description: work.description,
      deliverables: work.features,
      scope: work.badge,
      serviceId: svcId,
    });
  };

  return (
    <div className="min-h-screen bg-[#070F1E] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar onSelectService={handleSelectServiceForQuote} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={() => scrollToId('#services')}
          onGetQuote={() => scrollToId('#quote')}
        />

        {/* 2. Our Services Section */}
        <ServicesSection
          onSelectService={handleSelectServiceForQuote}
          onOpenDetails={handleOpenServiceDetails}
        />

        {/* 3. Interactive Web Apps & Tools Section */}
        <InteractiveToolsSection
          onApplyToQuote={handleApplyEstimateToQuote}
        />

        {/* 4. What We Create Section */}
        <WhatWeCreateSection
          onRequestPrototype={() => scrollToId('#quote')}
          onSelectItem={handleOpenWhatWeCreateDetails}
        />

        {/* 5. About Us Section */}
        <AboutSection />

        {/* 6. Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 7. Our Work Section */}
        <OurWorkSection
          onSelectWork={handleOpenWorkDetails}
          onGetQuoteForCategory={(category) => {
            let svcId = 'apps-development';
            if (category.includes('Web')) svcId = 'web-development';
            if (category.includes('Graphic') || category.includes('Print Design')) svcId = 'graphics-prepress';
            if (category.includes('Packaging') || category.includes('Commercial')) svcId = 'commercial-printing';
            handleSelectServiceForQuote(svcId);
          }}
        />

        {/* 8. Have a Project in Mind? CTA Banner */}
        <ProjectCtaBanner
          onGetQuote={() => scrollToId('#quote')}
          onContactUs={() => scrollToId('#contact')}
        />

        {/* 9. Request for Quote & Inquiries + Official Contact */}
        <QuoteAndContactSection
          preselectedService={selectedServiceForQuote}
          prefilledRequirements={prefilledRequirements}
        />
      </main>

      {/* Footer */}
      <Footer onNavClick={(href) => scrollToId(href)} />

      {/* Detail / Specification Modal */}
      <DetailModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
        onSelectForQuote={handleSelectServiceForQuote}
      />
    </div>
  );
}
