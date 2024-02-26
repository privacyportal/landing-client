<div class="header">
  <h5 class="category label primary-label">ERROR</h5>
  <h1>Page Not Found</h1>
</div>

<svelte:head>
  <style>
    body {
      background: var(--blog-bg-color);
    }
  </style>
</svelte:head>

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
  }

  .label {
    margin: 0 !important;
    text-transform: uppercase;
  }

  .primary-label {
    color: var(--blog-primary-label-color);
  }

  .category {
    position: absolute;
    top: -1rem;
  }

  .header h5 {
    letter-spacing: var(--wide-letter-spacing);
  }
</style>
