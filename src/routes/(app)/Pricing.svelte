<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import CheckCircleIcon from '$lib/components/materialIcons/CheckCircleIcon.svelte';
  import { SIGNUP_URL } from '$lib/modules/constants';
</script>

<FlexContainer id="pricing" column align_items="center" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem max(1rem, 5vw)" gap="3rem">
  <FlexContainer justify_content="center" textCentered>
    <h1 class="no-margin"><small>Simple and Transparent Business Model.</small></h1>
  </FlexContainer>

  <GridContainer template_columns="2fr 7fr 7fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded nomobile border>
    <div />
    <h3 class="no-margin">Basic Protection</h3>
    <h3 class="no-margin">Enhanced Protection <small class="beta">(beta)</small></h3>
    <div />
    <FlexContainer align_items="baseline" gap="0.5rem">
      <h1 class="no-margin"><small class="wide">€0</small></h1>
      <h3 class="no-margin oneline mono">/ month</h3>
      <span class="sm oneline">No credit card required!</span>
    </FlexContainer>
    <FlexContainer align_items="baseline" gap="0.5rem">
      <h3 class="no-margin strikethrough wide">€4</h3>
      <h1 class="no-margin beta"><small class="wide">€0</small></h1>
      <h3 class="no-margin oneline mono">/ month</h3>
      <span class="sm oneline beta">Free upgrade during beta!</span>
    </FlexContainer>
    <FlexContainer column align_items="center">
      <hr class="divider sm-v-margin" />
      <h5 class="sm-v-margin">Mail Relay</h5>
    </FlexContainer>
    <FlexContainer column gap="0.5rem">
      <hr class="divider sm-v-margin" />
      <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
        <CheckCircleIcon dimension="25px" /><span><small>Up to 20 Privacy Addresses</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Secure Relay Connections (TLS)</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>SPF, DKIM, and DMARC</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Spam Filtering + Virus Protection</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Zero Trust Deployment</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>In-Memory Email Processing</small></span>
      </GridContainer>
    </FlexContainer>
    <FlexContainer column gap="0.5rem">
      <hr class="divider sm-v-margin" />
      <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
        <CheckCircleIcon dimension="25px" /><span><small><span class="xs strikethrough">Unlimited</span> <strong class="beta">Up to 100</strong> Privacy Addresses</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Up to 5 Personal Accounts</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Email Encryption (PGP or S/MIME)</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Encrypted Outbound Mail <span class="xs beta">(replies only)</span></small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Metadata Leak Protection</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>More Customization</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Priority Support</small></span>
        <CheckCircleIcon dimension="25px" /><span><small><strong>All Basic Protection Features</strong></small></span>
      </GridContainer>
    </FlexContainer>
  </GridContainer>

  <GridContainer template_columns="1fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded onlymobile border>
    <h3 class="no-margin">Basic Protection</h3>
    <FlexContainer align_items="baseline" gap="0.5rem">
      <h1 class="no-margin"><small class="wide">€0</small></h1>
      <h3 class="no-margin oneline mono">/ month</h3>
      <span class="sm oneline">No CC required!</span>
    </FlexContainer>
    <FlexContainer column gap="0.5rem">
      <hr class="divider sm-v-margin" />
      <GridContainer align_items="flex-start" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
        <h5 class="no-margin full-row">Mail Relay</h5>
        <CheckCircleIcon dimension="25px" /><span><small>Up to 20 Privacy Addresses</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Secure Relay Connections (TLS)</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>SPF, DKIM, and DMARC</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Spam Filtering + Virus Protection</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Zero Trust Deployment</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>In-Memory Email Processing</small></span>
      </GridContainer>
    </FlexContainer>
  </GridContainer>

  <GridContainer template_columns="1fr" bgColor="var(--new-layer-color)" color="var(--text-color)" padding="1rem" gap="0.5rem 2rem" rounded onlymobile border>
    <h3 class="no-margin">Enhanced Protection</h3>
    <FlexContainer align_items="baseline" gap="0.5rem">
      <h3 class="no-margin strikethrough wide">€4</h3>
      <h1 class="no-margin beta"><small class="wide">€0</small></h1>
      <h3 class="no-margin oneline mono">/ month</h3>
      <span class="sm oneline beta">during beta!</span>
    </FlexContainer>
    <FlexContainer column gap="0.5rem">
      <hr class="divider sm-v-margin" />
      <GridContainer align_items="center" template_columns="1rem auto" gap="0.5rem 1rem" margin="0px auto auto auto">
        <h5 class="no-margin full-row">Mail Relay</h5>
        <CheckCircleIcon dimension="25px" /><span><small><span class="xs strikethrough">Unlimited</span> <strong class="beta">Up to 100</strong> Privacy Addresses</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Up to 5 Personal Accounts</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Email Encryption (PGP or S/MIME)</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Encrypted Outbound Mail <span class="xs beta">(replies only)</span></small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Metadata Leak Protection</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>More Customization</small></span>
        <CheckCircleIcon dimension="25px" /><span><small>Priority Support</small></span>
        <CheckCircleIcon dimension="25px" /><span><small><strong>All Basic Protection Features</strong></small></span>
      </GridContainer>
    </FlexContainer>
  </GridContainer>

  <FlexContainer justify_content="center">
    <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1.5rem" primary rounded><strong>Create your free account</strong></Button>
  </FlexContainer>
</FlexContainer>

<style>
  .beta {
    color: var(--info-color);
  }

  .strikethrough {
    text-decoration: line-through;
  }

  h3.strikethrough {
    text-decoration-thickness: 0.15rem;
  }

  .wide {
    letter-spacing: calc(var(--wide-letter-spacing) * 2);
  }
</style>
