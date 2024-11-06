---
title: MPC Cross-Chain Policy
sidebar_label: Cross-Chain Strategy
sidebar_position: 6
---

This page is dedicated to the cross-chain strategy of the Zenrock MPC nodes and to highlight the simplicity of MPC-based cross-chain messaging compared to other solutions. 

### Cross-Chain Problem 

The number of blockchains in the space is rapidly growing and so is the fragementation of liquidity, use cases and developer attention. This fragmentation makes it difficult for users to navigate the space and for developers to build on top of it. 

Zenrock aims to solve this fragmentation by providing an MPC-based protocol that allows users to send and receive messages on and across different blockchains with the same level of security as the blockchain they originated from where the users can chose their security level based on their risk appetite. 

### Cross-Chain Solutions

The most common way to communicate cross chain is with a centralized bridge. While these bridges are useful, they come with their own set of risks such as single points of failure, loss of funds due to exploits and human error, and the need for users to trust the bridge with their assets. On top of that, it often includes many and larger smart contract interactions which can take a long time to execute and and therefore higher transaction fees.

Most popular protocols like LayerZero, Wormhole, and Axelar often have a very strong integration with both sides of the bridge that allows them to reliably sent messages across and provide additional features like synchronous communication to confirm the successful execution of the message like it is with LayerZero. 

### How Zenrock MPC is Different

Zenrock's MPC-generated keys can be used on supported blockchains natively without the need for a bridge. This means that unsigned transactions, once they are signed by the MPCs, can be sent directly to the destination chain's RPC where they are executed as a standard transaction and which can be found in the standard block explorers. 

One key can be reused across multiple chains because the public key is derived into blockchain-specific addresses. An `secp256k1` key can be derived into an EVM-address starting with `0x` or a Zenrock address starting with `zen` for example. This makes the UX of using Zenrock seamless and native compared to other solutions. While the private key is secretly stored across multiple MPCs, the public keys are stored on `zrChain` and `zrSign` where they can be derived into multiple blockchain-specific addresses.

What is signed by the MPCs is solely determined by the user and can be as simple as a message or as complex as a swap. The MPCs do not know nor care about what is in the message as long as the request is approved by authorized and required parties within Zenrock's policy manager. This concept leaves developers the freedom to chose and craft the unsigned transactions as they see fit for their use cases. Zenrock itself is also working on solutions to facilitate MPC-based keys to provide compelling use cases like zenBTC.

<div style={{maxWidth: "900px", margin: "0 auto"}}>

![Cross-Chain Process](../static/img/cross-chain-process.png)

</div>

### Encouraging Developers to Build on Top of Zenrock

With this universal, cheap, and fast cross-chain solution, Zenrock is encouraging developers to build on top of either `zrChain` in CosmWasm (Rust) or `zrSign` in Solidity. We are providing strong support for developers to build on top of our solutions and to provide a seamless experience for their users. 