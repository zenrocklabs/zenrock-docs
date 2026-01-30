# zenTP and DCT Documentation Accuracy Audit

**Auditor**: Bridge (Cross-Chain Protocol Auditor)
**Date**: 2026-01-29
**Scope**: zenTP (Transfer Protocol) and DCT (Decentralized Custody Token) documentation

---

## Executive Summary

**Status**: **High Confidence with Minor Corrections Required**

The zenTP and DCT documentation is well-written and largely accurate, providing developers with actionable guidance for bridging ROCK tokens and understanding the DCT framework. However, several discrepancies exist between the documentation and the codebase, particularly around fee structures and technical implementation details. The Sei integration guides rely on third-party Skip.build rather than zenTP itself, which should be clarified. Overall, the documentation enables developers to successfully bridge assets, with minor corrections needed for full accuracy.

---

## Findings

### Critical Issues

*No critical issues identified.*

---

### High Severity

#### Finding H-1: Fee Documentation Contradicts Code Implementation

**Location**: `/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md` (line 95), `/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md` (line 144)

**Description**: The documentation states "No fees: zenTP transfers are currently free (only network gas fees apply)" and in the FAQ: "zenTP itself has no fees."

However, the codebase shows zenTP has configurable fees:

```go
// zrchain/x/zentp/types/params.go
func NewParams() Params {
    return Params{
        Solana:    DefaultSolanaParams,
        BridgeFee: math.LegacyNewDecWithPrec(5, 3),  // 0.5% bridge fee
        FlatFee:   200000000,                         // 200 ROCK flat fee
    }
}
```

The keeper code in `msg_server_bridge.go` (lines 43-46) explicitly calculates fees:
```go
totalAmountInt, totalFeeInt, err := k.CalculateZentpMintFeeForAddress(ctx, req.Amount, req.Creator)
```

**Impact**: Users may be surprised by fees deducted from their bridge transactions. This could cause confusion and support issues.

**Recommendation**: Update documentation to accurately reflect the fee structure:
- 0.5% bridge fee (configurable)
- Flat fee of 200,000,000 urock (200 ROCK)
- Note that fee exemptions exist for certain addresses

---

#### Finding H-2: DCT Fee Structure Incorrect in Documentation

**Location**: `/zenrock-docs/docs/docs/DCT/dct-introduction.md` (lines 66-72)

**Description**: The documentation states:
> | Action | Fee |
> |--------|-----|
> | Mint | $5 flat |
> | Redeem | 50 bps |

However, DCT fees are asset-specific and stored in params. The Solana programs show fee handling is based on basis points (`burn_fee_bps`), not fixed dollar amounts:

```rust
// solana/programs/rock/src/instructions/unwrap.rs
let base_fee = (args.value * accounts.global_config.burn_fee_bps) / BASIS_POINTS_DIVISOR;
```

The mint side shows fees are passed as arguments and applied per-transaction, not as fixed dollar values.

**Impact**: Users may budget incorrectly for DCT operations.

**Recommendation**: Update to reflect the actual fee mechanism:
- Fees are basis-point based, not fixed dollar amounts
- Mint fees are configurable per-asset in zrChain params
- Redeem/burn fees are determined by `burn_fee_bps` on Solana

---

### Medium Severity

#### Finding M-1: Sei Integration is IBC via Skip, Not zenTP

**Location**: `/zenrock-docs/docs/docs/zenTP/guides/sei-setup.md`, `sei-to-zenrock.md`, `zenrock-to-sei.md`

**Description**: The Sei guides are placed under the zenTP documentation folder, but they describe using Skip.build (a third-party IBC aggregator) rather than the zenTP protocol itself. zenTP is specifically designed for Solana bridging using Zenrock's dMPC infrastructure.

From `sei-to-zenrock.md`:
> "First, head to https://go.skip.build/"

The zenTP module in code (`zrchain/x/zentp/`) only supports Solana as a destination:
```go
// msg_server_bridge.go line 28-29
if _, err := validationtypes.ValidateSolanaChainID(goCtx, req.DestinationChain); err != nil {
    return nil, err
}
```

**Impact**: Documentation structure implies Sei bridging is part of zenTP, when it actually uses standard IBC via Skip. This could confuse developers about zenTP's actual capabilities.

