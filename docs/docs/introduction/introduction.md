---
title: Welcome to the Zen
sidebar_label: Project Overview
sidebar_position: 1
slug: /
---

## Welcome to Zenrock

The Zenrock project is a unique combination of blockchain and MPC technology deployed in a form factor that is easy to use for Web3 developers. Zenrock provides permissionless access to institutional-grade private key management through a smart contract on any chain or offchain APIs. 

Developers can build a single application on any chain that can initiate highly performant and secure settlement of assets on any other chain (EVM, Cosmos, Solana, Bitcoin). These capabilities allow developers to provide a far faster and more secure cross-chain user experience while simplifying development and maintenance.

### Remote Control For Your Assets

Zenrock lets users directly interact with your favorite dapps across supported networks. No need for bridges between the networks. Since the public key and signatures are stored securely and tamperproof on Zenrock, with the possibility of having private transactions, all that needs to be done is assembling the unsigned transaction with the signature and publish it to an RPC node of the destination network. Zenrock has relayers in place for most of the networks already to improve the user experience as much as possible.

This design lets users remotely control their assets from Zenrock and reduces the need for many smart contract hops, wrapping of assets and drastically reduces time and transaction fees. With the possibility of building smart contracts on CosmWasm, Zenrock is a great place of aggregating many cross chain use cases, bundle liquidity and addresses across many networks.

## Zenrock Products

### zrSign
zrSign is Zenrock's smart contract solution to expose MPC (Multi-Party Computation) technology for smart contract supported networks. Starting with EVM, we are also expanding to other networks like Solana. By leveraging Zenrock's MPC technology, zrSign ensures that private keys are never exposed, providing a high level of security for users.

Developers can interface zrSign smart contracts to integrate it into their own dApps, allowing them to request digital signatures for transactions on various supported networks without the need to manage private keys directly. This not only simplifies the development process but also enhances security by reducing the risk of key exposure. 

An integration with zrSign comes with additional benefits such as increased speed through a direct MPC response and remote execution of transactions on supported networks. Furthermore, cross-chain transactions don't require to be initiated via bridges, which can be a security risk and are often a single point of failure. 

Read more about zrSign [here](../zrSign/_category_.json).

### zrChain
zrChain is Zenrock's own blockchain and the home of the native ROCK token. It is a sovereign application-specific blockchain built with the Cosmos SDK and extends the features that are present on zrSign. zrChain is secured by the economic security of the ROCK token, but also through assets on Ethereum through an new Eigenlayer integration as zrChain's AVS (Actively Validated Services).

zrChain comes with various tools to make MPC easier to use and access as well as manage the keys and their assets. Workspaces play the core role where users can collectively request keys and signatures to interact across various blockchain networks backed by zrChain's own policy engine that manages authorizations.

Developers can also build their own dApps on zrChain through CosmWasm smart contracts and access the full suite of zrChain features directly. 

Read more about zrChain [here](../zrChain/_category_.json).

### zenBTC

ZenBTC is Zenrock's wrapped Bitcoin product that leverages decentralized multi-party computation (dMPC) infrastructure. By using MPCs, ZenBTC provides a more secure and transparent alternative to traditional wrapped Bitcoin solutions that are often opaque and centralized.

Bitcoin private keys are securely generated, shared, and managed across Zenrock’s and partners’ federated MPC nodes, eliminating the need for a single trusted custodian and distributing the custody of the deposited Bitcoin across multiple parties to prevent any single point of failure or mishandling.

Furthermore, zenBTC can be made available across many different networks as a wrapped token representation of Bitcoin with it being primarily managed through zrChain. 

## Going Omnichain with Zenrock

With Zenrock and its MPC-capabilities, we want to provide a secure, fast, and convenient way of going to an omnichain future.
zrSign and the Zenrock blockchain both provide ways to request keys and signatures from Zenrock's MPC federation and use them cross-chain and remotely control them without the need to manually hop via bridges and other smart contracts to execute a transaction on a remote network.
This approach can not only save gas costs but also bring a performance benefit. 

### Source Networks

The Zenrock blockchain is our sovereign application-specific blockchain built with the Cosmos SDK and provides a broad variety of creating workspaces to manage your keys and assets across various destination networks in a secure and efficient manner. 

To target the EVM networks, we are providing zrSign smart contracts written in Solidity that can either be directly interacted with or be interfaced into other dApps. The zrSign smart contracts provide the possibility of requesting keys and signatures with different levels of privacy and purposes. 

### Destination Networks

While the Cosmos-based Zenrock Blockchain and zrSign on EVM networks can be used to make requests, we will support the most popular networks as destination to execute transactions, such as ***other EVM networks***, ***Bitcoin***, ***Solana***, and the ***Cosmos ecosystem***. The created keys can be reused across networks as long as those networks support the key type, like a secp256k1 ecdsa key can be used for EVM and Cosmos networks. 

With the launch of the testnet, we will start with support for EVM as a narrower scope for testnet and will incrementally add support for the other networks, too. There will be frequently new features to explore, so stay tuned!
