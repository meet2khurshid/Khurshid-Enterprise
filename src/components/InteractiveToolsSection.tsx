import React, { useState, useMemo } from 'react';
import {
  Calculator,
  RefreshCw,
  Sliders,
  Check,
  ArrowRight,
  Printer,
  Sparkles,
  Layers,
  Copy,
  Phone,
  FileSpreadsheet,
  Ruler,
  Maximize2
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface InteractiveToolsSectionProps {
  onApplyToQuote: (details: string, serviceId: string) => void;
}

export const InteractiveToolsSection: React.FC<InteractiveToolsSectionProps> = ({
  onApplyToQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'converter'>('calculator');

  // ==========================================
  // 1. PRINT JOB QUOTATION CALCULATOR STATE
  // ==========================================
  const [productType, setProductType] = useState('brochures');
  const [paperStock, setPaperStock] = useState('art-card-300');
  const [quantity, setQuantity] = useState(1000);
  const [colorMode, setColorMode] = useState('cmyk-both'); // 'cmyk-both' | 'cmyk-single' | 'spot-mono'
  const [lamination, setLamination] = useState<'none' | 'matte' | 'gloss' | 'velvet'>('matte');
  const [foilStamping, setFoilStamping] = useState(false);
  const [dieCutting, setDieCutting] = useState(false);
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [copiedEstimate, setCopiedEstimate] = useState(false);

  // Pricing engine (representative commercial Pakistani pre-press & offset benchmark rates in PKR)
  const calculation = useMemo(() => {
    // Base unit rates per product
    const productBaseRate: Record<string, { base: number; plateCtp: number; name: string }> = {
      'business-cards': { base: 3.5, plateCtp: 1200, name: 'Executive Business Cards (Pack)' },
      'brochures': { base: 14.0, plateCtp: 3500, name: 'Corporate Multi-Page Brochure / Catalog' },
      'packaging-boxes': { base: 28.0, plateCtp: 4500, name: 'Custom Die-Cut Product Packaging Box' },
      'flyers': { base: 5.5, plateCtp: 2200, name: 'Promotional Flyer / Handout (A5/A4)' },
      'letterheads': { base: 4.0, plateCtp: 1500, name: 'Corporate Letterheads & Office Stationery' },
      'stickers-labels': { base: 3.0, plateCtp: 1800, name: 'Die-Cut Product Decals & Adhesive Labels' },
    };

    // Paper stock multiplier
    const paperMultiplier: Record<string, { multiplier: number; label: string }> = {
      'art-card-350': { multiplier: 1.35, label: 'Art Card 350 GSM (Heavy Luxury)' },
      'art-card-300': { multiplier: 1.2, label: 'Art Card 300 GSM (Standard Commercial)' },
      'art-paper-150': { multiplier: 0.95, label: 'Art Gloss Paper 150 GSM' },
      'bleach-board-350': { multiplier: 1.4, label: 'Bleached Sulphate Folding Boxboard' },
      'kraft-card': { multiplier: 1.15, label: 'Eco Kraft Unbleached Board' },
      'offset-paper-80': { multiplier: 0.75, label: 'Premium 80 GSM Woodfree Offset' },
    };

    const currentProd = productBaseRate[productType] || productBaseRate['brochures'];
    const currentPaper = paperMultiplier[paperStock] || paperMultiplier['art-card-300'];

    // Color mode multiplier
    let colorMultiplier = 1.0;
    if (colorMode === 'cmyk-both') colorMultiplier = 1.25;
    else if (colorMode === 'cmyk-single') colorMultiplier = 1.0;
    else if (colorMode === 'spot-mono') colorMultiplier = 0.75;

    // Quantity scale efficiency (commercial offset volume discount curve)
    let volumeDiscount = 1.0;
    if (quantity >= 5000) volumeDiscount = 0.72;
    else if (quantity >= 2500) volumeDiscount = 0.82;
    else if (quantity >= 1000) volumeDiscount = 0.92;
    else if (quantity >= 500) volumeDiscount = 1.05;
    else volumeDiscount = 1.25; // small runs have higher overhead

    const unitPrint = currentProd.base * currentPaper.multiplier * colorMultiplier * volumeDiscount;
    let unitPostPress = 0;

    if (lamination === 'matte' || lamination === 'gloss') unitPostPress += 2.0;
    if (lamination === 'velvet') unitPostPress += 4.5;
    if (foilStamping) unitPostPress += 3.5;
    if (dieCutting) unitPostPress += 2.5;

    const unitTotal = Math.max(1.5, unitPrint + unitPostPress);
    const subtotalPrint = unitTotal * quantity;
    const plateAndSetup = currentProd.plateCtp + (dieCutting ? 2000 : 0) + (foilStamping ? 2500 : 0);
    const totalPKR = Math.round(subtotalPrint + plateAndSetup);
    const perUnitPKR = (totalPKR / quantity).toFixed(2);

    // Approximate conversion rate: 1 USD = 280 PKR
    const totalUSD = Math.round(totalPKR / 280);
    const perUnitUSD = (totalUSD / quantity).toFixed(3);

    return {
      productName: currentProd.name,
      paperName: currentPaper.label,
      plateAndSetup,
      totalPKR,
      perUnitPKR,
      totalUSD,
      perUnitUSD,
      turnaround: quantity >= 5000 ? '4 - 6 Business Days' : '2 - 4 Business Days',
    };
  }, [productType, paperStock, quantity, colorMode, lamination, foilStamping, dieCutting]);

  const handleApplyEstimate = () => {
    const summary = `Print Job Calculator Estimate:
- Product: ${calculation.productName}
- Paper Stock: ${calculation.paperName}
- Quantity: ${quantity.toLocaleString()} units
- Color Mode: ${colorMode.toUpperCase()}
- Finishing: Lamination (${lamination}), Foil Stamping (${foilStamping ? 'Yes' : 'No'}), Custom Die-Cut (${dieCutting ? 'Yes' : 'No'})
- Estimated Total: ${currency === 'PKR' ? `PKR ${calculation.totalPKR.toLocaleString()}` : `USD $${calculation.totalUSD.toLocaleString()}`} (approx. ${currency === 'PKR' ? `PKR ${calculation.perUnitPKR}/unit` : `$${calculation.perUnitUSD}/unit`})
- Estimated Delivery: ${calculation.turnaround}`;

    onApplyToQuote(summary, 'commercial-printing');
  };

  const handleCopyEstimate = () => {
    const summary = `--- KHURSHID ENTERPRISE PRINT ESTIMATE ---
Product: ${calculation.productName}
Paper: ${calculation.paperName}
Quantity: ${quantity.toLocaleString()} pcs
Color: ${colorMode}
Finishing: Lamination: ${lamination}, Foil: ${foilStamping ? 'Yes' : 'No'}, Die-Cut: ${dieCutting ? 'Yes' : 'No'}
Est. Cost: ${currency === 'PKR' ? `PKR ${calculation.totalPKR.toLocaleString()}` : `$${calculation.totalUSD.toLocaleString()}`}
Delivery: ${calculation.turnaround}
------------------------------------------`;
    navigator.clipboard.writeText(summary);
    setCopiedEstimate(true);
    setTimeout(() => setCopiedEstimate(false), 2500);
  };

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `*KHURSHID ENTERPRISE - PRINT CALCULATION INQUIRY*\n\n` +
      `*Product:* ${calculation.productName}\n` +
      `*Substrate:* ${calculation.paperName}\n` +
      `*Volume:* ${quantity.toLocaleString()} units\n` +
      `*Finishing:* Lamination: ${lamination} | Foil: ${foilStamping ? 'Yes' : 'No'} | Die-Cut: ${dieCutting ? 'Yes' : 'No'}\n` +
      `*Estimated Cost:* ${currency === 'PKR' ? `PKR ${calculation.totalPKR.toLocaleString()}` : `$${calculation.totalUSD.toLocaleString()}`}\n\n` +
      `Please provide formal commercial confirmation and proofing timeline.`
    );
    window.open(`https://api.whatsapp.com/send?phone=923158391364&text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // ==========================================
  // 2. SMART UNIT & PRE-PRESS CONVERTER STATE
  // ==========================================
  const [dimensionMode, setDimensionMode] = useState<'mm' | 'in' | 'px'>('mm');
  const [widthVal, setWidthVal] = useState<number>(210); // Default A4 mm
  const [heightVal, setHeightVal] = useState<number>(297);
  const [dpi, setDpi] = useState<number>(300); // 300 DPI print standard
  const [gsmVal, setGsmVal] = useState<number>(300);

  // Preset sizes
  const applyPresetSize = (w: number, h: number, unit: 'mm' | 'in') => {
    if (unit === 'mm') {
      setDimensionMode('mm');
      setWidthVal(w);
      setHeightVal(h);
    } else {
      setDimensionMode('in');
      setWidthVal(w);
      setHeightVal(h);
    }
  };

  // Dimensional conversions
  const converted = useMemo(() => {
    let widthMm = 0;
    let heightMm = 0;

    if (dimensionMode === 'mm') {
      widthMm = widthVal;
      heightMm = heightVal;
    } else if (dimensionMode === 'in') {
      widthMm = widthVal * 25.4;
      heightMm = heightVal * 25.4;
    } else if (dimensionMode === 'px') {
      widthMm = (widthVal / dpi) * 25.4;
      heightMm = (heightVal / dpi) * 25.4;
    }

    const widthIn = (widthMm / 25.4).toFixed(3);
    const heightIn = (heightMm / 25.4).toFixed(3);
    const widthPx = Math.round((widthMm / 25.4) * dpi);
    const heightPx = Math.round((heightMm / 25.4) * dpi);

    // 3mm standard CTP bleed boundary
    const bleedWidthMm = (widthMm + 6).toFixed(1);
    const bleedHeightMm = (heightMm + 6).toFixed(1);

    // GSM to approximate Caliper Points & Microns
    // General benchmark for coated art card: 100 GSM ≈ 100 microns ≈ 4 pt
    const estimatedMicrons = Math.round(gsmVal * 1.1);
    const estimatedPoints = (gsmVal * 0.043).toFixed(1);

    return {
      mm: { w: widthMm.toFixed(1), h: heightMm.toFixed(1) },
      in: { w: widthIn, h: heightIn },
      px: { w: widthPx, h: heightPx },
      bleed: { w: bleedWidthMm, h: bleedHeightMm },
      paper: { microns: estimatedMicrons, points: estimatedPoints },
    };
  }, [dimensionMode, widthVal, heightVal, dpi, gsmVal]);

  return (
    <section id="tools" className="py-24 bg-slate-900 tech-grid-pattern relative border-b border-cyan-900/40">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE WEB APPS & PRODUCTION UTILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Live Pre-Press & Production Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            Real-time interactive applications engineered directly in browser—calculate commercial print runs or convert precision CTP press measurements.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Print Quotation Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('converter')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'converter'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Smart Pre-Press Unit Converter</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: LIVE PRINT JOB QUOTATION CALCULATOR           */}
        {/* ==================================================== */}
        {activeTab === 'calculator' && (
          <div className="bg-[#0B1528] rounded-2xl border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Controls: Parameters */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  CONFIGURATION PARAMETERS
                </span>
                <span className="text-[11px] text-slate-400">Commercial Standard Rates</span>
              </div>

              {/* 1. Product Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                  Product Category
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="brochures">Corporate Multi-Page Brochure / Catalog (A4/Tri-fold)</option>
                  <option value="business-cards">Executive Business Cards (Offset 350 GSM)</option>
                  <option value="packaging-boxes">Custom Die-Cut Product Packaging Box</option>
                  <option value="flyers">Promotional Flyers & Handouts (A5 / A4)</option>
                  <option value="letterheads">Official Corporate Stationery & Letterheads</option>
                  <option value="stickers-labels">Die-Cut Product Decals & Specialty Labels</option>
                </select>
              </div>

              {/* 2. Paper Stock */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                  Paper Substrate & GSM
                </label>
                <select
                  value={paperStock}
                  onChange={(e) => setPaperStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="art-card-350">Art Card 350 GSM (Heavy Luxury Firm Stock)</option>
                  <option value="art-card-300">Art Card 300 GSM (Industry Standard Commercial)</option>
                  <option value="art-paper-150">Art Paper 150 GSM Gloss (Brochures & Flyers)</option>
                  <option value="bleach-board-350">Bleached Sulphate Board 350 GSM (Cartons)</option>
                  <option value="kraft-card">Kraft Unbleached Board (Eco Organic Brown)</option>
                  <option value="offset-paper-80">Woodfree 80 GSM Paper (Office Forms)</option>
                </select>
              </div>

              {/* 3. Quantity Slider & Quick Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Production Volume (Quantity)
                  </label>
                  <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                    {quantity.toLocaleString()} Units
                  </span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="10000"
                  step="250"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex items-center gap-2 pt-1">
                  {[500, 1000, 2500, 5000, 10000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                        quantity === preset
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Color Mode & Finishing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Color Process
                  </label>
                  <select
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  >
                    <option value="cmyk-both">CMYK Full Color Front & Back (4/4)</option>
                    <option value="cmyk-single">CMYK Full Color Front Only (4/0)</option>
                    <option value="spot-mono">1-Color Monochrome / Spot PMS (1/0)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Protective Lamination
                  </label>
                  <select
                    value={lamination}
                    onChange={(e) => setLamination(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                  >
                    <option value="none">No Lamination (Natural Stock)</option>
                    <option value="matte">Matte Thermal Lamination (Satin)</option>
                    <option value="gloss">High Gloss Lamination (Shiny)</option>
                    <option value="velvet">Soft Touch Velvet Lamination</option>
                  </select>
                </div>
              </div>

              {/* Special Finishes Checkboxes */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold uppercase text-slate-300 tracking-wider block">
                  Specialty Finishing Treatments
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={foilStamping}
                      onChange={(e) => setFoilStamping(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-200">
                      Metallic Foil Stamping (Gold/Silver)
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dieCutting}
                      onChange={(e) => setDieCutting(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-200">
                      Custom Die-Cut / Creasing Rule
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Card: Instant Live Calculation Breakdown */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-[#070F1E] rounded-xl p-6 sm:p-7 border border-cyan-500/40 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                    LIVE ESTIMATION SUMMARY
                  </span>
                  {/* Currency switcher */}
                  <div className="inline-flex rounded-md p-0.5 bg-slate-800 border border-slate-700 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setCurrency('PKR')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                        currency === 'PKR' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      PKR (₨)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-2 py-0.5 rounded font-bold transition-colors cursor-pointer ${
                        currency === 'USD' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Big Total Cost display */}
                <div className="py-5 text-center">
                  <div className="text-xs text-slate-400 uppercase font-mono tracking-wider mb-1">
                    Estimated Base Quotation
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 font-heading">
                    {currency === 'PKR'
                      ? `PKR ${calculation.totalPKR.toLocaleString()}`
                      : `USD $${calculation.totalUSD.toLocaleString()}`}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono mt-1">
                    approx.{' '}
                    {currency === 'PKR'
                      ? `PKR ${calculation.perUnitPKR} / unit`
                      : `$${calculation.perUnitUSD} / unit`}
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs font-mono pt-3 border-t border-slate-800/80 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volume Run:</span>
                    <span className="font-semibold text-white">{quantity.toLocaleString()} Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Paper Substrate:</span>
                    <span className="font-semibold text-white truncate max-w-[200px]">{calculation.paperName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pre-Press CTP & Tooling:</span>
                    <span className="text-cyan-300">Included in Est.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Production Window:</span>
                    <span className="text-emerald-400 font-semibold">{calculation.turnaround}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-400/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Apply Estimate to RFQ Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEstimate}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedEstimate ? 'Copied!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppQuote}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp RFQ</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 text-center font-mono pt-1">
                  * Live non-binding benchmark. Formal quotes confirmed upon artwork and file audit.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: SMART PRE-PRESS & DIGITAL UNIT CONVERTER      */}
        {/* ==================================================== */}
        {activeTab === 'converter' && (
          <div className="bg-[#0B1528] rounded-2xl border border-cyan-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            {/* Left Controls: Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  INPUT DIMENSIONS & RESOLUTION
                </span>
                <span className="text-[11px] text-slate-400">CTP & Digital Geometry</span>
              </div>

              {/* Standard presets */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase text-slate-300 tracking-wider block">
                  Quick Standard Presets
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyPresetSize(210, 297, 'mm')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                  >
                    A4 Sheet (210×297 mm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetSize(297, 420, 'mm')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                  >
                    A3 Sheet (297×420 mm)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetSize(3.5, 2.0, 'in')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                  >
                    Business Card (3.5×2.0 in)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetSize(8.5, 11.0, 'in')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                  >
                    US Letter (8.5×11 in)
                  </button>
                </div>
              </div>

              {/* Unit Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                  Active Input Unit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mm', label: 'Millimeters (mm)' },
                    { id: 'in', label: 'Inches (in)' },
                    { id: 'px', label: 'Pixels (px)' },
                  ].map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setDimensionMode(u.id as any)}
                      className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                        dimensionMode === u.id
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Width & Height Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Width ({dimensionMode.toUpperCase()})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={widthVal}
                    onChange={(e) => setWidthVal(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Height ({dimensionMode.toUpperCase()})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={heightVal}
                    onChange={(e) => setHeightVal(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Resolution (DPI) & GSM Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Target Resolution
                  </label>
                  <select
                    value={dpi}
                    onChange={(e) => setDpi(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  >
                    <option value={300}>300 DPI (Offset & CTP High Res)</option>
                    <option value={150}>150 DPI (Large Format Banner)</option>
                    <option value={72}>72 DPI (Standard Web & Screen)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-slate-300 tracking-wider">
                    Paper Caliper (GSM)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={gsmVal}
                    onChange={(e) => setGsmVal(Math.max(50, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-slate-900 border border-slate-700 text-white font-mono outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Right Card: Instant Converted Matrix */}
            <div className="lg:col-span-6 bg-gradient-to-b from-slate-900 to-[#070F1E] rounded-xl p-6 sm:p-7 border border-cyan-500/40 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                  PRE-PRESS OUTPUT SPECIFICATIONS
                </span>
                <span className="text-xs font-mono text-slate-400">@ {dpi} DPI</span>
              </div>

              {/* Conversion Matrix Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    PHYSICAL METRIC
                  </div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {converted.mm.w} × {converted.mm.h} mm
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono">
                    ({(Number(converted.mm.w) / 10).toFixed(1)} × {(Number(converted.mm.h) / 10).toFixed(1)} cm)
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    IMPERIAL INCHES
                  </div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {converted.in.w}&quot; × {converted.in.h}&quot;
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Decimal format
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    CANVAS PIXELS ({dpi} DPI)
                  </div>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                    {converted.px.w.toLocaleString()} × {converted.px.h.toLocaleString()} px
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Total: {((converted.px.w * converted.px.h) / 1000000).toFixed(2)} MP
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                    FULL BLEED BOUNDARY (+3mm)
                  </div>
                  <div className="text-lg font-bold text-emerald-300 font-mono mt-0.5">
                    {converted.bleed.w} × {converted.bleed.h} mm
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    CTP Die & Trim Ready
                  </div>
                </div>
              </div>

              {/* Paper Thickness Caliper Estimation */}
              <div className="p-4 rounded-lg bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-cyan-300">
                  <span>PAPER WEIGHT & CALIPER ESTIMATE</span>
                  <span>{gsmVal} GSM</span>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span>Approx. Thickness:</span>
                  <span className="font-bold text-white">~{converted.paper.microns} µm (microns) / {converted.paper.points} pt</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const spec = `Pre-Press Geometry Spec: ${converted.mm.w} x ${converted.mm.h} mm (${converted.in.w}" x ${converted.in.h}") @ ${dpi} DPI [${converted.px.w}x${converted.px.h} px]. Full Bleed: ${converted.bleed.w} x ${converted.bleed.h} mm. Stock: ${gsmVal} GSM (~${converted.paper.microns} µm).`;
                    onApplyToQuote(spec, 'graphics-prepress');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors cursor-pointer"
                >
                  <span>Apply Pre-Press Dimensions to RFQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
