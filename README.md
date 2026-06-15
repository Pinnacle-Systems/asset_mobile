# Asset Mobile Monorepo

This repository is a JavaScript-first pnpm + Turborepo monorepo for a React Native mobile app and a Node.js + Express API.

## Stack

- React Native mobile app
- Node.js + Express backend
- JavaScript and JSX only
- pnpm workspaces
- Turborepo
- No TypeScript or typecheck step by design

## Layout

- apps/mobile - React Native app workspace
- apps/api - Express API workspace
- packages/api-client - shared API client helpers
- packages/contracts - shared request/response contracts
- packages/errors - shared error helpers
- packages/logger - shared logging helpers
- packages/validation - shared validation helpers
- packages/ui - shared UI primitives
- tooling/eslint - shared JavaScript ESLint configuration

## Commands

- pnpm install - install workspace dependencies
- pnpm dev - run development tasks across the monorepo
- pnpm build - build all workspaces
- pnpm lint - lint all workspaces with JavaScript ESLint configs
- pnpm test - run tests across the monorepo
- pnpm format - format the repository with Prettier
- pnpm format:check - verify formatting without writing files
- pnpm verify - run lint, test, and build in sequence
- pnpm clean - remove generated artifacts

## Mobile workspace

The mobile app lives in apps/mobile and is implemented with React Native, JavaScript, and JSX.

Start Metro from the repo root:

```sh
pnpm --filter @app/mobile start
```

Run Android:

```sh
pnpm --filter @app/mobile android
```

Run iOS:

```sh
pnpm --filter @app/mobile ios
```

The default mobile API base URL is `http://10.0.2.2:4000`, which is usually correct for the Android emulator. The iOS simulator can usually use `http://localhost:4000`. A physical device should use your machine LAN IP, for example `http://192.168.x.x:4000`.

Start the API before testing mobile API calls:

```sh
pnpm --filter @app/api dev
```

## API workspace

The backend lives in apps/api and is implemented with Node.js, Express, and ES modules.

### Run locally

1. Copy apps/api/.env.example to apps/api/.env if you want to override defaults.
2. From the repo root, run pnpm --filter @app/api dev.
3. The API will start on http://localhost:4000 by default.

### Health endpoint

- GET /health returns a JSON payload with the service status and a timestamp.

### Environment variables

The API uses dotenv and zod for configuration. The defaults are:

- PORT=4000
- NODE_ENV=development
- CORS_ORIGIN=\*

### Shared API client usage

```js
import { createApiClient } from "@repo/api-client";

const api = createApiClient({
  baseUrl: "http://localhost:4000",
  getAccessToken: async () => token,
});

await api.getHealth();
```
