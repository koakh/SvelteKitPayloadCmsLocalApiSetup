# NOTES

## Bootstrap SvelteKit App

```shell
$ pnpm create svelte@latest my-app

◆  Which Svelte app template?
│  ○ SvelteKit demo app
│  ● Skeleton project (Barebones scaffolding for your new SvelteKit app)
│  ○ Library project
◆  Add type checking with TypeScript?
│  ○ Yes, using JavaScript with JSDoc comments
│  ● Yes, using TypeScript syntax
│  ○ No
◆  Select additional options (use arrow keys/space bar)
│  ◼ Add ESLint for code linting
│  ◼ Add Prettier for code formatting
│  ◻ Add Playwright for browser testing
│  ◻ Add Vitest for unit testing

Next steps:
  1: cd my-app
  2: pnpm i
  3: git init && git add -A && git commit -m "Initial commit"
  4: pnpm dev
```

## Try Configure Payload Client

### Install Dependencies

```shell
pnpm i payload cross-env
```

### Change Dev Script

change `package.json` `"dev": "vite dev"` to `"dev": "cross-env PAYLOAD_CONFIG_PATH=src/lib/server/payload.config.ts vite dev"`

`package.json`

```json
{
 "scripts": {
  "dev": "cross-env PAYLOAD_CONFIG_PATH=src/lib/server/payload.config.ts vite dev"
  }
}
```

### Add files

`.env`

```shell
MONGODB_URI=mongodb://localhost/sveltekit-payload
PAYLOAD_SECRET=b3813a139dc510d56b9ed480
```

`src/lib/server/payload.config.ts`

```ts
import { buildConfig } from 'payload/config';
import Users from './collections/Users';

export default buildConfig({
  collections: [
    Users,
  ],
});
```

`src/lib/server/collections/Users.ts`

```ts
import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    }
  ],
};

export default Users;
```

`src/lib/server/collections/index.ts`

```ts
export * from './Users';
```

`lib/server/payload.ts`

```ts
import payload from 'payload';
import { MONGODB_URI, PAYLOAD_SECRET } from '$env/static/private';

export const payloadClient = await payload.init({
 secret: PAYLOAD_SECRET || '',
 mongoURL: MONGODB_URI || '',
 // enables local mode, doesn't spin up a server or frontend
 local: true,
});
```

`src/lib/server/index.ts`

```ts
export * from './payload';
```

`src/hooks.server.ts`

```ts
import { payloadClient } from '$lib/server';

export const handle = async ({ event, resolve }) => {
  event.locals.payloadClient = payloadClient;
  const response = await resolve(event);
  return response;
};
```

## Try Run Project

```shell
$ pnpm dev

> my-app@0.0.1 dev /mnt/storage/Home/Documents/Development/Svelte/SvelteKitPayloadCmsLocalApiSetup
> cross-env PAYLOAD_CONFIG_PATH=src/lib/server/payload.config.ts vite dev

  VITE v4.3.9  ready in 745 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
11:56:34 PM [vite] page reload src/lib/server/payload.ts
11:56:34 PM [vite] page reload src/lib/server/index.ts
11:56:34 PM [vite] page reload src/hooks.server.ts
11:56:34 PM [vite] page reload src/app.html
[22:56:34] INFO (payload): Connected to MongoDB server successfully!
[22:56:34] INFO (payload): Starting Payload...
11:56:35 PM [vite] Error when evaluating SSR module /src/lib/server/payload.ts:
|- /mnt/storage/Home/Documents/Development/Svelte/SvelteKitPayloadCmsLocalApiSetup/src/lib/server/payload.config.ts:1
import { buildConfig } from 'payload/config';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1176:20)
    at Module._compile (node:internal/modules/cjs/loader:1218:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Module.require (node:internal/modules/cjs/loader:1141:19)
    at require (node:internal/modules/cjs/helpers:110:18)
    at loadConfig (/mnt/storage/Home/Documents/Development/Svelte/SvelteKitPayloadCmsLocalApiSetup/node_modules/.pnpm/payload@1.9.0_typescript@5.1.3/node_modules/payload/dist/config/load.js:21:27)
```
