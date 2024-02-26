<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import MarkdownContainer from '$lib/components/MarkdownContainer.svelte';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import config from '$lib/modules/config';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import { goto } from '$app/navigation';
  import ChevronLeftIcon from '$lib/components/materialIcons/ChevronLeftIcon.svelte';

  const { meta } = config;

  export let data;
</script>

<SvelteHead title={`${data.title} | ${meta.name}`} description={data.description} keywords={data.keywords}>
  <JsonLd
    data={{
      '@type': 'Article',
      '@id': data.slug,
      name: data.title,
      headline: data.title,
      alternativeHeadline: data.description,
      image: meta.image,
      author: {
        '@type': 'Person',
        name: data.author
      },
      genre: data.genre,
      keywords: data.keywords.join(','),
      publisher: {
        '@type': 'Organization',
        '@id': `https://${meta.site_name}`,
        name: meta.title,
        description: data.description,
        logo: {
          '@type': 'ImageObject',
          url: meta.image,
          width: 256,
          height: 256
        }
      },
      url: `https://${meta.site_name}`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://${meta.site_name}/blog/${data.slug}`
      },
      datePublished: `${data.date}T12:00:00`,
      dateCreated: `${data.date}T12:00:00`,
      dateModified: `${data.date}T12:00:00`,
      description: data.description
    }}
  />
</SvelteHead>

<svelte:head>
  <style>
    body {
      background: var(--blog-bg-color);
    }
  </style>
</svelte:head>

<div class="header">
  <h5 class="category label primary-label">
    <a href="/blog/1">blog</a> ▸ <a href={`/blog/${data.category_slug}/1`}>{data.category}</a>
  </h5>
  <h1>{data.title}</h1>
  <div class="info">
    <div>
      <h5 class="author">{data.author}</h5>
      <h6 class="label secondary-label">{data.date}</h6>
    </div>
    <h6 class="label secondary-label">{`${data.duration || 10} MIN READ`}</h6>
  </div>
</div>

<MarkdownContainer>
  <slot />
</MarkdownContainer>

<GridContainer template_columns="1fr 1fr" mobile_template_columns="1fr" padding="2rem 0 0 0" gap="0.5rem 20%">
  {#if data.next?.slug}
    <Button on:click={() => goto(`/blog/${data.next?.slug}`)} width="100%" height="100%" padding="1rem 0.5rem 1rem 0" margin="0" blendin rounded border>
      <GridContainer template_columns="40px 1fr" template_rows="1fr 1fr" align_items="center">
        <div class="full-column">
          <ChevronLeftIcon dimension="40px" />
        </div>
        <h5 class="no-margin">Next Article</h5>
        <span class="sm oneline">{data.next?.title || '-'}</span>
      </GridContainer>
    </Button>
  {:else}
    <br />
  {/if}

  {#if data.prev?.slug}
    <Button on:click={() => goto(`/blog/${data.prev?.slug}`)} width="100%" height="100%" padding="1rem 0 1rem 0.5rem" blendin rounded border>
      <GridContainer template_columns="1fr 40px" template_rows="1fr 1fr" align_items="center">
        <h5 class="no-margin">Previous Article</h5>
        <span class="sm oneline">{data.prev?.title || '-'}</span>
        <div class="full-column grid-col-2">
          <ChevronLeftIcon dimension="40px" right />
        </div>
      </GridContainer>
    </Button>
  {/if}
</GridContainer>

<style>
  .header {
    width: 100%;
    max-width: 870px;
    padding-bottom: 1rem;
    position: relative;
  }

  .header h1 {
    padding-bottom: 2rem;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 900;
    border-bottom: 1px var(--base-border-color) solid;
  }

  .label {
    margin: 0 !important;
    text-transform: uppercase;
  }

  .primary-label,
  .primary-label a {
    color: var(--blog-primary-label-color);
  }

  .secondary-label {
    color: var(--blog-secondary-label-color);
  }

  .category {
    position: absolute;
    top: -1rem;
  }

  .info {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .header h5,
  .header h6 {
    letter-spacing: var(--wide-letter-spacing);
  }

  .author {
    color: var(--base-text-color);
    margin: 0 0 0.3rem 0;
  }

  .grid-col-2 {
    grid-column: 2;
  }
</style>
