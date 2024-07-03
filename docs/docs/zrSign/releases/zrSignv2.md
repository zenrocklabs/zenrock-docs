---
title: zrSign Version 2
sidebar_label: Version 2
sidebar_position: 3
---

## Introduction

**zrSign v2** is the next evolution step for zrSign to provide even better key and signature services. Building on the foundation of zrSign v1, this version brings significant performance and architecture improvements, leveraging the capabilities of the Zenrock blockchain. 

### Zenrock Blockchain to Store Key and Signature Responses

Depending on which EVM network is used to interact with a zrSign v1 smart contract, the process of requesting and returning a key or signature can take up to a few minutes based on the underlying network's traffic and can cause significantly higher transaction fees. To solve this issue, zrSign v2 does keep the same functions to request keys and signatures but will not receive the responses to key and signature requests, but rather those responses are being published on the Zenrock Blockchain. 
This approach comes with a series of benefits: 

1. ***Continuously fast and cheap processing of requests***: The responses appear on-chain within a few seconds and transaction fees can only be a fraction compared to the evm networks where zrSign is deployed.
2. ***Key harmonization across zrSign implementation***: zrSign v2 allows accessing keys generated through zrSign smart contracts deployed on other networks. 
3. ***Backwards compatibility***: The interfaces for zrSign smart contracts stay the same, which ensures stability of all dApps and systems interacting with zrSign smart contracts.
4. ***Leveraging Workspaces and Policies***: Developers have the possibility to access their key material also through Zenrock Chain directly, giving them direct access to some of the exclusive features on Zenrock such as workspace management and policies for request management.

### Further Access to More Blockchains

zrSign v2 also enables access to other networks like Bitcoin, Solana or other chains with more complex transaction structures. This also includes alternative zrSign implementations on any blockchain for example in a Rust version to deploy zrSign natively on other networks. 

### zrSign v2 System Architecture

The following diagram shows the system architecture of zrSign v2 in combination with the Zenrock blockchain. 

![zrSign v2 Architecture](../../../static/img/zrSignV2.png)

The system architecture is very similar to the one of the Zenrock blockchain today, but it additionally does have `zrSignReceiver` component. 
This component will store the responses for key and signature requests and provides access to the other Zenrock modules. 
It's also worth mentioning that no additional relayer logic is required and the ones listening on Zenrock directly can be used to broadcast cross-chain messages. Instead of running multiple relayers, developers can now only run a single one which can be tailored to their custom address for example.