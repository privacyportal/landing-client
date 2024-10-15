<script>
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let width = '100%';
  export let height = 'auto';
  export let transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
  export let mobileTransform = undefined;
  let element;
  let displayed = false;
  let intersectionObserver;

  function observerCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        displayed = true;
        intersectionObserver.disconnect();
        intersectionObserver = undefined;
      }
    });
  }

  onMount(async () => {
    if (browser) {
      intersectionObserver = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '0px',
        threshold: 0.8
      });
      intersectionObserver.observe(element);
    }
  });

  onDestroy(() => {
    if (intersectionObserver) {
      intersectionObserver.disconnect();
      intersectionObserver = undefined;
    }
  });
</script>

<div bind:this={element} class="tilt-effect" class:displayed style:--width={width} style:--height={height} style:--transform={transform} style:--mobile-transform={mobileTransform ?? transform}>
  <div>
    <slot />
  </div>
</div>

<style>
  .tilt-effect {
    width: var(--width);
    height: var(--height);
    perspective: 1000px; /* This adds 3D space */
    perspective-origin: 50% 50%; /* Center of perspective */
    overflow: visible;
    background-color: #00000000;
  }

  .tilt-effect > div {
    width: 100%;
    height: auto;
    transform-style: preserve-3d; /* Preserves 3D transformations */
    transition: transform 0.6s ease;

    /* Initial tilt */
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  /* Hover effect for dynamic interaction */
  .tilt-effect.displayed > div {
    transform: var(--transform);
  }

  @media screen and (max-width: 979px) {
    /* Hover effect for dynamic interaction */
    .tilt-effect.displayed > div {
      transform: var(--mobile-transform);
    }
  }
</style>
