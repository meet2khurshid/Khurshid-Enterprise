import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface ProjectCtaBannerProps {
  onGetQuote: () => void;
  onContactUs: () => void;
}

export const ProjectCtaBanner: React.FC<ProjectCtaBannerProps> = ({
  onGetQuote,
  onContactUs,
}) => {
  return (
    <section className="py-20 bg-[#070F1E] tech-grid-pattern relative overflow-hidden border-b border-cyan-900/40">
      {/* Radial light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>SINGLE PROCUREMENT & INQUIRIES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
          Have a Project in Mind?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Let&apos;s discuss your requirements and find the right solution for your project.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onGetQuote}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 border border-cyan-400/40 shadow-lg shadow-cyan-600/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onContactUs}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 hover:text-white transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};
