---
sidebar_position: 2
title: Technical Architecture
---

# Decentralized Custody Tokens: Technical Architecture

The DCT framework handles the complete lifecycle: deposit detection, verification, minting, and redemption.

## Deposit & Verification Flow

Dedicated outpost services monitor external blockchains for deposits to dMPC-controlled addresses. When a deposit achieves sufficient confirmations (typically 6 for Bitcoin), the outpost generates a Merkle proof demonstrating the transaction's inclusion in the block and submits it to zrChain.

zrChain then performs multi-step verification:

1. **Block Header Validation**: The referenced block header is fetched from consensus-verified storage (see zrChain's enshrined oracle above)
2. **Merkle Proof Verification**: The transaction's inclusion is cryptographically verified against the stored block header
3. **Deduplication**: A SHA256 hash of the transaction output prevents double-processing

Upon successful verification, a `PendingMintTransaction` is created.

## Minting Flow

Once a deposit is verified, the minting process proceeds through multiple phases:

**Phase 1 - Consensus Verification**: The PreBlocker confirms validators have reached consensus on Solana nonce values and account states.

**Phase 2 - Transaction Construction**: The system prepares a Solana transaction specifying the exact mint amount and recipient.

**Phase 3 - MPC Signing**: The transaction is submitted to the treasury module, which collects threshold signatures from distributed key holders.

**Phase 4 - Broadcast & Confirmation**: The signed transaction is broadcast to Solana. The sidecar oracle monitors for mint events and reports confirmation back to zrChain.

## Redemption Flow

When users burn wrapped tokens on Solana to redeem the underlying asset:

1. **Burn Detection**: The sidecar oracle monitors Solana for burn events
2. **Maturity Period**: Burns enter an escrow period before being processed
3. **Transaction Construction**: The relevant outpost constructs an unsigned transaction
4. **MPC Signing**: The transaction is signed through the distributed MPC infrastructure
5. **Broadcast**: The outpost broadcasts the signed transaction to the external blockchain

## Supply Accounting

The DCT system maintains strict supply invariants:

- **Custodied**: Native assets held in custody addresses on external chains
- **Pending**: Deposits verified but not yet minted on Solana
- **Minted**: Wrapped tokens in circulation on Solana

The invariant `Custodied = Pending + Minted` is enforced at every state transition. This ensures wrapped token supply is always fully backed by custodied reserves.
