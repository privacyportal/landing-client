<script>
  import { page } from '$app/stores';
  import { navItems } from '$lib/stores/nav';
  import FlexContainer from './common/FlexContainer.svelte';
  import GridContainer from './common/GridContainer.svelte';

  const currYear = new Date().getFullYear();
  const hidden = (path) => path.toLowerCase().startsWith('/blog');
</script>

{#if !hidden($page.url.pathname)}
  <footer>
    <GridContainer globalClass={['']} template_columns="repeat(4, 1fr)" mobile_template_columns="1fr" color="inherit" padding="3rem max(5%, 1rem)" gap="2rem 1rem">
      <span id="copyright-container oneline">© Privacy Portal {currYear}</span>
      {#each $navItems.footer as { category, links }}
        <FlexContainer column gap="0.5rem">
          <h5 class="no-margin">{category}</h5>
          {#each links as { name, path }}
            <a href={path}><small>{name}</small></a>
          {/each}
        </FlexContainer>
      {/each}
    </GridContainer>
  </footer>
{/if}

<style>
  footer {
    padding: 0.5rem;
    background-color: var(--header-bg-color);
    border-top: 1px var(--base-border-color) solid;
    position: relative;
    z-index: 10;
    color: var(--text-color);
  }

  footer a {
    color: var(--base-text-color);
    text-decoration: none;
    white-space: nowrap;
  }

  footer a:hover {
    color: var(--text-opaque-color);
    text-decoration: none;
  }
</style>
