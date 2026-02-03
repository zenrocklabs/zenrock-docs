# Documentation Gap Analysis: Current Docs vs Litepaper

**Analyst**: Reed (Documentation Gap Analyst)
**Date**: 2026-01-29
**Litepaper Version**: v1.12.2
**Status**: Complete

---

## Executive Summary

| Category | Status | Count |
|----------|--------|-------|
| Total Current Doc Files | - | 38 |
| Well-Aligned with Litepaper | OK | 18 |
| Needs Major Rewrite | WARN | 8 |
| Missing from Docs (GAPS) | CRITICAL | 12 topics |
| Orphaned Content (not in litepaper) | INFO | 6 files |

**Overall Assessment**: The current documentation covers the core products (zenBTC, zenZEC, Hush, zenTP, zrChain) but **significantly lacks tokenomics, $ROCK economics, and business model documentation**. The litepaper contains substantial content on protocol revenue, staking mechanics, token allocation, and Zenrock Labs' role that is entirely absent from the docs.

---

## Current Documentation Inventory

### Introduction Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/introduction/introduction.md` | Project overview, remote control assets, zenBTC/zenZEC/Hush intro, omnichain vision | ~650 | Current | Partial - missing tokenomics messaging |
| `/docs/introduction/zrchain.md` | zrChain overview, policies, AVS, CosmWasm, Cosmos SDK | ~350 | Current | Partial - missing dMPC details |

### zrChain Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/zrChain/architecture.md` | System architecture, keyrings, relayers, AVS sidecar, BTC proxy | ~400 | Current | Partial - missing vote extensions detail |
| `/docs/zrChain/identity.md` | Keyrings, workspaces | ~200 | Current | Partial - missing workspace governance details |
| `/docs/zrChain/policy.md` | Policies, admin/sign policies, passkeys | ~350 | Current | Good match |
| `/docs/zrChain/treasury.md` | Key types, signatures | ~200 | Current | Good match |
| `/docs/zrChain/validation.md` | Vote extensions, sidecar oracle | ~250 | Current | Partial - less detailed than litepaper |
| `/docs/zrChain/processes/keyRequests.md` | Key request flow diagram | ~350 | Current | Good match |
| `/docs/zrChain/processes/signRequests.md` | Signature request flow | ~400 | Current | Good match |
| `/docs/zrChain/processes/txRequests.md` | Transaction request flow | ~450 | Current | Good match |

### DCT Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/DCT/dct-introduction.md` | DCT concept, benefits, fee structure, supply invariants | ~500 | Current | Good match |
| `/docs/DCT/dct-technical.md` | Architecture, deposit/verification/minting/redemption flows | ~900 | Current | Excellent match |

### zenBTC Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/zenBTC/zenbtc-introduction.md` | zenBTC overview, dMPC, native yield, Solana focus, competition | ~1100 | OUTDATED | NEEDS REWRITE - emphasizes old yield narrative |
| `/docs/zenBTC/zenbtc-technical.md` | System architecture, smart contracts, sidecars, bitcoin proxy, exchange rate | ~700 | Partially outdated | NEEDS UPDATE - references ERC-20/Ethereum |

### zenZEC Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/zenZEC/zenzec-introduction.md` | zenZEC overview, privacy heritage, how it works | ~500 | Current | Good match |
| `/docs/zenZEC/zenzec-technical.md` | Zcash proxy, deposit/redemption flows, shielded tx support | ~600 | Current | Good match |

### Hush Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/Hush/hush-introduction.md` | Hush overview, supported assets, operations, privacy guarantees, Miden STARKs | ~550 | Current | Good match |
| `/docs/Hush/hush-technical.md` | Full technical: crypto primitives, account model, key hierarchy, flows | ~1200 | Current | Excellent match |
| `/docs/Hush/hush-guide.md` | User guide: shield, transfer, unshield, wallet recovery | ~1000 | Current | Good (user-focused) |

