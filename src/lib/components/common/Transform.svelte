<script>
  export let transform;
  export let opacity = 1;
  export let globalClass = [];
  export let background = 'auto';
</script>

<div class={[...(globalClass || [])].join(' ')} style:--transform={transform} style:--opacity={opacity} style:--background={background}>
  <slot />
</div>

<style>
  div {
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    background: var(--background);
    transform: var(--transform);
    opacity: var(--opacity);
  }
</style>
