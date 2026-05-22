# Radius Filler

AI-powered appointment slot fill system for medical practices. When a same-day slot opens, staff trigger a one-click fill — the system identifies nearby patients via PostGIS radius scan, sends personalized Gemini-powered SMS outreach via Twilio, and locks the slot the moment a patient confirms.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Static HTML / CSS / JS — served via GitHub Pages |
| Database | Supabase (Postgres + RLS + Realtime) |
| Auth | Supabase Auth (email + password) |
| Edge Functions | Supabase Edge Functions (Deno) |
| SMS | Twilio Programmable Messaging |
| AI | Google Gemini (conversational agent) |
| Geo | PostGIS (`ST_DWithin` radius scan) |

No build step. No local tooling required. The LLM writes files, MCP pushes to GitHub, Pages serves immediately.

## Folder Structure

```
radius-filler/
├── app/                        # Static frontend (GitHub Pages source)
│   ├── index.html              # Receptionist dashboard
│   ├── patients.html           # Patient directory
│   ├── onboarding.html         # Admin onboarding (Alexandria staff only)
│   ├── style.css               # Shared stylesheet
│   └── app.js                  # Shared JS / Supabase client
├── supabase/
│   ├── functions/              # Edge Functions (Deno)
│   │   ├── trigger-slot-fill/  # Staff-triggered slot fill + Twilio broadcast
│   │   └── twilio-webhook/     # Inbound SMS handler + Gemini reply loop
│   └── migrations/             # SQL migrations — YYYYMMDD_NNN_description.sql
├── docs/                       # Internal documentation
├── .env.example                # Key stubs — never commit real values
├── .gitignore
└── README.md
```

## Deploying

1. Push to `main` — GitHub Pages auto-serves the `/app` folder.
2. Supabase Edge Functions deploy via the Supabase MCP or `supabase functions deploy`.
3. Secrets are set in the Supabase Vault — never in code.

## Environment Variables

See `.env.example` for the full key list. **Do not commit real values.**

| Variable | Used in | Notes |
|---|---|---|
| `SUPABASE_URL` | Frontend JS | Safe to expose — RLS enforces security |
| `SUPABASE_ANON_KEY` | Frontend JS | Safe to expose — anon key is public by design |
| `GEMINI_API_KEY` | Edge Functions only | Supabase Vault |
| `TWILIO_ACCOUNT_SID` | Edge Functions only | Supabase Vault |
| `TWILIO_AUTH_TOKEN` | Edge Functions only | Supabase Vault |
| `TWILIO_PHONE_NUMBER` | Edge Functions only | Supabase Vault |

## Branch & PR Conventions

- **Branch naming:** `feat/short-description`, `fix/short-description`, `schema/short-description`
- **Commit types:** `feat` | `fix` | `docs` | `schema` | `chore` | `refactor`
- **Flow:** branch → commit → push → PR → review → merge. No direct commits to `main` for features.
- **Migration files:** `YYYYMMDD_NNN_description.sql` — never edit once applied to production.
- **RLS:** required on every table. No exceptions.
- **Secrets:** API keys in Supabase Vault only. Never in GitHub.

## Issue Roadmap

| # | Title | Owner | Status |
|---|---|---|---|
| #1 | Bootstrap repo | André | ✅ Done |
| #2 | Patient directory schema | Eraj | Open |
| #3 | Practices / slots / conversations schema | Eraj | Open |
| #4 | Proximity scan (PostGIS) | André | Open |
| #5 | Gemini + Twilio Edge Functions | André | Open |
| #6 | Receptionist dashboard UI | André | Open |
| #7 | Admin onboarding flow | André | Open |
