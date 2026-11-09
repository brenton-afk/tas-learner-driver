# Tasmanian Road Rules — Learner Study

A free study app for the Tasmanian learner licence knowledge test: 80 practice questions across 7 topics, a 30-question mock test, Quick 10, Trouble spots (questions you've got wrong), a cheat sheet and hand-drawn road signs.

- Works on any phone. Add it to your home screen and it works offline after the first visit.
- No login, no tracking, no cookies, and nothing loaded from third parties. Progress is saved in your browser only, and you can back it up or move it with **Back up progress**.
- Study aid only, not an official test. The questions were checked against [Plates Plus](https://www.platesplus.tas.gov.au) and [Transport Services Tasmania](https://www.transport.tas.gov.au) in August 2026. Always confirm current rules there.

Built with Vite, React, TypeScript (strict), Tailwind CSS and `vite-plugin-pwa`. It's a static site hosted on Vercel.

## Run it locally

You need Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm test           # data and backup tests (Vitest)
npm run lint       # ESLint
npm run format     # Prettier
npm run build      # type-check and build to dist/
npm run preview    # serve the production build (service worker included)
```

## Add a question

Questions live in [`src/data/questions.ts`](src/data/questions.ts). Add an object to the `QUESTIONS` array, ideally next to the others in the same topic:

```ts
{
  id: 'speed-80',            // must be unique and must never change
  topic: 'speed',            // one of the topic IDs in TOPICS
  sign: 'speed60',           // optional, a key from src/signs/registry.ts
  question: 'You see this sign. What is the maximum speed?',
  options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
  answer: 1,                 // index of the correct option (0–3)
  explanation: 'The number in the red circle is the speed limit in km/h.',
},
```

Rules:

- **Never change or reuse an existing `id`.** Saved progress refers to questions by ID. For new questions, use the topic name followed by the next unused number.
- There must be exactly four options and one correct `answer`.
- To add a topic, add it to `TOPICS`, and add its ID to the `TopicId` type at the top of the file.
- To add a road sign, draw it as a component in `src/signs/svgs.tsx`, then register it in `src/signs/registry.ts` with a description of what it looks like (screen readers read this out, so describe what's visible, not what it means).

Then run `npm test`. The tests check that IDs are unique, every question has one valid answer, every topic has questions and every sign exists. One test checks the per-topic question counts from the original app, so update the numbers there when you add questions.

The cheat sheet is in [`src/data/cheatsheet.ts`](src/data/cheatsheet.ts). Wrap a number in `**double asterisks**` to highlight it.

## Deploy

The site is hosted on Vercel's free Hobby plan and connected to this GitHub repo, so **every push to `main` deploys automatically**. Vercel detects Vite on its own, so no `vercel.json` is needed.

To set it up from scratch:

```bash
npx vercel login
npx vercel link
npx vercel git connect
npx vercel --prod
```

If the production domain changes, update `SITE_URL` in [`vite.config.ts`](vite.config.ts). Link previews (iMessage, WhatsApp, Messenger) need the absolute URL of `public/og-image.png`.

When a new version is deployed, installed copies show **Update available, tap to refresh**.

To regenerate the icons and the link preview image after changing their artwork, run `node scripts/generate-images.mjs`.

## Progress format

Progress is stored in `localStorage` under the key `tas-learner-v1`:

```json
{ "seen": { "speed-0": 2 }, "correct": { "speed-0": true }, "wrong": ["giveway-12"], "big": 0 }
```

Backup codes are that JSON, compressed with `deflate-raw`, base64url encoded and prefixed with `TLD1.`. Imports are validated, then combined with the existing progress, so nothing is deleted.
