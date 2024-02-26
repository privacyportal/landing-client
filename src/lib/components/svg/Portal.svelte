<script>
  export let dimension = '100px';
  export let color = '#fff';
  export let disabledColor = 'var(--disabled-color)';
  export let animated = false;
  export let animation_delay = '0s';
  export let disabled = false;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 50 50"
  style:--animation-delay={animation_delay}
  width={dimension}
  height={dimension}
  fill={disabled ? disabledColor : color}
  class:animated
  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
>
  <path
    d="M49.5,7.85c0,-4.057 -3.293,-7.35 -7.35,-7.35l-34.3,-0c-4.057,-0 -7.35,3.293 -7.35,7.35l0,34.3c0,4.057 3.293,7.35 7.35,7.35l34.3,-0c4.057,-0 7.35,-3.293 7.35,-7.35l0,-34.3Zm-8.33,5.831c0,-2.677 -2.174,-4.851 -4.851,-4.851l-22.638,-0c-2.677,-0 -4.851,2.174 -4.851,4.851l-0,22.638c-0,2.677 2.174,4.851 4.851,4.851l22.638,-0c2.677,-0 4.851,-2.174 4.851,-4.851l0,-22.638Z"
    style="fill-opacity:1;"
  />
  <path
    d="M41,13.8c0,-2.649 -2.151,-4.8 -4.8,-4.8l-22.4,-0c-2.649,-0 -4.8,2.151 -4.8,4.8l0,22.4c0,2.649 2.151,4.8 4.8,4.8l22.4,-0c2.649,-0 4.8,-2.151 4.8,-4.8l0,-22.4Zm-5.44,3.808c0,-1.748 -1.42,-3.168 -3.168,-3.168l-14.784,-0c-1.748,-0 -3.168,1.42 -3.168,3.168l-0,14.784c-0,1.748 1.42,3.168 3.168,3.168l14.784,-0c1.748,-0 3.168,-1.42 3.168,-3.168l0,-14.784Z"
    style="fill-opacity:0.75;"
  />
  <path
    d="M35.5,17.65c0,-1.739 -1.411,-3.15 -3.15,-3.15l-14.7,-0c-1.739,-0 -3.15,1.411 -3.15,3.15l0,14.7c0,1.739 1.411,3.15 3.15,3.15l14.7,-0c1.739,-0 3.15,-1.411 3.15,-3.15l0,-14.7Zm-3.57,2.499c0,-1.147 -0.932,-2.079 -2.079,-2.079l-9.702,0c-1.147,0 -2.079,0.932 -2.079,2.079l0,9.702c0,1.147 0.932,2.079 2.079,2.079l9.702,-0c1.147,-0 2.079,-0.932 2.079,-2.079l0,-9.702Z"
    style="fill-opacity:0.5;"
  />
</svg>

<style>
  svg {
    opacity: 0;
    --scale: 4;
  }

  svg.animated {
    opacity: 0;
    animation-name: loading;
    animation-delay: var(--animation-delay);
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }

  @media (orientation: landscape) {
    svg {
      --scale: 6;
    }
  }

  @keyframes loading {
    0% {
      transform: scale(0);
      -webkit-transform: scale(0);
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: scale(var(--scale));
      -webkit-transform: scale(var(--scale));
    }
  }
</style>
