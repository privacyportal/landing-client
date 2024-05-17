<script>
  import FlexContainer from '$lib/components/common/FlexContainer.svelte';
</script>

<FlexContainer column padding="2rem 0.5rem 0rem 1.5rem" gap="0.5rem">
  <h2 class="no-margin">Authentication</h2>
  <span>Authentication depends on the request type:</span>
  <ul>
    <li><strong>Public:</strong> do not require any authentication</li>
    <li><strong>Implicit Authentication:</strong> authentication is included in the request parameters or request body (e.g. OAUTH2 requests)</li>
    <li><strong>Bearer Access Token:</strong> authentication header with Bearer token set to the OAUTH2 Access Token</li>
    <li><strong>API Key Authentication:</strong> authentication headers using API Key</li>
  </ul>

  <br />
  <h3 class="no-margin">API Key Authentication</h3>
  <ol>
    <li>
      <span>Generate your API Key from the security page of the Privacy Portal app.</span>
      <pre><code>{JSON.stringify({ key: '<KEY_ID>', secret: '<KEY_SECRET>' }, null, 2)}</code></pre>
    </li>

    <li>
      <span>Record the current Timestamp</span>
      <pre><code>{'TIMESTAMP = GET_CURRENT_TIMESTAMP()'}</code></pre>
    </li>

    <li>
      <span>Sign your request information and timestamp using the following formula</span>
      <pre><code>{'SIGNATURE = BASE64URL(\n  HMAC_SHA256(\n    "timestamp\\n" +\n    "method\\n" +\n    "url\\n" +\n    "body"?,\n    "<KEY_SECRET>"\n  )\n)'}</code></pre>
    </li>
    <li>
      <span>Add the timestamp header <small>"X-PP-TS"</small> and the authorization header <small>"authorization"</small> to the request:</span>
      <pre><code>{JSON.stringify({ headers: { authorization: 'PP <KEY_ID>:<SIGNATURE>', 'X-PP-TS': '<TIMESTAMP>' } }, null, 2)}</code></pre>
    </li>
  </ol>
</FlexContainer>

<style>
  h2 {
    font-size: 2rem;
    font-weight: 900;
  }

  pre {
    display: block;
    font-family: monospace;
    font-size: small;
    font-weight: 700;
    line-height: 1.2rem;
    white-space: pre;
    max-width: 100%;
    overflow: auto;
    color: grey;
  }

  li {
    margin: 0.5rem 0;
  }
</style>
