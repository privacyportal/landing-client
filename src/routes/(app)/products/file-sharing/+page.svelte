<script>
  import SvelteHead from '$lib/components/SvelteHead.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import Button from '$lib/components/common/Button.svelte';
  import TiltEffect from '$lib/components/effects/TiltEffect.svelte';
  import { SIGNUP_URL } from '$lib/modules/constants';
  import AspectRatio from '$lib/components/common/AspectRatio.svelte';
  import CheckCircleIcon from '$lib/components/materialIcons/CheckCircleIcon.svelte';
  import FileSharingInPersonImg from '$lib/components/svgAssets/FileSharingInPersonImg.svelte';
  import FileSharingInStoreImg from '$lib/components/svgAssets/FileSharingInStoreImg.svelte';
  import FileSharingDataProtectedImg from '$lib/components/svgAssets/FileSharingDataProtectedImg.svelte';
  import FileSharingTotalSenderPrivacyImg from '$lib/components/svgAssets/FileSharingTotalSenderPrivacyImg.svelte';
  import FileSharingLinkExpiryImg from '$lib/components/svgAssets/FileSharingLinkExpiryImg.svelte';
  import FileSharingPrintNoSaveImg from '$lib/components/svgAssets/FileSharingPrintNoSaveImg.svelte';
  import fileSharingHero from '$lib/assets/file-sharing-hero.png';
  import fileSharingReceivingFile from '$lib/assets/file-sharing-receiving-file.png';
  import ExpandableArea from '$lib/components/common/ExpandableArea.svelte';
</script>

<SvelteHead>
  <SvelteHead
    title={`File Sharing | Privacy Portal`}
    description={`Share files with complete privacy - no PII, no persistence to disk, end-to-end encryption, direct transfers..`}
    keywords={['privacy portal file sharing', 'e2ee file sharing', 'private file sharing', 'pdf sharing', 'p2p file sharing', 'privacy file sharing', 'anonymous file sharing']}
  />
</SvelteHead>

<FlexContainer id="file-sharing" column textCentered bgColor="var(--primary-color)" color="var(--text-light-color)" padding="6rem 0rem" gap="2rem" mobileScale>
  <h3>Ephemeral, Private, and Secure!</h3>

  <GridContainer align_items="center" template_columns="45% 55%" mobile_template_columns="1fr" gap="3rem 0rem" margin="0">
    <FlexContainer column width="100%" align_items="center" justify_content="center" color="inherit" gap="1rem">
      <FlexContainer column align_items="center" color="inherit" width="max(300px, 85%)" gap="1rem">
        <FlexContainer align_items="baseline" justify_content="center" gap="0.5rem" margin="0">
          <h2 class="no-margin">Secure File Sharing</h2>
        </FlexContainer>
        <p>Share PDF documents peer-to-peer using an E2E encrypted secure link. It does not require any personal information and it’s free to use.</p>
      </FlexContainer>
      <FlexContainer justify_content="center">
        <Button on:click={() => (window.location.href = SIGNUP_URL)} padding="0.7rem 1rem" rounded><strong>Start sharing for free</strong></Button>
      </FlexContainer>
    </FlexContainer>
    <FlexContainer width="100%" align_items="center" justify_content="flex-end" mobile_justify_content="center" padding="0rem 2rem" mobileScale>
      <img class="rounded" width="80%" alt="File Sharing Product" src={fileSharingHero} />
    </FlexContainer>
  </GridContainer>
</FlexContainer>

<FlexContainer column align_items="center" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="6rem 0rem" gap="3rem" mobileScale>
  <FlexContainer column textCentered width="min(90%, 800px)" gap="1rem">
    <h3 class="no-margin">Private by default!</h3>
    <br />
    <p class="no-margin">
      Privacy Portal uses end-to-end encryption for file sharing, ensuring that files are encrypted from your device to the recipient's, without being stored on any servers along the way.
    </p>
    <p class="no-margin">This makes it perfect for securely sharing personal or business documents, especially for printing purposes.</p>
  </FlexContainer>
</FlexContainer>

<GridContainer align_items="start" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" bgColor="var(--primary-color)" color="var(--text-light-color)" padding="3rem" gap="3rem">
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <FileSharingInPersonImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">Private In-Person Sharing</h4>
      <span
        >When you need to send a document in person without disclosing your personal information, Privacy Portal enables you to send an invitation to the recipient's email address or have them scan a
        QR code to start the transfer. This ensures the recipient receives your file in complete privacy.</span
      >
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <FileSharingInStoreImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">Secure In-Shop Printing</h4>
      <span
        >Simply select the shop's email address and initiate sharing. Privacy Portal will send a file sharing invite on your behalf, keeping your personal information confidential. Your document will
        be securely transferred to the shop's device, where it is opened in the browser for printing, ensuring no copies are left on the machine.</span
      >
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded padding="5px 0px">
      <FileSharingDataProtectedImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">Keeps Your Data Protected</h4>
      <span
        >Your files are delivered directly with the intended recipients, leaving no copies on any servers. The transfer occurs over secure, end-to-end encrypted connections, protecting your files from
        data breaches, hacks, and surveillance.</span
      >
    </FlexContainer>
  </FlexContainer>
