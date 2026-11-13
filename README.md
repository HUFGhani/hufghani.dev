# new.hufghani.dev

This repository contains the source code for a SvelteKit-based project. It is designed to be a modern, scalable, and maintainable web application.

## Features

- **SvelteKit**: A powerful framework for building web applications.
- **GraphQL**: Integrated GraphQL support using `graphql`, `graphql-request`, and `graphql-tag`.
- **UI Components**: Styled with `daisyui` for a consistent and responsive design.
- **Meta Management**: Uses `svelte-meta-tags` for SEO and meta tag management.
- **AWS Deployment**: Configured with `@jill64/sveltekit-adapter-aws` for seamless deployment to AWS.
- **Development Tools**: Includes `eslint`, `prettier`, and `tailwindcss` plugins for linting and formatting.

## Prerequisites

Ensure you have the following installed:

- Node.js (v22; see `.nvmrc`)
- pnpm (v10)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/new.hufghani.dev.git
   cd new.hufghani.dev
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   `bash
pnpm run dev
`
   The application will be available at http://localhost:5173.

## Building for Production

To create a production build:
``bash
pnpm run build

````
Preview the production build locally:

## Testing

This project uses vitest and playwright for testing.
Run unit tests:
```bash
pnpm run test:unit
````

Run end-to-end tests:

```bash
pnpm run test:e2e
```

Run all tests:

```bash
pnpm run test
```

## Linting and Formatting

Check for linting errors:

Format the codebase:

## Deployment

The project is deployed to AWS using @jill64/sveltekit-adapter-aws. Deployment configurations can be found in svelte.config.js.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Built with ❤️ using SvelteKit.
Hosted on AWS S3 and distributed via CloudFront.
