<script>
  export let id = undefined;
  export let justify_content = 'auto';
  export let align_items = 'auto';
  export let gap = '0px';
  export let width = '100%';
  export let height = 'auto';
  export let bgColor = 'auto';
  export let color = 'inherit';
  export let padding = 'auto';
  export let margin = '0px';
  export let column = undefined;
  export let textCentered = undefined;
  export let nooverflowX = undefined;
  export let nooverflowY = undefined;
  export let mobileScale = undefined;
  export let autooverflow = undefined;
  export let overflow = undefined;
  export let nomobile = undefined;
  export let onlymobile = undefined;
  export let relative = undefined;
  export let globalClass = [];

  let paddingMobile = padding
    .split(' ')
    .map((v) => `calc(${v} / 2)`)
    .join(' ');
</script>

<section
  {id}
  class={['container', ...(globalClass || [])].join(' ')}
  style:--gap={gap}
  style:--width={width}
  style:--height={height}
  style:--justify-content={justify_content}
  style:--align-items={align_items}
  style:--bg-color={bgColor}
  style:--color={color}
  style:--padding={padding}
  style:--padding-mobile={paddingMobile}
  style:--margin={margin}
  class:column
  class:nooverflowX
  class:nooverflowY
  class:autooverflow
  class:overflow
  class:nomobile
  class:onlymobile
  class:relative
  class:text-centered={textCentered}
  class:mobile-scale={mobileScale}
>
  <slot />
</section>

<style>
  section {
    display: flex;
    flex-direction: row;
    gap: var(--gap);
    justify-content: var(--justify-content);
    align-items: var(--align-items);
    width: var(--width);
    height: var(--height);
    min-height: var(--height);
    max-height: var(--height);
    padding: var(--padding);
    margin: var(--margin);
    min-width: var(--width);
    max-width: var(--width);
    color: var(--color);
    background-color: var(--bg-color);
  }

  section.relative {
    position: relative;
  }

  .nooverflowX {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .nooverflowY {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .nooverflowX.nooverflowY {
    overflow: hidden !important;
  }

  .full-row {
    grid-column: 1 / -1;
  }

  .nowrap {
    flex-wrap: nowrap;
  }

  .autooverflow {
    overflow: auto;
  }

  .overflow {
    overflow: visible;
  }

  section.column {
    flex-direction: column;
  }

  .text-centered {
    text-align: center;
  }

  .onlymobile {
    display: none;
  }

  @media screen and (max-width: 979px) {
    section.mobile-scale {
      padding: var(--padding-mobile);
      gap: calc(var(--gap) / 2);
    }

    section {
      justify-content: var(--mobile-justify-content);
    }

    .nomobile {
      display: none;
    }

    .onlymobile {
      display: flex;
    }
  }
</style>
