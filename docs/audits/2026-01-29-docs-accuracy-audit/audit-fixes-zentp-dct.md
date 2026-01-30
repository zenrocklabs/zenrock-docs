# Fix Plan: zenTP and DCT Documentation Accuracy Audit

**Based on Audit Report**: `/Users/peyton/code/zenrock/zenrock-docs/docs/audits/2026-01-29-docs-accuracy-audit/wave-1/03-zentp-dct.md`
**Created**: 2026-01-29
**Planner**: Planner-zenTP

---

```yaml
---
workers_recommended: 2
total_files: 8
total_findings: 12
critical: 0, high: 2, medium: 3, low: 4, informational: 3
---
```

---

## Work Package 1: zenTP Fee Documentation Correction (HIGH PRIORITY)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md`

**Findings**:

### Finding H-1: Fee Documentation Contradicts Code Implementation

**ID**: H-1
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md:95`

**Current** (line 95):
```markdown
- **No fees**: zenTP transfers are currently free (only network gas fees apply)
```

**Fixed**:
```markdown
- **Bridge fees**: zenTP charges a 0.5% bridge fee plus a 200 ROCK flat fee per transfer (in addition to network gas fees). Fee exemptions may apply for certain addresses.
```

**Verification**: Compare with `/Users/peyton/code/zenrock/zenrock/zrchain/x/zentp/types/params.go` lines 30-35:
```go
return Params{
    Solana:    DefaultSolanaParams,
    BridgeFee: math.LegacyNewDecWithPrec(5, 3),  // 0.5%
    FlatFee:   200000000,                         // 200 ROCK (200M urock)
}
```

---

**ID**: H-1b
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md:143-144`

**Current** (lines 143-144):
```markdown
**Q: Are there fees for zenTP transfers?**
A: zenTP itself has no fees. You only pay network gas fees (SOL on Solana, ROCK on zrChain).
```

**Fixed**:
```markdown
**Q: Are there fees for zenTP transfers?**
A: Yes. zenTP charges a 0.5% bridge fee plus a 200 ROCK flat fee for transfers from Zenrock to Solana. Transfers from Solana to Zenrock incur network gas fees only (SOL on Solana). Certain addresses may be exempt from bridge fees.
```

**Verification**: Check `msg_server_bridge.go` line 43 which calls `CalculateZentpMintFeeForAddress` for fee calculation.

---

## Work Package 2: DCT Fee Structure Correction (HIGH PRIORITY)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md`

**Findings**:

### Finding H-2: DCT Fee Structure Incorrect in Documentation

**ID**: H-2
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md:64-73`

**Current** (lines 64-73):
```markdown
### Fee Structure

All DCTs share a common fee structure:

| Action | Fee |
|--------|-----|
| Mint | $5 flat |
| Redeem | 50 bps |

Fees are converted to $ROCK and distributed according to Zenrock's tokenomic architecture.
```

**Fixed**:
```markdown
### Fee Structure

DCT fees are configurable per-asset and denominated in basis points (bps), not fixed dollar amounts:

| Action | Fee Model |
|--------|-----------|
| Mint | Basis-point fee configured per-asset in zrChain params |
| Redeem | Basis-point fee (`burn_fee_bps`) applied on Solana |

The actual fee percentages are set via governance and can be queried from the module parameters. Fees are collected and distributed according to Zenrock's tokenomic architecture.

> **Note**: Fee rates may vary by asset. Check the current params for the specific asset you are using.
```

**Verification**: Review Solana program `solana/programs/rock/src/instructions/unwrap.rs` which uses `burn_fee_bps` for percentage-based fees, not fixed dollar amounts.

---

## Work Package 3: Sei Documentation Reorganization (MEDIUM PRIORITY)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/sei-setup.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/sei-to-zenrock.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/sei-troubleshooting.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md`

**Findings**:

### Finding M-1: Sei Integration is IBC via Skip, Not zenTP

