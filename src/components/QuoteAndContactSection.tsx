import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldAlert,
  Building,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { Logo } from './Logo';

interface QuoteAndContactProps {
  preselectedService?: string;
  prefilledRequirements?: string;
}

export const QuoteAndContactSection: React.FC<QuoteAndContactProps> = ({
  preselectedService,
  prefilledRequirements,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('apps-development');
  const [requirements, setRequirements] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedRfq, setCopiedRfq] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (prefilledRequirements) {
      setRequirements(prefilledRequirements);
    }
  }, [prefilledRequirements]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name or Organization is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for quotes';
    }
    if (!requirements.trim() || requirements.trim().length < 10) {
      newErrors.requirements = 'Please specify at least a brief description of project scope (min 10 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const handleCopyRfqDetails = () => {
    const selectedServiceObj = COMPANY_CONFIG.services.find((s) => s.id === service);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : service;
    const summary = `--- KHURSHID ENTERPRISE RFQ SPECIFICATION ---
Client/Organization: ${fullName}
Email: ${email}
Phone: ${phone}
Service: ${serviceName}
Requirements:
${requirements}
Date: ${new Date().toLocaleDateString()}
---------------------------------------------`;

    navigator.clipboard.writeText(summary);
    setCopiedRfq(true);
    setTimeout(() => setCopiedRfq(false), 2500);
  };

  const handleWhatsAppDirect = () => {
    const selectedServiceObj = COMPANY_CONFIG.services.find((s) => s.id === service);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : service;
    const text = encodeURIComponent(
      `*KHURSHID ENTERPRISE - RFQ INQUIRY*\n\n` +
      `*Name / Org:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Service:* ${serviceName}\n` +
      `*Requirements:*\n${requirements}\n`
    );
    const link = document.createElement('a');
    link.href = `https://wa.me/923158391364?text=${text}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleMailto = () => {
    const selectedServiceObj = COMPANY_CONFIG.services.find((s) => s.id === service);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : service;
    const subject = encodeURIComponent(`RFQ: ${serviceName} - ${fullName}`);
    const body = encodeURIComponent(
      `Hello KHURSHID ENTERPRISE Team,\n\nI would like to request a formal quotation:\n\n` +
      `Organization/Name: ${fullName}\n` +
      `Contact Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Service: ${serviceName}\n\n` +
      `Project Scope & Details:\n${requirements}\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${COMPANY_CONFIG.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div id="quote" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>COMMUNICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Request for Quote & Inquiries
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            Submit your project specifications or contact our representative office directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Registered Office Information */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="mb-4">
                <Logo variant="light" size="sm" />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-sky-700 font-bold mb-1">
                REGISTERED OFFICE
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                {COMPANY_CONFIG.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {COMPANY_CONFIG.tagline}
              </p>
            </div>

            {/* Exact Official Address Box */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase font-mono">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>REGISTERED BUSINESS ADDRESS</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-xs text-sky-700 hover:text-sky-800 font-medium inline-flex items-center gap-1 cursor-pointer"
                  title="Copy exact address"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono bg-slate-50 p-2.5 rounded border border-slate-100 select-all">
                {COMPANY_CONFIG.address}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <a
                href={`mailto:${COMPANY_CONFIG.contact.email}`}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    OFFICIAL EMAIL
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                    {COMPANY_CONFIG.contact.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${COMPANY_CONFIG.contact.phoneRaw}`}
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    TELEPHONE & MOBILE
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                    {COMPANY_CONFIG.contact.phone}
                  </div>
                </div>
              </a>

              <a
                href={COMPANY_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 hover:shadow-sm transition-all flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">
                      WHATSAPP AVAILABLE
                    </span>
                    <span className="px-1.5 py-0.2 bg-emerald-200 text-emerald-900 rounded text-[9px] font-bold">
                      Active
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-950 group-hover:underline truncate">
                    {COMPANY_CONFIG.contact.whatsapp} · Chat Directly
                  </div>
                </div>
              </a>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    OPERATING SCHEDULE
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                    {COMPANY_CONFIG.contact.operatingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Commercial Notice */}
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-900 leading-relaxed">
              <span className="font-bold">Commercial Notice:</span> Orders, commercial RFQ, packaging prototypes, and pre-press inquiries receive prioritized quotation standard within enterprise hours.
            </div>
          </div>

          {/* Right Column: Submit Specification / RFQ Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Submit Specification / RFQ
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Providing project deliverables allows our technical team to estimate feasibility and build times.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 text-emerald-800">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-heading">RFQ Inquiry Received!</h4>
                    <p className="text-xs text-emerald-700">
                      Your inquiry has been compiled and is ready for transmission to KHURSHID ENTERPRISE.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-emerald-100 text-xs space-y-2 font-mono text-slate-700">
                  <div><strong className="text-slate-900">Name/Org:</strong> {fullName}</div>
                  <div><strong className="text-slate-900">Email:</strong> {email}</div>
                  <div><strong className="text-slate-900">Phone:</strong> {phone}</div>
                  <div><strong className="text-slate-900">Service:</strong> {COMPANY_CONFIG.services.find(s => s.id === service)?.title || service}</div>
                  <div><strong className="text-slate-900">Specifications:</strong> {requirements}</div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp (+92 315 8391364)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMailto}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email ({COMPANY_CONFIG.contact.email})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyRfqDetails}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedRfq ? 'Copied to Clipboard!' : 'Copy RFQ Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setRequirements('');
                    }}
                    className="text-xs font-semibold text-sky-700 hover:underline ml-auto"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Full Name / Organization *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tariq Textiles / Enterprise"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border ${
                        errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-sky-500 focus:bg-white'
                      } text-slate-900 outline-none transition-all`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Official Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border ${
                        errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-sky-500 focus:bg-white'
                      } text-slate-900 outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Contact / WhatsApp Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Contact / WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border ${
                        errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-sky-500 focus:bg-white'
                      } text-slate-900 outline-none transition-all`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Service Required - strictly the 4 official services */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                      Service Required *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-sky-500 focus:bg-white transition-all"
                    >
                      <option value="apps-development">1. Apps Development (iOS & Android)</option>
                      <option value="web-development">2. Web Design & Development</option>
                      <option value="graphics-prepress">3. Graphics Designing & Pre-press Services</option>
                      <option value="commercial-printing">4. Commercial Printing & General Order Supplies</option>
                      <option value="multi-discipline">Comprehensive Multi-Service Procurement</option>
                    </select>
                  </div>
                </div>

                {/* Project Scope & Requirements */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                    Project Scope & Technical Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Briefly state your project specifications, volume, deliverables, timeline, or key technical formats..."
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 border ${
                      errors.requirements ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-sky-500 focus:bg-white'
                    } text-slate-900 outline-none transition-all`}
                  />
                  {errors.requirements && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.requirements}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-slate-950 hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
