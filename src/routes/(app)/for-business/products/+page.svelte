<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlipText from '$lib/components/animations/FlipText.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Section from '$lib/components/common/Section.svelte';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import config from '$lib/modules/config';
  import IntegrationOptions from './IntegrationOptions.svelte';
  import OAuthPricing from './OAuthPricing.svelte';
  import PrivacyProtection from './PrivacyProtection.svelte';
  import Benefits from './Benefits.svelte';
  import FaQs from './FAQs.svelte';
  import Blockquote from '$lib/components/common/Blockquote.svelte';
  import Products from './Products.svelte';
  import BusinessHero from '$lib/components/svgAssets/BusinessHero.svelte';
  import PassKeyIcon from '$lib/components/materialIcons/PassKeyIcon.svelte';
  import SecurityKeyIcon from '$lib/components/materialIcons/SecurityKeyIcon.svelte';
  import BadgeFilledIcon from '$lib/components/materialIcons/BadgeFilledIcon.svelte';
  import IconWrapper from '$lib/components/svg/IconWrapper.svelte';
  import EncryptedIcon from '$lib/components/materialIcons/EncryptedIcon.svelte';
  import FingerprintIcon from '$lib/components/materialIcons/FingerprintIcon.svelte';
  import MailForwardIcon from '$lib/components/materialIcons/MailForwardIcon.svelte';
  import HowItWorks from './HowItWorks.svelte';
  import { goto } from '$app/navigation';
  import { DOCS_URL, SIGNUP_URL } from '$lib/modules/constants';
  import Cube from '$lib/components/effects/Cube.svelte';

  export let meta = config.meta;
</script>

<SvelteHead
  title={`For Business | ${meta.name}`}
  description={'Protect your users’ privacy with Privacy Portal for business. Your users will appreciate it.'}
  keywords={['privacy portal for business', 'privacy for your users']}
/>

<Section id="hero" column height="max(650px, 100vh)" bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="50px 0 0 0" gap="2rem">
  <FlexContainer column textCentered padding="3rem 0px 0px 0px">
    <h1>Privacy for your users</h1>
    <FlipText prefix="Your" items={['customers', 'users', 'subscribers']} suffix="will appreciate it." />
  </FlexContainer>

  <GridContainer align_items="center" template_columns="50% 50%" mobile_template_columns="1fr" padding="4rem 2rem" gap="3rem 0rem" margin="0" mobileScale>
    <FlexContainer column width="100%" align_items="center" justify_content="center" color="inherit" gap="2rem">
      <FlexContainer column textCentered align_items="center" color="inherit" width="max(300px, 85%)" gap="1rem">
        <p><strong>Build Trust with Privacy-First Solutions</strong></p>
        <GridContainer width="auto" align_items="center" justify_items="start" bgColor="var(--new-layer-color)" template_columns="30px auto" gap="0.5rem" padding="0.8rem 1rem" margin="0px" rounded>
          <CheckIcon dimension="30px" />
          <span>No User PII Shared</span>
          <CheckIcon dimension="30px" />
          <span>Unique Email Aliases</span>
          <CheckIcon dimension="30px" />
          <span>Pseudonym Support</span>
          <CheckIcon dimension="30px" />
          <span>Passwordless</span>
        </GridContainer>
      </FlexContainer>
      <FlexContainer column align_items="center" gap="0.5rem">
        <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Get Started for free</strong></Button>
        <Button on:click={() => goto('#how-it-works')} padding="0.7rem 1rem" rounded><strong>See How It Works</strong></Button>
      </FlexContainer>
    </FlexContainer>
    <FlexContainer height="100%" relative nomobile>
      <div class="hero-img">
        <FlexContainer extraStyle="perspective: 100vw; perspective-origin: top right;" height="100%" relative>
          <BusinessHero />
          <div class="hero-cube">
            <Cube dimension="min(20vw, 20vh)" animated>
              <IconWrapper slot="front" dimension="100%">
                <BadgeFilledIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
              <IconWrapper slot="right" dimension="100%">
                <SecurityKeyIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
              <IconWrapper slot="left" dimension="100%">
                <PassKeyIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
              <IconWrapper slot="top" dimension="100%">
                <EncryptedIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
              <IconWrapper slot="bottom" dimension="100%">
                <MailForwardIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
              <IconWrapper slot="back" dimension="100%">
                <FingerprintIcon color="var(--text-light-color)" dimension="100%" />
              </IconWrapper>
            </Cube>
          </div>
        </FlexContainer>
      </div>
    </FlexContainer>
  </GridContainer>
