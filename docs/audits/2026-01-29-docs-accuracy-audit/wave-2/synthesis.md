# Wave 2 Synthesis Report - Documentation Accuracy Audit

**Synthesizer**: Nexus (Senior Audit Synthesizer)
**Date**: 2026-01-29
**Audit**: Documentation Accuracy & Developer Experience

---

## Executive Summary

**Overall Audit Status**: **WARNING** - Documentation requires significant updates before developer adoption at scale

The Zenrock documentation ecosystem provides solid conceptual foundations but contains **critical gaps and accuracy issues** that will impede developer adoption. The most severe problems are: (1) major modules are completely undocumented (zenBTC, DCT, Hush, zenTP on-chain), (2) fee structures are consistently incorrect or missing across all products, (3) no node operator or CLI documentation exists, and (4) multiple security features implemented post-audit are undocumented. The documentation is excellent for end-user UI flows but inadequate for developers building on or operating the infrastructure.

**Key Statistics Across All Wave 1 Reports**:
- Critical Issues: 6
- High Severity Issues: 9
- Medium Severity Issues: 14
- Low Severity Issues: 11
- Informational: 10

---

## Priority Findings Table

| Priority | Finding | Source(s) | Impact | Recommendation |
|----------|---------|-----------|--------|----------------|
| **P0** | 6+ production modules completely undocumented | Atlas | Developers cannot understand or build on core functionality | Create docs for zenbtc, dct, hush, zentp, zenex, nrp modules |
| **P0** | No node operator/validator documentation | Nova | Cannot run infrastructure, limits decentralization | Create comprehensive node setup guide |
| **P0** | Fee structures incorrect across all products | Bridge, Cipher, Shadow | Users budgeting incorrectly, support burden | Audit and correct all fee documentation |
| **P1** | Security features undocumented (chain-ID binding, spending_binding) | Shadow | Security auditors miss critical protections | Document all security mechanisms |
| **P1** | CosmWasm version wrong (v0.51 vs v0.53.4) | Nova | Contract deployment failures | Update FAQ immediately |
| **P1** | zenTP documented as "no fees" but has 0.5% + 200 ROCK fees | Bridge | User surprise, support issues | Correct zenTP fee documentation |
| **P1** | GitHub repository links incorrect | Cipher | Developers sent to wrong/missing repos | Fix all external repo links |
| **P1** | No CLI documentation | Nova | Cannot automate or script operations | Add CLI reference section |
| **P2** | BTL timeout value wrong (20 blocks vs 1000 default) | Atlas | Incorrect timeout expectations | Verify and correct timeout docs |
| **P2** | Sei guides misplaced under zenTP (uses Skip/IBC, not zenTP) | Bridge | Confusion about zenTP capabilities | Reorganize Sei docs to IBC section |
| **P2** | Hush commitment formulas outdated (not V8 format) | Shadow | Third-party tools compute wrong values | Update to V8 unified format |
| **P2** | Mainnet vs testnet URLs unclear | Nova | Wrong environment usage | Create clear environment section |

---

## Cross-Cutting Themes

### Theme 1: Fee Documentation Is Universally Incorrect

**Pattern**: Every Wave 1 auditor found fee documentation issues.

| Product | Documented Fee | Actual Fee | Auditor |
|---------|----------------|------------|---------|
| zenTP | "No fees" | 0.5% + 200 ROCK | Bridge |
| DCT Mint | "$5 flat" | Governance-configurable, basis-point based | Cipher, Bridge |
| DCT Redeem | "50 bps" | burn_fee_bps parameter | Cipher, Bridge |
| Hush Shield | "Free" | ShieldFee param (currently 0) | Shadow |
| Hush Transfer | "0.01 jitoSOL flat" | Asset-specific config | Shadow |

**Root Cause**: Fees are governance-configurable parameters but documented as static values. Documentation was written at a point-in-time and never updated as parameters changed.

**Consolidated Recommendation**: Create a single "Fees & Economics" page that:
1. Explains fees are governance-configurable
2. Links to on-chain parameter queries
3. Lists current mainnet values with "last updated" date
4. Includes fee exemption mechanisms

---

### Theme 2: Module Coverage Gap

**Pattern**: Documentation covers 4 modules; codebase has 11+.

