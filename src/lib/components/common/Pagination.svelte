<script>
  import { goto } from '$app/navigation';
  import ChevronLeftIcon from '../materialIcons/ChevronLeftIcon.svelte';
  import FirstPageIcon from '../materialIcons/FirstPageIcon.svelte';
  import LastPageIcon from '../materialIcons/LastPageIcon.svelte';
  import Button from './Button.svelte';
  import FlexContainer from './FlexContainer.svelte';

  export let currentPage;
  export let pageCount;
  export let parentPath = '/blog';

  $: isFirstPage = Number(currentPage) == Number(1);
  $: isLastPage = Number(currentPage) == Number(pageCount);
</script>

{#if currentPage && pageCount}
  <FlexContainer align_items="center" justify_content="center" height="65px">
    <div class="container">
      <Button on:click={() => goto(`${parentPath}/1`)} padding="0.3rem 0.5rem" disabled={isFirstPage}><FirstPageIcon dimension="22" disabled={isFirstPage} /></Button>
      <Button on:click={() => goto(`${parentPath}/${Number(currentPage) - 1}`)} padding="0.3rem 0.5rem" disabled={isFirstPage}><ChevronLeftIcon dimension="22" disabled={isFirstPage} /></Button>
      <Button on:click={() => goto(`${parentPath}/${Number(currentPage) + 1}`)} padding="0.3rem 0.5rem" disabled={isLastPage}><ChevronLeftIcon dimension="22" disabled={isLastPage} right /></Button>
      <Button on:click={() => goto(`${parentPath}/${pageCount}`)} padding="0.3rem 0.5rem" disabled={isLastPage}><LastPageIcon dimension="22" disabled={isLastPage} /></Button>
    </div>
  </FlexContainer>
{/if}

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1px;
    justify-items: stretch;
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--border-color);
    border: solid 2px var(--border-color);
  }
</style>
