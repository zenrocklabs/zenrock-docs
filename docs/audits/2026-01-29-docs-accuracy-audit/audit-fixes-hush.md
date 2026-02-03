# Hush Documentation Fix Plan

```yaml
---
workers_recommended: 1
total_files: 3
total_findings: 8
critical: 0, high: 3, medium: 3, low: 2
---
```

## Overview

This fix plan addresses the findings from the Hush Documentation Accuracy Audit (04-hush.md). The documentation lives in `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/Hush/` and covers the privacy protocol implemented in `/Users/peyton/code/zenrock/zenrock/zrchain/x/hush/`.

---

## Work Package 1: Security Feature Documentation

**Files**: `hush-technical.md`

**Findings**:

### M-02: Missing Chain-ID Binding Security Feature

- **ID**: M-02
- **Location**: `hush-technical.md` (entire file, missing section)
- **Current**: No documentation of chain-ID binding security mechanism
- **Fixed**: Add new section after "Nullifier System" (after line 89):

```markdown
### Chain-ID Binding (Replay Attack Prevention)

All Hush proofs are cryptographically bound to a specific chain ID, preventing replay attacks between testnet and mainnet:

- When generating a proof, the chain ID (e.g., "zenrock-testnet-1" or "zenrock-mainnet-1") is hashed using RPO with a domain separator
- This `chain_id_hash` is included in the `outputs_commitment` structure verified by the circuit
- A proof generated on testnet will fail verification on mainnet (and vice versa)

**Security Property**: Even if an attacker obtains a valid proof from one chain, they cannot replay it on another chain. The circuit enforces that the chain ID used during proof generation matches the chain where verification occurs.

**Implementation Details**:
- Domain separator: `zenrock.hush.chain_id.v1`
- Hash formula: `chain_id_hash = RPO(chain_id || CHAIN_ID_DOMAIN)`
- Verified in: `ComputeOutputsCommitmentV7()` in `merkle.go`
```

- **Verification**: Search codebase for `ChainIdDomain` constant and `ComputeChainIdHash` function to confirm implementation matches documentation.

---

### M-03: Missing Spending Binding Security Feature

- **ID**: M-03
- **Location**: `hush-technical.md` lines 37-63 (Key Hierarchy section)
- **Current**: Key hierarchy diagram is incomplete, missing `spending_binding` explanation
- **Fixed**: Replace the Key Hierarchy section (lines 37-63) with:

```markdown
### Key Hierarchy

Hush implements tiered keys for different permission levels:

```
spending_key (root secret - NEVER share)
    |
    +-- spending_pubkey -----> (used in note commitments)
    |       Formula: hmerge(spending_key, [SPENDING_PUBKEY_DOMAIN, 0, 0, 0])
    |
    +-- nullifier_key --------+
    |                         +-- full_viewing_key
    +-- incoming_vk_priv -----+
              |
              +-- incoming_vk_pub --> incoming_viewing_key
```

| Key | Spend | View Spent | Decrypt Received | Decrypt Sent |
|-----|-------|------------|------------------|--------------|
| spending_key | Yes | Yes | Yes | Yes |
| full_viewing_key | No | Yes | Yes | Yes |
| incoming_viewing_key | No | No | Yes | No |

**Key Derivations:**
- **spending_pubkey**: Derived from spending_key using a domain-separated RPO hash. This is included in ALL note commitments (shields, transfers, change notes) to bind the note to the recipient's identity.
- **nullifier_key**: Used to derive nullifiers that prove ownership without revealing the commitment.
- **incoming_vk_priv/pub**: ECDH keypair for decrypting incoming transfer amounts.

**Security Note - Spending Binding:**
The `spending_pubkey` serves as a "spending binding" that prevents a critical attack vector: if an attacker obtains only the `incoming_viewing_key`, they can see incoming amounts but CANNOT spend them because the commitment requires knowledge of the `spending_key` to derive the matching `spending_pubkey`.

**Use Cases:**
- **spending_key**: User's master key, full control
- **full_viewing_key**: Auditors, tax reporting (read-only)
- **incoming_viewing_key**: Payment processors (see deposits only)

> **Important**: Sharing a viewing key grants **permanent, irrevocable** visibility into your shielded activity. There is no cryptographic mechanism to revoke access once shared.
```

- **Verification**: Check `lib.rs` in hush-wasm for `SPENDING_PUBKEY_DOMAIN_FELT` constant and `compute_spending_pubkey` function.

---

## Work Package 2: Commitment Formula Update

**Files**: `hush-technical.md`

**Findings**:

### L-04: Commitment Formula Discrepancy

- **ID**: L-04
- **Location**: `hush-technical.md` lines 66-78
- **Current**:
```
Balance Note:
commitment = RPO(merge(note_secret, randomness), [0, 0, sequence, amount])

Incoming Note:
commitment = RPO(merge(merge(note_secret, randomness), spending_binding), [amount, 0, 0, asset])
```
- **Fixed**: Replace lines 66-78 with:

