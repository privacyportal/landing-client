<script>
  import { goto } from '$app/navigation';
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlipText from '$lib/components/animations/FlipText.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import config from '$lib/modules/config';
  import SignInWithPrivacyPortal from './SignInWithPrivacyPortal.svelte';
  import SubscribeAnonymouslyWithPP from './SubscribeAnonymouslyWithPP.svelte';

  export let meta = config.meta;
</script>

<SvelteHead
  title={`For Business | ${meta.name}`}
  description={'Protect the privacy of your users with Privacy Portal for business products. Your users will appreciate it.'}
  keywords={['privacy portal for business', 'privacy for your users']}
/>

<FlexContainer column height="100vh" bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="50px 0 0 0" gap="3rem">
  <FlexContainer column textCentered align_items="center" justify_content="center" padding="6rem 20%" gap="2rem" mobileScale>
    <FlexContainer width="auto" column align_items="flex-end" gap="0px">
      <h1 class="no-margin">Privacy Portal</h1>
      <h3 class="no-margin">for business</h3>
    </FlexContainer>
    <FlipText prefix="Your" items={['customers', 'users', 'subscribers']} suffix="will appreciate it." />
  </FlexContainer>
  <GridContainer align_items="center" justify_items="center" template_columns="1fr 1fr" mobile_template_columns="1fr" margin="5% 0px 0px 0px" padding="0px 10%" gap="10% 5%" mobileScale>
    <Button on:click={() => goto('#sign-in-with-privacy-portal', { replaceState: true })} width="100%" height="15vh" padding="1rem 0.5rem" rounded border dark>
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Sign In With Privacy Portal</h4>
        <span class="sm">PII-less OAuth2 Provider</span>
        <span class="xs"><br />Learn more</span>
      </FlexContainer>
    </Button>
    <Button on:click={() => goto('#subscribe-anonymously-with-privacy-portal', { replaceState: true })} width="100%" height="15vh" padding="1rem 0.5rem" rounded border dark>
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Subscribe Anonymously</h4>
        <span class="sm">PII-less Newsletter Subscriptions</span>
        <span class="xs"><br />Learn more</span>
      </FlexContainer>
    </Button>
  </GridContainer>
</FlexContainer>

<SignInWithPrivacyPortal />
<SubscribeAnonymouslyWithPP />

<style>
  h1 {
    margin-bottom: 1.3rem;
    width: 100%;
    font-size: 3.5rem;
    font-weight: 900;
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: min(max(6vw, 30px), 3rem);
    }

    p {
      font-size: min(max(4vw, 16px), 16px);
    }
  }
</style>
