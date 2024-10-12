<script>
  import GridContainer from './GridContainer.svelte';
  import Tag from './Tag.svelte';

  export let items;
  export let value = 1;

  const min = 1;
  $: max = items?.length;
  $: chunkSize = 100 / (max - 1);
</script>

<GridContainer height="calc(16px + 2rem)" align_items="stretch" template_rows="7px 9px 2rem" padding="0px 1.5rem">
  <input type="range" {min} {max} step="1" bind:value style:--background-size={`${((value - min) / (max - min)) * 100}%`} />
  <div class="ticks" style:--chunk-size={`${chunkSize}%`}></div>
  <GridContainer width={`${100 + chunkSize}%`} align_items="center" justify_items="center" template_columns={`repeat(${max}, 1fr)`} margin={`0px auto 0px -${chunkSize / 2}%`}>
    {#if items}
      {#each items as item, index}
        <div>
          <Tag backgroundColor={value === index + 1 ? 'var(--primary-color)' : 'var(--border-color)'} nomobile={items?.length > 4 && item.nomobile}>{item.label}</Tag>
        </div>
      {/each}
    {/if}
  </GridContainer>
</GridContainer>

<style>
  input {
    width: 100%;
    z-index: 50;
  }

  .ticks {
    margin: -2px 2px 0px 0.5em;
    z-index: 49;
    background-image: repeating-linear-gradient(90deg, var(--border-color), var(--border-color) 2px, transparent 2px, transparent calc(var(--chunk-size) - 1px));
  }

  input,
  input::-webkit-slider-runnable-track,
  input::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input::-webkit-slider-runnable-track {
    height: 7px;
    background: linear-gradient(to right, var(--primary-color), var(--lighter-primary-color)), var(--border-color);
    background-size: var(--background-size, 0%) 100%;
    background-repeat: no-repeat;
    border-radius: 5px;
  }

  input::-webkit-slider-thumb {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: var(--dark-color);
    border-radius: 50%;
    margin-top: -4px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  input::-moz-range-progress {
    background-color: #293043;
    border-radius: 5px;
  }

  input::-moz-range-track {
    background-color: #d7d7d7;
    border-radius: 5px;
  }

  input::-moz-range-thumb {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: var(--dark-color);
    border-radius: 50%;
    margin-top: -4px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }
</style>
