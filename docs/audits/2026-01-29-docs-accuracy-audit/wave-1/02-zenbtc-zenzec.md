# zenBTC and zenZEC Documentation Audit Report

**Auditor**: Cipher (Wrapped Assets Auditor)
**Date**: 2026-01-29
**Scope**: zenBTC and zenZEC documentation accuracy vs. codebase implementation
**Documents Audited**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-introduction.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-introduction.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenZEC/zenzec-technical.md`

---

## Executive Summary

**Status: WARNING** - The documentation is largely accurate in describing the system architecture and flows, but contains several **factual inaccuracies** regarding external links, fee structures, and technical details that require correction. The zenZEC documentation has notable gaps in fee structure verification and the technical architecture references outdated endpoint information.

---

## Findings

### CRITICAL SEVERITY

*No critical findings.*

---

### HIGH SEVERITY

#### H-01: Incorrect GitHub Repository Link

**Location**: `zenbtc-technical.md`, Line 11

**Description**: The documentation states zenBTC module is located at `https://github.com/zenrocklabs/zenbtc`. Based on the codebase structure, the zenBTC module is actually part of the main zenrock monorepo at `zenrock/zrchain/x/zenbtc/`, not a separate repository.

**Evidence**:
- Documentation claims: "The zenBTC module is located in its own [GitHub repository](https://github.com/zenrocklabs/zenbtc)"
- Actual location: `/Users/peyton/code/zenrock/zenrock/zrchain/x/zenbtc/`
- The CLAUDE.md in the monorepo clearly states zenBTC is part of `zrchain/` with tags like `zrchain/vX.Y.Z`

**Impact**: Developers looking for the source code will be directed to a potentially non-existent or outdated repository.

**Recommendation**: Update the link to point to the correct location within the zenrock monorepo: `https://github.com/zenrocklabs/zenrock/tree/main/zrchain/x/zenbtc`

---

#### H-02: zenZEC Fee Structure Not Verifiable in Code

**Location**: `zenzec-introduction.md`, Lines 44-49

**Description**: The documentation claims specific fee structures ($5 flat mint, 50 bps redeem), but these exact values are not hardcoded in the DCT module params. The `Solana.Fee` field in the params protobuf is a generic uint64 with no documentation of its unit or the specific $5/50bps values.

**Evidence**:
- Documentation claims:
  ```
  | Mint | $5 flat |
  | Redeem | 50 bps |
  ```
- Code (`/zenrock/zrchain/x/dct/types/params.pb.go`, line 242):
  ```go
  Fee uint64 `protobuf:"varint,7,opt,name=fee,proto3" json:"fee,omitempty"`
  ```
- No hardcoded fee constants found for $5 or 50 bps in the DCT module

**Impact**: Fee structure may be configurable via governance and could change, making documentation inaccurate if not maintained.

**Recommendation**:
1. Clarify that fees are governance-configurable parameters
2. Add documentation for how fees are represented (e.g., what unit the Fee uint64 represents)
3. Consider adding a note about where to query current fee parameters

---

### MEDIUM SEVERITY

#### M-01: Solana Contract Address Discrepancy

**Location**: `zenbtc-technical.md`, Line 30

**Description**: The documentation hardcodes the zenBTC Solana contract address as `9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw`, but this value is a configurable parameter in the chain params (`Solana.MintAddress`).

**Evidence**:
- Documentation: "Contract Address: `9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw`"
- Code (`/zenrock/zrchain/x/zenbtc/types/params.pb.go`, line 157):
  ```go
  MintAddress string `protobuf:"bytes,5,opt,name=mint_address,json=mintAddress,proto3" json:"mint_address,omitempty"`
  ```

**Impact**: If the contract address changes (e.g., for testnet vs mainnet), documentation will be outdated.

**Recommendation**: Note that the address shown is for mainnet and add guidance on querying the current address via chain params or a dedicated API endpoint.

---

