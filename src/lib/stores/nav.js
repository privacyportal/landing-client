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

const NAV_ITEMS = {
  home: { path: '/', name: 'Home' },
  pricing: { path: '/#pricing', name: 'Pricing' },
  mail_relay: { path: '/#mail-relay', name: 'Mail Relay', description: 'Privacy for your email.' },
  file_sharing: { path: '/products/file-sharing', name: 'File Sharing', description: 'Share PDFs in total privacy.' },
  for_business: { path: '/for-business/products', name: 'For Business' },
  about: { path: '/about', name: 'About Us' },
  blog: { path: '/blog/1', name: 'Blog' },
  support: { path: '/support', name: 'Support' },
  developers: { path: '/developers/api-docs', name: 'Developers' },
  community: { path: 'https://community.privacyportal.org', name: 'Community' },
  privacy: { path: '/privacy', name: 'Privacy Policy' },
  terms: { path: '/tos', name: 'Terms Of Service' }
};

export const navItems = writable({
  header: [NAV_ITEMS.pricing, { group: 'Products', links: [NAV_ITEMS.mail_relay, NAV_ITEMS.file_sharing] }, NAV_ITEMS.for_business, NAV_ITEMS.support, NAV_ITEMS.blog, NAV_ITEMS.developers],
  drawer: [
    NAV_ITEMS.home,
    NAV_ITEMS.pricing,
    { group: 'Products', links: [NAV_ITEMS.mail_relay, NAV_ITEMS.file_sharing] },
    NAV_ITEMS.for_business,
    NAV_ITEMS.about,
    NAV_ITEMS.support,
    NAV_ITEMS.blog,
    NAV_ITEMS.developers
  ],
  footer: [
    {
      category: 'Products',
      links: [NAV_ITEMS.mail_relay, NAV_ITEMS.file_sharing, NAV_ITEMS.for_business]
    },
    {
      category: 'Resources',
      links: [NAV_ITEMS.about, NAV_ITEMS.pricing, NAV_ITEMS.privacy, NAV_ITEMS.terms]
    },
    {
      category: 'Connect',
      links: [NAV_ITEMS.blog, NAV_ITEMS.support, NAV_ITEMS.developers, NAV_ITEMS.community]
    }
  ]
});
