---
title: DCT Framework - Technical Architecture
sidebar_label: Technical Architecture
sidebar_position: 2
---

## Technical Overview

The DCT framework handles the complete lifecycle of wrapped assets: deposit detection, verification, minting, and redemption. All operations are secured by zrChain's consensus and dMPC infrastructure.

### Architecture Components

```
External Chain (BTC/ZEC)     zrChain                    Solana
        │                       │                          │
   [Deposit]                    │                          │
        │                       │                          │
        ▼                       │                          │
   ┌─────────┐                  │                          │
   │ Outpost │──────────────────▶ VerifyDeposit            │
   └─────────┘                  │      │                   │
                                │      ▼                   │
                           Merkle Proof Check              │
                                │      │                   │
                                │      ▼                   │
                           PendingMintTx ──────────────────▶ Mint SPL
                                │                          │
                                │                          │
   ┌─────────┐                  │                          │
   │  User   │◀─────────────────────────────────────────── Burn SPL
   └─────────┘                  │      │                   │
        │                       │      ▼                   │
        ◀──────────────────────── Redemption               │
   [Native Asset]               │                          │
```

### Deposit Detection

Dedicated outpost services monitor external blockchains for deposits to dMPC-controlled addresses:

1. **Block Scanning**: Outposts scan new blocks for transactions to designated deposit addresses
2. **Confirmation Tracking**: Wait for sufficient confirmations (typically required block confirmations for Zcash)
3. **Change Filtering**: Identify and filter change outputs
4. **Merkle Proof Generation**: Generate cryptographic proof of transaction inclusion

> **Note**: The DCT module currently supports **zenZEC only**. zenBTC is handled by a dedicated `x/zenbtc/` module for production stability. Attempts to use DCT for Bitcoin deposits will be rejected.

When a deposit achieves sufficient confirmations, the outpost submits a verification message to zrChain.

### Verification Flow

The `VerifyDepositBlockInclusion` message is the entry point for deposit processing. zrChain performs multi-step verification:

1. **Authorization**: Only the designated outpost address (configured per asset) may submit verification messages

2. **Block Header Retrieval**: The referenced block header is fetched from consensus-verified storage (see below)

3. **Merkle Proof Verification**: The transaction's inclusion is cryptographically verified against the stored block header

4. **Output Validation**: The deposit address, amount, and output index are confirmed against the verified transaction

5. **Key Metadata Check**: The deposit address is validated against the treasury's key store to confirm it's a legitimate custody address

6. **Deduplication**: A SHA256 hash of the transaction output prevents double-processing

Upon successful verification, a `PendingMintTransaction` is created with the deposit amount converted to wrapped token units.

### Block Header Consensus

Block headers are supplied through zrChain's enshrined oracle mechanism rather than direct external queries:

1. Each validator's sidecar monitors external blockchains and computes hashes of observed headers
2. Validators include these hashes in their vote extensions during consensus
3. Only headers achieving supermajority agreement (>2/3 voting power) are stored in zrChain state
4. Historical headers can be requested through the consensus process if needed

**This design prevents oracle manipulation**: a malicious actor would need to compromise >2/3 of validators to inject a fake block header.

### Minting Flow

Once a deposit is verified, minting proceeds through multiple phases:

**Phase 1 - Consensus Verification**

The PreBlocker confirms validators have reached consensus on:
- Solana nonce values (for transaction sequencing)
- Solana account states (to check if token accounts need initialization)
- Current asset prices (for fee calculation)

**Phase 2 - Transaction Construction**

The system prepares a Solana transaction that:
- Uses the current nonce to ensure proper sequencing
- Initializes the recipient's token account if needed
- Specifies the exact mint amount and recipient

**Phase 3 - MPC Signing**

The transaction is submitted to the treasury module, which:
- Creates a signature request for the dMPC operator set
- Collects threshold signatures from distributed key holders
- Assembles the fully signed transaction

**Phase 4 - Broadcast & Confirmation**

The signed transaction is broadcast to Solana. The sidecar oracle monitors for mint events and reports confirmation back to zrChain, updating the pending mint to completed status.

### Redemption Flow

When users burn wrapped tokens on Solana to redeem the underlying asset:

1. **Burn Detection**: The sidecar oracle monitors Solana for burn events and reports them to zrChain

2. **Maturity Period**: Burns enter a waiting period (typically 100-200 blocks) to protect against Solana reorganizations

3. **Redemption Creation**: After maturity, zrChain creates a redemption object specifying the destination address and amount

4. **Transaction Construction**: The appropriate outpost constructs an unsigned transaction (selecting UTXOs for Bitcoin/Zcash)

5. **MPC Signing**: The transaction is signed through the distributed key infrastructure

6. **Broadcast**: The outpost broadcasts the signed transaction to the external blockchain

7. **Supply Update**: Once confirmed, supply tracking is updated to reflect the reduced custody

### Supply Accounting

The DCT system maintains strict supply invariants:

| State | Description |
|-------|-------------|
| Custodied | Native assets held in custody addresses on external chains |
| Pending | Deposits verified but not yet minted on Solana |
| Minted | Wrapped tokens in circulation on Solana |

**Invariant**: `Custodied = Pending + Minted`

This invariant is enforced at every state transition, ensuring wrapped token supply is always fully backed.

> **Code Reference**: Supply tracking is implemented in `x/dct/keeper/msg_server_verify_deposit_block_inclusion.go`. The `CustodiedAmount` and `PendingAmount` fields are updated atomically during deposit verification.

### Timeout & Retry Handling

The system implements robust error handling:

**Mint Timeouts**: If a mint doesn't confirm within the block-to-live limit, it's automatically retried with a fresh nonce

**Redemption Retries**: Failed redemptions return to initiated status and can be retried indefinitely

**Event Matching**: Mint events are matched to pending transactions using unique counters to prevent double-minting

This design ensures that temporary network issues or failed transactions don't result in lost funds.

### Cross-Chain Observation

The sidecar oracle monitors multiple blockchains simultaneously:

| Chain | Data Observed |
|-------|---------------|
| Bitcoin | Block headers for SPV verification |
| Zcash | Block headers for SPV verification |
| Solana | Account nonces, mint/burn events |
| Ethereum | Gas prices, burn events from bridge contracts |

Block headers are stored in dedicated collections and used to verify deposit transaction inclusion via Merkle proofs.

### Security Properties

- **Distributed key custody**: dMPC ensures no party ever holds a complete private key
- **Consensus-verified external data**: Block headers and events require supermajority agreement
- **Deterministic execution**: All validators process the same data and reach identical state
- **Supply invariants**: Strict accounting ensures wrapped token supply equals custodied reserves