| Module | Status | Business Criticality |
|--------|--------|---------------------|
| identity | Documented | Core |
| treasury | Documented | Core |
| policy | Documented | Core |
| validation | Documented | Core |
| **zenbtc** | **MISSING** | Production - zenBTC is live |
| **dct** | **MISSING** | Production - zenZEC is live |
| **hush** | **Partial** | Production - Hush is live |
| **zentp** | **Partial** | Production - ROCK bridging |
| zenex | MISSING | Unknown |
| nrp | MISSING | Unknown |
| mint | MISSING | Infrastructure |

**Root Cause**: Documentation was created for v1 architecture and never expanded as new modules shipped.

**Consolidated Recommendation**: Prioritize documentation for production modules in order:
1. zenbtc (production, critical)
2. dct (production, critical)
3. hush (complete existing docs)
4. zentp (complete on-chain module docs)

---

### Theme 3: Security Features Added Post-Documentation

**Pattern**: Shadow identified multiple security features implemented after audit findings that never made it to documentation.

| Security Feature | Purpose | Documented |
|------------------|---------|------------|
| Chain-ID binding | Prevents cross-chain replay attacks | No |
| spending_binding | Binds incoming notes to spending key | No |
| Protocol Fee Pool | Replaces fee burning with claimable pool | No |
| OFAC compliance | Sidecar-level compliance | Yes |

**Consolidated Recommendation**: Create a "Security Architecture" section documenting:
1. All cryptographic binding mechanisms
2. Replay attack protections
3. Key hierarchy with all components
4. Compliance mechanisms

---

### Theme 4: Developer Path Blocked

**Pattern**: Nova found that developers cannot complete basic tasks:

| Task | Possible? | Blocker |
|------|-----------|---------|
| Use testnet via UI | Yes | Minor friction |
| Run a node | **No** | No documentation |
| Become a validator | **No** | No documentation |
| Deploy CosmWasm contracts | Partially | Wrong version documented |
| Use CLI | **No** | No documentation |
| Run sidecar oracle | **No** | No documentation |

**Root Cause**: Documentation focused on end-users, not infrastructure operators or developers.

**Consolidated Recommendation**: Create "Developer" and "Node Operator" sections with:
1. Local development setup
2. CLI reference (extract from GUIDE.md)
3. Node installation and configuration
4. Validator setup
5. Sidecar oracle setup

---

### Theme 5: Hardcoded Values That Are Actually Configurable

**Pattern**: Multiple auditors found values documented as constants that are actually governance parameters.

| Value | Documented As | Actually Is |
|-------|---------------|-------------|
| BTL timeout | "20 blocks" | Param: 1000 default |
| Contract addresses | Static strings | Chain params |
| Fees | Fixed amounts | Governance params |
| Merkle tree depth | "20" / "24" | Param: 24 in deployment |
| Block confirmations | "6 blocks" | Configurable per asset |

**Consolidated Recommendation**:
1. Add "Configurable via Governance" labels to all such values
2. Provide query commands to fetch current values
3. Document default values with explanation

---

## Consolidated Recommendations

### Immediate (This Week)

- [ ] **Fix CosmWasm version** in FAQ (v0.51.0 -> v0.53.4) - Nova finding, breaks contract deployments
- [ ] **Correct zenTP fee documentation** - Bridge finding, users seeing unexpected fees
- [ ] **Fix GitHub repo links** for zenBTC/zenZEC - Cipher finding, developers sent to wrong location
- [ ] **Add chain-ID binding documentation** to Hush - Shadow finding, security feature undocumented
- [ ] **Fix duplicate step numbering** in zenrock-guide.md - Nova finding
- [ ] **Fix broken welcome.md link** to category JSON - Nova finding

### Short-Term (This Month)

- [ ] **Create zenBTC module documentation** - Atlas critical finding
- [ ] **Create DCT module documentation** - Atlas critical finding
- [ ] **Add spending_binding to Hush key hierarchy** - Shadow finding
- [ ] **Update all fee documentation** to reflect governance-configurable nature with current values
- [ ] **Update architecture.md** to list all 11+ modules - Atlas finding
- [ ] **Add CLI reference documentation** extracted from GUIDE.md - Nova finding
- [ ] **Clarify mainnet vs testnet URLs** in FAQ - Nova finding
- [ ] **Move Sei guides** to separate IBC section - Bridge finding
- [ ] **Update Hush commitment formulas** to V8 unified format - Shadow finding
- [ ] **Correct BTL timeout value** - Atlas finding

