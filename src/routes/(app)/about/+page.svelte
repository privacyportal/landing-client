<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import Octocat from '$lib/components/brandIcons/Octocat.svelte';
  import XLogo from '$lib/components/brandIcons/XLogo.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
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
  <h1>Our Pledge</h1>
  <p>We believe that the rights to Privacy and to Free Speech are the cornerstones for a free society.<br/><br/>While focusing on creating great privacy software, we’ve made a commitment to assist with key open-source projects that enable Free Speech online. We frequently share updates about our contributions <a href="https://x.com/Privacy_Portal">on X</a>.</p>

  <hr class="divider" />

  <FlexContainer column align_items="center" padding="1rem 0 0 0" gap="1rem" mobileScale>
    <p class="no-margin">Follow us</p>
    <GridContainer justify_items="stretch" width="max(170px, 15%)" color="var(--text-light-color)" template_columns="1fr" gap="0.5rem">
      <a class="social-btn" href="https://twitter.com/Privacy_Portal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <XLogo dimension="1rem" color="#fff" />
          <h6 class="mono no-margin">@Privacy_Portal</h6>
        </FlexContainer>
      </a>

      <a class="social-btn" href="https://github.com/privacyportal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" color="var(--text-light-color)" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <Octocat dimension="1.25rem" dark={false} />
          <h6 class="mono no-margin">@privacyportal</h6>
        </FlexContainer>
      </a>
    </GridContainer>
  </FlexContainer>
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

  a {
    color: inherit;
    font-style: italic;
  }

  a.social-btn {
    text-decoration: none;
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
