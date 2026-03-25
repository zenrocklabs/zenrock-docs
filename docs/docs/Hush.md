---
sidebar_position: 6
title: Hush Protocol
---

# Hush Protocol

![Hush Protocol](/img/litepaper/hush%20protocol%20graphic%201.png)

Use Hush: [https://hushprotocol.xyz](https://hushprotocol.xyz)

Security Audit: [Hush Protocol Audit (PDF)](/zenrock-hush-protocol-audit.pdf)

Hush is the privacy layer for Solana.

Solana is fast, cheap, and increasingly the default venue for DeFi. But it's a public ledger. Every transaction, every balance, every decision is visible to anyone. For many users and use cases, that's a problem. And as Solana is used for more things (rent payment, salary, car payment, stock trading, and more), the need for privacy will only grow.

Hush enables anonymity via a shielded asset pool. Users deposit ("shield") jitoSOL into a pool where their assets become indistinguishable from everyone else's. They can then:

- **Transfer privately** to other Hush users without ever leaving the shielded pool
- **Unshield to any address**—with no onchain link to the original deposit

This creates an entirely private economy within the pool. Users can receive funds, send payments, and transact multiple times—all without touching public Solana until they choose to.

![Hush Private Economy Pool](/img/litepaper/hush%20private%20economy%20pool%201.png)

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

## Technical Architecture

![Hush Technical Architecture](/img/litepaper/techinical%20architecture%20hush%201.png)

### Zero-Knowledge Foundation

Hush uses **Miden zk-STARKs** as its proof system, chosen for two critical properties:

- **No Trusted Setup**: Unlike Groth16 or PLONK, Miden zk-STARKs require no ceremony or trusted parameters
- **Post-Quantum Resistance**: Hash-based proofs are not vulnerable to known quantum attacks like Shor's algorithm

The cryptographic stack includes:

| Primitive | Algorithm | Purpose |
| :---- | :---- | :---- |
| Hash | RPO (Rescue Prime Optimized) | ZK-friendly hash native to Miden |
| Key Exchange | X25519 ECDH | Stealth addresses for shielded transfers |
| Encryption | ChaCha20-Poly1305 | Amount encryption and wallet recovery |

### Commitment Structure

When a user shields tokens, they create a cryptographic commitment that is added to a sparse Merkle tree (depth 24, ~16.7 million capacity) stored on zrChain. The user retains their `spending_key` privately, which is required to later prove ownership and spend the shielded funds.

### Shield Flow

1. **Client**: User generates a `spending_key` from their connected Solana wallet and derives a commitment from their deposit amount
2. **Solana**: User calls the shield instruction, transferring tokens to a vault and emitting a `ShieldEvent`
3. **Compliance Check**: The sidecar oracle performs OFAC screening via CipherOwl
4. **Commitment Insertion**: Clean shield events are reported to zrChain via vote extensions and inserted into the Merkle tree
5. **Voucher Creation**: A `ShieldedVoucher` is created with encrypted amount data

### Unshield Flow

![Hush Unshield Flow](/img/litepaper/hush%20unshield%20flow%201.png)

1. **Client**: User generates a zk-STARK proof demonstrating knowledge of a valid commitment in the tree and correct nullifier derivation
2. **Proof Submission**: User submits the nullifier, Merkle root, zk-STARK proof, and recipient address
3. **Verification**: zrChain validates the nullifier hasn't been spent, the Merkle root is valid, and the zk-STARK proof verifies
4. **Solana Transfer**: The PreBlocker constructs a transfer from the vault to the recipient, signed via MPC
5. **Completion**: Once Solana confirms the transfer, the unshield is marked complete

The critical privacy property: the nullifier cannot be linked to the original commitment without knowing the `spending_key`. External observers see only that some commitment was spent, not which one.

### Shielded Transfers

Users can transfer value within the privacy pool in a fully encrypted manner without ever exposing private info on Solana—a key feature that enables private payments between Hush users' shielded addresses:

1. Sender generates a zk-STARK proof showing they're spending a valid commitment and creating new commitments for recipient and change
2. Transfer amounts are encrypted using ECDH with the recipient's public viewing key
3. zrChain verifies the proof and adds new commitments to the Merkle tree
4. Recipient scans for incoming transfers using their `incoming_viewing_key`, decrypting amounts they receive

All amounts and addresses remain private—only the commitments and fee are visible onchain. This enables an entirely private economy within the shielded pool: users can receive funds, transact multiple times, and only unshield when they need to interact with public Solana.

### Nullifier System

Nullifiers prevent double-spending while preserving privacy. Each commitment can only produce one valid nullifier, derived from the spending key. When spent, the nullifier is permanently recorded. Attempting to spend the same commitment again produces the same nullifier, which is rejected as already spent.

Crucially, knowing a nullifier reveals nothing about which commitment it corresponds to without the spending key. In addition, each transaction is padded with decoy nullifiers so that nobody is able to tell how many inputs each transaction has. **This provides an even greater level of privacy than Zcash**, where input/output counts per transaction are public and could be used to assist in probabilistically deanonymising users.

### Key Hierarchy

Hush implements tiered keys for different permission levels:

| Key | Spend | View Spent | Decrypt Incoming |
| :---- | :---- | :---- | :---- |
| `spending_key` | Yes | Yes | Yes |
| `full_viewing_key` | No | Yes | Yes |
| `incoming_viewing_key` | No | No | Yes |

- **Spending Key**: Full control, kept private by the user
- **Full Viewing Key**: Share with auditors to reveal complete transaction history without spending ability
- **Incoming Viewing Key**: Share to receive shielded transfers

### Fee Model

| Operation | Fee |
| :---- | :---- |
| Shield | Free |
| Transfer | 0.01 jitoSOL |
| Unshield | 0.50% |

For jitoSOL unshields, users can optionally request 0.01 SOL funding (+10 bps) to enable withdrawals to fresh wallets with zero SOL balance.

Fees are collected into a protocol fee pool and distributed according to Zenrock's tokenomic architecture, flowing value to $ROCK holders via the Node Reward Pool architecture described below.

### Privacy Guarantees

**What's Hidden:**

- Link between deposit and withdrawal addresses
- Transfer amounts, sender and recipient addresses (encrypted with recipient's key)
- Which commitment is being spent (only nullifiers revealed)
- Amount of transaction inputs (decoy nullifiers are commingled with real ones)

**What's Visible:**

- Deposit/withdrawal amounts and addresses (visible on Solana)
- Total pool size (aggregate of all shielded funds)
- Nullifiers (but not their corresponding commitments)
