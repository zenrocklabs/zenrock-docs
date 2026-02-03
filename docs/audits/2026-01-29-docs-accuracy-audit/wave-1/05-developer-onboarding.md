# Developer Onboarding Experience Audit

**Auditor**: Nova (Developer Experience Auditor)
**Date**: 2026-01-29
**Scope**: Introduction, Testnet Guides, FAQ, Roadmap, ROCK Token Documentation
**Status**: **WARNING** - Documentation is comprehensive but contains accuracy issues and gaps in developer setup guidance

---

## Executive Summary

The developer onboarding documentation provides a solid foundation for understanding Zenrock's products and tokenomics, but contains several accuracy issues and notable gaps. The testnet guides are well-structured for end-users interacting via the web UI, but lack critical documentation for developers wanting to run nodes or build on the chain directly. The ROCK token documentation is exceptionally thorough and well-organized. Key concerns include outdated URLs, an incorrect CosmWasm version, and missing node operator/validator documentation.

---

## Findings by Severity

### 🔴 Critical

#### 1. CosmWasm Version Incorrect in FAQ

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md` (line 28)

**Description**: The FAQ states CosmWasm version is `v0.51.0`, but the codebase uses `v0.53.4`.

**Evidence**:
- Documentation states: `We are currently using v0.51.0`
- Codebase (`zenrock/zrchain/go.mod` line 44): `github.com/CosmWasm/wasmd v0.53.4`

**Impact**: Developers building CosmWasm contracts may target the wrong API version, leading to compatibility issues, failed deployments, or subtle bugs.

**Recommendation**: Update FAQ to state:
```markdown
Yes, we are supporting CosmWasm for smart contract interaction. We are currently using `v0.53.4`.
```

---

### 🟠 High

#### 2. Inconsistent Frontend URLs Between Documentation and Production

**Location**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/setup.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md`

**Description**: Documentation references multiple different frontend URLs causing confusion:
- Testnet guides use: `https://gardia.zenrocklabs.io`
- FAQ uses: `https://app.zenrocklabs.io`

**Evidence**:
- `setup.md` line 13: `go to the [web application](https://gardia.zenrocklabs.io/)`
- `zenrock-guide.md` line 8: `https://gardia.zenrocklabs.io/onboard/get-started`
- `faq.md` line 16: `UI Frontend: [https://app.zenrocklabs.io](https://app.zenrocklabs.io)`

The codebase shows `app.zenrocklabs.io` is the mainnet/production URL while `gardia.zenrocklabs.io` is testnet.

**Impact**: Developers may go to the wrong URL and attempt to use testnet tokens on mainnet or vice versa. The FAQ does not clarify this is the mainnet URL.

**Recommendation**:
1. Add a clear section in FAQ differentiating testnet vs mainnet URLs
2. Update FAQ to clearly label URLs:
```markdown
**Mainnet:**
- UI Frontend: https://app.zenrocklabs.io

**Testnet (Gardia):**
- UI Frontend: https://gardia.zenrocklabs.io
- Testnet Faucet: https://faucet.gardia.zenrocklabs.io
```

#### 3. Missing Node/Validator Documentation

**Location**: Missing from `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/`

**Description**: There is no documentation for:
- Running a zrChain node
- Becoming a validator
- Node requirements (hardware, network)
- Syncing from genesis or snapshot
- Running the sidecar oracle

**Evidence**:
- Glob search for `*node*` and `*validator*` returned no results in docs
- Codebase contains detailed node setup scripts (`init.sh`, `Makefile` targets) not documented
- CLAUDE.md in codebase mentions: `./init.sh --localnet 1` and sidecar requirements

**Impact**: Developers cannot participate in the network as validators or run infrastructure without reverse-engineering the codebase. This severely limits ecosystem growth and decentralization.

**Recommendation**: Create comprehensive node operator documentation covering:
1. Hardware requirements
2. Installation steps
3. Configuration options
4. Sidecar oracle setup
5. Validator registration process
6. Monitoring and maintenance

---

### 🟡 Medium

#### 4. No CLI Documentation for Developers

**Location**: Missing from testnet guides and build documentation

**Description**: The testnet guides are entirely UI-focused. There is no documentation for using the `zenrockd` CLI, which is essential for:
- Developers testing smart contracts
- Automation and scripting
- Advanced operations

**Evidence**:
- Codebase contains `GUIDE.md` with comprehensive CLI examples
- This content is not reflected in the public documentation

**Impact**: Developers wanting to automate workflows or integrate programmatically have no guidance.

**Recommendation**:
1. Extract and adapt content from `zenrock/GUIDE.md` into the docs
2. Create a "Developer CLI Reference" section
3. Include examples for common operations (queries, transactions, key management)

#### 5. Prerequisites Not Clearly Listed

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/setup.md`

**Description**: The setup guide assumes certain knowledge and doesn't clearly list all prerequisites.

**Evidence**:
- No mention of supported browsers
- No mention of Keplr/Leap version requirements
- No troubleshooting for common wallet setup issues

**Impact**: New developers may struggle with basic setup issues without clear prerequisite guidance.

**Recommendation**: Add a prerequisites section:
```markdown
## Prerequisites

- **Browser**: Chrome, Firefox, or Brave (latest version)
- **Wallet**: Keplr v0.12+ or Leap Wallet v0.4+
- **Network**: Stable internet connection
```

#### 6. Duplicate Step Numbering in Zenrock Guide

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md`

