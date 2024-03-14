<script>
  import { goto } from '$app/navigation';
  import screenshotDesktop from '$lib/assets/mail-relay-desktop-screenshot.png';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import Octocat from '$lib/components/brandIcons/Octocat.svelte';
  import XLogo from '$lib/components/brandIcons/XLogo.svelte';
  import AspectRatio from '$lib/components/common/AspectRatio.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Transform from '$lib/components/common/Transform.svelte';
  import CheckIcon from '$lib/components/materialIcons/CheckIcon.svelte';
  import Logo from '$lib/components/svg/Logo.svelte';
  import Portal from '$lib/components/svg/Portal.svelte';
  import AnyClientImg from '$lib/components/svgAssets/AnyClientImg.svelte';
  import AnyPlatformImg from '$lib/components/svgAssets/AnyPlatformImg.svelte';
  import AnyProvidersImg from '$lib/components/svgAssets/AnyProvidersImg.svelte';
  import EliminateSpam from '$lib/components/svgAssets/EliminateSpam.svelte';
  import EncryptMsgImg from '$lib/components/svgAssets/EncryptMsgImg.svelte';
  import HideEmailImg from '$lib/components/svgAssets/HideEmailImg.svelte';
  import config from '$lib/modules/config';
  import { SIGNUP_URL } from '$lib/modules/constants';
  import Pricing from './Pricing.svelte';

  export let meta = config.meta;

  let carousselItems = [
    {
      iconColor: 'var(--danger-color)',
      background: 'linear-gradient(140deg, #f1f1f1 0%, #ccc 100%)',
      label: 'Gym Membership',
      address: 'privacy-address-03@pportal.io',
      transform: 'translateY(0%) scale(0.4)',
      opacity: '0.3'
    },
    {
      iconColor: 'var(--warning-color)',
      background: 'linear-gradient(140deg, #f1f1f1 0%, #ccc 100%)',
      label: 'Online Shopping',
      address: 'privacy-address-02@pportal.io',
      transform: 'translateY(33%) scale(0.7)',
      opacity: '0.8'
    },
    {
      iconColor: 'var(--positive-color)',
      background: 'linear-gradient(140deg, #f1f1f1 0%, #ccc 100%)',
      label: 'Newsletter',
      address: 'regina-phalange-OO@pportal.io',
      transform: 'translateY(80%) scale(1)',
      opacity: '1'
    }
  ];
</script>

<SvelteHead>
  <JsonLd
    data={{
      '@type': 'WebSite',
      name: meta.title,
      url: `https://${meta.site_name}`,
      sameAs: [`https://${meta.site_name_alias}`, `https://twitter.com/${meta.twitter}`, `https://github.com/${meta.github}`]
    }}
  />
  <JsonLd
    data={{
      '@type': 'Organization',
      '@id': `https://${meta.site_name}`,
      name: meta.title,
      description: meta.description,
      url: `https://${meta.site_name}`,
      logo: {
        '@type': 'ImageObject',
        url: meta.image,
        width: 256,
        height: 256
      },
      sameAs: [`https://${meta.site_name_alias}`, `https://twitter.com/${meta.twitter}`, `https://github.com/${meta.github}`]
    }}
  />
</SvelteHead>

<FlexContainer
  height="100vh"
  column
  textCentered
  bgColor="var(--primary-color)"
  color="var(--text-light-color)"
  align_items="center"
  justify_content="center"
  padding="4rem 3rem"
  gap="1rem"
  relative
  nooverflowX
  nooverflowY
>
  <h1>Privacy Portal</h1>
  <div>
    <div class="portal-layer">
      <Portal dimension="100vh" animated={true} animation_delay="0.3s" />
    </div>
  </div>

  <p>Your Gateway To Online Privacy.</p>

  <a class="section-footer" href="#learn-more">
    <p>learn more</p>
  </a>
</FlexContainer>

