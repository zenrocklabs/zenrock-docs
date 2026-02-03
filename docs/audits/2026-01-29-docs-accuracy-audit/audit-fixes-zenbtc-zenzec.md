# Fix Plan: zenBTC and zenZEC Documentation Audit

```yaml
---
workers_recommended: 1
total_files: 4
total_findings: 13
critical: 0
high: 2
medium: 4
low: 4
informational: 3
---
```

## Overview

This fix plan addresses findings from the zenBTC and zenZEC documentation audit report. The documentation files are located in `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/` and `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/`.

---

## Work Package 1: GitHub Repository Link Fix (High Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`

**Findings**:

### H-01: Incorrect GitHub Repository Link

- **ID**: H-01
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 11
- **Current**:
```markdown
The zenBTC module is located in its own [GitHub repository](https://github.com/zenrocklabs/zenbtc). There you can find the available messages and queries for minting and redeeming zenBTC. It is open for contribution and comments.
```
- **Fixed**:
```markdown
The zenBTC module is located in the [zenrock monorepo](https://github.com/zenrocklabs/zenrock/tree/main/zrchain/x/zenbtc). There you can find the available messages and queries for minting and redeeming zenBTC. It is open for contribution and comments.
```
- **Verification**:
  1. Click the new link and verify it navigates to the correct path in the zenrock monorepo
  2. Confirm the `x/zenbtc/` directory contains the module code (keeper/, types/, etc.)

---

## Work Package 2: Fee Structure Documentation (High Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`

**Findings**:

### H-02: zenZEC Fee Structure Not Verifiable in Code

- **ID**: H-02
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`, Lines 42-49
- **Current**:
```markdown
### Fees

| Action | Fee |
|--------|-----|
| Mint | $5 flat |
| Redeem | 50 bps |

Fees are converted to $ROCK and distributed according to Zenrock's tokenomic architecture.
```
- **Fixed**:
```markdown
### Fees

| Action | Fee |
|--------|-----|
| Mint | $5 flat |
| Redeem | 50 bps |

Fees are governance-configurable parameters stored in the DCT module params. The values shown above are the current mainnet configuration. Fee amounts are converted to $ROCK and distributed according to Zenrock's tokenomic architecture.

To query current fee parameters:
```bash
zenrockd query dct params
```
```
- **Verification**:
  1. Confirm the `Solana.Fee` field exists in `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/types/params.pb.go`
  2. Verify the fee is part of the `AssetParams` struct (line 115 shows `Solana *Solana` field)

### Fee Structure in Technical Doc

- **ID**: H-02b
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`, Lines 69-74
- **Current**:
```markdown
### Fee Structure

| Operation | Fee | Notes |
|-----------|-----|-------|
| Mint | $5 flat | Converted to $ROCK |
| Redeem | 50 bps | Deducted from redemption amount |
```
- **Fixed**:
```markdown
### Fee Structure

| Operation | Fee | Notes |
|-----------|-----|-------|
| Mint | $5 flat | Converted to $ROCK |
| Redeem | 50 bps | Deducted from redemption amount |

**Note**: Fee parameters are governance-configurable via the DCT module. The `Solana.Fee` field in the asset params stores the fee value. Query current fees with `zenrockd query dct params`.
```
- **Verification**: Same as H-02

---

## Work Package 3: Contract Address Documentation (Medium Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`

**Findings**:

### M-01: Solana Contract Address Discrepancy (zenBTC)

- **ID**: M-01
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Lines 28-31
- **Current**:
```markdown
1. **zenBTC SPL Token (Solana)**
   - Primary token interface on Solana for users to trade, send, and interact with zenBTC
   - Contract Address: `9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw`
   - Minting and burning controlled by dMPC-signed transactions from zrChain
```
- **Fixed**:
```markdown
1. **zenBTC SPL Token (Solana)**
   - Primary token interface on Solana for users to trade, send, and interact with zenBTC
   - Contract Address (Mainnet): `9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw`
   - Minting and burning controlled by dMPC-signed transactions from zrChain

   **Note**: The mint address is a configurable chain parameter (`Solana.MintAddress`). Query the canonical address: `zenrockd query zenbtc params`
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/zenbtc/types/params.pb.go` line 157 shows `MintAddress string`
  2. Confirm this is the mainnet address via chain query

### M-02: zenZEC Solana Contract Address

- **ID**: M-02
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`, Line 13
- **Current**:
```markdown
**Solana CA:** JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS
```
- **Fixed**:
```markdown
**Solana CA (Mainnet):** JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS

*The canonical mint address is stored in zrChain DCT module params. Query with: `zenrockd query dct params`*
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/types/params.pb.go` line 240 shows `MintAddress string` in Solana struct
  2. Verify the address against production chain state

---

## Work Package 4: Maturity Period Documentation (Medium Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`

**Findings**:

### M-03: Maturity Period Documentation Discrepancy

