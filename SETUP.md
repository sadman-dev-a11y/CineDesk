# Setup

1. Install a current supported Node.js LTS release and npm.
2. Open this directory in your editor and run `npm install`.
3. Copy `.env.example` to `.env.local`; never commit `.env.local`.
4. Run `npm run dev` and open the URL printed by Vite.
5. Select the demo to explore fictional production data.

For cloud functionality, create a Supabase project. Apply `supabase/migrations/202610300001_initial.sql` in a new project's SQL editor or through the Supabase CLI. Set the frontend URL and publishable/anon key in `.env.local` using the names in `.env.example`. A publishable key identifies the project; Row Level Security provides access control. Never enter a service-role key.

Enable email verification in Supabase Auth. Set the site URL and allowlisted redirect URLs to your actual local and deployed origins. Create and verify an account, then create an organization and a project. Keep demo data separate.

The migration is for a fresh project. Review and back up existing databases before applying migrations. Live auth, email delivery, storage, and database policies require verification against your configured Supabase instance.
