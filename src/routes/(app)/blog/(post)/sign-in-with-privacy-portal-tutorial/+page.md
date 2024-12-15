---
title: 'Sign In With Privacy Portal Tutorial'
description: 'Learn how to integrate Sign In With Privacy Portal with your web application.'
author: 'Privacy-Portal'
category: 'oauth docs'
genre: 'documentation'
keywords: ['oauth2', 'oauthv2', 'oidc', 'sso', 'sign in with privacy portal']
date: '2024-09-29'
---

In this article, we will give you a quick overview of OAuth 2.0 authentication and walk you through the steps needed to integrate "Sign In With Privacy Portal" with your web application.

# OAUTH 2.0 _[Code Flow](https://datatracker.ietf.org/doc/html/rfc6749#section-1.3.1)_

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user's resources on another server, like social media accounts or email, without sharing their credentials. It uses tokens for security and is widely adopted for API access control.

Privacy Portal is an OAuth 2.0 provider focused on user privacy. It offers the usual OAuth 2.0 functionality but aims to keep the identity of users private by hiding their Personally Identifiable Information, such as their email address.

<p>
  <img class="full-height shadow rounded" src="/assets/blog/sign-in-with-privacy-portal-tutorial/oauth_requests_diagram.svg" alt="OAuth requests 
  diagram">
</p>

## Step 1 - Register your OAuth App

