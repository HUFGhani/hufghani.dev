# hufghani.dev

The source code for [hufghani.dev](https://hufghani.dev), a personal portfolio built with SvelteKit, Svelte 5 and TypeScript.

## Stack

- **SvelteKit** — application framework and routing
- **Tailwind CSS 4 and DaisyUI** — styling and UI primitives
- **GraphQL** — GitHub repository data
- **Vitest and Testing Library** — unit and component tests
- **Playwright** — end-to-end tests
- **AWS CDK** — S3, CloudFront and Lambda@Edge deployment

## Requirements

- Node.js 22 (see `.nvmrc`)
- pnpm 10 (see `package.json`)

## Getting started

```sh
pnpm install
pnpm dev
```

The development server is available at http://localhost:5173.

## Validation

```sh
pnpm check
pnpm lint
pnpm test
pnpm test:e2e
pnpm test:adapter
```

## Production build

```sh
pnpm build
pnpm preview
```

## AWS deployment

Build the application before synthesizing or deploying the infrastructure:

```sh
pnpm build
pnpm infra:synth
pnpm infra:deploy
```

The custom SvelteKit adapter is maintained in `adapters/aws-lambda-edge/`. The CDK application and infrastructure definitions are in `infra/`.