</GridContainer>

<GridContainer align_items="center" template_columns="50% 50%" mobile_template_columns="1fr" padding="2rem 0rem" margin="0">
  <FlexContainer column align_items="start" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="4rem max(1rem, 5vw)" gap="1.5rem">
    <h4 class="no-margin">We take file security very seriously!</h4>
    <GridContainer align_items="flex-start" template_columns="1rem auto" gap="1.5rem 1rem" margin="0px auto auto auto">
      <CheckCircleIcon dimension="25px" /><span>Files are encrypted on your device with <i>End-to-End Encryption</i> before transfer and only the recipient can decrypt them upon receipt.</span>
      <CheckCircleIcon dimension="25px" /><span
        >Unlike cloud storage solutions, your file is never stored or written to disk on our servers. It is only relayed in its encrypted form through our servers.</span
      >
      <CheckCircleIcon dimension="25px" /><span>Files are shared peer-to-peer, with our servers relaying the encrypted connection to mask your IP.</span>
      <CheckCircleIcon dimension="25px" /><span>File sharing does not require or reveal any of your personal information to the recipient.</span>
      <CheckCircleIcon dimension="25px" /><span>Only your file contents are shared through our services. We do not transfer any personally identifiable metadata like the file name.</span>
      <CheckCircleIcon dimension="25px" /><span>Your file is opened in memory in the recipient's browser, allowing them to read or print the document without saving it to disk.</span>
    </GridContainer>
  </FlexContainer>
  <FlexContainer column width="100%" align_items="center" justify_content="center" mobile_justify_content="center" padding="2rem 0px" nooverflow>
    <TiltEffect width="min(80%, 350px)" transform="translateX(0%) rotateX(5deg) rotateY(-10deg) rotateZ(5deg)" mobileTransform="translateX(0%) rotateX(10deg) rotateY(0deg) rotateZ(0deg)">
      <img class="rounded shadow" width="100%" alt="File Sharing Receiving File Screenshot" src={fileSharingReceivingFile} />
    </TiltEffect>
  </FlexContainer>
</GridContainer>

<GridContainer align_items="start" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" bgColor="var(--primary-color)" color="var(--text-light-color)" padding="3rem" gap="3rem">
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <FileSharingTotalSenderPrivacyImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">Total Sender Privacy</h4>
      <span>Sending a PDF document does not disclose any of your personal information to the recipient. For an enhanced recipient experience, you can use a pseudonym.</span>
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <FileSharingLinkExpiryImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">On-Close Expiry</h4>
      <span>The transfer link expires immediately upon closing the transfer page in your Privacy Portal app. The document isn't stored on servers, making it inaccessible once closed.</span>
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <FileSharingPrintNoSaveImg />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h4 class="no-margin">Print Without Saving</h4>
      <span>The recipient can directly preview and print the PDF document in their browser without saving it to their file system. No application installation or account creation is required.</span>
    </FlexContainer>
  </FlexContainer>
</GridContainer>

<FlexContainer id="faq" column align_items="center" bgColor="var(--landing-outer-bg-color)" color="var(--text-color)" padding="6rem 4rem" gap="4rem" mobileScale>
  <FlexContainer textCentered align_items="center" justify_content="center" padding="0" margin="0">
    <h2 class="no-margin">Frequently Asked Questions</h2>
  </FlexContainer>

  <GridContainer align_items="start" justify_items="center" template_columns="1fr" gap="1rem">
    <ExpandableArea title="How can I share a file using Privacy Portal?">
      <span
        >Privacy Portal enables you to share files with complete privacy. Within the app, select the PDF you want to share, enter the recipient's email, and Privacy Portal will send them a sharing
        invitation link. Once they open the link, an end-to-end encrypted connection is established, ensuring secure file transfer.</span
      >
      <span
        >On Android devices, you can initiate sharing without even opening the app. Simply select a PDF, tap the share button, and choose Privacy Portal from the list of apps. This will directly take
        you to the file sharing interface.</span
      >
    </ExpandableArea>

    <ExpandableArea title="What file types does Privacy Portal support?">
      <span
        >For maximum privacy, we exclusively support PDF files. PDFs allow us to guarantee that shared files can be viewed in the recipient's browser without being saved to their local system.
        Moreover, PDFs offer enhanced security features; you can encrypt the document and protect it with a password before sharing.</span
      >
      <span>Keep in mind, any document or image can be converted to PDF, making it an ideal format for secure sharing.</span>
    </ExpandableArea>

    <ExpandableArea title="What's the largest file size I can share with Privacy Portal?">
      <span>Currently, we limit file sizes to 30MB, ensuring that recipients can open files in-memory across all devices without any issues.</span>
      <span>If you encounter difficulties due to this size restriction, please share your use case with our support team.</span>
    </ExpandableArea>

    <ExpandableArea title="Who can receive files via File Transfer?">
      <span>Anyone can receive files. The transfer happens directly in the browser, requiring no app installation or account creation.</span>
    </ExpandableArea>

    <ExpandableArea title="Is file sharing free for everyone on Privacy Portal?">
      <span>Yes, file sharing is free for all users, but there are limits on file size and the number of daily transfers.</span>
    </ExpandableArea>
  </GridContainer>
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
