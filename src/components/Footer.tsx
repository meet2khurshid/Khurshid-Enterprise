import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { Logo } from './Logo';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Interactive Tools', href: '#tools' },
    { name: 'What We Create', href: '#showcase' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { name: 'Apps Development', href: '#services' },
    { name: 'Web Design & Development', href: '#services' },
    { name: 'Graphics Designing & Pre-press', href: '#services' },
    { name: 'Commercial Printing', href: '#services' },
    { name: 'General Order Supplies', href: '#services' },
  ];

  return (
    <footer className="bg-[#050B14] text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="md" />

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-1">
              Digital, Creative, Printing & Technology Solutions. Multi-disciplinary enterprise delivering applications development, web design & development, graphics designing & pre-press services, commercial printing and general order supplies.
            </p>

            <div className="inline-block px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
              KARACHI SOUTH SADDAR TOWN
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">
              NAVIGATION
            </div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.href);
                    }}
                    className="hover:text-cyan-400 transition-colors inline-block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">
              CORE CAPABILITIES
            </div>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.href);
                    }}
                    className="hover:text-cyan-400 transition-colors inline-block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Registered Office */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">
              REGISTERED OFFICE
            </div>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed text-slate-300 font-mono">
                  {COMPANY_CONFIG.address}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_CONFIG.contact.phoneRaw}`}
                  className="text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {COMPANY_CONFIG.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  W
                </span>
                <a
                  href={COMPANY_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: {COMPANY_CONFIG.contact.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_CONFIG.contact.email}`}
                  className="text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {COMPANY_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{COMPANY_CONFIG.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2019–2026 {COMPANY_CONFIG.name}. All rights reserved.
          </div>
          <div className="text-slate-500">
            Multi-Disciplinary Industrial & Digital Solutions
          </div>
        </div>
      </div>
    </footer>
  );
};
