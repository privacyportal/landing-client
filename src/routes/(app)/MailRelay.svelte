<script>
  import Chrome from '$lib/components/brandIcons/Chrome.svelte';
  import Firefox from '$lib/components/brandIcons/Firefox.svelte';
  import Pwa from '$lib/components/brandIcons/PWA.svelte';
  import AspectRatio from '$lib/components/common/AspectRatio.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Transform from '$lib/components/common/Transform.svelte';
  import AnyClientImg from '$lib/components/svgAssets/AnyClientImg.svelte';
  import AnyPlatformImg from '$lib/components/svgAssets/AnyPlatformImg.svelte';
  import AnyProvidersImg from '$lib/components/svgAssets/AnyProvidersImg.svelte';
  import EliminateSpam from '$lib/components/svgAssets/EliminateSpam.svelte';
  import EncryptMsgImg from '$lib/components/svgAssets/EncryptMsgImg.svelte';
  import HideEmailImg from '$lib/components/svgAssets/HideEmailImg.svelte';
  import { APP_ENDPOINT, CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL, SIGNUP_URL } from '$lib/modules/constants';
  import SideBySide from './SideBySide.svelte';
  import screenshotDesktop from '$lib/assets/mail-relay-desktop-screenshot.png';
  import TiltEffect from '$lib/components/effects/TiltEffect.svelte';

  const carousselItems = [
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
        <TiltEffect width="100%" transform="translateX(-3%) rotateX(3deg) rotateY(-10deg) rotateZ(3deg)" mobileTransform="translateX(0%) rotateX(7deg) rotateY(0deg) rotateZ(0deg)">
          <img class="rounded shadow" width="80%" alt="Mail Relay Desktop Product Screenshot" src={screenshotDesktop} />
        </TiltEffect>
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
        <span>Our "Privacy Aliases" can replace your personal email address for most interactions thus keeping your identity hidden.</span>
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
        <span>With Privacy Aliases, stopping unsolicited mail is one click away.</span>
      </FlexContainer>
    </FlexContainer>
  </GridContainer>

  <FlexContainer column color="inherit" padding="6rem 4rem" gap="4rem" mobileScale>
    <FlexContainer column textCentered padding="0 min(3rem, 3%)">
      <h3 class="no-margin">When to use Mail Relay?</h3>
      <p class="compact">
        <small
          >You can use Mail Relay whenever you are required to share your email address with a third party. Its Privacy Aliases allow you to reduce your digital footprint, enhance your security, and
          give you unmatched spam protection.</small
        >
      </p>
    </FlexContainer>
    <GridContainer align_items="start" justify_items="start" template_columns="1fr 1fr 1.5fr" mobile_template_columns="1fr" gap="2.5rem 5%">
      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflowX nooverflowY>
        <h4 class="no-margin"><small>When registering on apps</small></h4>
        <span class="sm"
          >Using Privacy Aliases when registering for new online accounts complicates the task for entities attempting to profile you. Matching your email address across accounts becomes impossible
          and less reliable techniques would have to be used.</span
        >
      </FlexContainer>
      <FlexContainer align_items="flex-start" justify_content="flex-start" column gap="0.5rem" nooverflowX nooverflowY>
        <h4 class="no-margin"><small>When enrolling for newsletters</small></h4>
        <span class="sm"
          >With Mail Relay, subscribing to newsletters becomes an easy decision. If not satisfied by the content, you get the power to revoke access to your email at any time by deactivating the
          Privacy Alias in question.</span
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
                <h5 class="no-margin oneline">Privacy Alias</h5>
                <FlexContainer column justify_content="start" bgColor="#eee" color="var(--text-color)" padding="0.5rem 0.5rem 0.5rem 0.5rem" rounded>
                  <h5 class="no-margin mono oneline">{address}</h5>
                </FlexContainer>
              </FlexContainer>
            </Transform>
          {/each}
        </div>
      </FlexContainer>

      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflowX nooverflowY>
        <h4 class="no-margin"><small>When your provider is intrusive</small></h4>
        <span class="sm"
          >Unfortunately, many email providers have little regard for your privacy. With Mail Relay, you can encrypt both inbound and outbound mail, thus protecting your data against indexing and
          abuse.</span
        >
      </FlexContainer>
      <FlexContainer align_items="flex-start" column gap="0.5rem" nooverflowX nooverflowY>
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

    <FlexContainer align_items="center" justify_content="center">
      <GridContainer width="auto" align_items="stretch" justify_items="stretch" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" gap="1rem" mobileScale>
        <Button height="40px" width="100%" on:click={() => window.open(APP_ENDPOINT, '_blank')} dark border rounded padding="0.3rem 1rem" flexgrow
          ><Pwa dimension="45px" /> <small>Web Application</small></Button
        >
        <Button height="40px" width="100%" on:click={() => window.open(CHROME_EXTENSION_URL, '_blank')} dark border rounded padding="0.3rem 1rem" flexgrow
          ><Chrome dimension="25px" /> <small>Chrome Extension</small></Button
        >
        <Button height="40px" width="100%" on:click={() => window.open(FIREFOX_EXTENSION_URL, '_blank')} dark border rounded padding="0.3rem 1rem"
          ><Firefox dimension="25px" /> <small>Firefox Extension</small></Button
        >
      </GridContainer>
    </FlexContainer>
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

    <SideBySide />
  </FlexContainer>
</FlexContainer>

<style>
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

  p {
    margin-top: 1rem;
    font-size: 1.38rem;
    font-weight: 300;
    line-height: 2rem;
  }

  p.compact {
    line-height: normal;
  }

  .caroussel {
    height: 100%;
    width: min(320px, 100%);
    position: relative;
  }

  @media screen and (max-width: 979px) {
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
