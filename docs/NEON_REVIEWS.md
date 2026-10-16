# Neon Reviews for the Portfolio

This portfolio includes a review submission section with a Neon Postgres-backed API route at `/api/reviews`.

## Environment Variables

Add the following values to your Vercel project or local `.env` file:

```bash
NEON_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
# Optional fallback if your project uses DATABASE_URL instead
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## How it works

- `GET /api/reviews` returns approved reviews only.
- `POST /api/reviews` accepts:
  - `companyName`
  - `personName`
  - `role`
  - `rating`
  - `testimonial`
- Submitted reviews are inserted into the `client_reviews` table and stored as `approved = FALSE` until moderated.

## Database schema

Use the SQL file here:

- [sql/neon-client-reviews.sql](../sql/neon-client-reviews.sql)

Or run this directly in the Neon SQL editor:

```sql
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
```

## Vercel setup

1. Create a Neon project and copy the connection string.
2. Open the Neon SQL editor and run the table creation SQL above.
3. Open your Vercel project dashboard.
4. Go to Settings > Environment Variables.
5. Add `NEON_DATABASE_URL` and select the production environment.
6. Redeploy the project.

The UI still works gracefully if the database is not configured yet, thanks to a built-in fallback review list.
