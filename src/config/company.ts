/**
 * Central Configuration for KHURSHID ENTERPRISE
 * 
 * Official company information, registered address, official services, 
 * and contact placeholders.
 */

export const COMPANY_CONFIG = {
  name: "KHURSHID ENTERPRISE",
  shortName: "KHURSHID ENTERPRISE",
  established: "2019",
  domain: "https://www.khurshidenterprise.com",
  tagline: "Digital, Creative, Printing & Technology Solutions",
  subtitle: "Professional digital, creative, printing and commercial solutions for businesses and individuals.",
  
  // Official Registered Address - EXACT registered format
  address: "OFFICE NO. M-9, MAZANINE FL. SHAHZEB TERRACE, GANALINE-03 RATTAN TA LO, Karachi South Saddar Town",
  
  // Official Contact Details
  contact: {
    email: "meet2khurshid@gmail.com",
    phone: "+92 315 8391364",
    phoneRaw: "+923158391364",
    whatsapp: "+92 315 8391364",
    whatsappLink: "https://wa.me/923158391364",
    operatingHours: "Mon - Sat: 9:00 AM - 8:00 PM",
  },

  // The 4 Official Main Services
  services: [
    {
      id: "apps-development",
      code: "SCOPE: APP / OPS",
      number: "SERVICE 01",
      title: "Apps Development",
      shortDescription: "Android & iOS Applications and Play Console ready app solutions.",
      description: "Complete mobile architecture from UI/UX design to native Android & iOS development and Google Play Console release management.",
      deliverables: [
        "Android & iOS Applications",
        "Play Console Ready Applications",
        "Cross-Platform & Native Architecture",
        "API Integration & Cloud Synchronization",
      ],
      bullets: [
        "Native Android & iOS Architecture",
        "Google Play Console Readiness & Compliance",
        "Production Cloud Synchronization",
      ],
      image: "/src/assets/images/service_apps_dev_1790328037620.jpg",
    },
    {
      id: "web-development",
      code: "SCOPE: WEB / OPS",
      number: "SERVICE 02",
      title: "Web Design & Development",
      shortDescription: "Modern responsive websites, business websites and custom web solutions.",
      description: "High-performance web applications, responsive corporate platforms, and custom digital portals engineered for reliability and scalability.",
      deliverables: [
        "Modern responsive websites",
        "Business websites",
        "Custom web solutions",
        "Enterprise CMS & Web Portals",
      ],
      bullets: [
        "Corporate Web Portals",
        "Scalable Architecture",
        "Ultra-Fast Cloud Deployment",
      ],
      image: "/src/assets/images/service_web_dev_1790328055528.jpg",
    },
    {
      id: "graphics-prepress",
      code: "SCOPE: DES / CTP",
      number: "SERVICE 03",
      title: "Graphics Designing & Pre-press Services",
      shortDescription: "Professional graphic design, print-ready artwork and pre-press preparation.",
      description: "Rigorous visual communication design combined with technical CTP (Computer to Plate) film calibration, die-line trapping, and CMYK color accuracy.",
      deliverables: [
        "Professional graphic design",
        "Print-ready artwork",
        "Pre-press preparation",
        "Vector Proofing & CMYK Calibration",
      ],
      bullets: [
        "Vector Proofing & CMYK Calibration",
        "CTP (Computer to Plate) Film Preparation",
        "Die-cut Trapping & Bleed Verification",
      ],
      image: "/src/assets/images/service_graphic_prepress_1790328071275.jpg",
    },
    {
      id: "commercial-printing",
      code: "SCOPE: PRN / ORD",
      number: "SERVICE 04",
      title: "Commercial Printing & General Order Supplies",
      shortDescription: "Commercial printing, business printing and general order supplies.",
      description: "High-volume offset & digital print manufacturing, custom product packaging, corporate stationery, and institutional general order fulfillment.",
      deliverables: [
        "Commercial printing",
        "Business printing",
        "General order supplies",
        "Packaging & Stationery Production",
      ],
      bullets: [
        "High-Volume Commercial Offset & Digital Runs",
        "Packaging & Stationery Production",
        "Institutional General Order Supplies",
      ],
      image: "/src/assets/images/service_commercial_printing_1790328087329.jpg",
    },
  ],

  // What We Create (Service Examples & Capability Galleries)
  whatWeCreate: [
    {
      id: "create-1",
      categoryTag: "WEB & APP ECOSYSTEM",
      title: "Enterprise Platforms & Mobile Portals",
      description: "Synchronized cross-platform application suites for real-time customer interaction and internal operations.",
      scope: "Applications Development & Web Systems",
      colSpan: "col-span-1 lg:col-span-2",
      image: "/src/assets/images/hero_tech_print_composite_1790328018273.jpg",
    },
    {
      id: "create-2",
      categoryTag: "APP DESIGN",
      title: "Fintech & Data Native Interfaces",
      description: "Clean analytical Play Console ready interfaces with strict data privacy and smooth navigation.",
      scope: "Android & iOS Applications",
      colSpan: "col-span-1",
      image: "/src/assets/images/service_apps_dev_1790328037620.jpg",
    },
    {
      id: "create-3",
      categoryTag: "GRAPHIC & PRE-PRESS",
      title: "Corporate Identity & Color Proofing",
      description: "Full brand suites, CMYK color manuals, and precision CTP plate preparation for flawless reproduction.",
      scope: "Graphics Designing & Pre-press",
      colSpan: "col-span-1",
      image: "/src/assets/images/service_graphic_prepress_1790328071275.jpg",
    },
    {
      id: "create-4",
      categoryTag: "COMMERCIAL PRINTING",
      title: "Custom Die-Cut & Luxury Packaging",
      description: "Embossed rigid boxes, laminated product packs, premium foil jackets, and industrial runs.",
      scope: "Commercial Printing & Packaging",
      colSpan: "col-span-1",
      image: "/src/assets/images/service_commercial_printing_1790328087329.jpg",
    },
    {
      id: "create-5",
      categoryTag: "GENERAL ORDER SUPPLIES",
      title: "Corporate Stationery & Operational Inventory",
      description: "Office registers, custom vouchers, forms, annual report collaterals, and institutional procurement logistics.",
      scope: "General Order Supplies",
      colSpan: "col-span-1",
      image: "/src/assets/images/service_commercial_printing_1790328087329.jpg",
    },
  ],

  // Why Choose Us
  whyChooseUs: [
    {
      id: "why-1",
      title: "Professional Solutions",
      description: "Modern solutions based on project requirements and commercial standards.",
      tag: "DOCUMENTATION-LED",
    },
    {
      id: "why-2",
      title: "Creative Expertise",
      description: "Professional graphic design and visual communication crafted for maximum impact.",
      tag: "VISUAL EXCELLENCE",
    },
    {
      id: "why-3",
      title: "Technology & Digital",
      description: "Applications and responsive web solutions built with future-proof scalability.",
      tag: "ENGINEERED CODE",
    },
    {
      id: "why-4",
      title: "Printing & Production",
      description: "Commercial printing, pre-press services with CMYK calibration and exact tolerances.",
      tag: "PRESS CERTIFIED",
    },
  ],

  // Our Work Disciplines (Examples of Capabilities, clearly stated)
  ourWork: [
    {
      id: "work-1",
      category: "App Design",
      badge: "PRODUCTION CATEGORY 01",
      subtitle: "Android & iOS Play Console Ready",
      description: "High-performance mobile UI/UX architecture, production-ready releases aligned to official platform specifications.",
      features: ["Native Swift & Kotlin / Flutter", "Play Console Submission Standards", "Offline Sync & Secure API Storage"],
    },
    {
      id: "work-2",
      category: "Web Design",
      badge: "PRODUCTION CATEGORY 02",
      subtitle: "Responsive Corporate Portals",
      description: "Full-stack responsive design, content layout, database and transactional security, enterprise CMS integration.",
      features: ["Dynamic Viewport Adaptation", "High-Speed SEO Optimization", "Enterprise Content Management"],
    },
    {
      id: "work-3",
      category: "Graphic Design",
      badge: "PRODUCTION CATEGORY 03",
      subtitle: "Visual Identity & Concept",
      description: "Vector logos, comprehensive brand manuals, typography guidelines, commercial marketing kits, and scalable vector assets.",
      features: ["Vector Brand Identity Guidelines", "Marketing Collateral Kits", "Typography & Layout Scalability"],
    },
    {
      id: "work-4",
      category: "Print Design",
      badge: "PRODUCTION CATEGORY 04",
      subtitle: "Editorial & Marketing Collateral",
      description: "Multi-page corporate brochures, annual company dossiers, promotional flyers, high-impact rollups, and print-ready artwork.",
      features: ["Multi-Page Brochures & Folders", "Bleed & Trapping Calibration", "High-Resolution Artwork Export"],
    },
    {
      id: "work-5",
      category: "Packaging",
      badge: "PRODUCTION CATEGORY 05",
      subtitle: "Rigid Boxes & Custom Cartons",
      description: "Custom structural die-cuts, hot-metallic foil stamping, embossed folding cartons, branded labels, and specialty product boxes.",
      features: ["Structural Precision Die-Lines", "Foil Stamping & UV Spot Finishing", "Durable Board & Paper Stocks"],
    },
    {
      id: "work-6",
      category: "Commercial Printing",
      badge: "PRODUCTION CATEGORY 06",
      subtitle: "Offset & Digital Production Runs",
      description: "Mass-industrial multi-color runs, corporate business stationery/vouchers, secure forms, institutional procurement supplies.",
      features: ["High-Volume Sheetfed Offset", "Automated Collating & Binding", "General Order Institutional Supplies"],
    },
  ],
};
