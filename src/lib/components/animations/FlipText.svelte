<script>
  import FlexContainer from '../common/FlexContainer.svelte';

  export let prefix = '';
  export let items = [];
  export let suffix = '';

  $: prefixTokens = prefix.split(' ');
  $: suffixTokens = suffix.split(' ');
</script>

<FlexContainer justify_content="center" gap="0.3rem">
  {#each prefixTokens as token}
    <span>{token}</span>
  {/each}
  <div class="flip-text">
    <FlexContainer globalClass={['flip-text-items']} width="auto" column gap="0rem">
      {#each items as word}
        <span class="flip-text-item"><strong>{word}</strong></span>
      {/each}
    </FlexContainer>
  </div>
  {#each suffixTokens as token}
    <span>{token}</span>
  {/each}
</FlexContainer>

<style>
  .flip-text {
    height: 1.2rem;
    max-height: 1.2rem;
    width: 100px;
    max-width: 100px;
    display: inline-block;
    overflow: hidden;
  }

  :global(.flip-text-items) {
    animation: show 5s linear infinite;
  }

  @keyframes show {
    0% {
      transform: translateY(0%);
    }
    5% {
      transform: translateY(-33.3%);
    }
    33% {
      transform: translateY(-33.3%);
    }
    38% {
      transform: translateY(-66.6%);
    }
    66% {
      transform: translateY(-66.6%);
    }
    71% {
      transform: translateY(0%);
    }
    99.99% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(0%);
    }
  }
</style>
