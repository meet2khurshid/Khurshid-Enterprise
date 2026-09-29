import React from 'react';
import { ArrowRight, Layers, Smartphone, Globe, Palette, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface HeroProps {
  onExploreServices: () => void;
  onGetQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onGetQuote }) => {
  const quickServices = [
    { num: 'SERVICES 01', label: 'Mobile Apps', icon: Smartphone },
    { num: 'SERVICES 02', label: 'Web Tech', icon: Globe },
    { num: 'SERVICES 03', label: 'Pre-Press', icon: Palette },
    { num: 'SERVICES 04', label: 'Commercial Supplies', icon: Printer },
  ];

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#070F1E] tech-grid-pattern overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>ESTABLISHED {COMPANY_CONFIG.established}</span>
              <span className="text-cyan-600">·</span>
              <span>ENTERPRISE SOLUTIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.12] tracking-tight font-heading">
              Digital, Creative, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
                Printing
              </span>{' '}
              & Technology Solutions
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {COMPANY_CONFIG.subtitle}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onGetQuote}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 border border-cyan-300/40 shadow-lg shadow-cyan-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/40 hover:text-white transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore Services</span>
              </button>
            </div>

            {/* 4 Bottom Quick Service Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {quickServices.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.num}
                    className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1 flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-cyan-400" />
                      <span>{svc.num}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {svc.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stitch 3D Showcase Composite */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-[#0B1528] p-2 shadow-2xl shadow-cyan-950/50">
                {/* Floating Badge Top Left */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070F1E]/90 backdrop-blur-md border border-cyan-400/40 text-[11px] font-medium text-cyan-300 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Turnkey Delivery & Print</span>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070F1E]/90 backdrop-blur-md border border-emerald-400/40 text-[11px] font-medium text-emerald-300 shadow-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Industrial Grade Fulfillment</span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 group">
                  <img
                    src="/images/hero_tech_print_composite_1790328018273.jpg"
                    alt="KHURSHID ENTERPRISE digital apps, web portals and commercial printing packaging showcase"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Background ambient ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 -z-10 blur-xl opacity-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
