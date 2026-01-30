---
title: zenBTC Module
sidebar_label: zenBTC Module
sidebar_position: 8
---

## Overview

The **zenBTC Module** (`x/zenbtc/`) handles Bitcoin wrapped asset operations on zrChain. This is Zenrock's flagship product - the first fully decentralized wrapped Bitcoin.

### Key Capabilities

- **Deposit Verification**: Verifies Bitcoin deposits via SPV proofs against consensus-verified block headers
- **Mint Processing**: Creates zenBTC tokens on Solana corresponding to verified Bitcoin deposits
- **Redemption Flow**: Burns zenBTC and initiates Bitcoin withdrawals to user addresses

### Architecture

zenBTC operates through the following flow:

1. **Deposit Detection**: Bitcoin Proxy monitors for deposits to zenBTC custody addresses
2. **Block Verification**: `VerifyDepositBlockInclusion` message submits deposit proof
3. **Mint Initiation**: Creates `PendingMintTransaction` for oracle consensus
4. **Solana Minting**: After consensus, MPC signs Solana mint transaction
5. **Completion**: Sidecar confirms Solana mint, updates status to MINTED

### Integration with Other Modules

- **Treasury Module**: Manages the MPC keys used for signing
- **Validation Module**: Processes vote extensions for BTC block header consensus
- **Policy Module**: Governance over zenBTC operations

### Related Documentation

- [dMPC](./dmpc.md) - How signing works
- [Validation Module](./validation.md) - Block header consensus
- [Treasury Module](./treasury.md) - Key management

### CLI Reference

Query zenBTC state using `zenrockd`:

```bash
# Query module parameters (mint address, fees, delays)
zenrockd query zenbtc params

# List pending mint transactions awaiting Solana confirmation
zenrockd query zenbtc pending-mint-transactions

# Query current zenBTC supply and exchange rate
zenrockd query zenbtc supply

# List all available zenBTC queries
zenrockd query zenbtc --help
```
