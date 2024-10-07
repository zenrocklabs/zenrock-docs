---
title: zrSign - A secure cross-chain application builder
sidebar_label: zrSign
sidebar_position: 1
---

zrSign facilitates the development of cross-chain applications, offering enhanced security through Multi-Party Computation (MPC). It enables messaging and wallet management for smart contracts operating across different blockchain networks.

## Key Takeaways of zrSign

- The MPC module in zrSign ensures secure wallet generation and signing.
- zrSign enables communication between smart contracts on different chains.
- Integration is simple; supporting the interaction interface in user-owned smart contracts is the only requirement.

## Motivation

Today we see a lot of emerging L1 blockchains and scaling L2 solutions and yet more new networks to come. Storage of assets and running dApps on such emerging chains or building cross-chain dApps are challenging due to several reasons:

- ***Issues with bootstrapping liquidity on new chains***

    - User experience: Technical knowledge required to engage with different networks and cross-chain activities can be a barrier to entry for many users, especially when it requires managing multiple wallets or navigating complex transaction processes.

    - Associated risk: Some chains, especially new ones, can carry higher operational and security risks. Each blockchain in a cross-chain environment has its own unique characteristics, such as its consensus mechanism, transaction format, smart contract language, and more. Keeping up with the updates, fixes, and changes in each of these blockchains can be a non-trivial task.

- ***Challenges related to maintenance of cross-chain applications***

    Maintaining a cross-chain application involves substantial engineering and operational efforts. Developers need to understand the intricacies of multiple blockchains and, potentially, multiple smart contract languages. Coordinating operations across multiple chains can be logistically challenging and require substantial resources. To manage the complexity of this task, developers may resort to centralized or semi-centralized components. While this can simplify development and maintenance, it can also introduce central points of failure.

- ***Lack of flexibility and tooling for secure cross-chain messaging***

    Each blockchain has its own unique technical characteristics, including its consensus mechanism, data structure, and transaction validation process. There are currently no widely accepted standards for cross-chain messaging in the EVM, which means each project might implement its own methods, which increases potential attack vectors.

zrSign allows creating wallets programmatically controlled by smart contracts and the Zenrock MPC network. Users can manage accounts on other supported blockchains as well, which enables dApp developers and blockchain platform teams to build cross-chain.

An EVM contract isn't able to generate signatures for transactions. zrSign aims to fix this shortcoming by enabling contracts to trigger generation of keys and signatures outside of the contract. This is achieved by levering the existing Zenrock MPC architecture together with the relayer technology.

***zrSign, therefore, allows you to manage multiple assets on many different chains within one smart contract.***

You avoid dealing with key management of programmatically generated addresses by trusting Zenrock's MPC architecture. This takes one of the biggest burdens off the shoulders of blockchain users.

## Use Cases

zrSign allows you to build applications for various use cases:

- zrSign enables secure programmable storage of funds and other on-chain assets with arbitrary administration and logic.

- zrSign can create a set of wallets on different chains, and you can control these wallets by a smart contract from a single chain. Therefore, zrSign creates a custody layer out of any blockchain. zrSign currently supports other EVM-based blockchains, and soon it will also support broadcasting to non-EVM blockchains like Bitcoin.

- We can prove the custody of funds and other assets across many different blockchains (proof of state). It's useful when you need to delegate intense on-chain computations, like generation of ZK proofs, to cheaper networks.

- zrSign further allows bootstrapping TVL for cross-chain dApps on matured chains while being primarily deployed on emerging chains.

## zrSign Request Types

1. The ***zrSign Smart Contract*** is a go-to access point for users to interact with zrSign services:

- The `zrKey` function allows you to generate keys.
- The `zrSignHash` function allows you to request signatarus for encrypted data or hashes.
- The `zrSignTx` function allows you to request signatures for unsigned transactions and also provides the option to sign and broadcast a transaction, which will get picked up by the relayer.

Note that the zrSign smart contract deployment is currently primarily focusing on EVM blockchains such as Ethereum and Polygon.

2. The ***MPC network*** is listening to key generation or signature request events emitted by the zrSign Smart Contract(s).

Once an event has been detected, the MPC network automatically processes the request and returns the value back to the user. It can create signatures only for keys previously generated by the MPC network.

3. The ***Cross-Chain Ralayer*** is listening solely to broadcast requests emitted by the zrSignTx function of the zrSign Smart Contract(s). The user inputs unsigned transactions generated in the previous steps. The MPC creates a signature for this transaction and publishes it on the Smart Contract as a broadcast event. Then this event is picked up by the relayer, which acts as a relayer and submits the signed transaction on the given destination blockchain.

## Security Considerations

The logic of zrSign is built with keyless infrastructure in mind enabled by the MPC network. However, initially you may want to use your own private key to interact with zrSign. If you lose it, you will also lose access to your funds in other wallets. zrSign is therefore prone to general smart contract risks as well as risks associated with managing private keys.

The Cross-Chain Relayer is a separate off-chain component that assembles and braodcasts the transactions. The relayer is designed to be decentralized, meaning you could run your individual relayer instance managing your individual requests or projects. If you deploy zrSign and the relayer to your own projects, you need to assure high availability of the relayer to not miss broadcasting events. The MPC operators will run relayers and provide docker packages for anyone to set up other relayers by themselves.