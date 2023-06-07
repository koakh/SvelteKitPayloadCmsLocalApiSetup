import payload from 'payload';
import { MONGODB_URI, PAYLOAD_SECRET } from '$env/static/private';

export const payloadClient = await payload.init({
	secret: PAYLOAD_SECRET || '',
	mongoURL: MONGODB_URI || '',
	// enables local mode, doesn't spin up a server or frontend
	local: true,
});
