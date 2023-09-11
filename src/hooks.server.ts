import { payloadClient } from '$lib/server/payload';

export const handle = async ({ event, resolve }) => {
  // https://kit.svelte.dev/docs/hooks
  // must declare type in src/app.d.ts
  event.locals.payloadClient = payloadClient;
  const response = await resolve(event);
  return response;
};

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { payloadClient } = require('$lib/server/payload');

// module.exports = {
//   handle: async ({ event, resolve }) => {
//     // event.locals.payloadClient = payloadClient;
//     const response = await resolve(event);
//     return response;
//   },
// }