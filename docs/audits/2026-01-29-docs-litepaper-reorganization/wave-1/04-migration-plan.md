# Documentation Litepaper Reorganization: Migration Plan

**Date**: 2026-01-29
**Author**: Atlas (Content Migration Planner)
**Status**: Ready for Implementation

---

## Executive Summary

This migration plan transforms the current Zenrock documentation structure into a litepaper-aligned organization. The goal is to ensure documentation mirrors the logical flow of the litepaper while preserving existing high-quality technical content.

**Key Findings:**
- Current docs cover approximately 60% of litepaper topics well
- Major gaps exist in tokenomics, $ROCK economics, and developer content
- Restructuring requires creating 8-12 new files
- 38 existing files can be migrated with minimal changes
- No files need to be deleted (all content remains valuable)

---

## New Documentation Structure (Proposed)

```
docs/
├── overview/
│   ├── _category_.json
│   ├── welcome.md                      # NEW: High-level ecosystem intro
│   └── getting-started.md              # NEW: Quick start guide
│
├── zrchain/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from introduction/zrchain.md
│   ├── architecture.md                 # MIGRATE: from zrChain/architecture.md
│   ├── dmpc/
│   │   ├── _category_.json
│   │   ├── overview.md                 # MIGRATE: from mpc.md
│   │   └── secure-enclaves.md          # NEW: TEE/enclave details
│   ├── modules/
│   │   ├── _category_.json
│   │   ├── identity.md                 # MIGRATE: from zrChain/identity.md
│   │   ├── treasury.md                 # MIGRATE: from zrChain/treasury.md
│   │   ├── policy.md                   # MIGRATE: from zrChain/policy.md
│   │   └── validation.md               # MIGRATE: from zrChain/validation.md
│   ├── consensus/
│   │   ├── _category_.json
│   │   ├── cometbft.md                 # NEW: Consensus engine details
│   │   └── oracle-system.md            # NEW: Sidecar oracle architecture
│   ├── workspaces.md                   # NEW: Dedicated workspace documentation
│   └── processes/
│       ├── _category_.json
│       ├── key-requests.md             # MIGRATE: from zrChain/processes/keyRequests.md
│       ├── sign-requests.md            # MIGRATE: from zrChain/processes/signRequests.md
│       └── tx-requests.md              # MIGRATE: from zrChain/processes/txRequests.md
│
├── dct/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from DCT/dct-introduction.md
│   ├── technical.md                    # MIGRATE: from DCT/dct-technical.md
│   └── supply-invariants.md            # NEW: Deep dive on accounting
│
├── zenbtc/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from zenBTC/zenbtc-introduction.md
│   ├── technical.md                    # MIGRATE: from zenBTC/zenbtc-technical.md
│   ├── yield-mechanism.md              # NEW: Detailed yield documentation
│   └── exchange-rate.md                # EXPAND: from zenbtc-technical.md section
│
├── zenzec/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from zenZEC/zenzec-introduction.md
│   └── technical.md                    # MIGRATE: from zenZEC/zenzec-technical.md
│
├── hush/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from Hush/hush-introduction.md
│   ├── technical.md                    # MIGRATE: from Hush/hush-technical.md
│   └── user-guide.md                   # MIGRATE: from Hush/hush-guide.md
│
├── rock-token/
│   ├── _category_.json
│   ├── overview.md                     # NEW: $ROCK token overview
│   ├── tokenomics.md                   # NEW: Distribution model, vesting
│   ├── staking.md                      # NEW: Staking mechanics, Node Reward Pool
│   ├── protocol-revenue.md             # NEW: Fee structures, burn mechanics
│   └── allocation.md                   # NEW: Token allocation breakdown
│
├── zentp/
│   ├── _category_.json
│   ├── introduction.md                 # MIGRATE: from zenTP/zentp-introduction.md
│   ├── technical.md                    # MIGRATE: from zenTP/zentp-technical.md
│   └── guides/
│       ├── _category_.json
│       ├── solana-setup.md             # MIGRATE: from bridging-rock/Solana/setup.md
│       ├── solana-to-zenrock.md        # MIGRATE: from bridging-rock/Solana/solana-zenrock.md
│       ├── zenrock-to-solana.md        # MIGRATE: from bridging-rock/Solana/zenrock-solana.md
│       ├── solana-troubleshooting.md   # MIGRATE: from bridging-rock/Solana/troubleshooting.md
│       ├── sei-setup.md                # MIGRATE: from bridging-rock/Sei/setup.md
│       ├── sei-to-zenrock.md           # MIGRATE: from bridging-rock/Sei/sei-evm-zenrock.md
│       ├── zenrock-to-sei.md           # MIGRATE: from bridging-rock/Sei/zenrock-sei-evm.md
│       └── sei-troubleshooting.md      # MIGRATE: from bridging-rock/Sei/troubleshooting.md
│
├── developers/
│   ├── _category_.json
│   ├── build-on-zrchain.md             # NEW: Developer getting started
│   ├── cosmwasm.md                     # NEW: CosmWasm integration guide
│   ├── cross-chain.md                  # MIGRATE: from cross-chain.md
│   └── api-reference.md                # NEW: API endpoints reference
│
├── guides/
│   ├── _category_.json
│   └── testnet/
│       ├── _category_.json
│       ├── welcome.md                  # MIGRATE: from testnet-guides/zrchain_gardia_testnet/welcome.md
│       ├── setup.md                    # MIGRATE: from testnet-guides/zrchain_gardia_testnet/setup.md
│       ├── zenrock-guide.md            # MIGRATE: from testnet-guides/zrchain_gardia_testnet/zenrock-guide.md
│       └── ethereum/
│           ├── _category_.json
│           ├── wallet-connect.md       # MIGRATE: from explore-ethereum/walletConnect.md
│           ├── personal-sign.md        # MIGRATE: from explore-ethereum/personal-sign.md
│           ├── uniswap.md              # MIGRATE: from explore-ethereum/uniswap.md
│           └── policy-swap.md          # MIGRATE: from explore-ethereum/policy-swap.md
│
├── resources/
│   ├── _category_.json
│   ├── faq.md                          # MIGRATE: from faq.md
│   ├── roadmap.md                      # NEW: What's Next section from litepaper
│   ├── zenrock-labs.md                 # NEW: Role of Zenrock Labs
│   └── glossary.md                     # NEW: Terms and definitions
│
└── index.md                            # MIGRATE: from introduction/introduction.md
```