- **ID**: M-03a
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 59
- **Current**:
```markdown
3. Burn enters maturity period (100-200 blocks) to protect against Solana reorganizations
```
- **Fixed**:
```markdown
3. Burn enters maturity period to protect against Solana reorganizations. The maturity height is calculated as `current_block_height + redemption_delay_blocks`, where `redemption_delay_blocks = RedemptionDelaySeconds / block_time`. Default delay is 7 days.
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/validation/keeper/abci_utils.go` lines 1116-1134 for `calculateRedemptionMaturityHeight`
  2. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/validation/types/hv_params.go` line 19: `DefaultRedemptionDelaySeconds int64 = 7 * 24 * 60 * 60`

- **ID**: M-03b
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`, Line 58
- **Current**:
```markdown
zrChain: Wait for maturity period (100-200 blocks)
```
- **Fixed**:
```markdown
zrChain: Wait for maturity period (maturity_height = current_height + redemption_delay_blocks)
```
- **Verification**: Same as M-03a - both zenBTC and DCT use the same `calculateRedemptionMaturityHeight` function

---

## Work Package 5: Module Endpoint Separation (Medium Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`

**Findings**:

### M-04: Missing zenZEC Module Endpoint Clarification

- **ID**: M-04
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`, Lines 94-102
- **Current**:
```markdown
### Module Separation

zenZEC operations go through the DCT module, not the zenBTC module:

- **Endpoint**: `zrchain.dct.Msg/VerifyDepositBlockInclusion`
- **Asset type**: `ASSET_ZENZEC`
- **Header storage**: `ZcashBlockHeaders`

This separation ensures zenBTC (production code) is never affected by DCT operations.
```
- **Fixed**:
```markdown
### Module Separation

zenZEC operations go through the DCT module, not the zenBTC module:

- **Endpoint**: `zrchain.dct.Msg/VerifyDepositBlockInclusion`
- **Asset type**: `ASSET_ZENZEC`
- **Header storage**: `ZcashBlockHeaders`

**Important**: The DCT module explicitly rejects `ASSET_ZENBTC` deposits with the error: "zenBTC deposits must use the zenBTC module's VerifyDepositBlockInclusion endpoint, not DCT". This separation ensures:
1. zenBTC (production v0 code) remains isolated and stable
2. Newer DCT assets (zenZEC and future assets) use the generalized DCT framework (v1+)
3. Block headers are stored separately (BTC in `BtcBlockHeaders`, ZCash in `ZcashBlockHeaders`)
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go` lines 34-38 for the explicit rejection

---

## Work Package 6: Supply Invariant Terminology (Low Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`

**Findings**:

### L-01: Supply Invariant Documentation vs Code Terminology

- **ID**: L-01
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 64
- **Current**:
```markdown
This architecture ensures that every zenBTC token is fully backed by BTC held in decentralized custody, with strict supply invariants: `Custodied BTC = Pending + Minted zenBTC`.
```
- **Fixed**:
```markdown
This architecture ensures that every zenBTC token is fully backed by BTC held in decentralized custody, with strict supply invariants: `CustodiedBTC = PendingZenBTC + MintedZenBTC`.
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/zenbtc/types/supply.pb.go` lines 25-29 for exact field names:
     - `CustodiedBTC uint64`
     - `MintedZenBTC uint64`
     - `PendingZenBTC uint64`

---

## Work Package 7: Block Confirmation Documentation (Low Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`

**Findings**:

### L-02: Block Confirmation Documentation Inconsistency

- **ID**: L-02a
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 44
- **Current**:
```markdown
2. Bitcoin Proxy detects the deposit after sufficient confirmations (typically 6 blocks)
```
- **Fixed**:
```markdown
2. Bitcoin Proxy detects the deposit after sufficient confirmations (typically 6 blocks, ~1 hour on Bitcoin mainnet)
```
- **Verification**: Document standard Bitcoin confirmation practices

- **ID**: L-02b
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`, Lines 57-58
- **Current**:
```markdown
| Block Confirmations | ~6 | ~6 |
```
- **Fixed**:
```markdown
| Block Confirmations | ~6 (~1 hour) | ~6 (~7-8 minutes) |
```
- **Verification**:
  - Bitcoin: ~10 min/block x 6 = ~60 minutes
  - Zcash: ~75 sec/block x 6 = ~7.5 minutes (as documented on line 48)

---

## Work Package 8: Exchange Rate Formula (Low Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`

**Findings**:

### L-03: Exchange Rate Formula Incomplete

- **ID**: L-03
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 150
- **Current**:
```markdown
4. The exchange rate is calculated as: custodied BTC / created zenBTC
```
- **Fixed**:
```markdown
4. The exchange rate is calculated as: `CustodiedBTC / (MintedZenBTC + PendingZenBTC)`

This formula accounts for both minted tokens in circulation and pending mints that have been verified but not yet executed on Solana.
```
- **Verification**:
  1. Check `/Users/peyton/code/zenrock/zenrock/zrchain/x/zenbtc/keeper/keeper.go` lines 173-212 for `GetExchangeRate` function
  2. Specifically lines 207-211 show: `custodied.Quo(total)` where `total = MintedZenBTC + PendingZenBTC`

