# zrChain Core Documentation Fix Plan

**Source Audit**: `/docs/audits/2026-01-29-docs-accuracy-audit/wave-1/01-zrchain-core.md`
**Target Documentation**: `/docs/docs/zrChain/`
**Source Codebase**: `/zenrock/zrchain/`
**Generated**: 2026-01-29

---

```yaml
---
workers_recommended: 2
total_files: 8
total_findings: 14
critical: 1, high: 3, medium: 4, low: 4
---
```

---

## Work Package 1: Architecture and Module Coverage

**Files**:
- `/docs/docs/zrChain/architecture.md`
- `/docs/docs/zrChain/zenbtc.md` (NEW)
- `/docs/docs/zrChain/dct.md` (NEW)
- `/docs/docs/zrChain/hush.md` (NEW)
- `/docs/docs/zrChain/zentp.md` (NEW)

**Estimated Effort**: 3-4 hours
**Dependencies**: None

### Finding 1: Missing Module Documentation (CRITICAL)

**ID**: ZRC-001
**Severity**: Critical
**Location**: `/docs/docs/zrChain/` (entire directory)

**Current**: Only 4 modules documented (identity, treasury, policy, validation)

**Fixed**: Create stub documentation for the 4 critical undocumented modules. Each new file should follow this template structure:

#### New File: `/docs/docs/zrChain/zenbtc.md`

```markdown
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

*For detailed API documentation, see the [zenBTC API Reference](/api/zenbtc).*
```

#### New File: `/docs/docs/zrChain/dct.md`

```markdown
---
title: DCT Module
sidebar_label: DCT Module
sidebar_position: 9
---

## Overview

The **DCT Module** (`x/dct/`) provides the generalized framework for Decentralized Custody Tokens - wrapped assets with institutional-grade security. While zenBTC was the first implementation, DCT enables wrapping any supported asset.

### Supported Assets

- **zenZEC**: Wrapped Zcash on Solana
- **Future Assets**: The DCT framework supports adding new wrapped assets

### Key Capabilities

- **Multi-Asset Support**: Generic framework for different source chains
- **Deposit Verification**: Chain-specific SPV verification (Zcash headers stored separately from BTC)
- **Unified Minting**: Consistent mint/burn flow across all DCT assets

### Module Separation

DCT is intentionally separate from zenBTC to ensure production stability:

- **zenBTC endpoint**: `zrchain.zenbtc.Msg/VerifyDepositBlockInclusion`
- **DCT endpoint**: `zrchain.dct.Msg/VerifyDepositBlockInclusion` (rejects ASSET_ZENBTC)
- **Header storage**: BTC headers in `BtcBlockHeaders`, ZCash headers in `ZcashBlockHeaders`

### Related Documentation

- [zenBTC Module](./zenbtc.md) - Bitcoin-specific implementation
- [Validation Module](./validation.md) - Block header consensus

*For detailed API documentation, see the [DCT API Reference](/api/dct).*
```

#### New File: `/docs/docs/zrChain/hush.md`

