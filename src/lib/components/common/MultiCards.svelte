<script>
  import Button from './Button.svelte';
  import FlexContainer from './FlexContainer.svelte';
  import GridContainer from './GridContainer.svelte';

  export let height = '100%';
  export let width = 'auto';
  export let size;
  export let selected = 0;

  $: indexes = Array.from(new Array(size), (_, i) => i);
</script>

<GridContainer {height} {width} template_rows="1fr 1.3rem" gap="0.3rem">
  <slot />
  <FlexContainer width="100%" align_items="center" justify_content="center">
    <GridContainer width="45px" template_columns="repeat(3, 15px)" gap="0.3rem">
      {#each indexes as index}
        <Button
          on:click={() => {
            selected = index;
          }}
          width="15px"
          height="15px"
          padding="0px"
          margin="0px"
          selected={selected === index}
          blendin
          rounded>●</Button
        >
      {/each}
    </GridContainer>
  </FlexContainer>
</GridContainer>
