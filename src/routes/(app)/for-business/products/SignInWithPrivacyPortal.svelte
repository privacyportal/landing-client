<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import { SIGNUP_URL } from '$lib/modules/constants';
  import SignInWithPrivacyPortalPreview from '$lib/components/svgAssets/SignInWithPrivacyPortalPreview.svelte';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import TiltEffect from '$lib/components/effects/TiltEffect.svelte';
  import OidcBagde from '$lib/components/svgAssets/OidcBagde.svelte';
  import MultiCards from '$lib/components/common/MultiCards.svelte';
  import OAuthPricing from './OAuthPricing.svelte';

  let multiCardSeletectedIndex = 0;

  const OIDC_CARD_DATA = [
    {
      title: 'App-Scoped User IDs',
      text: 'User IDs provided at login are unique to each OAuth client. Users cannot be tracked across applications using Privacy Portal identifiers, as each client has its own distinct user ID.'
    },
    {
      title: 'Mail Relay Aliases',
      text: 'Personal emails get automatically substituted with Privacy Aliases. These aliases only accept emails from your registered domains, effectively blocking any unsolicited mail.'
    },
    {
      title: 'Privacy Pseudonyms',
      text: 'If your application requires user names, Privacy Portal prompts users to enter pseudonyms instead, ensuring a more anonymous and secure user experience.'
    }
  ];
</script>

<FlexContainer id="sign-in-with-privacy-portal" column bgColor="var(--landing-outer-bg-color)" color="var(--text-color)">
  <FlexContainer column textCentered color="inherit" padding="6rem 0rem" gap="4rem" mobileScale>
    <h4 class="no-margin">Embrace Private Logins</h4>

    <GridContainer align_items="center" template_columns="45% 55%" mobile_template_columns="1fr" gap="3rem 0rem" margin="0">
      <FlexContainer column width="100%" align_items="center" justify_content="center" color="inherit" gap="1rem">
        <FlexContainer column align_items="center" color="inherit" width="max(300px, 85%)" gap="2rem">
          <FlexContainer column gap="0.5rem">
            <FlexContainer align_items="baseline" justify_content="center" gap="0.5rem" margin="0">
              <h3 class="no-margin">Sign In With Privacy Portal</h3>
            </FlexContainer>
            <p class="no-margin">An OAUTH2 Provider with Privacy baked-in.</p>
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
              <span>App-Scoped User IDs</span>
              <CheckIcon dimension="30px" />
              <span>Mail Relay Aliases</span>
              <CheckIcon dimension="30px" />
              <span>Privacy Pseudonyms</span>
              <CheckIcon dimension="30px" />
              <span>Passwordless</span>
            </GridContainer>
          </FlexContainer>
          <FlexContainer column gap="0.5rem">
            <FlexContainer justify_content="center">
              <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded primary><strong>Create a free account</strong></Button>
            </FlexContainer>
            <FlexContainer justify_content="center">
              <Button on:click={() => (window.location.href = '/blog/sign-in-with-privacy-portal-tutorial')} padding="0.7rem 1rem" rounded basic><strong>View Documentation</strong></Button>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer width="100%" align_items="center" justify_content="flex-end" mobile_justify_content="center" nooverflow>
        <TiltEffect width="80%" transform="translateX(-7%) rotateX(5deg) rotateY(-20deg) rotateZ(5deg)">
          <FlexContainer rounded>
            <SignInWithPrivacyPortalPreview />
          </FlexContainer>
        </TiltEffect>
      </FlexContainer>
    </GridContainer>
  </FlexContainer>

  <FlexContainer width="100%" align_items="center" justify_items="center" bgColor="var(--new-layer-x2-color)" color="inherit" padding="3rem">
    <GridContainer width="min(100%, 1000px)" align_items="center" justify_items="center" template_columns="repeat(2, 1fr)" mobile_template_columns="1fr" gap="3rem">
      <FlexContainer globalClass={['shadow']} width="min(100%, 500px)" bgColor="#00000000" nooverflow rounded>
        <OidcBagde selected={multiCardSeletectedIndex} />
      </FlexContainer>
      <MultiCards width="min(100%, 500px)" size={OIDC_CARD_DATA.length} bind:selected={multiCardSeletectedIndex}>
        <FlexContainer height="100%" align_items="top" justify_content="start" bgColor="var(--new-layer-color)" column padding="2rem" gap="1rem" border rounded>
          <h4 class="no-margin">{OIDC_CARD_DATA[multiCardSeletectedIndex].title}</h4>
          <span>{OIDC_CARD_DATA[multiCardSeletectedIndex].text}</span>
        </FlexContainer>
      </MultiCards>
    </GridContainer>
  </FlexContainer>
</FlexContainer>

<OAuthPricing />

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