```markdown
---
title: Hush Module
sidebar_label: Hush Module
sidebar_position: 10
---

## Overview

The **Hush Module** (`x/hush/`) provides gold-standard privacy for zenBTC and jitoSOL using Miden STARKs. Users can shield tokens on Solana and later unshield to a completely unlinked address.

### Privacy Guarantees

- **Unlinkability**: The nullifier (revealed at unshield) cannot be linked to the commitment (created at shield) without knowing the `spending_key`
- **Amount Privacy**: Shielded transfer amounts are fully encrypted (ChaCha20-Poly1305)
- **Zero-Knowledge**: Miden STARK proofs verify correctness without revealing transaction details

### Key Operations

| Operation | Description |
|-----------|-------------|
| **Shield** | Transfer tokens to vault with cryptographic commitment |
| **Shielded Transfer** | Move value between shielded addresses |
| **Unshield** | Withdraw to any address with zero on-chain link to original |

### Cryptographic Primitives

- **Hash**: RPO (Rescue Prime Optimized) - Miden's ZK-friendly hash
- **Merkle Tree**: Sparse Merkle Tree, depth 20 (~1M capacity)
- **Proof System**: Miden STARKs (no trusted setup, quantum-resistant)

### Tiered Viewing Keys

| Key Type | Capabilities |
|----------|-------------|
| `spending_key` | Full control (spend, view all) |
| `full_viewing_key` | See all amounts + spent status (for auditors) |
| `incoming_viewing_key` | Decrypt received amounts only |

### Fee Model

- **Shield**: Optional % fee (currently zero to encourage pool growth)
- **Shielded Transfers**: Flat fee per transfer (burned from shielded supply)
- **Unshield**: Percentage fee on amount (deducted before Solana transfer)

### Related Documentation

- [Treasury Module](./treasury.md) - Key management for signing
- [dMPC](./dmpc.md) - How unshield transactions are signed

*For detailed API documentation, see the [Hush API Reference](/api/hush).*
```

#### New File: `/docs/docs/zrChain/zentp.md`

```markdown
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

*For detailed API documentation, see the [zenTP API Reference](/api/zentp).*
```

**Verification**:
1. Check files exist: `ls /docs/docs/zrChain/*.md`
2. Verify sidebar renders correctly in Docusaurus
3. Check internal links resolve

---

### Finding 2: Architecture Document Lists Only 4 Modules (HIGH)

**ID**: ZRC-002
**Severity**: High
**Location**: `/docs/docs/zrChain/architecture.md` lines 25-31

**Current**:
```markdown
Besides the standard Cosmos modules, the Zenrock blockchain incorporates four additional modules that:

- Create and manage workspaces and keyrings in the [**_Identity Module_**](identity.md)
- Request and manage keys as well as request signatures in the [**_Treasury Module_**](treasury.md)
- Create and define policies in the [**_Policy Module_**](policy.md)
- Managing validator stake and voting power with the [**_Validation Module_**](validation.md)
```

**Fixed**:
```markdown
Besides the standard Cosmos modules, the Zenrock blockchain incorporates several custom modules:

**Core Infrastructure Modules**:
- Create and manage workspaces and keyrings in the [**_Identity Module_**](identity.md)
- Request and manage keys as well as request signatures in the [**_Treasury Module_**](treasury.md)
- Create and define policies in the [**_Policy Module_**](policy.md)
- Managing validator stake and voting power with the [**_Validation Module_**](validation.md)

**Wrapped Asset Modules**:
- Manage Bitcoin wrapped assets in the [**_zenBTC Module_**](zenbtc.md)
- Generalized wrapped asset framework in the [**_DCT Module_**](dct.md)

**Cross-Chain & Privacy Modules**:
- Privacy-preserving shielded transactions in the [**_Hush Module_**](hush.md)
- Cross-chain token bridging in the [**_zenTP Module_**](zentp.md)

Additional modules include `x/zenex/` (exchange functionality), `x/nrp/` (network resource provisioning), and `x/mint/` (token minting).
```

**Verification**:
1. Read the updated file and verify all module links work
2. Check that the text accurately reflects the module count

---

## Work Package 2: Treasury Module Corrections

**Files**:
- `/docs/docs/zrChain/treasury.md`

**Estimated Effort**: 1 hour
**Dependencies**: None

### Finding 3: BTL Timeout Value Incorrect (HIGH)

**ID**: ZRC-003
**Severity**: High
**Location**: `/docs/docs/zrChain/treasury.md` lines 44-53

**Current**:
```markdown
- **Timeout**: If a request is not fulfilled within approximately **20 blocks**, it times out automatically

...

**Example Timeline** (assuming ~6 second blocks):
- Block N: Request submitted, fees escrowed
- Block N+20 (~2 minutes): If unfulfilled, request times out
- Block N+21: Escrowed fees returned to requester
```

