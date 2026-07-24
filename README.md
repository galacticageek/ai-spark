<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# AI-Spark

This repository contains the source code for the AI-Spark Bootcamp application.

## Quick Start

**Prerequisites:** [Node.js](https://nodejs.org/) & [Bun](https://bun.sh/)

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Configure Environment:**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.

3. **Run the app locally:**
   ```bash
   bun run dev
   ```

## Production

To build the application for production, run:
```bash
bun run build
```

To preview the built application locally:
```bash
bun run preview
```

## Testing
End-to-End testing is configured via Playwright.

```bash
bunx playwright test
```
