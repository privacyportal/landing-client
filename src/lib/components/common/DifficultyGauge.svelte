<script>
  import FlexContainer from './FlexContainer.svelte';

  export let label = 'Skills Required';
  export let difficulty = 1;
  export let width = '100%';

  const DIFFICULTIES = ['None', 'Minimal', 'Average', 'Above Average', 'Advanced'];
</script>

<FlexContainer column {width} bgColor="var(--new-layer-color)" padding="1rem" gap="0.5rem" rounded>
  <div class="difficulty-gauge">
    {#each [1, 2, 3, 4, 5] as level}
      <div class="segment level-{level}" class:filled={difficulty >= level}></div>
    {/each}
  </div>
  <span class="sm mono">{label}: <strong>{DIFFICULTIES[difficulty - 1]}</strong></span>
</FlexContainer>

<style>
  .difficulty-gauge {
    display: flex;
    overflow: hidden;
    border-radius: 15px;
    border: 2.5px solid var(--border-color);
    width: 100%;
    gap: 2.5px;
    background-color: var(--border-color);
  }

  .segment {
    width: calc(20% - 2px);
    height: 10px;
    background-color: var(--new-layer-x2-color);
  }

  .segment.filled.level-1 {
    background-color: #00ff00;
  }
  .segment.filled.level-2 {
    background-color: #99ff00;
  }
  .segment.filled.level-3 {
    background-color: #ffff00;
  }
  .segment.filled.level-4 {
    background-color: #ff9900;
  }
  .segment.filled.level-5 {
    background-color: #ff0000;
  }
</style>