<FlexContainer id="learn-more" column color="var(--text-color)" align_items="center" justify_content="start" padding="6rem 4rem" gap="4rem" mobileScale>
  <FlexContainer column textCentered gap="1rem">
    <h2 class="no-margin">Software you can trust</h2>
    <h4 class="no-margin">(and verify)</h4>
  </FlexContainer>
  <GridContainer align_items="stretch" justify_items="stretch" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" margin="0" gap="1rem">
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Open Source</h4>
        <span class="sm">Our clients are FOSS and more contributions will follow. Stay tuned!</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Transparent Pricing</h4>
        <span class="sm">Simple, fair, and sustainable business model with no hidden fees.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Reliable Jurisdictions</h4>
        <span class="sm">We only use juridictions renowned for internet freedoms and strict privacy laws.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" justify_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Strict Privacy Policy</h4>
        <span class="sm">We minimize personal information use to the strictest minimum required to operate.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">No Logging</h4>
        <span class="sm">We do not store, log, nor share your usage data with anyone.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">No Tracking</h4>
        <span class="sm">We do not track you nor do we sell your data in any way shape or form.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Indie Software</h4>
        <span class="sm">We are a privately owned business with a small team of developers and no external influence.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Privacy Advocates</h4>
        <span class="sm">We first build our products to protect ourselves, our families, and our friends.</span>
      </FlexContainer>
    </GridContainer>
    <GridContainer height="auto" align_items="start" template_columns="30px auto" gap="0.5rem" padding="1rem" margin="0" rounded border nomobile>
      <CheckIcon dimension="30px" />
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Experienced Developers</h4>
        <span class="sm">In previous lives, we led engineering efforts on popular big tech products.</span>
      </FlexContainer>
    </GridContainer>
  </GridContainer>
</FlexContainer>