---

## Migration Mapping Table

### Overview Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `introduction/introduction.md` | `index.md` | Migrate as landing page | P1 |
| N/A | `overview/welcome.md` | Create new | P1 |
| N/A | `overview/getting-started.md` | Create new | P2 |

### zrChain Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `introduction/zrchain.md` | `zrchain/introduction.md` | Migrate + enhance | P1 |
| `zrChain/architecture.md` | `zrchain/architecture.md` | Migrate | P1 |
| `mpc.md` | `zrchain/dmpc/overview.md` | Migrate + restructure | P1 |
| N/A | `zrchain/dmpc/secure-enclaves.md` | Create new (from litepaper) | P2 |
| `zrChain/identity.md` | `zrchain/modules/identity.md` | Migrate | P1 |
| `zrChain/treasury.md` | `zrchain/modules/treasury.md` | Migrate | P1 |
| `zrChain/policy.md` | `zrchain/modules/policy.md` | Migrate | P1 |
| `zrChain/validation.md` | `zrchain/modules/validation.md` | Migrate | P1 |
| N/A | `zrchain/consensus/cometbft.md` | Create new | P3 |
| N/A | `zrchain/consensus/oracle-system.md` | Create new | P2 |
| N/A | `zrchain/workspaces.md` | Create new (expand from identity) | P2 |
| `zrChain/processes/keyRequests.md` | `zrchain/processes/key-requests.md` | Migrate + rename | P1 |
| `zrChain/processes/signRequests.md` | `zrchain/processes/sign-requests.md` | Migrate + rename | P1 |
| `zrChain/processes/txRequests.md` | `zrchain/processes/tx-requests.md` | Migrate + rename | P1 |

### DCT Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `DCT/dct-introduction.md` | `dct/introduction.md` | Migrate | P1 |
| `DCT/dct-technical.md` | `dct/technical.md` | Migrate | P1 |
| N/A | `dct/supply-invariants.md` | Create new | P3 |

### zenBTC Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `zenBTC/zenbtc-introduction.md` | `zenbtc/introduction.md` | Migrate | P1 |
| `zenBTC/zenbtc-technical.md` | `zenbtc/technical.md` | Migrate | P1 |
| N/A | `zenbtc/yield-mechanism.md` | Create new (from litepaper) | P2 |
| N/A | `zenbtc/exchange-rate.md` | Extract from technical.md | P3 |

