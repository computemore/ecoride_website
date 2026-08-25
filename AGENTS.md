# AGENTS.md

## Purpose and precedence

These instructions apply to every coding agent working in `ecoride_website`, the public Ecoride Next.js App Router website.

Do not begin implementation immediately.

First inspect at least two comparable files or features already present in the repository. Use them as the primary reference for file structure, naming, TypeScript syntax, dependency boundaries, component composition, styling, testing, metadata, and error handling.

Repository conventions take precedence over generic Next.js or React conventions unless they introduce a correctness, security, or maintainability problem. When deviating from an existing pattern, explain the reason.

## Discover the repository before editing

Before making changes:

1. Read `README.md`, this file, `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `tailwind.config.ts`, `API_INTEGRATION_GUIDE.md`, `REACT_DEV_GUIDE.md`, and relevant documentation.
2. Read `design-system.md` and `design-changes.md`, then inspect `src/styles/variables.css`, typography/global CSS, Tailwind configuration, shared UI, layouts, and icon conventions.
3. Inspect at least two comparable routes, page views, components, services, types, or utilities.
4. Identify existing App Router, Server/Client Component, data-fetching, metadata, validation, state, naming, accessibility, SEO, and error-handling patterns.
5. Search for reusable components, layouts, icons, services, utilities, config, and shared types before creating new ones.
6. Inspect function and method syntax, filenames, exported interfaces/types and implementations, component structure, styling, separation of concerns, and architectural patterns.
7. Do not introduce a new architecture, state library, component system, styling system, HTTP client, or routing pattern when an established equivalent exists.

The intended separation is:

`src/app route entry and metadata -> src/page-views/layouts/components -> services/state/config/utils -> external APIs`

Keep route files focused on App Router concerns. Reusable route views belong in `src/page-views`, shared shells in `src/layouts`, and reusable UI in `src/components`, following comparable code.

## Scope control

Keep changes limited to the requested task.

Do not:

- Refactor unrelated code, reformat entire files, or rename public exports/routes without approval.
- Move the app to the Pages Router or place reusable route views under `src/pages`.
- Upgrade dependencies or framework/runtime constraints unless required.
- Replace Tailwind, the existing CSS/token system, MUI/Emotion, or another library without justification.
- Change authentication, payments, API contracts, deployment, DNS, redirects, or environment policy unless explicitly required.
- Modify generated output such as `.next/`, `next-env.d.ts`, or `tsconfig.tsbuildinfo`.
- Touch `.env`, private design source, historical screenshots, or unrelated public assets.

## Next.js, React, and architecture rules

- Follow the existing App Router conventions for layouts, pages, route handlers, metadata, loading, error, not-found, robots, and sitemap behaviour.
- Prefer Server Components. Add `"use client"` only when browser APIs, state, effects, event handlers, or client-only libraries require it; keep the client boundary as narrow as practical.
- Keep secrets, privileged operations, and private environment variables on the server. Only variables intentionally prefixed and documented for browser exposure may enter client bundles.
- Preserve SEO: typed metadata, canonical behaviour, JSON-LD, semantic headings, image metadata, robots, and sitemap conventions.
- Do not use `useEffect` for values that can be derived while rendering. Clean up listeners, timers, subscriptions, observers, and animation frames.
- Use stable domain keys for lists; do not use indexes when item identity can change.
- Avoid duplicating server state in multiple local stores. Follow the established form and validation approach.
- UI components must not contain persistence or privileged infrastructure logic.
- Keep API access in existing services and map failures to stable UI states.
- Do not create an interface for every object or class. Add abstractions where they support a real boundary, testing, multiple implementations, or an established convention.

## TypeScript rules

`tsconfig.json` enables strict mode; keep it enabled.

- Avoid `any`, unsafe assertions, unchecked nulls, unjustified non-null assertions, and duplicated API response types.
- Prefer typed DTOs, discriminated unions, schema validation at untrusted boundaries, and explicit return types for exported non-component functions.
- Reuse shared domain and navigation/SEO types from `src/types` where appropriate.
- Do not suppress TypeScript or ESLint errors without a narrow, documented reason.
- Treat data from HTTP, environment variables, search params, storage, and third-party scripts as untrusted until validated.

## Design system and accessibility

`design-system.md` is authoritative for visual and interaction work. Before modifying UI, also inspect `src/styles/variables.css`, `src/styles/typography.css`, shared UI/widget components, layouts, Tailwind theme values, and the icon barrels.

Use existing tokens and components for colour, typography, spacing, radius, elevation, breakpoints, motion, icons, and surface variants. Do not introduce arbitrary colours, font sizes, padding, shadows, radii, breakpoints, or component variants when an existing token/component applies. If existing code contains a one-off literal, do not treat that alone as permission to multiply it; prefer the documented system.

UI changes must preserve:

- Semantic HTML instead of generic containers.
- Logical headings and landmarks.
- Keyboard navigation and visible focus states.
- Screen-reader labels and useful alternative text.
- Colour contrast and reduced-motion behaviour.
- Associated form labels and clear validation/error messages.
- Adequate pointer/touch targets.
- Responsive behaviour at documented breakpoints.

## APIs and cross-repository contracts

This website is interconnected with the sibling `ecoride` .NET backend, `ecoride_rider`, `ecoride_driver`, and `ecoride_admin`.

Treat request/response models, route names, auth headers, enum values, trip/pricing/payment states, notifications, location payloads, pagination, errors, and date/time formats as shared compatibility boundaries.

Before changing a contract:

1. Search all sibling repositories for producers and consumers.
2. Determine backward compatibility and mixed-deployment impact.
3. Update all affected clients, models, tests, and documentation within the authorized scope.
4. Do not silently rename/remove fields or change casing, nullability, enum values, or error structure.
5. Document companion changes required outside this repository.

Never trust client-supplied IDs, roles, prices, permissions, trip states, or payment states as authoritative. UI hiding is not authorization.

## Security, privacy, configuration, and logging

Authentication, payments, passenger/driver data, trip locations, and account operations are security-sensitive.

- Never hard-code or commit secrets, credentials, tokens, production `.env` values, or unrestricted API keys.
- Never disable TLS validation or bypass authorization.
- Do not expose server environment variables, internal endpoints, stack traces, or provider errors through client bundles/UI.
- Never log passwords, tokens, OTPs, API keys, full payment data, exact location history, or unnecessary personally identifiable information.
- Use the existing error and logging approach. Do not leave `console.log`, temporary debug UI, or test credentials in production code.
- Do not swallow exceptions or leave empty catches. Preserve safe diagnostic context and stable user-facing states.

Inspect example configuration and documentation; do not assume values. When adding a setting, add it to the correct example configuration, document purpose and required/optional status, and provide only a safe local default.

## Package manager, generated code, and dependencies

`package-lock.json` selects npm. Use npm; do not create `yarn.lock` or `pnpm-lock.yaml`. Do not delete or regenerate the lockfile unless an authorized dependency change requires it. Prefer `npm ci` for a clean reproducible install and `npm install` when intentionally changing dependencies.

Do not manually edit:

- `.next/`, `out/`, coverage, or other build output.
- `next-env.d.ts` or `tsconfig.tsbuildinfo`.
- Generated API clients, schemas, or files marked `Generated Code`/`Do not modify`.

Change the source definition and run the configured generator instead.

Before adding a dependency:

1. Confirm equivalent functionality is not already present.
2. Prefer maintained, widely used, licence-compatible packages.
3. Avoid large packages for trivial behaviour.
4. Verify compatibility with the current Next.js, React, TypeScript, and Node environment.
5. Update tests and documentation where necessary.

## Testing and validation

Add or update tests for changed behaviour. Prefer unit tests for utilities/domain logic, component tests for UI behaviour/accessibility, integration tests for service boundaries, and end-to-end tests for critical public/account journeys. Cover successful behaviour, validation failures, error handling, permission boundaries, important state changes, and regressions. Never remove or weaken a valid test to accommodate an incorrect implementation.

Inspect `package.json`, lockfiles, configuration, and CI before selecting commands. Do not invent scripts.

The currently configured completion checks are:

```bash
npm install
npm run lint
npx tsc --noEmit
npm run build
```

For a clean unchanged lockfile, `npm ci` may replace `npm install`. The repository currently has no `test` or `typecheck` npm script; `npx tsc --noEmit` uses the locally installed compiler for type-checking. Run `npm run test` only after a test script exists. If tests are relevant but no harness is configured, add one only when within task scope; otherwise report the gap rather than inventing a passing command.

A task is complete only when:

- Requested behaviour is implemented and architecture/design/SEO/accessibility conventions remain intact.
- Relevant tests are added or updated where infrastructure exists or is in scope.
- Formatting/linting, type-checking, tests, and production build pass as applicable.
- No unrelated files, generated output, secrets, or debug code are included.
- Public contract, configuration, deployment, or cross-repository impacts are documented.
- The final response summarizes modified files, behavioural changes, validation run, and commands that could not run.

Before completion, review `git diff` and `git status`. Use concise, imperative commit messages if explicitly asked to commit. Do not create commits, push branches, or open pull requests unless explicitly instructed.
