<script>
  export let dimension = '24';
  export let color = 'var(--icon-color)';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={dimension} height={dimension} fill={disabled ? disabledColor : color} {opacity}>
  <path
    d="m740-103-19-19 88-90H606v-28h204l-90-90 20-19 123 123-123 123ZM192-212q-25 0-42.5-17.5T132-272v-416q0-25 17.5-42.5T192-748h576q25 0 42.5 17.5T828-688v293q-20-9-41.5-14t-43.5-5q-82 0-139.5 57.5T546-217v5H192Zm288-274 320-211-16-23-304 200-304-200-16 23 320 211Z"
  />
</svg>