```markdown
### Commitment & Nullifier Structure

**V8 Unified Note Format (Current):**

All notes (shields, transfers, change) use the same commitment structure:

```
commitment = hmerge(hmerge(hmerge(note_secret, randomness), spending_pubkey), [amount, 0, 0, asset])
nullifier  = RPO(nullifier_key, commitment)
```

Where:
- `note_secret`: 32 bytes derived from the recipient's spending key
- `randomness`: 32 bytes of cryptographic randomness
- `spending_pubkey`: Derived from recipient's spending_key (binds note to recipient)
- `amount`: Token amount in smallest units
- `asset`: Asset type identifier (1=zenBTC, 2=jitoSOL, 3=zenZEC)

**Security Properties:**
- The `spending_pubkey` binding prevents attacks where someone with only the `incoming_viewing_key` could spend funds
- The unified format means shields, transfers, and change notes are indistinguishable in the Merkle tree
- Asset binding in the commitment prevents cross-asset confusion attacks
```

- **Verification**: Check `CLAUDE.md` in hush-wasm for "V17 update" and "V8 unified note format" references.

---

## Work Package 3: Fee Model and Protocol Fee Pool

**Files**: `hush-introduction.md`, `hush-technical.md`

**Findings**:

### L-02: Incomplete Fee Documentation

- **ID**: L-02
- **Location**: `hush-introduction.md` lines 25-29, `hush-technical.md` lines 140-149
- **Current**: Fee table is simplified and missing Protocol Fee Pool mechanism
- **Fixed**:

**In `hush-introduction.md`, replace lines 25-29 with:**

```markdown
### Core Operations

| Operation | Description | Fee |
|-----------|-------------|-----|
| **Shield** | Deposit tokens into the privacy pool | Configurable (currently 0%) |
| **Shielded Transfer** | Send privately within the pool | Flat fee per asset (configurable) |
| **Unshield** | Withdraw to any Solana address | Percentage fee (configurable) |

> **Note**: All fees are governance-configurable parameters. Current defaults are subject to change. Fees accumulate in the Protocol Fee Pool and can be claimed by governance.
```

**In `hush-technical.md`, add new section after SOL Funding (after line 150):**

```markdown
### Protocol Fee Pool

Fees collected from shielded operations accumulate in a per-asset Protocol Fee Pool rather than being burned:

| Fee Type | Flow |
|----------|------|
| Shield Fee | Deducted at shield time, added to fee pool |
| Transfer Fee | Deducted from shielded supply, added to fee pool |
| Unshield Fee | Deducted before Solana transfer, added to fee pool |

**Fee Pool Operations:**
- Fees are tracked per-asset in `ProtocolFeePool map[asset]amount`
- Governance can claim accumulated fees via `MsgClaimProtocolFees`
- Claims create an unshield request to transfer tokens from the vault

**Supply Invariant:**
```
TotalShielded + PendingUnshields + TotalUnshielded + ProtocolFeePool = TotalEverShielded
```

**Governance Parameters:**
- `shield_fee`: Percentage fee on shields (currently 0)
- `shielded_transfer_fee`: Flat fee per transfer (per-asset configured)
- `unshield_fee_bps`: Basis points fee on unshields
- `sol_fund_amount`: SOL amount for funded unshields
- `sol_fund_fee_bps`: Additional fee for SOL funding
```

- **Verification**: Check `supply.go` for `ProtocolFeePool` map and `msg_server.go` for `ClaimProtocolFees` handler.

---

## Work Package 4: Merkle Tree and Max Claims Clarification

**Files**: `hush-technical.md`

**Findings**:

### M-01: Merkle Tree Depth Inconsistency

- **ID**: M-01
- **Location**: `hush-technical.md` line 16
- **Current**: Table shows "Sparse binary, depth 24" with "~16.7M commitment capacity"
- **Fixed**: This is actually CORRECT in the documentation. The inconsistency is in the monorepo CLAUDE.md which says "depth 20 (~1M capacity)". The deployment configuration (`hush-params-devnet.json`) confirms depth 24 is correct.

**Action**: No change needed to documentation. Instead, flag for codebase CLAUDE.md update (separate task).

- **Verification**: Confirmed by reading `merkle.go:GetTreeStateResponse` which returns `Depth uint32` from the contract, and deployment scripts use `{"tree_depth":24}`.

---

### L-01: Max Incoming Claims Inconsistency

- **ID**: L-01
- **Location**: `hush-technical.md` line 35
- **Current**: "Max incoming claims | 24 per transaction"
- **Fixed**: The documentation is correct for V8 circuit. The legacy code path referencing 10 is in `buildTransferPublicInputs` (line 779-785) which is deprecated. The actual V8 circuit supports 24.

