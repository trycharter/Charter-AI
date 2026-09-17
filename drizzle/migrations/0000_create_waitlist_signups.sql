CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'landing-page',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX waitlist_signups_email_key ON public.waitlist_signups (lower(email));

GRANT INSERT ON public.waitlist_signups TO anon;
GRANT INSERT ON public.waitlist_signups TO authenticated;
GRANT ALL ON public.waitlist_signups TO service_role;

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(email) <= 255
    AND source = 'landing-page'
  );