#### M-02: zenZEC Solana Contract Address May Differ from Documentation

**Location**: `zenzec-introduction.md`, Line 13

**Description**: The documentation claims the Solana CA is `JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS`. This should be verified against the actual DCT module params for ASSET_ZENZEC.

**Evidence**:
- Documentation: "Solana CA: JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS"
- The mint address is configured per-asset in the DCT params structure

**Impact**: Users may send funds to the wrong address if this is not the production address.

**Recommendation**: Verify this is the production mainnet address and add a note about querying the canonical address from chain state.

---

#### M-03: Maturity Period Documentation Discrepancy

**Location**: `zenbtc-technical.md`, Line 59; `zenzec-technical.md`, Line 58

**Description**: Documentation states maturity period is "100-200 blocks" but the `BurnEvent` struct has a `MaturityHeight` field suggesting it's a specific block height, not a range.

**Evidence**:
- Documentation: "Burn enters maturity period (100-200 blocks)"
- Code (`/zenrock/zrchain/x/zenbtc/types/redemptions.pb.go`, line 228):
  ```go
  MaturityHeight int64 `protobuf:"varint,8,opt,name=maturity_height,json=maturityHeight,proto3" json:"maturity_height,omitempty"`
  ```

**Impact**: Developers may not understand the exact maturity requirements.

**Recommendation**: Clarify whether the maturity is a fixed height offset or variable, and document the exact calculation.

---

#### M-04: Missing zenZEC Module Endpoint Clarification

**Location**: `zenzec-technical.md`, Lines 98-99

**Description**: The documentation correctly states zenZEC uses `zrchain.dct.Msg/VerifyDepositBlockInclusion` but could better explain the separation from zenBTC.

**Evidence**:
- Documentation: "Endpoint: `zrchain.dct.Msg/VerifyDepositBlockInclusion`"
- Code (`/zenrock/zrchain/x/dct/keeper/msg_server_verify_deposit_block_inclusion.go`, lines 34-38):
  ```go
  if asset == types.Asset_ASSET_ZENBTC {
      return nil, fmt.Errorf("zenBTC deposits must use the zenBTC module's VerifyDepositBlockInclusion endpoint, not DCT")
  }
  ```

**Impact**: The documentation is correct but could be clearer about why the separation exists.

**Recommendation**: Add a note explaining that the DCT module explicitly rejects ASSET_ZENBTC to maintain separation between production (zenBTC) and newer DCT assets (zenZEC).

---

### LOW SEVERITY

#### L-01: Supply Invariant Documentation vs Code Terminology

**Location**: `zenbtc-technical.md`, Line 64

**Description**: Documentation states invariant as "Custodied BTC = Pending + Minted zenBTC" but the code uses slightly different field names.

**Evidence**:
- Documentation: "Custodied BTC = Pending + Minted zenBTC"
- Code (`/zenrock/zrchain/x/zenbtc/types/supply.pb.go`):
  ```go
  type Supply struct {
      CustodiedBTC  uint64
      MintedZenBTC  uint64
      PendingZenBTC uint64
  }
  ```

**Impact**: Minor terminology mismatch, no functional issue.

**Recommendation**: Consider aligning documentation terminology exactly with code field names for clarity.

---

#### L-02: Block Confirmation Documentation Inconsistency

**Location**: `zenbtc-technical.md`, Line 44; `zenzec-introduction.md`, Line 58

**Description**: Documentation states "typically 6 blocks" and "~6 blocks" but this may be configurable and the Zcash block time calculation differs from Bitcoin.

**Evidence**:
- zenBTC: "sufficient confirmations (typically 6 blocks)"
- zenZEC: "Average block time | 75 seconds" with "~6 blocks"
- No hardcoded confirmation requirement found in the codebase (may be in proxy code)

**Impact**: Users may have incorrect expectations about confirmation times.

**Recommendation**: Document where confirmation requirements are configured and note any differences between assets.

