# Hush Documentation Accuracy Audit

**Auditor**: Shadow (Privacy Systems Auditor)
**Date**: 2026-01-29
**Target**: Hush Protocol Documentation
**Documentation Path**: `/zenrock-docs/docs/docs/Hush/`
**Codebase Path**: `/zenrock/zrchain/x/hush/`

---

## Executive Summary

**Status**: **WARNING** - Several accuracy issues require documentation updates

The Hush documentation provides a solid overview of the privacy protocol, but contains **multiple discrepancies** between documented behavior and actual implementation. The most significant issues involve incorrect Merkle tree depth (documentation states 24 but cites ~16.7M capacity which implies depth 24, but one section says "depth 20"), incorrect max incoming claims (documentation states 24, but some code paths still reference 10), and missing critical security information (chain-ID binding, spending_binding). The fee model documentation is also incomplete regarding the protocol fee pool mechanism.

---

## Findings

### MEDIUM Severity

#### M-01: Merkle Tree Depth Inconsistency

**Location**: `hush-technical.md` line 16, `CLAUDE.md` (codebase)

**Description**: The documentation states:
> Merkle Tree | Sparse binary, depth 24 | ~16.7M commitment capacity

However, the codebase CLAUDE.md states:
> Merkle Tree: Sparse Merkle Tree, depth 20 (~1M capacity)

But the deployment scripts and params confirm depth 24:
```json
// hush-params-devnet.json
"merkle_tree_depth": 24
```

**Evidence**:
- `hush-technical.md:16` - Documents "depth 24" with "~16.7M commitment capacity"
- `CLAUDE.md` (monorepo) - States "depth 20 (~1M capacity)"
- `deploy-hush.sh:278` - Deploys with `{"tree_depth":24}`
- `lib.rs:72-74` - Comment says "Production tree is depth 20"

**Impact**: Developers and users may have incorrect understanding of system capacity limits.

**Recommendation**: Update all documentation to consistently state **depth 24 with ~16.7M capacity**. The deployment configuration is the source of truth.

---

#### M-02: Missing Critical Security Feature - Chain-ID Binding

**Location**: `hush-technical.md` (entire file)

