---
title: 'How to update your Encryption Profile'
description: 'How to update your Mail Relay Encryption Profile.'
author: 'Privacy-Portal'
category: 'mail relay docs'
genre: 'documentation'
keywords:
  [
    'privacy portal tutorial',
    'mail relay tutorial',
    'mail relay encryption profile',
    'encryption profile',
    'modify encryption profile',
    'update encryption profile',
    'privacy portal encryption profile'
  ]
date: '2023-02-26'
---

Mail Relay's email encryption is managed using Encryption Profiles. A profile represents a PGP or S/MIME encryption configuration. When you set up encryption for the first time you simply create a new encryption profile.

When it's time to update (or modify) your encryption configuration, you need to create a new encryption profile. You can have multiple encryption profiles set up with you Mail Relay account but only one can be enabled for inbound mail. When Mail Relay receives an inbound mail, it uses the active encryption profile to encrypt the emails before relaying them to your personal email.

When responding to an email, your mail client might select the certificate (or PGP key) from the most recent profile or from an older profile (depending on the client). Mail Relay is automatically able to handle replies from any encryption profile available in your settings.

If you delete a profile or if a profile expires, the corresponding certificates or PGP keys will no longer be available for use.
