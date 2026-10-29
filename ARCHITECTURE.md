# Architecture

The browser application is a React/TypeScript SPA bundled by Vite. Static assets can run on Cloudflare Pages. Supabase supplies managed authentication, PostgreSQL, and private object storage; no server credential belongs in the frontend.

Two data paths are intentionally isolated: fictional browser-local demonstration records and authenticated Supabase organization/project records. Demo data must never be silently uploaded when a user signs in. Production tools that operate only in the demo are not shared cloud features.

The database owns authorization. Organization membership establishes workspace access; project membership grants access to a production. Owners and administrators can access organization projects. Producers, directors, assistant directors, cinematographers, and production managers assigned to a project may write production records. Crew and viewers can read assigned project records. More granular department permissions are future work.

Records for scenes, shots, shoot days, scheduled scenes, crew, tasks, expenses, documents, and call sheets reference a production. Composite foreign keys stop scenes, shots, scheduled scenes, and storyboard references from linking across productions. Currency values use integer minor units. Private storage checks the corresponding authorized document metadata.

Future Android clients can reuse the Supabase schema and domain models. No service worker should cache confidential production records without an explicit offline security design.

## Workflow research

Functional benchmarks reviewed from official sources: [StudioBinder shot lists](https://support.studiobinder.com/en/articles/1455273-how-to-populate-the-shot-list), [Celtx breakdown](https://support.celtx.com/hc/en-us/articles/216581678-Breakdown), [Celtx scheduling](https://support.celtx.com/hc/en-us/articles/360033780533-The-Schedule), [Yamdu](https://www.yamdu.com/), and [Shot Lister](https://www.shotlister.com/). Their linked planning workflows inform CineDesk’s project → scene → shot → shooting day relationships; their interfaces and artwork are not reproduced.

## Current implementation boundary

The planning interface uses the browser-local demo adapter exclusively. CloudPanel implements Supabase email auth, reset/update password, organization creation and project creation/stage updates/deletion. Production tools have a separate generic Supabase service layer, but are not yet wired to the cloud UI. Avatar/profile management, team invitation administration, cloud document UI, drag-and-drop scheduling, schedule revisions and storyboard uploads remain roadmap work. File service supports private uploads and short-lived signed URLs, but needs integration and live validation.
