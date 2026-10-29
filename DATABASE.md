# Database

Apply `supabase/migrations/202610300001_initial.sql` to a fresh Supabase project. It creates:

- profiles, organizations, organization_memberships
- projects, project_memberships
- scenes, shots, storyboard_assets
- shooting_days, scheduled_scenes
- crew, tasks, call_sheets
- budget_categories, expenses
- project_files, activities

All exposed tables have Row Level Security. Read access requires project membership or organization administration; editing production data requires a management role. Organization memberships have no browser mutation policy. Adding users and changing workspace roles requires a validated privileged server workflow that is not included in this first migration.

Create an organization with `supabase.rpc('create_organization', {name, description})`; it returns the organization UUID and atomically assigns the authenticated caller as owner. Insert a project using `organization_id`, `title`, and the desired fields. `created_by` defaults to the authenticated user; a trigger creates the creator's project membership. Project budget is `estimated_budget_cents`, an integer in the selected currency's minor units. Expense amounts use `amount_cents`. No exchange conversion is performed.

The private `production-files` bucket allows PDF, plaintext, JPEG, PNG, and WebP files up to 10 MiB. Insert authorized `project_files` metadata with a random storage path before uploading; remove metadata if upload fails. Retrieve short-lived signed URLs. Delete the object before its metadata so storage authorization can resolve the record. Production UI storage flows require live testing before release.

Schedule revisions are represented by the `revision` field; complete historical revision snapshots require a later migration. Activities are client-provided descriptions, not tamper-proof security audit records.