**ID**: M-1a
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/sei-setup.md`

**Current** (line 1-7):
```markdown
---
title: Sei Bridging Setup
sidebar_label: Sei Setup
sidebar_position: 5
---

Welcome to the documentation for transferring ROCK between Sei and zrChain. This page shows the process of using MetaMask as well as Keplr through the [app.sei.io](http://app.sei.io) webpage and further highlights common errors.
```

**Fixed**:
```markdown
---
title: Sei Bridging Setup (IBC via Skip)
sidebar_label: Sei Setup (IBC)
sidebar_position: 5
---

> **Note**: This guide describes bridging ROCK between Sei and zrChain using **IBC through Skip.build**, not the zenTP protocol. zenTP is specifically designed for Solana bridging. For Solana transfers, see [Solana Setup](solana-setup.md).

Welcome to the documentation for transferring ROCK between Sei and zrChain using [Skip.build](https://go.skip.build/). This page shows the process of using MetaMask as well as Keplr through the [app.sei.io](http://app.sei.io) webpage and further highlights common errors.
```

**Verification**: Code at `msg_server_bridge.go` lines 28-30 shows zenTP only validates Solana chain IDs:
```go
if _, err := validationtypes.ValidateSolanaChainID(goCtx, req.DestinationChain); err != nil {
    return nil, err
}
```

---

**ID**: M-1b
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md:11-15`

**Current** (lines 11-15):
```markdown
## System Architecture

zenTP is built directly on zrchain and works in cooperation with the sidecars and mpc infrastructure. The system consists of the following key components:
```

**Fixed** (add after line 15, before the numbered list):
```markdown
## System Architecture

zenTP is built directly on zrchain and works in cooperation with the sidecars and mpc infrastructure.

> **Important**: zenTP currently supports **Solana only** as a destination chain. For bridging to other chains like Sei, use standard IBC protocols (e.g., via [Skip.build](https://go.skip.build/)).

The system consists of the following key components:
```

**Verification**: The zenTP module only supports Solana chain IDs as shown in the validation code.

---

### Finding M-2: DCT Currently Only Supports zenZEC

**ID**: M-2
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-technical.md:42`

**Current** (line 42):
```markdown
2. **Confirmation Tracking**: Wait for sufficient confirmations (typically 6 for Bitcoin, similar for Zcash)
```

**Fixed**:
```markdown
2. **Confirmation Tracking**: Wait for sufficient confirmations (typically required block confirmations for Zcash)

> **Note**: The DCT module currently supports **zenZEC only**. zenBTC is handled by a dedicated `x/zenbtc/` module for production stability. Attempts to use DCT for Bitcoin deposits will be rejected.
```

**Verification**: See `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go` lines 34-38:
```go
if asset == types.Asset_ASSET_ZENBTC {
    return nil, fmt.Errorf("zenBTC deposits must use the zenBTC module's VerifyDepositBlockInclusion endpoint, not DCT")
}
```

---

## Work Package 4: Error Code Documentation (MEDIUM PRIORITY)

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md`

**Findings**:

### Finding M-3: Missing Error Messages in Troubleshooting

**ID**: M-3
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md` (add new section after line 136)

**Current**: No error code reference section exists.

**Fixed** (add new section before FAQ, after "Information to Gather"):
```markdown
## Error Code Reference

The zenTP module may return the following error codes:

| Error Code | Message | Meaning | Solution |
|------------|---------|---------|----------|
| 1100 | `expected gov account as only signer for proposal message` | Governance-only action attempted by non-governance account | This operation requires a governance proposal |
| 1102 | `invalid module account` | The specified module account is invalid | Check the module account address |
| 1103 | `insufficient balance` | Not enough ROCK to complete the transfer | Ensure you have enough ROCK including fees (0.5% + 200 ROCK flat fee) |
| 1104 | `invalid address` | The provided address format is invalid | Verify the recipient address format for the destination chain |
| 1105 | `invalid fee exemption` | Fee exemption configuration is invalid | Contact support if you believe you should be exempt |
| 1106 | `fee exemption not found` | No fee exemption exists for this address | Standard fees will apply |

```

**Verification**: See `/Users/peyton/code/zenrock/zenrock/zrchain/x/zentp/types/errors.go`:
```go
var (
    ErrInvalidSigner        = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
    ErrInvalidModuleAccount = sdkerrors.Register(ModuleName, 1102, "invalid module account")
    ErrInsufficientBalance  = sdkerrors.Register(ModuleName, 1103, "insufficient balance")
    ErrInvalidAddress       = sdkerrors.Register(ModuleName, 1104, "invalid address")
    ErrInvalidFeeExemption  = sdkerrors.Register(ModuleName, 1105, "invalid fee exemption")
    ErrFeeExemptionNotFound = sdkerrors.Register(ModuleName, 1106, "fee exemption not found")
)
```

---

## Work Package 5: Low Severity Fixes

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-to-zenrock.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/zenrock-to-solana.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-technical.md`

**Findings**:

### Finding L-1: ROCK Token Address Should Be Verified

**ID**: L-1
**Location**: Multiple files reference `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md:62`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/zenrock-to-solana.md:129`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md:46,110`

**Current** (solana-setup.md line 62):
```markdown
**Contract Address:** `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`
```

**Fixed**:
```markdown
**Contract Address:** `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`

> **Note**: The mint address is configurable via module parameters. To verify the current address, query `zenrockd query zentp params` or check on-chain state.
```

**Verification**: The code default at `params.go:15` shows `MintAddress: "4oUDGAy46CmemmozTt6kWT5E3rqkLp2rCvAumpMWqR5T"` but this is a default value. The actual mainnet address should be verified on-chain.

---

### Finding L-2: Transfer Time Estimates May Vary

**ID**: L-2
**Location**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/solana-to-zenrock.md:97-101`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/guides/zenrock-to-solana.md:95-101`

**Current** (solana-to-zenrock.md lines 95-101):
```markdown
## Expected Timing

| Step | Typical Time |
|------|--------------|
| Solana confirmation | ~10 seconds |
| zrChain detection | ~30-60 seconds |
| Total | 1-2 minutes |
```

**Fixed**:
```markdown
## Expected Timing

| Step | Typical Time |
|------|--------------|
| Solana confirmation | ~10 seconds |
| zrChain detection | ~30-60 seconds |
| Total | 1-2 minutes |

> **Note**: These times are estimates and may vary based on network conditions, sidecar oracle reporting frequency, and MPC cluster availability. During high-load periods, transfers may take longer.
```

**Verification**: Timing depends on sidecar oracle reporting frequency and MPC cluster availability, which are variable.

---

### Finding L-3: Supply Invariant Documentation Is Excellent But Missing Location

**ID**: L-3
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-technical.md:134-136`

**Current** (lines 134-136):
```markdown
**Invariant**: `Custodied = Pending + Minted`

This invariant is enforced at every state transition, ensuring wrapped token supply is always fully backed.
```

**Fixed**:
```markdown
**Invariant**: `Custodied = Pending + Minted`

This invariant is enforced at every state transition, ensuring wrapped token supply is always fully backed.

> **Code Reference**: Supply tracking is implemented in `x/dct/keeper/msg_server_verify_deposit_block_inclusion.go`. The `CustodiedAmount` and `PendingAmount` fields are updated atomically during deposit verification.
```

**Verification**: See `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go` lines 159-169.

---

### Finding L-4: Destination Chain Validation Not Fully Documented

**ID**: L-4
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md` (add after line 54)

**Current**: No address validation documentation exists.

**Fixed** (add new section after "MPC Infrastructure"):
```markdown
### Address Validation

zenTP validates destination addresses before processing transfers. The validation ensures:

1. **Chain ID Validation**: Only Solana chain IDs are currently supported
2. **Address Format**: Recipient addresses must be valid for the destination chain (e.g., valid Solana base58 addresses)

Invalid addresses will be rejected with an `invalid recipient address` error.
```

**Verification**: See `msg_server_bridge.go` lines 32-34:
```go
if treasurytypes.ValidateChainAddress(req.DestinationChain, req.RecipientAddress) != nil {
    return nil, errors.New("invalid recipient address: " + req.RecipientAddress)
}
```

---

## Work Package 6: Informational Improvements

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md`

**Findings**:

### Finding I-1: Missing CLI Examples for zenTP Queries

**ID**: I-1
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md` (add at end of file)

**Current**: No CLI examples exist.

**Fixed** (add new section at end of file):
```markdown
## CLI Reference

Power users can interact with zenTP directly via the CLI:

### Query Commands

```bash
# View module parameters (including fee configuration)
zenrockd query zentp params

# Query burn operations
zenrockd query zentp burns [id] [denom]
```

### Transaction Commands

```bash
# Initiate a bridge transfer
zenrockd tx zentp bridge [amount] [denom] [source-address] [destination-chain] [recipient-address]

# Example: Bridge 1000 ROCK to Solana
zenrockd tx zentp bridge 1000000000 urock zen1... solana:mainnet <solana-recipient-address>
```

For more details, see the [zenTP module README](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp).
```

**Verification**: CLI examples from `/Users/peyton/code/zenrock/zenrock/zrchain/x/zentp/README.md` lines 179-239.

---

### Finding I-2: GitHub Repository Link Should Point to Specific Module

**ID**: I-2
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenTP/zentp-technical.md:11`

**Current** (line 11):
```markdown
The zenTP module is located as a module under the [zrchain repository](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp). There you can find the available messages and queries for bridging ROCK.
```

**Fixed**:
```markdown
The zenTP module is located under the [zrchain repository](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp). Key files include:
- [README.md](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp/README.md) - Module documentation with CLI examples
- [types/](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp/types) - Message and parameter definitions
- [keeper/](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp/keeper) - Core bridging logic
```

**Verification**: Link verification to ensure paths exist in the repository.

---

### Finding I-3: DCT Module Separation Not Explained

**ID**: I-3
**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md` (add after line 34)

**Current** (lines 29-35):
```markdown
### Current DCTs

| Token | Underlying Asset | Chain | Status |
|-------|------------------|-------|--------|
| zenBTC | Bitcoin | Solana | Live |
| zenZEC | Zcash | Solana | Live |
```

**Fixed**:
```markdown
### Current DCTs

| Token | Underlying Asset | Chain | Module | Status |
|-------|------------------|-------|--------|--------|
| zenBTC | Bitcoin | Solana | `x/zenbtc` | Live |
| zenZEC | Zcash | Solana | `x/dct` | Live |

> **Architecture Note**: zenBTC uses a dedicated `x/zenbtc/` module separate from the general DCT framework. This separation ensures production stability for the Bitcoin wrapped asset, which was the first DCT deployed. The DCT module (`x/dct/`) handles zenZEC and future wrapped assets. Both modules share the same security properties and dMPC infrastructure.
```

**Verification**: See `/Users/peyton/code/zenrock/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go` lines 34-38 for the zenBTC rejection logic.

---

## Summary

| Work Package | Priority | Files | Findings | Estimated Effort |
|--------------|----------|-------|----------|------------------|
| WP1: zenTP Fee Correction | High | 2 | 2 | 30 min |
| WP2: DCT Fee Structure | High | 1 | 1 | 20 min |
| WP3: Sei Documentation | Medium | 4 | 2 | 45 min |
| WP4: Error Codes | Medium | 1 | 1 | 30 min |
| WP5: Low Severity | Low | 6 | 4 | 45 min |
| WP6: Informational | Low | 2 | 3 | 30 min |

**Total Estimated Effort**: ~3.5 hours

**Recommended Worker Assignment**:
- **Worker 1**: WP1, WP2, WP4 (High priority fixes + error codes)
- **Worker 2**: WP3, WP5, WP6 (Medium/Low priority + informational)
