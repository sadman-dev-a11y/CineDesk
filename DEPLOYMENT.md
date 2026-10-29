# Deployment

## GitHub

Use repository `CineDesk` in your own account. Inspect any existing repository before writing. Commit the source, lockfile, and migrations to `main`; exclude `.env.local`, node_modules, and generated credentials. Repository creation depends on available GitHub account tooling. A connected integration does not guarantee repository creation or administration permissions.

## Cloudflare Pages

1. Sign in to Cloudflare and create a Pages project connected to the CineDesk GitHub repository.
2. Select production branch `main`, build command `npm run build`, and output directory `dist`.
3. Add the public frontend Supabase URL and publishable key using the names in `.env.example`.
4. Deploy and copy the actual deployed URL into Supabase Auth's site URL and redirect allowlist.
5. Enable automatic production builds on pushes to `main` in the Pages Git integration.
6. Verify the homepage, direct SPA routes, demo operations, registration, email confirmation, password recovery, and cloud project persistence on the deployed origin.

Keep the SPA fallback rule in `public/_redirects` if provided by the frontend. Configure a restrictive Content Security Policy for the actual Supabase and asset origins once final origins are known. Never fabricate a live URL or describe a successful deployment before the hosting service confirms it.

## Optional public portfolio demo

A GitHub Pages deployment must contain only the public demo and fictional data. Use a Vite base path matching the repository and a GitHub Actions build/upload/deploy workflow. Disable cloud authentication forms in this variant. GitHub Pages is not the production SaaS hosting target.

## Account setup required

Cloudflare project authorization, Supabase project configuration, email delivery, and GitHub permissions must be supplied through the services' secure interfaces. No account setup or deployment is claimed by these instructions.

## Current account actions required

1. The GitHub destination is https://github.com/sadman-dev-a11y/CineDesk. Production branch: `main`.
2. In Cloudflare Pages, connect that repository, choose `main`, `npm run build`, and `dist`. The current environment has no Cloudflare connector or deployment credentials. Enable automatic production builds for main.
3. Create a Supabase project, apply the migration and tests, configure Site URL and allowed redirects, and provide the project URL and publishable/anon frontend key in Cloudflare build variables. Never provide a service-role key to Vite or commit secrets.
4. The GitHub Pages workflow runs on pushes to main and manual dispatch, and builds sample-data mode only. Configure Pages to use GitHub Actions before running it. Live SaaS hosting remains Cloudflare.
