---
sidebar_position: 2
title: Technical Architecture
---

# Hush Protocol: Technical Architecture

## Zero-Knowledge Foundation

Hush uses **Miden zk-STARKs** as its proof system, chosen for two critical properties:

- **No Trusted Setup**: Unlike Groth16 or PLONK, Miden zk-STARKs require no ceremony or trusted parameters
- **Post-Quantum Resistance**: Hash-based proofs are not vulnerable to known quantum attacks like Shor's algorithm

The cryptographic stack includes:

| Primitive | Algorithm | Purpose |
| :---- | :---- | :---- |
| Hash | RPO (Rescue Prime Optimized) | ZK-friendly hash native to Miden |
| Key Exchange | X25519 ECDH | Stealth addresses for shielded transfers |
| Encryption | ChaCha20-Poly1305 | Amount encryption and wallet recovery |

## Commitment Structure

When a user shields tokens, they create a cryptographic commitment that is added to a sparse Merkle tree (depth 24, ~16.7 million capacity) stored on zrChain. The user retains their `spending_key` privately, which is required to later prove ownership and spend the shielded funds.

## Shield Flow

1. **Client**: User generates a `spending_key` from their connected Solana wallet and derives a commitment from their deposit amount
2. **Solana**: User calls the shield instruction, transferring tokens to a vault and emitting a `ShieldEvent`
3. **Compliance Check**: The sidecar oracle performs OFAC screening via CipherOwl
4. **Commitment Insertion**: Clean shield events are reported to zrChain via vote extensions and inserted into the Merkle tree
5. **Voucher Creation**: A `ShieldedVoucher` is created with encrypted amount data

## Unshield Flow

1. **Client**: User generates a zk-STARK proof demonstrating knowledge of a valid commitment in the tree and correct nullifier derivation
2. **Proof Submission**: User submits the nullifier, Merkle root, zk-STARK proof, and recipient address
3. **Verification**: zrChain validates the nullifier hasn't been spent, the Merkle root is valid, and the zk-STARK proof verifies
4. **Solana Transfer**: The PreBlocker constructs a transfer from the vault to the recipient, signed via MPC
5. **Completion**: Once Solana confirms the transfer, the unshield is marked complete

The critical privacy property: the nullifier cannot be linked to the original commitment without knowing the `spending_key`. External observers see only that some commitment was spent, not which one.

## Shielded Transfers

Users can transfer value within the privacy pool in a fully encrypted manner without ever exposing private info on Solana—a key feature that enables private payments between Hush users' shielded addresses:

1. Sender generates a zk-STARK proof showing they're spending a valid commitment and creating new commitments for recipient and change
2. Transfer amounts are encrypted using ECDH with the recipient's public viewing key
3. zrChain verifies the proof and adds new commitments to the Merkle tree
4. Recipient scans for incoming transfers using their `incoming_viewing_key`, decrypting amounts they receive

All amounts and addresses remain private—only the commitments and fee are visible onchain. This enables an entirely private economy within the shielded pool: users can receive funds, transact multiple times, and only unshield when they need to interact with public Solana.

## Nullifier System

Nullifiers prevent double-spending while preserving privacy. Each commitment can only produce one valid nullifier, derived from the spending key. When spent, the nullifier is permanently recorded. Attempting to spend the same commitment again produces the same nullifier, which is rejected as already spent.

Crucially, knowing a nullifier reveals nothing about which commitment it corresponds to without the spending key. In addition, each transaction is padded with decoy nullifiers so that nobody is able to tell how many inputs each transaction has. **This provides an even greater level of privacy than Zcash**, where input/output counts per transaction are public and could be used to assist in probabilistically deanonymising users.

## Key Hierarchy

Hush implements tiered keys for different permission levels:

| Key | Spend | View Spent | Decrypt Incoming |
| :---- | :---- | :---- | :---- |
| `spending_key` | Yes | Yes | Yes |
| `full_viewing_key` | No | Yes | Yes |
| `incoming_viewing_key` | No | No | Yes |

- **Spending Key**: Full control, kept private by the user
- **Full Viewing Key**: Share with auditors to reveal complete transaction history without spending ability
- **Incoming Viewing Key**: Share to receive shielded transfers

## Fee Model

| Operation | Fee |
| :---- | :---- |
| Shield | Free |
| Transfer | 0.01 jitoSOL |
| Unshield | 0.50% |

For jitoSOL unshields, users can optionally request 0.01 SOL funding (+10 bps) to enable withdrawals to fresh wallets with zero SOL balance.

Fees are collected into a protocol fee pool and distributed according to Zenrock's tokenomic architecture, flowing value to $ROCK holders via the Node Reward Pool architecture described below.

## Privacy Guarantees

**What's Hidden:**

- Link between deposit and withdrawal addresses
- Transfer amounts, sender and recipient addresses (encrypted with recipient's key)
- Which commitment is being spent (only nullifiers revealed)
- Amount of transaction inputs (decoy nullifiers are commingled with real ones)

**What's Visible:**

- Deposit/withdrawal amounts and addresses (visible on Solana)
- Total pool size (aggregate of all shielded funds)
- Nullifiers (but not their corresponding commitments)
