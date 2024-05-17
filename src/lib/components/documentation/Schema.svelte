<script>
  import FlexContainer from '../common/FlexContainer.svelte';
  import GridContainer from '../common/GridContainer.svelte';

  export let data;
</script>

<GridContainer template_columns="20px 1fr 2fr" mobile_template_columns="20px 1fr" margin="0.5rem 0px 0px 0px">
  {#each data as { name, required, type, constraints, example, description, defaultValue }}
    <span class="bullet" />
    <FlexContainer column padding="0px 0px 0.3rem 0px">
      <span class="mono oneline">{name}</span>
      {#if required}
        <span class="required sm">required</span>
      {/if}
    </FlexContainer>
    <div class="bullet-link mobile" />
    <FlexContainer globalClass={['link-bullets']} column padding="0px 0px 1rem 0px" gap="0.3rem">
      <FlexContainer align_items="center" gap="0.5rem">
        <span class="sm type">{type}</span>
        {#if constraints}
          <span class="xs mono constraints oneline">{constraints}</span>
        {/if}
      </FlexContainer>
      {#if defaultValue}
        <FlexContainer align_items="center" gap="0.5rem">
          <span class="sm">Default:</span>
          <span class="xs mono example oneline">{defaultValue}</span>
        </FlexContainer>
      {/if}
      {#if example}
        <FlexContainer align_items="center" gap="0.5rem">
          <span class="sm">Example:</span>
          <span class="xs mono default-value oneline">{example}</span>
        </FlexContainer>
      {/if}
      {#if description}
        <span class="sm">{description}</span>
      {/if}
    </FlexContainer>
  {/each}
</GridContainer>

<style>
  span.type {
    color: grey;
  }

  span.required {
    color: var(--danger-color);
  }

  span.constraints,
  span.example,
  span.default-value {
    padding: 0.1rem 0.3rem;
    background-color: var(--new-layer-color);
  }

  span.bullet::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 10px;
    height: 1px;
    background: var(--primary-color);
  }

  span.bullet::after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 1px;
    background: var(--primary-color);
    height: 7px;
  }

  span.bullet:first-of-type {
    background-image: linear-gradient(transparent 0%, transparent 11px, var(--primary-color) 11px, var(--primary-color) 100%);
    border-left-width: 0px;
    background-position-x: left;
    background-position-y: top;
    background-repeat: no-repeat;
    background-size: 1px 100%;
  }

  span.bullet:last-of-type {
    background-image: linear-gradient(var(--primary-color) 0%, var(--primary-color) 11px, transparent 11px, transparent 100%);
    border-left-width: 0px;
    background-position-x: left;
    background-position-y: top;
    background-repeat: no-repeat;
    background-size: 1px 100%;
  }

  span.bullet:not(:first-of-type):not(:last-of-type),
  div.bullet-link:has(~ .bullet-link) {
    border-left: 1px solid var(--primary-color);
  }
</style>
