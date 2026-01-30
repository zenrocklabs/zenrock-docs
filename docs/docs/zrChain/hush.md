---
title: Hush Module
sidebar_label: Hush Module
sidebar_position: 10
---

## Overview

The **Hush Module** (`x/hush/`) provides gold-standard privacy for zenBTC and jitoSOL using Miden STARKs. Users can shield tokens on Solana and later unshield to a completely unlinked address.

### Privacy Guarantees

- **Unlinkability**: The nullifier (revealed at unshield) cannot be linked to the commitment (created at shield) without knowing the `spending_key`
- **Amount Privacy**: Shielded transfer amounts are fully encrypted (ChaCha20-Poly1305)
- **Zero-Knowledge**: Miden STARK proofs verify correctness without revealing transaction details

### Key Operations

| Operation | Description |
|-----------|-------------|
| **Shield** | Transfer tokens to vault with cryptographic commitment |
| **Shielded Transfer** | Move value between shielded addresses |
| **Unshield** | Withdraw to any address with zero on-chain link to original |

### Cryptographic Primitives

- **Hash**: RPO (Rescue Prime Optimized) - Miden's ZK-friendly hash
- **Merkle Tree**: Sparse Merkle Tree, depth 20 (~1M capacity)
- **Proof System**: Miden STARKs (no trusted setup, quantum-resistant)

### Tiered Viewing Keys

| Key Type | Capabilities |
|----------|-------------|
| `spending_key` | Full control (spend, view all) |
| `full_viewing_key` | See all amounts + spent status (for auditors) |
| `incoming_viewing_key` | Decrypt received amounts only |

### Fee Model

- **Shield**: Optional % fee (currently zero to encourage pool growth)
- **Shielded Transfers**: Flat fee per transfer (burned from shielded supply)
- **Unshield**: Percentage fee on amount (deducted before Solana transfer)

### Related Documentation

- [Treasury Module](./treasury.md) - Key management for signing
- [dMPC](./dmpc.md) - How unshield transactions are signed

*For source code, see the [Hush module on GitHub](https://github.com/zenrocklabs/zenrock/tree/main/zrchain/x/hush).*
