import React from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onOpenDetails: (service: typeof COMPANY_CONFIG.services[0]) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenDetails,
}) => {
  return (
    <section id="services" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean Stitch Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>ENTERPRISE CATALOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            End-to-end technical execution and commercial production capabilities.
          </p>
        </div>

        {/* 2x2 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {COMPANY_CONFIG.services.map((svc) => (
            <div
              key={svc.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-sky-500/60 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card Meta Header Bar */}
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded">
                  {svc.number}
                </span>
                <span className="text-slate-500 tracking-wider uppercase font-medium">
                  {svc.code}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors font-heading mb-2">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {svc.shortDescription}
                </p>

                {/* Service Visual */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-6 border border-slate-200/80 group-hover:border-sky-300 transition-colors">
                  <img
                    src={svc.image}
                    alt={`${svc.title} - KHURSHID ENTERPRISE`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 mb-8 flex-1">
                  {svc.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link Row */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenDetails(svc)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer group/btn"
                  >
                    <span>Explore Service</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(svc.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-sky-600 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Get a Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
