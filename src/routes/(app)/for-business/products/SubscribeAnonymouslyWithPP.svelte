<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import { SIGNUP_URL, WORDPRESS_PLUGIN_URL } from '$lib/modules/constants';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import TiltEffect from '$lib/components/effects/TiltEffect.svelte';
  import SubscribeAnonymously from '$lib/components/svgAssets/SubscribeAnonymously.svelte';
  import InfoIcon from '$lib/components/materialIcons/InfoIcon.svelte';
  import Tooltip from '$lib/components/common/Tooltip.svelte';
  import OpenInNewWindowIcon from '$lib/components/materialIcons/OpenInNewWindowIcon.svelte';
</script>

<FlexContainer id="subscribe-anonymously-with-privacy-portal" column bgColor="var(--primary-color)" color="var(--text-light-color)">
  <FlexContainer column textCentered color="inherit" padding="6rem 0rem" gap="4rem" mobileScale>
    <h4 class="no-margin">Risk-Free Newsletter Subscriptions</h4>

    <GridContainer align_items="center" template_columns="45% 55%" mobile_template_columns="1fr" gap="3rem 0rem" margin="0">
      <FlexContainer width="100%" align_items="center" justify_content="center" mobile_justify_content="center" nooverflow>
        <TiltEffect width="80%" transform="translateX(3%) rotateX(-5deg) rotateY(20deg) rotateZ(-5deg)" mobileTransform="translateX(0%) rotateX(10deg) rotateY(0deg) rotateZ(0deg)">
          <FlexContainer rounded>
            <SubscribeAnonymously />
          </FlexContainer>
        </TiltEffect>
      </FlexContainer>
      <FlexContainer column width="100%" align_items="center" justify_content="center" color="inherit" gap="1rem">
        <FlexContainer column align_items="center" color="inherit" width="max(300px, 85%)" gap="2rem">
          <FlexContainer column gap="0.5rem">
            <FlexContainer align_items="baseline" justify_content="center" gap="0.5rem" margin="0">
              <h3 class="no-margin">Subscribe Anonymously</h3>
            </FlexContainer>
            <p class="no-margin">Anonymous Subscriptions for Your WordPress Newsletter.</p>
          </FlexContainer>
          <FlexContainer align_items="center" justify_content="center">
            <GridContainer
              width="auto"
              align_items="center"
              justify_items="start"
              bgColor="var(--new-layer-color)"
              template_columns="30px auto"
              gap="0.5rem"
              padding="0.8rem 1rem"
              margin="0px"
              rounded
            >
              <CheckIcon dimension="30px" />
              <span>Free Plan</span>
              <CheckIcon dimension="30px" />
              <span>Mail Relay Aliases</span>
              <CheckIcon dimension="30px" />
              <span>Zero Spam (verified domains)</span>
              <CheckIcon dimension="30px" />
              <span>Email Encryption</span>
              <CheckIcon dimension="30px" />
              <span>User-Controlled Deactivation</span>
              <CheckIcon dimension="30px" />
              <span>Passwordless</span>
            </GridContainer>
          </FlexContainer>
          <FlexContainer column gap="0.5rem">
            <FlexContainer justify_content="center">
              <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Create a free account</strong></Button>
            </FlexContainer>
            <FlexContainer justify_content="center">
              <Button on:click={() => (window.location.href = WORDPRESS_PLUGIN_URL)} padding="0.7rem 1rem" dark rounded
                ><OpenInNewWindowIcon color="var(--text-light-color)" dimension="20px" /><strong>WordPress Plugin</strong></Button
              >
            </FlexContainer>
            <FlexContainer justify_content="center">
              <Button on:click={() => (window.location.href = '/blog/setting-up-subscribe-anonymously-on-your-wordpress-newsletter')} height='auto' padding="0.3rem 1rem" rounded blendin xsmall>View Documentation</Button>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer column gap="0.5rem">
            <FlexContainer align_items="center" justify_content="center" gap="0.5rem">
              <span class="sm">Special Pricing for Privacy Awareness Newsletters.</span>
              <Tooltip height="15px" text="Freedom-Tech Discount applies." position="left">
                <InfoIcon dimension="15px" color="var(--text-light-color)" />
              </Tooltip>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </GridContainer>
  </FlexContainer>
</FlexContainer>

<style>
  h3 {
    font-size: 2rem;
    font-weight: 900;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 900;
  }

  p {
    margin-top: 1rem;
    font-size: 1.38rem;
    font-weight: 300;
    line-height: 2rem;
  }

  @media screen and (max-width: 979px) {
    h3 {
      font-size: max(3vw, 20px);
    }

    h4 {
      font-size: max(1.5vw, 18px);
    }

    p {
      font-size: min(max(4vw, 16px), 16px);
    }
  }
</style>
