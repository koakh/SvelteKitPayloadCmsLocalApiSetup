// import type { CollectionConfig } from 'payload/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { CollectionConfig } = require('payload/types');

//const Users = {
// const Users: CollectionConfig = {
module.exports = {
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

// export default Users;