**Description**: The documentation does not mention the chain-ID binding security feature that prevents replay attacks between testnet and mainnet. This was implemented per `AUDIT_FINDINGS_HUSH.md` (Finding #1, Medium severity).

**Evidence**:
```go
// merkle.go:386-397
func (k Keeper) ComputeOutputsCommitmentV7(
    ...
    chainId string, // SECURITY: Binds proof to specific chain, prevents replay attacks
) ([]byte, error) {
```

```rust
// lib.rs:56-61
/// Domain separator for chain_id hashing in outputs_commitment
/// SECURITY: Binds proofs to a specific chain, preventing replay attacks
const CHAIN_ID_DOMAIN: &[u8] = b"zenrock.hush.chain_id.v1";
```

**Impact**: Users and auditors are unaware of a critical security mechanism. This could lead to incomplete security assessments.

**Recommendation**: Add a section in Technical Architecture explaining:
- All proofs are bound to a specific chain ID
- Proofs generated on testnet cannot be used on mainnet
- This prevents cross-chain replay attacks

---

#### M-03: Missing Spending Binding Security Feature

**Location**: `hush-technical.md`, Key Hierarchy section

**Description**: The documentation's key hierarchy diagram and explanation is incomplete. It does not mention `spending_binding`, a critical security feature that binds incoming notes to the recipient's spending key, preventing attacks where someone with only the incoming viewing key could spend funds.

**Evidence**:
```rust
// lib.rs:63-69
/// Circuit-compatible domain constant for spending pubkey derivation
/// spending_pubkey = hmerge(spending_key, [SPENDING_PUBKEY_DOMAIN, 0, 0, 0])
/// SECURITY: Used to bind incoming/transfer note commitments to recipient's spending_key.
/// This prevents attacks where an attacker with ivk could spend incoming notes.
const SPENDING_PUBKEY_DOMAIN_FELT: u64 = 7310582938571023458;
```

From `CLAUDE.md` in hush-wasm:
> Incoming note commitments now include `spending_binding`:
> `commitment = hmerge(hmerge(hmerge(note_secret, randomness), spending_binding), [amount, 0, 0, asset])`

**Impact**: The documented key hierarchy is incomplete and could mislead security auditors about the protection mechanisms for incoming funds.

**Recommendation**: Update the key hierarchy diagram to include `spending_binding` and explain its security purpose:
```
spending_key (root secret)
    |
    +-- spending_binding (included in recipient commitments)
    +-- nullifier_key
    +-- incoming_vk_priv -> incoming_vk_pub
```

---

### LOW Severity

#### L-01: Max Incoming Claims Inconsistency

**Location**: `hush-technical.md` line 36

**Description**: Documentation states "Max incoming claims | 24 per transaction" but there are code paths that still reference 10:

**Evidence**:
```go
// msg_server.go:779-784
// Incoming nullifiers (4 felts each, padded to 10)
for _, nullifier := range msg.IncomingNullifiers {
    inputs = append(inputs, bytes32ToU64s(nullifier)...)
}
for i := len(msg.IncomingNullifiers); i < 10; i++ {
    inputs = append(inputs, 0, 0, 0, 0)
}
```

However, the V8 circuit uses 24:
```rust
// lib.rs:4990
"Maximum 24 total input notes allowed (got {} balance + {} incoming = {})"
```

**Impact**: Minor confusion. The newer circuit (V8) supports 24, but legacy code paths for transfers still reference 10.

**Recommendation**: Clarify that 24 is the current max for unshields, and verify transfer paths have been updated.

---

#### L-02: Incomplete Fee Documentation

**Location**: `hush-introduction.md` lines 25-29, `hush-technical.md` lines 140-149

**Description**: The fee documentation is incomplete:

1. **Shield fee**: Documentation says "Free" but code shows `ShieldFee` parameter exists (currently 0)
2. **Shielded transfer fee**: Documentation says "0.01 jitoSOL flat" but this is asset-specific configuration
3. **Unshield fee**: Documentation says "0.50%" but code shows this is calculated from the `fee` parameter passed in the message, not a fixed percentage
4. **Protocol Fee Pool**: Not mentioned in docs - fees now go to a claimable pool rather than being burned

**Evidence**:
```go
// keeper.go (Supply tracking)
ProtocolFeePool map[int32]uint64 // asset -> accumulated fees
```

```go
// msg_server.go:681-694
// Add fee to protocol fee pool (fees exit shielded supply, go to claimable pool)
if transferFee > 0 {
    if err := ms.k.AddFees(ctx, msg.Asset, transferFee); err != nil {
        return nil, err
    }
}
```

**Impact**: Users may misunderstand fee mechanics. The protocol fee pool mechanism allows governance to claim accumulated fees.

**Recommendation**:
- Document that shield fees are configurable (currently 0)
- Clarify transfer fees are per-asset configured
- Add section on Protocol Fee Pool and ClaimProtocolFees message

---

#### L-03: SOL Funding Details Incomplete

**Location**: `hush-technical.md` lines 140-149, `hush-guide.md` lines 103-111

**Description**: The SOL funding feature is documented but missing some details:

**Evidence**:
```json
// hush-params-devnet.json
"sol_fund_amount": "10000000",  // 0.01 SOL
"sol_fund_fee_bps": "10"        // 10 bps = 0.1%, not "10 bps" as table implies
```

Documentation states "+10 bps" additional fee but the actual parameter is `sol_fund_fee_bps` which is 10 basis points (0.10%), making total fee 60 bps (0.60%), matching the docs.

**Impact**: Minor - docs are actually correct, but the fee is configurable via governance.

**Recommendation**: Clarify that these values are governance-configurable parameters.

---

#### L-04: Commitment Formula Discrepancy

**Location**: `hush-technical.md` lines 68-78

**Description**: The documented commitment formulas are outdated. The V8 circuit uses a unified format.

**Documentation states**:
```
Balance Note:
commitment = RPO(merge(note_secret, randomness), [0, 0, sequence, amount])

Incoming Note:
commitment = RPO(merge(merge(note_secret, randomness), spending_binding), [amount, 0, 0, asset])
```

**Actual V8 unified format** (from CLAUDE.md):
```
All notes use: hash(hash(hash(note_secret, randomness), spending_pubkey), [amount, 0, 0, asset])
```

**Evidence**:
```
// CLAUDE.md in hush-wasm
- **V17 update**: V8 unified note format - all notes (shields, transfers, change) use the same
  commitment structure: `hash(hash(hash(note_secret, randomness), spending_pubkey), [amount, 0, 0, asset])`
```

**Impact**: Developers implementing wallet recovery or third-party tools may compute incorrect commitments.

**Recommendation**: Update commitment formulas to reflect V8 unified format.

---

### INFORMATIONAL

#### I-01: Positive - Comprehensive Privacy Guarantees Documentation

The documentation does an excellent job explaining:
- What information is hidden vs. visible
- The OFAC compliance mechanism
- Best practices for maximizing privacy
- Comparison to other privacy solutions (Zcash, Tornado Cash)

#### I-02: Positive - User Guide Clarity

The user guide is well-structured with clear step-by-step instructions. The troubleshooting section addresses common issues effectively.

#### I-03: WASM Proof Generation Times

Documentation mentions "10-30 seconds" for first proof and "~5-10 seconds" for subsequent proofs. Codebase benchmarks show:
- Native debug: ~4.5 seconds
- WASM release: ~1 second

**Recommendation**: Update documentation with current performance metrics.

#### I-04: Missing zenZEC Support Documentation

The codebase shows `ASSET_ZENZEC: u64 = 3` but documentation only mentions zenBTC and jitoSOL as supported assets.

**Recommendation**: Either document zenZEC support or clarify it's not yet enabled.

---

## Positive Observations

1. **Clear Privacy Model**: The documentation clearly explains the commitment-nullifier scheme and what information remains private vs. public.

2. **Compliance Documentation**: Excellent explanation of the OFAC compliance mechanism at the sidecar level.

3. **Best Practices Section**: Helpful guidance on maximizing privacy (common amounts, timing, IP hygiene).

4. **Tiered Key System**: Well-documented key hierarchy with clear capability matrix, though needs the `spending_binding` addition.

5. **Recovery Mechanism**: Clear explanation of deterministic wallet recovery from spending key.

6. **Comparison Table**: Useful comparison to Zcash and Tornado Cash highlighting Hush's differentiators.

---

## Recommendations Checklist

### Critical (Fix Before Launch)
- [ ] Add chain-ID binding security feature documentation
- [ ] Add spending_binding to key hierarchy documentation
- [ ] Update commitment formulas to V8 unified format

### High Priority
- [ ] Resolve Merkle tree depth inconsistency (confirm 24, update all docs)
- [ ] Document Protocol Fee Pool mechanism
- [ ] Clarify max incoming claims (24 for V8 circuit)

### Medium Priority
- [ ] Update proof generation time estimates
- [ ] Document that fees are governance-configurable
- [ ] Clarify zenZEC support status

### Low Priority
- [ ] Add AUDIT_FINDINGS_HUSH.md context for security auditors
- [ ] Consider adding a "Security Assumptions" section

---

## Summary

The Hush documentation is generally well-written and provides good coverage of the privacy model. However, several security features implemented after initial documentation (chain-ID binding, spending_binding, V8 unified format) are not reflected in the current documentation. These omissions could impact security auditors' understanding of the system's protection mechanisms.

The fee model documentation is also outdated, missing the Protocol Fee Pool mechanism that replaced fee burning.

**Recommended Priority**: Update security feature documentation first (chain-ID binding, spending_binding), then fee model, then minor corrections.

---

*Shadow signing off - privacy is not secrecy, it's sovereignty.*
