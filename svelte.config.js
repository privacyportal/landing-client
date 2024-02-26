import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter(),
    prerender: {},
    csp: {
      directives: {
        'script-src': ['self']
      }
    }
  }
};

export default config;
