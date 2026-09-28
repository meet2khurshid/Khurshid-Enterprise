import React from 'react';
import { ShieldCheck, Palette, Code2, Printer, CheckCircle, ChevronRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const WhyChooseUsSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    'why-1': ShieldCheck,
    'why-2': Palette,
    'why-3': Code2,
    'why-4': Printer,
  };

  return (
    <section id="why-us" className="py-24 bg-[#EDF4FC] text-slate-900 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-sky-200 text-xs font-bold text-sky-800 uppercase tracking-widest shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>EXECUTION PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Strict operational disciplines ensuring precision deliverables across software and physical pre-press output.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_CONFIG.whyChooseUs.map((card) => {
            const Icon = iconMap[card.id] || ShieldCheck;
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-sky-200/60 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 mb-6">
                    <Icon className="w-6 h-6 text-sky-600" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-sky-700">
                  <span>{card.tag}</span>
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
