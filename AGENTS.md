# DIVA Personalized Skin Treatment

- Work in this repository and feature branches; do not merge main or deploy without owner instructions.
- Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, npm, src/ and @/* alias.
- Reusable UI: src/components; data: src/data; types: src/types; helpers: src/lib.
- V2 prices are approved ONLY for internal demo. Keep prices server-only and gated by DIVA_INTERNAL_DEMO=true. Default hides prices; never send hidden prices to the browser.
- Preview binds loopback only. No domain, Nginx, PostgreSQL or existing service changes. Compose must bind 127.0.0.1:3100:3000.
- Never invent clinical protocols, outcomes, durations, session counts, products, benefits, testimonials or credentials. Keep unknowns null and proposed/pending labels.
- Use licensed illustrative images with attribution, never portray stock/AI as DIVA facilities, customers or results.
- Mobile-first editorial green/cream/champagne, keyboard access, reduced motion.
- Validate npm run lint, npx tsc --noEmit, npm run build and npm test. Test all slugs, twelve prices, mobile menu, disclosures, links and hidden-pricing mode.
- Contact links open conversations only. No sending messages, customer storage, payments or booking creation.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