### Medium-Term (This Quarter)

- [ ] **Create Node Operator Guide** covering installation, configuration, syncing, monitoring
- [ ] **Create Validator Guide** covering registration, staking, slashing, maintenance
- [ ] **Create Sidecar Oracle Setup Guide**
- [ ] **Complete Hush module documentation** on-chain module page
- [ ] **Complete zenTP module documentation** on-chain module page
- [ ] **Add "Developer FAQ"** section addressing contract deployment, gas costs, SDKs
- [ ] **Create "Security Architecture"** section with all security mechanisms
- [ ] **Add API/CLI query examples** for all products
- [ ] **Document Protocol Fee Pool** mechanism in Hush
- [ ] **Add error code reference** to troubleshooting guides
- [ ] **Create "Fees & Economics"** single source of truth page

---

## Wave 1 Report Summary

| Auditor | Focus Area | Status | Key Finding |
|---------|------------|--------|-------------|
| Atlas | zrChain Core | WARNING | 6+ production modules completely undocumented; only 4 of 11+ modules have docs |
| Cipher | zenBTC/zenZEC | WARNING | GitHub repo link incorrect; fee structures not verifiable in code |
| Bridge | zenTP/DCT | HIGH CONFIDENCE | zenTP documented as fee-free but has 0.5%+200 ROCK fees; Sei uses IBC not zenTP |
| Shadow | Hush | WARNING | Chain-ID binding and spending_binding security features undocumented; V8 circuit format not reflected |
| Nova | Dev Experience | WARNING | CosmWasm version wrong; no node/CLI docs; blocked developer paths |

---

## Contradictions Between Auditors

### Contradiction 1: Merkle Tree Depth (Resolved)

- Shadow noted docs say "24" but CLAUDE.md says "20"
- Resolution: Deployment config confirms **depth 24** is correct. The CLAUDE.md in the codebase is outdated.

### Contradiction 2: DCT Fee Documentation

- Cipher and Bridge both identified DCT fee issues but with slightly different specific values
- Resolution: Both are correct - the documented "$5 flat / 50 bps" is not reflected in code, which uses governance-configurable basis points

### No major contradictions between auditors - findings are complementary.

---

## Appendix: All Findings by Severity

### Critical (P0) - 6 findings

| ID | Finding | Source | Location |
|----|---------|--------|----------|
| C1 | 6+ production modules undocumented (zenbtc, dct, hush, zentp, zenex, nrp) | Atlas | /docs/zrChain/ |
| C2 | No node operator/validator documentation | Nova | Missing entirely |
| C3 | zenTP fee documentation completely wrong ("no fees" vs 0.5%+200 ROCK) | Bridge | zenTP/guides/ |
| C4 | DCT fee documentation incorrect ($5 flat vs basis-point params) | Bridge, Cipher | DCT/, zenZEC/ |
| C5 | CosmWasm version incorrect (v0.51 vs v0.53.4) | Nova | faq.md:28 |
| C6 | GitHub repository link incorrect for zenBTC | Cipher | zenbtc-technical.md:11 |

### High Severity (P1) - 9 findings

| ID | Finding | Source | Location |
|----|---------|--------|----------|
| H1 | Architecture.md lists only 4 modules, codebase has 11+ | Atlas | architecture.md:25-30 |
| H2 | BTL timeout documented as 20 blocks, default is 1000 | Atlas | treasury.md:42-52 |
| H3 | MsgUpdateWasmParams undocumented in policy module | Atlas | policy.md |
| H4 | zenZEC fee structure not verifiable in code | Cipher | zenzec-introduction.md:44-49 |
| H5 | Chain-ID binding security feature undocumented | Shadow | hush-technical.md |
| H6 | spending_binding security feature undocumented | Shadow | hush-technical.md |
| H7 | No CLI documentation for developers | Nova | Missing entirely |
| H8 | Missing node/validator documentation | Nova | Missing entirely |
| H9 | Testnet vs mainnet URLs not clearly differentiated | Nova | faq.md, testnet-guides/ |

