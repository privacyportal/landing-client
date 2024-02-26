<script>
  import { page } from '$app/stores';
  import { navItems } from '$lib/stores/nav';

  const currYear = new Date().getFullYear();
  const hidden = (path) => path.toLowerCase().startsWith('/blog');
</script>

{#if !hidden($page.url.pathname)}
  <footer>
    <div class="footer-container">
      <span id="copyright-container">© PrivacyPortal {currYear}</span>
      {#each $navItems as navItem}
        {#if navItem.footer !== false}
          <a href={navItem.path}>{navItem.name}</a>
        {/if}
      {/each}
      <a href="/privacy">Privacy</a>
      <a href="/tos">Terms Of Service</a>
    </div>
  </footer>
{/if}

<style>
  footer {
    padding: 0.5rem;
    background-color: var(--header-bg-color);
    border-top: 1px var(--base-border-color) solid;
    position: relative;
    z-index: 10;
  }

  .footer-container {
    width: 100%;
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    column-gap: 3rem;
    line-height: 2;
    color: var(--text-color);
  }

  .footer-container a::before {
    position: absolute;
    left: -1.63rem;
    content: '|';
    opacity: 0.5;
  }

  .footer-container > * {
    white-space: nowrap;
  }

  .footer-container a {
    position: relative;
    color: var(--base-text-color);
  }

  .footer-container a:hover {
    color: var(--text-opaque-color);
    text-decoration: none;
  }

  @media screen and (max-width: 767px) {
    .footer-container {
      flex-direction: column;
      row-gap: 0.5rem;
    }

    .footer-container a::before {
      display: none;
    }
  }
</style>
