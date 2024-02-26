<script>
  export let data;
</script>

{@html `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...data }) + '<'}/script>`}
