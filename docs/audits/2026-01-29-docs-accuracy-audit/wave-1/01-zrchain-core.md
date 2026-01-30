# zrChain Core Documentation Audit Report

**Auditor**: Atlas (Chain Architecture Auditor)
**Date**: 2026-01-29
**Scope**: `/docs/zrChain/` documentation vs `/zenrock/zrchain/` codebase
**Status**: **WARNING** - Documentation is largely accurate but has gaps in module coverage and some technical inaccuracies

---

## Executive Summary

The zrChain core documentation provides a solid conceptual foundation for understanding Zenrock's architecture, but has significant gaps in module coverage. The documentation covers only 4 of the 11+ modules in the codebase, with several production-critical modules (zenbtc, dct, hush, zentp, zenex, nrp) entirely undocumented. Message types and API endpoints documented in module READMEs are accurate but the public-facing docs are higher-level and omit technical details developers need.

---

## Findings by Severity

### Critical Issues

#### 1. Missing Module Documentation
**Location**: `/docs/zrChain/` (entire directory)
**Evidence**: The codebase contains 11+ modules in `x/`:
```
x/dct/        - Digital Currency Tokens (zenZEC, future wrapped assets)
x/zenbtc/     - Bitcoin wrapped asset (production)
x/hush/       - Privacy-preserving shielded transactions
x/zentp/      - Token bridging (ROCK <-> Solana)
x/zenex/      - Exchange functionality
x/nrp/        - Network resource provisioning
x/mint/       - Token minting
x/genutil/    - Genesis utilities
x/testutil/   - Testing utilities
```
Only `identity`, `treasury`, `policy`, and `validation` are documented.

**Impact**: Developers cannot understand or integrate with core functionality like:
- zenBTC minting/redemption flow
- Privacy features (Hush module)
- Cross-chain bridging (zenTP)
- DCT framework for wrapped assets

**Recommendation**: Create dedicated documentation pages for at least:
- `x/zenbtc/` - Critical production module
- `x/dct/` - Foundation for wrapped assets
- `x/hush/` - Privacy features
- `x/zentp/` - Token bridging

---

### High Severity Issues

#### 2. Architecture Document Lists Only 4 Modules
**Location**: `/docs/zrChain/architecture.md` line 25-30
**Evidence**:
```markdown
Besides the standard Cosmos modules, the Zenrock blockchain incorporates four additional modules that:
- Create and manage workspaces and keyrings in the [**_Identity Module_**](identity.md)
- Request and manage keys as well as request signatures in the [**_Treasury Module_**](treasury.md)
- Create and define policies in the [**_Policy Module_**](policy.md)
- Managing validator stake and voting power with the [**_Validation Module_**](validation.md)
```
**Actual Code**: The blockchain has 11+ modules as shown above.

**Impact**: Misleads developers about system scope and capabilities.

**Recommendation**: Update architecture page to mention all modules, even if briefly, with links to detailed docs where available.

---

#### 3. BTL (Block-Time-Lock) Timeout Value Unverified
**Location**: `/docs/zrChain/treasury.md` lines 42-52
**Evidence**:
```markdown
- **Timeout**: If a request is not fulfilled within approximately **20 blocks**, it times out automatically
```
**Actual Code**: In `x/treasury/types/params.go`:
```go
func DefaultParams() Params {
    return NewParams(10, 1000, "0.0001urock")
}
```
The default BTL is 1000 blocks, not 20. The module README confirms `DefaultBTL` parameter exists.

**Impact**: Developers may have incorrect expectations about timeout behavior.

**Recommendation**: Verify actual BTL value used in production and update documentation. The "20 blocks" figure should be replaced with accurate value or made configurable with clear documentation.

---

#### 4. Policy Module Missing MsgUpdateWasmParams Documentation
**Location**: `/docs/zrChain/policy.md`
**Evidence**: The proto definition includes:
```protobuf
// x/policy/tx.proto line 45-48
rpc UpdateWasmParams(MsgUpdateWasmParams) returns (MsgUpdateWasmParamsResponse);
```
This message type is not documented in the public docs or the module README.

**Impact**: CosmWasm integration capabilities undocumented.

**Recommendation**: Document `MsgUpdateWasmParams` and its role in managing CosmWasm module parameters.

---

### Medium Severity Issues

#### 5. Key Type Documentation Incomplete
**Location**: `/docs/zrChain/treasury.md` line 13
**Evidence**:
```markdown
Zenrock has the capacity to generate **_ecdsa secp256k1_** and **_eddsa ed25519_** keys.
```
**Actual Code**: `x/treasury/key.proto` defines:
```protobuf
enum KeyType {
  KEY_TYPE_UNSPECIFIED = 0;
  KEY_TYPE_ECDSA_SECP256K1 = 1;
  KEY_TYPE_EDDSA_ED25519 = 2;
  KEY_TYPE_BITCOIN_SECP256K1 = 3;  // Standard Bitcoin Keys
}
```

**Impact**: Bitcoin-specific key type not documented, may confuse developers.

**Recommendation**: Update treasury.md to mention `bitcoin` as a distinct key type:
```markdown
Zenrock has the capacity to generate **ecdsa secp256k1**, **eddsa ed25519**, and **bitcoin secp256k1** keys.
```

---

#### 6. Signing Request Flow Step Count Mismatch
**Location**: `/docs/zrChain/treasury.md` lines 28-37
**Evidence**: Documents a "6-step flow" but the process documentation pages show 10-14 steps.

**Impact**: Oversimplification may confuse developers expecting detailed flow.

**Recommendation**: Clarify that the 6-step flow is a simplified overview and link to the detailed process pages.

