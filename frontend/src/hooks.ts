import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		/* turn the app folder into an SPA */
		ssr: !event.url.pathname.startsWith('/app')
	});

	return response;
};
