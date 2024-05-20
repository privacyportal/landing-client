<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/common/Button.svelte';
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
</script>

<FlexContainer column align_items="center" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="6rem 4rem" gap="4rem" mobileScale>
  <FlexContainer textCentered align_items="center" justify_content="center" padding="0" margin="0">
    <h2 class="no-margin">Frequently Asked Questions</h2>
  </FlexContainer>

  <GridContainer align_items="start" justify_items="center" template_columns="1fr" gap="1rem">
    <ExpandableArea title="How does Privacy Portal protect my data?" bgColor="var(--landing-outer-bg-color)">
      <span
        >We minimize our use of personal data to the strictest minimum. We process all relayed emails in-memory. We do not store any of your emails. Check out our <a
          href="/privacy"
          bgColor="var(--landing-outer-bg-color)">Privacy Policy</a
        >.</span
      >
      <span
        >We apply the highest standards for security and privacy across the board. All connections, including internal ones, are TLS encrypted. All servers and databases use full disk encryption. All
        database backups are encrypted.</span
      >
      <span>We use passwordless logins to protect you from credential theft and fishing attacks.</span>
      <span>We don't share any of your personal information with third parties.</span>
    </ExpandableArea>
    <ExpandableArea title="Do you store email contents?" bgColor="var(--landing-outer-bg-color)">
      <span>We do not store any emails, not even temporarily. All emails are processed in-memory and are never written to disk nor stored in any database.</span>
      <span>We have designed our email processing pipeline from the ground up to be the gold standard for privacy.</span>
    </ExpandableArea>
    <ExpandableArea title="Do you read my emails?" bgColor="var(--landing-outer-bg-color)">
      <span
        >We do not read your emails. Our email servers are automated and process emails without any human intervention. Your emails are processed in-memory and are never stored in a database or
        written to disk. Once an email is processed it ceases to exist on our systems.</span
      >
    </ExpandableArea>
    <ExpandableArea title="Do you support PGP Encryption?" bgColor="var(--landing-outer-bg-color)">
      <span>When enabled, Mail Relay encrypts all inbound mail with your public PGP key. Only you can decrypt the emails with on-device decryption.</span>
      <span>Mail Relay also accepts encrypted outbound mail thus denying your email provider from any access to the content of your emails.</span>
    </ExpandableArea>
    <ExpandableArea title="Do you support S/MIME Encryption?" bgColor="var(--landing-outer-bg-color)">
      <span
        >If your preferred email client only supports S/MIME, you can use Mail Relay's S/MIME encryption to encrypt all your emails. Mail Relay helps you issue certificate chains in your browser
        without exposing your private key to us.</span
      >
      <span>Similarly to PGP, Mail Relay supports S/MIME encryption for both inbound and outbound mail.</span>
    </ExpandableArea>
    <ExpandableArea title="Do you support custom domains?" bgColor="var(--landing-outer-bg-color)">
      <span
        >At Privacy Portal, we avoid building features that could give a false sense of privacy. We think enabling custom domains goes against our privacy goals. In most cases, you would be right to
        assume that all emails under a custom domain belong to the domain owner.</span
      >
      <span>We provide domains owned by Privacy Portal and shared across all our users for better privacy.</span>
    </ExpandableArea>
    <ExpandableArea title="Are Privacy Aliases considered as temporary emails?" bgColor="var(--landing-outer-bg-color)">
      <span
        >No, Privacy Aliases do not expire and are designed be used as permanent aliases for your personal email address. That said, if no longer needed, a Privacy Alias can be deactivated or
        permanently deleted at any point in time.</span
      >
    </ExpandableArea>
    <Button on:click={() => goto('/support#faq')} margin="1rem 0 0 0" padding="0.7rem 1rem" basic rounded><strong>More FAQs</strong></Button>
  </GridContainer>
</FlexContainer>

<style>
  h2 {
    font-size: 3rem;
    font-weight: 900;
  }

  a {
    color: inherit;
  }

  @media screen and (max-width: 979px) {
    h2 {
      font-size: max(4.5vw, 25px);
    }
  }
</style>
