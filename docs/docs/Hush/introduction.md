---
sidebar_position: 1
title: Hush Protocol
---

# Hush Protocol

Use Hush: [https://hushprotocol.xyz](https://hushprotocol.xyz)

Hush is the privacy layer for Solana.

Solana is fast, cheap, and increasingly the default venue for DeFi. But it's a public ledger. Every transaction, every balance, every decision is visible to anyone. For many users and use cases, that's a problem. And as Solana is used for more things (rent payment, salary, car payment, stock trading, and more), the need for privacy will only grow.

Hush enables anonymity via a shielded asset pool. Users deposit ("shield") jitoSOL into a pool where their assets become indistinguishable from everyone else's. They can then:

- **Transfer privately** to other Hush users without ever leaving the shielded pool
- **Unshield to any address**—with no onchain link to the original deposit

This creates an entirely private economy within the pool. Users can receive funds, send payments, and transact multiple times—all without touching public Solana until they choose to.

Hush is designed to incorporate core compliance features:

- **OFAC wallet screening**: All shielding transactions are screened via a CipherOwl integration
- **AML/ Theft screening:** All shielding transactions are screened via a CipherOwl integration
- **Terrorist financing/ CSAM screening:** All shielding transactions are screened via a CipherOwl integration
- **Regional geo-blocking**: Sanctioned regions are prohibited from interacting with Hush
- **Viewing keys for audibility**: Users retain a record of their shielded activity that they can release to auditors at their own discretion

## The Vision

Hush is a shielded compute layer: a fully Turing-complete VM built on Solana. Any application that can be built on Solana can be built privately via Hush.

The pool is denominated in jitoSOL rather than native SOL so users do not have to sacrifice staking yield while remaining private. No opportunity cost means no reason to leave. This design allows the pool to grow continuously without tradeoffs, and as the pool grows, privacy guarantees strengthen for everyone.

At launch, shielding, unshielding, and transferring are enabled. Users can also perform partial transfers and partial withdrawals, which increases the privacy guarantees for the entire pool by allowing large deposits to strengthen anonymity for smaller ones.

Over time, Zenrock Labs and third parties will build on Hush, bringing DeFi, payments, and other applications into the shielded layer. The goal is privacy and usability without tradeoffs: everything you have on Solana, but private.