**Fixed**:
```markdown
- **Timeout**: If a request is not fulfilled within the configured **Block-Time-Lock (BTL)** period, it times out automatically. The default BTL is **20 blocks** (hardcoded fallback), but production deployments typically configure this via the `default_btl` parameter (commonly set to **1000 blocks** for mainnet).

...

**Example Timeline** (assuming ~6 second blocks and default 20 block BTL):
- Block N: Request submitted, fees escrowed
- Block N+BTL: If unfulfilled, request times out
- Block N+BTL+1: Escrowed fees returned to requester

> **Note**: The actual BTL value is configurable per deployment. Check the current network parameters with `zenrockd query treasury params` to see the active `default_btl` value.
```

**Verification**:
1. Cross-reference with `/zenrock/zrchain/x/treasury/keeper/params.go` line 5: `const defaultBTL = 20`
2. Cross-reference with `/zenrock/zrchain/scripts/bootstrap/main.sh` line 203: `"default_btl": "1000"`
3. Confirm the documentation now accurately describes the configurable nature

---

### Finding 5: Key Type Documentation Incomplete (MEDIUM)

**ID**: ZRC-005
**Severity**: Medium
**Location**: `/docs/docs/zrChain/treasury.md` line 13

**Current**:
```markdown
Zenrock has the capacity to generate **_ecdsa secp256k1_** and **_eddsa ed25519_** keys.
```

**Fixed**:
```markdown
Zenrock has the capacity to generate **_ecdsa secp256k1_**, **_eddsa ed25519_**, and **_bitcoin secp256k1_** keys. The bitcoin key type uses the same curve as ecdsa secp256k1 but with Bitcoin-specific derivation paths and address formats.
```

**Verification**:
1. Cross-reference with `/zenrock/zrchain/proto/zrchain/treasury/key.proto` lines 75-87
2. Verify all three key types are documented

---

### Finding 6: Signing Request Flow Oversimplified (MEDIUM)

**ID**: ZRC-006
**Severity**: Medium
**Location**: `/docs/docs/zrChain/treasury.md` lines 28-37

**Current**:
```markdown
The treasury module manages all interactions with the dMPC infrastructure. When a signing request is submitted, it follows this 6-step flow:
```

**Fixed**:
```markdown
The treasury module manages all interactions with the dMPC infrastructure. When a signing request is submitted, it follows this simplified 6-step flow:

> **Note**: This is a high-level overview. For detailed step-by-step flows including all intermediate states, see the [Signing Request Process](./processes/signRequests.md) documentation.
```

**Verification**:
1. Verify the link to signRequests.md exists and works
2. Confirm the note clearly indicates this is a simplified view

---

### Finding 11: Solana Network Type Missing REGNET (LOW)

**ID**: ZRC-011
**Severity**: Low
**Location**: `/docs/docs/zrChain/treasury.md` (implicit - not currently documented)

**Current**: Documentation does not list Solana network types comprehensively.

**Fixed**: Add a subsection or note in the Treasury documentation:

After the "Signatures" section (around line 26), add:

```markdown
### Supported Networks

When submitting transaction signing requests, the following Solana network types are supported:

| Network Type | Value | Description |
|--------------|-------|-------------|
| `UNDEFINED` | 0 | Not specified |
| `MAINNET` | 1 | Solana mainnet |
| `DEVNET` | 2 | Solana devnet |
| `TESTNET` | 3 | Solana testnet |
| `REGNET` | 4 | Local regression testing network |
```

**Verification**:
1. Cross-reference with `/zenrock/zrchain/proto/zrchain/treasury/tx.proto` lines 181-186

---

## Work Package 3: Policy Module Updates

**Files**:
- `/docs/docs/zrChain/policy.md`

**Estimated Effort**: 30 minutes
**Dependencies**: None

### Finding 4: MsgUpdateWasmParams Not Documented (HIGH)

