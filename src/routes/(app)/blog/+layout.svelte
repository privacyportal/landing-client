<svelte:head>
  <style>
    body {
      background: var(--outer-bg-color) !important;
    }
  </style>
</svelte:head>

<div class="blog-container">
  <slot />
</div>

<style>
  .blog-container {
    max-width: 1000px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr;
    padding: 2.5rem 3rem;
  }
</style>
