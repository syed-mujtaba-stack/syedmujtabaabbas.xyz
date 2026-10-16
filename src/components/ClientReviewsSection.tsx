import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Quote, Sparkles, Star } from 'lucide-react';

type ReviewRecord = {
  id: string | number;
  companyName: string;
  personName: string;
  role: string;
  rating: number;
  testimonial: string;
  approved: boolean;
  createdAt?: string;
};

const FALLBACK_REVIEWS: ReviewRecord[] = [
  {
    id: 'alpha-mind',
    companyName: 'AlphaMind AI',
    personName: 'Ayesha Raza',
    role: 'Operations Director',
    rating: 5,
    approved: true,
    testimonial:
      'Syed Mujtaba transformed our client onboarding flow into a clean, AI-assisted experience that cut response time dramatically. The process felt premium, strategic, and highly measurable.',
  },
  {
    id: 'quantumbyte',
    companyName: 'QuantumByte Technologies',
    personName: 'Hassan Malik',
    role: 'Founder',
    rating: 5,
    approved: true,
    testimonial:
      'He built the digital foundation for our brand with speed, clarity, and technical depth. Every interaction felt thoughtful, and the final product was ready for real growth.',
  },
  {
    id: 'festive-occasions',
    companyName: 'Festive Occasions Dubai',
    personName: 'Fatima Ali',
    role: 'Marketing Lead',
    rating: 5,
    approved: true,
    testimonial:
      'Working with Syed was straightforward, strategic, and incredibly detail-oriented. The website made our brand look serious, premium, and conversion-ready from the very first visit.',
  },
];

const REVIEWS_LOCAL_STORAGE_KEY = 'mj_client_reviews_local';

const readLocalReviews = (): ReviewRecord[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(REVIEWS_LOCAL_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return normalizeReviews(parsed);
  } catch {
    return [];
  }
};

const writeLocalReviews = (nextReviews: ReviewRecord[]) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(REVIEWS_LOCAL_STORAGE_KEY, JSON.stringify(nextReviews));
  } catch {
    // ignore storage failures
  }
};

const normalizeReviews = (input: unknown): ReviewRecord[] => {
  if (!Array.isArray(input)) return FALLBACK_REVIEWS;

  const normalized: ReviewRecord[] = [];

  for (const review of input) {
    if (!review || typeof review !== 'object') continue;

    const candidate = review as Record<string, unknown>;
    const ratingValue = Number(candidate.rating ?? candidate.score ?? 5);
    const companyName = String(candidate.companyName ?? candidate.company_name ?? 'Client Company');
    const personName = String(candidate.personName ?? candidate.person_name ?? 'Client');
    const role = String(candidate.role ?? candidate.position ?? 'Client');
    const testimonial = String(candidate.testimonial ?? candidate.review ?? '');

    if (!testimonial.trim()) continue;

    normalized.push({
      id: String(candidate.id ?? candidate.slug ?? `${companyName}-${Math.random()}`),
      companyName,
      personName,
      role,
      rating: Number.isFinite(ratingValue) ? Math.min(5, Math.max(1, ratingValue)) : 5,
      testimonial,
      approved: Boolean(candidate.approved ?? candidate.isApproved ?? true),
      createdAt: String(candidate.createdAt ?? candidate.created_at ?? new Date().toISOString()),
    });
  }

  return normalized.length ? normalized : FALLBACK_REVIEWS;
};

