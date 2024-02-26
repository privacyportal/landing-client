<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import PrivacyPolicy from './PrivacyPolicy.md';
</script>

<SvelteHead
  title={`Privacy Policy | Strict, Clear, and Concise.`}
  description={`Learn about your privacy rights at Privacy Portal. Our Privacy Policy reflects our committment to safeguarding your online privacy.`}
  keywords={['privacy portal privacy policy', 'privacy portal privacy statement', 'privacy policy', 'privacy statement']}
/>

<FlexContainer column color="var(--text-color)" align_items="center" justify_content="center" padding="50px 0 0 0">
  <FlexContainer column align_items="center" justify_content="center" padding="4rem 20%" mobileScale>
    <h1>Privacy Policy</h1>

    <div class="policy-format">
      <PrivacyPolicy />
    </div>
  </FlexContainer>
</FlexContainer>

<style>
  h1 {
    max-width: 870px;
    padding-bottom: 30px;
    margin-bottom: 30px;
    width: 100%;
    font-size: 3rem;
    font-weight: 900;
    border-bottom: 1px var(--base-border-color) solid;
  }

  .policy-format {
    max-width: 700px;
    font-size: 0.9rem;
    font-family: var(--font-mono);
  }

  :global(.policy-format a) {
    color: var(--base-text-color);
    transition: 0.2s color ease;
    text-decoration: none;
  }

  :global(.policy-format a:hover) {
    color: var(--base-text-color);
    text-decoration: underline;
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: min(max(6vw, 30px), 3rem);
    }
  }
</style>
