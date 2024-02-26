<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { APP_ENDPOINT, SIGNUP_URL } from '$lib/modules/constants';
  import { isDarkHeader, navItems } from '$lib/stores/nav';
  import Button from './common/Button.svelte';
  import Drawer from './common/Drawer.svelte';
  import FlexContainer from './common/FlexContainer.svelte';
  import GridContainer from './common/GridContainer.svelte';
  import Burger from './svg/Burger.svelte';
  import Logo from './svg/Logo.svelte';
  import RssFeedIcon from './materialIcons/RssFeedIcon.svelte';

  let drawerOpened = false;
</script>

<Drawer bind:open={drawerOpened}>
  <FlexContainer column justify_content="space-between" height="calc(100% - 50px)">
    <FlexContainer column align_items="flex-start" justify_content="center" color="var(--text-opaque-color)" gap="1rem" padding="0">
      {#each $navItems as { path, name }}
        <Button width="100%" align_items on:click={() => goto(path)} rounded>
          <FlexContainer width="100%" justify_content="flex-start" padding="0px 0.5rem">
            <h4 class="sm-v-margin">{name}</h4>
          </FlexContainer>
        </Button>
      {/each}
    </FlexContainer>

    <GridContainer align_items="center" justify_items="center" template_columns="1fr 1fr" mobile_template_columns="1fr" gap="0.5rem" margin="0px" padding="0px">
      <Button on:click={() => (window.location.href = APP_ENDPOINT)} width="100%" primary rounded>Sign In</Button>
      <Button on:click={() => (window.location.href = SIGNUP_URL)} width="100%" primary rounded>Create Free Account</Button>
    </GridContainer>
  </FlexContainer>
</Drawer>

<nav class:dark={$isDarkHeader}>
  <GridContainer align_items="stretch" template_columns="1fr auto 1fr" mobile_template_columns="1fr 1fr" gap="0 1rem" height="100%" width="100%" nooverflow>
    <FlexContainer align_items="center" justify_content="flex-start" height="50px" gap="0.7rem" margin="0 0 0 1rem">
      <a href="/" style="font-size: 0;"><Logo color="var(--text-light-color)" /></a>

      {#if $page.url.pathname.startsWith('/blog')}
        <span class="xs">Official<br />Blog</span>
        <a class="rss-icon" href="/rss.xml" target="_blank" rel="noopener noreferrer" title="Subscribe to the RSS Feed">
          <RssFeedIcon color="var(--text-light-color)" dimension="15px" />
        </a>
      {/if}
    </FlexContainer>
    <FlexContainer align_items="stretch" justify_content="flex-end" width="100%" gap="2rem" nomobile>
      {#each $navItems as { path, name, header }}
        {#if header !== false}
          <a class="tab opaque" href={path}>
            <h5 class="no-margin">{name}</h5>
          </a>
        {/if}
      {/each}
    </FlexContainer>
    <FlexContainer height="100%" align_items="center" justify_content="flex-end" margin="0 1rem 0 0" gap="0.5rem">
      <Button on:click={() => (window.location.href = SIGNUP_URL)} width="auto" padding="0 1rem" dark rounded border={$isDarkHeader}>
        <h5 class="no-margin"><small>Sign Up</small></h5></Button
      >
      <Button on:click={() => (drawerOpened = true)} padding="2px" blendin rounded nohover>
        <Burger dimension="20px" color="var(--text-light-color)" />
      </Button>
    </FlexContainer>
  </GridContainer>
</nav>

<style>
  nav {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 52px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--transparent-primary-color);
    color: var(--text-light-color);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    margin-top: 0px;
    transition: 0.1s linear;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-bottom: 1.5px solid var(--base-light-border-color);
  }

  nav.dark {
    background-color: var(--transparent-dark-color);
  }

  a.tab {
    display: flex;
    align-items: center;
    color: inherit;
    opacity: 0.75;
    width: 100%;
  }

  a.opaque {
    opacity: 0.9;
  }

  a:hover {
    opacity: 1;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
</style>
