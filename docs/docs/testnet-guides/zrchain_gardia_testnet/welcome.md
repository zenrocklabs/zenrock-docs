---
title: Welcome 
sidebar_label: Welcome
sidebar_position: 1
---

Welcome to the Zenrock Blockchain ("zrChain") testnet guide, which covers its core features and provides hands-on experience for managing keys and assets through Zenrock’s MPC Network. This guide shows how to set up and manage workspaces, how to apply policies inside workspaces, and how to make use of MPC keys across other blockchains.

## Links to Guides

- [Setup](setup.md)
- [Zenrock Chain Guide](zenrock-guide.md)
- [Ethereum Guide](explore-ethereum/_category_.json)
    - [WalletConnect Test dApp](explore-ethereum/walletConnect.md)
    - [Personal Sign](explore-ethereum/personal-sign.md)
    - [Uniswap Guide](explore-ethereum/uniswap.md)
    - [Policy Guide](explore-ethereum/policy-swap.md)

## General Information

Zenrock Blockchain is the interface to Zenrock’s MPC Network, or similar Key Management Systems, which are referred to as “Keyrings”. Keyrings receive key and signature requests published on zrChain and return responses back to zrChain. Read more about our [MPCs](../../mpc.md).

The responses to key and signature requests contain public keys or signatures respectively, or a rejection notice if the request cannot be fulfilled. The private key material is secured and only accessible by the MPC protocol running within a trusted execution environment (TEE). Only workspace members can request signatures. 

Zenrock generated keys and their derived addresses function like standard Externally Owned Accounts (EOAs). These EOAs can be used separately from zrChain. Once keys have been generated, zrChain simply serves to mediate signature management.

Signed transactions originating from zrChain are processed by an off-chain relayer and broadcasted to an RPC node for inclusion on the relevant blockchain.

## zrChain Features

zrChain comes with a rich set of features that provide an intuitive user experience combined with institutional-grade security.

**Workspaces and Policies**

Workspaces are a foundational element in zrChain - they provide a way to request, manage, and use keys created by zrChain keyrings.

After creating a workspace, additional members can be added and workspace policies can be created. This allows collective management of the workspace and its assets. Policies define governance for a workspace, typically specifying which combination of accounts must provide approval for a signature to be considered valid.

Policies also provide a governance structure for workspace changes - they provide a way of managing the collaborative control of a workspace.

**Remote Control Assets**

Keys created by zrChain keyrings enable users to securely manage assets on a particular blockchain network. Such keys form the basis of Externally Owned Accounts (EOAs) in Ethereum and other account-based networks, or simply user-controlled addresses on the Bitcoin network.

Keys are used to derive network specific addresses, which can in turn be used to receive funds.

Zenrock-mediated keys can be used for:

- General authentication
- Encrypted data signing
- Creation of signed transactions for broadcast to the relevant chain.

Keys are managed in a workspace and their use can be defined within policies, for example, by defining required and optional approvers.

**Keyrings**

A keyring defines an off-chain service for providing keys and signatures to zrChain. Keyrings are identified by a unique account identifier.

Zenrock Labs, together with partners like Quicknode, provide the Zenrock keyring. This ensures the distributed management of private key material across nodes in the MPC network.

The Zenrock keyring architecture is pluggable - third parties can onboard their own keyring and provide keyring services via zrChain. Keyring providers may define custom fees for key and signature requests.

**Smart Contract Development**

zrChain also includes the CosmWasm smart contract environment that allows developers to build directly on zrChain. CosmWasm allows for Rust-based smart contracts to interact with zrChain. We provide interfaces to our custom modules that make it easy for developers to integrate their dApps with our custom module logic.
