<script>
  export let dimension = '24';
  export let color = 'var(--positive-color)';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
  export let mobile = undefined;
</script>

<svg xmlns="http://www.w3.org/2000/svg" class:mobile viewBox="0 -960 960 960" width={dimension} height={dimension} fill={disabled ? disabledColor : color} {opacity}>
  <path d="M382-200 113-469l97-97 172 173 369-369 97 96-466 466Z" />
</svg>
