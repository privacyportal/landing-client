<script>
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
</script>

<GridContainer align_items="start" justify_items="center" template_columns="1fr" padding="0px 4rem" gap="1rem" mobileScale>
  <ExpandableArea title="How does anonymous authentication work?">
    <span
      >Anonymous authentication lets users log in to your app without sharing personal information. We use the latest OAuth 2.1 standard to keep everything secure and locked down. We only require an
      email address on our side — just what’s needed to make it work. And if your app asks for something like an email, we provide a privacy-protected alias that keeps their info safe.</span
    >
  </ExpandableArea>

  <ExpandableArea title="Do users need to create a Privacy Portal account when subscribing anonymously to my newsletter?">
    <span
      >Yes, users need a Privacy Portal account to subscribe anonymously, but don’t worry—it’s free and takes just a moment to set up! This account lets us create a unique email alias for them, so
      they can enjoy your newsletter without revealing their real email. It also helps us route emails smoothly to their personal inbox and keeps everything running seamlessly.</span
    >
  </ExpandableArea>

  <ExpandableArea title="Does using Privacy-Kit on my website enable you to track our users?">
    <span
      >Nope, not at all! When you use Privacy-Kit on your site, you’re in control—you host it yourself or grab it from public CDNs. We don’t host it on our servers, so we can’t peek at your visitors.
      Privacy-Kit only reaches out to us when a user requests something specific, like generating an email alias. Plus, it’s open source, so you’re welcome to check the code and see for yourself how
      it works!</span
    >
  </ExpandableArea>

  <ExpandableArea title="What advantages does Privacy-Kit aliases have over normal Privacy Aliases?">
    <span>Privacy-Kit aliases bring some awesome perks to the table! Check this out:</span>
    <ul>
      <li><strong>No extra setup:</strong> Users can hide their email without downloading apps or extensions.</li>
      <li><strong>Spam shield:</strong> These aliases only accept emails from your registered domain, keeping junk mail at bay.</li>
      <li><strong>Locked down:</strong> Tied to your domain, they can’t be sold or shared with anyone else.</li>
    </ul>
    <span>It’s like a VIP privacy upgrade for your users!</span>
  </ExpandableArea>

  <ExpandableArea title="Do you collect data on users and applications?">
    <span
      >We only hold onto the absolute minimum data needed to keep things running smoothly—nothing more! You and your users stay in the driver’s seat, with the power to delete your data whenever you
      want, just as our Privacy Policy outlines. We’re all about giving you control and peace of mind.</span
    >
  </ExpandableArea>
</GridContainer>
