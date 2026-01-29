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

1. [**zenBTC SPL Token**](#smart-contract-system): The primary token interface on Solana for users to trade, send, and interact with zenBTC
2. [**zrChain**](#zrchain): Facilitates key and signature requests to Zenrock's MPC network
3. [**Sidecars**](#sidecars): Decentralized oracle service that reports Bitcoin block data to zrChain for deposit verification
4. [**Bitcoin Proxy**](#bitcoin-proxy): A specialized Bitcoin node that maps Bitcoin keys to their UTXOs and includes a built-in broadcast service

### Smart Contract System

The zenBTC ecosystem operates through a system of interconnected components across Solana and zrChain. These work together to ensure secure operations and yield generation.

#### Core Contracts

1. **zenBTC SPL Token (Solana)**
   - Primary token interface on Solana for users to trade, send, and interact with zenBTC
   - Contract Address: `9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw`
   - Minting and burning controlled by dMPC-signed transactions from zrChain

2. **zrChain Treasury Module**
   - Manages all interactions with the MPC infrastructure
   - Coordinates threshold signature collection from distributed key holders
   - Enforces Block-Time-Lock (BTL) mechanism for request timeouts

#### Operational Flow

The zenBTC system follows a carefully orchestrated process:

**Deposit & Verification:**
1. User deposits BTC to a dMPC-controlled address on Bitcoin
2. Bitcoin Proxy detects the deposit after sufficient confirmations (typically 6 blocks)
3. Proxy generates a Merkle proof demonstrating transaction inclusion and submits to zrChain
4. zrChain validators verify the block header via enshrined oracle consensus
5. Upon successful verification, a `PendingMintTransaction` is created

**Minting:**
1. PreBlocker confirms validators have reached consensus on Solana nonce values
2. System prepares a Solana transaction specifying exact mint amount and recipient
3. Transaction is signed through distributed MPC key holders
4. Signed transaction is broadcast to Solana
5. Sidecar oracle monitors for mint confirmation and reports back to zrChain

**Redemption:**
1. User burns zenBTC tokens on Solana
2. Sidecar oracle detects the burn event
3. Burn enters maturity period (100-200 blocks) to protect against Solana reorganizations
4. Bitcoin Proxy constructs unsigned redemption transaction
5. Transaction is signed through distributed MPC
6. Proxy broadcasts signed transaction to Bitcoin network

This architecture ensures that every zenBTC token is fully backed by BTC held in decentralized custody, with strict supply invariants: `Custodied BTC = Pending + Minted zenBTC`.

#### Supply Accounting

The zenBTC system maintains strict supply invariants:

| Pool | Description |
|------|-------------|
| **Custodied** | Native BTC held in dMPC-controlled addresses on Bitcoin |
| **Pending** | Deposits verified but not yet minted on Solana |
| **Minted** | zenBTC tokens in circulation on Solana |

The invariant `Custodied = Pending + Minted` is enforced at every state transition. This ensures wrapped token supply is always fully backed by custodied reserves.

### zrChain

zrChain is the main interface to Zenrock's MPC system. It lets users create workspaces to collectively request and manage keys to access various blockchain ecosystems. Those requests are processed by Zenrock's MPC cluster which is subscribed to key and signature requests, such as those regarding zenBTC.

In contrast to regular BTC keys we apply zenBTC metadata to keys used for zenBTC. Those contain for example the Solana address where the zenBTC should be minted to and also provide some information for the sidecars to report relevant data.

More more detailed information about zrChain, take a look at the [zrchain docs](../zrChain/architecture.md).
If you want to learn more about our MPCs, take a look at the [mpc docs](../mpc.md).

### Sidecars

The sidecars are a decentralized service to provide external state confirmations to zrChain. Every validator of zrChain runs a sidecar along to the regular zrChain validator node. Apart from reporting price oracle data of ROCK and BTC to zrChain to determine the value of economic security, the sidecars take an important part for zenBTC.

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

2. **Redemption/Unlock Service**: Polls zrChain for pending zenBTC redemptions and generates a redemption transaction to send Bitcoin to users. Fetches redemptions from the Zenrock Chain and uses the full list of available UTXOs and generates an unsigned redemption transaction and broadcasts it to zrChain for transaction validation and for signing by the MPC.

## Yield Mechanism

zenBTC yield is generated exclusively from protocol fees, not from lending, leverage, or external yield sources.

**The underlying BTC is never lent out, levered up, or used as risk capital.** There are no basis trades, no delta-neutral strategies, no opaque vaults, no dependencies on other firms.

### Fee Allocation to zenBTC

| Source | Percentage to zenBTC |
|--------|---------------------|
| All zrChain protocol fees | 5% |
| zenBTC custody fees (mint/redeem) | 35% |

### Yield Distribution

Fees are collected in $ROCK and converted to BTC, which is deposited into the custodied supply. Because this increases the BTC backing without minting new zenBTC, the exchange rate rises over time.

Yield is paid directly in sats on the Bitcoin blockchain, distributed daily.

Yield breakdown: [https://app.zenrocklabs.io/zenbtc/yield](https://app.zenrocklabs.io/zenbtc/yield)

## zenBTC Exchange Rate

One key benefit of depositing BTC for zenBTC is the ability to generate yield on BTC. This yield generation results in 1 zenBTC being worth more than 1 BTC, which is reflected in the zenBTC exchange rate.

The exchange rate mechanism works as follows:

1. zrChain tracks all BTC deposits, redemptions, and zenBTC minting/burning events
2. The system maintains separate supply pools for BTC and zenBTC
3. Yield deposits add BTC to the custodied supply without increasing zenBTC supply
4. The exchange rate is calculated as: custodied BTC / created zenBTC

This mechanism allows users to withdraw more BTC than they originally deposited, as protocol fee revenue (converted to BTC) is deposited into the custodied supply without increasing zenBTC supply.
