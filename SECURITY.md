# Security model and release limitations

Only Supabase public URL and publishable/anon key may appear in the browser. Never commit service-role keys or use them in frontend code. Supabase RLS policies remain mandatory even if UI buttons are hidden.

Organization creation assigns the caller as owner in a security-definer transaction. Membership tables reject browser self-promotion. Security-definer helper functions use an empty search path and qualified object names. Project creation checks organization membership and role. Project child rows require membership in that production. Private object access requires an authorized metadata row.

Manager roles currently share broad project editing rights; fine-grained per-department rights are not implemented. No privileged invitation or role-management endpoint is provided. Profile avatar workflow, workspace logo management, storage metadata cleanup, and a tamper-resistant audit log need further implementation before production use.

The local demo is not an authentication boundary. Anyone with access to the browser can inspect its local records. Never enter real contact details, passwords, scripts, or confidential production data into the demo.

Before public production use, run live tenant isolation tests with two organizations and an anonymous client, review storage policies, configure authentication redirects, verify recovery/verification emails, review dependencies, and validate the deployed CSP. No live database security verification is claimed without external credentials.

Report security issues privately to the repository owner; do not publish credentials or exploit details in public issues.
