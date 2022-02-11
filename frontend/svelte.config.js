import adapterIPFS from 'sveltejs-adapter-ipfs';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		vite: () => ({
			resolve: {
				alias: {
					'@components': path.resolve('./src/lib/components')
				}
			}
		}),
		files: {
			assets: 'static'
		},
		adapter: adapterIPFS({
			removeBuiltInServiceWorkerRegistration: true,
			injectPagesInServiceWorker: true
		})
	}
};

export default config;
