import React from 'react';
import { Smartphone, Palette, Printer, Package, Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const AboutSection: React.FC = () => {
  const pillars = [
    { label: 'Technology', desc: 'Apps & Web Architecture', icon: Smartphone },
    { label: 'Design', desc: 'Identity & Pre-Press', icon: Palette },
    { label: 'Printing', desc: 'Offset & Commercial', icon: Printer },
    { label: 'Commercial Supply', desc: 'General Order Supplies', icon: Package },
  ];

  return (
    <section id="about" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Visuals & Verification Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative">
              {/* Primary Image Card: Design Workstation & Pre-press */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[16/10] sm:aspect-[4/3]">
                <img
                  src="/src/assets/images/service_graphic_prepress_1790328071275.jpg"
                  alt="Graphic Design & Pre-press facility at KHURSHID ENTERPRISE"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded text-white text-[11px] font-mono tracking-wider">
                  Unified Operational Matrix
                </div>
              </div>

              {/* Overlapping Secondary Image: Tech & Web Portal */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 rounded-xl overflow-hidden border-4 border-white shadow-2xl bg-slate-900 aspect-[16/10]">
                <img
                  src="/src/assets/images/service_web_dev_1790328055528.jpg"
                  alt="Web & App Development Portal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bottom Proof Badges */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-bold uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>OPERATING BASE</span>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  Karachi South Saddar Town
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-700 font-bold uppercase mb-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>CLIENT PROFILE</span>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  Enterprises & Individuals
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Organizational Background Prose & Milestones */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
              <span>ORGANIZATIONAL BACKGROUND</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              About <span className="text-sky-700">{COMPANY_CONFIG.name}</span>
            </h2>

            {/* Official Brief Prose */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 text-base sm:text-lg border-l-4 border-sky-600 pl-4 py-0.5">
                Established in 2019, KHURSHID ENTERPRISE provides digital, creative, printing and commercial solutions. Our services cover applications development, web design and development, graphics designing and pre-press services, commercial printing and general order supplies.
              </p>
              <p className="text-slate-600">
                By maintaining dedicated technical supervision across digital systems, pre-press proofing, and commercial-grade heavy execution, we assure direct accountability and immediate feedback for clients across diverse sectors.
              </p>
            </div>

            {/* Milestones */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-sky-600 mt-2 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase font-mono">
                    2019 — Establishment & Core Foundations
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Commenced operations in Saddar Town Karachi, offering graphic design and commercial print order execution.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-sky-600 mt-2 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase font-mono">
                    Present — Multi-Disciplinary Digital, Creative & Industrial Print Fulfillment
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Fully integrated pipeline spanning mobile apps, web solutions, pre-press CTP, and general order supplies.
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="p-3 rounded-lg bg-sky-50/60 border border-sky-100 text-center flex flex-col items-center justify-center"
                  >
                    <Icon className="w-5 h-5 text-sky-700 mb-1" />
                    <span className="text-xs font-bold text-slate-900">{p.label}</span>
                    <span className="text-[10px] text-slate-500">{p.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
