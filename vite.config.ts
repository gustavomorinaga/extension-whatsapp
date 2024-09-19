import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: true
	},
	define: {
		'process.browser': null,
		'process.version': "''"
	},
	resolve: {
		alias: {
			buffer: 'buffer',
			crypto: 'crypto-browserify',
			path: 'path-browserify',
			stream: 'readable-stream'
		}
	}
});
