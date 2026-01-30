---
title: zenZEC - Technical Details
sidebar_label: Technical Details
sidebar_position: 2
---

## Technical Architecture

zenZEC is built on the DCT (Decentralized Custody Token) framework, sharing the same infrastructure as zenBTC with Zcash-specific adaptations.

### Zcash Proxy

The zcash-proxy service handles Zcash-specific operations:

- **Block monitoring**: Scans Zcash blocks for deposits to custody addresses
- **Transaction construction**: Builds unsigned redemption transactions
- **UTXO management**: Selects inputs for redemption transactions

### Deposit Flow

```
User → Zcash Network: Send ZEC to deposit address
         ↓
Zcash Proxy: Detect deposit, wait for confirmations
         ↓
Zcash Proxy → zrChain: VerifyDepositBlockInclusion
         ↓
zrChain: Verify Merkle proof, create PendingMintTransaction
         ↓
zrChain → MPC: Request Solana mint signature
         ↓
Solana: Mint zenZEC to user's wallet
```

### Block Header Consensus

Zcash block headers are stored separately from Bitcoin headers in zrChain:

- **Storage**: `ZcashBlockHeaders` collection (never mixed with BTC)
- **Consensus**: Supermajority validator agreement required
- **Verification**: Merkle proofs validated against stored headers

### Confirmation Requirements

| Parameter | Value |
|-----------|-------|
| Required confirmations | ~6 blocks |
| Average block time | 75 seconds |
| Typical confirmation time | ~7-8 minutes |

### Redemption Flow

```
User → Solana: Burn zenZEC
         ↓
Sidecar Oracle: Detect burn event, report to zrChain
         ↓
zrChain: Wait for maturity period (maturity_height = current_height + redemption_delay_blocks)
         ↓
zrChain: Create Redemption object
         ↓
Zcash Proxy: Construct unsigned transaction
         ↓
zrChain → MPC: Request signature
         ↓
Zcash Proxy → Zcash Network: Broadcast signed transaction
```

### Fee Structure

| Operation | Fee | Notes |
|-----------|-----|-------|
| Mint | $5 flat | Converted to $ROCK |
| Redeem | 50 bps | Deducted from redemption amount |

**Note**: Fee parameters are governance-configurable via the DCT module. The `Solana.Fee` field in the asset params stores the fee value. Query current fees with `zenrockd query dct params`.

### Supply Tracking

zenZEC maintains the same supply invariants as all DCTs:

```
Custodied ZEC = Pending Mints + Circulating zenZEC
```

This is enforced at every state transition and verifiable on-chain.

### Key Addresses

All zenZEC custody addresses are dMPC-controlled and registered in zrChain's treasury module. Each deposit address is:

- Generated via threshold key generation
- Verified against the keyring's configuration
- Tracked for balance reconciliation

### Module Separation

zenZEC operations go through the DCT module, not the zenBTC module:

- **Endpoint**: `zrchain.dct.Msg/VerifyDepositBlockInclusion`
- **Asset type**: `ASSET_ZENZEC`
- **Header storage**: `ZcashBlockHeaders`

**Important**: The DCT module explicitly rejects `ASSET_ZENBTC` deposits with the error: "zenBTC deposits must use the zenBTC module's VerifyDepositBlockInclusion endpoint, not DCT". This separation ensures:
1. zenBTC (production v0 code) remains isolated and stable
2. Newer DCT assets (zenZEC and future assets) use the generalized DCT framework (v1+)
3. Block headers are stored separately (BTC in `BtcBlockHeaders`, ZCash in `ZcashBlockHeaders`)

### Shielded Transaction Support

The current zenZEC implementation handles **transparent** Zcash addresses only. Deposits from shielded (z-address) transactions are not supported—users must send from a transparent (t-address).

**Technical Reason**: The deposit verification process requires generating a Merkle proof of transaction inclusion in a block. Shielded transactions encrypt their data (sender, receiver, amount) using zero-knowledge proofs, making it impossible to generate a Merkle proof that proves a specific deposit amount to a specific address. Only transparent transactions have visible on-chain data that can be used for proof generation.

Redemptions can be sent to either transparent or shielded addresses, depending on user preference, since the proxy constructs the outgoing transaction.

### Integration Points

zenZEC integrates with the same infrastructure as other DCTs:

| Component | Role |
|-----------|------|
| zrChain validation module | Block header consensus |
| zrChain treasury module | MPC signature requests |
| Zcash proxy | External chain interaction |
| Sidecar oracle | Event monitoring and reporting |
| Solana programs | SPL token minting/burning |

### Error Handling

- **Failed mints**: Retry automatically with fresh nonce after timeout
- **Failed redemptions**: Return to initiated status, can retry indefinitely
- **Orphaned deposits**: Funds remain in custody, can be recovered

For complete DCT framework details, see the [DCT Technical Architecture](../DCT/dct-technical.md).