---

## Work Package 9: Shielded Transaction Clarity (Low Priority)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`

**Findings**:

### L-04: Missing Shielded Transaction Clarity for zenZEC

- **ID**: L-04
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`, Lines 104-108
- **Current**:
```markdown
### Shielded Transaction Support

The current zenZEC implementation handles **transparent** Zcash addresses only. Deposits from shielded (z-address) transactions are not supported—users must send from a transparent (t-address).

Redemptions can be sent to either transparent or shielded addresses, depending on user preference.
```
- **Fixed**:
```markdown
### Shielded Transaction Support

The current zenZEC implementation handles **transparent** Zcash addresses only. Deposits from shielded (z-address) transactions are not supported—users must send from a transparent (t-address).

**Technical Reason**: The deposit verification process requires generating a Merkle proof of transaction inclusion in a block. Shielded transactions encrypt their data (sender, receiver, amount) using zero-knowledge proofs, making it impossible to generate a Merkle proof that proves a specific deposit amount to a specific address. Only transparent transactions have visible on-chain data that can be used for proof generation.

Redemptions can be sent to either transparent or shielded addresses, depending on user preference, since the proxy constructs the outgoing transaction.
```
- **Verification**:
  1. Review Zcash documentation on shielded vs transparent transactions
  2. Confirm Merkle proof verification in `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go` line 67

---

## Work Package 10: Informational Improvements (Nice to Have)

**Files**:
- All documentation files

**Findings**:

### I-01: Error Handling Documentation

- **ID**: I-01
- **Location**: All docs
- **Recommendation**: Consider adding a "Troubleshooting" or "Error Handling" section covering common failure modes:
  - Deposit not detected (insufficient confirmations)
  - Mint transaction timeout (BTL exceeded)
  - Redemption retry scenarios
  - Invalid destination address errors

### I-02: API/CLI Reference for zenBTC/zenZEC Queries

- **ID**: I-02
- **Location**: Both technical docs
- **Recommendation**: Add a new section with practical examples:

```markdown
### Querying State

**Current Supply:**
```bash
zenrockd query zenbtc supply
zenrockd query dct supply --asset ASSET_ZENZEC
```

**Pending Mint Status:**
```bash
zenrockd query zenbtc pending-mints
zenrockd query dct pending-mints --asset ASSET_ZENZEC
```

**Redemption Status:**
```bash
zenrockd query zenbtc redemptions
zenrockd query dct redemptions --asset ASSET_ZENZEC
```

**Current Exchange Rate:**
```bash
zenrockd query zenbtc supply  # includes exchange_rate field
```
```

### I-03: Yield Distribution Timing Documentation

- **ID**: I-03
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`, Line 137
- **Current**:
```markdown
Yield is paid directly in sats on the Bitcoin blockchain, distributed daily.
```
- **Recommendation**: Clarify whether "daily" refers to an external process or scheduled on-chain mechanism. The zenBTC module code shows yield deposits affect the exchange rate but no explicit daily cron is visible in the module.

---

## Summary of Changes

| Finding ID | Severity | File | Action |
|------------|----------|------|--------|
| H-01 | High | zenbtc-technical.md | Update GitHub link |
| H-02 | High | zenzec-introduction.md, zenzec-technical.md | Add governance-configurable note |
| M-01 | Medium | zenbtc-technical.md | Add mainnet label and query note |
| M-02 | Medium | zenzec-introduction.md | Add mainnet label and query note |
| M-03 | Medium | zenbtc-technical.md, zenzec-technical.md | Fix maturity period description |
| M-04 | Medium | zenzec-technical.md | Expand module separation explanation |
| L-01 | Low | zenbtc-technical.md | Align terminology with code |
| L-02 | Low | zenbtc-technical.md, zenzec-introduction.md | Add time estimates |
| L-03 | Low | zenbtc-technical.md | Complete exchange rate formula |
| L-04 | Low | zenzec-technical.md | Add technical explanation |
| I-01 | Info | All | Add error handling section (optional) |
| I-02 | Info | Both technical docs | Add CLI examples (optional) |
| I-03 | Info | zenbtc-technical.md | Clarify yield timing (optional) |

---

## Execution Order

1. **High Priority (Must Fix)**: Work Packages 1-2
2. **Medium Priority (Should Fix)**: Work Packages 3-5
3. **Low Priority (Nice to Have)**: Work Packages 6-9
4. **Informational (Optional)**: Work Package 10

**Estimated Time**: 1-2 hours for all required fixes (High + Medium priority)
