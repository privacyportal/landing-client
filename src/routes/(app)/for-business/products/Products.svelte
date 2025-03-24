<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import TiltEffect from '$lib/components/effects/TiltEffect.svelte';
  import { DOCS_URL, PRIVACY_KIT_URL, WORDPRESS_PLUGIN_URL } from '$lib/modules/constants';
  import MobileDemo from './MobileDemo.svelte';

  const ITEMS = [
    {
      name: 'Sign In With Privacy Portal',
      text: 'Allow users to log in without sharing personal details, enhancing trust and reducing your data liability.',
      btns: [
        { label: 'Custom Integration', handler: () => goto(DOCS_URL.SIWPP) },
        { label: 'Wordpress Plugin', handler: () => (window.location.href = WORDPRESS_PLUGIN_URL) }
      ]
    },
    {
      name: 'Anonymous Newsletter Subscriptions',
      text: 'Enable users to subscribe to newsletters without revealing their email, growing your audience while respecting privacy.',
      btns: [
        { label: 'Privacy-Kit Library', handler: () => (window.location.href = PRIVACY_KIT_URL) },
        { label: 'Wordpress Plugin', handler: () => (window.location.href = WORDPRESS_PLUGIN_URL) }
      ]
    },
    {
      name: 'Hide My Email',
      text: 'Allow users to hide their email using an alias whenever an email address is required on your website or app.',
      btns: [{ label: 'Privacy-Kit Library', handler: () => (window.location.href = PRIVACY_KIT_URL) }]
    }
  ];

  let container;

  let selected = undefined;
  $: top = (selected || 0) * 50 + 'px';
  $: {
    if (selected !== undefined) {
      scrollToElementWithOffset(container, 60 - Math.max(0, selected - 1) * 50);
    }
  }

  function scrollToElementWithOffset(element, offset = 0) {
    if (element) {
      setTimeout(() => {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50);
    }
  }
</script>

<GridContainer width="100%" template_columns="1fr 1fr" mobile_template_columns="1fr" padding="1rem 0px" gap="1rem">
  <GridContainer bind:element={container} template_columns="1fr" gap="0.3rem">
    {#each ITEMS as { name, text, btns }, index}
      <div class="btn-container" class:selected={selected === index || (index === 0 && selected === undefined)}>
        <FlexContainer height="100%" column align_items="center" justify_content="center" padding="0px 2rem" gap="0.5rem">
          <span class="product-name">{name}</span>
          <FlexContainer globalClass={['expandable']} column align_items="center" justify_content="center" padding="0px 2rem" gap="3rem" mobileScale>
            <span>{text}</span>
            <MobileDemo mode={0} onlymobile height="auto" />
            <FlexContainer width="auto" column bgColor="var(--new-layer-color)" padding="0.5rem 2rem 1rem 2rem" gap="0.5rem" rounded>
              <span><small><strong>Integrate using:</strong></small></span>
              <FlexContainer width="auto" column align_items="center" justify_content="center" gap="0.3rem">
                {#each btns as { label, handler }}
                  <Button on:click={handler} padding="0px 1rem" xsmall rounded basic><strong>{label}</strong></Button>
                {/each}
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        {#if (selected || 0) !== index}
          <button
            on:click={() => {
              selected = index;
            }}
          />
        {/if}
      </div>
    {/each}
  </GridContainer>
  <FlexContainer relative nomobile>
    <div id="image" style:--top={top}>
      <FlexContainer width="100%" align_items="center" justify_content="flex-end" mobile_justify_content="center">
        <TiltEffect width="80%" transform="translateX(-3%) rotateX(5deg) rotateY(-10deg) rotateZ(3deg)" mobileTransform="translateX(0%) rotateX(10deg) rotateY(0deg) rotateZ(0deg)">
          <MobileDemo mode={selected || 0} />
        </TiltEffect>
      </FlexContainer>
    </div>
  </FlexContainer>
</GridContainer>

<style>
  .btn-container {
    position: relative;
    height: 50px;
    transition: height 0.5s ease;
    padding: 10px;
    border-width: 0px;
    border-radius: 10px;
    background-color: var(--new-layer-x2-color);
    font-size: 1rem;
    color: var(--text-color);
  }

  .btn-container.selected {
    padding: 2rem 0.5rem;
    height: 500px;
    border: 5px solid var(--primary-color);
    background-color: inherit;
    font-size: 1.5rem;
    transition: all 0.5 ease;
  }

  .btn-container span {
    font-size: 1rem;
  }

  .btn-container .product-name {
    font-weight: 900;
  }

  .btn-container.selected .product-name {
    font-size: 1.4rem;
  }

  :global(.btn-container:not(.selected) .expandable) {
    font-size: 0.9rem;
    display: none;
  }

  .btn-container > button {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    border-width: 0px;
    opacity: 0;
  }

  .btn-container > button:hover {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    border-width: 0px;
    background-color: black;
    opacity: 0.1;
  }

  #image {
    position: absolute;
    top: var(--top);
    width: 100%;
    height: auto;
    transition: top 0.5s ease;
  }

  @media screen and (max-width: 979px) {
    .btn-container.selected {
      height: auto;
    }
  }
</style>
