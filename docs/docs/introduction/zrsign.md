---
title: zrSign Introduction
sidebar_label: zrSign
sidebar_position: 3
---

## Smart Contract Integration with zrSign

For developers preferring EVM networks to interface with our MPCs, we provide zrSign - a solidity-based smart contract solution that exposes methods to request keys- and signatures. Developers can chose between two versions of zrSign - zrSign Direct and zrSign Omni. 

While they both expose methods to make key- and signature requests, they differ in where the responses are being published. In zrSign direct, the requests are made directly to Zenrocks MPC Federation and returned back to the zrSign smart contract where the public keys and signatures are being stored. This implementation lets other dApps access their assets directly. zrSign Omni forwards the requests to zrChain, where it will be managed through workspaces and exposed to other features like policies and choice of keyrings to process the requests. Thus, bringing zrChain features directly to dApps on the EVM.

Check out zrSign in our [user guide](../testnet-guides/zrSign.md) and on the [implementation docs](../zrSign/_category_.json). 

## zrSign Versions

zrSign offers two versions to choose from, each exposing methods to make key- and signature requests, called [zrSign Direct](../zrSign/releases/zrSignDirect.md) and [zrSign Omni](../zrSign/releases/zrSignOmni.md).

Both versions are implemented in Solidity and can be used to make requests to the Zenrocks MPC Federations. The main difference is where the responses are being published. zrSign Direct publishes the responses back to the smart contract, while zrSign Omni publishes the responses to zrChain. 

zrSign Omni will also have functions exposed that allow for managing a workspace with zrSign the same way it is possible with zrChain. This brings the benefits of zrChain to EVM chains for developers who prefer developing on EVM chains. 

For more detailed information about zrSign versions, checkout the [zrSign docs](../zrSign//releases/_category_.json).