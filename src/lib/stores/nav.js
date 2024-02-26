import { page } from '$app/stores';
import { derived, writable } from 'svelte/store';

const CONFIG = {
  '/': {
    // DEFAULTS
    dark_header: false
  },
  '/privacy': {
    dark_header: true
  },
  '/tos': {
    dark_header: true
  }
};

// get all parent paths in order
// e.g. '/blog/tech/example' would return ['/blog/tech', '/blog', '/']
const parentPaths = (fullPath) => {
  const pathComponents = fullPath.split('/');

  const result = [fullPath];
  while (pathComponents.length > 1) {
    pathComponents.pop();
    result.push(pathComponents.join('/') || '/');
  }
  return result;
};

// given a path such as '/blog/tech/example' and a lookup map it returns the correct config for that path
const pathConfigValue = (fullPath, key) => {
  const pathArr = parentPaths(fullPath);
  for (const parentPath of pathArr) {
    const value = (CONFIG[parentPath] || {})[key];
    if (value != null && value != undefined) return value;
  }
  // default
  return CONFIG['/'][key];
};

export const isDarkHeader = derived(page, ($page) => pathConfigValue($page.url.pathname, 'dark_header'));

export const navItems = writable([
  { path: '/', name: 'Home', header: false, footer: false },
  { path: '/#pricing', name: 'Pricing', footer: false },
  { path: '/about', name: 'About' },
  { path: '/support', name: 'Support' },
  { path: '/blog/1', name: 'Blog' }
]);
