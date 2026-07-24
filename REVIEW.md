# Qodo Review Guidelines

Welcome to the AI-Spark Bootcamp repository! When reviewing Pull Requests, please adhere to the following guidelines:

## Code Quality & Architecture
- **React Standards:** Ensure functional components are used with React Hooks. Avoid class components.
- **TypeScript:** Enforce strict type checking. Avoid the use of `any` type where possible. Interfaces should be used over types for object definitions.
- **Tailwind CSS:** Ensure utility classes are used for styling. Verify adherence to the "Nordic Lagom" design system (muted colors, minimal rounded corners, sharp UI).
- **Vite Optimizations:** Pay attention to chunking and lazy loading. Ensure heavy components are dynamically imported using `React.lazy()` and `Suspense`.

## Accessibility (a11y) & UX
- Verify that interactive elements (like buttons and custom divs) include proper `aria-label`, `role`, and `tabIndex` attributes.
- Ensure that `focus-visible` styles are correctly applied for keyboard navigation.

## Testing
- E2E Testing: Ensure Playwright tests cover new critical paths.
- Error Handling: Verify that API interactions (like OpenRouter) handle errors gracefully without crashing the UI or dumping raw JSON to the user.

## Domain Specifics
- The application includes embedded tools (n8n visualizer, API playgrounds). Ensure any changes to these do not break their iframe or layout constraints.
- Content changes in `src/data/bootcampData.ts` should adhere to the exact schema defined for modules and steps.
