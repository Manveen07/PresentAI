# PresentAI — One Sentence to a Full Presentation

AI-powered presentation generator. Type a prompt, get a structured deck with narrative, layouts, and imagery. Drag-and-drop editor on top. Export to PDF / PPTX.

![demo](docs/demo.gif)

## Why
Most "AI slide" tools produce a wall of bullet points and call it a deck. PresentAI generates a real narrative arc — sections, transitions, layout variety — then lets you edit every block instead of regenerating the whole thing.

## How it works
Prompt → Gemini drafts outline + per-slide content → layout engine picks a template per slide → Pexels pulls relevant imagery → Zustand store hydrates the editor → user fine-tunes in drag-and-drop canvas → export.

## Where it fails
- Long prompts (>500 chars) sometimes truncate mid-section because the model context budget gets eaten by the JSON schema overhead.
- Image search returns nothing for niche topics (e.g. "L2 cache prefetch heuristics") so slides fall back to a gradient placeholder.
- Theme switching after content is generated occasionally desyncs nested component styles — known issue with the Zustand selector on `themeName`.

## Stack
Next.js 15, React 19 RC, TypeScript, Tailwind, shadcn/ui, Prisma + Postgres, Clerk auth, Google Gemini 2.0 Flash, Pexels API, Uploadcare, Lemon Squeezy subscriptions, Vercel hosting.

## Run locally
```bash
git clone https://github.com/Manveen07/PresentAI
cd PresentAI
npm install --legacy-peer-deps
cp .env.example .env          # fill in keys below
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required env vars
```
DATABASE_URL=                          # Postgres connection string
CLERK_SECRET_KEY=                      # from clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
GEMINI_API_KEY=                        # from aistudio.google.com/apikey
PEXELS_API_KEY=                        # from pexels.com/api
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=     # from uploadcare.com
LEMON_SQUEEZY_API_KEY=                 # from app.lemonsqueezy.com
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_VARIANT_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=          # 40-char hex, same value as in Lemon Squeezy webhook config
NEXT_PUBLIC_HOST_URL=http://localhost:3000
```

## What I'd do next
- Streaming generation — render slides as they come back from Gemini instead of waiting for the full deck.
- Eval harness for output quality: structured rubric on narrative flow, factuality, slide-density.
- Brand kit upload (logo, palette, font) → feed into layout engine so generated decks match the user's identity.
- Swap Gemini for a smaller fine-tuned model on slide-structure data to cut per-deck cost.
