---
title: zenTP - Introduction
sidebar_label: zenTP - Introduction
sidebar_position: 5
---

## zenTP: Native $ROCK Transfers Between Zenrock and Solana

Zenrock Transfer Protocol (zenTP) enables **native $ROCK transfers** between zrChain (Cosmos) and Solana. Unlike traditional bridges that wrap tokens, zenTP represents $ROCK as a **native SPL token** on Solana, providing the same user experience as any native Solana asset.

**zenTP is the first transfer protocol connecting Cosmos directly to Solana with native token representation** (rather than wrapped tokens), leveraging zrChain's dMPC infrastructure for security.

**Use zenTP:** [https://app.zenrocklabs.io/zentp](https://app.zenrocklabs.io/zentp)

### Liquidity Seeding

**200M $ROCK were transferred to Solana to seed liquidity** as fully bridged, circulating tokens represented as a native SPL token. As users move tokens across the bridge, supply fluctuates on each side, but total supply remains unchanged.

### Why Native Representation Matters

With ROCK's presence on Solana and the Cosmos ecosystem, holders should be free to interact with their ROCK on any network they want in a sovereign way. zenTP fills this gap in the most direct way possible by providing a direct interface to move assets in a permissionless way.

Unlike wrapped tokens that create an additional layer of smart contract risk, native $ROCK on Solana behaves exactly like any other native SPL token—no wrapping, no additional trust assumptions beyond the bridge itself.

Holders can decide how they want to put their ROCK to action: providing liquidity on ROCK token pools, staking their ROCK to earn yield, or participating in governance on zrChain.

### Facilitated with Zenrock's Sidecars and MPC technology

Zenrock's unique sidecars and MPC keys play a crucial role in the bridging process.

The MPCs are involved by having dedicated MPC keys with mint authority on the Solana ROCK SPL to mint ROCK coming from Zenrock Chain. This ensures that the transfer does not require storing private keys in any deployment server and can rely on the layers of security of the Zenrock Protocol.

The Sidecars are responsible for reporting mint and burn events to complete or initiate the transfer process on Zenrock Chain. Operated and secured by Zenrock Chain's consensus and slashing policy, the sidecars reliably inform Zenrock Chain about events emitted on the ROCK SPL on Solana. These will either finalize the mint on Solana and therefore burn the same amount on Zenrock Chain, or notify Zenrock Chain about burn events on the Solana SPL and instruct it to mint the respective amount of ROCK to the indicated wallet on Zenrock Chain.

### Open Access Design

zenTP is designed to be freely accessible to all ROCK token holders. Any ROCK holder on Solana can use zenTP without needing to be a member of the workspace on Zenrock Chain, nor are any additional funds required. The only required information is the amount to transfer and a recipient address. This also applies to the process of sending ROCK from Zenrock Chain to Solana. This ensures a smooth and user-friendly operation of bridging ROCK across the networks.

### Scalable Design

In theory, it is possible to extend the transfer functionality beyond the ROCK token. The sidecars are able to pick up events from other SPLs, ERC-20 contracts, or other forms of events that can be reported to Zenrock Chain and operate cross-chain transfer functionality.
