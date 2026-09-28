import React, { useState } from 'react';
import { Smartphone, Globe, Palette, FileText, Package, Printer, CheckCircle2, ChevronRight, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface OurWorkSectionProps {
  onSelectWork: (work: typeof COMPANY_CONFIG.ourWork[0]) => void;
  onGetQuoteForCategory: (category: string) => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({
  onSelectWork,
  onGetQuoteForCategory,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'digital', label: 'Apps & Web' },
    { id: 'design', label: 'Graphic & Print Design' },
    { id: 'production', label: 'Packaging & Commercial Printing' },
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'work-1': return Smartphone;
      case 'work-2': return Globe;
      case 'work-3': return Palette;
      case 'work-4': return FileText;
      case 'work-5': return Package;
      case 'work-6': return Printer;
      default: return CheckCircle2;
    }
  };

  const filteredWork = COMPANY_CONFIG.ourWork.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'digital') return item.id === 'work-1' || item.id === 'work-2';
    if (activeTab === 'design') return item.id === 'work-3' || item.id === 'work-4';
    if (activeTab === 'production') return item.id === 'work-5' || item.id === 'work-6';
    return true;
  });

  return (
    <section id="our-work" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>PRODUCTION DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Representative production categories engineered to client specifications.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredWork.map((item) => {
            const Icon = getIcon(item.id);
            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-500/60 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
                    {item.category}
                  </h3>
                  <div className="text-xs font-semibold text-sky-700 mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Feature Checkmarks */}
                  <div className="space-y-2 mb-6">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onSelectWork(item)}
                    className="font-semibold text-slate-600 hover:text-sky-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onGetQuoteForCategory(item.category)}
                    className="font-semibold text-sky-700 hover:text-sky-800 uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote stating capabilities strictly */}
        <div className="mt-12 text-center text-xs text-slate-500 font-mono">
          * Representative production categories and technical capabilities offered by KHURSHID ENTERPRISE.
        </div>
      </div>
    </section>
  );
};