---

#### 7. Cross-Chain Documentation States IBC "Will Support" Future Tense
**Location**: `/docs/zrChain/cross-chain.md` line 21
**Evidence**:
```markdown
zrChain will also support IBC in the future to connect with other Cosmos-based blockchains
```
**Actual Code**: zrChain is a Cosmos SDK chain and IBC is already available.

**Impact**: May mislead developers about current IBC capabilities.

**Recommendation**: Verify and update IBC status - if IBC is live, document it as available.

---

#### 8. GG21 Protocol Citation Year Inconsistency
**Location**: `/docs/zrChain/dmpc.md` lines 62-70
**Evidence**:
- Text refers to "GG21 (Gennaro & Goldfeder, 2021)"
- Paper citation says "(Gennaro, Goldfeder, 2020)"

**Impact**: Minor confusion about protocol version.

**Recommendation**: Verify correct year and use consistently.

---

### Low Severity Issues

#### 9. MsgNewSignTransactionRequest Proto Shows Deprecated Field
**Location**: Module README `x/treasury/README.md`
**Evidence**: Proto shows `uint64 key_id = 2; // Deprecated` with new `repeated uint64 key_ids = 10;`

**Impact**: Documentation shows both fields without clearly indicating the transition.

**Recommendation**: Update examples to use the non-deprecated field pattern.

---

#### 10. Incomplete CLI Documentation Descriptions
**Location**: `x/identity/README.md` lines 454, 571, 714
**Evidence**: Several CLI descriptions contain "...todo..." or ".....":
```markdown
##### keyring-by-address
The `keyring-by-address` command allows users to query ...todo...

##### remove-workspace-owner
The `remove-workspace-owner` command allows users to .....
```

**Impact**: Incomplete help text for developers.

**Recommendation**: Complete all "todo" placeholder text.

---

#### 11. Solana Network Type Missing from Documentation
**Location**: `/docs/zrChain/treasury.md`
**Evidence**: Code defines `REGNET = 4` in SolanaNetworkType enum but documentation only lists MAINNET, DEVNET, TESTNET.

**Impact**: Developers may not know about regnet option.

**Recommendation**: Document all network types.

---

### Informational Findings

#### 12. Validation Module README Lacks Oracle Details
**Location**: `x/validation/README.md`
**Evidence**: README is minimal (26 lines) compared to the comprehensive public documentation in `/docs/zrChain/validation.md`. The README references a Notion doc for architecture details.

**Impact**: Internal documentation fragmented.

**Recommendation**: Consider consolidating documentation or ensuring both are in sync.

---

#### 13. External Link to Validator Repository
**Location**: `/docs/zrChain/validation.md` line 109
**Evidence**: Links to `https://github.com/zenrocklabs/zenrock-validators`

**Impact**: External dependency - link should be periodically verified.

**Recommendation**: Add a note about the repository or consider including key validator setup instructions inline.

---

#### 14. ZenBTCMetadata Field in Treasury Proto
**Location**: `x/treasury/key.proto` lines 113-124
**Evidence**:
```protobuf
// ZenBTCMetadata is the metadata for a key on the zenBTC/DCT keyring.
// Despite the name, this is now used for both zenBTC and DCT assets (zenZEC, etc).
message ZenBTCMetadata { ... }
```

**Impact**: Field name is misleading as it's used for all DCT assets.

**Recommendation**: Consider renaming to `DCTMetadata` in future versions or document the naming clearly.

---

## Positive Observations

1. **Clear Conceptual Writing**: The dmpc.md document excellently explains complex cryptographic concepts (TSS, enclaves, GG21) in accessible language.

2. **Comprehensive Process Diagrams**: The keyRequests.md, signRequests.md, and txRequests.md pages provide excellent step-by-step flows with diagrams.

3. **Working Image References**: All referenced images exist in `/static/img/` directory.

4. **Accurate Module READMEs**: The internal module READMEs (`x/*/README.md`) contain accurate proto definitions and CLI examples that match the codebase.

5. **Good Security Documentation**: The security properties section in architecture.md covers key guarantees clearly.

6. **Dual-Policy Model Well Explained**: The workspace governance model with admin/sign policies is clearly documented.

---

## Recommendations Checklist

### Critical Priority
- [ ] Create documentation for `x/zenbtc/` module
- [ ] Create documentation for `x/dct/` module
- [ ] Create documentation for `x/hush/` module
- [ ] Create documentation for `x/zentp/` module

### High Priority
- [ ] Update architecture.md to list all modules
- [ ] Verify and correct BTL timeout value (20 blocks vs 1000 default)
- [ ] Document MsgUpdateWasmParams in policy module

### Medium Priority
- [ ] Add bitcoin secp256k1 to key types documentation
- [ ] Update IBC status from "future" to current state
- [ ] Fix GG21 citation year inconsistency
- [ ] Link simplified signing flow to detailed process pages

### Low Priority
- [ ] Complete "todo" placeholders in module READMEs
- [ ] Document REGNET Solana network type
- [ ] Update examples to use non-deprecated fields
- [ ] Add validation module inline setup guide

---

## Methodology

1. **Documentation Review**: Read all 10 documentation files in `/docs/zrChain/`
2. **Code Cross-Reference**:
   - Compared against proto definitions in `/proto/zrchain/`
   - Verified against module READMEs in `/x/*/README.md`
   - Checked module implementations in `/x/*/keeper/`
3. **Asset Verification**: Confirmed image files exist for all references
4. **Link Verification**: Checked internal documentation links

---

*Atlas signing off - the foundation has gaps that need filling.*
