---
title: zrSign Developer Guide 
sidebar_label: zrSign Developer Guide
sidebar_position: 1
---

zrSign provides Zenrock MPC network features via key and signature requests. Current support is for EVM-based chains with many more coming in the near future.
Interfacing with zrSign allows Solidity-based dApps to invoke zrSign's methods and access its state. For more information on zrSign and its integration, refer to [this section](../../zrSign/concepts/zrSign.md) of our documentation.
This page focuses on the differences between zrSign Direct and zrSign Omni and how they can be leveraged for different use cases.

## zrSign Direct

zrSign Direct enables developers to [interface](../../zrSign/devs/references/izrsign-interface.md) their dApps directly with zrSign, allowing them to build use cases based on the keys and signatures returned by the Zenrock MPC network and managed directly by the smart contract. zrSign Direct allows dApp developers to query keys and signatures directly from the smart contract for use within the dApp.

## zrSign Omni

zrSign Omni (coming this summer), exposes Zenrock chain (zrChain) features for EVM developers remotely. The interfaces to the zrSign smart contract remain the same. However, keys and signatures are returned to zrChain instead of the smart contract.
This fully integrates key and signature requests with zrChain. 

zrSign Omni:
1. Allows keys to be embedded in a workspace which can be used by an admin, and to sign policies
2. Provides developers access to a broader set of blockchains than zrSign Direct (most notably Bitcoin and Solana)
3. Allows developers to craft custom business rules in the form of Policies to control transaction flows, necessary approvers, etc.
4. Allows developers to use other keyring providers, in addition to the Zenrock MPC network 

## Deployment

zrSign Direct and zrSign Omni are distinct products and deployed as separate smart contracts, allowing developers to use both versions independently.
