<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import FlexContainer from '../common/FlexContainer.svelte';
  import GridContainer from '../common/GridContainer.svelte';
  import Button from '../common/Button.svelte';
  import Schema from './Schema.svelte';
  import ApiResponse from './ApiResponse.svelte';

  export let bgColor;

  export let id = '';
  export let name = '';
  export let path = '/';
  export let method = 'GET';
  export let summary = '';
  export let authorization;
  export let pathParameters;
  export let queryParams;
  export let requestBody;
  export let responses;
  export let handleInView;

  let container;
  let intersectionObserver;

  $: requestParamsSamples = extractRequestSamples(queryParams);
  $: requestBodySamples = extractRequestSamples(requestBody);
  $: responseSamples = extractResponseSamples(responses);

  function extractResponseSamples(responses) {
    const results = [];

    for (const responseStatus of Object.keys(responses)) {
      const { content } = responses[responseStatus];
      if (content) {
        for (const [contentType, schemaObj] of Object.entries(content)) {
          if (schemaObj?.example) {
            // example found
            results.push({
              status: Number(responseStatus),
              contentType,
              type: schemaObj?.schema?.type,
              example: schemaObj?.example
            });
          }
        }
      }
    }
    return results;
  }

  function extractRequestSamples(requestBody) {
    const results = [];
    for (const [contentType, data] of Object.entries(requestBody?.content || [])) {
      if (data?.example) {
        results.push({
          contentType,
          example: data.example
        });
      }
    }
    return results;
  }

  onMount(() => {
    if (browser) {
      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleInView();
          }
        });
      };
      intersectionObserver = new IntersectionObserver(handleIntersect, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      });
      intersectionObserver.observe(container);
    }
  });

  onDestroy(() => {
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }
  });
</script>

<GridContainer bind:element={container} {id} width="100%" align_items="stretch" template_columns="1fr 1fr" mobile_template_columns="1fr" gap="1rem">
  <FlexContainer column padding="3rem 2rem" gap="1.5rem">
    <FlexContainer column gap="0.3rem">
      <h3 class="no-margin">{name}</h3>
      <span>{summary}</span>
    </FlexContainer>

    {#if authorization}
      <FlexContainer align_items="center" gap="1rem">
        <h4 class="no-margin">Authorization:</h4>
        <span class="sm mono">{authorization}</span>
      </FlexContainer>
    {/if}

    {#if pathParameters}
      <FlexContainer column>
        <h4 class="no-margin">PATH PARAMS</h4>
        <hr class="divider sm-v-margin" />
        <Schema data={pathParameters} />
      </FlexContainer>
    {/if}

    {#if queryParams}
      {#each Object.keys(queryParams.content) as contentType}
        <FlexContainer column>
          <FlexContainer column>
            <FlexContainer align_items="center" gap="0.5rem">
              <h5 class="no-margin">QUERY PARAMS:</h5>
              <span class="mono sm">{contentType}</span>
            </FlexContainer>
            {#if queryParams.required}
                <span class="required sm">required</span>
              {/if}
          </FlexContainer>
          <hr class="divider sm-v-margin" />
          <Schema data={queryParams.content[contentType].schema} />
        </FlexContainer>
      {/each}
    {/if}

    {#if requestBody}
      {#each Object.keys(requestBody.content) as contentType}
        <FlexContainer column>
          <FlexContainer column>
            <FlexContainer align_items="center" gap="0.5rem">
              <h5 class="no-margin">REQUEST BODY SCHEMA:</h5>
              <span class="mono sm">{contentType}</span>
            </FlexContainer>
            {#if requestBody.required}
              <span class="required sm">required</span>
            {/if}
          </FlexContainer>
          <hr class="divider sm-v-margin" />
          <Schema data={requestBody.content[contentType].schema} />
        </FlexContainer>
      {/each}
    {/if}

    {#if responses}
      <FlexContainer column gap="0.5rem">
        <h4 class="no-margin">Responses</h4>
        {#each Object.keys(responses).sort() as responseStatus}
          <ApiResponse status={responseStatus} data={responses[responseStatus]} />
        {/each}
      </FlexContainer>
    {/if}
  </FlexContainer>
  <FlexContainer align_items="flex-start" color="var(--text-light-color)" column padding="3rem 2rem" {bgColor} gap="1rem">
    <Button width="100%" blendin>
      <FlexContainer align_items="center" bgColor="var(--new-layer-x4-color)" padding="0.5rem" gap="0.7rem">
        <span class="method sm">{method}</span>
        <span class="sm mono">{path}</span>
      </FlexContainer>
    </Button>

    {#if requestBodySamples.length || requestParamsSamples.length}
      <FlexContainer column gap="0.7rem">
        <h4 class="no-margin">Request samples</h4>
        {#each [...requestParamsSamples, ...requestBodySamples] as request}
          <FlexContainer column gap="0.5rem">
            <FlexContainer justify_content="center" width="5rem" bgColor="var(--base-color)" color="var(--text-color)" padding="0.3rem" rounded>
              <span class="sm">Payload</span>
            </FlexContainer>
            <FlexContainer column bgColor="var(--new-layer-x4-color)" padding="1rem" gap="0.5rem">
              <FlexContainer bgColor="var(--down-layer-color)" padding="0.5rem">
                <span class="mono sm">{request.contentType}</span>
              </FlexContainer>
              <pre><code>{['application/json', 'application/x-www-form-urlencoded'].includes(request.contentType) ? JSON.stringify(request.example, null, 2) : request.example}</code></pre>
            </FlexContainer>
          </FlexContainer>
        {/each}
      </FlexContainer>
    {/if}

    {#if responseSamples.length}
      <FlexContainer column gap="0.7rem">
        <h4 class="no-margin">Response samples</h4>
        {#each responseSamples as response}
          <FlexContainer column gap="0.5rem">
            <FlexContainer justify_content="center" width="5rem" bgColor="var(--base-color)" color={response.status < 400 ? 'var(--positive-color)' : 'var(--danger-color)'} padding="0.3rem" rounded>
              <span class="sm">{response.status}</span>
            </FlexContainer>
            <FlexContainer column bgColor="var(--new-layer-x4-color)" padding="1rem" gap="0.5rem">
              <FlexContainer bgColor="var(--down-layer-color)" padding="0.5rem">
                <span class="mono sm">{response.contentType}</span>
              </FlexContainer>
              <pre><code>{response.contentType === 'application/json' ? JSON.stringify(response.example, null, 2) : response.example}</code></pre>
            </FlexContainer>
          </FlexContainer>
        {/each}
      </FlexContainer>
    {/if}
  </FlexContainer>
</GridContainer>

<style>
  span.method {
    padding: 0.3rem 0.5rem;
    background-color: var(--positive-color);
    text-transform: uppercase;
  }

  span.required {
    color: var(--danger-color);
  }

  pre {
    display: block;
    font-family: monospace;
    font-size: small;
    line-height: 1.5rem;
    white-space: pre;
    margin: 0px;
    max-width: 100%;
    overflow: auto;
  }
</style>
