---
title: 'S/MIME Encryption with Mail Relay'
description: 'How is S/MIME encryption supported by Mail Relay.'
author: 'Privacy-Portal'
category: 'mail relay docs'
genre: 'documentation'
keywords: ['privacy portal tutorial', 'mail relay tutorial', 'mail relay smime encryption', 'mail relay under the hood', 'how does mail relay support smime']
date: '2023-02-26'
---

Mail Relay supports S/MIME encryption in a secure but limited fashion. This article gives you a look under the hood on our S/MIME implementation.

S/MIME relies on Public Key Infrastructure to establish trust between parties. It uses certificates issued by centralized and regulated Certificate Authorities (or CAs) automatically trusted by your device manufacturor (or by your mail client).

This means, every time a certificate gets issued, a known organization has to issue that certificate on behalf of the certificate owner. While this works very well for the web, for emails it can be cumbersome and leaks email addresses to the Certificate Authority in question.

S/MIME is most commonly used by corporations to encrypt emails within an organization. These companies, most of the time, use internal Certificate Authorities trusted by their company managed devices. This approach gets complicated to scale for the public in a privacy friendly manner. This is why PGP is more popular for individual use.

At Privacy Portal, we want to provide you with great privacy with the convenience of choosing your favorite email client. Many email clients only support S/MIME (such as Apple Mail). For that reason, we decided to provide both PGP and S/MIME support for our users.

In order for Mail Relay to provide S/MIME functionality, we designed a hybrid approach for Certificate Authorities. Every user owns their own Root Certificate Authority. And for every user, Mail Relay owns a dedicated Intermediate Certificate Authority (signed by the user's Root CA). All S/MIME certificates used between Mail Relay and a user are trusted by the user's Root CA.

When you issue a certificate using Mail Relay, the following gets created:

| Certificates      | Key Owner        | Usage                                      |
| ----------------- | ---------------- | ------------------------------------------ |
| Root Cert         | User (discarded) | Trust Root between Mail Relay and the User |
| Intermediate Cert | Mail Relay       | CA for all S/MIME certs                    |
| End Entity Cert   | User             | Inbound Mail Encryption                    |
| Recipient Certs   | Mail Relay       | Outbound Mail Encryption                   |

The Root Key is generated in the browser and is discarded immediately after signing the Intermediate Certificate. By trusting the root certificate, you are only trusting a single intermediate certificate. No new CA can be created at a later point in time under this root.

The intermediate key is owned by Mail Relay. This allows Mail Relay to issue S/MIME certificates on the fly on behalf of the senders. For example, if sender@domain is sending you an email, Mail Relay will create a certificate on behalf of this sender (under a pportal.io address). The generated certificate is automatically trusted by your client (same Root Certificate). This allows you to easily send S/MIME encrypted replies also.

The downside of this approach is that the Root Certificate is not automatically trusted by your device (or mail client). It requires you to manually install and trust the root certificate in order to send and receive S/MIME encrypted mail. We recommend limiting the trust to "basic policy" and "S/MIME" whenever possible for better security.

Even though we take security extremely seriously here at Privacy Portal, you should know that manually trusting a third party CA is not a best practice. This is why we recommend using PGP if your client supports it.
