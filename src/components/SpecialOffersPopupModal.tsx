import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Gift,
  Copy,
  Check,
  Zap,
  ShieldCheck,
  Clock,
  Tag,
} from 'lucide-react';

export interface EngineeringOffer {
  id: string;
  badge: string;
  discountBadge: string;
  title: string;
  subtitle: string;
  priceUSD: string;
  originalUSD: string;
  pricePKR: string;
  originalPKR: string;
  highlightTag: string;
  promoCode: string;
  deliveryEstimate: string;
  description: string;
  includedItems: string[];
  freeBonus: string;
  featured?: boolean;
}

export const SPECIAL_OFFERS: EngineeringOffer[] = [
  {
    id: 'sanity-ecommerce-bundle',
    badge: 'MOST POPULAR',
    discountBadge: '57% OFF',
    title: 'Next.js 16 + Sanity CMS Full E-Commerce Store',
    subtitle: 'Complete Storefront, Sanity Studio & Admin Suite (Like QuantumByte)',
    priceUSD: '$149',
    originalUSD: '$350',
    pricePKR: 'Rs. 42,000',
    originalPKR: 'Rs. 95,000',
    highlightTag: 'Includes Free 30-Day Support + SEO Setup',
    promoCode: 'QUANTUM-149',
    deliveryEstimate: '10 – 14 Days Delivery',
    description:
      'Launch a blazing-fast hardware, fashion, luxury, or B2B e-commerce store powered by Next.js App Router and Sanity Headless CMS so you can manage products, stock, and prices in real time.',
    includedItems: [
      'Custom Next.js 16 Storefront (Dark/Light or Brand-Matched UI)',
      'Sanity CMS Studio with Products, Variants, Stock & Pricing Schemas',
      'Mobile-First Cart Drawer, Checkout & WhatsApp Order Routing',
      'Full Technical SEO, Sitemap, Open Graph & Vercel Edge Hosting',
    ],
    freeBonus: 'FREE Bonus: Custom Admin Order View + 1-on-1 Sanity CMS Training',
    featured: true,
  },
  {
    id: 'whatsapp-ai-agent-offer',
    badge: 'FASTEST ROI',
    discountBadge: '58% OFF',
    title: '24/7 Autonomous WhatsApp AI Agent + CRM Sync',
    subtitle: 'Automated Customer Support, Lead Qualification & Order Bot',
    priceUSD: '$99',
    originalUSD: '$240',
    pricePKR: 'Rs. 28,000',
    originalPKR: 'Rs. 65,000',
    highlightTag: 'Includes Free Google Sheets CRM Sync',
    promoCode: 'BOTFLOW-99',
    deliveryEstimate: '7 – 10 Days Delivery',
    description:
      'Turn your business WhatsApp into a 24/7 AI sales and support engine using the official Meta Cloud API and OpenAI / Gemini agents—trained on your own products and FAQs.',
    includedItems: [
      'Official Meta WhatsApp Cloud API Webhook + FastAPI Backend',
      'Custom AI Agent Trained on Your Products, FAQs & Pricing Rules',
      'Smart Human-Handoff Escalation for Complex Inquiries',
      'Conversation History & Lead Stage Tracking in Supabase/Postgres',
    ],
    freeBonus: 'FREE Bonus: Live Google Sheets Lead Export + 14-Day Prompt Tuning',
    featured: true,
  },
  {
    id: 'modern-business-web',
    badge: 'STARTER DEAL',
    discountBadge: '56% OFF',
    title: 'High-Converting Business Website + AI Chat Widget',
    subtitle: 'Modern Next.js Multi-Section Website with Smooth Animations',
    priceUSD: '$79',
    originalUSD: '$180',
    pricePKR: 'Rs. 22,000',
    originalPKR: 'Rs. 50,000',
    highlightTag: 'Fast 5-Day Delivery + Free Domain Setup',
    promoCode: 'WEB-LAUNCH-79',
    deliveryEstimate: '5 – 7 Days Delivery',
    description:
      'Perfect for agencies, startups, and service brands needing an ultra-clean, mobile-responsive Next.js website with custom animations, contact/WhatsApp capture, and an embedded AI assistant.',
    includedItems: [
      'Up to 6 Custom Responsive Sections with Smooth 60fps Animations',
      'Embedded AI Chat / FAQ Widget + Direct WhatsApp Lead Capture',
      'Speed Optimization (95+ Lighthouse Score) & On-Page SEO',
      'Free Deployment on Vercel / Custom Domain SSL Setup',
    ],
    freeBonus: 'FREE Bonus: 2 Weeks of Post-Launch Content & UI Tweaks',
  },
  {
    id: 'leadshunter-growth-pack',
    badge: 'B2B GROWTH',
    discountBadge: '57% OFF',
    title: 'Autonomous B2B LeadHunter Bot + Google Sheets Sync',
    subtitle: '24/7 Google Maps & Website Email Discovery Engine',
    priceUSD: '$69',
    originalUSD: '$160',
    pricePKR: 'Rs. 19,500',
    originalPKR: 'Rs. 45,000',
    highlightTag: 'Zero-Duplicate Verified B2B Leads',
    promoCode: 'LEADS-69',
    deliveryEstimate: '4 – 6 Days Delivery',
    description:
      'Automate your B2B outreach with a custom Playwright lead discovery agent that scrapes Google Maps by niche & city, crawls websites for verified emails, and syncs live to Google Sheets.',
    includedItems: [
      'Headless Playwright Scraper Configured for Your Target Niches & Cities',
      'Deep Multi-Page Website Crawler (/contact & /about Email Extractor)',
      'SQLite SHA-256 Deduplication (Zero Duplicate Rows)',
      'Automated OAuth2 Live Sync to Your Google Sheets CRM',
    ],
    freeBonus: 'FREE Bonus: Starter Sheet of 300 Pre-Verified B2B Leads in Your Niche',
  },
];