**Clarification text to add after line 35:**

```markdown
> **Note**: The V8 circuit supports up to 24 total input notes (balance note + incoming notes combined). If a balance note is present, up to 23 incoming notes can be claimed. If no balance note exists, all 24 slots can be used for incoming notes.
```

- **Verification**: Check `ComputeOutputsCommitmentV7` in `merkle.go` which pads to 24 input nullifiers.

---

## Work Package 5: Asset Support and Performance Documentation

**Files**: `hush-introduction.md`, `hush-guide.md`

**Findings**:

### I-04: Missing zenZEC Support Documentation

- **ID**: I-04
- **Location**: `hush-introduction.md` lines 19-21
- **Current**: Only lists zenBTC and jitoSOL as supported assets
- **Fixed**: Replace lines 19-21 with:

```markdown
### Supported Assets

- **zenBTC** - Zenrock's decentralized wrapped Bitcoin
- **jitoSOL** - Jito's liquid staking token
- **zenZEC** - Zenrock's wrapped Zcash (coming soon)

> **Note**: zenZEC support is implemented in the protocol (`SHIELD_ASSET_ZENZEC = 3`) but may not be enabled on all networks. Check network parameters for current availability.
```

- **Verification**: Check `types.pb.go` for `ShieldAsset_SHIELD_ASSET_ZENZEC` enum value.

---

### I-03: WASM Proof Generation Times

- **ID**: I-03
- **Location**: `hush-guide.md` lines 170-175
- **Current**: "First proof may take 10-30 seconds" and "~5-10 seconds" for subsequent
- **Fixed**: Replace lines 170-175 with:

```markdown
### Proof generation is slow

- STARK proof generation happens locally in your browser
- First proof may take 10-30 seconds as WASM loads and initializes
- Subsequent proofs are faster (~5-10 seconds in browser, ~1 second native)
- Use a modern browser with good WebAssembly support (Chrome/Firefox recommended)
- Performance varies by device - desktop is significantly faster than mobile

> **Performance Note**: Native release builds achieve ~1 second proof generation. Browser WASM performance depends on JIT compilation and memory availability.
```

- **Verification**: Check hush-wasm benchmarks or CLAUDE.md for performance metrics.

---

## Summary of Changes

| File | Section | Change Type |
|------|---------|-------------|
| `hush-technical.md` | After line 89 | ADD: Chain-ID Binding section |
| `hush-technical.md` | Lines 37-63 | REPLACE: Key Hierarchy section with spending_pubkey |
| `hush-technical.md` | Lines 66-78 | REPLACE: Commitment formulas with V8 unified format |
| `hush-technical.md` | After line 35 | ADD: V8 input notes clarification |
| `hush-technical.md` | After line 150 | ADD: Protocol Fee Pool section |
| `hush-introduction.md` | Lines 25-29 | REPLACE: Fee table with governance note |
| `hush-introduction.md` | Lines 19-21 | REPLACE: Add zenZEC to supported assets |
| `hush-guide.md` | Lines 170-175 | REPLACE: Updated proof generation times |

---

## Verification Checklist

After applying fixes, verify:

- [ ] Chain-ID binding section references correct domain separator (`zenrock.hush.chain_id.v1`)
- [ ] Spending_pubkey derivation formula matches `lib.rs:compute_spending_pubkey`
- [ ] V8 unified commitment formula matches `CLAUDE.md` in hush-wasm
- [ ] Protocol Fee Pool description matches `supply.go` implementation
- [ ] ClaimProtocolFees operation matches `msg_server.go:ClaimProtocolFees`
- [ ] zenZEC enum value matches `types.pb.go` (SHIELD_ASSET_ZENZEC = 3)
- [ ] Max input notes (24) matches `ComputeOutputsCommitmentV7` padding

---

## References

- Audit Report: `/Users/peyton/code/zenrock/zenrock-docs/docs/audits/2026-01-29-docs-accuracy-audit/wave-1/04-hush.md`
- Security Context: `/Users/peyton/code/zenrock/zenrock/AUDIT_FINDINGS_HUSH.md`
- Implementation Files:
  - `/Users/peyton/code/zenrock/zenrock/zrchain/x/hush/keeper/merkle.go` (chain-ID hash, outputs commitment)
  - `/Users/peyton/code/zenrock/zenrock/zrchain/x/hush/keeper/supply.go` (Protocol Fee Pool)
  - `/Users/peyton/code/zenrock/zenrock/zrchain/x/hush/keeper/msg_server.go` (ClaimProtocolFees)
  - `/Users/peyton/code/zenrock/zenrock/zrchain/clients/hush-wasm/src/lib.rs` (spending_pubkey, commitment formulas)