### zenZEC Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `zenZEC/zenzec-introduction.md` | `zenzec/introduction.md` | Migrate | P1 |
| `zenZEC/zenzec-technical.md` | `zenzec/technical.md` | Migrate | P1 |

### Hush Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `Hush/hush-introduction.md` | `hush/introduction.md` | Migrate | P1 |
| `Hush/hush-technical.md` | `hush/technical.md` | Migrate | P1 |
| `Hush/hush-guide.md` | `hush/user-guide.md` | Migrate | P1 |

### $ROCK Token Section (NEW)

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| N/A | `rock-token/overview.md` | Create new | P1 |
| N/A | `rock-token/tokenomics.md` | Create new (from litepaper) | P1 |
| N/A | `rock-token/staking.md` | Create new (from litepaper) | P1 |
| N/A | `rock-token/protocol-revenue.md` | Create new (from litepaper) | P2 |
| N/A | `rock-token/allocation.md` | Create new (from litepaper) | P2 |

### zenTP Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `zenTP/zentp-introduction.md` | `zentp/introduction.md` | Migrate | P1 |
| `zenTP/zentp-technical.md` | `zentp/technical.md` | Migrate | P1 |
| `bridging-rock/Solana/setup.md` | `zentp/guides/solana-setup.md` | Migrate | P1 |
| `bridging-rock/Solana/solana-zenrock.md` | `zentp/guides/solana-to-zenrock.md` | Migrate | P1 |
| `bridging-rock/Solana/zenrock-solana.md` | `zentp/guides/zenrock-to-solana.md` | Migrate | P1 |
| `bridging-rock/Solana/troubleshooting.md` | `zentp/guides/solana-troubleshooting.md` | Migrate | P1 |
| `bridging-rock/Sei/setup.md` | `zentp/guides/sei-setup.md` | Migrate | P1 |
| `bridging-rock/Sei/sei-evm-zenrock.md` | `zentp/guides/sei-to-zenrock.md` | Migrate | P1 |
| `bridging-rock/Sei/zenrock-sei-evm.md` | `zentp/guides/zenrock-to-sei.md` | Migrate | P1 |
| `bridging-rock/Sei/troubleshooting.md` | `zentp/guides/sei-troubleshooting.md` | Migrate | P1 |

### Developers Section (NEW)

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| N/A | `developers/build-on-zrchain.md` | Create new (from litepaper) | P2 |
| N/A | `developers/cosmwasm.md` | Create new | P2 |
| `cross-chain.md` | `developers/cross-chain.md` | Migrate | P1 |
| N/A | `developers/api-reference.md` | Create new | P3 |

### Guides Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `testnet-guides/zrchain_gardia_testnet/welcome.md` | `guides/testnet/welcome.md` | Migrate | P1 |
| `testnet-guides/zrchain_gardia_testnet/setup.md` | `guides/testnet/setup.md` | Migrate | P1 |
| `testnet-guides/zrchain_gardia_testnet/zenrock-guide.md` | `guides/testnet/zenrock-guide.md` | Migrate | P1 |
| `testnet-guides/.../walletConnect.md` | `guides/testnet/ethereum/wallet-connect.md` | Migrate | P1 |
| `testnet-guides/.../personal-sign.md` | `guides/testnet/ethereum/personal-sign.md` | Migrate | P1 |
| `testnet-guides/.../uniswap.md` | `guides/testnet/ethereum/uniswap.md` | Migrate | P1 |
| `testnet-guides/.../policy-swap.md` | `guides/testnet/ethereum/policy-swap.md` | Migrate | P1 |

### Resources Section

| Current File | New Location | Action | Priority |
|--------------|--------------|--------|----------|
| `faq.md` | `resources/faq.md` | Migrate + expand | P1 |
| N/A | `resources/roadmap.md` | Create new (from litepaper) | P2 |
| N/A | `resources/zenrock-labs.md` | Create new (from litepaper) | P3 |
| N/A | `resources/glossary.md` | Create new | P3 |

---

## New Files Required

These files contain content from the litepaper that is not currently in the documentation:

### Priority 1 (Essential)

