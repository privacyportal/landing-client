<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import config from '$lib/modules/config';

  export let meta = config.meta;
</script>

<SvelteHead
  title={`About | ${meta.name}`}
  description={`Learn about our mission, our values, and why we put our time and effort to protect your digital rights.`}
  keywords={['privacy portal team', 'privacy portal about us', 'privacy portal mission statement', 'privacy portal values']}
/>

<FlexContainer column bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="50px 0 0 0">
  <FlexContainer column align_items="center" justify_content="center" padding="6rem 20%" gap="1rem" mobileScale>
    <h1>Our Mission</h1>
    <p>
      To help democratize online privacy by building quality products designed to protect your personal information.<br /><br />
      In today's world, online users are simply outgunned in their fight for privacy. We want things to change and we're foolish enough to think we can make an impact.
    </p>
  </FlexContainer>
</FlexContainer>

<FlexContainer column color="var(--text-color)" align_items="center" justify_content="center" padding="6rem 20%" mobileScale gap="1rem">
  <h1>Our Values</h1>
  <p>With our extensive experience in the tech industry, we believe it's our duty to educate people about the importance of privacy and to use our skills for the greater good of society.</p>
</FlexContainer>

<style>
  h1 {
    margin-bottom: 1.3rem;
    width: 100%;
    font-size: 3rem;
    font-weight: 900;
  }

  p {
    margin-top: 1rem;
    font-size: 1.38rem;
    font-weight: 300;
    line-height: 2rem;
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
