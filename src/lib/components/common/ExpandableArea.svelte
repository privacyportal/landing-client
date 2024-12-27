<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ExpandMoreIcon from '$lib/components/materialIcons/ExpandMoreIcon.svelte';

  export let title;
  export let bgColor = undefined;
  export let color = undefined;
  export let expandButtonColor = 'var(--info-color)';
  export let padding = '1rem 0.5rem 1rem 1rem';
  export let bodyPadding = '0rem 1rem 1rem 1rem';
  export let border = true;
  export let height = 'auto';
  export let roundedAsButton = undefined; // use button rounding instead of container rounding
  export let fullHeaderButton = false;

  let opened = false;
</script>

<FlexContainer globalClass={roundedAsButton ? ['rounded-btn'] : []} {bgColor} {color} column rounded {border}>
  <Button {height} {padding} on:click={() => (opened = !opened)} label={`Expand ${title}`} disabled={opened && !fullHeaderButton}>
    <GridContainer align_items="center" template_columns="auto 30px" gap="0.5rem">
      <h4 class="no-margin">{title}</h4>
      {#if fullHeaderButton}
        <ExpandMoreIcon dimension="30px" color={expandButtonColor} {opened} />
      {:else}
        <Button
          height="auto"
          on:click={(e) => {
            if (fullHeaderButton) return;
            e.stopPropagation();
            opened = !opened;
          }}
          label={`Close ${title}`}
          nohover={!opened && !fullHeaderButton}
          disabled={fullHeaderButton}
          rounded
        >
          <ExpandMoreIcon dimension="30px" color={expandButtonColor} {opened} />
        </Button>
      {/if}
    </GridContainer>
  </Button>
  <div class="body" class:opened>
    <FlexContainer column align_items="start" padding={bodyPadding} gap="0.5rem">
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

  :global(div.rounded-btn) {
    border-radius: 6px !important;
  }
</style>
