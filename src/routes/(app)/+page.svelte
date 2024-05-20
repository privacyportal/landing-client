<script>
  import JsonLd from '$lib/components/JsonLd.svelte';
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import Octocat from '$lib/components/brandIcons/Octocat.svelte';
  import XLogo from '$lib/components/brandIcons/XLogo.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import Logo from '$lib/components/svg/Logo.svelte';
  import Portal from '$lib/components/svg/Portal.svelte';
  import config from '$lib/modules/config';
  import { onMount } from 'svelte';

  export let meta = config.meta;

  let lazyMailRelay, lazyPricing, lazyFAQs;

  onMount(async () => {
    lazyMailRelay = import('./MailRelay.svelte');
    lazyPricing = import('./Pricing.svelte');
    lazyFAQs = import('./FAQs.svelte');
  });
</script>

<SvelteHead>
  <JsonLd
    data={{
      '@type': 'WebSite',
      name: meta.title,
      url: `https://${meta.site_name}`,
      sameAs: [`https://${meta.site_name_alias}`, `https://twitter.com/${meta.twitter}`, `https://github.com/${meta.github}`]
    }}
  />
  <JsonLd
    data={{
      '@type': 'Organization',
      '@id': `https://${meta.site_name}`,
      name: meta.title,
      description: meta.description,
      url: `https://${meta.site_name}`,
      logo: {
        '@type': 'ImageObject',
        url: meta.image,
        width: 256,
        height: 256
      },
      sameAs: [`https://${meta.site_name_alias}`, `https://twitter.com/${meta.twitter}`, `https://github.com/${meta.github}`]
    }}
  />
</SvelteHead>

<FlexContainer
  height="100vh"
  column
  textCentered
  bgColor="var(--primary-color)"
  color="var(--text-light-color)"
  align_items="center"
  justify_content="center"
  padding="4rem 3rem"
  gap="1rem"
  relative
  nooverflowX
  nooverflowY
>
  <h1>Privacy Portal</h1>
  <div>
    <div class="portal-layer">
      <Portal dimension="100vh" animated={true} animation_delay="0.3s" />
    </div>
  </div>

  <p>Your Gateway To Online Privacy.</p>

  <a class="section-footer" href="#learn-more">
    <p>learn more</p>
  </a>
</FlexContainer>

<FlexContainer id="learn-more" column color="var(--text-color)" align_items="center" justify_content="start" padding="6rem 4rem" gap="4rem" mobileScale>
  <FlexContainer column textCentered gap="1rem">
    <h2 class="no-margin">Software you can trust</h2>
    <h4 class="no-margin">(and verify)</h4>
  </FlexContainer>
  <GridContainer align_items="stretch" justify_items="stretch" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" margin="0" gap="1rem">
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Open Source</h4>
        <span class="sm">Our clients are FOSS and more contributions will follow. Stay tuned!</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Transparent Pricing</h4>
        <span class="sm">Simple, fair, and sustainable business model with no hidden fees.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Reliable Jurisdictions</h4>
        <span class="sm">We only use juridictions renowned for internet freedoms and strict privacy laws.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" justify_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Strict Privacy Policy</h4>
        <span class="sm">We minimize personal information use to the strictest minimum required to operate.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">No Logging</h4>
        <span class="sm">We do not store, log, nor share your usage data with anyone.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">No Tracking</h4>
        <span class="sm">We do not track you nor do we sell your data in any way shape or form.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Indie Software</h4>
        <span class="sm">We are a privately owned business with a small team of developers and no external influence.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Privacy Advocates</h4>
        <span class="sm">We first build our products to protect ourselves, our families, and our friends.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Experienced Developers</h4>
        <span class="sm">In previous lives, we led engineering efforts on popular big tech products.</span>
      </FlexContainer>
    </GridContainer>
  </GridContainer>
</FlexContainer>

{#if lazyMailRelay}
  {#await lazyMailRelay then { default: MailRelay }}
    <MailRelay />
  {/await}
{/if}

{#if lazyPricing}
  {#await lazyPricing then { default: Pricing }}
    <Pricing />
  {/await}
{/if}

{#if lazyFAQs}
  {#await lazyFAQs then { default: FAQs }}
    <FAQs />
  {/await}
{/if}

<FlexContainer column bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="6rem 4rem" gap="4rem" mobileScale nooverflow>
  <Logo dimension="min(15rem, 60%)" />
  <FlexContainer column align_items="center" gap="1rem" mobileScale>
    <p class="no-margin">Follow us</p>
    <GridContainer justify_items="stretch" width="max(170px, 15%)" template_columns="1fr" gap="0.5rem">
      <a class="social-btn" href="https://twitter.com/Privacy_Portal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <XLogo dimension="1rem" color="#fff" />
          <h6 class="mono no-margin">@Privacy_Portal</h6>
        </FlexContainer>
      </a>

      <a class="social-btn" href="https://github.com/privacyportal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <Octocat dimension="1.25rem" dark={false} />
          <h6 class="mono no-margin">@privacyportal</h6>
        </FlexContainer>
      </a>
    </GridContainer>
  </FlexContainer>
</FlexContainer>

<style>
  .section-footer {
    position: absolute;
    bottom: 1rem;
  }

  h1 {
    font-size: 4rem;
    font-weight: 900;
    white-space: nowrap;
  }

  h2 {
    font-size: 3rem;
    font-weight: 900;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 900;
  }

  a {
    color: inherit;
  }

  p {
    margin-top: 1rem;
    font-size: 1.38rem;
    font-weight: 300;
    line-height: 2rem;
  }

  .portal-layer {
    position: absolute;
    top: 0px;
    left: calc(50vw - 50vh);
  }

  a.social-btn {
    text-decoration: none;
  }

  a.social-btn:hover {
    transition: 0.3s;
    filter: brightness(110%);
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: max(6vw, 30px);
    }

    h2 {
      font-size: max(4.5vw, 25px);
    }

    h4 {
      font-size: max(1.5vw, 18px);
    }

    p {
      font-size: min(max(4vw, 16px), 16px);
    }
  }
</style>
