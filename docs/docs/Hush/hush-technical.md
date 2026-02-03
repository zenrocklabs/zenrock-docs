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

> **Note**: The V8 circuit supports up to 24 total input notes (balance note + incoming notes combined). If a balance note is present, up to 23 incoming notes can be claimed. If no balance note exists, all 24 slots can be used for incoming notes.

### Key Hierarchy

Hush implements tiered keys for different permission levels:

```
spending_key (root secret - NEVER share)
    |
    +-- spending_pubkey -----> (used in note commitments)
    |       Formula: hmerge(spending_key, [SPENDING_PUBKEY_DOMAIN, 0, 0, 0])
    |
    +-- nullifier_key --------+
    |                         +-- full_viewing_key
    +-- incoming_vk_priv -----+
              |
              +-- incoming_vk_pub --> incoming_viewing_key
```

| Key | Spend | View Spent | Decrypt Received | Decrypt Sent |
|-----|-------|------------|------------------|--------------|
| spending_key | Yes | Yes | Yes | Yes |
| full_viewing_key | No | Yes | Yes | Yes |
| incoming_viewing_key | No | No | Yes | No |

**Key Derivations:**
- **spending_pubkey**: Derived from spending_key using a domain-separated RPO hash. This is included in ALL note commitments (shields, transfers, change notes) to bind the note to the recipient's identity.
- **nullifier_key**: Used to derive nullifiers that prove ownership without revealing the commitment.
- **incoming_vk_priv/pub**: ECDH keypair for decrypting incoming transfer amounts.

**Security Note - Spending Binding:**
The `spending_pubkey` serves as a "spending binding" that prevents a critical attack vector: if an attacker obtains only the `incoming_viewing_key`, they can see incoming amounts but CANNOT spend them because the commitment requires knowledge of the `spending_key` to derive the matching `spending_pubkey`.

**Use Cases:**
- **spending_key**: User's master key, full control
- **full_viewing_key**: Auditors, tax reporting (read-only)
- **incoming_viewing_key**: Payment processors (see deposits only)

> **Important**: Sharing a viewing key grants **permanent, irrevocable** visibility into your shielded activity. There is no cryptographic mechanism to revoke access once shared.

### Commitment & Nullifier Structure

**V8 Unified Note Format (Current):**

All notes (shields, transfers, change) use the same commitment structure:

```
commitment = hmerge(hmerge(hmerge(note_secret, randomness), spending_pubkey), [amount, 0, 0, asset])
nullifier  = RPO(nullifier_key, commitment)
```

Where:
- `note_secret`: 32 bytes derived from the recipient's spending key
- `randomness`: 32 bytes of cryptographic randomness
- `spending_pubkey`: Derived from recipient's spending_key (binds note to recipient)
- `amount`: Token amount in smallest units
- `asset`: Asset type identifier (1=zenBTC, 2=jitoSOL, 3=zenZEC)

**Security Properties:**
- The `spending_pubkey` binding prevents attacks where someone with only the `incoming_viewing_key` could spend funds
- The unified format means shields, transfers, and change notes are indistinguishable in the Merkle tree
- Asset binding in the commitment prevents cross-asset confusion attacks

### Nullifier System

Nullifiers prevent double-spending while preserving privacy:

1. Each commitment can only produce one valid nullifier, derived from the spending key
2. When spent, the nullifier is permanently recorded
3. Attempting to spend the same commitment again produces the same nullifier, which is rejected
4. Knowing a nullifier reveals nothing about which commitment it corresponds to without the spending key

### Decoy Nullifiers

Each transaction is padded with **decoy nullifiers** so that no one can determine how many inputs each transaction has. **This provides an even greater level of privacy than Zcash**, where input/output counts per transaction are public and could be used to assist in probabilistically deanonymizing users.

By obscuring the actual number of commitments being spent in each transaction, Hush prevents statistical analysis attacks that rely on transaction graph structure.

### Chain-ID Binding (Replay Attack Prevention)

All Hush proofs are cryptographically bound to a specific chain ID, preventing replay attacks between testnet and mainnet:

- When generating a proof, the chain ID (e.g., "zenrock-testnet-1" or "zenrock-mainnet-1") is hashed using RPO with a domain separator
- This `chain_id_hash` is included in the `outputs_commitment` structure verified by the circuit
- A proof generated on testnet will fail verification on mainnet (and vice versa)

**Security Property**: Even if an attacker obtains a valid proof from one chain, they cannot replay it on another chain. The circuit enforces that the chain ID used during proof generation matches the chain where verification occurs.

**Implementation Details**:
- Domain separator: `zenrock.hush.chain_id.v1`
- Hash formula: `chain_id_hash = RPO(chain_id || CHAIN_ID_DOMAIN)`
- Verified in: `ComputeOutputsCommitmentV7()` in `merkle.go`

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

### Protocol Fee Pool

Fees collected from shielded operations accumulate in a per-asset Protocol Fee Pool rather than being burned:

| Fee Type | Flow |
|----------|------|
| Shield Fee | Deducted at shield time, added to fee pool |
| Transfer Fee | Deducted from shielded supply, added to fee pool |
| Unshield Fee | Deducted before Solana transfer, added to fee pool |

**Fee Pool Operations:**
- Fees are tracked per-asset in `ProtocolFeePool map[asset]amount`
- Governance can claim accumulated fees via `MsgClaimProtocolFees`
- Claims create an unshield request to transfer tokens from the vault

**Supply Invariant:**
```
TotalShielded + PendingUnshields + TotalUnshielded + ProtocolFeePool = TotalEverShielded
```

**Governance Parameters:**
- `shield_fee`: Percentage fee on shields (currently 0)
- `shielded_transfer_fee`: Flat fee per transfer (per-asset configured)
- `unshield_fee_bps`: Basis points fee on unshields
- `sol_fund_amount`: SOL amount for funded unshields
- `sol_fund_fee_bps`: Additional fee for SOL funding

### Supply Accounting

| Event | Solana Vault | TotalShielded | PendingUnshields | TotalUnshielded | ProtocolFeePool |
|-------|--------------|---------------|------------------|-----------------|-----------------|
| Shield | +tokens | +amount | — | — | — |
| Unshield | — | −(amount+fee) | +amount | — | +fee |
| Complete | −tokens | — | −amount | +amount | — |

**Invariant**: `TotalShielded + PendingUnshields + TotalUnshielded + ProtocolFeePool = TotalEverShielded`

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