interface SpecialOffersPopupModalProps {
  open: boolean;
  onClose: () => void;
  onClaimOfferInForm: (offerTitle: string) => void;
}

export const SpecialOffersPopupModal: React.FC<SpecialOffersPopupModalProps> = ({
  open,
  onClose,
  onClaimOfferInForm,
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(SPECIAL_OFFERS[0].id);
  const [currency, setCurrency] = useState<'USD' | 'PKR'>('USD');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const activeOffer =
    SPECIAL_OFFERS.find((o) => o.id === selectedOfferId) || SPECIAL_OFFERS[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const displayPrice = (offer: EngineeringOffer) =>
    currency === 'USD' ? offer.priceUSD : offer.pricePKR;

  const displayOriginal = (offer: EngineeringOffer) =>
    currency === 'USD' ? offer.originalUSD : offer.originalPKR;

  const buildWhatsAppOfferUrl = (offer: EngineeringOffer) => {
    const text =
      `Hi Syed Mujtaba Abbas! I want to claim your special portfolio offer:\n` +
      `• Package: ${offer.title}\n` +
      `• Special Price: ${offer.priceUSD} (${offer.pricePKR}) [Was ${offer.originalUSD}]\n` +
      `• Promo Code: ${offer.promoCode}\n` +
      `• Bonus: ${offer.freeBonus}\n` +
      `Let's get started!`;
    return `https://wa.me/923460630802?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="offers-popup-title"
          className="fixed inset-0 z-[105] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-5xl rounded-2xl border border-white/15 bg-[#0A0A0E] shadow-[0_32px_90px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Top Header Bar with Currency Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#121218] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Gift className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      Limited-Time Startup &amp; Client Offers · Starting at $69
                    </span>
                  </div>
                  <h2
                    id="offers-popup-title"
                    className="font-display text-lg sm:text-xl font-bold text-white"
                  >
                    Special Engineering Packages &amp; Discounted Pricing
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Currency Toggle: USD ($) vs PKR (Rs.) */}
                <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#0B0B0F] p-1">
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`rounded-md px-2.5 py-1 font-mono-tech text-xs font-semibold transition-all cursor-pointer ${
                      currency === 'USD'
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('PKR')}
                    className={`rounded-md px-2.5 py-1 font-mono-tech text-xs font-semibold transition-all cursor-pointer ${
                      currency === 'PKR'
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    PKR (Rs.)
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close offers popup"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0B0B0F] text-zinc-400 hover:border-white/30 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Popup Content Grid */}
            <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
              {/* Left 5 Cols: Offer Selector Cards with Prices */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  <span>Select an Offer ({SPECIAL_OFFERS.length} Deals)</span>
                  <span className="text-emerald-400 font-mono-tech text-[11px]">
                    Up to 58% Off
                  </span>
                </div>

                {SPECIAL_OFFERS.map((offer) => {
                  const isSelected = offer.id === activeOffer.id;
                  return (
                    <button
                      key={offer.id}
                      type="button"
                      onClick={() => setSelectedOfferId(offer.id)}
                      className={`w-full rounded-xl p-4 text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-white/45 bg-[#17171F] shadow-lg'
                          : 'border-white/[0.08] bg-[#101015] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold ${
                              isSelected
                                ? 'bg-white text-black'
                                : 'border border-white/10 bg-[#181820] text-zinc-300'
                            }`}
                          >
                            {offer.badge}
                          </span>
                          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 font-mono-tech text-[10px] font-bold text-emerald-300">
                            {offer.discountBadge}
                          </span>
                        </div>

                        {/* Price Display on Selector Card */}
                        <div className="text-right">
                          <span className="text-[11px] text-zinc-500 line-through mr-1.5 font-mono-tech">
                            {displayOriginal(offer)}
                          </span>
                          <span className="font-display text-base sm:text-lg font-extrabold text-emerald-400">
                            {displayPrice(offer)}
                          </span>
                        </div>
                      </div>

                      <div className="font-display text-sm sm:text-base font-bold text-white">
                        {offer.title}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 line-clamp-1">
                        {offer.highlightTag}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right 7 Cols: Active Offer Deep-Dive, Price Box & Claim Actions */}
              <div className="lg:col-span-7 rounded-2xl border border-white/12 bg-[#0F0F15] p-6 sm:p-7 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
                  <div className="space-y-1.5 max-w-md">
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{activeOffer.highlightTag}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {activeOffer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {activeOffer.subtitle}
                    </p>
                  </div>

                  {/* Prominent Price Callout Card */}
                  <div className="rounded-2xl border border-emerald-500/35 bg-[#131918] px-4 py-3 text-right shrink-0">
                    <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono-tech text-emerald-300">
                      <Tag className="h-3 w-3" />
                      <span>{activeOffer.discountBadge} LAUNCH PRICE</span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-end gap-2">
                      <span className="text-xs text-zinc-500 line-through font-mono-tech">
                        {displayOriginal(activeOffer)}
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                        {displayPrice(activeOffer)}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5 font-mono-tech">
                      {currency === 'USD'
                        ? `Approx. ${activeOffer.pricePKR}`
                        : `Approx. ${activeOffer.priceUSD} USD`}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeOffer.description}
                </p>

                {/* Deliverables Checklist */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    What&apos;s Included in This {displayPrice(activeOffer)} Package
                  </div>
                  <ul className="space-y-2.5">
                    {activeOffer.includedItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Free Bonus + Promo Code Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-8 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3.5 flex items-start gap-2.5">
                    <Zap className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs font-medium text-emerald-200 leading-relaxed">
                      {activeOffer.freeBonus}
                    </div>
                  </div>

                  <div className="sm:col-span-4 rounded-xl border border-white/10 bg-[#15151D] p-3 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                        Code
                      </div>
                      <div className="font-mono-tech text-xs font-bold text-white">
                        {activeOffer.promoCode}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(activeOffer.promoCode)}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-[#0C0C10] px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 hover:border-white/35 hover:text-white cursor-pointer"
                    >
                      {copiedCode === activeOffer.promoCode ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Trust & Timeline Strip */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-white/[0.07] bg-[#14141B] p-3 flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-400">Delivery Time</div>
                      <div className="text-xs font-semibold text-white">
                        {activeOffer.deliveryEstimate}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-[#14141B] p-3 flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-400">Payment Terms</div>
                      <div className="text-xs font-semibold text-white">
                        50% Milestone Split
                      </div>
                    </div>
                  </div>
                </div>

                {/* Claim Buttons */}
                <div className="border-t border-white/[0.08] pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppOfferUrl(activeOffer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-black hover:bg-zinc-200 transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>
                      Claim for {displayPrice(activeOffer)} on WhatsApp
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      onClaimOfferInForm(
                        `${activeOffer.title} (${activeOffer.priceUSD} / ${activeOffer.pricePKR} — Code: ${activeOffer.promoCode})`
                      );
                      onClose();
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#171720] px-5 py-3 text-xs font-semibold text-white hover:border-white/35 transition-all cursor-pointer"
                  >
                    <span>Book via Email Brief</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
