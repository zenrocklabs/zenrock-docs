---
title: Hush Protocol - Technical Architecture
sidebar_label: Technical Architecture
sidebar_position: 2
---

## Technical Overview

Hush is built on Miden STARKs with a commitment-nullifier scheme that enables privacy-preserving transactions. Users create cryptographic commitments when shielding, and reveal nullifiers when spending—the two cannot be linked without the secret spending key.

### Cryptographic Primitives

| Primitive | Implementation | Purpose |
|-----------|---------------|---------|
| Hash | RPO (Rescue Prime Optimized) | ZK-friendly, native to Miden |
| Merkle Tree | Sparse binary, depth 24 | ~16.7M commitment capacity |
| Proof System | Miden STARKs | ZK proof generation/verification |
| Key Exchange | X25519 ECDH | Stealth addresses for transfers |
| Encryption | ChaCha20-Poly1305 | Amount encryption, wallet recovery |

### Account Model

Hush uses a **Single-Note Account Model** where each user has:

- **One Balance Note**: Current spendable balance, replaced on each spend
- **Zero or more Incoming Notes**: Funds received from others, claimed lazily on next spend

This eliminates UTXO fragmentation while maintaining privacy.

| Aspect | Description |
|--------|-------------|
| User balance | 1 balance note + pending incoming notes |
| Spending | Spend from full balance (no fragmentation) |
| Receiving | Incoming note created, claimed on next spend |
| Max incoming claims | 24 per transaction |

### Key Hierarchy

Hush implements tiered keys for different permission levels:

```
spending_key (root secret - NEVER share)
    │
    ├── nullifier_key ────────┐
    │                         ├── full_viewing_key
    ├── incoming_vk_priv ─────┘
    │         │
    │         └── incoming_vk_pub ── incoming_viewing_key
    │
    └── spending_binding ── (included in address)
```

| Key | Spend | View Spent | Decrypt Received | Decrypt Sent |
|-----|-------|------------|------------------|--------------|
| spending_key | Yes | Yes | Yes | Yes |
| full_viewing_key | No | Yes | Yes | Yes |
| incoming_viewing_key | No | No | Yes | No |

**Use Cases:**
- **spending_key**: User's master key, full control
- **full_viewing_key**: Auditors, tax reporting (read-only)
- **incoming_viewing_key**: Payment processors (see deposits only)

> **Important**: Sharing a viewing key grants **permanent, irrevocable** visibility into your shielded activity. There is no cryptographic mechanism to revoke access once shared.

### Commitment & Nullifier Structure

**Balance Note:**
```
commitment = RPO(merge(note_secret, randomness), [0, 0, sequence, amount])
nullifier  = RPO(nullifier_key, commitment)
```

**Incoming Note:**
```
commitment = RPO(merge(merge(note_secret, randomness), spending_binding), [amount, 0, 0, asset])
nullifier  = RPO(nullifier_key, commitment)
```

The `spending_binding` in incoming note commitments binds the note to the recipient's identity, preventing attacks where an attacker with only the `incoming_viewing_key` could spend the note.

### Nullifier System

Nullifiers prevent double-spending while preserving privacy:

1. Each commitment can only produce one valid nullifier, derived from the spending key
2. When spent, the nullifier is permanently recorded
3. Attempting to spend the same commitment again produces the same nullifier, which is rejected
4. Knowing a nullifier reveals nothing about which commitment it corresponds to without the spending key

### Shield Flow

```
User → Solana Program: Shield(commitment, amount)
         ↓
Solana Program: Transfer tokens to vault, emit ShieldEvent
         ↓
Validator Sidecar: OFAC check (CipherOwl)
         ↓
[Sanctioned → Drop event] OR [Clean → Report via Vote Extensions]
         ↓
zrChain: Insert commitment to Merkle tree
```

Shield creates an **incoming note** that the user claims on their first spend.

### Unshield Flow

```
User → Browser: Load spending_key, query Merkle root
         ↓
Browser: Generate STARK proof (proves balance equation)
         ↓
User → zrChain: MsgUnshield(nullifiers, proof, recipient)
         ↓
zrChain: Check nullifiers not spent, verify STARK proof
         ↓
zrChain → MPC: Request Solana tx signature
         ↓
zrChain → Solana: Broadcast transfer from vault
```

**The ZK proof proves:**
- Knowledge of balance note (if exists) and incoming notes being claimed
- Valid nullifier derivation for all spent notes
- Balance equation: `balance + sum(incoming) = new_balance + amount + fee`

### Shielded Transfer Flow

Transfers within the privacy pool without touching Solana:

1. Sender generates ephemeral keypair for ECDH
2. Sender computes recipient commitment and encrypts amount (ChaCha20-Poly1305)
3. Sender generates STARK proof showing valid spend
4. zrChain verifies proof, marks nullifiers spent, inserts new commitments
5. Recipient scans with incoming_viewing_key, decrypts via ECDH

All amounts remain private—only the commitments and fee are visible on-chain.

### SOL Funding (jitoSOL only)

When unshielding jitoSOL, users can request native SOL funding to cover Solana transaction fees:

| Parameter | Value |
|-----------|-------|
| SOL funded | 0.01 SOL |
| Additional fee | +10 bps |
| Total fee | 60 bps (vs 50 bps base) |

This enables privacy-preserving withdrawals to fresh wallets with zero SOL balance.

### Supply Accounting

| Event | Solana Vault | TotalShielded | PendingUnshields | TotalUnshielded | FeesBurned |
|-------|--------------|---------------|------------------|-----------------|------------|
| Shield | +tokens | +amount | — | — | — |
| Unshield | — | −(amount+fee) | +amount | — | +fee |
| Complete | −tokens | — | −amount | +amount | — |

**Invariant**: `TotalShielded + PendingUnshields + TotalUnshielded + FeesBurned = TotalEverShielded`

### Browser Security Model

The web client implements defense-in-depth for key management:

| Data | Storage | Can Spend |
|------|---------|-----------|
| spending_key | Never stored | Yes |
| full_viewing_key | localStorage (cached) | No |
| Voucher metadata | localStorage (cached) | No |

**FVK-Only Caching**: The browser only caches the Full Viewing Key, which allows viewing balances but cannot spend funds. Every spending operation requires a fresh wallet signature.

### Wallet Recovery

Recovery uses deterministic key derivation from wallet signatures:

1. Sign deterministic message with your Solana wallet
2. Derive spending_key from the signature
3. Scan balance notes by iterating sequence numbers
4. Scan incoming notes using incoming_viewing_key with ECDH decryption
5. Scan change vouchers from unshields and transfers

**Current balance** = highest unspent balance note + sum of unspent incoming notes + sum of unspent change vouchers

### Configuration Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| merkle_tree_depth | 24 | ~16.7M commitment capacity |
| merkle_root_history_size | 1000 | Valid roots (~2 hours) |
| unshield_retry_delay_blocks | 50 | Blocks before retry on failure |

### Reliability Guarantees

- **Atomic Double-Spend Prevention**: Nullifiers are checked and marked spent in a single consensus block
- **Infinite Retry**: Failed unshields are retried after a configurable delay; they never permanently fail
- **Merkle Root History**: Proofs remain valid for ~2 hours after generation
- **Wallet Recovery**: Amounts are encrypted with deterministic keys, enabling recovery from just the spending key
