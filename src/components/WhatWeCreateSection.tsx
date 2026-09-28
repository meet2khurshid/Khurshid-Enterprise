import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface WhatWeCreateProps {
  onRequestPrototype: () => void;
  onSelectItem: (item: typeof COMPANY_CONFIG.whatWeCreate[0]) => void;
}

export const WhatWeCreateSection: React.FC<WhatWeCreateProps> = ({
  onRequestPrototype,
  onSelectItem,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'web', label: 'Websites' },
    { id: 'graphic', label: 'Graphic Design' },
    { id: 'print', label: 'Commercial Printing' },
    { id: 'packaging', label: 'Packaging & Labels' },
    { id: 'stationery', label: 'Supplies' },
  ];

  const filteredItems = COMPANY_CONFIG.whatWeCreate.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'mobile') return item.categoryTag.includes('APP');
    if (filter === 'web') return item.categoryTag.includes('WEB');
    if (filter === 'graphic') return item.categoryTag.includes('GRAPHIC');
    if (filter === 'print') return item.categoryTag.includes('PRINTING');
    if (filter === 'packaging') return item.categoryTag.includes('PRINTING');
    if (filter === 'stationery') return item.categoryTag.includes('SUPPLIES');
    return true;
  });

  return (
    <section id="showcase" className="py-24 bg-[#070F1E] tech-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>SHOWCASE & VISUALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              What We Create
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              A curated repository of actual print interfaces, brand identity systems, and commercial production runs.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestPrototype}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider group cursor-pointer shrink-0"
          >
            <span>Request Custom Prototype</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                filter === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isMarquee = index === 0 && filter === 'all';
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group relative rounded-2xl overflow-hidden bg-[#0B1528] border border-cyan-500/20 hover:border-cyan-400/60 shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[340px] ${
                  isMarquee ? 'lg:col-span-2 min-h-[380px]' : 'col-span-1'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-[#070F1E]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="inline-block self-start mb-3">
                    <span className="px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-400/40 text-[10px] font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                      {item.categoryTag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 max-w-xl">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 pt-3 border-t border-white/10">
                    <span className="text-slate-400 text-[11px] font-mono">{item.scope}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
