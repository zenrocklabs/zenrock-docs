---
title: The Zenrock Chain
sidebar_label: Introduction
sidebar_position: 1
slug: /
---

## Welcome to Zenrock

The Zenrock Blockchain is the flagship product of the Zenrock project to provide bedrock security infrastructure that will support an omnichain future. Through our custom modules for identity- and asset management, we provide a comprehensive means to build applications to **_natively_** interact with the largest blockchain networks.

This documentation provides insights into Zenrock chain design as well as it's related off-chain network. Further, you can find developer documentation that helps to get started building applications using Zenrock.

### What is Zenrock and What Can You Do with It?

Zenrock is a unique combination of blockchain and MPC technology deployed in a form factor that is easy to use for Web3 developers. Zenrock provides permissionless access to institutional-grade private key management through a smart contract on any chain or offchain APIs. A developer can build a single application on any chain that can initiate highly performant and secure settlement of assets on any other chain (EVM, Cosmos, Solana, Bitcoin). These capabilities allow developers to provide a far faster and more secure cross-chain user experience while simplifying development and maintenance.

### Remote Control For Your Assets

Zenrock lets users directly interact with your favorite dapps across supported networks.
No need for bridges between the networks. Since the public key and signatures are stored
securely and tamperproof on Zenrock, with the possibility of having private transactions,
all that needs to be done is assembling the unsigned transaction with the signature and
publish it to an RPC node of the destination network. Zenrock has relayers in place for
most of the networks already to improve the user experience as much as possible.

This design lets users remotely control their assets from Zenrock and reduces
the need for many smart contract hops, wrapping of assets and drastically reduces time and
transaction fees. With the possibility of building smart contracts on CosmWasm, Zenrock
is a great place of aggregating many cross chain use cases, bundle liquidity and addresses
across many networks.

## Going Omnichain with Zenrock

With Zenrock and its MPC-capabilities, we want to provide a secure, fast, and convenient way of going to an omnichain future.
zrSign and the Zenrock blockchain both provide ways to request keys and signatures from Zenrock's MPC federation and use them cross-chain and remotely control them without the need to manually hop via bridges and other smart contracts to execute a transaction on a remote network.
This approach can not only save gas costs but also bring a performance benefit. 

### Source Networks

The Zenrock blockchain is our sovereign application-specific blockchain built with the Cosmos SDK and provides a broad variety of creating workspaces to manage your keys and assets across various destination networks in a secure and efficient manner. 

To target the EVM networks, we are providing zrSign smart contracts written in solidity that can either be directly interacted with or be interfaced into other dApps. The zrSign smart contracts provide the possibility of requesting keys and signatures with different levels of privacy and purposes. 

### Destination Networks

While the Cosmos-based Zenrock Blockchain and zrSign on EVM networks can be used to make requests, we will support the most popular networks as destination to execute transactions, such as ***other EVM networks***, ***Bitcoin***, ***Solana***, and the ***Cosmos ecosystem***. The created keys can be reused across networks as long as those networks support the key type, like a secp256k1 ecdsa key can be used for EVM- and Cosmos networks. 

With the launch of testnet, we will start with support for the EVM as a narrower scope for testnet and will incrementally add support for the other networks, too. There will be frequently new features to explore, so stay tuned!

### Policies

Policies define the conditions that need to be met in order for the request to be processed
by the corresponding keyring, like Zenrock's MPC. The policies contain participants that
are eligible to approve and reject requests.

Once a request is formed, by for example requesting a signature, actions for other workspace
owners or admins are being created, as defined in the workspace's policy. Once the condition
specified in the respective workspace policy is met, the request is published and can further
be processed by the MPCs.

While policies on Zenrock are already very powerful and help to split risk and control across
multiple accounts, we are aiming to improve our policy engine to allow more nuanced policy
conditions.

### Cosmos SDK

The Cosmos SDK is a modular blockchain framework customized to build application-specific
blockchains with their own set of validators and connected to the cosmos ecosystem with
the IBC protocol. The Cosmos SDK brings standard modules that cover the basics of blockchain
interaction, like for example the interface to CometBFT - the underlying consensus engine.
This allows Zenrock to be highly performant, compatible and tailored for its own applications.

### Smart Contracts with CosmWasm

Besides providing three custom modules ([identity](./zenrock/identity.md), [treasury](./zenrock/treasury.md),
and [policy](./zenrock/policy.md)), Zenrock also has support for CosmWasm. The rust-based
smart contract language allows building more dynamic use cases, dapps and other features
to facilitate a rapid development and cost-effective interaction.

### Smart Contracts with zrSign

For developers preferring EVM networks to interface with our MPCs, we provide zrSign - a solidity-based smart contract solution that exposes methods to request keys- and signatures. Developers can chose between two versions of zrSign - zrSign Direct and zrSign Omni. 

While they both expose methods to make key- and signature requests, they differ in where the responses are being published. In zrSign direct, the requests are made directly to Zenrocks MPC Federation and returned back to the zrSign smart contract where the public keys and signatures are being stored. This implementation lets other dApps access their assets directly. zrSign Omni forwards the requests to zrChain, where it will be managed through workspaces and exposed to other features like policies and choice of keyrings to process the requests. Thus, bringing zrChain features directly to dApps on the EVM.

Check out zrSign in our [user guide](./testnet-guides/zrSign.md) and on the [implementation docs](./zrSign/_category_.json). 