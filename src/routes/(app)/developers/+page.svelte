<script>
  import { goto } from '$app/navigation';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import { DOMAIN } from '$lib/modules/constants';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/developers/api-docs', { replaceState: true });
  });
</script>

<svelte:head>
  <link rel="canonical" href={`https://${DOMAIN}/developers`} />
</svelte:head>

<SvelteHead
  title={`Developers | Privacy Portal`}
  description={`Explore our API documentation to learn how you can bring unmatched privacy protection to your users.`}
  keywords={['privacy portal api docs', 'privacy portal api documentation', 'privacy portal developer docs', 'privacy portal developer documentation']}
/>

<FlexContainer column height="calc(100vh - 50px)" align_items="center" justify_content="center" color="var(--text-color)">
  <h3 class="no-margin">Loading...</h3>
</FlexContainer>
