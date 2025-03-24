<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Section from '$lib/components/common/Section.svelte';
  import Slider from '$lib/components/common/Slider.svelte';
  import Tooltip from '$lib/components/common/Tooltip.svelte';
  import CheckCircleIcon from '$lib/components/materialIcons/CheckCircleIcon.svelte';
  import InfoIcon from '$lib/components/materialIcons/InfoIcon.svelte';
  import { SIGNUP_URL } from '$lib/modules/constants';

  const PRICING_OPTIONS = [
    { label: '500', mau: 'Up to 500', price: '0', yearly_price: '0', emails: 'Up to 1,500', emails_daily: 'Up to 500', nomobile: false, free_included: true },
    { label: '1,000', mau: 'Up to 1,000', price: '8', yearly_price: '6', emails: 'Up to 15K', nomobile: false, ft_included: true },
    { label: '5,000', mau: 'Up to 5,000', price: '40', yearly_price: '34', emails: 'Up to 75K', nomobile: true },
    { label: '10K', mau: 'Up to 10,000', price: '80', yearly_price: '68', emails: 'Up to 150K', nomobile: false },
    { label: '20K', mau: 'Up to 20,000', price: '160', yearly_price: '136', emails: 'Up to 300K', nomobile: true },
    { contact_us: true, label: '20K+', mau: 'More than 20,000', price: 'Contact Us', emails: 'More than 1M', nomobile: false }
  ];
  let selectedIndex = 1;
  let yearlyBilling = false;
  let freedomTech = false;

  const FREEDOM_TECH_ENABLED_PLANS = PRICING_OPTIONS.filter((item) => !item.free_included && !item.ft_included);
  const FREEDOM_TECH_DISABLED_PLANS = PRICING_OPTIONS.filter((item) => !item.free_included);
  const FREE_PLAN = PRICING_OPTIONS.findLast((item) => item.free_included);
  const FREEDOM_TECH_PLAN = PRICING_OPTIONS.findLast((item) => item.ft_included);

  $: pricing_options = freedomTech ? FREEDOM_TECH_ENABLED_PLANS : FREEDOM_TECH_DISABLED_PLANS;
</script>

<GridContainer width="100%" height="auto" align_items="stretch" justify_items="center" template_columns="2fr 2fr 3fr 3fr" mobile_template_columns="1fr 1fr" gap="1rem">
  <FlexContainer column width="100%" align_items="flex-start" bgColor="var(--new-layer-color)" padding="1rem" gap="0.5rem" rounded border overflow>
    <FlexContainer justify_content="space-between" gap="0.5rem">
      <h4 class="no-margin">Freedom-Tech?</h4>
      <Tooltip text="Does your project improve privacy, privacy awareness, or free-speech online?" small><InfoIcon dimension="24px" /></Tooltip>
    </FlexContainer>
    <GridContainer width="100%" height="39px" template_columns="50% 50%" bgColor="var(--border-color)" border rounded gap="1px" padding="0px">
      <Button
        on:click={() => {
          freedomTech = false;
          if (selectedIndex < FREEDOM_TECH_DISABLED_PLANS.length) {
            selectedIndex++;
          }
        }}
        width="100%"
        height="100%"
        padding="0.15rem 0.3rem"
        selected={!freedomTech}
        strongSelect
        disabled={!freedomTech}><small>No</small></Button
      >
      <Button
        on:click={() => {
          freedomTech = true;
          if (selectedIndex > 1) {
            selectedIndex--;
          }
        }}
        width="100%"
        height="100%"
        padding="0.15rem 0.3rem"
        selected={freedomTech}
        strongSelect
        disabled={freedomTech}><small>Yes</small></Button
      >
    </GridContainer>
    <span class="xs">Requires review and approval by our team.</span>
  </FlexContainer>
  <FlexContainer column width="100%" align_items="flex-start" bgColor="var(--new-layer-color)" padding="1rem" gap="0.5rem" rounded border overflow>
    <h4 class="no-margin">Billing</h4>
    <GridContainer width="100%" height="39px" template_columns="50% 50%" bgColor="var(--border-color)" border rounded gap="1px" padding="0px">
      <Button
        on:click={() => {
          yearlyBilling = false;
        }}
        width="100%"
        height="100%"
        padding="0.15rem 0.3rem"
        selected={!yearlyBilling}
        strongSelect
        disabled={!yearlyBilling}><small>Monthly</small></Button
      >
      <Button
        on:click={() => {
          yearlyBilling = true;
        }}
        width="100%"
        height="100%"
        padding="0.15rem 0.3rem"
        selected={yearlyBilling}
        strongSelect
        disabled={yearlyBilling}><small>Yearly</small></Button
      >
    </GridContainer>
    <span class="xs">Around 15% discount{yearlyBilling ? ' applied.' : ' for yearly billing.'}</span>
  </FlexContainer>
  <FlexContainer
    globalClass={['grid-col-span-2']}
    column
    width="100%"
    align_items="flex-start"
    template_columns="auto 1fr"
    bgColor="var(--new-layer-color)"
    padding="1rem"
    gap="1rem"
    rounded
    border
    overflow
  >
    <FlexContainer height="auto" justify_content="space-between" padding="0px 1rem 0px 1.5rem" gap="0.5rem">
      <h4 class="no-margin">How many monthly active users?</h4>
      <Tooltip text="Users that authenticate within a given month." small><InfoIcon dimension="24px" /></Tooltip>
    </FlexContainer>
    <Slider items={pricing_options} bind:value={selectedIndex} />
  </FlexContainer>
