CREATE TABLE IF NOT EXISTS client_reviews (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  person_name TEXT NOT NULL,
  position TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  testimonial TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_reviews_approved_created_at
  ON client_reviews (approved, created_at DESC);

-- Optional sample data for local verification:
-- INSERT INTO client_reviews (company_name, person_name, position, rating, testimonial, approved)
-- VALUES (
--   'AlphaMind AI',
--   'Ayesha Raza',
--   'Operations Director',
--   5,
--   'Syed Mujtaba transformed our onboarding flow and made the process feel premium, fast, and strategic.',
--   TRUE
-- );
