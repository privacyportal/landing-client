<script>
  import config from '$lib/modules/config';

  export let title = config.meta.title;
  export let description = config.meta.description;
  export let image = config.meta.image;
  export let keywords = config.meta.keywords;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <meta name="twitter:site" content={`@${config.meta.twitter}`} />
  <meta name="twitter:creator" content={`@${config.meta.twitter}`} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <meta name="keywords" content={keywords.join(', ')} />

  <slot />
</svelte:head>
