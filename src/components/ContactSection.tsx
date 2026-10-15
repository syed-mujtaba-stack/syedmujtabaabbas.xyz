import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ContactRippleBg } from './SectionBackgrounds';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const { contact, services } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(services[0].title);
  const [timezone, setTimezone] = useState('');
  const [message, setMessage] = useState('');
  const [submittedState, setSubmittedState] = useState<
    'idle' | 'sending' | 'sent' | 'error' | 'mailto-opened' | 'copied'
  >('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setTimezone(tz);
    } catch {
      // ignore
    }
  }, []);

  const buildComposedSubject = () =>
    `Project Inquiry: ${service} — from ${name || 'Prospective Client'}`;

  const buildComposedBody = () =>
    [
      `Hi Syed Mujtaba,`,
      ``,
      `I visited syedmujtabaabbas.xyz and would like to discuss a project.`,
      ``,
      `• Name: ${name || 'Not specified'}`,
      `• Email: ${email || 'Not specified'}`,
      `• Service Focus: ${service}`,
      `• Timezone: ${timezone || 'Not specified'}`,
      ``,
      `Project Details & Objectives:`,
      `${message || '(Please share project details)'}`,
      ``,
      `Best regards,`,
      `${name || ''}`,
    ].join('\n');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailJsEnv = (
      import.meta as ImportMeta & { env: Record<string, string | undefined> }
    ).env;
    const {
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_KEY,
    } = emailJsEnv;

    if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
      const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
        buildComposedSubject()
      )}&body=${encodeURIComponent(buildComposedBody())}`;
      window.location.href = mailtoUrl;
      setSubmittedState('mailto-opened');
      return;
    }

    setSubmittedState('sending');
    try {
      await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: contact.email,
          from_name: name,
          from_email: email,
          reply_to: email,
          service,
          timezone: timezone || 'Not specified',
          subject: buildComposedSubject(),
          message: buildComposedBody(),
        },
        { publicKey: VITE_EMAILJS_PUBLIC_KEY }
      );
      setSubmittedState('sent');
    } catch {
      setSubmittedState('error');
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${contact.email}\nSubject: ${buildComposedSubject()}\n\n${buildComposedBody()}`
      );
      setSubmittedState('copied');
      setTimeout(() => setSubmittedState('idle'), 4000);
    } catch {
      // ignore
    }
  };

  const handleCopyDirectEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleSendViaWhatsApp = () => {
    const text = `Hi Syed Mujtaba, I'm ${name || 'reaching out'} (${
      email || 'via your portfolio'
    }). I'd like to discuss ${service}: ${message || 'Let’s connect.'}`;
    window.open(
      `https://wa.me/923460630802?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-white/[0.07] bg-[#070709] py-24 sm:py-32 overflow-hidden"
    >
      {/* SECTION 8 UNIQUE BACKGROUND ANIMATION: Expanding Acoustic Gravity Ripples */}
      <ContactRippleBg />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="max-w-2xl space-y-3 mb-14">
          <span className="inline-block rounded-full border border-white/10 bg-[#121216] px-3.5 py-1 text-xs font-medium text-zinc-300">
            Get in Touch
          </span>
          <h2
            id="contact-heading"
            className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Have an idea{' '}
            <span className="text-platinum">worth building?</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            {contact.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0C0C0F]/92 p-4 backdrop-blur-xl">
              <img
                src="/portraits/mujtaba-founder-casual.png"
                alt="Syed Mujtaba Abbas"
                className="h-16 w-16 rounded-xl object-cover object-top border border-white/15 shrink-0"
              />
              <div>
                <div className="text-sm font-bold text-white">Syed Mujtaba Abbas</div>
                <div className="text-xs text-zinc-300 mt-0.5">
                  Available for Remote Engineering &amp; AI Consulting
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Typically responds within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/92 p-6 backdrop-blur-xl">
              <div className="text-xs text-zinc-400 mb-2">Direct Email</div>
              <a
                href={`mailto:${contact.email}?subject=Let%27s%20engineer%20something`}
                className="font-display text-lg sm:text-xl font-bold text-white hover:text-zinc-300 break-all transition-colors"
              >
                {contact.email}
              </a>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`mailto:${contact.email}?subject=Let%27s%20engineer%20something`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Open Email App</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyDirectEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#15151A] px-3.5 py-2 text-xs text-zinc-200 hover:border-white/35 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/92 p-6 backdrop-blur-xl">
              <div className="text-xs text-zinc-400 mb-2">WhatsApp &amp; Direct Line</div>
              <div className="font-display text-xl font-bold text-white">
                {contact.phone}
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Available for WhatsApp messaging or direct calls ({contact.locationText}).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-[#17171D] px-4 py-2 text-xs font-medium text-white hover:bg-white hover:text-black transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#121216] px-4 py-2 text-xs text-zinc-300 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/92 p-6 space-y-2.5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                <MapPin className="h-4 w-4 text-zinc-400" />
                <span>{contact.locationText}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-400">
                <Clock className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{contact.timezoneNote}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0C0C0F]/92 p-6 backdrop-blur-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Profiles &amp; Networks
              </div>
              <div className="divide-y divide-white/[0.07]">
                {contact.socials.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target={soc.url.startsWith('http') ? '_blank' : undefined}
                    rel={soc.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group py-3 flex items-center justify-between gap-4 hover:text-white transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                        {soc.label}{' '}
                        <span className="font-mono-tech text-xs font-normal text-zinc-400">
                          ({soc.handle})
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500">{soc.verifiedNote}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Clean Project Inquiry Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0C0C0F]/95 p-6 sm:p-9 backdrop-blur-xl">
            <div className="border-b border-white/[0.08] pb-4 mb-6">
              <h3 className="font-display text-2xl font-bold text-white">
                Send a Project Brief
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Sends your project brief directly to {contact.email}. WhatsApp is also available.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full rounded-xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Your Email *
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="inquiry-service"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Service Focus
                  </label>
                  <select
                    id="inquiry-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title} className="bg-[#0B0B0E] text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="Full-Stack & AI Advisory" className="bg-[#0B0B0E] text-white">
                      Full-Stack &amp; AI Advisory / Custom Scope
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-timezone"
                    className="block text-xs font-medium text-zinc-300 mb-1.5"
                  >
                    Timezone
                  </label>
                  <input
                    id="inquiry-timezone"
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="e.g. EST / UTC-5"
                    className="w-full rounded-xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-medium text-zinc-300 mb-1.5"
                >
                  Project Details *
                </label>
                <textarea
                  id="inquiry-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share what you're building, technical goals, and timeline..."
                  className="w-full rounded-xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submittedState === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-60"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submittedState === 'sending' ? 'Sending...' : 'Send via Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#15151A] px-5 py-3.5 text-xs font-medium text-white hover:border-white/35 cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111115] px-4 py-3.5 text-xs text-zinc-300 hover:border-white/25 hover:text-white cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Brief</span>
                </button>
              </div>

              {submittedState !== 'idle' && (
                <div
                  role="status"
                  className="mt-4 rounded-xl border border-white/15 bg-[#141419] p-4 text-xs text-zinc-200"
                >
                  {submittedState === 'sending'
                    ? 'Sending your project brief...'
                    : submittedState === 'sent'
                      ? `Your project brief was sent to ${contact.email}.`
                      : submittedState === 'error'
                        ? 'Email could not be sent. Please try again or contact me via WhatsApp.'
                        : submittedState === 'mailto-opened'
                          ? `EmailJS is not configured yet. Your email app was opened for ${contact.email}.`
                          : 'Formatted brief copied to clipboard!'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
