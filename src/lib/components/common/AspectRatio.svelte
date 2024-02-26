<script>
  export let ratio = 'initial';
  export let height = 'auto';
  export let width = '100%';
  export let padding = 'auto';
  export let max_width = '100%';
  export let nooverflow = undefined;
  export let rounded = undefined;
  export let bgColor = 'auto';
  export let background = 'auto';
  export let shadow = undefined;
</script>

<div
  style:--bg={background}
  style:--bg-color={bgColor}
  style:--aspect-ratio={ratio}
  style:--width={width}
  style:--height={height}
  style:--max-width={max_width}
  style:--padding={padding}
  class:nooverflow
  class:rounded
  class:shadow
>
  <slot />
</div>

<style>
  div {
    background: var(--bg);
    background-color: var(--bg-color);
    padding: var(--padding);
    width: var(--width);
    max-width: var(--max-width);
    height: var(--height);
    aspect-ratio: var(--aspect-ratio);
  }

  .nooverflow {
    overflow-x: hidden;
  }

  .rounded {
    border-radius: 10px;
  }

  .shadow {
    box-shadow:
      rgba(0, 0, 0, 0.05) 0px 10px 25px,
      rgba(0, 0, 0, 0.15) 0px 6px 15px;
  }
</style>
