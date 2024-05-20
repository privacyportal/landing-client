<script>
  // general
  import { goto } from '$app/navigation';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import { DOMAIN } from '$lib/modules/constants';
  import { onMount } from 'svelte';

  onMount(() => goto('/blog/1', { replaceState: true }));
</script>

<svelte:head>
  <link rel="canonical" href={`https://${DOMAIN}/blog`} />
</svelte:head>

<FlexContainer column height="calc(100vh - 50px)" align_items="center" justify_content="center" color="var(--text-color)">
  <h3 class="no-margin">Loading...</h3>
</FlexContainer>
