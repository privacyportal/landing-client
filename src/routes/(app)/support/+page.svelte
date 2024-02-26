<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/common/Button.svelte';
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ChevronLeftIcon from '$lib/components/materialIcons/ChevronLeftIcon.svelte';
  import { DOMAIN, SIGNUP_URL } from '$lib/modules/constants';

  const TUTORIALS = [
    {
      category: 'Account Management',
      tutorials: [
        {
          title: 'How to upgrade your account to Enhanced Protection',
          url: '/blog/how-to-upgrade-to-enhanced-protection'
        },
        { title: 'How to sign in on a new device', url: '/blog/how-to-sign-in-on-a-new-device' },
        { title: 'How to delete your account', url: '/blog/how-to-delete-your-account' }
      ]
    },
    {
      category: 'Email Management',
      tutorials: [
        { title: 'Getting started with Mail Relay', url: '/blog/getting-started-with-mail-relay' },
        {
          title: 'How to create your first Privacy Address',
          url: '/blog/how-to-create-your-first-privacy-address'
        },
        {
          title: 'How to deactivate or delete a Privacy Address',
          url: '/blog/how-to-deactivate-a-privacy-address'
        },
        {
          title: 'How to privately reply to an email',
          url: '/blog/how-to-privately-reply-to-an-email'
        },
        {
          title: 'How to keep Mail Relay emails out of your spam folder',
          url: '/blog/how-to-keep-mail-relay-emails-out-of-your-spam-folder'
        }
      ]
    },
    {
      category: 'Encryption Setup',
      tutorials: [
        { title: 'How to set up PGP encryption', url: '/blog/how-to-set-up-pgp-encryption' },
        { title: 'How to set up S/MIME encryption', url: '/blog/how-to-set-up-smime-encryption' },
        {
          title: 'How to update your Encryption Profile',
          url: '/blog/how-to-update-your-encryption-profile'
        },
        {
          title: 'S/MIME encryption with Mail Relay',
          url: '/blog/smime-encryption-with-mail-relay'
        }
      ]
    }
  ];
</script>

