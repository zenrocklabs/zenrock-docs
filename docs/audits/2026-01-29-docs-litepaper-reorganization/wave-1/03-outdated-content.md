# Outdated Content Audit Report

**Auditor**: Ember (Outdated Content Hunter)
**Date**: 2026-01-29
**Scope**: `/zenrock-docs/docs/docs/` directory
**Reference**: Litepaper v1.12.2

---

## Executive Summary

**Status: CRITICAL OUTDATED CONTENT FOUND**

This audit identified **28 instances** of outdated content across **8 files** that directly contradict the current litepaper (v1.12.2). The most critical issue is that zenBTC yield is described as coming from **Eigenlayer restaking**, when the litepaper clearly states yield comes from **protocol fees (35% of zenBTC custody fees + 5% of all zrChain fees)**.

Immediate action is required to prevent user confusion and maintain documentation accuracy.

---

## Critical Finding: Yield Source Contradiction

### Litepaper (v1.12.2) States:
> zenBTC yield comes from **protocol fees**:
> - 35% of zenBTC custody fees
> - 5% of all zrChain fees
> - The underlying BTC is **never lent out or used as risk capital**

### Current Docs State (INCORRECT):
> Yield is generated from aggregated restaking... deployed to secure other blockchains via EigenLayer in exchange for rewards.

**This is a fundamental contradiction that must be corrected.**

---

## Eigenlayer/EigenLayer References

