# Fix Plan: Developer Onboarding Documentation

**Source Audit**: `/Users/peyton/code/zenrock/zenrock-docs/docs/audits/2026-01-29-docs-accuracy-audit/wave-1/05-developer-onboarding.md`

**Planner**: Planner-DevOnboarding

**Date**: 2026-01-29

---

```yaml
---
workers_recommended: 2
total_files: 6
total_findings: 9
critical: 1, high: 3, medium: 4, low: 2
---
```

---

## Work Package 1: Critical and High Priority Fixes

**Scope**: FAQ accuracy, URL clarification, step numbering, broken links

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/welcome.md`

---

### Finding 1: CosmWasm Version Incorrect

- **ID**: DEV-001
- **Severity**: CRITICAL
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md:28`
- **Current**:
```markdown
Yes, we are supporting CosmWasm for smart contract interaction. We are currently using ```v0.51.0```.
```
- **Fixed**:
```markdown
Yes, we are supporting CosmWasm for smart contract interaction. We are currently using `v0.53.4`.
```
- **Verification**:
  1. Confirm version matches `zenrock/zrchain/go.mod` line 44: `github.com/CosmWasm/wasmd v0.53.4`
  2. Run documentation build to ensure no errors

---

### Finding 2: Inconsistent Frontend URLs

- **ID**: DEV-002
- **Severity**: HIGH
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md:14-24`
- **Current**:
```markdown
### What are the relevant links for Zenrock?