### Medium Severity (P2) - 14 findings

| ID | Finding | Source | Location |
|----|---------|--------|----------|
| M1 | Bitcoin secp256k1 key type not documented | Atlas | treasury.md:13 |
| M2 | IBC status says "will support" but is available | Atlas | cross-chain.md:21 |
| M3 | Solana contract address hardcoded (is governance param) | Cipher | zenbtc-technical.md:30 |
| M4 | zenZEC Solana CA should be verified | Cipher | zenzec-introduction.md:13 |
| M5 | Maturity period "100-200 blocks" unclear | Cipher | zenbtc-technical.md:59 |
| M6 | Sei guides misplaced under zenTP (uses Skip/IBC) | Bridge | zenTP/guides/sei-*.md |
| M7 | DCT documentation implies Bitcoin support (zenBTC rejected) | Bridge | dct-technical.md:42 |
| M8 | zenTP error codes not in troubleshooting | Bridge | troubleshooting.md |
| M9 | Merkle tree depth inconsistency (20 vs 24) | Shadow | hush-technical.md:16 |
| M10 | Missing Protocol Fee Pool documentation | Shadow | hush-technical.md |
| M11 | Hush commitment formulas outdated (not V8) | Shadow | hush-technical.md:68-78 |
| M12 | Prerequisites not clearly listed in setup | Nova | setup.md |
| M13 | Duplicate step numbering (two "Step 4"s) | Nova | zenrock-guide.md:45,55 |
| M14 | Broken link to category JSON | Nova | welcome.md:13 |

### Low Severity (P3) - 11 findings

| ID | Finding | Source | Location |
|----|---------|--------|----------|
| L1 | GG21 citation year inconsistent (2020 vs 2021) | Atlas | dmpc.md:62-70 |
| L2 | Deprecated key_id field still in examples | Atlas | treasury README |
| L3 | REGNET Solana network type missing from docs | Atlas | treasury.md |
| L4 | "todo" placeholders in CLI descriptions | Atlas | identity/README.md |
| L5 | Supply invariant terminology mismatch with code | Cipher | zenbtc-technical.md:64 |
| L6 | Block confirmation "typically 6" may be configurable | Cipher | zenbtc-technical.md:44 |
| L7 | Exchange rate formula incomplete (missing pending) | Cipher | zenbtc-technical.md:150 |
| L8 | ROCK SPL token address should be verified | Bridge | solana-setup.md:62 |
| L9 | Transfer time estimates may vary | Bridge | solana-to-zenrock.md |
| L10 | Typo "the the" | Nova | zenrock-guide.md:65 |
| L11 | Typo "increasind" | Nova | policy-swap.md:43 |

### Informational - 10 findings

| ID | Finding | Source |
|----|---------|--------|
| I1 | Validation README references external Notion doc | Atlas |
| I2 | External validator repo link needs periodic verification | Atlas |
| I3 | ZenBTCMetadata field name misleading (used for all DCT) | Atlas |
| I4 | No error scenario documentation | Cipher |
| I5 | No API/CLI query examples for zenBTC/zenZEC | Cipher |
| I6 | Yield distribution timing unclear | Cipher |
| I7 | Missing CLI examples in zenTP docs | Bridge |
| I8 | zenBTC/DCT module separation not explained | Bridge |
| I9 | Proof generation times may need update | Shadow |
| I10 | zenZEC support status unclear in Hush | Shadow |

---

## Conclusion

The Zenrock documentation has strong foundations in conceptual explanations, tokenomics, and end-user UI guides. However, **the documentation has not kept pace with product development**. The most critical gaps are:

1. **Production modules undocumented** - zenBTC, DCT, Hush, zenTP all ship with incomplete or missing on-chain module documentation
2. **Fee structures universally wrong** - Every product has incorrect fee documentation
3. **Developer path blocked** - No CLI, no node setup, no validator guide
4. **Security features undocumented** - Post-audit security improvements not reflected

**Estimated effort to remediate**: 2-3 weeks of dedicated documentation work for immediate/short-term items; ongoing process needed for keeping fee and parameter documentation current.

**Final Recommendation**: Treat documentation as a product release gate - no module should ship without corresponding documentation passing review.

---

*Nexus signing off - synthesis complete, patterns identified, priorities set.*
