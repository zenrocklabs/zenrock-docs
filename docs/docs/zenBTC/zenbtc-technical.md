---
title: zenBTC - Technical Details
sidebar_label: zenBTC - Technical Details
sidebar_position: 4
---

This page provides a detailed technical overview of how zenBTC operates under the hood.

## zenBTC on GitHub

The zenBTC module is located in its own [GitHub repository](https://github.com/zenrocklabs/zenbtc). There you can find the available messages and queries for minting and redeeming zenBTC. It is open for contribution and comments.

## System Architecture

zenBTC is built on a robust, multi-layered architecture that ensures security, efficiency, and yield generation. The system consists of the following key components:

1. [**zenBTC Smart Contract**](#smart-contract-system): A gated smart contract that handles the minting and burning of zenBTC tokens
2. [**zrChain**](#zrchain): Facilitates key and signature requests to Zenrock's MPC network
3. [**Sidecars**](#sidecars): Maintain and report state from Zenrock's Eigenlayer operators to ensure additional economic security
4. [**Bitcoin Proxy**](#bitcoin-proxy): A specialized Bitcoin node that maps Bitcoin keys to their UTXOs and includes a built-in broadcast service

### Smart Contract System

The zenBTC ecosystem operates through a system of interconnected smart contracts on the Ethereum network. These contracts work together to ensure secure operations and yield generation.

#### Core Contracts

1. **zenBTC ERC-20 Contract**
   - Primary interface for users to trade, send, and interact with zenBTC
   - Implements gated access through the zenBTC controller contract
   - Ensures secure minting and burning operations

2. **rockBTC ERC-20 Contract**
   - Serves as the foundational collateral for the system
   - Automatically minted during the BTC bridging process
   - Used for staking on Eigenlayer to enhance protocol security

3. **Eigenlayer rockBTC Strategy Contract**
   - Manages restaking operations for rockBTC
   - Provides additional economic security to zenBTC and zrChain
   - Facilitates yield generation for token holders

#### Operational Flow

The zenBTC system follows a carefully orchestrated process:

1. BTC is sent to a zrChain-generated Bitcoin address
2. Decentralized sidecars verify the BTC deposit and report it to the controller
3. The controller contract mints an equivalent amount of rockBTC
4. The rockBTC is staked in the Eigenlayer Strategy contract
5. zenBTC tokens are minted to the user's specified EVM address
6. Staked assets continuously generate yield, which is periodically distributed to token holders

This architecture ensures that every zenBTC token is fully backed by BTC and secured through multiple layers of economic security, while also providing yield generation opportunities for token holders.

### zrChain

zrChain is the main interface to Zenrock's MPC system. It lets users create workspaces to collectively request and manage keys to access various blockchain ecosystems. Those requests are processed by Zenrock's MPC cluster which is subscribed to key and signature requests, such as those regarding zenBTC.

In contrast to regular BTC keys we apply zenBTC metadata to keys used for zenBTC. Those contain for example the EVM address where the zenBTC should be minted to and also provide some information for the sidecars to report relevant data.

More more detailed information about zrChain, take a look at the [zrchain docs](../zrChain/architecture.md).
If you want to learn more about our MPCs, take a look at the [mpc docs](../mpc.md).

### Sidecars

The sidecars are a decentralized service to provide external state confirmations to zrChain. Every validator of zrChain runs a sidecar along to the regular zrChain validator node. Apart from reporting price oracle data of ROCK and BTC to zrchain to determine the value of economic security, the sidecars take an important part for zenBTC.

The sidecars are reporting block information from the Bitcoin blockchain to zrChain so that the merkle proof of bitcoin deposits reported by the Bitcoin Proxy can be verified. This way it is verified that the data in the request to mint zenBTC is valid and the minting process can begin.

### Bitcoin Proxy

The Bitcoin Proxy is a standalone service that connects to Bitcoin Nodes and the Zenrock Chain.

It provides several services, including:

- Querying the Bitcoin Nodes.
- Proving to the Zenrock Chain that deposits have taken place.
- Generating valid unsigned Bitcoin transactions and sending them to the Zenrock Chain for signing.
- Collecting signatures, generating a signed Bitcoin transaction, and broadcasting it.

The address service monitors (polls) the Zenrock Chain for new keys. When a Bitcoin key is generated, it:

- Adds the Bitcoin address to a Bitcoin Node's watch-only wallet.
- Tracks deposits to these addresses, which are made available for query by the proxy when generating transactions.

To generate an unsigned transaction:

- The user queries the proxy, which generates the transaction and associated data.
- The data is returned to the user, who is responsible for sending it to the Zenrock Chain.

For zenBTC the Bitcoin Proxy performs two main actions:

1. **Lock Service**: Obtains new deposits with sufficient confirmations from the Bitcoin node and starts a taint check of the deposited BTC. If it passes the taint check, a Merkle proof of its existence in the chain is generated, and zrChain is notified via a `NewVerifyDepositBlockInclusion` transaction.

2. **Redemption/Unlock Service**: Polls zrchain for pending zenBTC redemptions and generates a redemption transaction to send Bitcoin to users. Fetches redemptions from the Zenrock Chain and uses the full list of available UTXOs and generates and unsigned redepemtion transaction and broadcasts it to zrChain for transaction validation and for signing by the MPC.

## zenBTC Exchange Rate

One key benefit of depositing BTC for zenBTC is the ability to generate yield on BTC. This yield generation results in 1 zenBTC being worth more than 1 BTC, which is reflected in the zenBTC exchange rate.

The exchange rate mechanism works as follows:

1. zrChain tracks all BTC deposits, redemptions, and zenBTC minting/burning events
2. The system maintains separate supply pools for BTC and zenBTC
3. Yield deposits add BTC to the custodied supply without increasing zenBTC supply
4. The exchange rate is calculated as: custodied BTC / created zenBTC

This mechanism allows users to withdraw more BTC than they originally deposited, as the yield generated from Eigenlayer rewards (converted to BTC) increases the BTC supply pool while maintaining the zenBTC supply.