**ID**: ZRC-004
**Severity**: High
**Location**: `/docs/docs/zrChain/policy.md`

**Current**: No documentation for `MsgUpdateWasmParams`

**Fixed**: Add the following section after the "Passkeys" section (after line 43):

```markdown
### CosmWasm Integration

The policy module includes `MsgUpdateWasmParams` for managing CosmWasm module parameters. This allows the admin authority to update wasm params without requiring a full governance proposal.

#### MsgUpdateWasmParams

Updates CosmWasm module parameters including code upload permissions and instantiation defaults.

```protobuf
message MsgUpdateWasmParams {
  string authority = 1;  // Admin or governance address
  WasmParams params = 2;
}

message WasmParams {
  WasmAccessConfig code_upload_access = 1;
  WasmAccessType instantiate_default_permission = 2;
}
```

**Access Types**:
| Type | Description |
|------|-------------|
| `WASM_ACCESS_TYPE_NOBODY` | No one can perform the action |
| `WASM_ACCESS_TYPE_EVERYBODY` | Anyone can perform the action |
| `WASM_ACCESS_TYPE_ANY_OF_ADDRESSES` | Only specified addresses can perform the action |

This message is restricted to the admin authority address configured in module params.
```

**Verification**:
1. Cross-reference with `/zenrock/zrchain/proto/zrchain/policy/tx.proto` lines 45-48, 153-193
2. Verify the documented types match the proto definitions

---

## Work Package 4: Cross-Chain and dMPC Documentation

**Files**:
- `/docs/docs/zrChain/cross-chain.md`
- `/docs/docs/zrChain/dmpc.md`

**Estimated Effort**: 30 minutes
**Dependencies**: None

### Finding 7: IBC Status Incorrect (MEDIUM)

**ID**: ZRC-007
**Severity**: Medium
**Location**: `/docs/docs/zrChain/cross-chain.md` line 21

**Current**:
```markdown
zrChain will also support IBC in the future to connect with other Cosmos-based blockchains and beyond.
```

**Fixed**:
```markdown
zrChain supports IBC (Inter-Blockchain Communication Protocol) to connect with other Cosmos-based blockchains. As a Cosmos SDK chain, zrChain has native IBC capabilities for cross-chain token transfers and interchain accounts.
```

**Verification**:
1. Confirm zrChain is a Cosmos SDK chain with IBC enabled
2. Check for IBC-related modules in the codebase

---

### Finding 8: GG21 Protocol Citation Year Inconsistency (MEDIUM)

**ID**: ZRC-008
**Severity**: Medium
**Location**: `/docs/docs/zrChain/dmpc.md` lines 62-70

**Current**:
```markdown
Zenrock's dMPC uses the **GG21 threshold signature protocol** for distributed signing. GG21 (Gennaro & Goldfeder, 2021) is a state-of-the-art...

...

For technical details on the GG21 protocol, see the original paper: *"Fast Multiparty Threshold ECDSA with Fast Trustless Setup"* (Gennaro, Goldfeder, 2020).
```

**Fixed**: Use consistent year (2020 is the correct publication year):
```markdown
Zenrock's dMPC uses the **GG21 threshold signature protocol** for distributed signing. GG21 (Gennaro & Goldfeder, 2020) is a state-of-the-art...

...

For technical details on the GG21 protocol, see the original paper: *"Fast Multiparty Threshold ECDSA with Fast Trustless Setup"* (Gennaro, Goldfeder, 2020).
```

**Verification**:
1. Search for "GG21" or "Gennaro Goldfeder" to verify publication year
2. Ensure both references use the same year

---

## Work Package 5: Low Priority Fixes (Optional)

**Files**:
- Various module READMEs in `/zenrock/zrchain/x/*/README.md`

**Estimated Effort**: 1 hour
**Dependencies**: None
**Note**: These are internal README fixes, not public documentation

### Finding 9: Deprecated Field in Examples (LOW)

