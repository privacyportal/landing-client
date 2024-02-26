<script>
  import '$lib/../app.css';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main>
  <slot />
</main>

<Footer />

<style>
  :global(.section:not(:first-child)) {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.06);
  }

  main {
    flex-grow: 1;
  }
</style>
