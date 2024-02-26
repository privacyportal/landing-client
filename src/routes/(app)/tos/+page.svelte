<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import TermsOfService from './TermsOfService.md';
</script>

<SvelteHead
  title={`Terms Of Service | Strict, Clear, and Fair.`}
  description={`Our Terms Of Service establish the rules for using the Privacy Portal website, for creating a Privacy Portal account and all its related features.`}
  keywords={['privacy portal tos', 'privacy portal terms', 'privacy portal terms of service', 'mail relay tos', 'mail relay terms', 'mail relay terms of service']}
/>

<FlexContainer column color="var(--text-color)" align_items="center" justify_content="center" padding="50px 0 0 0">
  <FlexContainer column align_items="center" justify_content="center" padding="4rem 20%" mobileScale>
    <h1>Terms Of Service</h1>

    <div class="tos-format">
      <TermsOfService />
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

  .tos-format {
    max-width: 700px;
    font-size: 0.9rem;
    font-family: var(--font-mono);
  }

  :global(.tos-format a) {
    color: var(--base-text-color);
    transition: 0.2s color ease;
    text-decoration: none;
  }

  :global(.tos-format a:hover) {
    color: var(--base-text-color);
    text-decoration: underline;
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: min(max(6vw, 30px), 3rem);
    }
  }
</style>
