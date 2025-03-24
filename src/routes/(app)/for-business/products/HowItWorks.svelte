<script>
  import Button from '$lib/components/common/Button.svelte';
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  import ChevronLeftIcon from '$lib/components/materialIcons/ChevronLeftIcon.svelte';

  const TITLES = {
    user_action: '1. User Action',
    authorization: '2. Authorization',
    access_granted: '3. Access granted'
  };

  const DATA = [
    {
      // SIWPP
      user_action: ['Within your application, the user requests to Sign-In with Privacy Portal.'],
      authorization: [
        'The user is redirected to Privacy Portal for authorization. After signing in to their Privacy Portal account (or registering a free account), they can authorize your application to login and access the PII-free data requested.'
      ],
      access_granted: ["Your application receives the PII-free data such as the unique user ID, email alias, and the user's pseudonym."]
    },
    {
      // ASWPP
      user_action: ['Within your application, the user requests to Subscribe Anonymously to your newsletter.'],
      authorization: [
        'The user is redirected to Privacy Portal for authorization. After signing in to their Privacy Portal account (or registering a free account), they can authorize your application to receive a unique email alias for the newsletter subscription.'
      ],
      access_granted: ['Your application receives the anonymous email alias and uses it to subscribe the user to the newsletter.']
    },
    {
      // HME
      user_action: ['Within your application, the user requests to use Hide-My-Email when filling a form.'],
      authorization: [
        'The user is redirected to Privacy Portal for authorization. After signing in to their Privacy Portal account (or registering a free account), they can authorize your application to receive a unique email alias to be used within the form.'
      ],
      access_granted: ['Your application receives the anonymous email alias and uses it to fill the email input field in the form.']
    }
  ];

  let selected = 0;
</script>

<GridContainer padding="0px 20%" template_columns="1fr" mobileScale>
  <GridContainer width="100%" template_columns="repeat(3, 1fr)" bgColor="var(--border-color)" border rounded gap="1px" padding="0px">
    {#each ['SIGN-IN', 'SUBSCRIBE', 'HIDE EMAIL'] as label, index}
      <Button
        on:click={() => {
          selected = index;
        }}
        width="100%"
        selected={selected === index}
        strongSelect
        disabled={selected === index}><small>{label}</small></Button
      >
    {/each}
  </GridContainer>
  <br />
  {#each Object.keys(DATA[selected]) as key}
    <FlexContainer column padding="2rem" rounded border gap="0.5rem">
      <h3 class="no-margin">{TITLES[key]}</h3>
      {#each DATA[selected][key] as line}
        <span>{line}</span>
      {/each}
    </FlexContainer>
    {#if key !== 'access_granted'}
      <FlexContainer align_items="center" justify_content="center">
        <ChevronLeftIcon dimension="3rem" rotate="-90deg" />
      </FlexContainer>
    {/if}
  {/each}
</GridContainer>
