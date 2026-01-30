---
title: zrChain - Introduction
sidebar_label: Introduction
sidebar_position: 1
---

# zrChain: Purpose-Built Infrastructure for Decentralized Custody

zrChain is a purpose-built Layer 1 blockchain powering the Zenrock ecosystem. Built on the Cosmos SDK, it provides the coordination layer for distributed multi-party computation (dMPC), enabling secure key management and transaction signing across any blockchain.

## What is zrChain?

zrChain serves as the source of truth for Zenrock's decentralized custody infrastructure. It coordinates:

- **Key generation and management** using dMPC—private keys are never assembled in full
- **Transaction signing** across Bitcoin, Ethereum, Solana, and other chains
- **Policy enforcement** for multi-party approval workflows
- **Workspace management** for teams and organizations

Unlike traditional custody solutions that rely on centralized HSMs or multisig wallets, zrChain distributes trust across a network of independent operators. No single party—including Zenrock—ever has access to complete private keys.

## Core Modules

zrChain extends the standard Cosmos SDK with specialized modules:

| Module | Purpose |
|--------|---------|
| [Identity](./identity.md) | Workspaces, keyrings, and organizational structure |
| [Treasury](./treasury.md) | Key requests, signature requests, and asset management |
| [Policy](./policy.md) | Approval rules and threshold signatures |
| [Validation](./validation.md) | Validator and dMPC operator coordination |
| [Cross-Chain](./cross-chain.md) | Multi-chain transaction broadcasting |

## Products Built on zrChain

zrChain powers Zenrock's suite of decentralized custody products:

- **[zenBTC](/zenBTC/introduction)** — Native yield-bearing wrapped Bitcoin on Solana
- **[zenZEC](/zenZEC/introduction)** — Wrapped Zcash with institutional-grade security
- **[Hush](/Hush/introduction)** — Private transfers using shielded transactions
- **[DCT Framework](./dct.md)** — Create custom Decentralized Custody Tokens for any asset

## Network Overview

zrChain launched with:
- **60+ validators** providing consensus and network security
- **8 dMPC operators** (expanding to 16, then 32) securing key material
- Geographic distribution across **22+ countries**
- Cumulative operator stake across **50+ chains**

## Next Steps

- Learn how [dMPC](./dmpc.md) eliminates single points of failure in key management
- Explore the [system architecture](./architecture.md) and component interactions
- Understand [workspaces and keyrings](./identity.md) for organizing your keys
- Set up [policies](./policy.md) for multi-party approval workflows
