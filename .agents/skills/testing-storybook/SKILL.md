# Testing the Design System Storybook

## Overview
This skill covers how to test the multi-brand Design System locally via Storybook.

## Prerequisites
- Node.js 20+
- pnpm (check with `pnpm --version`)

## Devin Secrets Needed
No secrets required for local Storybook testing.
Figma-related scripts may need: `FIGMA_API_TOKEN`, `FIGMA_KEY`, `FIGMA_TOKEN`.

## Setup
1. Install dependencies: `pnpm install` from repo root
2. Build tokens first: `pnpm build:tokens` (required before Storybook can render components correctly)
3. Start Storybook: `pnpm storybook` (runs on port 6006)
   - This command builds tokens automatically before starting the dev server
   - Wait ~10-15 seconds for Storybook to fully start

## Testing Brand Switching
1. Open `http://localhost:6006` in the browser
2. The brand selector is in the Storybook toolbar (paintbrush icon area, shows current brand name)
3. Click the brand selector dropdown to toggle between:
   - **Brand A (Indigo)** — primary color is purple/indigo (#6366f1)
   - **Brand B (Rose)** — primary color is pink/rose (#f43f5e)
4. Verify color changes on:
   - Button Primary story: background color should change
   - Input: focus ring color should change
   - Card: footer button colors should change
   - Badge: default variant may not change (uses neutral), but the overall page theme shifts

## Testing Component Tokens
Component tokens are CSS custom properties like `--ds-component-button-border-radius`.
- Verify they exist in `packages/tokens/dist/base.css`
- Verify component CSS modules reference `var(--ds-component-*)` instead of hardcoded values
- Use shell: `rg 'component-button' packages/tokens/dist/base.css` to confirm token output
- Use shell: `rg 'component-button' packages/ui/src/components/Button/Button.module.css` to confirm usage

## Testing Documentation Pages
Four MDX docs pages exist under Storybook sidebar:
- **Getting Started > Introduction**: Architecture overview, token layers
- **Foundations > Tokens**: Primitives, semantic, component token reference tables
- **Foundations > Theming**: Brand comparison, ThemeProvider API docs
- **Foundations > Figma Structure**: Figma page tree, variable collections

## Build Verification
```bash
pnpm build:tokens   # Compile Style Dictionary tokens
pnpm build          # Build all packages (tsc)
pnpm typecheck      # TypeScript check across monorepo
pnpm build-storybook # Static Storybook build
```

## Known Issues / Tips
- Storybook may show version mismatch warnings for `@storybook/addon-essentials` and `@storybook/test` — these are non-blocking.
- The `browser_console` tool may not work reliably with Storybook due to iframe isolation. Use shell commands (`rg`) to verify token usage in CSS files instead.
- The Storybook preview iframe has its own document — `data-brand` attribute is set on the iframe's `<html>` element, not the parent page.
- If tokens are not loading in Storybook, ensure `pnpm build:tokens` was run first (the `pnpm storybook` script does this automatically).
