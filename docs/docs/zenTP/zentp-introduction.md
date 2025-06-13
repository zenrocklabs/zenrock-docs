---
title: zenTP - Introduction
sidebar_label: zenTP - Introduction
sidebar_position: 5
---

## zenTP: Bridge between Zenrock and Solana

zenTP, for Zenrock Transfer Protocol, is a bridge between Zenrock mainnet and Solana with the purpose of enabling transfer of ROCK between both networks. Powered by Zenrock's sidecars and MPC infrastructure, it facilitates the seamless transfer between these networks in a very intuitive and secure manner.

### Enabling ROCK Transfers between Solana and Zenrock Chain

With ROCK's presence on Solana and the Cosmos ecosystem, holders should be free to interact with their ROCK on any network they want in a sovereign way. A key requirement, therefore, is to enable a bridge between these networks for ROCK. zenTP fills this gap in the most direct way possible by providing a direct interface to move these assets in a permissionless way. For a small fee, users can send ROCK from zrchain to Solana and vice versa. Therefore, holders can decide how they want to put their ROCK to action, for example, by providing liquidity on ROCK token pools or staking their ROCK to earn yield on their holdings and contribute to the security of the Zenrock Chain.

### Facilitated with Zenrock's Sidecars and MPC technology

Zenrock's unique sidecars and MPC keys play a crucial role in the bridging process.

The MPCs are involved by having dedicated MPC keys with mint authority on the Solana ROCK SPL to mint ROCK coming from Zenrock Chain. This ensures that the bridge does not require storing private keys in any deployment server and can rely on the layers of security of the Zenrock Protocol.

The Sidecars are responsible for reporting mint and burn events to complete or initiate the bridge process on Zenrock Chain. Operated and secured by Zenrock Chain's consensus and slashing policy, the Oracles reliably inform Zenrock Chain about events emitted on the ROCK SPL on Solana. These will either finalize the mint on Solana and therefore burn the same amount on Zenrock Chain, or notify Zenrock Chain about burn events on the Solana SPL and instruct it to mint the respective amount of ROCK to the indicated wallet on Zenrock Chain.

### Open Access Design

zenTP is designed to be freely accessible to all ROCK token holders. Any ROCK holder on Solana can use the bridge without needing to be a member of the workspace on Zenrock Chain, nor are any additional funds required. The only required information is the amount to bridge and a recipient address. This also applies to the process of sending ROCK from Zenrock Chain to Solana. This ensures a smooth and user-friendly operation of bridging ROCK across the networks.

### Scalable Design

In theory, it is possible to extend the bridge functionality beyond the ROCK token. The sidecars are able to pick up events from other SPLs, ERC-20 contracts, or other forms of events that can be reported to Zenrock Chain and operate bridging functionality.
