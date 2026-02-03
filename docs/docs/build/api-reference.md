---
title: API Reference
sidebar_label: API Reference
sidebar_position: 3
---

# zrChain API Reference

zrChain exposes three API interfaces for querying chain state and submitting transactions: REST API, gRPC, and JSON-RPC (Tendermint RPC). This guide provides practical examples for each method.

## Network Endpoints

| Network | REST API | gRPC | JSON-RPC (Tendermint) |
|---------|----------|------|----------------------|
| **Mainnet** | `https://api.diamond.zenrocklabs.io` | `grpc.diamond.zenrocklabs.io:9090` | `https://rpc.diamond.zenrocklabs.io` |
| **Testnet** | `https://api.gardia.zenrocklabs.io` | `grpc.gardia.zenrocklabs.io:9090` | `https://rpc.gardia.zenrocklabs.io` |

---

## REST API

The REST API provides HTTP endpoints for querying chain state. All responses are JSON-formatted.

### Base URL

```
# Mainnet
https://api.diamond.zenrocklabs.io

# Testnet
https://api.gardia.zenrocklabs.io
```

### Core Cosmos Endpoints

#### Query Account Balance

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/cosmos/bank/v1beta1/balances/{address}" \
  -H "Accept: application/json"
```

**Example Response:**
```json
{
  "balances": [
    {
      "denom": "urock",
      "amount": "1000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### Query Staking Delegations

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/cosmos/staking/v1beta1/delegations/{delegator_address}"
```

### Identity Module

#### List All Workspaces

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/identity/workspaces"
```

**Example Response:**
```json
{
  "workspaces": [
    {
      "address": "workspace14a2hpadpsy9h4auve2z8lw",
      "creator": "zen1abc123...",
      "owners": ["zen1abc123...", "zen1def456..."],
      "admin_policy_id": "1",
      "sign_policy_id": "2"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### Get Specific Workspace

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/identity/workspace_by_address?workspace_addr={workspace_address}"
```

#### List Keyrings

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/identity/keyrings"
```

### Treasury Module

#### List All Keys

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/treasury/keys"
```

**Example Response:**
```json
{
  "keys": [
    {
      "id": "1",
      "workspace_addr": "workspace14a2hpadpsy9h4auve2z8lw",
      "keyring_addr": "keyring1pfnq7r04rept47gaf5cpdew2",
      "type": "KEY_TYPE_ECDSA_SECP256K1",
      "public_key": "A1B2C3..."
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "1"
  }
}
```

#### List Keys by Workspace

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/treasury/keys?workspace_addr={workspace_address}"
```

#### Query Key Requests

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/treasury/key_requests?keyring_addr={keyring_address}"
```

#### Query Signature Requests

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/treasury/sign_requests?keyring_addr={keyring_address}"
```

### zenBTC Module

#### Get zenBTC Parameters

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/zenbtc/params"
```

**Example Response:**
```json
{
  "params": {
    "deposit_key_id": "1",
    "withdraw_key_id": "2",
    "change_key_id": "3",
    "mint_fee_bp": "30",
    "burn_fee_bp": "30"
  }
}
```

#### List Pending Mints

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/zenbtc/pending_mints"
```

**Example Response:**
```json
{
  "pending_mints": [
    {
      "chain_id": "bitcoin",
      "tx_id": "abc123...",
      "recipient": "zen1...",
      "amount": "100000000",
      "status": "PENDING"
    }
  ]
}
```

#### Query Redemptions

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/zenbtc/redemptions"
```

### Hush Module (Privacy)

#### Get Hush Parameters

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/hush/params"
```

#### Query Merkle Tree State

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/hush/merkle_tree"
```

**Example Response:**
```json
{
  "root": "0x1a2b3c...",
  "depth": 20,
  "num_leaves": 1024
}
```

#### Check Nullifier Status

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/hush/nullifier/{nullifier_hash}"
```

### Policy Module

#### List Policies

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/policy/policies"
```

#### Query Pending Actions

```bash
curl -X GET "https://api.diamond.zenrocklabs.io/zenrock/policy/actions"
```

---

## JavaScript/TypeScript Examples

### Using fetch (Browser/Node.js)

```typescript
const MAINNET_API = "https://api.diamond.zenrocklabs.io";

// Query account balance
async function getBalance(address: string): Promise<any> {
  const response = await fetch(
    `${MAINNET_API}/cosmos/bank/v1beta1/balances/${address}`
  );
  return response.json();
}

// Get workspace details
async function getWorkspace(workspaceAddr: string): Promise<any> {
  const response = await fetch(
    `${MAINNET_API}/zenrock/identity/workspace_by_address?workspace_addr=${workspaceAddr}`
  );
  return response.json();
}

// Check zenBTC pending mints
async function getPendingMints(): Promise<any> {
  const response = await fetch(`${MAINNET_API}/zenrock/zenbtc/pending_mints`);
  return response.json();
}

// Query Hush merkle state
async function getHushMerkleState(): Promise<any> {
  const response = await fetch(`${MAINNET_API}/zenrock/hush/merkle_tree`);
  return response.json();
}

// Usage
const balance = await getBalance("zen1abc123...");
console.log("Balance:", balance.balances);
```

### Using axios

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.diamond.zenrocklabs.io",
  headers: { "Content-Type": "application/json" },
});

// Query all keys for a workspace
async function getWorkspaceKeys(workspaceAddr: string) {
  const { data } = await api.get("/zenrock/treasury/keys", {
    params: { workspace_addr: workspaceAddr },
  });
  return data.keys;
}

// Get signature request status
async function getSignatureRequest(requestId: string) {
  const { data } = await api.get(`/zenrock/treasury/sign_request/${requestId}`);
  return data;
}
```

---

## gRPC

gRPC provides efficient binary protocol access, ideal for backend services and high-performance applications.

### Connection Details

| Network | Endpoint | Port |
|---------|----------|------|
| Mainnet | `grpc.diamond.zenrocklabs.io` | 9090 |
| Testnet | `grpc.gardia.zenrocklabs.io` | 9090 |

### Go Example

```go
package main

import (
    "context"
    "fmt"
    "log"

    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials"

    banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
    identitytypes "github.com/zenrocklabs/zenrock/x/identity/types"
    treasurytypes "github.com/zenrocklabs/zenrock/x/treasury/types"
    zenbtctypes "github.com/zenrocklabs/zenrock/x/zenbtc/types"
)

func main() {
    // Create gRPC connection with TLS
    creds := credentials.NewClientTLSFromCert(nil, "")
    conn, err := grpc.Dial(
        "grpc.diamond.zenrocklabs.io:9090",
        grpc.WithTransportCredentials(creds),
    )
    if err != nil {
        log.Fatalf("Failed to connect: %v", err)
    }
    defer conn.Close()

    ctx := context.Background()

    // Query bank balance
    bankClient := banktypes.NewQueryClient(conn)
    balanceResp, err := bankClient.AllBalances(ctx, &banktypes.QueryAllBalancesRequest{
        Address: "zen1abc123...",
    })
    if err != nil {
        log.Fatalf("Failed to query balance: %v", err)
    }
    fmt.Printf("Balances: %v\n", balanceResp.Balances)

    // Query workspaces
    identityClient := identitytypes.NewQueryClient(conn)
    workspacesResp, err := identityClient.Workspaces(ctx, &identitytypes.QueryWorkspacesRequest{})
    if err != nil {
        log.Fatalf("Failed to query workspaces: %v", err)
    }
    fmt.Printf("Workspaces: %v\n", workspacesResp.Workspaces)

    // Query treasury keys
    treasuryClient := treasurytypes.NewQueryClient(conn)
    keysResp, err := treasuryClient.Keys(ctx, &treasurytypes.QueryKeysRequest{})
    if err != nil {
        log.Fatalf("Failed to query keys: %v", err)
    }
    fmt.Printf("Keys: %v\n", keysResp.Keys)

    // Query zenBTC pending mints
    zenbtcClient := zenbtctypes.NewQueryClient(conn)
    mintsResp, err := zenbtcClient.PendingMints(ctx, &zenbtctypes.QueryPendingMintsRequest{})
    if err != nil {
        log.Fatalf("Failed to query pending mints: %v", err)
    }
    fmt.Printf("Pending Mints: %v\n", mintsResp.PendingMints)
}
```

### gRPC Reflection

zrChain supports gRPC reflection, allowing you to discover available services:

```bash
# Using grpcurl
grpcurl -plaintext grpc.gardia.zenrocklabs.io:9090 list

# List methods for a specific service
grpcurl -plaintext grpc.gardia.zenrocklabs.io:9090 list zenrock.identity.Query

# Call a method
grpcurl -plaintext grpc.gardia.zenrocklabs.io:9090 zenrock.identity.Query/Workspaces
```

---

## JSON-RPC (Tendermint RPC)

Tendermint RPC provides low-level access to consensus, blocks, and transactions.

### Base URL

```
# Mainnet
https://rpc.diamond.zenrocklabs.io

# Testnet
https://rpc.gardia.zenrocklabs.io
```

### Common Methods

#### Get Node Status

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/status"
```

**Example Response:**
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "node_info": {
      "network": "zenrock",
      "version": "0.38.0",
      "moniker": "validator-1"
    },
    "sync_info": {
      "latest_block_height": "1234567",
      "latest_block_time": "2024-01-15T12:00:00.000Z",
      "catching_up": false
    }
  }
}
```

#### Get Block by Height

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/block?height=1234567"
```