**Recommendation**:
1. Move Sei guides to a separate section (e.g., "IBC Bridging" or "Skip Integration")
2. Clearly label that Sei uses IBC through Skip.build, not zenTP
3. Update zenTP introduction to clarify it is specifically for Solana bridging

---

#### Finding M-2: DCT Currently Only Supports zenZEC (Not Multiple Assets)

**Location**: `/zenrock-docs/docs/docs/DCT/dct-technical.md` (lines 42, 57-59)

**Description**: The technical documentation implies broad asset support with phrases like "for Bitcoin, similar for Zcash" and shows Bitcoin in the architecture diagram. However, the code explicitly rejects zenBTC from the DCT module:

```go
// x/dct/keeper/msg_server_verify_deposit_block_inclusion.go lines 36-38
if asset == types.Asset_ASSET_ZENBTC {
    return nil, fmt.Errorf("zenBTC deposits must use the zenBTC module's VerifyDepositBlockInclusion endpoint, not DCT")
}
```

zenBTC is handled by a separate `x/zenbtc/` module for stability reasons.

**Impact**: Developers may attempt to use DCT for Bitcoin operations and encounter unexpected errors.

**Recommendation**:
1. Clarify that zenBTC has its own dedicated module (`x/zenbtc/`)
2. DCT currently supports zenZEC and future non-BTC wrapped assets
3. Add a note explaining the architectural decision to keep zenBTC separate

---

#### Finding M-3: Missing Error Messages in Troubleshooting

**Location**: `/zenrock-docs/docs/docs/zenTP/guides/troubleshooting.md`

**Description**: The codebase defines specific error types that users may encounter:

```go
// x/zentp/types/errors.go
var (
    ErrInvalidSigner        = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
    ErrInvalidModuleAccount = sdkerrors.Register(ModuleName, 1102, "invalid module account")
    ErrInsufficientBalance  = sdkerrors.Register(ModuleName, 1103, "insufficient balance")
    ErrInvalidAddress       = sdkerrors.Register(ModuleName, 1104, "invalid address")
    ErrInvalidFeeExemption  = sdkerrors.Register(ModuleName, 1105, "invalid fee exemption")
    ErrFeeExemptionNotFound = sdkerrors.Register(ModuleName, 1106, "fee exemption not found")
)
```

These specific error messages are not documented in troubleshooting.

**Impact**: Users cannot quickly diagnose issues based on error codes.

**Recommendation**: Add a section mapping common error codes to explanations and solutions.

---

### Low Severity

#### Finding L-1: ROCK Token Address Should Be Verified

**Location**: `/zenrock-docs/docs/docs/zenTP/guides/solana-setup.md` (line 62), `zenrock-to-solana.md` (line 129), `troubleshooting.md` (line 110)

**Description**: The documentation consistently references the ROCK SPL token address as:
> `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`

The params.go shows a different mint address in defaults:
```go
MintAddress: "4oUDGAy46CmemmozTt6kWT5E3rqkLp2rCvAumpMWqR5T"
```

**Impact**: Users may be confused if the documented address differs from what they see on-chain.

**Recommendation**: Verify which address is correct for mainnet and ensure consistency. Add a note that the address can be found in module params.

---

#### Finding L-2: Transfer Time Estimates May Vary

**Location**: `/zenrock-docs/docs/docs/zenTP/guides/solana-to-zenrock.md` (lines 97-101), `zenrock-to-solana.md` (lines 95-101)

**Description**: Documentation provides specific timing estimates:
- "zrChain detection: ~30-60 seconds"
- "MPC signature collection: ~30-60 seconds"

These timings depend on:
1. Sidecar oracle reporting frequency
2. MPC cluster availability
3. Network congestion

**Impact**: Users may have unrealistic expectations during high-load periods.

**Recommendation**: Add a note that times are estimates and can vary based on network conditions.

---

#### Finding L-3: Supply Invariant Documentation Is Excellent But Missing Location

**Location**: `/zenrock-docs/docs/docs/DCT/dct-introduction.md` (lines 84-92), `dct-technical.md` (lines 126-136)

**Description**: The supply invariant (`Custodied = Pending + Minted`) is well documented. However, the actual implementation location is not referenced for developers who want to verify.

The code shows supply tracking in:
```go
// x/dct/keeper/msg_server_verify_deposit_block_inclusion.go
supply.CustodiedAmount += msg.Amount
if !isYieldDeposit {
    supply.PendingAmount += wrappedAmount
}
```