### zenTP Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/zenTP/zentp-introduction.md` | zenTP overview, ROCK transfers, sidecars, MPC, scalable design | ~350 | Current | Good match |
| `/docs/zenTP/zentp-technical.md` | Operational flows, zrChain, sidecars, MPC infrastructure | ~450 | Current | Good match |

### Bridging ROCK Section

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/bridging-rock/Solana/setup.md` | zenTP setup, prerequisites, wallet setup, token info | ~550 | Current | Operational guide (supplemental) |
| `/docs/bridging-rock/Solana/solana-zenrock.md` | Solana to Zenrock transfer guide | ~500 | Current | Operational guide (supplemental) |
| `/docs/bridging-rock/Solana/zenrock-solana.md` | Zenrock to Solana transfer guide | ~500 | Current | Operational guide (supplemental) |
| `/docs/bridging-rock/Solana/troubleshooting.md` | Troubleshooting zenTP issues | ~700 | Current | Operational guide (supplemental) |
| `/docs/bridging-rock/Sei/setup.md` | Sei bridge setup, MetaMask/Keplr | ~500 | Current | NOT IN LITEPAPER |
| `/docs/bridging-rock/Sei/sei-evm-zenrock.md` | Sei EVM to Zenrock transfer | ~200 | Current | NOT IN LITEPAPER |
| `/docs/bridging-rock/Sei/zenrock-sei-evm.md` | Zenrock to Sei EVM transfer | ~250 | Current | NOT IN LITEPAPER |
| `/docs/bridging-rock/Sei/troubleshooting.md` | Sei bridging troubleshooting | ~300 | Current | NOT IN LITEPAPER |

### Core Concepts

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/mpc.md` | MPC benefits, institutional security, comparison to multisig/SSSS | ~700 | Partially outdated | NEEDS REWRITE - missing secure enclaves |
| `/docs/cross-chain.md` | Cross-chain strategy, MPC advantages over bridges | ~500 | Current | Partial match |
| `/docs/faq.md` | Contact, links, CosmWasm support | ~150 | OUTDATED | NEEDS UPDATE - missing many FAQs |

### Testnet Guides

