# Harshita Jamadade — Portfolio

Personal portfolio website built with React + TypeScript. Features a bilingual EN/DE toggle, an AI chatbot powered by Groq (Llama 3), and a dark grid aesthetic.

**Live:** [jamadade-harshita-github-io-kezf.vercel.app](https://jamadade-harshita-github-io-kezf.vercel.app)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, SCSS, Material UI 5 |
| AI Chatbot | Groq API (Llama 3.1 8B) via Vercel serverless function |
| i18n | Custom React context with EN/DE translations |
| Hosting | Vercel — auto-deploys on every push to `main` |

---

## Local Development

```bash
npm install
npm start        # http://localhost:3000
```

> The chatbot won't work locally unless you add a `GROQ_API_KEY` to a `.env` file and run via `vercel dev`.

---

## Deployment

Push to `main` — Vercel picks it up automatically. No manual steps needed.

**Required environment variable in Vercel:**
```
GROQ_API_KEY=your_groq_key_here
```
Set it in **Vercel → Project → Settings → Environment Variables**, then redeploy.

---

## Project Structure

```
src/
  components/       # One file per section
  assets/
    styles/         # One .scss file per component
    images/         # Architecture diagrams, profile photo, logos
  i18n/
    translations.ts # All EN + DE strings keyed by slug
    LangContext.ts  # useLang() hook — t('key') returns the right language string
api/
  chat.js           # Vercel serverless function — proxies Groq, keeps API key server-side
```

---

## How the Chatbot Works

`api/chat.js` contains a hardcoded `SYSTEM_PROMPT` with Harshita's full background: experience, projects, skills, hobbies, recruiter FAQ (visa, salary, availability, relocation). Groq runs Llama 3.1 8B to answer anything naturally.

To update what the bot knows → edit `SYSTEM_PROMPT` in `api/chat.js`.

---

## How i18n Works

`lang` state (`'EN' | 'DE'`) lives in `App.tsx` and is provided via `LangContext`. Every component calls `useLang()` to get `t('key')` which returns the translated string. All strings are in `src/i18n/translations.ts`.

To add a new translated string:
1. Add the key + English value to `translations.EN`
2. Add the key + German value to `translations.DE`
3. Use `t('your_key')` in the component

---

## Adding Content

**New project:** add an entry to `projectsMeta` in `Project.tsx` + translation keys in `translations.ts`

**New timeline entry:** same pattern in `Timeline.tsx` + `translations.ts`

**Update bot knowledge:** edit `SYSTEM_PROMPT` in `api/chat.js`

---

*made with cold americanos and good playlists ☕*