</Section>

<Section id="product-overview" column textCentered bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="3rem 4rem" mobileScale>
  <h2>Privacy-Focused Solutions for Your Platform</h2>
  <Products />
</Section>

<Section id="integration" column bgColor="var(--primary-color)" color="var(--text-light-color)" padding="4rem 0rem">
  <h2 class="align-center">Flexible Integration for Any Platform</h2>
  <IntegrationOptions />
</Section>

<Section id="privacy-features" column bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem 0rem">
  <h2 class="no-margin align-center">Uncompromising Privacy Protection</h2>
  <PrivacyProtection />
</Section>

<Section id="benefits" column bgColor="var(--primary-color)" color="var(--text-light-color)" padding="4rem 0rem" gap="3rem">
  <FlexContainer column textCentered gap="0.5rem" padding="0px 1rem">
    <h2 class="no-margin align-center">Why Choose Our OAuth Provider?</h2>
    <span class="align-center">Enhance your privacy reputation, increase user trust, and simplify compliance.</span>
  </FlexContainer>
  <Benefits />
</Section>

<Section id="how-it-works" column bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem 0rem" gap="3rem">
  <h2 class="no-margin align-center">Seamless Privacy in Action</h2>
  <HowItWorks />
</Section>

<Section id="testimonials" column bgColor="var(--new-layer-color)" color="var(--text-color)" padding="6rem 0rem" gap="4rem">
  <h2 class="no-margin align-center">Trusted by Privacy-Conscious Businesses</h2>
  <GridContainer template_columns="1fr 1fr" mobile_template_columns="1fr" padding="0px 4rem" gap="2rem 4rem">
    <Blockquote cite="— Björn M., Serial Entrepreneur">User sign-ups increased by 20% after implementing anonymous logins!</Blockquote>
    <Blockquote cite="— Jean-Baptiste L., Tech Journalist">Finally, a way to grow our newsletter while respecting user privacy.</Blockquote>
  </GridContainer>
</Section>

<Section id="pricing" column align_items="center" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem max(1rem, 5vw)" gap="3rem">
  <FlexContainer justify_content="center" textCentered>
    <h2 class="no-margin">Flexible and Transparent Pricing.</h2>
  </FlexContainer>
  <OAuthPricing />
</Section>

<hr class="no-margin" />

<Section id="faq" column bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem 0rem" gap="3rem">
  <h2 class="no-margin align-center">Frequently Asked Questions</h2>
  <FaQs />
</Section>

<Section id="cta" column bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="8rem 0" gap="4rem">
  <FlexContainer column textCentered gap="1rem">
    <h2 class="no-margin align-center">Ready to Prioritize Privacy?</h2>
    <span>Join the privacy revolution today.</span>
  </FlexContainer>
  <FlexContainer column align_items="center" gap="0.5rem">
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Get Started for free</strong></Button>
    <Button on:click={() => goto(DOCS_URL.SIWPP)} padding="0.7rem 1rem" rounded><strong>View Documentation</strong></Button>
  </FlexContainer>
</Section>

<style>
  .hero-img {
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: 130%;
    width: 100%;
  }

  .hero-cube {
    position: absolute;
    top: 20%;
    right: 40%;
  }

  h1 {
    margin-bottom: 1.3rem;
    width: 100%;
    font-size: 3.5rem;
    font-weight: 900;
  }

  h2 {
    font-size: 2rem;
    font-weight: 900;
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: min(max(6vw, 30px), 3rem);
    }

    h2 {
      font-size: max(4vw, 20px);
    }
  }
</style>
