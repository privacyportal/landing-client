<script>
  export let dimension = '100px';
  export let color = '#555555f5';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
</script>

<svg
  viewBox="0 0 512 512"
  xmlns="http://www.w3.org/2000/svg"
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
  width={dimension}
  height={dimension}
  fill={disabled ? disabledColor : color}
  {opacity}
>
  <rect id="bg" width={dimension} height={dimension} fill={color} />
  <g transform="translate({512 * 0.05}, {512 * 0.05}) scale(0.9 0.9)">
    <slot />
  </g>
</svg>
