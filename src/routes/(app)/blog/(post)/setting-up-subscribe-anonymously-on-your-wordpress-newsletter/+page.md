---
title: 'Setting up "Subscribe Anonymously" on your WordPress Newsletter'
description: 'Learn how to accept anonymous subscriptions to your WordPress Newsletter using the Privacy Portal SSO plugin.'
author: 'Privacy-Portal'
category: 'oauth docs'
genre: 'documentation'
keywords: ['wordpress newsletter', 'subscribe anonymously', 'anonymous subscriptions', 'anonymous newsletter subscriptions']
date: '2024-10-15'
---

How often do privacy concerns deter visitors from registering for your newsletter?

Introducing __[Subscribe Anonymously with Privacy Portal](/for-business/products#subscribe-anonymously-with-privacy-portal)__ - a feature designed to offer all the advantages of your newsletter with none of the privacy drawbacks.

When users opt to Subscribe Anonymously, they enroll using Privacy Aliases instead of their personal email addresses. Here’s how it works:

- **Unique Aliases:** Each subscriber receives a unique alias that only accepts emails from your domains, effectively blocking external spam.
- **Privacy Protection:** This system ensures that your subscribers' actual email addresses remain confidential, preventing you from inadvertently or otherwise sharing or selling these addresses to third parties. Even aliases cannot be shared or sold due to the sender domain restrictions.
- **Full Control:** Subscribers can deactivate their aliases at any time, giving them the power to shield their inbox if they ever receive unwanted emails.

With Privacy Portal, you provide a secure way for users to enjoy your content without compromising their privacy. In this tutorial, we will show you how to quickly set up _[Subscribe Anonymously](/for-business/products#subscribe-anonymously-with-privacy-portal)_ for your WordPress Newsletter. Let's dive in!

## Step 1 - Install the _[Privacy Portal SSO](https://wordpress.org/plugins/privacy-portal-sso/)_ plugin on WordPress

1. In your WordPress admin console, simply go to the _"Plugins > Add Plugins"_ page.
2. Install and Activate the _["Privacy Portal SSO"](https://wordpress.org/plugins/privacy-portal-sso/)_ plugin.
3. Go to the plugin settings page: _"Settings > Privacy Portal SSO"_.
4. Check _"Enable Subscriptions"_ and save the changes.

Now you should be able to see the `redirect_uri` for your site. You will need it to configure your OAuth application with Privacy Portal.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-subscribe-anonymously-on-your-wordpress-newsletter/sawpp_enable_subscriptions.png" alt="Enable Subscriptions">
</p>

## Step 2 - Register your OAuth App

1. Go to the **[Privacy Portal App](https://app.privacyportal.org)**.
2. Create you free account (in case you don't already have one).
3. Open to **[Developer Settings](https://app.privacyportal.org/settings/developers)**.
4. Tap on _"New Application"_ to register your OAuth Application.
5. Fill in the information requested then tap on _"Register"_.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-subscribe-anonymously-on-your-wordpress-newsletter/sawpp_new_application.png" alt="New OAuth App">
</p>

## Step 3 - Get your App Credentials

1. Go to [Developer Settings](https://app.privacyportal.org/settings/developers).
2. Select the OAuth Application you just created.
3. Under _"Credentials"_, copy your Application's `client_id`.
4. Also under _"Credentials"_, tap on _"Generate Secret"_ and copy the `client_secret`.

Note that the `client_secret` will only be displayed to you once. Make sure to treat it as a password and store it securely.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-sign-in-with-privacy-portal-on-wordpress/siwpp_credentials.png" alt="Credentials">
</p>

## Step 4 - Configure the Plugin

1. Go back to the plugin settings page: **Settings > Privacy Portal SSO**.
2. Enter the _Client ID_ and the _Client Secret_ that we got in *Step 3* and save the changes.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-sign-in-with-privacy-portal-on-wordpress/siwpp_wp_settings.png" alt="Plugin Settings">
</p>

## Step 5 - Save Permalinks

Privacy Portal SSO uses custom permalinks during redirection that can only be enabled manually.

1. Go to the _Permalinks_ page under **Settings > Permalinks**
2. Without making any changes to the page, simply tap on **Save Changes**

## Step 6 - Integrate with your existing newsletter plugin

At the time of writing, Privacy Portal SSO integrates with 4 newsletter plugins:
- MailPoet
- MC4WP (MailChimp for WordPress)
- The Newsletter Plugin
- Kit (formerly ConvertKit)

If you're using one of these plugins for your newsletter, you can integrate the _"Subscribe Anonymously"_ feature with your newsletter.

1. Go to the plugin settings page: **Settings > Privacy Portal SSO**.
2. Under the _"Newsletter Lists"_, select one or more lists to subscribe users to when using "Subscribe Anonymously".
3. Click on "Save Changes" to save your selection.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-subscribe-anonymously-on-your-wordpress-newsletter/sawpp_newsletter_lists.png" alt="Access Management">
</p>

## Step 7 - Configure Mail Relay

Now that you've set up _"Subscribe Anonymously with Privacy Portal"_, users will be able to enroll to your newsletter using Privacy Aliases. In order to send emails to your users through Mail Relay, you will need to verify your ownership of the sending domain name.

1. Go to the **[Privacy Portal App](https://app.privacyportal.org)**.
2. Select the OAuth Application of your site.
3. Under _"Mail Relay"_, find your sending domain and tap on `verify`.
4. Follow the steps to verify your ownership of the domain name.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-sign-in-with-privacy-portal-on-wordpress/siwpp_mail_relay.png" alt="Mail Relay">
</p>

Once domain verification is completed, you should be able to send emails to your users. Make sure your email is configured correctly to prevent email spoofing using SPF, DKIM, and DMARC. We strictly enforce these security configurations for OAuth applications to keep our users safe.

## Step 8 - Enable Public Access

1. Go back to the Privacy Portal App.
2. Go to the [Developer Settings](https://app.privacyportal.org/settings/developers).
3. Under _"Access Management"_, enable _"Public Access"_.

Now anyone should be able to enroll to your newsletter.

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-sign-in-with-privacy-portal-on-wordpress/siwpp_access_management.png" alt="Access Management">
</p>

## Step 9 - Update your newsletter form to add the "Subscribe Anonymously" button

We support multiple ways to add buttons to allow you to bypass any plugin specific limitations.

### MailPoet Form

MailPoet does not allow using shortcodes inside forms. Here are the steps you need to follow to add the "Subscribe Anonymously" button.

1. Open the newsletter form in editing mode.
2. Insert a "Custom HTML" element under the submit button. You could add a divider before it for styling.
3. Add the following html content (or custom text):
```html
<!-- example button -->
<div class="pp-sso-button">
  <a href="{pp_sso_subscribe_anonymously_url}">
    <span class="title">Subscribe Anonymously</span>
    <span class="subtitle">with Privacy Portal</span>
  </a>
  <div class="pp-sso-message"><small>{pp_sso_subscribe_anonymously_message}</small></div>
</div>
```
4. Uncheck the "Automatically add paragraphs".
5. Style the button to your liking under the "Custom CSS" section of the "Form" tab.
```css
/* example styling */
.pp-sso-button > a {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0px;
  background-color: black;
  color: white;
  text-decoration: none;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
}

.pp-sso-button > a:hover {
  background-color: #333;
}

.pp-sso-button > a > .title {
  font-size: 16px;
}

.pp-sso-button > a > .subtitle {
  font-size: 12px;
}

.pp-sso-button > .pp-sso-message {
  color: #cf2e2e;
  font-size: 14px;
}

.pp-sso-button > .pp-sso-message:empty {
  /* do not display the message element when there's no message */
  display: none;
}
```
6. Save the form.

### MC4WP Form

MailChimp for WordPress forms allow you to edit html directly. You can simply add the button using the shortcode. Notice that the shortcode supports styling:

```html
[pp_sso_subscribe_anonymously_button style_background_color="black" style_color="white" style_font_size="14px" style_font_weight="strong" style_font_family="Arial, Helvetica, sans-serif" style_padding="10px" style_margin="0px" style_border_radius="6px"]
```

### Kit (formerly ConvertKit) Form

Kit forms can be added to your site as a Custom HTML element (you can copy the form html from the Kit website). In order to integrate the "Subscribe Anonymously" button, you will need to manually edit the HTML to add the "Subscribe Anonymously" shortcode after the submit button.

```html
<!--
  Within the HTML of the Kit Form, right after the submit button,
  insert the following shortcode and edit the styling to your liking
-->
[pp_sso_subscribe_anonymously_button]
```

### The Newsletter Plugin

The Newsletter Plugin can be integrated to your pages using a shortcode. You can also integrate the "Subscribe Anonymously" button in the same manner. Simply add both shortcodes with wrapper html inside a Custom HTML element. Here's an example of how this can be achieved:

```html
<div style="padding:20px" class="wp-block-tnp-minimal">
  <p>Subscribe to our newsletter!</p>
  <div>[newsletter_form type="minimal"]</div>
  <div>[pp_sso_subscribe_anonymously_button]</div>
</div>
```

<p>
  <img style="max-width: 500px" class="shadow rounded" src="/assets/blog/setting-up-subscribe-anonymously-on-your-wordpress-newsletter/sawpp_tnp_plugin_demo.png" alt="The Newsletter Plugin Demo">
</p>