import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Phone, Mail } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { Logo } from './Logo';

interface NavbarProps {
  onSelectService?: (serviceName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Tools', href: '#tools' },
    { name: 'What We Create', href: '#showcase' },
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070F1E]/95 backdrop-blur-md border-b border-sky-950/60 shadow-xl shadow-black/30 py-3'
          : 'bg-[#070F1E] border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo - Official User Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1"
            aria-label="KHURSHID ENTERPRISE Home"
          >
            <Logo variant="dark" size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={COMPANY_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 transition-all"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 border border-cyan-400/30 shadow-md shadow-cyan-600/20 active:scale-95 transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070F1E] border-b border-cyan-900/40 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-widest px-3 py-1">
            Navigation Menu
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-900/80 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={COMPANY_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp (+92 315 8391364)</span>
            </a>

            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-cyan-600 hover:bg-cyan-500 shadow-md transition-all"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
