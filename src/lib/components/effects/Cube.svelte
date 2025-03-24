<script>
  export let dimension = '200px';
  export let animated = false;
</script>

<div class="scene" style:--dimension={dimension}>
  <div class="cube" class:animated>
    <div class="cube__face cube__face--front">
      <slot name="front" />
    </div>
    <div class="cube__face cube__face--back">
      <slot name="back" />
    </div>
    <div class="cube__face cube__face--right">
      <slot name="right" />
    </div>
    <div class="cube__face cube__face--left">
      <slot name="left" />
    </div>
    <div class="cube__face cube__face--top">
      <slot name="top" />
    </div>
    <div class="cube__face cube__face--bottom">
      <slot name="bottom" />
    </div>
  </div>
</div>

<style>
  .scene {
    width: var(--dimension);
    height: var(--dimension);
    margin: calc(var(--dimension) * 0.8);
    perspective: calc(var(--dimension) * 2);
  }

  .cube {
    width: var(--dimension);
    height: var(--dimension);
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(calc(-1 * var(--dimension) / 4)) rotateZ(25deg) rotateX(25deg) rotateY(35deg);
    transition: transform 1s;
  }

  .cube__face {
    position: absolute;
    width: var(--dimension);
    height: var(--dimension);
    text-align: center;
  }

  .cube__face--front {
    transform: rotateY(0deg) translateZ(calc(var(--dimension) / 2));
  }
  .cube__face--right {
    transform: rotateY(90deg) translateZ(calc(var(--dimension) / 2));
  }
  .cube__face--back {
    transform: rotateY(180deg) translateZ(calc(var(--dimension) / 2));
  }
  .cube__face--left {
    transform: rotateY(-90deg) translateZ(calc(var(--dimension) / 2));
  }
  .cube__face--top {
    transform: rotateX(90deg) translateZ(calc(var(--dimension) / 2));
  }
  .cube__face--bottom {
    transform: rotateX(-90deg) translateZ(calc(var(--dimension) / 2));
  }

  .cube.animated {
    animation-name: float;
    animation-duration: 160s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes float {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    25% {
      transform: rotateX(360deg) rotateY(90deg) rotateZ(90deg);
    }

    50% {
      transform: rotateX(720deg) rotateY(180deg) rotateZ(180deg);
    }

    75% {
      transform: rotateX(1080deg) rotateY(270deg) rotateZ(270deg);
    }

    100% {
      transform: rotateX(1440deg) rotateY(360deg) rotateZ(360deg);
    }
  }
</style>
