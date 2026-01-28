---
title: Hush Protocol - Introduction
sidebar_label: Introduction
sidebar_position: 1
---

## What is Hush?

Hush is Zenrock's privacy layer for Solana, enabling users to shield assets and transact privately without revealing the link between deposit and withdrawal addresses. Built on Miden STARK zero-knowledge proofs, Hush provides institutional-grade privacy with no trusted setup and post-quantum resistance.

**Use Hush:** [https://app.zenrocklabs.io/services/hush/shield](https://app.zenrocklabs.io/services/hush/shield)

### Supported Assets

- **zenBTC** - Zenrock's decentralized wrapped Bitcoin
- **jitoSOL** - Jito's liquid staking token

### Core Operations

| Operation | Description | Fee |
|-----------|-------------|-----|
| **Shield** | Deposit tokens into the privacy pool | Free |
| **Shielded Transfer** | Send privately within the pool | 0.01 jitoSOL flat |
| **Unshield** | Withdraw to any Solana address | 0.50% |

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

### Why Miden STARKs?

Hush uses Miden STARKs as its proof system, chosen for two critical properties:

- **No Trusted Setup**: Unlike Groth16 or PLONK, Miden STARKs require no ceremony or trusted parameters
- **Post-Quantum Resistance**: Hash-based proofs remain secure against known quantum attacks

### Compliance

Hush implements OFAC compliance at the validator sidecar level:

1. User shields tokens on Solana (shielder address visible in event)
2. Validator sidecar runs OFAC check via CipherOwl
3. **Sanctioned addresses**: Event dropped, tokens remain in vault (can be recovered)
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
