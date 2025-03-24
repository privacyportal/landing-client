<script>
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import MultiCards from '$lib/components/common/MultiCards.svelte';
  import OidcBagde from '$lib/components/svgAssets/OidcBagde.svelte';

  let multiCardSeletectedIndex = 0;

  const OIDC_CARD_DATA = [
    {
      title: 'Sandboxed Client Spaces',
      text: 'User IDs provided at login are unique to each application. Users cannot be tracked across apps using Privacy Portal identifiers, as each client has its own distinct user ID.'
    },
    {
      title: 'Privacy Email Aliases',
      text: 'Personal emails get automatically substituted with Privacy Aliases. These aliases only accept emails from your registered domains, effectively blocking any unsolicited mail.'
    },
    {
      title: 'Pseudonym Support',
      text: 'If your application requires user names, Privacy Portal prompts users to enter pseudonyms instead, ensuring a more anonymous and secure user experience.'
    }
  ];
</script>

<FlexContainer width="100%" align_items="center" justify_content="center" padding="3rem">
  <GridContainer width="min(100%, 1000px)" align_items="center" justify_items="center" template_columns="repeat(2, 1fr)" mobile_template_columns="1fr" gap="3rem">
    <FlexContainer globalClass={['shadow']} width="min(100%, 500px)" bgColor="#00000000" rounded>
      <OidcBagde selected={multiCardSeletectedIndex} />
    </FlexContainer>
    <MultiCards width="min(100%, 500px)" size={OIDC_CARD_DATA.length} bind:selected={multiCardSeletectedIndex}>
      <FlexContainer height="100%" align_items="top" justify_content="start" bgColor="var(--new-layer-color)" column padding="2rem" gap="1rem" border rounded>
        <h4 class="no-margin">{OIDC_CARD_DATA[multiCardSeletectedIndex].title}</h4>
        <span>{OIDC_CARD_DATA[multiCardSeletectedIndex].text}</span>
      </FlexContainer>
    </MultiCards>
  </GridContainer>
</FlexContainer>
