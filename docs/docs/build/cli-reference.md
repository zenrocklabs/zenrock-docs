---
title: CLI Workflows
sidebar_label: CLI Workflows
sidebar_position: 5
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