#### Get Latest Block

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/block"
```

#### Query Transaction by Hash

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/tx?hash=0xABC123..."
```

**Example Response:**
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "hash": "ABC123...",
    "height": "1234567",
    "tx_result": {
      "code": 0,
      "log": "success",
      "gas_wanted": "200000",
      "gas_used": "150000"
    }
  }
}
```

#### Search Transactions

```bash
# Search by sender
curl -X GET "https://rpc.diamond.zenrocklabs.io/tx_search?query=\"message.sender='zen1abc123...'\""

# Search by event type
curl -X GET "https://rpc.diamond.zenrocklabs.io/tx_search?query=\"message.action='/zenrock.treasury.MsgNewKeyRequest'\""
```

#### ABCI Query (Raw State)

```bash
# Query raw state from a module
curl -X GET "https://rpc.diamond.zenrocklabs.io/abci_query?path=\"/store/zenbtc/key\"&data=\"params\""
```

#### Get Validators

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/validators"
```

#### Get Network Info

```bash
curl -X GET "https://rpc.diamond.zenrocklabs.io/net_info"
```

### JavaScript Example

```typescript
const RPC_URL = "https://rpc.diamond.zenrocklabs.io";

// Get current block height
async function getBlockHeight(): Promise<number> {
  const response = await fetch(`${RPC_URL}/status`);
  const data = await response.json();
  return parseInt(data.result.sync_info.latest_block_height);
}

// Get block by height
async function getBlock(height: number): Promise<any> {
  const response = await fetch(`${RPC_URL}/block?height=${height}`);
  const data = await response.json();
  return data.result.block;
}

// Search transactions by sender
async function searchTxBySender(sender: string): Promise<any[]> {
  const query = encodeURIComponent(`message.sender='${sender}'`);
  const response = await fetch(`${RPC_URL}/tx_search?query="${query}"`);
  const data = await response.json();
  return data.result.txs;
}

// Get transaction by hash
async function getTx(hash: string): Promise<any> {
  const response = await fetch(`${RPC_URL}/tx?hash=${hash}`);
  const data = await response.json();
  return data.result;
}

// Usage
const height = await getBlockHeight();
console.log("Current block height:", height);

const block = await getBlock(height);
console.log("Block time:", block.header.time);
```

