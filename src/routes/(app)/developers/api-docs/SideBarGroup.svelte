<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ExpandMoreIcon from '$lib/components/materialIcons/ExpandMoreIcon.svelte';

  export let selected;
  export let name;
  export let requests;

  $: opened = selected?.group === name;

  function toggleOpened() {
    opened = !opened;
  }
</script>

<FlexContainer column padding="0.5rem 0px">
  <Button on:click={toggleOpened}>
    <GridContainer template_columns="1fr 15px" padding="0.5rem" gap="0.5rem">
      <h5 class="no-margin">{name}</h5>
      <ExpandMoreIcon dimension="15px" {opened} />
    </GridContainer>
  </Button>
  {#if opened}
    {#each requests as request}
      <Button on:click={() => goto(`#${request.id}`, { replaceState: true })} ascolumn selected={selected?.id === request.id}>
        <FlexContainer align_items="center" gap="0.5rem">
          <span class="rounded xs method">{request.method}</span>
          <span class="sm oneline">{request.name}</span>
        </FlexContainer>
      </Button>
    {/each}
  {/if}
</FlexContainer>

<style>
  span.method {
    padding: 0.2rem 0.3rem;
    background-color: var(--positive-color);
    text-transform: uppercase;
    color: var(--text-light-color);
  }
</style>