**Description**: Step 4 appears twice (lines 45 and 55), causing confusion in the tutorial flow.

**Evidence**:
```markdown
### 4. Your First Key Request
...
### 4. Check your workspaces
```

**Impact**: Confuses readers following the step-by-step guide.

**Recommendation**: Renumber to:
- `### 4. Your First Key Request`
- `### 5. Check your Workspaces`

#### 7. Broken Link Format in Welcome Page

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/welcome.md` (line 13)

**Description**: Links to category JSON files instead of actual documentation pages.

**Evidence**:
```markdown
- [Ethereum Guide](explore-ethereum/_category_.json)
```

**Impact**: Link leads to raw JSON file, not usable documentation.

**Recommendation**: Change to link to the actual guide index or first page:
```markdown
- [Ethereum Guide](explore-ethereum/walletConnect.md)
```

---

### 🟢 Low

#### 8. Typo in Zenrock Guide

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md` (line 65)

**Description**: Minor typo: "the the" instead of "the".

**Evidence**:
```markdown
Click on the workspace to open it and see the key that you just created. You can also the the derived addresses
```

**Impact**: Minor professionalism issue.

**Recommendation**: Fix to: "You can also see the derived addresses"

#### 9. Policy Guide Has Typos

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/explore-ethereum/policy-swap.md` (line 43)

**Description**: Contains "increasind" instead of "increasing".

**Evidence**:
```markdown
Also increasind the counter to 2 indicates that both parties need to approve under this policy.
```

**Impact**: Minor professionalism issue.

**Recommendation**: Fix to "increasing".

---

### ⚪ Info

#### 10. Well-Structured ROCK Token Documentation

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/rock-token/`

**Description**: The ROCK token documentation is exemplary:
- Clear tokenomics explanation
- Well-organized across multiple files
- Good internal cross-linking
- Accurate fee structures
- Transparent about Zenrock Labs' role

**Impact**: Positive - Sets a good standard for other documentation sections.

#### 11. FAQ Missing Common Developer Questions

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md`

**Description**: The FAQ focuses on end-user questions but lacks developer-oriented FAQs such as:
- How do I deploy a CosmWasm contract?
- What are the gas costs?
- How do I test locally?
- What SDKs are available?

**Recommendation**: Add a "Developer FAQ" section.

#### 12. Roadmap Lacks Concrete Timelines

**Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/roadmap.md`

**Description**: The roadmap describes "Near-Term Focus Areas" without specific dates or milestones.

**Impact**: Developers cannot plan their integration timelines around Zenrock features.

**Recommendation**: Consider adding quarterly milestones or at least relative timing (e.g., "Q1 2026", "H2 2026").

---

## Positive Observations

1. **Excellent Tokenomics Documentation**: The ROCK token section is comprehensive, well-organized, and transparent about value flows. The explanation of the 35/30/30/5 split is clear and the rationale for Labs alignment is compelling.

2. **Good Visual Aids in Testnet Guides**: Screenshots throughout the testnet guides help users follow along visually.

3. **Consistent Cross-Linking**: Documentation consistently links to related pages, helping readers navigate.

4. **Clear Product Differentiation**: The introduction clearly distinguishes between zrChain, DCTs (zenBTC, zenZEC), and Hush Protocol.

5. **Comprehensive dMPC Explanation**: The dMPC documentation effectively explains complex cryptographic concepts in accessible terms.

6. **Builder-Friendly Revenue Share**: The "Build on zrChain" documentation clearly communicates the 30% builder revenue share, which is attractive for ecosystem growth.

---

## Developer Journey Evaluation

### Can a new developer go from zero to running a node?

**Status**: NO

The documentation provides no guidance for:
- Installing the `zenrockd` binary
- Configuring a node
- Syncing with the network
- Running a validator

### Can a new developer interact with the testnet via UI?

**Status**: YES, with minor friction

The testnet guides provide a clear path:
1. Install Keplr wallet
2. Get testnet ROCK from Discord faucet
3. Create workspace
4. Create keys
5. Use WalletConnect

### Can a new developer build and deploy smart contracts?

**Status**: PARTIALLY

- CosmWasm support is mentioned but version is wrong
- No deployment tutorials
- No contract examples
- No SDK documentation

### Is jargon explained?

**Status**: MOSTLY YES

Key terms are generally explained:
- dMPC is well-documented
- Workspaces and keyrings are explained
- DCT concept is clear

Could improve:
- "TEE" mentioned without expansion
- "Vote extensions" assumed knowledge

---

## Recommendations Checklist

### Critical Priority
- [ ] Fix CosmWasm version in FAQ (v0.51.0 -> v0.53.4)

### High Priority
- [ ] Clarify testnet vs mainnet URLs in FAQ
- [ ] Create node operator/validator documentation
- [ ] Add CLI reference documentation

### Medium Priority
- [ ] Fix duplicate step numbering in zenrock-guide.md
- [ ] Fix broken category link in welcome.md
- [ ] Add prerequisites section to setup guide
- [ ] Add developer FAQ section

### Low Priority
- [ ] Fix "the the" typo in zenrock-guide.md
- [ ] Fix "increasind" typo in policy-swap.md
- [ ] Consider adding roadmap timelines

---

## Summary Statistics

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High | 3 |
| Medium | 4 |
| Low | 2 |
| Info | 3 |

---

*Nova signing off - the best docs make the complex feel simple.*
