---
title: zenrockd CLI Reference
sidebar_label: zenrockd CLI
sidebar_position: 2
---

# zenrockd CLI Reference

The `zenrockd` binary is the command-line interface for interacting with zrChain. This reference covers installation, configuration, and comprehensive command documentation.

## Installation

### Binary Download

Download the latest `zenrockd` binary for your platform from the official Zenrock releases:

```bash
# Linux (amd64)
curl -LO https://releases.zenrocklabs.io/zenrockd-linux-amd64
chmod +x zenrockd-linux-amd64
sudo mv zenrockd-linux-amd64 /usr/local/bin/zenrockd

# Linux (arm64)
curl -LO https://releases.zenrocklabs.io/zenrockd-linux-arm64
chmod +x zenrockd-linux-arm64
sudo mv zenrockd-linux-arm64 /usr/local/bin/zenrockd

# macOS (amd64)
curl -LO https://releases.zenrocklabs.io/zenrockd-darwin-amd64
chmod +x zenrockd-darwin-amd64
sudo mv zenrockd-darwin-amd64 /usr/local/bin/zenrockd

# macOS (arm64 / Apple Silicon)
curl -LO https://releases.zenrocklabs.io/zenrockd-darwin-arm64
chmod +x zenrockd-darwin-arm64
sudo mv zenrockd-darwin-arm64 /usr/local/bin/zenrockd
```

### Verify Installation

```bash
zenrockd version
```

:::note
The zenrockd source code is not publicly available. Only pre-compiled binaries are distributed.
:::

## Network Configuration

zrChain operates across three networks. Configure your CLI to connect to the appropriate network for your use case.

### Mainnet (diamond-1)

Production network for live transactions and real assets.

| Parameter | Value |
|-----------|-------|
| Chain ID | `diamond-1` |
| RPC Endpoint | `https://rpc.diamond.zenrocklabs.io` |
| REST API | `https://api.diamond.zenrocklabs.io` |
| Token Denom | `urock` |

```bash
# Configure for mainnet
zenrockd config chain-id diamond-1
zenrockd config node https://rpc.diamond.zenrocklabs.io:443
```

### Testnet (gardia-9)

Public testnet for development and testing with test tokens.

| Parameter | Value |
|-----------|-------|
| Chain ID | `gardia-9` |
| RPC Endpoint | `https://rpc.gardia.zenrocklabs.io` |
| REST API | `https://api.gardia.zenrocklabs.io` |
| Token Denom | `urock` |

```bash
# Configure for testnet
zenrockd config chain-id gardia-9
zenrockd config node https://rpc.gardia.zenrocklabs.io:443
```

### Devnet (amber-1)

Internal development network for early-stage testing.

| Parameter | Value |
|-----------|-------|
| Chain ID | `amber-1` |
| RPC Endpoint | `https://rpc.dev.zenrock.tech` |
| REST API | `https://api.dev.zenrock.tech` |
| Token Denom | `urock` |

```bash
# Configure for devnet
zenrockd config chain-id amber-1
zenrockd config node https://rpc.dev.zenrock.tech:443
```

### Shell Alias Setup

For convenience, create an alias with your preferred network:

```bash
# Add to ~/.bashrc or ~/.zshrc
alias zenrockd="zenrockd --chain-id=gardia-9 --node=https://rpc.gardia.zenrocklabs.io:443"
```

## Core Commands

### init

Initialize a new node configuration.

```bash
zenrockd init <moniker> --chain-id <chain-id>
```

**Example:**
```bash
zenrockd init my-node --chain-id gardia-9
```

### start

Start the node daemon.

```bash
zenrockd start
```

**Common flags:**
- `--home` - Specify node home directory
- `--pruning` - Pruning strategy (default, nothing, everything)
- `--minimum-gas-prices` - Minimum gas prices to accept

### status

Check the status of a connected node.

```bash
zenrockd status --node https://rpc.gardia.zenrocklabs.io:443
```

