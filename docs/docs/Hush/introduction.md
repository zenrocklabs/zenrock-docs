---
title: Hush Protocol - Introduction
sidebar_label: Introduction
sidebar_position: 1
---

<div style={{textAlign: 'center', marginBottom: '2rem'}}>
  <img src="/img/hush_logo_purple.svg" alt="Hush Protocol" style={{maxWidth: '280px', width: '100%'}} />
  <p style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)', marginTop: '0.5rem', fontWeight: 500}}>The Privacy Layer of Solana</p>
</div>

## What is Hush?

Hush is Zenrock's privacy layer for Solana, enabling users to shield assets and transact privately without revealing the link between deposit and withdrawal addresses. Built on Miden STARK zero-knowledge proofs, Hush provides institutional-grade privacy with no trusted setup and post-quantum resistance.

**Use Hush:** [https://app.zenrocklabs.io/services/hush/shield](https://app.zenrocklabs.io/services/hush/shield)

### Supported Assets

- **zenBTC** - Zenrock's decentralized wrapped Bitcoin
- **jitoSOL** - Jito's liquid staking token
- **zenZEC** - Zenrock's wrapped Zcash (coming soon)

> **Note**: zenZEC support is implemented in the protocol (`SHIELD_ASSET_ZENZEC = 3`) but may not be enabled on all networks. Check network parameters for current availability.

### Core Operations

| Operation | Description | Fee |
|-----------|-------------|-----|
| **Shield** | Deposit tokens into the privacy pool | Free |
| **Shielded Transfer** | Send privately within the pool | 0.01 jitoSOL |
| **Unshield** | Withdraw to any Solana address | 0.50% |

For jitoSOL unshields, users can optionally request 0.01 SOL funding (+10 bps) to enable withdrawals to fresh wallets with zero SOL balance.

Fees are collected into a protocol fee pool and distributed according to Zenrock's tokenomic architecture, flowing value to $ROCK holders via the Node Reward Pool.

### How It Works

1. **Shield**: Deposit tokens on Solana with a cryptographic commitment. Your tokens enter a shared privacy pool.

2. **Transfer** (optional): Send value to other users within the pool. Amounts are encrypted—only the recipient can decrypt.

3. **Unshield**: Withdraw to any Solana address. The critical privacy property: external observers cannot link your withdrawal to your original deposit.

### Privacy Guarantees

**What's Hidden:**
- Link between deposit and withdrawal addresses
- Depositor identity (filtered at sidecar level, never stored on-chain)
- Shielded transfer amounts (encrypted with recipient's key)
- Which commitment is being spent (only nullifier revealed)

**What's Visible:**
- Unshield amount (visible on Solana)
- Unshield recipient address (visible on Solana)
- Total pool size (aggregate of all shielded funds)

### Why jitoSOL?

The pool is denominated in jitoSOL rather than native SOL so users do not have to sacrifice staking yield while remaining private. **No opportunity cost means no reason to leave.**

This design allows the pool to grow continuously without tradeoffs, and as the pool grows, privacy guarantees strengthen for everyone—larger anonymity sets mean stronger privacy for all participants.

### Why Miden STARKs?

Hush uses Miden STARKs as its proof system, chosen for two critical properties:

- **No Trusted Setup**: Unlike Groth16 or PLONK, Miden STARKs require no ceremony or trusted parameters
- **Post-Quantum Resistance**: Hash-based proofs remain secure against known quantum attacks

### The Vision

Hush is a **shielded compute layer**: a fully Turing-complete VM built on Solana. Any application that can be built on Solana can be built privately via Hush.

The pool is denominated in jitoSOL rather than native SOL so users do not have to sacrifice staking yield while remaining private. No opportunity cost means no reason to leave. This design allows the pool to grow continuously without tradeoffs, and as the pool grows, privacy guarantees strengthen for everyone.

At launch, shielding, unshielding, and transferring are enabled. Users can also perform partial transfers and partial withdrawals, which increases the privacy guarantees for the entire pool by allowing large deposits to strengthen anonymity for smaller ones.

Over time, Zenrock Labs and third parties will build on Hush, bringing DeFi, payments, and other applications into the shielded layer. The goal is privacy and usability without tradeoffs: everything you have on Solana, but private.

### Compliance

Hush is designed to incorporate core compliance features:

- **OFAC wallet screening**: All shielding transactions are screened via a CipherOwl integration
- **AML/Theft screening**: All shielding transactions are screened via CipherOwl integration
- **Terrorist financing/CSAM screening**: All shielding transactions are screened via CipherOwl integration
- **Regional geo-blocking**: Sanctioned regions are prohibited from interacting with Hush
- **Viewing keys for audibility**: Users retain a record of their shielded activity that they can release to auditors at their own discretion

**How Compliance Works:**

1. User shields tokens on Solana (shielder address visible in event)
2. Validator sidecar runs compliance checks via CipherOwl
3. **Flagged addresses**: Event dropped, tokens remain in vault (can be recovered)
4. **Clean addresses**: Event reported to zrChain, commitment added to Merkle tree

The shielder address is intentionally not propagated to zrChain state—privacy for compliant users is preserved.

### Best Practices for Maximizing Privacy

**Use common amounts**: Odd amounts reduce your anonymity set.
- Good: 0.1, 0.5, 1, 5, 10 tokens
- Risky: 1.337 tokens (easily correlated)

**Wait before unshielding**: Immediate unshield after shield creates timing correlation. The longer you wait, the larger your anonymity set.

**Use different access points**: Don't use the same IP/VPN for shield and unshield operations.

**Use SOL funding** (jitoSOL only): Enable SOL funding when unshielding to avoid linking your withdrawal to a pre-funded wallet. This provides 0.01 SOL for transaction fees on fresh wallets.

### Comparison to Other Privacy Solutions

| Feature | Hush | Zcash | Tornado Cash |
|---------|------|-------|--------------|
| Proof System | Miden STARKs | Groth16/Halo2 | Groth16 |
| Trusted Setup | No | Yes | Yes |
| Quantum Resistant | Yes | Partial | No |
| Flexible Amounts | Yes | Yes | No (fixed) |
| Shielded Transfers | Yes | Yes | No |
| Viewing Keys | Tiered (3 levels) | Yes | No |
| Compliance | Built-in OFAC | Optional | None |
