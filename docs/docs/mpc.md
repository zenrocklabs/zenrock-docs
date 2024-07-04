---
title: Multi-Party Computation
sidebar_label: MPC
sidebar_position: 5
---

## Zenrock's Multi-Party Computation

From the private key controlling the digital assets, Zenrock's MPC protocol generates multiple independent secrets which are then distributed between MPC nodes. While Zenrock does run some MPC nodes by themselves but ultimately most of the nodes on the Zenrock keyring will be run by third parties.

When an asset owner wants to sign a transaction or generate a public key, the request gets picked up by the MPC nodes which individually calculate their share of the key and signature
and combined create the key material or signature respectively. Afterwards, the public key or the signature get published to the zrSign smart contract.

## The benefits of MPC
By replacing cumbersome private key management with MPC, Zenrock makes digital assets immediately accessible, without compromising security. This allows users to enjoy the full benefit of digital assets as programmable money, and broadcast transactions instantly without fear of loss.

The zrSign protocol transforms a simple custody solution into an blockchain-agnostic scaling mechanism—enabling digital asset managers to leapfrog the settlement delays, privacy issues, and security loopholes that arise from the centralized management of private keys.

### Institutional-grade Security
Private keys stored online are a prime target for hackers, who have looted billions in crypto assets by attacking centralized hot wallets.

MPC offers the possibility of storing crypto assets without compromising security. But when the devices running the MPC protocol are centralized, a single point of failure is reintroduced.

Zenrock's MPC distributes private key shares over a distributed MPC architecture, completely eliminating the single point of failure. Each MPC Node on the network has its own secrets. But the loss of a single secret doesn’t give an attacker any advantage in gaining control over the digital assets.

Instead of hacking a single machine and walking away with the private key, a hacker would need to compromise all the machines in the MPC Network.

### Flexible governance
MPC nodes can be mapped to specific organizational requirements, with various different numbers of trustees arranged in sets and subsets, and limited by specific thresholds.

### Optimal for Omnichain Integration
MPC is inherently best suited for an omnichain world as an off-chain technology. Unlike multi-signature solutions, which are chain-specific and often unavailable in certain ecosystems, MPC operates independently of the underlying blockchain. This flexibility ensures broader compatibility and accessibility, allowing digital asset owners to maintain control without being limited by the capabilities of individual blockchains.

## Why MPC is the future
Just as Bitcoin takes the trust out of transactions by removing the third party, MPC can take the trust out of private key management.

But unless the MPC protocol is driven by decentralized consensus, it risks replicating the same security loopholes and settlement delays of centralized private key management.

Consensus-driven MPC liberates digital assets from these problems, setting them free to be securely staked, loaned, or traded in the rapidly growing DeFi ecosystem.

## Comparison to existing on-chain key management services

To understand how the zrSign protocol differs from existing on-chain key management services,
it is helpful to differentiate between multisig wallets and dMPCs. 

### Multisig Wallets

A multisig wallet is a type of cryptocurrency wallet requiring multiple signatures from different parties for transactions. 
It's set up with several private keys distributed among individuals or entities, with a predetermined number needed to authorize transactions. 
Users create transactions and send them to the wallet, which verifies and collects the required signatures from authorized signers. 
Once enough signatures are gathered, the wallet combines them to execute the transaction securely.

These wallets are commonly used in scenarios where multiple parties need joint control over funds, 
enhancing security by requiring consensus before transactions. They're ideal for businesses, organizations, or partnerships 
seeking to mitigate risks associated with unauthorized access or fraud.

The most popular example for this type is Gnosis, a digital wallet designed for managing and cryptocurrencies and digital assets through multi signature. 

### Shamir's Secret Sharing Scheme

***[Shamir's Secret Sharing](https://medium.com/keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)*** is a cryptographic scheme that divides sensitive data like private keys into parts. Users can define the total number of parts, and a specific subset of parts required to recreate the whole.

Unlike MPC TSS, where signing is truly distributed and each signer directly signs the transaction, in SSSS the shares need to be reassembled on a single machine, or by a single trusted actor. This introduces a single point of failure.

### Multi Party Computation

Multi-Party Computation (dMPC) is a cryptographic protocol that allows multiple parties to jointly 
compute a function over their inputs while keeping those inputs private. It ensures that no single party can learn the inputs of others, 
and the output is revealed only to authorized participants. 
dMPC achieves this by distributing the computation among the participating parties, with each party holding a share of the data and contributing to the final result.

In dMPC, each party privately inputs their data into the protocol, which then orchestrates the computation across all participants. 
Through secure computation techniques such as secret sharing and cryptographic protocols like secure multiparty computation (MPC), 
dMPC ensures that the computation is performed without any party revealing its private data to others. 
Once the computation is complete, the output is revealed to the authorized parties without exposing any individual inputs, 
maintaining privacy and confidentiality throughout the process.

In the context of digital assets, MPC can be used to replace individual private keys for the signing of transactions. 
MPC distributes the signing process between multiple computers. Each computer possesses a piece of private data representing a share of the key, 
and together they cooperate to sign transactions in a distributed way.

Zenrock implements dMPC and makes it accessible through the zrSign smart contract. 