| File | Topics Covered | Word Count | Quality | Litepaper Match |
|------|----------------|------------|---------|-----------------|
| `/docs/testnet-guides/.../welcome.md` | Testnet intro, features overview | ~500 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../setup.md` | Wallet setup, faucet, explorer | ~350 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../zenrock-guide.md` | Create workspace, request key | ~400 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../walletConnect.md` | WalletConnect setup | ~350 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../personal-sign.md` | Personal sign tutorial | ~400 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../uniswap.md` | Uniswap swap tutorial | ~400 | Current | Operational (supplemental) |
| `/docs/testnet-guides/.../policy-swap.md` | Policy-based signing tutorial | ~600 | Current | Operational (supplemental) |

---

## GAPS: Content Missing from Current Docs

These topics are covered in the litepaper but **NOT in the current documentation**:

### Critical Gaps (Core Protocol Understanding)

| Gap # | Litepaper Section | Description | Priority |
|-------|-------------------|-------------|----------|
| 1 | **dMPC with Secure Enclaves** | Detailed explanation of how dMPC uses hardware enclaves, attestation, isolated key storage, enclave signing flow. The litepaper has a full section; docs only mention "TEE" briefly. | CRITICAL |
| 2 | **$ROCK Token** | No dedicated $ROCK documentation. Missing: fixed supply (1B), dual-chain existence (Cosmos + Solana), economic utility, protocol-driven demand mechanics. | CRITICAL |
| 3 | **Protocol Revenue** | Complete fee structure across all products is not consolidated. Litepaper shows unified fee model. | CRITICAL |
| 4 | **Tokenomics Design** | 35% Labs / 30% NRP / 30% Builder / 5% zenBTC split not documented anywhere. | CRITICAL |
| 5 | **Staking $ROCK** | No documentation on Node Reward Pool (NRP), baseline rewards schedule, protocol rewards vesting (1/3-1/3-1/3 over 36 months). | CRITICAL |
| 6 | **Token Allocation** | Team/Investor/Airdrop/Protocol Rewards/Ecosystem/Liquidity/Treasury percentages not documented. | HIGH |

### High-Priority Gaps

| Gap # | Litepaper Section | Description | Priority |
|-------|-------------------|-------------|----------|
| 7 | **Build on zrChain** | Developer section explaining integration paths, revenue share for builders (30%), builder support. Not in docs. | HIGH |
| 8 | **Zenrock Labs Role** | The 35% fee share, full alignment philosophy, offchain revenue routing is not explained. | HIGH |
| 9 | **Offchain Revenues** | How offchain deals flow through protocol tokenomics is not documented. | HIGH |
| 10 | **zenBTC Yield Mechanics** | The self-balancing yield mechanism (supply vs fees) is not clearly explained in current docs. Current zenBTC intro focuses on old EigenLayer narrative. | HIGH |

### Medium-Priority Gaps

| Gap # | Litepaper Section | Description | Priority |
|-------|-------------------|-------------|----------|
| 11 | **What's Next / Roadmap** | Near-term focus areas (expanded DCTs, Hush applications, developer tooling) not in docs. | MEDIUM |
| 12 | **Workspaces Deep Dive** | Litepaper explains workspaces as "organizational primitive" with dual-policy model and hierarchies. Current docs are brief. | MEDIUM |

---

## ORPHANS: Content in Docs but NOT in Litepaper

These documentation files cover topics that are **not mentioned in the litepaper**. They may be:
- Valid operational guides that supplement the litepaper
- Deprecated/outdated content that should be removed
- Content that should potentially be added to the litepaper

| File | Topic | Assessment |
|------|-------|------------|
| `/docs/bridging-rock/Sei/` (4 files) | Sei bridging guides | REVIEW NEEDED - Is Sei bridging still supported? Not mentioned in litepaper. |
| `/docs/testnet-guides/` (7 files) | Testnet tutorials | KEEP - Valid operational guides, supplemental to litepaper |
| `/docs/zrChain/processes/` (3 files) | Request flow diagrams | KEEP - Detailed technical docs, supplemental to litepaper |

---

## Files Requiring Major Rewrite

### 1. `/docs/zenBTC/zenbtc-introduction.md`
**Issues**:
- Heavily emphasizes EigenLayer partnership and yield from "restaking"
- Mentions "rockBTC" minting on Ethereum
- Talks about "Q1 2025" launch (now outdated)
- Does not reflect current yield model (protocol fees only)

**Action**: Complete rewrite to match litepaper's zenBTC section focusing on:
- Decentralized yield-bearing wrapped Bitcoin
- BTC never lent out or used as risk capital
- Yield from protocol fees (5% zrChain + 35% zenBTC custody)
- Self-balancing yield mechanism

### 2. `/docs/zenBTC/zenbtc-technical.md`
**Issues**:
- References ERC-20 contracts and Ethereum operations
- rockBTC/Eigenlayer strategy contracts may be outdated
- Missing Solana-first architecture emphasis

**Action**: Significant update needed to align with current Solana-first architecture.

### 3. `/docs/mpc.md`
**Issues**:
- No mention of secure enclaves
- Missing attestation, isolated key storage, enclave signing flow
- Outdated comparison section

**Action**: Add entire "Distributed Multi-Party Computation with Secure Enclaves" content from litepaper.

### 4. `/docs/faq.md`
**Issues**:
- Only 3 FAQs
- Missing key questions about $ROCK, staking, tokenomics, supported assets
- Links may be outdated

**Action**: Expand significantly with FAQs covering all major topics.

### 5. `/docs/introduction/introduction.md`
**Issues**:
- Missing $ROCK value capture messaging
- No mention of tokenomics or fee flows

**Action**: Add $ROCK context and value proposition.

### 6. `/docs/introduction/zrchain.md`
**Issues**:
- Missing dMPC with secure enclaves details
- Missing enshrined oracle via vote extensions
- Sparse workspaces explanation

**Action**: Expand with litepaper content on dMPC security model and consensus verification.

### 7. `/docs/zrChain/architecture.md`
**Issues**:
- Missing detailed vote extensions explanation
- Missing cross-chain observation details
- Missing security properties

**Action**: Add litepaper's "zrChain: Technical Architecture" subsections.

### 8. `/docs/zrChain/validation.md`
**Issues**:
- Brief vote extensions explanation
- Missing sidecar details

**Action**: Expand with litepaper content.

---

## Recommendations

### Immediate Actions (Critical)

1. **Create new $ROCK section**
   - New file: `/docs/rock/rock-token.md`
   - Cover: token overview, supply, dual-chain existence, utility

2. **Create new Tokenomics section**
   - New file: `/docs/rock/tokenomics.md`
   - Cover: fee distribution (35/30/30/5), NRP, staking rewards

3. **Create Staking documentation**
   - New file: `/docs/rock/staking.md`
   - Cover: NRP, baseline rewards schedule, protocol rewards vesting

4. **Rewrite zenBTC introduction**
   - Remove EigenLayer/Ethereum references
   - Focus on Solana-first, protocol-fee yield model

5. **Update MPC documentation**
   - Add secure enclaves section
   - Add attestation and security guarantees

### Short-Term Actions (High Priority)

6. **Create Build on zrChain section**
   - New file: `/docs/developers/build-on-zrchain.md`
   - Cover: integration paths, revenue share, builder support

7. **Update Token Allocation**
   - Document the allocation breakdown
   - Add vesting schedule information

8. **Expand FAQ**
   - Add 10-15 more questions covering common topics

### Medium-Term Actions

9. **Review Sei bridging docs**
   - Confirm if Sei bridging is still active/supported
   - Either update or deprecate

10. **Add roadmap/What's Next page**
    - Document near-term focus areas

11. **Expand Workspaces documentation**
    - Add dual-policy model details
    - Add workspace hierarchy explanation

---

## Documentation Structure Recommendation

Based on the litepaper, the docs should be reorganized to follow this structure:

```
docs/
├── introduction/
│   ├── overview.md          # High-level intro (existing, needs update)
│   └── zrchain.md           # zrChain intro (existing, needs update)
├── zrchain/
│   ├── architecture.md      # Technical architecture (needs expansion)
│   ├── dmpc-enclaves.md     # NEW: dMPC with Secure Enclaves
│   ├── consensus.md         # NEW: Vote extensions, enshrined oracle
│   ├── workspaces.md        # Expand from identity.md
│   ├── policies.md          # Existing policy.md
│   └── processes/           # Existing (keep)
├── dct/                     # Existing (good)
├── zenbtc/                  # Existing (needs rewrite)
├── zenzec/                  # Existing (good)
├── hush/                    # Existing (good)
├── zentp/                   # Existing (good)
├── rock/                    # NEW SECTION
│   ├── rock-token.md        # Token overview
│   ├── tokenomics.md        # Fee distribution, value flows
│   └── staking.md           # NRP, rewards, vesting
├── developers/              # NEW SECTION
│   ├── build-on-zrchain.md  # Integration paths
│   └── revenue-share.md     # Builder economics
├── guides/
│   ├── bridging-rock/       # Existing
│   └── testnet/             # Existing
└── resources/
    ├── faq.md               # Existing (needs expansion)
    └── links.md             # Links and resources
```

---

## Conclusion

The current documentation provides solid coverage of the technical products (DCT, zenBTC, zenZEC, Hush, zenTP, zrChain modules) but has **critical gaps in economic and tokenomic content**. The litepaper positions $ROCK as the central value capture mechanism, yet the docs have no dedicated $ROCK content.

**Key Findings**:
- 12 significant topics from litepaper are not documented
- 8 files need major rewrites
- zenBTC docs are particularly outdated (still reference Ethereum/EigenLayer)
- No documentation exists for staking, tokenomics, or builder economics

The recommended reorganization and new content would bring the documentation in line with the litepaper's comprehensive coverage of both technical and economic aspects of the Zenrock ecosystem.

---

Gaps identified with precision. -- Reed