- UI Frontend: [https://app.zenrocklabs.io](https://app.zenrocklabs.io)
- RPC Node: [https://rpc.diamond.zenrocklabs.io](https://rpc.diamond.zenrocklabs.io)
- Testnet Faucet: [https://faucet.gardia.zenrocklabs.io](https://faucet.gardia.zenrocklabs.io)
- API: [https://api.diamond.zenrocklabs.io](https://api.diamond.zenrocklabs.io)

You can find our Big Dipper explorer here:

- [Testnet](https://explorer.gardia.zenrocklabs.io)
- [Mainnet](https://explorer.diamond.zenrocklabs.io)
```
- **Fixed**:
```markdown
### What are the relevant links for Zenrock?

**Mainnet (Diamond):**
- UI Frontend: [https://app.zenrocklabs.io](https://app.zenrocklabs.io)
- RPC Node: [https://rpc.diamond.zenrocklabs.io](https://rpc.diamond.zenrocklabs.io)
- API: [https://api.diamond.zenrocklabs.io](https://api.diamond.zenrocklabs.io)
- Explorer: [https://explorer.diamond.zenrocklabs.io](https://explorer.diamond.zenrocklabs.io)

**Testnet (Gardia):**
- UI Frontend: [https://gardia.zenrocklabs.io](https://gardia.zenrocklabs.io)
- RPC Node: [https://rpc.gardia.zenrocklabs.io](https://rpc.gardia.zenrocklabs.io)
- API: [https://api.gardia.zenrocklabs.io](https://api.gardia.zenrocklabs.io)
- Faucet: [https://faucet.gardia.zenrocklabs.io](https://faucet.gardia.zenrocklabs.io)
- Explorer: [https://explorer.gardia.zenrocklabs.io](https://explorer.gardia.zenrocklabs.io)
```
- **Verification**:
  1. Verify URLs are accessible via curl or browser
  2. Confirm testnet and mainnet are clearly distinguished

---

### Finding 3: Missing Node/Validator Documentation Reference

- **ID**: DEV-003
- **Severity**: HIGH
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md` (new content to add)
- **Current**: No node/validator documentation exists
- **Fixed**: Add the following FAQ entry after the smart contracts question:

```markdown
### How do I run a validator node?

Validator setup is documented in the official Zenrock Validators repository. This includes:

- Key generation (ECDSA, BLS, CometBFT)
- Kubernetes deployment via Helm charts
- Hardware requirements and configuration
- Validator registration for testnet (Gardia) and mainnet (Diamond)

**Repository**: [https://github.com/zenrocklabs/zenrock-validators](https://github.com/zenrocklabs/zenrock-validators)

For additional support, join our [Discord](https://discord.gg/zenrock) and visit the validator-support channel.
```
- **Verification**:
  1. Confirm the GitHub repository link is accessible
  2. Documentation build succeeds

---

### Finding 4: Duplicate Step Numbering

- **ID**: DEV-006
- **Severity**: MEDIUM
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md:55`
- **Current**:
```markdown
### 4. Check your workspaces
```
- **Fixed**:
```markdown
### 5. Check your Workspaces
```
- **Verification**:
  1. Confirm step numbering is sequential: 1, 2, 3, 4, 5
  2. Review rendered documentation to ensure proper flow

---

### Finding 5: Broken Link in Welcome Page

- **ID**: DEV-007
- **Severity**: MEDIUM
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/welcome.md:13`
- **Current**:
```markdown
- [Ethereum Guide](explore-ethereum/_category_.json)
```
- **Fixed**:
```markdown
- [Ethereum Guide](explore-ethereum/walletConnect.md)
```
- **Verification**:
  1. Click the link in the rendered documentation
  2. Confirm it navigates to the WalletConnect guide (first page in Ethereum section)

---

### Finding 6: Typo "the the"

- **ID**: DEV-008
- **Severity**: LOW
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md:65`
- **Current**:
```markdown
Click on the workspace to open it and see the key that you just created. You can also the the derived addresses for the key and their balance.
```
- **Fixed**:
```markdown
Click on the workspace to open it and see the key that you just created. You can also see the derived addresses for the key and their balance.
```
- **Verification**:
  1. Search for "the the" pattern in documentation
  2. Confirm no duplicate words remain

---

### Finding 7: Typo "increasind"

- **ID**: DEV-009
- **Severity**: LOW
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/explore-ethereum/policy-swap.md:43`
- **Current**:
```markdown
In the next step chose the participants from the workspace and select which should be part of the policy. In the case following this guide, we want both parties to approve a request, therefore, both participants are added. Also increasind the counter to 2 indicates that both parties need to approve under this policy.
```
- **Fixed**:
```markdown
In the next step choose the participants from the workspace and select which should be part of the policy. In the case following this guide, we want both parties to approve a request, therefore, both participants are added. Also increasing the counter to 2 indicates that both parties need to approve under this policy.
```
- **Verification**:
  1. Search for "increasind" pattern
  2. Note: Also fixing "chose" -> "choose" for grammar

---

## Work Package 2: New Documentation Content

**Scope**: CLI documentation extraction, developer FAQ additions

**Files**:
- New file: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/build/cli-reference.md`
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md`

---

### Finding 8: Missing CLI Documentation

- **ID**: DEV-004
- **Severity**: MEDIUM
- **Location**: New file required at `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/build/cli-reference.md`
- **Current**: No CLI documentation exists in public docs
- **Fixed**: Create new file with content extracted and adapted from `/Users/peyton/code/zenrock/zenrock/GUIDE.md`:

```markdown
---
title: CLI Reference
sidebar_label: CLI Reference
sidebar_position: 3
---

# Zenrock CLI Guide

This document provides a reference for using the `zenrockd` CLI to interact with zrChain directly.

## Setup

### Alias Configuration

Setting up an alias simplifies command execution:

```bash
alias zenrockd="zenrockd --chain-id=zenrock"
```

### Common Variables

```bash
FROM="--from=<your-wallet-name>"
GAS="--gas-prices=0.0001urock"
```

## Queries

### Workspaces

```bash
# Display all workspaces
zenrockd q identity workspaces

# Display specific workspace
zenrockd q identity workspace <workspace-id>
```

### Keyrings

```bash
# Display all keyrings
zenrockd q identity keyrings
```

### Keys

```bash
# Display all keys
zenrockd q treasury keys

# Display keys for a specific workspace
zenrockd q treasury keys <workspace-id>
```

### Key Requests

```bash
# Display key requests for a keyring
zenrockd q treasury key-requests --keyring-addr <keyring-addr>
```

### Signature Requests

```bash
# Display signature requests for a keyring
zenrockd q treasury signature-requests --keyring-addr <keyring-addr>
```

## Transactions

### Create Keys

```bash
# Create a new key request
zenrockd tx treasury new-key-request <workspace-id> <keyring-addr> <key-type> <btl> --from <wallet> --yes $GAS

# Key types: ecdsa, eddsa, bitcoin
# btl: blocks-to-live (timeout in blocks)
```

**Example:**
```bash
zenrockd tx treasury new-key-request workspace14a2hpadpsy9h4auve2z8lw keyring1pfnq7r04rept47gaf5cpdew2 ecdsa 1000 --from alice --yes --gas-prices 0.0001urock
```

### Create Signatures

```bash
# Create a new signature request
zenrockd tx treasury new-signature-request <key-id> <data-to-sign> <btl> --from <wallet> --yes $GAS
```

**Example:**
```bash
zenrockd tx treasury new-signature-request 0 778f572f33afab831365d52e563a0ddd778f572f33afab831365d52e563a0ddd 1000 --from alice --yes --gas-prices 0.0001urock
```

## Policy Management

### Create Policy

```bash
# Define policy payload
export policy_payload=$(cat <<EOF
{
    "@type":"/zrchain.policy.BoolparserPolicy",
    "definition": "u1 + u2 > 1",
    "participants": [
        {
            "abbreviation": "u1",
            "address": "<address-1>"
        },
        {
            "abbreviation": "u2",
            "address": "<address-2>"
        }
    ]
}
EOF
)

# Create the policy
zenrockd tx policy new-policy <policy-name> "$policy_payload" --from <wallet> --yes $GAS
```

### Query Policies

```bash
# View all pending actions
zenrockd q policy actions
```

### Approve Actions

```bash
# Approve a pending action
zenrockd tx policy approve-action "<action-type>" <action-id> --from <wallet> --yes $GAS
```

## Workspace Management

### Create Workspace

```bash
zenrockd tx identity new-workspace \
  --admin-policy-id <policy-id> \
  --sign-policy-id <policy-id> \
  --additional-owners <owner-address> \
  --from <wallet> --yes $GAS
```

## Authorization Grants (authz)

authz allows other users to sign and broadcast transactions on your behalf.

### Add Multi-Grant

```bash
zenrockd tx policy add-multi-grant <grantee-address> <msg-types> --from <wallet> --yes $GAS
```

**Example:**
```bash
zenrockd tx policy add-multi-grant zen17ekx844yl3ftmcl47ryc7fz5cd7uhxq4f5ma5q \
  /zrchain.policy.MsgApproveAction,/zrchain.policy.MsgRevokeAction \
  --from bob --yes --gas-prices 0.0001urock
```

### Verify Grants

```bash
zenrockd q authz grants-by-grantee <grantee-address>
```

### Execute Granted Transaction

```bash
# Generate transaction file
zenrockd tx policy approve-action "<action-type>" <action-id> --from <granter> --generate-only > tx.json

# Execute with grantee
zenrockd tx authz exec tx.json --from <grantee> --yes $GAS
```

## Additional Resources

- For passkey setup and advanced authentication, see the [Policy Guide](../testnet-guides/zrchain_gardia_testnet/explore-ethereum/policy-swap.md)
- For node operation, see [Validator Setup](https://github.com/zenrocklabs/zenrock-validators)
```
- **Verification**:
  1. Build documentation and verify new page renders
  2. Verify all command examples are syntactically correct
  3. Confirm sidebar navigation includes CLI Reference

---

### Finding 9: Developer FAQ Section Missing

- **ID**: DEV-011
- **Severity**: INFO (implementing as MEDIUM for completeness)
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md` (append to end)
- **Current**: FAQ lacks developer-focused questions
- **Fixed**: Append the following section to the FAQ:

```markdown

## Developer FAQ

### What are the gas costs on zrChain?

Gas prices on zrChain are denominated in `urock` (micro-ROCK). The standard gas price is `0.0001urock`. Typical transaction costs:

- Simple transfers: ~100,000 gas
- Key requests: ~200,000 gas
- Signature requests: ~150,000 gas

### How do I deploy a CosmWasm contract?

zrChain supports CosmWasm smart contracts. To deploy:

1. Compile your Rust contract to WASM
2. Upload the WASM binary using `zenrockd tx wasm store`
3. Instantiate with `zenrockd tx wasm instantiate`

For detailed instructions, refer to the [CosmWasm documentation](https://docs.cosmwasm.com/).

### How do I test locally?

For local development:

```bash
cd zenrock/zrchain
./init.sh --localnet 1
```

This starts a local validator with sample data. See the [CLI Reference](./build/cli-reference.md) for command examples.

### What SDKs are available?

- **CosmJS**: JavaScript/TypeScript SDK for Cosmos chains
- **cosmrs**: Rust SDK for Cosmos chains
- **zenrockd CLI**: Direct command-line interface

TypeScript examples are available in the internal codebase for building custom integrations.
```
- **Verification**:
  1. Documentation builds successfully
  2. FAQ section is accessible and formatted correctly

---

## Work Package 3: Prerequisites Enhancement (Optional)

**Scope**: Enhanced setup guidance

**Files**:
- `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/setup.md`

---

### Finding 10: Prerequisites Not Clearly Listed

- **ID**: DEV-005
- **Severity**: MEDIUM
- **Location**: `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/setup.md:7`
- **Current**:
```markdown
Here you can find the necessary steps to set up your wallets and fund your account.

### Install Wallet
```
- **Fixed**: Insert prerequisites section before "Install Wallet":
```markdown
Here you can find the necessary steps to set up your wallets and fund your account.

## Prerequisites

Before starting, ensure you have:

- **Browser**: Chrome, Firefox, Brave, or Edge (latest version recommended)
- **Wallet Extension**: [Keplr](https://www.keplr.app/) v0.12+ or [Leap Wallet](https://www.leapwallet.io/) v0.4+
- **Network**: Stable internet connection
- **Discord Account**: Required to access the [Zenrock Discord](https://discord.gg/zenrock) for the testnet faucet

### Install Wallet
```
- **Verification**:
  1. Prerequisites section renders correctly
  2. All links are functional

---

## Summary Checklist

### Critical Priority
- [ ] DEV-001: Fix CosmWasm version (v0.51.0 -> v0.53.4)

### High Priority
- [ ] DEV-002: Clarify testnet vs mainnet URLs in FAQ
- [ ] DEV-003: Add node/validator documentation reference

### Medium Priority
- [ ] DEV-004: Create CLI reference documentation
- [ ] DEV-005: Add prerequisites section to setup guide
- [ ] DEV-006: Fix duplicate step numbering (4 -> 5)
- [ ] DEV-007: Fix broken category link in welcome.md

### Low Priority
- [ ] DEV-008: Fix "the the" typo
- [ ] DEV-009: Fix "increasind" typo

### Optional Enhancements
- [ ] DEV-011: Add developer FAQ section

---

## Files Modified Summary

| File | Changes |
|------|---------|
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/faq.md` | CosmWasm version, URL clarification, validator reference, developer FAQ |
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/zenrock-guide.md` | Step numbering, typo fix |
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/welcome.md` | Broken link fix |
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/setup.md` | Prerequisites section |
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/testnet-guides/zrchain_gardia_testnet/explore-ethereum/policy-swap.md` | Typo fix |
| `/Users/peyton/code/zenrock/zenrock-docs/docs/docs/build/cli-reference.md` | NEW FILE - CLI documentation |

---

## Execution Notes

1. **Worker 1** should handle Work Package 1 (all direct edits to existing files)
2. **Worker 2** should handle Work Package 2 (new CLI documentation and developer FAQ)
3. Work Package 3 can be done by either worker as time permits
4. All changes should be verified by building the documentation locally with `bun run build`
5. The CLI documentation should be reviewed against the source `/Users/peyton/code/zenrock/zenrock/GUIDE.md` to ensure accuracy
