<svelte:head>
  <style>
    body {
      background: var(--outer-bg-color) !important;
    }
  </style>
</svelte:head>

<div class="blog-body">
  <slot />
</div>

<style>
  .blog-body {
    max-width: 800px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;

    display: grid;
    grid-template-columns: 1fr;
    padding: 2.5rem 3rem;
  }
</style>
