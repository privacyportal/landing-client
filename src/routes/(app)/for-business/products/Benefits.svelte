<script>
  import AspectRatio from '$lib/components/common/AspectRatio.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import AttractUsers from '$lib/components/svgAssets/AttractUsers.svelte';
  import ImproveCompliance from '$lib/components/svgAssets/ImproveCompliance.svelte';
  import PiiFreeService from '$lib/components/svgAssets/PIIFreeService.svelte';
</script>

<GridContainer align_items="start" template_columns="repeat(3, 1fr)" mobile_template_columns="1fr" padding="0px 3rem" gap="3rem">
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <PiiFreeService />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h3 class="no-margin">Prioritize Privacy</h3>
      <span>Show users you value their data. Why ask for their personal information when there's a better way?</span>
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <AttractUsers />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h3 class="no-margin">Attract privacy-focused users</h3>
      <span>Providing a privacy-friendly option removes the hestitation on new accounts registrations and newsletter enrollments.</span>
    </FlexContainer>
  </FlexContainer>
  <FlexContainer align_items="center" justify_content="center" column gap="1rem">
    <AspectRatio shadow ratio="2/1" width="100%" max_width="400px" background="linear-gradient(140deg, rgb(209 224 239) 0%, rgb(147 193 232) 100%)" nooverflow rounded>
      <ImproveCompliance />
    </AspectRatio>
    <FlexContainer column align_items="flex-start" width="min(100%, 400px)" gap="0.5rem">
      <h3 class="no-margin">Improve your compliance</h3>
      <span>Removing unnecessary PII from your systems enhances your compliance with laws and regulations such as GDPR and CCPA.</span>
    </FlexContainer>
  </FlexContainer>
</GridContainer>
