<script>
  import { navigating } from '$app/stores';
  import { onDestroy } from 'svelte';
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import CloseIcon from '$lib/components/materialIcons/CloseIcon.svelte';
  import Logo from '$lib/components/svg/Logo.svelte';

  export let open = false;

  function handleExit() {
    if (open) {
      open = false;
    }
  }

  const unsubscribeNavigation = navigating.subscribe(handleExit);

  onDestroy(unsubscribeNavigation);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|stopPropagation={handleExit} class="background" class:visible={open} />
<div class="drawer" class:open>
  <div class="header">
    <div class="brand">
      <Logo dimension="34" color="var(--primary-color)" opacity={'1'} />
      <span class="brand-name no-wrap">Privacy Portal</span>
    </div>
    <Button on:click={handleExit} height="28px" margin="0px -0.25rem 0px 0px" padding="0px 2px" rounded>
      <CloseIcon dimension="30px" />
    </Button>
  </div>
  <FlexContainer column height="100%" padding="1rem" bgColor="var(--new-layer-color)">
    <slot />
  </FlexContainer>
</div>

<style>
  .background {
    display: none;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    background-color: var(--modal-outer-bg-color);
  }

  .background.visible {
    display: block;
    transition: 0.4s ease-in-out;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10000;
    top: 0px;
    left: 100vw;
    height: 100vh;
    width: 60vw;
    margin-left: 0px;
    background-color: var(--base-color);
    border-right: 2px solid var(--border-color);
    overflow: hidden;
    transition: 0.3s ease;
    visibility: hidden;
  }

  .open {
    margin-left: -60vw;
    transition: 0.4s ease-in-out;
    visibility: visible;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    box-shadow: inset 0 -1px 0 var(--border-color);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .brand-name {
    color: var(--text-color);
    font-weight: 400;
    font-size: 1.17rem;
    letter-spacing: 0px;
  }

  @media screen and (max-width: 979px) {
    .drawer {
      width: 80vw;
    }

    .open {
      margin-left: -80vw;
    }
  }
</style>