**ID**: ZRC-009
**Severity**: Low
**Location**: `/zenrock/zrchain/x/treasury/README.md` (internal)

**Current**: Proto examples show deprecated `key_id` field alongside new `key_ids` field

**Fixed**: Update examples to use the non-deprecated field patterns. This affects internal documentation only.

**Verification**: Review proto definitions and update examples to match current best practices.

---

### Finding 10: Incomplete CLI Descriptions (LOW)

**ID**: ZRC-010
**Severity**: Low
**Location**: `/zenrock/zrchain/x/identity/README.md` lines 454, 571, 714 (internal)

**Current**:
```markdown
##### keyring-by-address
The `keyring-by-address` command allows users to query ...todo...

##### remove-workspace-owner
The `remove-workspace-owner` command allows users to .....
```

**Fixed**: Complete placeholder text with actual descriptions:
```markdown
##### keyring-by-address
The `keyring-by-address` command allows users to query a keyring by its bech32 address.

##### remove-workspace-owner
The `remove-workspace-owner` command allows users to remove an owner from a workspace, subject to admin policy approval.
```

**Verification**: Review all "todo" and "...." placeholders in module READMEs.

---

### Finding 12: Validation Module README Minimal (INFORMATIONAL)

**ID**: ZRC-012
**Severity**: Informational
**Location**: `/zenrock/zrchain/x/validation/README.md` (internal)

**Recommendation**: The public documentation at `/docs/docs/zrChain/validation.md` is comprehensive. Consider either:
1. Expanding the module README to match
2. Adding a link from README to the public docs

No immediate action required.

---

### Finding 13: External Validator Repository Link (INFORMATIONAL)

**ID**: ZRC-013
**Severity**: Informational
**Location**: `/docs/docs/zrChain/validation.md` line 109

**Current**:
```markdown
please refer to the [Zenrock Validator Repository](https://github.com/zenrocklabs/zenrock-validators)
```

**Recommendation**: Periodically verify this link remains valid. Consider adding inline setup instructions for common operations.

No immediate action required.

---

### Finding 14: ZenBTCMetadata Naming (INFORMATIONAL)

**ID**: ZRC-014
**Severity**: Informational
**Location**: `/zenrock/zrchain/proto/zrchain/treasury/key.proto` lines 113-124

The field `ZenBTCMetadata` is used for all DCT assets despite its name. The proto comment already documents this:
```protobuf
// ZenBTCMetadata is the metadata for a key on the zenBTC/DCT keyring.
// Despite the name, this is now used for both zenBTC and DCT assets (zenZEC, etc).
```

No documentation change needed - the comment is accurate.

---

## Summary of Changes

| File | Action | Findings Addressed |
|------|--------|-------------------|
| `/docs/docs/zrChain/architecture.md` | Edit | ZRC-002 |
| `/docs/docs/zrChain/treasury.md` | Edit | ZRC-003, ZRC-005, ZRC-006, ZRC-011 |
| `/docs/docs/zrChain/policy.md` | Edit | ZRC-004 |
| `/docs/docs/zrChain/cross-chain.md` | Edit | ZRC-007 |
| `/docs/docs/zrChain/dmpc.md` | Edit | ZRC-008 |
| `/docs/docs/zrChain/zenbtc.md` | Create | ZRC-001 |
| `/docs/docs/zrChain/dct.md` | Create | ZRC-001 |
| `/docs/docs/zrChain/hush.md` | Create | ZRC-001 |
| `/docs/docs/zrChain/zentp.md` | Create | ZRC-001 |

---

## Worker Assignment Recommendation

**Worker 1**: Work Packages 1 + 3 (Architecture, new module docs, policy)
- Higher complexity due to new file creation
- ~4 hours estimated

**Worker 2**: Work Packages 2 + 4 + 5 (Treasury, cross-chain, dmpc, low priority)
- Mostly edits to existing files
- ~2.5 hours estimated

---

## Verification Checklist

After all fixes are applied:

