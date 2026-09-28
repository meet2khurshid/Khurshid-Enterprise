import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, FileText, Smartphone, Globe, Palette, Printer, Package } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    description: string;
    deliverables?: string[];
    bullets?: string[];
    image?: string;
    scope?: string;
    serviceId?: string;
  } | null;
  onSelectForQuote: (serviceId: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectForQuote,
}) => {
  if (!isOpen || !data) return null;

  const handleQuoteClick = () => {
    onClose();
    if (data.serviceId) {
      onSelectForQuote(data.serviceId);
    } else {
      onSelectForQuote('apps-development');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <span className="text-xs font-mono uppercase font-bold text-sky-700 tracking-wider">
              {data.scope || 'CAPABILITY SPECIFICATION'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {data.image && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">
              {data.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Deliverables or Bullets */}
          {(data.deliverables || data.bullets) && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Key Technical Standards & Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(data.deliverables || data.bullets || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-sky-50/50 border border-sky-100 flex items-start gap-2 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Institutional Compliance Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Operating Standards:</strong> All deliverables undergo strict quality assurance, pre-press calibration, or Play Console compliance inspection prior to release.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleQuoteClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Request Quote for This Scope</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