**Impact**: Developers wanting to audit the supply logic have no code reference.

**Recommendation**: Add a reference to the codebase location where supply invariants are enforced.

---

#### Finding L-4: Destination Chain Validation Not Fully Documented

**Location**: `/zenrock-docs/docs/docs/zenTP/zentp-technical.md`

**Description**: The documentation doesn't mention that zenTP validates destination addresses per chain. The code shows:

```go
// msg_server_bridge.go lines 32-34
if treasurytypes.ValidateChainAddress(req.DestinationChain, req.RecipientAddress) != nil {
    return nil, errors.New("invalid recipient address: " + req.RecipientAddress)
}
```

Users may not understand address format requirements for different chains.

**Impact**: Minor user confusion about address formats.

**Recommendation**: Document address validation requirements for supported destination chains.

---

### Informational

#### Finding I-1: Missing CLI Examples for zenTP Queries

**Location**: `/zenrock-docs/docs/docs/zenTP/zentp-technical.md`

**Description**: The code README (`x/zentp/README.md`) contains excellent CLI documentation:
```bash
zenrockd query zentp params
zenrockd query zentp burns [id] [denom]
zenrockd tx zentp bridge [amount] [denom] [source-address] [destination-chain] [recipient-address]
```

This is not present in the user-facing documentation.

**Recommendation**: Add CLI command examples to the technical documentation for power users.

---

#### Finding I-2: GitHub Repository Link Should Point to Specific Module

**Location**: `/zenrock-docs/docs/docs/zenTP/zentp-technical.md` (line 11)

**Description**: The link points to the general module path:
> "The zenTP module is located as a module under the [zrchain repository](https://github.com/zenrocklabs/zrchain/tree/main/x/zentp)"

**Recommendation**: Verify the link is correct and consider adding direct links to key files (types, keeper, README).

---

#### Finding I-3: DCT Module Separation Not Explained

**Location**: `/zenrock-docs/docs/docs/DCT/`

**Description**: The architectural decision to keep zenBTC in a separate module while DCT handles other assets is important context that developers should understand. From the code:

```go
// IMPORTANT: zenBTC deposits are handled by the zenBTC module, not DCT.
// This module is for v1+ assets only (zenZEC and future wrapped assets).
```

**Recommendation**: Add a brief explanation of why zenBTC and DCT are separate modules (stability, production maturity).

---

## Positive Observations

1. **Clear Flow Diagrams**: The ASCII flow diagrams in `solana-to-zenrock.md` and `zenrock-to-solana.md` accurately represent the bridging process.

2. **Accurate Architecture Description**: The zenTP technical documentation correctly describes the sidecar and MPC infrastructure roles.

3. **Comprehensive Wallet Setup**: The wallet setup guides (Phantom, Keplr) are accurate and user-friendly.

4. **Good Troubleshooting Coverage**: The troubleshooting guides address real issues users encounter.

5. **Accurate DCT Technical Flow**: The deposit verification, minting, and redemption flows are accurately described and match the codebase.

6. **Supply Invariant Clarity**: The `Custodied = Pending + Minted` invariant is clearly explained and is enforced in code.

7. **Sei Troubleshooting Is Practical**: The Sei-specific troubleshooting addresses real address derivation issues between MetaMask and Keplr.

---

## Recommendations Checklist

- [ ] **H-1**: Update zenTP fee documentation to reflect actual BridgeFee (0.5%) and FlatFee (200 ROCK)
- [ ] **H-2**: Correct DCT fee structure to reflect basis-point model, not fixed dollar amounts
- [ ] **M-1**: Move Sei guides to separate IBC section; clarify zenTP is Solana-only
- [ ] **M-2**: Add note that zenBTC uses separate module, DCT is for zenZEC and future assets
- [ ] **M-3**: Add error code reference section to troubleshooting guide
- [ ] **L-1**: Verify and document correct mainnet ROCK SPL token address
- [ ] **L-2**: Add caveat that timing estimates vary based on network conditions
- [ ] **L-3**: Add code references for supply invariant implementation
- [ ] **L-4**: Document address validation requirements per destination chain
- [ ] **I-1**: Add CLI command examples from module README to technical docs
- [ ] **I-2**: Verify GitHub repository link accuracy
- [ ] **I-3**: Add explanation of zenBTC/DCT module separation rationale

---

*Bridge signing off - every crossing must be safe.*
