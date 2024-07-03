---
title: Treasury Module
sidebar_label: Treasury Module
sidebar_position: 5
---

Zenrock's **_Treasury Module_** is responsible for requesting and managing keys.

The treasury module facilitates a wide-range of applications - including cross-chain interaction - by fulfilling key and signature requests.

### Supported Keys

Zenrock has the capacity to generate **_ecdsa secp256k1_** and **_eddsa ed25519_** keys. Key requests are processed off-chain by registered Keyrings, which subsequently store generated keys on-chain.

Keys can be used to derive valid **_EVM_**, **_Cosmos_**, **_Solana_**, and **_Bitcoin_** addresses.

Zenrock-generated addresses behave like standard self-hosted wallets and are able to interact with the relevant network natively. This exposes users to a broad range of the most popular networks.

### Signatures

Zenrock provides a **_signature request_** service that allows users to either request arbitrary signatures or request for transactions to be signed.

The transaction signing service may include broadcasting the transaction to the relevant layer one network as necessary.

The web application allows users to either manually define a transaction payload or use services like WalletConnect to submit unsigned transactions/messages to the Zenrock system.
