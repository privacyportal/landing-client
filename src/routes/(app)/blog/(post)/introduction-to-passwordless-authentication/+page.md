---
title: 'Introduction to Passwordless Authentication'
description: 'A non-technical introduction to Passwordless Authentication use at Privacy Portal.'
author: 'Privacy-Portal'
category: 'learning'
genre: 'feature overview'
keywords: ['introduction to passwordless authentication', 'passwordless privacy', 'passwordless security']
date: '2024-05-14'
---

To ensure our commitment to privacy and security, our app uses Passwordless Authentication in accordance with the latest privacy-preserving standards. This article provides a non-technical overview of Passwordless Authentication and explains its advantages over traditional authentication methods.

## What is Passwordless Authentication?

As the name implies, Passwordless Authentication allows users to authenticate without the need for a conventional password. Instead, your device (or security key) relies on cryptography to help verify your identity with our service. It generates and securely manages cryptographic keys, enabling you to authenticate without ever exposing your secret key to us. Some devices feature dedicated security hardware, such as the "Secure Enclave" on Apple devices, which handles this process. The technology employed in the authentication process uses the same concepts as those found in blockchain wallets.

## How does it work?

When attempting to sign in using the Privacy Portal app, our server sends your browser a challenge to sign. Your device will need to use your secret key to sign the challenge, then send the signature back to our server for verification. When successful, you will be logged into your account.

Some devices, such as Apple devices, use local biometric verification (Touch ID or Face ID) before signing the challenge. This process occurs offline and does not expose any biometric data to our servers.

### Usability Benefits

Passwordless Authentication eliminates the need to remember and manage passwords. The process is automatic, secure, and seamless across all your devices.

### Security Benefits

The primary security advantage is that we never store any passwords, which aligns with our policy of minimizing user data on our servers.

From a user's perspective, Passwordless Authentication prevents password reuse, as each account utilizes a new set of keys, all managed by your device. Additionally, it makes your Privacy Portal account resistant to phishing, credential theft, and credential stuffing attacks.

### Privacy Baked In

Passwordless Authentication is completely private. Our service does not require any biometric data for authentication. While some devices, such as smartphones and laptops, use biometric verification to authenticate users, this verification occurs entirely offline and on-device. Our service does not require nor have access to your biometric data. The device locally verifies your identity before allowing you to authenticate with our service.

### Industry Standards and Compliance

Our passwordless system adheres to industry standards for security and privacy. We follow guidelines set by organizations like the FIDO2 Alliance to ensure our authentication methods meet rigorous safety criteria.

## Conclusion

We recognize that new technologies can be intimidating, but our primary focus is: **Privacy first**. With Passwordless Authentication, you enjoy enhanced security and better usability without compromising privacy.
