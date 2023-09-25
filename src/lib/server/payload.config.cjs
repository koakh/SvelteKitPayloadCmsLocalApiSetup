// import { buildConfig } from 'payload/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildConfig } = require('payload/config');
// import Users from './collections/Users.cjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Users = require('./collections/Users.cjs');
// const buildConfig = (...args) => import('payload/config').then(({default: buildConfig}) => fetch(...args));

// export default buildConfig({
//   collections: [
//     // Users,
//   ],
// });

module.exports = buildConfig({
  // debug: true,
  collections: [
    Users,
  ],
});