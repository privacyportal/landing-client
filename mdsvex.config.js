import { escapeSvelte } from 'mdsvex';
import { getSingletonHighlighter } from 'shiki';
import theme from 'shiki/themes/github-light.mjs';

export default {
  extensions: ['.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  highlight: {
    highlighter: async (code, lang) => {
      const highlighter = await getSingletonHighlighter({ theme, langs: [lang] });
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
      return `{@html \`${html}\`}`;
    }
  },
  remarkPlugins: [],
  rehypePlugins: []
};
