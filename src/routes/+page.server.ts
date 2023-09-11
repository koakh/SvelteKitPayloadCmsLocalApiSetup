import type { PageServerLoad } from './$types';
import { payloadClient } from '$lib/server/payload';

export const load = (async () => {
	const pageData = await payloadClient.find({
		collection: 'users',
		depth: 2,
		page: 1,
		limit: 10,
		// pass a `where` query here
		where: {},
		sort: '-title',
		locale: 'en',
		overrideAccess: false,
		showHiddenFields: true,
	});
	// console.log(`result: [${JSON.stringify(pageData, undefined, 2)}]`);
	return pageData;
}) satisfies PageServerLoad;