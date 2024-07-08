---
title: zrSign Use 
sidebar_label: zrSign developer flow
sidebar_position: 4
---

zrSign provides MPC features through key- and signature requests particularly for EVM chains right now. Interfacing zrSign allows solidity-based dApps to invoke zrSign's methods and access its state. Read more about zrSign and how to integrate it best in [this section](../../../docs/docs/zrSign/_category_.json) of our documentation.

This page focuses on how zrSign version 1 and zrSign version 2 are different and how they can be used in dApps. 

## zrSign version 1 

zrSign version 1 aims for developers to [interface](../zrSign/devs/references/izrsign-interface.md) their dApp with zrSign directly and then let the dApp developer build their use case around the returned keys and signatures coming from Zenrock's MPC. 

This allows the dApp developer to query the keys and signatures directly from the zrSign smart contract and use this information within the dApp. 

## zrSign version 2 - "the zrChain outpost"

zrSign version 2, which will be released soon, aims for enabling zrChains features for EVM developers remotely. While the interfaces to zrSign stay the same, and therefore the developer experience calling them, the keys and signatures are not returned to the smart contract but instead on zrChain directly. 

The keys and processes are then fully integrated with zrChain, embedded in a workspace and managed by admin- and sign policies, exposed to different type of keys and wallet types not represented on zrSign version 1. Developers then can make signature requests via zrSign version 2 that are getting processed on zrChain to facilitate a cross-chain experience. 

The addition of zrChain-native policies allows zrSign developers to add conditions and different approvers to their signature requests without needing to handle the authorization level within their smart contract. Thus, further opening the realm of possibilities for smart contracts on different chains to work with each other via zrChain. 

## Deployment

Both implementations will be their own product and deployed as separate smart contracts, meaning developers will be able to use both versions independently of each other. 
