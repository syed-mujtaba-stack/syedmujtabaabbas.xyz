import { neon } from '@neondatabase/serverless';

type ReviewPayload = {
  companyName?: string;
  personName?: string;
  role?: string;
  rating?: number;
  testimonial?: string;
};

type ReviewRecord = {
  id: number;
  company_name: string;
  person_name: string;
  position: string;
  rating: number;
  testimonial: string;
  approved: boolean;
  created_at: string;
};

const FALLBACK_REVIEWS = [
  {
    id: 'alpha-mind',
    companyName: 'AlphaMind AI',
    personName: 'Ayesha Raza',
    role: 'Operations Director',
    rating: 5,
    testimonial:
      'Syed Mujtaba transformed our client onboarding flow into a clean, AI-assisted experience that cut response time dramatically. The process felt premium, strategic, and highly measurable.',
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quantumbyte',
    companyName: 'QuantumByte Technologies',
    personName: 'Hassan Malik',
    role: 'Founder',
    rating: 5,
    testimonial:
      'He built the digital foundation for our brand with speed, clarity, and technical depth. Every interaction felt thoughtful, and the final product was ready for real growth.',
    approved: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'festive-occasions',
    companyName: 'Festive Occasions Dubai',
    personName: 'Fatima Ali',
    role: 'Marketing Lead',
    rating: 5,
    testimonial:
      'Working with Syed was straightforward, strategic, and incredibly detail-oriented. The website made our brand look serious, premium, and conversion-ready from the very first visit.',
    approved: true,
    createdAt: new Date().toISOString(),
  },
];

const getSql = () => {
  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  try {
    return neon(databaseUrl);
  } catch {
    return null;
  }
};

const parseBody = async (req: any) => {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
};

const normalizeReview = (review: Partial<ReviewRecord>) => ({
  id: review.id ?? new Date().getTime(),
  companyName: review.company_name ?? 'Client Company',
  personName: review.person_name ?? 'Client',
  role: review.position ?? 'Client',
  rating: Number(review.rating ?? 5),
  testimonial: review.testimonial ?? '',
  approved: Boolean(review.approved),
  createdAt: review.created_at ?? new Date().toISOString(),
});

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const sql = getSql();

  if (req.method === 'GET') {
    if (!sql) {
      return res.status(200).json({
        reviews: FALLBACK_REVIEWS,
        source: 'fallback',
      });
    }

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS client_reviews (
          id SERIAL PRIMARY KEY,
          company_name TEXT NOT NULL,
          person_name TEXT NOT NULL,
          position TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
          testimonial TEXT NOT NULL,
          approved BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      const rows = (await sql`
        SELECT id, company_name, person_name, position, rating, testimonial, approved, created_at
        FROM client_reviews
        WHERE approved = TRUE
        ORDER BY created_at DESC
        LIMIT 12
      `) as ReviewRecord[];

      return res.status(200).json({
        reviews: rows.map(normalizeReview),
        source: 'neon',
      });
    } catch {
      return res.status(200).json({
        reviews: FALLBACK_REVIEWS,
        source: 'fallback',
      });
    }
  }

  if (req.method === 'POST') {
    const body = (await parseBody(req)) as ReviewPayload;
    const companyName = String(body.companyName ?? '').trim();
    const personName = String(body.personName ?? '').trim();
    const role = String(body.role ?? '').trim();
    const testimonial = String(body.testimonial ?? '').trim();
    const rating = Number(body.rating ?? 5);

    if (!companyName || !personName || !role || !testimonial) {
      return res.status(400).json({
        message: 'Company name, person name, role, and testimonial are required.',
      });
    }

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    if (!sql) {
      return res.status(202).json({
        message: 'Review submitted successfully and is pending approval.',
        review: {
          companyName,
          personName,
          role,
          rating,
          testimonial,
          approved: false,
        },
      });
    }

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS client_reviews (
          id SERIAL PRIMARY KEY,
          company_name TEXT NOT NULL,
          person_name TEXT NOT NULL,
          position TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
          testimonial TEXT NOT NULL,
          approved BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      const rows = (await sql`
        INSERT INTO client_reviews (company_name, person_name, position, rating, testimonial, approved)
        VALUES (${companyName}, ${personName}, ${role}, ${Math.round(rating)}, ${testimonial}, FALSE)
        RETURNING id, company_name, person_name, position, rating, testimonial, approved, created_at
      `) as ReviewRecord[];

      const createdReview = rows[0] ? normalizeReview(rows[0]) : null;

      return res.status(201).json({
        message: 'Review submitted successfully and is pending approval.',
        review: createdReview,
      });
    } catch {
      return res.status(202).json({
        message: 'Review submitted successfully and is pending approval.',
        review: {
          companyName,
          personName,
          role,
          rating,
          testimonial,
          approved: false,
        },
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