---

## WebSocket Subscriptions

Tendermint RPC also supports WebSocket connections for real-time event subscriptions.

### Connection

```
wss://rpc.diamond.zenrocklabs.io/websocket
```

### Subscribe to New Blocks

```javascript
const ws = new WebSocket("wss://rpc.diamond.zenrocklabs.io/websocket");

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      jsonrpc: "2.0",
      method: "subscribe",
      id: 1,
      params: {
        query: "tm.event='NewBlock'",
      },
    })
  );
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("New block:", data.result?.data?.value?.block?.header?.height);
};
```

### Subscribe to Transactions

```javascript
// Subscribe to all transactions
ws.send(
  JSON.stringify({
    jsonrpc: "2.0",
    method: "subscribe",
    id: 2,
    params: {
      query: "tm.event='Tx'",
    },
  })
);

// Subscribe to specific message type
ws.send(
  JSON.stringify({
    jsonrpc: "2.0",
    method: "subscribe",
    id: 3,
    params: {
      query: "tm.event='Tx' AND message.action='/zenrock.zenbtc.MsgMint'",
    },
  })
);
```

---

## Module Reference

### Available Query Modules

| Module | REST Path Prefix | Description |
|--------|------------------|-------------|
| Bank | `/cosmos/bank/v1beta1/` | Token balances and supply |
| Staking | `/cosmos/staking/v1beta1/` | Delegations and validators |
| Gov | `/cosmos/gov/v1/` | Governance proposals |
| Identity | `/zenrock/identity/` | Workspaces and keyrings |
| Treasury | `/zenrock/treasury/` | Keys and signatures |
| Policy | `/zenrock/policy/` | Policies and actions |
| zenBTC | `/zenrock/zenbtc/` | Bitcoin wrapped asset |
| Hush | `/zenrock/hush/` | Privacy shielded pool |
| DCT | `/zenrock/dct/` | Decentralized Custody Tokens |
| zenTP | `/zenrock/zentp/` | Transfer protocol |

### Rate Limits

Public endpoints have rate limits to ensure fair usage:

- REST API: 100 requests/minute per IP
- gRPC: 200 requests/minute per IP
- WebSocket: 50 subscriptions per connection

For higher limits, consider running your own node.

---

## Error Handling

### REST API Errors

```json
{
  "code": 5,
  "message": "workspace not found: workspace14a2hpadpsy9h4auve2z8lw",
  "details": []
}
```

Common error codes:
- `2`: Invalid argument
- `3`: Invalid address format
- `5`: Not found
- `7`: Permission denied
- `13`: Internal error

### gRPC Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 0 | OK | Success |
| 3 | INVALID_ARGUMENT | Malformed request |
| 5 | NOT_FOUND | Resource doesn't exist |
| 7 | PERMISSION_DENIED | Unauthorized |
| 14 | UNAVAILABLE | Service temporarily unavailable |

---

## Additional Resources

- [CLI Reference](./cli-reference.md) - Command-line interface documentation
- [zrChain Architecture](../zrChain/architecture.md) - System overview
- [Treasury Module](../zrChain/treasury.md) - Key and signature management
- [Identity Module](../zrChain/identity.md) - Workspaces and keyrings
