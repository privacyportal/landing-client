<script>
  export let dimension = '24';
  export let color = 'var(--icon-color)';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={dimension} height={dimension} fill={disabled ? disabledColor : color} {opacity}>
  <path d="M309-218 44-482l267-267 68 67-199 199 197 197-68 68Zm340 3-67-67 199-199-197-197 67-68 265 264-267 267Z" />
</svg>
