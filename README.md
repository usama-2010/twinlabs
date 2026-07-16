# TwinLabs

Custom software development for UK small businesses. A Next.js marketing site for TwinLabs — built with a focus on authentic copy, restrained design, and production readiness.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (subtle scroll animations)
- **Lucide React** (icons)
- **Zod** (form validation)
- **Resend** (contact form emails)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file for contact form email delivery:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=info@twinlabs.co.uk
```

Without `RESEND_API_KEY`, the contact form still works locally — submissions are logged to the server console.

## Project structure

```
src/
├── app/                  # Pages and API routes
│   ├── page.tsx          # Landing page
│   ├── work/             # Case study pages
│   └── api/contact/      # Contact form handler
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Landing page sections
│   ├── ui/               # Reusable UI components
│   └── visuals/          # SVG compositions
└── lib/content/          # All site copy and data
```

Content lives in `src/lib/content/` — edit copy there without touching components.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` (optional, defaults to info@twinlabs.co.uk)
4. Deploy

Vercel auto-detects Next.js. No extra configuration needed.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Licence

Private — © 2026 Twinlabs Ltd. All rights reserved.
