<script>
  export let cite = undefined;
</script>

<blockquote>
  <slot />
  {#if cite}
    <cite>{cite}</cite>
  {/if}
</blockquote>

<style>
  blockquote {
    font-size: 1.1rem;
    font-style: italic;
    color: var(--text-color);
    margin: 0px;
    padding: 1.2em 30px 1.2em 75px;
    border-left: 8px solid var(--primary-color);
    line-height: 1.6;
    position: relative;
    background-color: var(--down-layer-x2-color);
  }

  blockquote::before {
    font-family: Arial;
    content: '\201C';
    color: var(--primary-color);
    font-size: 5rem;
    position: absolute;
    left: 10px;
    top: -10px;
  }

  blockquote::after {
    content: '';
  }

  blockquote cite {
    display: block;
    color: var(--text-color);
    font-style: normal;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 1rem;
  }
</style>