- [ ] Run `bun run build` to verify Docusaurus builds without errors
- [ ] Check all internal links resolve (no 404s)
- [ ] Verify sidebar navigation includes new module pages
- [ ] Cross-reference key values (BTL, key types, network types) against codebase
- [ ] Review rendered output for formatting issues

---

## Review Results

**Reviewer**: Reviewer-zrChain
**Review Date**: 2026-01-29
**Status**: All fixes verified

### Finding-by-Finding Verification

| ID | Severity | Grade | Verification Notes |
|----|----------|-------|-------------------|
| ZRC-001 | Critical | ✅ Fixed | All 4 new module files created: `zenbtc.md`, `dct.md`, `hush.md`, `zentp.md`. Each file matches the template structure exactly with correct frontmatter, sidebar positions, and content. |
| ZRC-002 | High | ✅ Fixed | `architecture.md` now lists 11+ modules organized into 3 categories (Core Infrastructure, Wrapped Asset, Cross-Chain & Privacy) plus additional modules (zenex, nrp, mint). Lines 25-41 match the fix plan. |
| ZRC-003 | High | ✅ Fixed | `treasury.md` lines 54-69 now document BTL correctly: explains configurable nature, mentions 20 block default, 1000 block mainnet config, includes CLI query command. |
| ZRC-004 | High | ✅ Fixed | `policy.md` lines 45-72 now include "CosmWasm Integration" section with `MsgUpdateWasmParams` documentation, proto definitions, and access type table. |
| ZRC-005 | Medium | ✅ Fixed | `treasury.md` line 13 now lists all three key types: ecdsa secp256k1, eddsa ed25519, and bitcoin secp256k1 with explanation of Bitcoin-specific derivation. |
| ZRC-006 | Medium | ✅ Fixed | `treasury.md` lines 41-43 now include "simplified" qualifier and note linking to detailed signRequests.md documentation. |
| ZRC-007 | Medium | ✅ Fixed | `cross-chain.md` line 21 now states IBC is supported (present tense), not future: "zrChain supports IBC (Inter-Blockchain Communication Protocol) to connect with other Cosmos-based blockchains." |
| ZRC-008 | Medium | ✅ Fixed | `dmpc.md` lines 62 and 70 now consistently cite "Gennaro & Goldfeder, 2020" in both locations. No year inconsistency. |
| ZRC-011 | Low | ✅ Fixed | `treasury.md` lines 27-37 now include "Supported Networks" section with full table of Solana network types including REGNET (value 4). |

### New File Verification

| File | Exists | Sidebar Position | Content Match |
|------|--------|-----------------|---------------|
| `/docs/docs/zrChain/zenbtc.md` | Yes | 8 | Exact match to template |
| `/docs/docs/zrChain/dct.md` | Yes | 9 | Exact match to template |
| `/docs/docs/zrChain/hush.md` | Yes | 10 | Exact match to template |
| `/docs/docs/zrChain/zentp.md` | Yes | 11 | Exact match to template |

### Informational Findings (No Action Required)

| ID | Status | Notes |
|----|--------|-------|
| ZRC-009 | Deferred | Internal README fix, not public docs |
| ZRC-010 | Deferred | Internal README fix, not public docs |
| ZRC-012 | Deferred | Informational only |
| ZRC-013 | Deferred | Informational only |
| ZRC-014 | N/A | No change needed - proto comment accurate |

### Summary

**Total Findings**: 14
**Fixed**: 9 (all Critical, High, Medium, and applicable Low findings)
**Deferred**: 4 (internal README issues, informational)
**N/A**: 1 (no change needed)

All public documentation fixes have been implemented correctly. The zrChain documentation now:
1. Documents all 11+ chain modules (was 4)
2. Has accurate BTL timeout information
3. Lists all three supported key types
4. Documents MsgUpdateWasmParams
5. Correctly states IBC support status
6. Has consistent GG21 citation years
7. Includes Solana REGNET network type
