<script>
  import { page } from '$app/stores';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import Pagination from '$lib/components/common/Pagination.svelte';
  import config from '$lib/modules/config';

  /** @type {import('./$types').PageData} */
  export let data;

  let { meta } = config;

  let description = `Check out ${meta.name}'s Official Blog, to learn more about our new privacy focused products and to expand your knowledge about online privacy.`;
  let keywords = [
    'privacy portal blog',
    'privacy news',
    'privacy tutorials',
    'learn about privacy',
    'privacy portal tutorials',
    'mail relay blog',
    'email privacy blog',
    'mail relay tutorials',
    'privacy portal faq',
    'mail relay faq'
  ];
</script>

<SvelteHead title={`${meta.name} Official Blog`} {description} {keywords}>
  <JsonLd
    data={{
      '@type': 'Blog',
      name: `${meta.title} Official Blog`,
      url: `https://${meta.site_name}/blog`,
      description: description,
      sameAs: [`https://www.${meta.site_name}/blog`],
      publisher: {
        '@type': 'Organization',
        '@id': `https://${meta.site_name}`,
        name: meta.title,
        description: description,
        logo: {
          '@type': 'ImageObject',
          url: meta.image,
          width: 256,
          height: 256
        }
      }
    }}
  />
</SvelteHead>

{#each data.posts as post}
  <div class="post">
    <h5 class="category label primary-label">
      <a href={`/blog/${post.category_slug}/1`}>{post.category}</a>
    </h5>
    <a href={`/blog/${post.slug}`} rel={post.slug}>
      <h2>{post.title}</h2>
      <p class="summary">{post.summary}</p>
    </a>
    <h5 class="author">{post.author}</h5>
    <h6 class="label secondary-label">{post.date}</h6>
    <h6 class="label secondary-label">{`${post.duration || 10} MIN READ`}</h6>
  </div>
{/each}

<Pagination currentPage={$page.params.page} pageCount={data.pageCount} />

<style>
  .post {
    padding: 1.25rem 0;
    position: relative;
  }

  .post h5,
  .post h6 {
    letter-spacing: var(--wide-letter-spacing);
  }

  .category {
    position: absolute;
    top: 1rem;
    font-weight: 400;
  }

  .summary {
    color: var(--blog-secondary-label-color);
  }

  .author {
    color: var(--base-text-color);
    margin: 0 0 0.3rem 0;
  }

  .label {
    margin: 0 !important;
    text-transform: uppercase;
  }

  .primary-label,
  .primary-label a {
    color: var(--blog-primary-label-color);
    font-weight: 900;
  }

  .secondary-label {
    color: var(--blog-secondary-label-color);
  }

  a {
    color: var(--base-text-color);
    text-decoration: none;
  }
</style>
