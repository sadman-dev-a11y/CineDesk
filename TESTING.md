# Testing

The owning implementation task records the actual frontend checks below or in its final release report. Documentation and schema presence alone do not establish a passing application release.

## Required frontend checks

Use the commands defined in package.json for TypeScript, linting, unit tests, and production builds. Exercise demo project CRUD, scene and shot editing, task completion, expense calculations, schedule creation, call-sheet generation, export, keyboard navigation, mobile layouts, and refresh persistence. Only report commands that were actually run and their observed result.

## Backend verification — unverified

No Supabase account credentials were supplied to this schema author. The migration has not been applied to a live database here. Authentication, email delivery, storage policy behavior, and tenant isolation are therefore unverified.

Run these tests in a disposable Supabase project before production use:

1. Create authenticated users A and B, each with an independent organization through `create_organization`.
2. Create projects/scenes/shots for each organization. Verify each client only selects its own authorized rows.
3. Attempt direct project ID reads, child inserts referencing the other project, cross-project schedule/storyboard references, updates, deletes, and file retrieval across organizations. Assert denial or zero affected rows.
4. As a viewer, verify reads work and insert/update/delete fail. Attempt self-promotion in both membership tables; assert rejection.
5. With an anonymous client, assert all private application data and objects are inaccessible.
6. Upload an allowed file, reject oversized/disallowed MIME types, and verify an unauthorized client cannot download the object or create a signed URL.
7. Verify registration, email confirmation, login, logout, recovery redirects, organization creation, project persistence after logout/login, and account separation on the deployed origin.

Do not mark these checks passed until executed against the configured backend.

An executable pgTAP suite is provided at `supabase/tests/tenant_isolation.sql`. Run `supabase test db` after applying migrations to a disposable local Supabase stack. It rolls back fixtures and covers two organizations, cross-tenant scene access, membership enrollment, self-promotion, and viewer write denial. It has not been executed in this environment because no Supabase/PostgreSQL instance is available. Storage and email tests still require the separate manual/integration checks above.

## Recorded checks, 30 October 2026

- Dependency installation succeeded.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 7 tests passed (integer cents, CSV escaping/formula protection, Fountain headings, slot conflicts, and demo relationships).
- Browser end-to-end testing attempted; Chromium installation returned a truncated/invalid archive. Browser assertions did not run. No actual application screenshots have been produced.
- Supabase auth, private storage, and tenant SQL tests are unverified without a configured backend.
- GitHub `sadman-dev-a11y/CineDesk` lookup returned 404. Repo creation is not an exposed connector operation.
- Cloudflare authorization and Supabase environment values are unavailable. No deployment URL exists.
- Final `npm run build`: passed (Vite production bundle generated in dist).
- Final lint, strict TypeScript and seven unit tests: passed.
- E2E assertions: blocked at browser launch because Chromium is unavailable; two tests could not execute. These are not passing browser tests.
