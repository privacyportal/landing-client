---
title: 'Setting up Sign In With Privacy Portal on WordPress'
description: 'Learn how to integrate Sign In With Privacy Portal with your WordPress site.'
author: 'Privacy-Portal'
category: 'oauth docs'
genre: 'documentation'
keywords: ['wordpress sso', 'wp sso', 'wordpress oauth2', 'sso', 'sign in with privacy portal for wordpress']
date: '2024-10-14'
image: '/assets/blog/setting-up-siwpp-on-wp/siwpp_wp_enable_sso.png'
---

In this tutorial, we will show you how to quickly set up **[Sign In with Privacy Portal](/for-business/products#sign-in-with-privacy-portal)** on your WordPress site.

## Step 1 - Install the _[Privacy Portal SSO](https://wordpress.org/plugins/privacy-portal-sso/)_ plugin on WordPress

1. In your WordPress admin console, simply go to the _"Plugins > Add Plugins"_ page.
2. Install and Activate the _["Privacy Portal SSO"](https://wordpress.org/plugins/privacy-portal-sso/)_ plugin.
3. Go to the plugin settings page: _"Settings > Privacy Portal SSO"_.
4. Check _"Enable SSO"_ and save the changes.

Now you should be able to see the `redirect_uri` for your site. You will need it to configure your OAuth application with Privacy Portal.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_wp_enable_sso.png" alt="Enable SSO">
</p>

## Step 2 - Register your OAuth App

1. Go to the **[Privacy Portal App](https://app.privacyportal.org)**.
2. Create you free account (in case you don't already have one).
3. Open to **[Developer Settings](https://app.privacyportal.org/settings/developers)**.
4. Tap on _"New Application"_ to register your OAuth Application.
5. Fill in the information requested then tap on _"Register"_.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_new_application.png" alt="New OAuth App">
</p>

## Step 3 - Get your App Credentials

1. Go to [Developer Settings](https://app.privacyportal.org/settings/developers).
2. Select the OAuth Application you just created.
3. Under _"Credentials"_, copy your Application's `client_id`.
4. Also under _"Credentials"_, tap on _"Generate Secret"_ and copy the `client_secret`.

Note that the `client_secret` will only be displayed to you once. Make sure to treat it as a password and store it securely.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_credentials.png" alt="Credentials">
</p>

## Step 4 - Configure the Plugin

1. Go back to the plugin settings page: **Settings > Privacy Portal SSO**.
2. Enter the _Client ID_ and the _Client Secret_ that we got in _Step 3_ and save the changes.
3. Make sure _Create user if does not exist_ is enabled.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_wp_settings.png" alt="Plugin Settings">
</p>

## Step 5 - Save Permalinks

Privacy Portal SSO uses custom permalinks during redirection that can only be enabled manually.

1. Go to the _Permalinks_ page under **Settings > Permalinks**
2. Without making any changes to the page, simply tap on **Save Changes**

## Step 6 - Test your configuration

Now that you're completed all the steps, you can log out from WordPress. If everything worked as expected, you should now see a "Sign In With Privacy Portal" button next to the login form.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_wp_button.png" alt="Login Button on WordPress">
</p>

## Step 7 - Enable Public Access

1. Go back to the Privacy Portal App.
2. Go to the [Developer Settings](https://app.privacyportal.org/settings/developers).
3. Under _"Access Management"_, enable _"Public Access"_.

Now anyone should be able to log in to your application.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_access_management.png" alt="Access Management">
</p>

## Step 8 - Configure Mail Relay

Now that you've set up _"Sign In with Privacy Portal"_, users will be able to log in to your WordPress site anonymously. Every user will have the ability to use a pseudonym as their name during registration. Also, every email provided to you is a Privacy Alias that relays mail to your user's personal emails.

In order to send emails to your users through Mail Relay, you will need to verify your ownership of the sending domain name.

1. Go to the **[Privacy Portal App](https://app.privacyportal.org)**.
2. Select the OAuth Application of your site.
3. Under _"Mail Relay"_, find your sending domain and tap on `verify`.
4. Follow the steps to verify your ownership of the domain name.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_mail_relay.png" alt="Mail Relay">
</p>

Once domain verification is completed, you should be able to send emails to your users. Make sure your email is configured correctly to prevent email spoofing using SPF, DKIM, and DMARC. We strictly enforce these security configurations for OAuth applications using Sign In with Privacy Portal to keep our users safe.

## Step 9 - Add a custom login button (Optional)

### Custom button

You can add a login button on any page of your WordPress site.

1. Start editing the page in question on WordPress.
2. Insert a new button element.
3. Enter the text `Sign In with Privacy Portal`.
4. Enable the link and set its value to `[pp_sso_login_url]`.
5. Style the button to your liking.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_cutom_button.png" alt="Custom Login button">
</p>

### Simple Link

In case you just want to have a link instead of a button, you can simply use the shortcode `[pp_sso_login_button]`.

<p>
  <img class="shadow rounded blog-img-max-500" src="/assets/blog/setting-up-siwpp-on-wp/siwpp_wp_sso_link.png" alt="Login Link">
</p>
