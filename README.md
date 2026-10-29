# CineDesk

**Every Production. One Workspace.**

CineDesk is a film production management application for independent filmmakers and production teams. Its frontend uses React, TypeScript, and Vite. An isolated demonstration workspace works without cloud credentials; the Supabase integration provides the foundation for authenticated organizations and production projects.

## Run locally

```sh
npm install
cp .env.example .env.local
npm run dev
```

Leave the Supabase variables blank to explore the demo. Demo content is fictional, saved only in the current browser, and does not represent secure cloud collaboration. Use `npm run build` to produce `dist/`.

## Source and documentation

- [Architecture](ARCHITECTURE.md)
- [Setup](SETUP.md)
- [Deployment](DEPLOYMENT.md)
- [Database](DATABASE.md)
- [Security](SECURITY.md)
- [Testing](TESTING.md)
- [Roadmap](ROADMAP.md)

Cloud deployment and backend checks require external account access. Consult the testing report for verified results and limitations. No license has been selected; do not assume permission to redistribute this code.

## Release status

This source package is a tested, buildable first implementation, **not a completed live SaaS release**. Project/scene/shot/schedule/crew/task/budget interactions currently use the isolated local demo. Supabase account and organization/project management are implemented separately; live service adapters exist for production records and private files but are not yet connected to the planning UI. Run the database security suite and browser tests before using private production data. Screenshots and a verified live URL are not available in this environment.
