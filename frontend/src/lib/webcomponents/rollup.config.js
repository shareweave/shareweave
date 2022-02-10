import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
// import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-import-css';
import embedCSS from 'rollup-plugin-embed-css';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'main.js',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		file: 'build/index.js'
	},
	plugins: [
		//   css(),
		svelte({
			emitCss: false,
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
					plugins: [require('tailwindcss'), require('autoprefixer'), require('postcss-import')]
				}
			}),
			compilerOptions: {
				// add css to js
				css: true,
				//   customElement: truerollup-plugin-import-css,
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		// css({ output: 'bundle.css' }),
		/*   css({
               output(nestedCSS, styleNodes, bundle) {
                   const code = bundle[bundleName].code
                   const minify = false
                   let matches = code.match(
                       minify
                           ? /.shadowRoot.innerHTML='<style>(.*)<\/style>'/
                           : /.shadowRoot.innerHTML = "<style>(.*)<\/style>"/,
                   )
   
                   if (matches && matches[1]) {
                       const style = matches[1]
   
                       bundle[bundleName].code = code.replace(style, cssChunk)
   
                   } else {
                       throw new Error(
                           "Couldn't shadowRoot <style> tag for injecting styles"
                       )
                   }
               },
           }), */

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		//   embedCSS(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public')

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		// production && terser()
	],
	watch: {
		clearScreen: false
	}
};