| File | Source | Content Summary |
|------|--------|-----------------|
| `rock-token/overview.md` | Litepaper Section 7 | $ROCK native token introduction, utility, governance |
| `rock-token/tokenomics.md` | Litepaper Section 9 | Zenrock's Tokenomic Design, distribution model |
| `rock-token/staking.md` | Litepaper Section 12 | Staking $ROCK, Node Reward Pool, validator rewards |

### Priority 2 (Important)

| File | Source | Content Summary |
|------|--------|-----------------|
| `overview/welcome.md` | Litepaper Section 1 | Ecosystem overview, vision, value proposition |
| `overview/getting-started.md` | New | Quick start for different user personas |
| `zrchain/dmpc/secure-enclaves.md` | Litepaper Section 2 | TEE/enclave security details |
| `zrchain/consensus/oracle-system.md` | Litepaper Section 2 | Enshrined oracle, vote extensions |
| `zrchain/workspaces.md` | Litepaper Section 2 | Detailed workspace documentation |
| `zenbtc/yield-mechanism.md` | Litepaper Section 4 | EigenLayer integration, yield generation |
| `rock-token/protocol-revenue.md` | Litepaper Section 8 | Fee structures, protocol revenue flows |
| `rock-token/allocation.md` | Litepaper Section 13 | Fixed supply breakdown, vesting |
| `developers/build-on-zrchain.md` | Litepaper Section 14 | Developer onboarding guide |
| `resources/roadmap.md` | Litepaper Section 16 | What's Next, future plans |

### Priority 3 (Nice to Have)

| File | Source | Content Summary |
|------|--------|-----------------|
| `zrchain/consensus/cometbft.md` | Technical docs | Consensus mechanism details |
| `dct/supply-invariants.md` | Expand from technical | Deep dive on accounting invariants |
| `zenbtc/exchange-rate.md` | Extract from technical | Exchange rate mechanism |
| `developers/cosmwasm.md` | New | CosmWasm contract development |
| `developers/api-reference.md` | New | API documentation |
| `resources/zenrock-labs.md` | Litepaper Section 10 | Role of Zenrock Labs |
| `resources/glossary.md` | New | Terms and definitions |

---

## Files to Delete

**No files should be deleted.** All existing content is valuable and will be migrated to new locations.

The following directories will become obsolete after migration and can be removed once migration is verified complete:

- `introduction/` (content migrated to `index.md` and `zrchain/`)
- `bridging-rock/` (content migrated to `zentp/guides/`)
- `testnet-guides/` (content migrated to `guides/testnet/`)

---

## Migration Order (Phased Approach)

### Phase 1: Core Structure (Week 1)

**Objective**: Establish new folder structure and migrate existing content without breaking links.

1. Create all new directories and `_category_.json` files
2. Migrate core pages (maintains existing URLs with redirects):
   - `index.md` (from `introduction/introduction.md`)
   - All zrChain documentation
   - DCT documentation
   - zenBTC documentation
   - zenZEC documentation
   - Hush documentation
   - zenTP documentation
3. Update internal links in migrated files
4. Test all migrated pages

### Phase 2: $ROCK Token Section (Week 2)

**Objective**: Create the most significant new content - the $ROCK token documentation.

1. Create `rock-token/overview.md`
2. Create `rock-token/tokenomics.md`
3. Create `rock-token/staking.md`
4. Create `rock-token/protocol-revenue.md`
5. Create `rock-token/allocation.md`

### Phase 3: Developer & Overview Content (Week 3)

**Objective**: Complete remaining new content and developer resources.

1. Create `overview/welcome.md`
2. Create `overview/getting-started.md`
3. Create `developers/build-on-zrchain.md`
4. Create `developers/cosmwasm.md`
5. Create `zrchain/dmpc/secure-enclaves.md`
6. Create `zrchain/consensus/oracle-system.md`

### Phase 4: Polish & Cleanup (Week 4)

**Objective**: Finalize documentation, remove legacy structure.

1. Create Priority 3 files (as time permits)
2. Update all cross-references
3. Verify all images and assets are properly linked
4. Remove legacy directories
5. Update `sidebars.ts` to explicit configuration
6. Full documentation review

---

## Potential Issues/Risks

### Technical Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken internal links | High | Create comprehensive link audit before migration |
| Image path changes | Medium | Use relative paths; verify all images after migration |
| Search index invalidation | Low | Rebuild search index after migration |
| SEO impact from URL changes | Medium | Implement redirects for critical pages |