<FlexContainer id="mail-relay" column bgColor="var(--primary-color)" color="var(--text-light-color)">
  <FlexContainer column textCentered color="inherit" padding="6rem 0rem" gap="4rem" mobileScale>
    <h3 class="no-margin">Privacy for your email</h3>

    <GridContainer align_items="center" template_columns="45% 55%" mobile_template_columns="1fr" gap="3rem 0rem" margin="0">
      <FlexContainer column width="100%" align_items="center" justify_content="center" color="inherit" gap="1rem">
        <FlexContainer column align_items="center" color="inherit" width="max(300px, 85%)" gap="1rem">
          <FlexContainer align_items="baseline" justify_content="center" gap="0.5rem" margin="0">
            <h2 class="no-margin">Mail Relay</h2>
            <div style="position: relative;">
              <h4 class="no-margin" style="position: absolute; top: -0.7rem;">
                <small>(beta)</small>
              </h4>
            </div>
          </FlexContainer>
          <p>Anonymously send and receive emails straight from your personal email.</p>
        </FlexContainer>
        <FlexContainer justify_content="center">
          <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Create a free account</strong></Button>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer width="100%" align_items="center" justify_content="flex-end" mobile_justify_content="center">
        <img class="rounded shadow" width="80%" alt="Mail Relay Desktop Product Screenshot" src={screenshotDesktop} />
      </FlexContainer>
    </GridContainer>
  </FlexContainer>

  <GridContainer align_items="start" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" bgColor="var(--new-layer-x2-color)" color="inherit" padding="3rem" gap="3rem">
    <FlexContainer align_items="center" justify_content="center" column gap="1rem">
      <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, #f1f1f1 0%, #bbb 100%)" nooverflow rounded padding="0.5rem 0 0.5rem 0.5rem">
        <HideEmailImg />
      </AspectRatio>
      <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
        <h4 class="no-margin">Hide your email</h4>
        <span>Our "Privacy Addresses" can replace your personal email address for most interactions thus keeping your identity hidden.</span>
      </FlexContainer>
    </FlexContainer>
    <FlexContainer align_items="center" justify_content="center" column gap="1rem">
      <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, #f1f1f1 0%, #bbb 100%)" nooverflow rounded padding="0px min(25%, 5rem)">
        <EncryptMsgImg color="#404040" />
      </AspectRatio>
      <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
        <h4 class="no-margin">Encrypt your messages</h4>
        <span>Mail Relay allows you to encrypt all inbound and outbound mail making it unreadable by your email provider.</span>
      </FlexContainer>
    </FlexContainer>
    <FlexContainer align_items="center" justify_content="center" column gap="1rem">
      <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, #f1f1f1 0%, #bbb 100%)" nooverflow rounded padding="0.5rem">
        <EliminateSpam />
      </AspectRatio>
      <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
        <h4 class="no-margin">Eliminate Spam</h4>
        <span>With Privacy Addresses, stopping unsollicited mail is one click away.</span>
      </FlexContainer>
    </FlexContainer>
  </GridContainer>

  <FlexContainer column color="inherit" padding="6rem 4rem" gap="4rem" mobileScale>
    <FlexContainer column textCentered padding="0 min(3rem, 3%)">
      <h3 class="no-margin">When to use Mail Relay?</h3>
      <p class="compact">
        <small
          >You can use Mail Relay whenever you are required to share your email address with a third party. Its Privacy Addresses allow you to reduce your digital footprint, enhance your security, and
          give you unmatched spam protection.</small
        >
      </p>
    </FlexContainer>
    <GridContainer align_items="start" justify_items="start" template_columns="1fr 1fr 1.5fr" mobile_template_columns="1fr" gap="2.5rem 5%">
      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflow>
        <h4 class="no-margin"><small>When registering on apps</small></h4>
        <span class="sm"
          >Using Privacy Addresses when registering for new online accounts complicates the task for entities attempting to profile you. Matching your email address across accounts becomes impossible
          and less reliable techniques would have to be used.</span
        >
      </FlexContainer>
      <FlexContainer align_items="flex-start" justify_content="flex-start" column gap="0.5rem" nooverflow>
        <h4 class="no-margin"><small>When enrolling for newsletters</small></h4>
        <span class="sm"
          >With Mail Relay, subscribing to newsletters becomes an easy decision. If not satisfied by the content, you get the power to revoke access to your email at any time by deactivating the
          Privacy Address in question.</span
        >
      </FlexContainer>

      <FlexContainer extraStyle="grid-row-end: span 2; align-self: center;" height="300px" width="100%" align_items="center" justify_content="center">
        <div class="caroussel">
          {#each carousselItems as { iconColor, background, label, address, transform, opacity }}
            <Transform globalClass={['shadow', 'rounded']} {transform} {opacity} {background}>
              <FlexContainer globalClass={['unselectable']} width="100%" column align_items="flex-start" color="var(--text-color)" padding="0.5rem" gap="0.65rem">
                <GridContainer align_items="start" justify_items="start" template_columns="50px 1fr" gap="0.5rem">
                  <FlexContainer height="50px" width="50px" align_items="center" justify_content="center" bgColor={iconColor} color="white" rounded>
                    <h4 class="no-margin oneline">{label.substring(0, 1)}</h4>
                  </FlexContainer>
                  <h4 class="no-margin oneline"><small>{label}</small></h4>
                </GridContainer>
                <hr class="divider no-margin" />
                <h5 class="no-margin oneline">Privacy Address</h5>
                <FlexContainer column justify_content="start" bgColor="#eee" color="var(--text-color)" padding="0.5rem 0.5rem 0.5rem 0.5rem" rounded>
                  <h5 class="no-margin mono oneline">{address}</h5>
                </FlexContainer>
              </FlexContainer>
            </Transform>
          {/each}
        </div>
      </FlexContainer>

      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflow>
        <h4 class="no-margin"><small>When your provider is intrusive</small></h4>
        <span class="sm"
          >Unfortunately, many email providers have little regard for your privacy. With Mail Relay, you can encrypt both inbound and outbound mail, thus protecting your data against indexing and
          abuse.</span
        >
      </FlexContainer>
      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflow>
        <h4 class="no-margin"><small>When filling out forms</small></h4>
        <span class="sm"
          >After completing a form, one typically expects to be contacted only a few times. So why provide your permanent, easily traceable, and identifiable email address for such a temporary
          purpose?</span
        >
      </FlexContainer>
    </GridContainer>
  </FlexContainer>

  <FlexContainer column align_items="stretch" justify_content="center" bgColor="var(--new-layer-x2-color)" color="inherit" padding="6rem 4rem" gap="4rem" mobileScale>
    <FlexContainer align_items="center" justify_content="center" padding="0">
      <h3 class="no-margin"><small>Available Everywhere!</small></h3>
    </FlexContainer>

    <GridContainer align_items="start" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" gap="4rem" mobileScale>
      <FlexContainer align_items="center" justify_content="center" column gap="1rem" mobileScale>
        <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
          <AnyProvidersImg />
        </AspectRatio>
        <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
          <h4 class="no-margin"><small>Any Email Provider</small></h4>
          <span>Mail Relay is compatible with all standard email providers. You don't need a special email account to use it.</span>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer align_items="center" justify_content="center" column gap="1rem" mobileScale>
        <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(197 219 240) 0%, rgb(97 148 190) 100%)" nooverflow rounded>
          <AnyPlatformImg />
        </AspectRatio>
        <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
          <h4 class="no-margin"><small>Any Platform</small></h4>
          <span>Our Web App relies on open web standards and can be used in the browser or installed as an app on your device.</span>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer align_items="center" justify_content="center" column gap="1rem" mobileScale>
        <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(197 219 240) 0%, rgb(97 148 190) 100%)" nooverflow rounded>
          <AnyClientImg />
        </AspectRatio>
        <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
          <h4 class="no-margin"><small>Any Email Client</small></h4>
          <span>You can use your preferred email App (e.g. Apple Mail, Thunderbird, K-9 Mail, ...). Web clients are also supported.</span>
        </FlexContainer>
      </FlexContainer>
    </GridContainer>
  </FlexContainer>

  <FlexContainer column color="inherit" padding="6rem 4rem" gap="4rem" mobileScale>
    <FlexContainer column textCentered padding="0 10%">
      <h3 class="no-margin">Mail Relay is better for your privacy</h3>
      <p class="compact">
        <small>At Privacy Portal, we build privacy-first products. We design our software from the ground up ensuring that every feature aligns with our privacy goals.</small>
      </p>
    </FlexContainer>

    <GridContainer align_items="start" justify_items="center" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" gap="1rem 2rem">
      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Modern Architecture">
        <span class="unselectable">We custom designed every part of our infrastructure. We followed security best practices and built our systems from the ground up using modern technologies.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Privacy By Default">
        <span class="unselectable">No need to spend time tweaking the settings to improve your privacy. All the features we ship are already designed for your liking.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Minimal Data Policy">
        <span class="unselectable">All we need is an email address to start relaying your emails. We do not require nor store any of your personal information.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="No Email Storage">
        <span class="unselectable">Emails relayed through Mail Relay are processed in-memory and are never written to disk. We never store nor log your emails.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Zero Trust Deployment">
        <span class="unselectable">All our servers use full disk encryption. All internal and external connections are TLS encrypted. Our backups are also encrypted.</span>
        <span class="unselectable">We do not use any external mailing service for sending emails.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Zero Access Encryption">
        <span class="unselectable">When enabled, Mail Relay encrypts your emails with your public PGP key. Only you can decrypt your emails on-device.</span>
        <span class="unselectable">With our S/MIME support, You can still benefit from email encryption even if your email client does not support PGP. (e.g. Apple Mail)</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Encryption Kill Switch">
        <span class="unselectable">When enabled, Mail Relay rejects all emails if encryption is not possible. (For example, when your encryption key expires.)</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="Metadata Leak Protection">
        <span class="unselectable">Mail Relay protects you against Metadata Leaks, such as IP address leaks, when sending outbound mail.</span>
      </ExpandableArea>

      <ExpandableArea bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" title="SMTP over TLS">
        <span class="unselectable"
          >Mail Relay strictly enforces TLS encryption on inbound and outbound connections. This makes it more difficult for attackers from intercepting your emails while in transit.</span
        >
      </ExpandableArea>
    </GridContainer>
  </FlexContainer>
