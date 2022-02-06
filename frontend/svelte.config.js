import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		vite: () => ({
			resolve: {
				alias: {
					// these are the aliases and paths to them
					'@components': path.resolve('./src/lib/components')
				}
			}
		}),
		files: {
			assets: 'static'
		},
		adapter: adapter()
	}
};

export default config;
