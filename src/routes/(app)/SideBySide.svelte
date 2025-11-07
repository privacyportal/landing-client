<script>
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import CloseIcon from '$lib/components/materialIcons/CloseIcon.svelte';
</script>

<FlexContainer column align_items="center" margin="2rem 0px 0px 0px" bgColor="var(--base-color)" color="var(--text-color)" padding="1rem" gap="2rem" rounded border mobileScale>
  <GridContainer align_items="center" justify_items="center" mobile_justify_items="start" template_columns="1fr 1fr 1fr" mobile_template_columns="1fr 1fr" padding="1rem" gap="0.5rem 2rem">
    <span class="no-mobile" />
    <h4 class="no-margin">Mail Relay <span class="sm oneline">by Privacy Portal</span></h4>
    <h4 class="no-margin">Hide my Email <span class="sm oneline">by Apple</span></h4>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">Open Source</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">FOSS clients and browser extensions</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Closed source</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Safe Hosting Jurisdiction</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Renonwed for Privacy</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Platform Availability</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Available on all platforms</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Available within the Apple ecosystem</span></GridContainer
    >
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Privacy Browsers Extensions</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Brave, Firefox, Vivaldi, LibreWolf, Tor, ...</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No extensions</span></GridContainer>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">Free Plan</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Generous free plan</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Requires paid subscription</span></GridContainer
    >
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Anonymous Account</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Only requires email</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Tied to Apple ID and device</span></GridContainer
    >
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Easy Account Deletion</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Tied to Apple ID account</span></GridContainer
    >
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Passwordless Authentication</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Crypto Payments</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes (post beta)</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">Unlimited Aliases</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Multiple Mailboxes</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Up to 5 mailboxes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes, linked to one Apple ID</span></GridContainer
    >
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Email Replies</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Outbound Mail</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">CC and BCC Support</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">End-to-End Encryption</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Labels and Notes are encrypted</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">PGP Encryption</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Inbound & Outbound</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">S/MIME Encryption</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Inbound & Outbound</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Secondary Encryption Keys</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes, for replying to old emails</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">N/A</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Encryption Kill Switch</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Blocks unencrypted deliveries</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">N/A</span></GridContainer>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">Unsafe Reply Protection</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Blocks unsafe replies</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Metadata Leak Protection</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Obfuscates PII in outbound mail</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Zero Logs</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Unknown / No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">In-Memory Email Processing</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">Unknown / No</span></GridContainer>

    <span class="no-mobile" />
    <hr class="divider sm-v-margin" />
    <hr class="divider sm-v-margin" />

    <h5 class="no-margin mobile-full-row">Usage Metrics</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">14 days (zero PII)</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">Developer API</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Yes</span></GridContainer>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CloseIcon dimension="25px" color="var(--danger-color)" bold /><span class="sm">No</span></GridContainer>
    <span class="xs-v-margin mobile-full-row mobile" />

    <h5 class="no-margin mobile-full-row">OAUTH2 Provider</h5>
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"
      ><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Sign In with Privacy Portal</span></GridContainer
    >
    <GridContainer align_items="center" template_columns="25px 1fr" gap="0.5rem"><CheckIcon dimension="25px" color="var(--positive-color)" /><span class="sm">Sign In with Apple</span></GridContainer>
  </GridContainer>
</FlexContainer>

<style>
  h4 {
    font-size: 1.5rem;
    font-weight: 900;
  }

  h5 {
    font-size: 0.9rem;
    font-weight: 900;
  }

  @media screen and (max-width: 979px) {
    h4 {
      font-size: max(1.5vw, 18px);
    }

    h5 {
      font-size: max(1vw, 12px);
    }
  }
</style>