</FlexContainer>

<Pricing />

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
    <Button on:click={() => goto('/support#faq')} margin="1rem 0 0 0" padding="0.7rem 1rem" basic rounded><strong>More FAQs</strong></Button>
  </GridContainer>
</FlexContainer>

<FlexContainer column bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="6rem 4rem" gap="4rem" mobileScale nooverflow>
  <Logo dimension="min(15rem, 60%)" />
  <FlexContainer column align_items="center" gap="1rem" mobileScale>
    <p class="no-margin">Follow us</p>
    <GridContainer justify_items="stretch" width="max(170px, 15%)" template_columns="1fr" gap="0.5rem">
      <a class="social-btn" href="https://twitter.com/Privacy_Portal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <XLogo dimension="1rem" color="#fff" />
          <h6 class="mono no-margin">@Privacy_Portal</h6>
        </FlexContainer>
      </a>

      <a class="social-btn" href="https://github.com/privacyportal">
        <FlexContainer height="33.5px" align_items="center" justify_content="center" bgColor="#444" padding="0rem 0.7rem" gap="0.3rem" rounded>
          <Octocat dimension="1.25rem" dark={false} />
          <h6 class="mono no-margin">@privacyportal</h6>
        </FlexContainer>
      </a>
    </GridContainer>
  </FlexContainer>
</FlexContainer>

<style>
  .section-footer {
    position: absolute;
    bottom: 1rem;
  }

  h1 {
    font-size: 4rem;
    font-weight: 900;
    white-space: nowrap;
  }

  h2 {
    font-size: 3rem;
    font-weight: 900;
  }

  h3 {
    font-size: 2rem;
    font-weight: 900;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 900;
  }

  a {
    color: inherit;
  }

  p {
    margin-top: 1rem;
    font-size: 1.38rem;
    font-weight: 300;
    line-height: 2rem;
  }

  p.compact {
    line-height: normal;
  }

  .portal-layer {
    position: absolute;
    top: 0px;
    left: calc(50vw - 50vh);
  }

  .caroussel {
    height: 100%;
    width: min(320px, 100%);
    position: relative;
  }

  a.social-btn {
    text-decoration: none;
  }

  a.social-btn:hover {
    transition: 0.3s;
    filter: brightness(110%);
  }

  @media screen and (max-width: 979px) {
    h1 {
      font-size: max(6vw, 30px);
    }

    h2 {
      font-size: max(4.5vw, 25px);
    }

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
