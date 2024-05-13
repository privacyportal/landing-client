<script>
  export let dimension = '24';
  export let color = 'var(--icon-color)';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
  export let bold = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={dimension} height={dimension} fill={disabled ? disabledColor : color} {opacity}>
  {#if bold}
    <path d="m256-168-88-88 224-224-224-224 88-88 224 224 224-224 88 88-224 224 224 224-88 88-224-224-224 224Z" />
  {:else}
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  {/if}
</svg>
