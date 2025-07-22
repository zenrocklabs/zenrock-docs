---
title: Welcome to the Zen
sidebar_label: Project Overview
sidebar_position: 1
slug: /
---

## Welcome to Zenrock

The Zenrock project is a unique combination of blockchain and MPC technology deployed in a form factor that exposes new ways of interacting and accessing native assets in a cross-chain manner. Zenrock provides permissionless access to institutional-grade private key management and exposes its functionality and products across networks like Bitcoin, Solana, EVM, and Cosmos.

Zenrock already offers a custody platform with zrChain, a Cosmos-based sovereign blockchain, alongside MPC-enabled products that go beyond pure custody like minting of zenBTC on Solana and Ethereum, as well as moving native ROCK token between zrChain and Solana.

Developers can already access and build on those platforms to benefit from Zenrock's custody solution.

### Remote Control For Your Assets

Zenrock lets users directly interact with their favorite dapps across supported networks without the need for bridges between the networks. Since the MPC-generated public keys and signatures are stored securely and tamperproof on Zenrock, all that needs to be done is assembling the unsigned transaction with the signature and publishing it to the destination network. Zenrock has relayers in place for most of the networks already to improve the user experience as much as possible.

**This design lets users remotely control their assets from Zenrock** and reduces the need for many smart contract hops, wrapping of assets and drastically reduces time and transaction fees. With the possibility of building smart contracts on CosmWasm, Zenrock is a great place for aggregating many cross chain use cases, bundle liquidity and addresses across many networks.

## Zenrock Products

### zrChain

zrChain is Zenrock's own blockchain and the home of the native ROCK token. It is a sovereign application-specific blockchain built with the Cosmos SDK. zrChain is secured by the economic security of the ROCK token, but also through Bitcoin's economic security through a new Eigenlayer integration as zrChain's AVS (Actively Validated Services).

zrChain comes with various tools to make MPC easier to use and access as well as manage the keys and their assets. Workspaces play the core role where users can collectively manage their MPC keys and signatures to interact across various blockchain networks backed by zrChain's own policy engine that handles authorizations.

Developers can also build their own dApps on zrChain through CosmWasm smart contracts and access the full suite of zrChain features directly.

Read more about [zrChain](../zrChain/_category_.json).

### zenBTC

ZenBTC is Zenrock's wrapped Bitcoin product that leverages decentralized multi-party computation (dMPC) infrastructure. By using MPCs, ZenBTC provides a more secure and transparent alternative to traditional wrapped Bitcoin solutions that are often opaque and centralized.

Bitcoin private keys are securely generated and managed across Zenrock’s and partners’ federated MPC nodes, eliminating the need for a single trusted custodian and distributing the custody of the deposited Bitcoin across multiple parties to prevent any single point of failure or mishandling.

Furthermore, zenBTC can be made available across many different networks as a wrapped token representation of Bitcoin with it being primarily managed through zrChain.

## Going Omnichain with Zenrock

Zenrock and its MPC capabilities aim to provide a secure, fast, and convenient way of going to an omnichain future.
The Zenrock blockchain provides ways to request keys and signatures from Zenrock's MPC federation and use them cross-chain to remotely control assets without the need to manually hop via bridges and other smart contracts to execute a transaction on a remote network.
This approach can not only save gas costs but also bring a performance benefit.

The Zenrock blockchain is our sovereign application-specific blockchain built with the Cosmos SDK and provides a broad variety of workspaces to manage your keys and assets across various destination networks in a secure and efficient manner.

While the Cosmos-based Zenrock Blockchain can be used to make requests, we support the most popular networks as destination to execute transactions, such as ***other EVM networks***, ***Bitcoin***, ***Solana***, and the ***Cosmos ecosystem***. The created keys can be reused across networks as long as those networks support the key type, like a `secp256k1` ecdsa key can be used for EVM and Cosmos networks.
