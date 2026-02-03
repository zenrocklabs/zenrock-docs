---
title: Welcome to Zenrock
sidebar_label: Overview
sidebar_position: 1
slug: /
---

## Welcome to Zenrock

**Zenrock is on a mission to expand and grow what is possible onchain with products and services users actually want.** Our technology stack and deep cryptographic and cross-chain expertise allow us to venture into areas previously untapped.

**$ROCK is the value capture mechanism for the Zenrock ecosystem**, including all products developed by Zenrock Labs or by third parties leveraging Zenrock's infrastructure.

### The Zenrock Ecosystem

- **Zenrock**: A permissionless ecosystem supported by Zenrock Labs and the Zenrock Foundation
- **zrChain**: A purpose-built Layer 1 for distributed multi-party computation (dMPC)—flexible infrastructure powering everything in the Zenrock ecosystem
- **Decentralized Custody Tokens (DCTs)**: Cross-chain assets secured by dMPC, eliminating centralized vaults and single points of failure. The first two DCTs, zenBTC and zenZEC, are live on Solana
- **Hush Protocol**: A Zcash-inspired privacy layer on Solana. Shield assets, transfer privately, earn yield, and withdraw anywhere without exposing your wallets
- **Future Products**: dMPC unlocks use cases across DeFi, privacy, identity, key management, and beyond

**$ROCK benefits from ecosystem growth:** Every product built on zrChain, by Zenrock Labs or anyone else, flows revenue through the same tokenomics. More products, more fees, more value to $ROCK.

### Remote Control For Your Assets

Zenrock lets users directly interact with their favorite dapps across supported networks without the need for bridges between the networks. Since the MPC-generated public keys and signatures are stored securely and tamperproof on Zenrock, all that needs to be done is assembling the unsigned transaction with the signature and publishing it to the destination network. Zenrock has relayers in place for most of the networks already to improve the user experience as much as possible.

**This design lets users remotely control their assets from Zenrock** and reduces the need for many smart contract hops, wrapping of assets and drastically reduces time and transaction fees. With the possibility of building smart contracts on CosmWasm, Zenrock is a great place for aggregating many cross chain use cases, bundle liquidity and addresses across many networks.

## Zenrock Products

### zrChain

zrChain is Zenrock's own blockchain and the home of the native ROCK token. It is a sovereign application-specific blockchain built with the Cosmos SDK. zrChain is secured by the economic security of the ROCK token and Zenrock's dMPC network, which eliminates single points of failure in key management.

zrChain comes with various tools to make MPC easier to use and access as well as manage the keys and their assets. Workspaces play the core role where users can collectively manage their MPC keys and signatures to interact across various blockchain networks backed by zrChain's own policy engine that handles authorizations.

Developers can also build their own dApps on zrChain through CosmWasm smart contracts and access the full suite of zrChain features directly.

Read more about [zrChain](../zrChain/_category_.json).

### Decentralized Custody Tokens (DCTs)

DCTs are cross-chain assets secured by dMPC, eliminating centralized vaults and single points of failure. Unlike traditional wrapped assets that lock funds in a single custody contract, DCTs distribute custody across a network of wallets powered by dMPC.

#### zenBTC

zenBTC is Zenrock's flagship DCT: decentralized yield-bearing wrapped Bitcoin on Solana. By using dMPC, zenBTC provides a more secure and transparent alternative to traditional wrapped Bitcoin solutions. The underlying BTC is never lent out or used as risk capital—yield comes from protocol fees, not risky strategies.

Bitcoin private keys are securely generated and managed across Zenrock's and partners' federated MPC nodes, eliminating the need for a single trusted custodian and distributing custody across multiple parties.

#### zenZEC

zenZEC is decentralized wrapped Zcash on Solana. Zcash pioneered zero-knowledge proofs in cryptocurrency, enabling shielded transactions. By bringing ZEC to Solana via the DCT standard, zenZEC inherits both Zcash's privacy heritage and Zenrock's decentralized custody guarantees.

### Hush Protocol

Hush is Zenrock's privacy layer for Solana, enabling users to shield assets and transact privately without revealing the link between deposit and withdrawal addresses. Built on Miden STARK zero-knowledge proofs, Hush provides:

- **Privacy-preserving transactions**: Shield zenBTC or jitoSOL, transfer privately, and unshield to any address
- **No trusted setup**: Miden STARKs require no ceremony or trusted parameters
- **Post-quantum resistance**: Hash-based proofs remain secure against quantum attacks
- **Tiered viewing keys**: Share transaction history with auditors without spending capability
- **Built-in compliance**: OFAC screening at the sidecar level

## Going Omnichain with Zenrock

Zenrock and its MPC capabilities aim to provide a secure, fast, and convenient way of going to an omnichain future.
The Zenrock blockchain provides ways to request keys and signatures from Zenrock's MPC federation and use them cross-chain to remotely control assets without the need to manually hop via bridges and other smart contracts to execute a transaction on a remote network.
This approach can not only save gas costs but also bring a performance benefit.

The Zenrock blockchain is our sovereign application-specific blockchain built with the Cosmos SDK and provides a broad variety of workspaces to manage your keys and assets across various destination networks in a secure and efficient manner.

While the Cosmos-based Zenrock Blockchain can be used to make requests, we support the most popular networks as destination to execute transactions, such as ***other EVM networks***, ***Bitcoin***, ***Solana***, and the ***Cosmos ecosystem***. The created keys can be reused across networks as long as those networks support the key type, like a `secp256k1` ecdsa key can be used for EVM and Cosmos networks.
