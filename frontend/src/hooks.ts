/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const response = await resolve(event, {
        /* turn the app folder into an SPA */
        ssr: !event.url.pathname.startsWith('/app')
    })

    return response
}