---
title: 'How to set up S/MIME Encryption'
description: 'A tutorial for setting up S/MIME Encryption.'
author: 'Privacy-Portal'
category: 'mail relay docs'
genre: 'documentation'
keywords: ['privacy portal tutorial', 'mail relay tutorial', 'encryption setup', 'smime encryption', 'mail relay smime', 'mail relay email encryption']
date: '2023-02-26'
---

With Enhanced Protection, Mail Relay can encrypt all inbound mail using S/MIME Encryption. In order to use S/MIME encryption, your Mail client (or mail web app) needs to support S/MIME.

Here are the steps to set up S/MIME encryption:

1. Go to **[Mail Relay Settings](https://app.privacyportal.org/mail-relay/settings)**
2. Press on **"New Profile"**
3. Choose **"S/MIME"**
4. Specify an expiration time and press on **"Issue Certificate"** - Note that some email clients such as Apple Mail do not accept certificates with an expiration time longer than 3 years
5. Insert a secret passphrase to encrypt your certificates and private key during export
6. Press on **"Export"** to export your certificates and private key
7. Install the certificate chain on your device - on some operating systems such as iOS you need to install all 3 certificates separately (install the user certificate, then download and install the root certificate, then download and install the intermediate certificate)
8. Trust the root certificate on your device - on some operating systems such as MacOS you can restrict this root certificate to "basic" and "S/MIME" usage for better security
9. Activate the newly created profile to start encrypting all inbound mail

Once an S/MIME Profile is activated, all relayed inbound mail will be encrypted using the newly issued certificate.

## Encrypting Email Replies

When creating a new S/MIME profile, a full certificate chain is issued for the profile:

- A root certificate
- An intermediate certificate
- A user certificate

All emails exchanged between Mail Relay and your email client are encrypted and trusted by the profile's root certificate.

If you're familiar with S/MIME and Public Key Infrastructure, you will notice that there's no third party trust for the certificate chain. Certificates in this context are only used to create trust between Mail Relay and your email client. You can revoke a certificate from your end at any time by uninstalling the root certificate from your device. You can also revoke a certificate on Mail Relay's end by deleting its corresponding profile.

When S/MIME is enabled, Mail Relay signs every relayed email with a generated and unique certificate per sender. Your email client will be able to automatically validate these certificates because they are trusted by the same root certificate. Even through the root is trusted, your email client might still require you to install the recipient's certificate before being able to encrypt your email replies to that recipient.

## Encryption both ways

By encrypting both inbound and outbound mail, your email provider would have zero access to the contents of your emails. Remember, your email provider stores all your inbox and has total access to it. Even if you fully trust your email provider, which you shouldn't, you definitely want your emails to be encrypted in their database.

## Security Considerations

- When generating the certificate chain for a profile, the root key is generated in your browser session and never sent to our servers. It is also deleted immediately after signing the intermediate certificate. This means no one can issue additional intermediate certificates using the same root at a later point in time.
- The intermediate key is generated on our servers and is never sent to your browser. This key is used to sign all certificates issued by this profile including the user certificate.
- Your private key is generated in your browser and never shared with our servers. This means any emails encrypted with the user certificate can only be decrypted by you on-device.
- Note that installing root certificates to your device is not a good security practice. Even though we take security very seriously, we recommend that you restrict the root certificate when installing it on your device:
  - If your email client includes a certificate manager (e.g. Thunderbird), you can install the certificate chain within your application and not at an OS level.
  - In case you need to install the root certificate at an OS level, and if your OS Certificate Manager allows it, restrict the root certificate trust to "basic" and "S/MIME".
- Given that we generate the certificate chain in the browser using javascript, you should know that javascript in the browser is not the best environment for secure operations. This is another reason why we recommend the use of PGP when possible.

## PGP or S/MIME

If your email client supports it, we recommend the use of PGP for better security especially that it does not require you to install a root certificate on your device. Also PGP uses more modern crypto. Popular clients using S/MIME seem to lag behind on that front.