<FlexContainer column bgColor="var(--primary-color)" color="var(--text-light-color)" align_items="center" justify_content="center" padding="50px 0 0 0">
  <FlexContainer column align_items="center" justify_content="center" padding="4rem" gap="4rem" mobileScale>
    <FlexContainer column width="50%" align_items="center" justify_content="center" color="inherit" gap="3rem">
      <FlexContainer column align_items="center" textCentered color="inherit" width="max(300px, 90%)" gap="1rem">
        <h1 class="no-margin"><small>Mail Relay Tutorials</small></h1>
        <span>Learn how to use the different features with our collection of tutorials.</span>
      </FlexContainer>
    </FlexContainer>

    <GridContainer align_items="start" justify_items="center" template_columns="1fr 1fr 1fr" mobile_template_columns="1fr" padding="0px max(1rem, 5vw)" gap="1.5rem">
      {#each TUTORIALS as { category, tutorials }}
        <FlexContainer column align_items="start" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" border rounded nooverflowX nooverflowY>
          <FlexContainer padding="0rem 1rem">
            <h3>{category}</h3>
          </FlexContainer>
          <hr class="divider no-margin" />
          {#each tutorials as { title, url }}
            <Button on:click={() => goto(url)} width="100%" height="100%" padding="0.7rem 0.2rem 0.7rem 1rem" blendin>
              <GridContainer align_items="center" justify_items="start" template_columns="auto 30px" gap="0.5rem">
                <h5 class="left-align no-margin">{title}</h5>
                <ChevronLeftIcon dimension="30px" right />
              </GridContainer>
            </Button>
          {/each}
        </FlexContainer>
      {/each}
    </GridContainer>

    <FlexContainer column align_items="center" justify_content="center" gap="1rem">
      <h3 class="sm-v-margin">Don't have an account yet?</h3>
      <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Create your free account</strong></Button>
    </FlexContainer>
  </FlexContainer>
</FlexContainer>

<FlexContainer id="faq" column align_items="center" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="6rem 4rem" gap="4rem" mobileScale>
  <FlexContainer textCentered align_items="center" justify_content="center" padding="0" margin="0">
    <h2 class="no-margin">Frequently Asked Questions</h2>
  </FlexContainer>

  <GridContainer align_items="start" justify_items="center" template_columns="1fr" gap="1rem">
    <ExpandableArea title="What is Mail Relay?">
      <span
        >Mail Relay is Privacy Portal's email privacy service. It enables you to hide your personal email from third-parties, thus protecting your identity online and helping you reduce your digital
        footprint.</span
      >
      <span
        >After creating your free account using your personal email, you can easily create “Privacy Addresses” that forward emails to your personal inbox. These addresses are safe to share with
        third-parties and can be disabled at any point in time, giving you full control over spam and unsolicited mail.</span
      >
      <span
        >With Enhanced Protection, you can also protect your emails from prying eyes. It allows you to encrypt all incoming mail before relaying it to your personal email. Your email provider will no
        longer have the ability to read your emails. Only you can decrypt emails on-device, protecting you from being a target for advertisers and data brokers.</span
      >
      <span><a href={SIGNUP_URL}>Create your free account</a> today!</span>
    </ExpandableArea>
    <ExpandableArea title="Why hide your personal email?">
      <span
        >Your personal email is considered as "Personally Identifiable Information". It can easily be linked to your identity. Using the same email address for all your accounts makes it extremely
        easy for advertisers, data brokers, and governments to connect your accounts and aggregate your data to profile you. Using unique addresses for every service shrinks your digital footprint and
        makes you a smaller target.</span
      >
      <span
        >From a security perspective, using different email addresses for different services helps protect you against data breaches and "Credential Stuffing" attacks. Due to the increasing amount of
        data breaches, stolen user credentials are becoming easy to purchase on the dark web. Using unique email addresses immediately protects you from these types of attacks.</span
      >
    </ExpandableArea>
    <ExpandableArea title="How can I get a Privacy Address?">
      <span
        >Start by creating your free account by signing up with your personal email address. Once logged in, you can press on 'New Address' and automatically a unique “Privacy Address” gets generated
        for you. All that's left is to label it to quickly identify its purpose in the future.</span
      >
      <span>With Enhanced Protection, you get full control over Privacy Addresses.</span>
    </ExpandableArea>
    <ExpandableArea title="How secure is Mail Relay?">
      <span
        >We follow security best practices at every step of the way. We minimize the use of user data to the strictest minimum. Security and privacy are our top priorities when designing new features.
        We use passwordless authentication to protect our customers from a whole range of threats such as phishing and credential theft. We use zero-trust deployments for our services. We encrypt all
        internal and external data whether in-transit or at-rest. We leverage modern encryption algorithms such as Elliptic Curve Cryptography.</span
      >
    </ExpandableArea>
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
    <ExpandableArea title="What data is encrypted by Mail Relay?">
      <span>Mail Relay enforces TLS encryption to all incoming and outgoing connections. If an email provider does not support TLS encryption, the emails won't be accepted.</span>
      <span
        >With Enhanced Protection, Mail Relay encrypts all inbound mail upon reception before relaying it to the receiver's email provider. For email replies, encrypted emails get decrypted by Mail
        Relay before getting relayed to the destination. This means your email provider will not be able to access the contents of the relayed emails. The 3rd party email provider will have the
        ability to see the contents of the emails but will not be able to link it to your personal email address.</span
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
    <ExpandableArea title="How do I report spam?">
      <span
        >To help us increase email deliverability to your inbox, please <strong>do not</strong> "mark as spam" any emails relayed to you by Mail Relay. We work hard to prevent any spam from reaching your
        inbox. But in case one of the online services you registered to is spamming you, you can simply deactivate the corresponding "Privacy Address".</span
      >
    </ExpandableArea>
    <ExpandableArea title="Why are emails going to the spam folder?">
      <span>It is possible for your email provider to flag emails from unknown or new addresses as spam. If that happens, you should mark these emails as not spam (or move them to your inbox).</span>
      <span
        >To make sure you always receive emails to your inbox, you can configure your filters to mark all emails from our domains as "not spam". <a
          href="/blog/how-to-keep-mail-relay-emails-out-of-your-spam-folder">learn more</a
        >.</span
      >
    </ExpandableArea>
    <ExpandableArea title="Where are your servers located?">
      <span>Our servers are currently hosted in Switzerland, one of the best jurisdictions for online privacy and internet freedoms.</span>
      <span>More privacy friendly jurisdictions could be used in the future.</span>
    </ExpandableArea>
  </GridContainer>

  <FlexContainer column align_items="center" gap="0.5rem">
    <h5 class="no-margin">Didn't find your answer?</h5>
    <Button on:click={() => (window.location.href = `https://community.${DOMAIN}`)} margin="1rem 0 0 0" padding="0.7rem 1rem" basic rounded><strong>Ask the Community</strong></Button>
  </FlexContainer>
</FlexContainer>

<style>
  .left-align {
    text-align: left;
  }
</style>
