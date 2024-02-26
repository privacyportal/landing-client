<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ExpandMoreIcon from '$lib/components/materialIcons/ExpandMoreIcon.svelte';

  export let title;
  export let bgColor = undefined;
  export let color = undefined;
  export let expandButtonColor = 'var(--info-color)';

  let opened = false;
</script>

<FlexContainer {bgColor} {color} column rounded border>
  <Button height="auto" padding="1rem 0.5rem 1rem 1rem" on:click={() => (opened = true)} disabled={opened}>
    <GridContainer align_items="center" template_columns="auto 30px" gap="0.5rem">
      <h4 class="no-margin">{title}</h4>
      <Button
        height="auto"
        on:click={(e) => {
          e.stopPropagation();
          opened = !opened;
        }}
        nohover={!opened}
        rounded
      >
        <ExpandMoreIcon dimension="30px" color={expandButtonColor} {opened} />
      </Button>
    </GridContainer>
  </Button>
  <div class="body" class:opened>
    <FlexContainer column align_items="start" padding="0rem 1rem 1rem 1rem" gap="0.5rem">
      <slot />
    </FlexContainer>
  </div>
</FlexContainer>

<style>
  .body {
    display: none;
    height: 0px;
    transition: 0.2s ease-in;
  }

  .body.opened {
    display: block;
    height: auto;
    transition: 0.2s ease-in;
  }

  h4 {
    text-align: left;
  }
</style>