</GridContainer>

<GridContainer template_columns="2fr 7fr 7fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded nomobile border>
  <div />
  <h3 class="no-margin">
    Free{#if freedomTech}<small>{' + Freedom Tech'}</small>{/if}
  </h3>
  <h3 class="no-margin">
    Essential{#if freedomTech}<small>{' + Freedom Tech'}</small>{/if}
  </h3>
  <div />
  <FlexContainer align_items="baseline" gap="0.5rem">
    <h1 class="no-margin"><small class="wide">€0</small></h1>
    <h3 class="no-margin oneline mono">/ month</h3>
    <span class="sm oneline">No credit card required!</span>
  </FlexContainer>
  <FlexContainer align_items="baseline" gap="0.5rem">
    {#if pricing_options[selectedIndex - 1].contact_us}
      <h1 class="no-margin"><small class="wide">Contact Us</small></h1>
    {:else}
      <h3 class="no-margin strikethrough wide">
        €{pricing_options[selectedIndex - 1][yearlyBilling ? 'yearly_price' : 'price'] - (freedomTech ? (yearlyBilling ? FREEDOM_TECH_PLAN.yearly_price : FREEDOM_TECH_PLAN.price) : 0)}
      </h3>
      <h1 class="no-margin beta"><small class="wide">€0</small></h1>
      <h3 class="no-margin oneline mono">/ month</h3>
      <span class="sm oneline beta">Free upgrade during beta!</span>
      <FlexContainer width="auto" margin="auto 0px 3px 0px">
        <Tooltip text="Free while Mail Relay is in beta." small><InfoIcon dimension="15px" color="var(--info-contrasted-color)" /></Tooltip>
      </FlexContainer>
    {/if}
  </FlexContainer>
  <FlexContainer column align_items="center"></FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1.5rem" primary rounded><strong>Start building for free</strong></Button>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1.5rem" basic rounded><strong>Sign up</strong></Button>
  </FlexContainer>
  <FlexContainer column align_items="center">
    <hr class="divider sm-v-margin" />
    <h5 class="sm-v-margin">OAUTH Logins</h5>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <CheckCircleIcon dimension="25px" /><span><small>{freedomTech ? FREEDOM_TECH_PLAN.mau : FREE_PLAN.mau} Monthly Active Users</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Passwordless</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Suspicious IP Throttling</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Anti-Phishing Protection</small></span>
    </GridContainer>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <CheckCircleIcon dimension="25px" /><span><small>{pricing_options[selectedIndex - 1].mau} Monthly Active Users</small></span>
      <CheckCircleIcon dimension="25px" /><span><small><strong>Everything in Free</strong></small></span>
    </GridContainer>
  </FlexContainer>
  <FlexContainer column align_items="center">
    <hr class="divider sm-v-margin" />
    <h5 class="sm-v-margin">Mail Relay <small class="beta">(beta)</small></h5>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <CheckCircleIcon dimension="25px" /><span><small>{freedomTech ? FREEDOM_TECH_PLAN.emails : FREE_PLAN.emails} Relayed Emails <small>per month</small></small></span>
      {#if freedomTech}
        <CheckCircleIcon dimension="25px" /><span><small>No Daily Limit</small></span>
      {:else}
        <CheckCircleIcon dimension="25px" /><span><small>{FREE_PLAN.emails_daily} Relayed Emails <small>per day</small></small></span>
      {/if}
      <CheckCircleIcon dimension="25px" /><span><small>Sender Domain Verification</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Spam Protection</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Virus Protection</small></span>
    </GridContainer>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <CheckCircleIcon dimension="25px" /><span><small>{pricing_options[selectedIndex - 1].emails} Relayed Emails <small>per month</small></small></span>
      <CheckCircleIcon dimension="25px" /><span><small>No Daily Limit</small></span>
      <CheckCircleIcon dimension="25px" /><span><small><strong>Everything in Free</strong></small></span>
    </GridContainer>
  </FlexContainer>
</GridContainer>

<GridContainer template_columns="1fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded onlymobile border>
  <h3 class="no-margin">
    Free{#if freedomTech}<small>{' + Freedom Tech'}</small>{/if}
  </h3>
  <FlexContainer align_items="baseline" gap="0.5rem">
    <h1 class="no-margin"><small class="wide">€0</small></h1>
    <h3 class="no-margin oneline mono">/ month</h3>
    <span class="sm oneline">No CC required!</span>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1.5rem" primary rounded><strong>Start building for free</strong></Button>
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <h5 class="no-margin full-row">OAUTH Logins</h5>
      <CheckCircleIcon dimension="25px" /><span><small>{freedomTech ? FREEDOM_TECH_PLAN.mau : FREE_PLAN.mau} Monthly Active Users</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Passwordless</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Suspicious IP Throttling</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Anti-Phishing Protection</small></span>
    </GridContainer>
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <h5 class="no-margin full-row">Mail Relay <small>(beta)</small></h5>
      <CheckCircleIcon dimension="25px" /><span><small>{freedomTech ? FREEDOM_TECH_PLAN.emails : FREE_PLAN.emails} Relayed Emails <small>per month</small></small></span>
      {#if freedomTech}
        <CheckCircleIcon dimension="25px" /><span><small>No Daily Limit</small></span>
      {:else}
        <CheckCircleIcon dimension="25px" /><span><small>{FREE_PLAN.emails_daily} Relayed Emails <small>per day</small></small></span>
      {/if}
      <CheckCircleIcon dimension="25px" /><span><small>Sender Domain Verification</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Spam Protection</small></span>
      <CheckCircleIcon dimension="25px" /><span><small>Virus Protection</small></span>
    </GridContainer>
  </FlexContainer>
</GridContainer>

<GridContainer template_columns="1fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded onlymobile border overflow>
  <h3 class="no-margin">
    Essential{#if freedomTech}<small>{' + Freedom Tech'}</small>{/if}
  </h3>
  <FlexContainer align_items="baseline" gap="0.5rem" overflow>
    <h3 class="no-margin strikethrough wide">
      €{pricing_options[selectedIndex - 1][yearlyBilling ? 'yearly_price' : 'price'] - (freedomTech ? (yearlyBilling ? FREEDOM_TECH_PLAN.yearly_price : FREEDOM_TECH_PLAN.price) : 0)}
    </h3>
    <h1 class="no-margin beta"><small class="wide">€0</small></h1>
    <h3 class="no-margin oneline mono">/ month</h3>
    <span class="sm oneline beta"><strong>during beta!</strong></span>
    <FlexContainer width="auto" margin="auto 0px 1px 0px">
      <Tooltip text="Free while Mail Relay is in beta." small><InfoIcon dimension="15px" color="var(--info-contrasted-color)" /></Tooltip>
    </FlexContainer>
  </FlexContainer>
  <FlexContainer column gap="0.5rem">
    <hr class="divider sm-v-margin" />
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1.5rem" basic rounded><strong>Sign up</strong></Button>
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <h5 class="no-margin full-row">OAUTH Logins</h5>
      <CheckCircleIcon dimension="25px" /><span><small>{pricing_options[selectedIndex - 1].mau} Monthly Active Users</small></span>
      <CheckCircleIcon dimension="25px" /><span><small><strong>Everything in Free</strong></small></span>
    </GridContainer>
    <hr class="divider sm-v-margin" />
    <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
      <h5 class="no-margin full-row">Mail Relay <small>(beta)</small></h5>
      <CheckCircleIcon dimension="25px" /><span><small>{pricing_options[selectedIndex - 1].emails} Relayed Emails <small>per month</small></small></span>
      <CheckCircleIcon dimension="25px" /><span><small>No Daily Limit</small></span>
      <CheckCircleIcon dimension="25px" /><span><small><strong>Everything in Free</strong></small></span>
    </GridContainer>
  </FlexContainer>
</GridContainer>

<style>
  .beta {
    color: var(--info-contrasted-color);
  }

  .strikethrough {
    text-decoration: line-through;
  }

  h3.strikethrough {
    text-decoration-thickness: 0.15rem;
  }

  .wide {
    letter-spacing: calc(var(--wide-letter-spacing) * 2);
  }
</style>
