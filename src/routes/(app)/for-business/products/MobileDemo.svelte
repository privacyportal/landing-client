<script>
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
  import GridContainer from '$lib/components/common/GridContainer.svelte';
  export let mode = 0;
  export let height = '500px';
  export let onlymobile = undefined;

  const TITLES = ['Sign In', 'Newsletter', 'Sign In'];
  const MAIN_BTN = ['Login', 'Enroll', 'Login'];
  const SIWPP_BTN = [
    ['Sign In with Privacy Portal', ''],
    ['Subscribe Anonymously', 'with Privacy Portal'],
    ['', '']
  ];
</script>

<FlexContainer
  globalClass={['mobile-border', 'shadow']}
  {height}
  width="min(100%, 400px)"
  align_items="center"
  justify_content="center"
  padding="4rem 2rem"
  gap="2rem"
  column
  rounded
  mobileScale
  {onlymobile}
>
  <GridContainer template_columns="1fr 1fr" align_items="stretch" width="min(100%, 300px)">
    <FlexContainer bgColor="#E1C85F" column justify_content="center">
      <span class="pfw-logo-left">PFW</span>
    </FlexContainer>
    <GridContainer template_columns="1fr" bgColor="#AFAFAF" padding="0.2rem 0.5rem">
      <span class="pfw-logo-right">Privacy</span>
      <span class="pfw-logo-right">Friendly</span>
      <span class="pfw-logo-right">Website</span>
    </GridContainer>
  </GridContainer>
  <FlexContainer globalClass={['black-border']} column width="min(100%, 300px)" bgColor="#fff" padding="1rem" border rounded gap="0.5rem" mobileScale>
    <div class="title"><strong>{TITLES[mode]}</strong></div>
    <div class="input" class:focused={mode === 2}>
      <span>Email</span>
      <div class="hme" class:show-hme={mode === 2}><span>Hide My Email</span></div>
    </div>
    <div class="input" class:hidden={mode === 1}><span>Password</span></div>
    <div class="btn login-btn">{MAIN_BTN[mode]}</div>
    <div class:hidden={!SIWPP_BTN[mode][0]}><hr /></div>
    <FlexContainer
      height={!SIWPP_BTN[mode][0] ? '0px !important' : 'auto'}
      column
      bgColor="black"
      color="var(--text-light-color)"
      padding={!SIWPP_BTN[mode][0] ? '0px' : '0.7rem'}
      gap={!SIWPP_BTN[mode][0] ? '0px' : '0.2rem'}
      rounded
    >
      <span class="btn">{SIWPP_BTN[mode][0]}</span>
      <span class="btn-extra">{SIWPP_BTN[mode][1]}</span>
    </FlexContainer>
  </FlexContainer>
</FlexContainer>

<style>
  :global(.mobile-border) {
    background: linear-gradient(140deg, rgb(230, 230, 230) 0%, rgb(189, 189, 189) 100%);
  }

  :global(.black-border) {
    border: 2px solid #000 !important;
  }

  .hidden {
    display: none;
    transition: all 0.2s ease;
  }

  .pfw-logo-left {
    font-size: 2rem;
    font-weight: 900;
  }

  .pfw-logo-right {
    text-align: left;
    font-size: 0.7rem;
    font-weight: 900;
  }

  .title {
    text-align: left;
    font-size: 1.6rem;
    margin-bottom: 0.7rem;
    transition: all 0.2s ease;
  }

  .input {
    position: relative;
    text-align: left;
    font-size: 1rem;
    border: 1.5px solid var(--text-color);
    border-radius: 10px;
    padding: 0.5rem;
    color: var(--border-color);
  }

  .input > .hme {
    position: absolute;
    top: 37px;
    left: 0px;
    width: calc(100% + 3px);
    background-color: black;
    border-radius: 7px;
    z-index: 1;
    height: 0px;
    font-size: 0px;
    transition: all 0.2s ease;
  }

  .input > .hme.show-hme {
    height: auto;
    padding: 0px 0.5rem;
    font-size: 0.8rem;
    border: 1.5px solid var(--text-color);
    transition: all 0.2s ease;
  }

  .input.focused::before {
    content: '|';
    color: black;
    font-size: 1rem;
  }

  .btn {
    font-weight: 900;
    font-size: 0.8rem;
  }

  .btn-extra {
    font-weight: 900;
    font-size: 0.6rem;
  }

  .login-btn {
    padding: 0.7rem;
    border-radius: 10px;
    background-color: #ccc;
  }
</style>
