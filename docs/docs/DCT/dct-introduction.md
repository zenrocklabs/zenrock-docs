---
title: DCT Framework - Introduction
sidebar_label: Introduction
sidebar_position: 1
---

## What are Decentralized Custody Tokens?

Decentralized Custody Tokens (DCTs) are wrapped assets secured by zrChain's distributed multi-party computation (dMPC) infrastructure. They represent a new standard for cross-chain asset custody, eliminating centralized vaults and single points of failure.

### The Problem with Traditional Wrapped Tokens

Traditional wrapped assets lock funds in a single custody contract or vault, creating massive honeypots and centralization risks:

- **Single point of failure**: One compromised key loses all funds
- **Trust requirements**: Users must trust the custodian completely
- **Opaque security**: Often unclear how keys are managed
- **Regulatory risk**: Centralized custody faces regulatory scrutiny

### How DCTs Are Different

DCTs distribute custody across a network of EOAs (standard wallets) powered by dMPC:

- **No single key holder**: Private keys are never assembled in full
- **Threshold security**: Multiple parties must cooperate to sign
- **On-chain governance**: zrChain consensus validates all operations
- **Transparent verification**: All custody operations are verifiable

### Current DCTs

| Token | Underlying Asset | Chain | Module | Status |
|-------|------------------|-------|--------|--------|
| zenBTC | Bitcoin | Solana | `x/zenbtc` | Live |
| zenZEC | Zcash | Solana | `x/dct` | Live |

> **Architecture Note**: zenBTC uses a dedicated `x/zenbtc/` module separate from the general DCT framework. This separation ensures production stability for the Bitcoin wrapped asset, which was the first DCT deployed. The DCT module (`x/dct/`) handles zenZEC and future wrapped assets. Both modules share the same security properties and dMPC infrastructure.

### DCTs as a Security Foundation

DCTs are more than wrappers—they're a security foundation for DeFi. Developers can build on top:

- Structured products
- Leveraged vaults
- Yield aggregation protocols
- Lending protocols

**The underlying custody stays the same.** Users choose their exposure to different DeFi products while the custodial security guarantees remain constant.

### Benefits of the DCT Standard

**For Users:**
- Institutional-grade custody without trusting a single entity
- Permissionless minting and redemption
- Full backing verification on-chain

**For Developers:**
- Build DeFi products on top of secure wrapped assets
- Inherit zrChain's security guarantees
- No need to manage custody infrastructure

**For the Ecosystem:**
- Cross-chain liquidity without centralization risks
- Transparent, auditable custody
- Scalable to any blockchain asset

### Fee Structure

DCT fees are configurable per-asset and denominated in basis points (bps), not fixed dollar amounts:

| Action | Fee Model |
|--------|-----------|
| Mint | Basis-point fee configured per-asset in zrChain params |
| Redeem | Basis-point fee (`burn_fee_bps`) applied on Solana |

The actual fee percentages are set via governance and can be queried from the module parameters. Fees are collected and distributed according to Zenrock's tokenomic architecture.

> **Note**: Fee rates may vary by asset. Check the current params for the specific asset you are using.

### Supported Operations

1. **Mint**: Deposit native assets → receive DCT on Solana
2. **Redeem**: Burn DCT on Solana → receive native assets
3. **Transfer**: Standard SPL token transfers on Solana
4. **DeFi Integration**: Use in lending, DEXs, and other protocols

### Supply Invariants

The DCT system maintains strict accounting:

- **Custodied**: Native assets held in dMPC-controlled addresses
- **Pending**: Deposits verified but not yet minted
- **Minted**: Wrapped tokens in circulation on Solana

**The invariant `Custodied = Pending + Minted` is enforced at every state transition.**

This ensures wrapped token supply is always fully backed by custodied reserves—no fractional reserves, no unbacked minting.
