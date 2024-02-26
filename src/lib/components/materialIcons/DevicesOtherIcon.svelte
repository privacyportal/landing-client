<script>
  export let dimension = '24';
  export let color = 'var(--icon-color)';
  export let disabledColor = 'var(--disabled-color)';
  export let opacity = '1';
  export let disabled = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={dimension} height={dimension} fill={disabled ? disabledColor : color} {opacity}>
  <path
    d="M7 20H4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16v2H4v12h3Zm2 0v-1.8q-.475-.425-.738-.988Q8 16.65 8 16q0-.65.262-1.213.263-.562.738-.987V12h4v1.8q.475.425.738.987Q14 15.35 14 16q0 .65-.262 1.212-.263.563-.738.988V20Zm2-2.5q.625 0 1.062-.438.438-.437.438-1.062t-.438-1.062Q11.625 14.5 11 14.5t-1.062.438Q9.5 15.375 9.5 16t.438 1.062q.437.438 1.062.438ZM21 20h-5q-.425 0-.712-.288Q15 19.425 15 19v-9q0-.425.288-.713Q15.575 9 16 9h5q.425 0 .712.287Q22 9.575 22 10v9q0 .425-.288.712Q21.425 20 21 20Zm-4-2h3v-7h-3Z"
  />
</svg>