---

#### L-03: Exchange Rate Formula Incomplete

**Location**: `zenbtc-technical.md`, Line 150

**Description**: The exchange rate formula "custodied BTC / created zenBTC" is simplified. The actual calculation in code accounts for pending amounts.

**Evidence**:
- Documentation: "The exchange rate is calculated as: custodied BTC / created zenBTC"
- The code divides by (MintedZenBTC + PendingZenBTC) based on the supply structure

**Impact**: Developers may misunderstand the exchange rate calculation.

**Recommendation**: Update the formula to accurately reflect the calculation including pending amounts.

---

#### L-04: Missing Shielded Transaction Clarity for zenZEC

**Location**: `zenzec-technical.md`, Lines 104-108

**Description**: Documentation correctly states only transparent addresses are supported for deposits, but could be clearer about the technical reason.

**Evidence**:
- Documentation states: "Deposits from shielded (z-address) transactions are not supported"
- This is likely because the Merkle proof verification requires transparent transaction data

**Impact**: Minor clarity issue.

**Recommendation**: Add a brief technical note explaining why shielded deposits cannot be verified (Merkle proofs require transparent transaction data visible on-chain).

---

### INFORMATIONAL

#### I-01: Documentation Does Not Cover Error Scenarios in Detail

**Location**: All docs

**Description**: The documentation provides happy-path flows but minimal coverage of error scenarios and edge cases.

**Evidence**: The codebase has extensive error handling (see `types/errors.go`) that is not reflected in documentation.

**Recommendation**: Consider adding a "Troubleshooting" or "Error Handling" section covering common failure modes and their resolution.

---

#### I-02: No API/CLI Reference for zenBTC/zenZEC Queries

**Location**: Both technical docs

**Description**: The documentation describes system architecture but does not provide practical API or CLI examples for querying state.

**Recommendation**: Add examples of:
- Querying current supply
- Checking pending mint status
- Querying redemption status
- Getting current exchange rate

---

#### I-03: Yield Distribution Timing Documentation

**Location**: `zenbtc-technical.md`, Line 137

**Description**: Documentation states "Yield is paid directly in sats on the Bitcoin blockchain, distributed daily" but the mechanism for daily distribution is not evident in the zrchain code.

**Evidence**: The code shows yield deposits affect the exchange rate, but no cron/scheduled distribution mechanism is visible in the zenBTC module.

**Recommendation**: Clarify whether "daily" refers to an external process or if it's handled elsewhere in the system.

---

## Positive Observations

1. **Accurate Architecture Description**: The overall system architecture (zrChain, Bitcoin Proxy, Sidecars, MPC) is accurately documented and matches the codebase structure.

2. **Correct Module Separation**: The documentation correctly explains that zenBTC and DCT (zenZEC) are separate modules with different endpoints.

3. **Supply Invariants Correctly Documented**: The fundamental supply accounting principles are accurately described.

4. **Security Model Accurate**: The dMPC security model description aligns with the implementation's key management approach.

5. **Redemption Flow Accurate**: The burn/redemption flow matches the actual state machine in the code (BurnStatus enum, Redemption struct).

---

## Recommendations Checklist

### Must Fix (High)
- [ ] Correct GitHub repository link for zenBTC
- [ ] Clarify zenZEC fee structure is governance-configurable with unit documentation

### Should Fix (Medium)
- [ ] Add notes about querying canonical contract addresses from chain state
- [ ] Clarify maturity period calculation
- [ ] Enhance module endpoint separation explanation

### Nice to Have (Low/Info)
- [ ] Align documentation terminology with code field names
- [ ] Document confirmation requirements location
- [ ] Complete exchange rate formula
- [ ] Add shielded transaction technical explanation
- [ ] Add error handling section
- [ ] Add API/CLI query examples
- [ ] Clarify yield distribution mechanism

---

*Cipher signing off - trust but verify, then verify again.*