### Content Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Litepaper content drift | Medium | Reference specific litepaper version |
| Duplicate content across files | Low | Establish canonical source for each topic |
| Missing technical details | Medium | Review with engineering team |

### Process Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Extended timeline | Medium | Phase approach allows partial deployment |
| Resource constraints | Medium | Priority system ensures critical content first |
| Scope creep | High | Strict adherence to migration plan |

---

## Sidebar Configuration (docusaurus sidebars.ts)

Replace the auto-generated sidebar with explicit configuration:

```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome to Zenrock',
    },
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'overview/welcome',
        'overview/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'zrChain',
      collapsed: false,
      items: [
        'zrchain/introduction',
        'zrchain/architecture',
        {
          type: 'category',
          label: 'dMPC',
          items: [
            'zrchain/dmpc/overview',
            'zrchain/dmpc/secure-enclaves',
          ],
        },
        {
          type: 'category',
          label: 'Modules',
          items: [
            'zrchain/modules/identity',
            'zrchain/modules/treasury',
            'zrchain/modules/policy',
            'zrchain/modules/validation',
          ],
        },
        {
          type: 'category',
          label: 'Consensus',
          items: [
            'zrchain/consensus/cometbft',
            'zrchain/consensus/oracle-system',
          ],
        },
        'zrchain/workspaces',
        {
          type: 'category',
          label: 'MPC Request Types',
          items: [
            'zrchain/processes/key-requests',
            'zrchain/processes/sign-requests',
            'zrchain/processes/tx-requests',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'DCT Framework',
      items: [
        'dct/introduction',
        'dct/technical',
        'dct/supply-invariants',
      ],
    },
    {
      type: 'category',
      label: 'zenBTC',
      items: [
        'zenbtc/introduction',
        'zenbtc/technical',
        'zenbtc/yield-mechanism',
        'zenbtc/exchange-rate',
      ],
    },
    {
      type: 'category',
      label: 'zenZEC',
      items: [
        'zenzec/introduction',
        'zenzec/technical',
      ],
    },
    {
      type: 'category',
      label: 'Hush Protocol',
      items: [
        'hush/introduction',
        'hush/technical',
        'hush/user-guide',
      ],
    },
    {
      type: 'category',
      label: '$ROCK Token',
      items: [
        'rock-token/overview',
        'rock-token/tokenomics',
        'rock-token/staking',
        'rock-token/protocol-revenue',
        'rock-token/allocation',
      ],
    },
    {
      type: 'category',
      label: 'zenTP',
      items: [
        'zentp/introduction',
        'zentp/technical',
        {
          type: 'category',
          label: 'Bridge Guides',
          items: [
            'zentp/guides/solana-setup',
            'zentp/guides/solana-to-zenrock',
            'zentp/guides/zenrock-to-solana',
            'zentp/guides/solana-troubleshooting',
            'zentp/guides/sei-setup',
            'zentp/guides/sei-to-zenrock',
            'zentp/guides/zenrock-to-sei',
            'zentp/guides/sei-troubleshooting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'developers/build-on-zrchain',
        'developers/cosmwasm',
        'developers/cross-chain',
        'developers/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Testnet',
          items: [
            'guides/testnet/welcome',
            'guides/testnet/setup',
            'guides/testnet/zenrock-guide',
            {
              type: 'category',
              label: 'Ethereum Integration',
              items: [
                'guides/testnet/ethereum/wallet-connect',
                'guides/testnet/ethereum/personal-sign',
                'guides/testnet/ethereum/uniswap',
                'guides/testnet/ethereum/policy-swap',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/faq',
        'resources/roadmap',
        'resources/zenrock-labs',
        'resources/glossary',
      ],
    },
  ],
};

export default sidebars;
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total files in new structure | 58 |
| Files to migrate (existing) | 38 |
| New files to create | 20 |
| P1 new files | 3 |
| P2 new files | 10 |
| P3 new files | 7 |
| Directories to create | 18 |
| Legacy directories to remove | 3 |
| Estimated effort | 4 weeks |

---

## Next Steps

1. **Review**: This plan should be reviewed by stakeholders for approval
2. **Litepaper Access**: Obtain the official litepaper document for content extraction
3. **Resource Allocation**: Assign writers for new content creation
4. **Begin Phase 1**: Start with directory structure and file migrations
5. **Set Up Tracking**: Create implementation tracking tickets

---

Path mapped with precision. -- Atlas
