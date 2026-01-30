---
title: zenTP Module
sidebar_label: zenTP Module
sidebar_position: 11
---

## Overview

The **zenTP Module** (`x/zentp/`) implements the cross-chain transfer protocol for bridging $ROCK between Solana and zrChain.

### Key Capabilities

- **ROCK Bridging**: Transfer $ROCK tokens between Solana and zrChain
- **Bidirectional Flow**: Supports both directions of transfer
- **Trustless Verification**: Uses oracle consensus for cross-chain state

### Transfer Flow

#### Solana to zrChain
1. User burns ROCK on Solana
2. Sidecar detects burn event
3. Validators reach consensus via vote extensions
4. ROCK minted on zrChain

#### zrChain to Solana
1. User burns ROCK on zrChain
2. MPC signs Solana mint transaction
3. ROCK minted on Solana

### Related Documentation

- [Cross-Chain Operations](./cross-chain.md) - General cross-chain strategy
- [Validation Module](./validation.md) - Oracle consensus mechanism

### CLI Reference

Query zenTP state using `zenrockd`:

```bash
# Query module parameters (transfer limits, fees)
zenrockd query zentp params

# List pending cross-chain transfers
zenrockd query zentp pending-transfers

# List all available zenTP queries
zenrockd query zentp --help
```