**Output includes:**
- Node info (network, version, moniker)
- Sync info (latest block height, catching up status)
- Validator info (address, voting power)

### version

Display the zenrockd version.

```bash
zenrockd version

# Detailed version info
zenrockd version --long
```

### keys

Manage local keys. See [Key Management](#key-management) section for detailed usage.

```bash
zenrockd keys --help
```

### query (q)

Query blockchain state. See [Module Queries](#module-queries) for all available queries.

```bash
zenrockd query --help
# or shorthand
zenrockd q --help
```

### tx

Create and broadcast transactions. See [Transaction Flags](#transaction-flags) for common options.

```bash
zenrockd tx --help
```

## Key Management

### Create a New Key

```bash
zenrockd keys add <key-name>
```

**Example:**
```bash
zenrockd keys add alice
```

:::caution
Save the mnemonic phrase securely. It is the only way to recover your key.
:::

### Import from Mnemonic

```bash
zenrockd keys add <key-name> --recover
```

You will be prompted to enter your mnemonic phrase.

### List All Keys

```bash
zenrockd keys list
```

### Show Key Details

```bash
zenrockd keys show <key-name>

# Show address only
zenrockd keys show <key-name> -a

# Show public key
zenrockd keys show <key-name> --pubkey
```

### Delete a Key

```bash
zenrockd keys delete <key-name>
```

### Export Key

```bash
# Export encrypted private key
zenrockd keys export <key-name>

# Export unencrypted (use with caution)
zenrockd keys export <key-name> --unarmored-hex --unsafe
```

## Module Queries

### zenbtc Module

Query zenBTC-related state including minting, burning, and supply information.

```bash
# Get pending mint transactions
zenrockd q zenbtc pending-mint-transactions

# Get burn events
zenrockd q zenbtc burn-events

# Get redemption requests
zenrockd q zenbtc redemptions

# Get current zenBTC supply
zenrockd q zenbtc supply

# Get module parameters
zenrockd q zenbtc params
```

### identity Module

Query workspaces and keyrings.

```bash
# List all workspaces
zenrockd q identity workspaces

# Get workspace by address
zenrockd q identity workspace-by-address <workspace-address>

# List all keyrings
zenrockd q identity keyrings

# Get keyring by address
zenrockd q identity keyring-by-address <keyring-address>
```

**Example:**
```bash
zenrockd q identity workspace-by-address workspace14a2hpadpsy9h4auve2z8lw
```

### treasury Module

Query keys, key requests, signature requests, and wallet information.

```bash
# List all keys
zenrockd q treasury keys

# Get key by ID
zenrockd q treasury key-by-id <key-id>

# List key requests (optionally filter by keyring)
zenrockd q treasury key-requests
zenrockd q treasury key-requests --keyring-addr <keyring-addr>

# List signature requests (optionally filter by keyring)
zenrockd q treasury signature-requests
zenrockd q treasury signature-requests --keyring-addr <keyring-addr>

# List zenBTC wallets
zenrockd q treasury zenbtc-wallets

# List DCT wallets
zenrockd q treasury dct-wallets
```

**Example:**
```bash
zenrockd q treasury key-requests --keyring-addr keyring1pfnq7r04rept47gaf5cpdew2
```

### hush Module

Query Hush protocol state for private transactions.

```bash
# Get current Merkle root
zenrockd q hush merkle-root

# Get Merkle tree state
zenrockd q hush merkle-tree-state

# Check if nullifier is spent
zenrockd q hush nullifier-spent <nullifier>

# Get voucher information
zenrockd q hush voucher <voucher-id>

# Get shielded supply
zenrockd q hush supply

# Get module parameters
zenrockd q hush params
```

### policy Module

Query policies and pending actions.

```bash
# List all policies
zenrockd q policy policies

# Get policy by ID
zenrockd q policy policy-by-id <policy-id>

# List all pending actions
zenrockd q policy actions

# Get action details by ID
zenrockd q policy action-details-by-id <action-id>
```

**Example:**
```bash
zenrockd q policy policy-by-id 1
```

### validation Module

Query validator and staking information.

```bash
# List all validators
zenrockd q validation validators

# Get specific validator
zenrockd q validation validator <validator-address>

# Get delegations for a delegator
zenrockd q validation delegations <delegator-address>

# Get staking pool information
zenrockd q validation pool

# Get validation module parameters
zenrockd q validation params
```

**Example:**
```bash
zenrockd q validation validator zenvaloper1abc123...
```

### bank Module

Query account balances and token supply.

```bash
# Get all balances for an address
zenrockd q bank balances <address>

# Get total supply
zenrockd q bank total

# Get total supply of specific denom
zenrockd q bank total --denom urock
```

**Example:**
```bash
zenrockd q bank balances zen1abc123def456...
```

## Transaction Flags

Common flags used with transaction commands:

| Flag | Description | Example |
|------|-------------|---------|
| `--from` | Key name or address to sign with | `--from alice` |
| `--gas` | Gas limit | `--gas auto` |
| `--gas-prices` | Gas price | `--gas-prices 0.0001urock` |
| `--gas-adjustment` | Adjustment factor for gas estimation | `--gas-adjustment 1.5` |
| `--yes` | Skip confirmation prompt | `--yes` |
| `--broadcast-mode` | Transaction broadcast mode | `--broadcast-mode sync` |
| `--chain-id` | Chain ID | `--chain-id gardia-9` |
| `--node` | RPC endpoint | `--node https://rpc.gardia.zenrocklabs.io:443` |
| `--fees` | Fees to pay | `--fees 1000urock` |
| `--dry-run` | Simulate transaction without broadcasting | `--dry-run` |
| `--generate-only` | Generate unsigned transaction | `--generate-only` |

**Common variable setup:**
```bash
export FROM="--from=alice"
export GAS="--gas-prices=0.0001urock"
export CHAIN="--chain-id=gardia-9"
export NODE="--node=https://rpc.gardia.zenrocklabs.io:443"
```

## Common Workflows

### Create a Workspace

A workspace is a container for managing keys and policies.

```bash
# Create workspace with default policies
zenrockd tx identity new-workspace \
  --admin-policy-id 0 \
  --sign-policy-id 0 \
  --from alice --yes --gas-prices 0.0001urock

# Create workspace with custom policies and additional owners
zenrockd tx identity new-workspace \
  --admin-policy-id 1 \
  --sign-policy-id 2 \
  --additional-owners zen1owner2...,zen1owner3... \
  --from alice --yes --gas-prices 0.0001urock
```

### Create a Policy

Define custom approval rules using BoolParser syntax.

```bash
# Define a 2-of-2 multisig policy
export POLICY_PAYLOAD=$(cat <<EOF
{
    "@type":"/zrchain.policy.BoolparserPolicy",
    "definition": "u1 + u2 > 1",
    "participants": [
        {
            "abbreviation": "u1",
            "address": "zen1alice..."
        },
        {
            "abbreviation": "u2",
            "address": "zen1bob..."
        }
    ]
}
EOF
)

# Create the policy
zenrockd tx policy new-policy "My 2-of-2 Policy" "$POLICY_PAYLOAD" \
  --from alice --yes --gas-prices 0.0001urock
```

### Request a New Key

Request the keyring to generate a new cryptographic key.

```bash
# Request an ECDSA key
zenrockd tx treasury new-key-request \
  <workspace-addr> \
  <keyring-addr> \
  ecdsa \
  1000 \
  --from alice --yes --gas-prices 0.0001urock

# Key types: ecdsa, eddsa, bitcoin
# 1000 = blocks-to-live (timeout)
```

**Example:**
```bash
zenrockd tx treasury new-key-request \
  workspace14a2hpadpsy9h4auve2z8lw \
  keyring1pfnq7r04rept47gaf5cpdew2 \
  ecdsa \
  1000 \
  --from alice --yes --gas-prices 0.0001urock
```

### Request a Signature

Request a signature for data using an existing key.

```bash
# Sign a hash (hex-encoded 32-byte data)
zenrockd tx treasury new-signature-request \
  <key-id> \
  <hex-data-to-sign> \
  1000 \
  --from alice --yes --gas-prices 0.0001urock
```

**Example:**
```bash
zenrockd tx treasury new-signature-request \
  0 \
  778f572f33afab831365d52e563a0ddd778f572f33afab831365d52e563a0ddd \
  1000 \
  --from alice --yes --gas-prices 0.0001urock
```

### Approve a Pending Action

When a policy requires multiple approvals, participants must approve actions.

```bash
# List pending actions
zenrockd q policy actions

# Approve an action
zenrockd tx policy approve-action \
  "<action-type>" \
  <action-id> \
  --from bob --yes --gas-prices 0.0001urock
```

**Example:**
```bash
zenrockd tx policy approve-action \
  "zrchain.treasury.MsgNewKeyRequest" \
  42 \
  --from bob --yes --gas-prices 0.0001urock
```

### Set Up Authorization Grants (authz)

Allow another account to execute transactions on your behalf.

```bash
# Grant permission for specific message types
zenrockd tx policy add-multi-grant \
  <grantee-address> \
  <msg-types> \
  --from <granter> --yes --gas-prices 0.0001urock
```

**Example:**
```bash
zenrockd tx policy add-multi-grant \
  zen17ekx844yl3ftmcl47ryc7fz5cd7uhxq4f5ma5q \
  /zrchain.policy.MsgApproveAction,/zrchain.policy.MsgRevokeAction \
  --from bob --yes --gas-prices 0.0001urock

# Verify the grant was created
zenrockd q authz grants-by-grantee zen17ekx844yl3ftmcl47ryc7fz5cd7uhxq4f5ma5q
```

### Execute Transaction via authz

Execute a transaction using a granted authorization.

```bash
# Generate the transaction file
zenrockd tx policy approve-action \
  "zrchain.treasury.MsgNewKeyRequest" \
  42 \
  --from <granter-address> \
  --generate-only > tx.json

# Execute with grantee credentials
zenrockd tx authz exec tx.json \
  --from <grantee> --yes --gas-prices 0.0001urock
```

### Stake ROCK Tokens

Delegate tokens to a validator.

```bash
# Delegate to a validator
zenrockd tx staking delegate \
  <validator-address> \
  <amount>urock \
  --from alice --yes --gas-prices 0.0001urock
```

**Example:**
```bash
zenrockd tx staking delegate \
  zenvaloper1abc123... \
  1000000urock \
  --from alice --yes --gas-prices 0.0001urock
```

### Send Tokens

Transfer tokens between accounts.

```bash
zenrockd tx bank send \
  <from-address> \
  <to-address> \
  <amount>urock \
  --from alice --yes --gas-prices 0.0001urock
```

**Example:**
```bash
zenrockd tx bank send \
  zen1alice... \
  zen1bob... \
  100000urock \
  --from alice --yes --gas-prices 0.0001urock
```

## Troubleshooting

### Connection Issues

```bash
# Test RPC connection
zenrockd status --node https://rpc.gardia.zenrocklabs.io:443

# Check if node is synced
zenrockd q block --node https://rpc.gardia.zenrocklabs.io:443
```

### Gas Estimation Errors

```bash
# Use auto gas with adjustment
zenrockd tx ... --gas auto --gas-adjustment 1.5 --gas-prices 0.0001urock
```

### Key Not Found

```bash
# List available keys
zenrockd keys list

# Check keyring backend
zenrockd keys list --keyring-backend os
zenrockd keys list --keyring-backend file
zenrockd keys list --keyring-backend test
```

## Additional Resources

- [Testnet Setup Guide](../testnet-guides/zrchain_gardia_testnet/setup.md)
- [Policy Configuration](../testnet-guides/zrchain_gardia_testnet/explore-ethereum/policy-swap.md)
- [Validator Setup](https://github.com/zenrocklabs/zenrock-validators)
