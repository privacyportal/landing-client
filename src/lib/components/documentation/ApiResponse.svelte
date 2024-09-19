<script>
  import Button from '../common/Button.svelte';
  import FlexContainer from '../common/FlexContainer.svelte';
  import ExpandMoreIcon from '../materialIcons/ExpandMoreIcon.svelte';
  import Schema from './Schema.svelte';

  export let status;
  export let data;
  let opened = false;

  $: contentTypes = Object.keys(data?.content || {});
  $: color = status < 400 ? 'var(--positive-color)' : 'var(--danger-color)';

  function toggleOpened() {
    opened = !opened;
  }
</script>

<FlexContainer column gap="0.5rem">
  <Button on:click={toggleOpened} border rounded light positive={status < 400} danger={status >= 400} disabled={!contentTypes.length} enabledStyle>
    <FlexContainer align_items="flex-start" justify_content="space-between" padding="0.5rem" gap="0.5rem">
      <FlexContainer width="auto" align_items="flex-start" column {color} gap="0.5rem">
        <span class="sm"><strong>{status}</strong></span>
        <span class="sm">{data.description}</span>
      </FlexContainer>

      {#if contentTypes.length}
        <ExpandMoreIcon dimension="20px" {color} {opened} />
      {/if}
    </FlexContainer>
  </Button>

  {#if opened}
    {#each contentTypes as contentType}
      <FlexContainer column padding="0px 0px 0px 1rem">
        <FlexContainer column>
          <FlexContainer align_items="center" gap="0.5rem">
            <h5 class="no-margin">RESPONSE BODY SCHEMA:</h5>
            <span class="mono sm">{contentType}</span>
          </FlexContainer>
        </FlexContainer>
        <hr class="divider sm-v-margin" />
        <Schema data={data.content[contentType].schema} />
      </FlexContainer>
    {/each}
  {/if}
</FlexContainer>