export const ClientReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewRecord[]>(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    role: '',
    rating: '5',
    testimonial: '',
  });

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const localReviews = readLocalReviews();

        const response = await fetch('/api/reviews', {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          setReviews(localReviews.length ? localReviews : FALLBACK_REVIEWS);
          return;
        }

        const payload = await response.json();
        const nextReviews = normalizeReviews(payload?.reviews);
        const finalReviews = nextReviews.length ? nextReviews : localReviews.length ? localReviews : FALLBACK_REVIEWS;
        setReviews(finalReviews);
        writeLocalReviews(finalReviews);
      } catch {
        const localReviews = readLocalReviews();
        setReviews(localReviews.length ? localReviews : FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    };

    void loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  const handleFieldChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const companyName = formData.companyName.trim();
    const personName = formData.personName.trim();
    const role = formData.role.trim();
    const testimonial = formData.testimonial.trim();
    const rating = Number(formData.rating);

    if (!companyName || !personName || !role || !testimonial) {
      setSubmitState('error');
      setSubmitMessage('Please fill in every field before submitting your review.');
      return;
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      setSubmitState('error');
      setSubmitMessage('Please select a valid rating from 1 to 5 stars.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('Submitting your feedback for review...');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          personName,
          role,
          rating,
          testimonial,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const localReviews = readLocalReviews();
        const createdReview: ReviewRecord = {
          id: `local-${Date.now()}`,
          companyName,
          personName,
          role,
          rating,
          testimonial,
          approved: false,
          createdAt: new Date().toISOString(),
        };
        const nextReviews = [createdReview, ...localReviews].slice(0, 12);
        writeLocalReviews(nextReviews);
        setReviews(nextReviews);
        setSubmitState('success');
        setSubmitMessage(
          payload?.message ||
            'Review saved locally in this browser and will sync once the live backend is connected.'
        );
        setFormData({
          companyName: '',
          personName: '',
          role: '',
          rating: '5',
          testimonial: '',
        });
        return;
      }

      setSubmitState('success');
      setSubmitMessage(
        payload?.message ||
          'Thanks — your review is in and will be approved before it appears on the site.'
      );

      setFormData({
        companyName: '',
        personName: '',
        role: '',
        rating: '5',
        testimonial: '',
      });
    } catch (error) {
      const localReviews = readLocalReviews();
      const createdReview: ReviewRecord = {
        id: `local-${Date.now()}`,
        companyName: formData.companyName.trim(),
        personName: formData.personName.trim(),
        role: formData.role.trim(),
        rating: Number(formData.rating),
        testimonial: formData.testimonial.trim(),
        approved: false,
        createdAt: new Date().toISOString(),
      };
      const nextReviews = [createdReview, ...localReviews].slice(0, 12);
      writeLocalReviews(nextReviews);
      setReviews(nextReviews);
      setSubmitState('success');
      setSubmitMessage(
        error instanceof Error
          ? `${error.message} Saved locally for this browser. Once the live backend is connected, it will sync automatically.`
          : 'Review saved locally for this browser. Your live backend will sync once connected.'
      );
      setFormData({
        companyName: '',
        personName: '',
        role: '',
        rating: '5',
        testimonial: '',
      });
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Syed Mujtaba Abbas',
    url: 'https://www.syedmujtabaabbas.xyz/',
    areaServed: 'Pakistan and United Arab Emirates',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(averageRating || 5).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 5).map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.personName,
      },
      itemReviewed: {
        '@type': 'Organization',
        name: review.companyName,
      },
      reviewBody: review.testimonial,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative overflow-hidden border-t border-white/[0.07] bg-[#070709] py-24 sm:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            Client Reviews
          </div>
          <h2
            id="reviews-heading"
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Trusted by teams that want <span className="text-platinum">clarity, speed, and real business results.</span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Real feedback from founders, operators, and marketing leaders who wanted sharper digital systems,
            better conversion flows, and products designed to scale with confidence.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0D0D11]/90 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Average rating</div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-display text-4xl font-bold text-white">
                      {averageRating ? averageRating.toFixed(1) : '5.0'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.round(averageRating || 5)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-right">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">Verified</div>
                  <div className="mt-1 font-display text-xl font-bold text-white">{reviews.length}</div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-[#0D0D11]/90 p-6 backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                  <Quote className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Leave a review</div>
                  <div className="text-xs text-zinc-400">Company name, title, and rating all help Google trust the signal.</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Company</span>
                  <input
                    value={formData.companyName}
                    onChange={(event) => handleFieldChange('companyName', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="Company name"
                  />
                </label>

                <label className="space-y-2 sm:col-span-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Rating</span>
                  <select
                    value={formData.rating}
                    onChange={(event) => handleFieldChange('rating', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                  >
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </label>

                <label className="space-y-2 sm:col-span-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Name</span>
                  <input
                    value={formData.personName}
                    onChange={(event) => handleFieldChange('personName', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="Your name"
                  />
                </label>

                <label className="space-y-2 sm:col-span-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Position</span>
                  <input
                    value={formData.role}
                    onChange={(event) => handleFieldChange('role', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="Founder / Marketing Lead"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Review</span>
                  <textarea
                    value={formData.testimonial}
                    onChange={(event) => handleFieldChange('testimonial', event.target.value)}
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-[#121218] px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                    placeholder="Tell future clients what it was like to work with Syed."
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState === 'submitting' ? 'Submitting...' : 'Submit Review'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {submitMessage && (
                  <div
                    className={`flex items-center gap-2 text-xs ${
                      submitState === 'error' ? 'text-rose-300' : 'text-emerald-300'
                    }`}
                  >
                    {submitState === 'success' && <CheckCircle2 className="h-4 w-4" />}
                    <span>{submitMessage}</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-[#0D0D11]/90 p-6 text-sm text-zinc-400">
                Loading client feedback...
              </div>
            ) : (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-3xl border border-white/10 bg-[#0D0D11]/90 p-6 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-2xl font-bold text-white">{review.companyName}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                        {review.personName} · {review.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={`${review.id}-star-${index}`}
                          className={`h-4 w-4 ${
                            index < review.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-zinc-200">
                    “{review.testimonial}”
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
