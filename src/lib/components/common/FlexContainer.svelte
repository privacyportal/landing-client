<script>
  export let id = undefined;
  export let justify_content = 'auto';
  export let mobile_justify_content = undefined;
  export let align_items = 'auto';
  export let gap = '0px';
  export let width = '100%';
  export let height = 'auto';
  export let bgColor = 'auto';
  export let color = 'inherit';
  export let padding = 'auto';
  export let margin = '0px';
  export let mainList = undefined;
  export let listItem = undefined;
  export let column = undefined;
  export let textCentered = undefined;
  export let border = undefined;
  export let rounded = undefined;
  export let nooverflowX = undefined;
  export let nooverflowY = undefined;
  export let nowrap = undefined;
  export let mobileFullScreen = undefined;
  export let mobileFullScreenSelected = undefined;
  export let mobileScale = undefined;
  export let autooverflow = undefined;
  export let nomobile = undefined;
  export let onlymobile = undefined;
  export let fullRow = undefined;
  export let relative = undefined;
  export let globalClass = [];
  export let extraStyle = '';

  let paddingMobile = padding
    .split(' ')
    .map((v) => `calc(${v} / 2)`)
    .join(' ');
</script>

<div
  {id}
  class={['container', ...(globalClass || [])].join(' ')}
  style={`${extraStyle}`}
  style:--gap={gap}
  style:--width={width}
  style:--height={height}
  style:--justify-content={justify_content}
  style:--mobile-justify-content={mobile_justify_content || justify_content}
  style:--align-items={align_items}
  style:--bg-color={bgColor}
  style:--color={color}
  style:--padding={padding}
  style:--padding-mobile={paddingMobile}
  style:--margin={margin}
  class:column
  class:border
  class:rounded
  class:nooverflowX
  class:nooverflowY
  class:nowrap
  class:autooverflow
  class:nomobile
  class:onlymobile
  class:relative
  class:full-row={fullRow}
  class:text-centered={textCentered}
  class:main-list={mainList}
  class:list-item={listItem}
  class:mobile-full-screen={mobileFullScreen}
  class:mobile-full-screen-selected={mobileFullScreenSelected}
  class:mobile-scale={mobileScale}
>
  <slot />
</div>

<style>
  .container {
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

  .container.relative {
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

  .container.column {
    flex-direction: column;
  }

  .text-centered {
    text-align: center;
  }

  .main-list {
    min-width: 40%;
  }

  .list-item {
    width: 60%;
    max-width: 60%;
    min-width: 60%;
  }

  .border {
    border: 2px solid var(--border-color);
  }

  .rounded {
    overflow: hidden;
    border-radius: 10px;
  }

  .onlymobile {
    display: none;
  }

  @media screen and (max-width: 979px) {
    .container.mobile-scale {
      padding: var(--padding-mobile);
      gap: calc(var(--gap) / 2);
    }

    .container {
      justify-content: var(--mobile-justify-content);
    }

    .list-item {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }

    .mobile-full-screen {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      transition: 0.2s;
    }

    .mobile-full-screen-selected {
      transition: 0.2s;
      margin-left: -100%;
    }

    .nomobile {
      display: none;
    }

    .onlymobile {
      display: flex;
    }
  }
</style>