| File | Line | Outdated Text | Why Outdated | Recommended Fix |
|------|------|---------------|--------------|-----------------|
| `zenBTC/zenbtc-introduction.md` | 25 | "Yield is generated from aggregated restaking – the safest real yield in crypto. To start, zenBTC is launching with an initial EigenLayer partnership. While users' Bitcoin remains securely locked on the Bitcoin blockchain, Zenrock mints an ERC-20 tokenized representation on the back-end, which is deployed to secure other blockchains via EigenLayer in exchange for rewards." | Litepaper states yield comes from protocol fees, not Eigenlayer | Rewrite to: "Yield is generated from protocol fees: 35% of zenBTC custody fees and 5% of all zrChain fees are distributed to zenBTC holders. The underlying BTC is never lent out or used as risk capital." |
| `zenBTC/zenbtc-introduction.md` | 27 | "Through a collaboration with THORChain, these EigenLayer rewards are converted back into sats..." | No THORChain collaboration for yield conversion in litepaper | Remove entire sentence or rewrite to explain fee-based yield mechanism |
| `zenBTC/zenbtc-technical.md` | 19 | "Maintain and report state from Zenrock's Eigenlayer operators to ensure additional economic security" | Eigenlayer operators not part of current architecture | Rewrite to: "Maintain and report state for economic security calculations" |
| `zenBTC/zenbtc-technical.md` | 36 | "Used for staking on Eigenlayer to enhance protocol security" | rockBTC/Eigenlayer staking deprecated | Remove this bullet point |
| `zenBTC/zenbtc-technical.md` | 38-41 | "Eigenlayer rockBTC Strategy Contract - Manages restaking operations for rockBTC - Provides additional economic security - Facilitates yield generation" | Entire contract is deprecated | Remove entire section (Core Contract #3) |
| `zenBTC/zenbtc-technical.md` | 50 | "The rockBTC is staked in the Eigenlayer Strategy contract" | Deprecated workflow | Remove this step from operational flow |
| `zenBTC/zenbtc-technical.md` | 109 | "yield generated from Eigenlayer rewards (converted to BTC)" | Yield is from protocol fees, not Eigenlayer | Rewrite to: "yield generated from protocol fees (converted to BTC)" |
| `introduction/introduction.md` | 26 | "zrChain is secured by the economic security of the ROCK token, but also through Bitcoin's economic security through a new Eigenlayer integration as zrChain's AVS (Actively Validated Services)." | Eigenlayer AVS integration deprecated | Rewrite to focus on ROCK economic security and dMPC security model |
| `introduction/zrchain.md` | 19-21 | "### zrChain Actively Validated Services (AVS)\n\nzrChain adds bitcoin's economic security through an Eigenlayer integration which enables supplying economic collateral to a smart contract..." | AVS/Eigenlayer deprecated | Remove entire section or rewrite to current security model |
| `zrChain/architecture.md` | 23 | "Restaking of ETH to increase economic security" | ETH restaking not part of current model | Remove this bullet point |
| `zrChain/architecture.md` | 31 | "Enabling the use of additional collateral in the form of restaked ETH with the Validation Module" | ETH restaking deprecated | Rewrite to: "Managing validator stake and voting power with the Validation Module" |
| `zrChain/architecture.md` | 49-51 | "### AVS Sidecar\n\nThe AVS Sidecar is an additional component... enables the use of additional collateral in the form of restaked ETH..." | AVS Sidecar deprecated | Remove entire section or rename to "Oracle Sidecar" and rewrite |
| `zrChain/validation.md` | 9 | "facilitates the support of vote extensions which are necessary to support additional economic security through an EigenLayer integration" | EigenLayer integration deprecated | Rewrite to focus on price oracle vote extensions only |
| `zrChain/validation.md` | 17 | "querying the latest price and restaking contract state data" | No restaking contract in current architecture | Rewrite to: "querying the latest price data" |

---

## AVS (Actively Validated Services) References

| File | Line | Outdated Text | Recommended Fix |
|------|------|---------------|-----------------|
| `introduction/introduction.md` | 26 | "zrChain's AVS (Actively Validated Services)" | Remove AVS reference entirely |
| `introduction/zrchain.md` | 19 | "### zrChain Actively Validated Services (AVS)" | Remove section heading and content |
| `zrChain/architecture.md` | 49 | "### AVS Sidecar" | Rename to "Oracle Sidecar" or remove |
| `zrChain/architecture.md` | 51 | "Our AVS contract on Ethereum" | Remove AVS contract reference |

---

## rockBTC References (Deprecated Token)

| File | Line | Outdated Text | Recommended Fix |
|------|------|---------------|-----------------|
| `zenBTC/zenbtc-technical.md` | 33-36 | "**rockBTC ERC-20 Contract** - Serves as foundational collateral - Automatically minted during BTC bridging - Used for staking on Eigenlayer" | Remove entire rockBTC section |
| `zenBTC/zenbtc-technical.md` | 38 | "**Eigenlayer rockBTC Strategy Contract**" | Remove entire section |
| `zenBTC/zenbtc-technical.md` | 49 | "The controller contract mints an equivalent amount of rockBTC" | Remove from operational flow |
| `zenBTC/zenbtc-technical.md` | 50 | "The rockBTC is staked in the Eigenlayer Strategy contract" | Remove from operational flow |

---

## Restaking References

| File | Line | Outdated Text | Recommended Fix |
|------|------|---------------|-----------------|
| `zenBTC/zenbtc-introduction.md` | 9 | "liquid restaking tokens" | Remove "restaking" framing |
| `zenBTC/zenbtc-introduction.md` | 13 | `![Wrapped BTC vs Liquid Restaking Tokens]` | Replace image or remove |
| `zenBTC/zenbtc-introduction.md` | 25 | "aggregated restaking" | Replace with "protocol fees" |
| `zenBTC/zenbtc-introduction.md` | 29 | "additional restaking partnerships with platforms like Jito" | Remove or rewrite |
| `zenBTC/zenbtc-introduction.md` | 55 | "liquid restaking capabilities enabled through partnerships with platforms like EigenLayer or Babylon" | Remove or rewrite |
| `zenBTC/zenbtc-technical.md` | 39 | "Manages restaking operations for rockBTC" | Remove |
| `zrChain/architecture.md` | 23 | "Restaking of ETH" | Remove |
| `zrChain/architecture.md` | 31 | "restaked ETH" | Remove |
| `zrChain/architecture.md` | 51 | "restaked ETH" | Remove |
| `zrChain/validation.md` | 17 | "restaking contract state data" | Remove "restaking" |
| `DCT/dct-introduction.md` | 42 | "Restaking strategies" | Remove from use cases list |

---

## THORChain Reference (Potentially Outdated)

| File | Line | Outdated Text | Status |
|------|------|---------------|--------|
| `zenBTC/zenbtc-introduction.md` | 27 | "Through a collaboration with THORChain, these EigenLayer rewards are converted back into sats" | Verify with team - likely outdated since Eigenlayer yield is deprecated |

---

## Inconsistency: Correct vs. Incorrect Content

**GOOD**: Some files already have correct information:

| File | Line | Correct Text |
|------|------|--------------|
| `introduction/introduction.md` | 40 | "yield comes from protocol fees, not risky strategies" |
| `zenZEC/zenzec-introduction.md` | 56 | "Native Yield: Yes (from protocol fees)" |

**BAD**: These contradict the correct information in the same codebase, causing confusion.

---

## Images Requiring Review

| Image | Location | Issue |
|-------|----------|-------|
| `wrapped-btc-lrt.png` | `static/img/` | Title references "Liquid Restaking Tokens" - may need replacement |

---

## Priority Fix List

### Priority 1 (Critical - Yield Source)
1. `zenBTC/zenbtc-introduction.md` - Lines 23-29: Complete rewrite of yield section
2. `zenBTC/zenbtc-technical.md` - Lines 33-54: Remove rockBTC and Eigenlayer contracts
3. `zenBTC/zenbtc-technical.md` - Line 109: Fix yield explanation

### Priority 2 (High - AVS/Security Model)
4. `introduction/introduction.md` - Line 26: Remove AVS reference
5. `introduction/zrchain.md` - Lines 19-21: Remove AVS section
6. `zrChain/architecture.md` - Lines 49-51: Remove/rewrite AVS Sidecar

### Priority 3 (Medium - Restaking References)
7. `zrChain/architecture.md` - Lines 23, 31: Remove restaking bullets
8. `zrChain/validation.md` - Lines 9, 17: Remove Eigenlayer references
9. `DCT/dct-introduction.md` - Line 42: Remove "Restaking strategies"

### Priority 4 (Low - Cleanup)
10. `zenBTC/zenbtc-introduction.md` - Line 9, 13: Update framing, consider image

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Eigenlayer/EigenLayer references | 14 |
| AVS references | 4 |
| rockBTC references | 4 |
| Restaking references | 11 |
| THORChain references | 1 |
| **Total outdated instances** | **28** |
| **Files affected** | **8** |

---

## Files Requiring Updates

1. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-introduction.md` - **CRITICAL**
2. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zenBTC/zenbtc-technical.md` - **CRITICAL**
3. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/introduction/introduction.md` - HIGH
4. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/introduction/zrchain.md` - HIGH
5. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zrChain/architecture.md` - MEDIUM
6. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/zrChain/validation.md` - MEDIUM
7. `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/DCT/dct-introduction.md` - LOW
8. `/Users/peyton/code/zenrock/zenrock-docs/docs/static/img/wrapped-btc-lrt.png` - REVIEW

---

Outdated content burned away. -- Ember
