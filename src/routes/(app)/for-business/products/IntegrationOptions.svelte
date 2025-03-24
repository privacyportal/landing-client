<script>
  import { goto } from '$app/navigation';
  import JSPackage from '$lib/components/brandIcons/JSPackage.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import DifficultyGauge from '$lib/components/common/DifficultyGauge.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import CodeIcon from '$lib/components/materialIcons/CodeIcon.svelte';
  import ExtensionIcon from '$lib/components/materialIcons/ExtensionIcon.svelte';
  import OpenInNewWindowIcon from '$lib/components/materialIcons/OpenInNewWindowIcon.svelte';
  import { DOCS_URL, PRIVACY_KIT_NPM_PKG, PRIVACY_KIT_URL, WORDPRESS_PLUGIN_URL } from '$lib/modules/constants';

  const ITEMS = [
    {
      title: 'Privacy-Kit',
      subtitle: '(JS Library)',
      desc: 'One-line integration on any website, adds Hide-my-email and anonymous subscriptions.',
      difficulty: 2,
      btns: [
        { newWindow: true, label: 'Go to Privacy-Kit', handler: () => (window.location.href = PRIVACY_KIT_URL) },
        { newWindow: true, label: 'Go to NPM Package', handler: () => (window.location.href = PRIVACY_KIT_NPM_PKG) }
      ]
    },
    {
      title: 'WordPress Plugin',
      desc: 'Zero-code setup for WordPress sites, enables sign-ins and newsletter subscriptions.',
      difficulty: 1,
      btns: [
        { newWindow: true, label: 'Go to Plugin', handler: () => (window.location.href = WORDPRESS_PLUGIN_URL) },
        { label: 'View Setup Docs', handler: () => goto(DOCS_URL.WP_PLUGIN) }
      ]
    },
    {
      title: 'Custom OAuth Integration',
      desc: 'Tailored for developers needing full control, works with most web frameworks.',
      difficulty: 4,
      btns: [
        { label: 'View OAuth Docs', handler: () => goto(DOCS_URL.SIWPP) },
        { label: 'View API Docs', handler: () => goto(DOCS_URL.API) }
      ]
    }
  ];
</script>

<GridContainer align_items="stretch" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" padding="3rem" gap="1.5rem 3rem">
  {#each ITEMS as { title, subtitle, desc, difficulty, btns }, index}
    <GridContainer
      height="100%"
      align_items="start"
      width="min(100%, 600px)"
      template_columns="2fr 6fr"
      mobile_template_columns="1fr 4fr"
      bgColor="var(--new-layer-x2-color)"
      padding="1rem"
      gap="1rem"
      rounded
    >
      <FlexContainer extraStyle="aspect-ratio: 1/1;" width="100%" height="auto" align_items="center" justify_content="center" bgColor="#333" padding="0.5rem" rounded>
        {#if index === 0}
          <JSPackage dimension="100%" />
        {:else if index === 1}
          <ExtensionIcon color="var(--text-light-color)" dimension="100%" />
        {:else}
          <CodeIcon color="var(--text-light-color)" dimension="100%" />
        {/if}
      </FlexContainer>
      <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
        <h3 class="no-margin">
          {title}{#if subtitle}
            <small><small>{subtitle}</small></small>{/if}
        </h3>
        <span>{desc}</span>
      </FlexContainer>
      <FlexContainer column fullRow gap="1rem">
        <DifficultyGauge {difficulty} />
        <FlexContainer column gap="0.5rem">
          {#each btns as { newWindow, label, handler }}
            <Button on:click={handler} padding="0px 1rem" rounded dark gap="0.5rem">
              {#if newWindow}
                <OpenInNewWindowIcon color="var(--text-light-color)" dimension="20px" />
              {/if}
              {label}
            </Button>
          {/each}
        </FlexContainer>
      </FlexContainer>
    </GridContainer>
  {/each}
</GridContainer>