1. Go to the **[Privacy Portal App](https://app.privacyportal.org)**.
2. Create you free account (in case you don't already have one).
3. Open to **[Developer Settings](https://app.privacyportal.org/settings/developers)**.
4. Tap on _"New Application"_ to register your OAuth Application.
5. Fill in the information requested then tag on _"Register"_.

Note that the "Callback URL" is the URL that Privacy Portal will redirect back to after the authorization step is complete.

## Step 2 - Get your App Credentials

1. Go to [Developer Settings](https://app.privacyportal.org/settings/developers).
2. Select the OAuth Application you just created.
3. Under _"Credentials"_, copy your Applications's `client_id`.
4. Also under _"Credentials"_, tap on _"Generate Secret"_ and copy the `client_secret`.

Note that the `client_secret` will only be displayed to you once. Make sure to treat it as a password and store it securely.

## Step 3 - Create the Login button

In your application's client code, create the login button that redirects to Privacy Portal's Authentication URL.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OAuth Login with Privacy Portal</title>
    <style>
      .login-button {
        background-color: #000;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
      }
    </style>
    <script>
      document.getElementById('pp-login').addEventListener('click', function () {
        // Your Privacy Portal OAuth client ID
        const clientId = 'YOUR_CLIENT_ID_FROM_PRIVACY_PORTAL';

        // Redirect URI should match what you set in the OAuth App settings
        const redirectUri = 'YOUR_REDIRECT_URI';

        // Define the permissions you need
        const scope = 'openid name email';

        // Generate a random state
        const state = generateRandomState();

        // Store the state in local storage
        localStorage.setItem('oauth_state', state);

        // Construct the OAuth URL
        const oauthUrl = new URL('https://app.privacyportal.org/oauth/authorize');
        oauthUrl.searchParams.append('client_id', clientId);
        oauthUrl.searchParams.append('redirect_uri', redirectUri);
        oauthUrl.searchParams.append('scope', scope);
        oauthUrl.searchParams.append('response_type', 'code');
        oauthUrl.searchParams.append('state', state);

        // Open the OAuth URL in a new window or tab
        window.location.href = oauthUrl;
      });

      function generateRandomState(length = 16) {
        // Generate an array of random integers
        const randomValues = new Uint8Array(length);
        crypto.getRandomValues(randomValues);

        // Convert the random values to a hexadecimal string
        return Array.from(randomValues, (byte) => byte.toString(16).padStart(2, '0')).join('');
      }
    </script>
  </head>
  <body>
    <button id="pp-login" class="login-button">Login with Privacy Portal</button>
  </body>
</html>
```

## Step 4 - Handle the Redirect URI

In your application's client code, create a new route matching the Redirect URI. After authorizing users, the OAuth provider will redirect back to your application using the `redirect_uri`. During the redirection, the provider will pass some parameters as part of the request.

Your application should handle the Redirect URI route by validating the OAuth params, and if valid, it should initiate the login request with your backend server.

```js
// Function to handle OAuth2 callback
function handleOAuthCallback() {
  // Extract parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  // Retrieve the state from local storage
  const storedState = localStorage.getItem('oauth_state');

  // State validation
  if (!state || state !== storedState) {
    console.error('State validation failed. Possible CSRF attack.');
    // You might want to redirect to an error page or log out the user
    return;
  }

  // Clear the state from local storage for next use
  localStorage.removeItem('oauth_state');

  // If we've got this far, the state is valid
  if (code) {
    // Here you would typically send the authorization code to your backend
    // to exchange for an access token
    fetch('https://your-backend-endpoint/oauth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        redirect_uri
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the token response from your server
        console.log('Token received:', data);
        // You might want to set this token in cookies, local storage, or however your app manages sessions
        // For example:
        // localStorage.setItem('access_token', data.access_token);
        // Now, redirect or update UI to indicate logged in state
      })
      .catch((error) => {
        console.error('Failed to fetch token:', error);
      });
  } else {
    console.error('No authorization code received.');
  }
}

// Call this function when the page loads
window.onload = handleOAuthCallback;
```

## Step 5 - Handle the OAuth Login Request

In the previous step, your client application calls your backend server in order to start the authentication process within your application. Your backend server should handle this OAuth authentication request and log the user into your application.

Here's a simplified example using a NodeJS / ExpressJS backend handling the OAuth Login Request:

```js
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Your Privacy Portal OAuth Client ID
const CLIENT_ID = 'your-client-id';

// Your Privacy Portal OAuth Client Secret (must be treated like a password)
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Your OAuth Application's Redirect URI (this could be passed by the client)
const REDIRECT_URI = 'your-redirect-uri';

// The Privacy Portal OAuth Token Endpoint
// API docs: https://privacyportal.org/developers/api-docs#oauth_token
const TOKEN_ENDPOINT = 'https://api.privacyportal.org/oauth/token';

// The Privacy Portal User Info Endpoint
// API docs: https://privacyportal.org/developers/api-docs#openid_userinfo
const USERINFO_ENDPOINT = 'https://api.privacyportal.org/oauth/userinfo';

// Handle the OAuth Login Request
app.post('/oauth/authenticate', async (req, res) => {
  try {
    const { code } = req.body;

    // Prepare the URLSearchParams for the body
    const body = new URLSearchParams();
    body.append('code', code);
    body.append('client_id', CLIENT_ID);
    body.append('client_secret', CLIENT_SECRET);
    body.append('redirect_uri', REDIRECT_URI);
    body.append('grant_type', 'authorization_code');

    // Exchange authorization code for access token
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const tokenData = await tokenResponse.json();

    // Assuming the access token is in tokenData.access_token
    const accessToken = tokenData.access_token;

    // Fetch user info using the access token
    const userInfoResponse = await fetch(USERINFO_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const user = await userInfoResponse.json();

    // Here you would typically process the user data,
    // e.g., save to your database, create a session, etc.

    // To keep this example simple, let's assume a function exists to
    // create a JWT token from user data
    const token = createUserSession(user);

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Please note that the code snippets provided on this page are not production-ready and require multiple additional steps before they can be used in your production application. Some of these steps include things such as input validation, error handling, and user management.

## Additional Steps

In this tutorial, we covered the base OAuth 2.0 Code Flow. One recommended security improvement to the example above would be using _[Proof Key for Code Exchange (or PKCE)](https://www.rfc-editor.org/rfc/rfc7636)_.

PKCE allows you to protect the authorization `code` from being intercepted and used by a malicious actor. With PKCE, your application's client generates a secret called `code_verifier`, it sends its hashed value as a `code_challenge` to the OAuth provider during authorization, then uses it in combination with the authorization `code` to login.

### Supporting Proof Key for Code Exchange

To support PKCE, few changes are required:

1. Generate the `code_verifier` on the client.

```js
// Function to generate the PKCE code_verifier
function generateCodeVerifier(length = 64) {
  // Generate random bytes (minimum length 32 bytes)
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  // Convert the array to a Base64 URL-safe string
  return base64URLEncode(array);
}

function base64URLEncode(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\//g, '_')
    .replace(/\+/g, '-')
    .replace(/=+$/, '');
}

// generate the code_verifier
const code_verifier = generateCodeVerifier();

// Store the code_verifier as part of the oauth_state in the local storage
```

2. Create the PKCE `code_challenge` by hashing the `code_verifier`

```js
// Function to create the code_challenge by hashing the code_verifier
async function createCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(digest);
}

// create the code_challenge
const code_challenge = await createCodeChallenge(code_verifier);

// set the code_challenge method to S256 since we're using SHA-256
const code_challenge_method = 'S256';
```

3. Add the `code_challenge` and `code_challenge_method` params to the **Authorization URI** redirection.
4. When handling the redirection, read the stored `code_verifier` and add it to the login request.
5. Add the `code_verifier` param to the **Issue Access Token** request.
