---
title: Transaction Examples
sidebar_label: Transaction Examples
sidebar_position: 4
---

# Transaction Examples

This guide demonstrates how to construct and broadcast transactions to zrChain using both the CLI and programmatic approaches.

## Network Configuration

Before submitting transactions, configure your connection to the appropriate network:

| Network | Chain ID | RPC Endpoint | REST API |
|---------|----------|--------------|----------|
| Mainnet (Diamond) | `zenrock` | `https://rpc.diamond.zenrocklabs.io` | `https://api.diamond.zenrocklabs.io` |
| Testnet (Gardia) | `zenrock-testnet` | `https://rpc.gardia.zenrocklabs.io` | `https://api.gardia.zenrocklabs.io` |

## 1. Using zenrockd CLI

The `zenrockd` CLI provides direct access to all zrChain transaction types.

### Setup

Configure common variables for convenience:

```bash
# Set chain ID (use zenrock-testnet for testnet)
alias zenrockd="zenrockd --chain-id=zenrock"

# Common flags
FROM="--from=<your-wallet-name>"
GAS="--gas-prices=0.0001urock"
```

### Creating a Workspace

Workspaces are the organizational containers for keys and policies on zrChain.

```bash
# Create a workspace with default policies
zenrockd tx identity new-workspace \
  --admin-policy-id 0 \
  --sign-policy-id 0 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

With additional owners and custom policies:

```bash
zenrockd tx identity new-workspace \
  --admin-policy-id 1 \
  --sign-policy-id 2 \
  --additional-owners zen1abc123...,zen1def456... \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

### Creating a Keyring

Keyrings represent off-chain key management systems. Typically, you will use the Zenrock MPC keyring rather than creating your own.

```bash
# Query available keyrings
zenrockd q identity keyrings
```

### Requesting a New Key

Request a new cryptographic key from a keyring:

```bash
# Request an ECDSA key (for Ethereum, Cosmos)
zenrockd tx treasury new-key-request \
  <workspace-id> \
  <keyring-addr> \
  ecdsa \
  1000 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock

# Request an EdDSA key (for Solana)
zenrockd tx treasury new-key-request \
  <workspace-id> \
  <keyring-addr> \
  eddsa \
  1000 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock

# Request a Bitcoin key
zenrockd tx treasury new-key-request \
  <workspace-id> \
  <keyring-addr> \
  bitcoin \
  1000 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

**Parameters:**
- `workspace-id`: Your workspace address (e.g., `workspace14a2hpadpsy9h4auve2z8lw`)
- `keyring-addr`: The keyring address (e.g., `keyring1pfnq7r04rept47gaf5cpdew2`)
- Key type: `ecdsa`, `eddsa`, or `bitcoin`
- BTL (Block-Time-Lock): Timeout in blocks (typically 1000)

### Bank Transfers

Send tokens between accounts:

```bash
# Send urock tokens
zenrockd tx bank send \
  <from-address> \
  <to-address> \
  1000000urock \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

Example:

```bash
zenrockd tx bank send \
  zen1sender... \
  zen1recipient... \
  5000000urock \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

### Requesting a Signature

Request a signature for arbitrary data or transactions:

```bash
zenrockd tx treasury new-signature-request \
  <key-id> \
  <data-to-sign-hex> \
  1000 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

Example:

```bash
# Sign a 32-byte hash
zenrockd tx treasury new-signature-request \
  0 \
  778f572f33afab831365d52e563a0ddd778f572f33afab831365d52e563a0ddd \
  1000 \
  --from alice \
  --yes \
  --gas-prices 0.0001urock
```

## 2. Using CosmJS (JavaScript/TypeScript)

For programmatic integration, use CosmJS to interact with zrChain.

### Installation

```bash
npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/amino
# or
bun add @cosmjs/stargate @cosmjs/proto-signing @cosmjs/amino
```

### Connecting to zrChain

```typescript
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// Configuration
const RPC_ENDPOINT = "https://rpc.diamond.zenrocklabs.io";
const CHAIN_ID = "zenrock";

// Create wallet from mnemonic
async function createWallet(mnemonic: string) {
  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "zen",
  });
}

// Connect to zrChain
async function connectClient(wallet: DirectSecp256k1HdWallet) {
  const client = await SigningStargateClient.connectWithSigner(
    RPC_ENDPOINT,
    wallet,
    {
      gasPrice: GasPrice.fromString("0.0001urock"),
    }
  );
  return client;
}

// Example usage
async function main() {
  const mnemonic = "your mnemonic words here...";
  const wallet = await createWallet(mnemonic);
  const client = await connectClient(wallet);

  const [account] = await wallet.getAccounts();
  console.log("Connected as:", account.address);
}
```

### Bank Transfer Transaction

```typescript
import { SigningStargateClient, GasPrice, coins } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

async function sendTokens(
  client: SigningStargateClient,
  senderAddress: string,
  recipientAddress: string,
  amount: string
) {
  const result = await client.sendTokens(
    senderAddress,
    recipientAddress,
    coins(amount, "urock"),
    "auto" // Auto-calculate gas
  );

  return result;
}

// Usage
async function transferExample() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
    prefix: "zen",
  });
  const client = await SigningStargateClient.connectWithSigner(
    "https://rpc.diamond.zenrocklabs.io",
    wallet,
    { gasPrice: GasPrice.fromString("0.0001urock") }
  );

  const [account] = await wallet.getAccounts();

  const result = await sendTokens(
    client,
    account.address,
    "zen1recipient...",
    "1000000" // 1 ROCK (1,000,000 urock)
  );

  console.log("Transaction hash:", result.transactionHash);
  console.log("Gas used:", result.gasUsed);
}
```

### Custom Message Construction

For zrChain-specific messages (identity, treasury modules), construct custom messages:

```typescript
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

// Create a workspace message
interface MsgNewWorkspace {
  creator: string;
  adminPolicyId: string;
  signPolicyId: string;
  additionalOwners: string[];
}

async function createWorkspace(
  client: SigningStargateClient,
  creator: string,
  adminPolicyId: string,
  signPolicyId: string,
  additionalOwners: string[] = []
) {
  const msg = {
    typeUrl: "/zrchain.identity.MsgNewWorkspace",
    value: {
      creator,
      adminPolicyId,
      signPolicyId,
      additionalOwners,
    },
  };

  const fee = {
    amount: coins("5000", "urock"),
    gas: "200000",
  };

  const result = await client.signAndBroadcast(
    creator,
    [msg],
    fee,
    "Create workspace"
  );

  return result;
}

// Request a new key
interface MsgNewKeyRequest {
  creator: string;
  workspaceAddr: string;
  keyringAddr: string;
  keyType: string;
  btl: string;
}

async function requestKey(
  client: SigningStargateClient,
  creator: string,
  workspaceAddr: string,
  keyringAddr: string,
  keyType: "ecdsa" | "eddsa" | "bitcoin",
  btl: number = 1000
) {
  const msg = {
    typeUrl: "/zrchain.treasury.MsgNewKeyRequest",
    value: {
      creator,
      workspaceAddr,
      keyringAddr,
      keyType,
      btl: btl.toString(),
    },
  };

  const fee = {
    amount: coins("5000", "urock"),
    gas: "200000",
  };

  const result = await client.signAndBroadcast(
    creator,
    [msg],
    fee,
    "Request new key"
  );

  return result;
}
```

### Complete Working Example

```typescript
import { SigningStargateClient, GasPrice, coins } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const CONFIG = {
  rpc: "https://rpc.diamond.zenrocklabs.io",
  chainId: "zenrock",
  gasPrice: "0.0001urock",
  prefix: "zen",
};

async function main() {
  // Initialize wallet
  const mnemonic = process.env.MNEMONIC!;
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: CONFIG.prefix,
  });

  // Connect client
  const client = await SigningStargateClient.connectWithSigner(
    CONFIG.rpc,
    wallet,
    { gasPrice: GasPrice.fromString(CONFIG.gasPrice) }
  );

  const [account] = await wallet.getAccounts();
  console.log("Address:", account.address);

  // Check balance
  const balance = await client.getBalance(account.address, "urock");
  console.log("Balance:", balance.amount, "urock");

  // Send transaction
  const recipient = "zen1...";
  const amount = "100000"; // 0.1 ROCK

  try {
    const result = await client.sendTokens(
      account.address,
      recipient,
      coins(amount, "urock"),
      "auto"
    );

    console.log("Success!");
    console.log("Tx Hash:", result.transactionHash);
    console.log("Height:", result.height);
    console.log("Gas Used:", result.gasUsed);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}

main();
```

## 3. Transaction Response Handling

### Success Response Structure

A successful transaction returns:

```typescript
interface DeliverTxResponse {
  code: number;          // 0 for success
  height: number;        // Block height
  transactionHash: string;
  events: Event[];       // Transaction events
  gasUsed: number;
  gasWanted: number;
}
```

### Response Code Reference

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Internal error |
| 2 | Tx decoding error |
| 3 | Invalid sequence |
| 4 | Unauthorized |
| 5 | Insufficient funds |
| 6 | Unknown request |
| 11 | Out of gas |
| 12 | Memo too large |
| 13 | Insufficient fee |

### Error Handling

```typescript
import { DeliverTxResponse, isDeliverTxFailure } from "@cosmjs/stargate";

async function handleTransaction(
  txPromise: Promise<DeliverTxResponse>
): Promise<DeliverTxResponse> {
  try {
    const result = await txPromise;

    if (isDeliverTxFailure(result)) {
      throw new Error(`Transaction failed with code ${result.code}: ${result.rawLog}`);
    }

    console.log("Transaction successful");
    console.log("Hash:", result.transactionHash);
    console.log("Block:", result.height);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      // Parse common errors
      if (error.message.includes("insufficient funds")) {
        console.error("Error: Not enough urock to complete transaction");
      } else if (error.message.includes("account sequence mismatch")) {
        console.error("Error: Sequence mismatch - retry the transaction");
      } else if (error.message.includes("out of gas")) {
        console.error("Error: Increase gas limit");
      } else {
        console.error("Transaction error:", error.message);
      }
    }
    throw error;
  }
}
```

### Extracting Data from Events

Transaction events contain useful information about executed operations:

```typescript
function extractWorkspaceAddress(result: DeliverTxResponse): string | null {
  for (const event of result.events) {
    if (event.type === "new_workspace") {
      const addrAttr = event.attributes.find(
        (attr) => attr.key === "workspace_addr"
      );
      if (addrAttr) {
        return addrAttr.value;
      }
    }
  }
  return null;
}

function extractKeyRequestId(result: DeliverTxResponse): string | null {
  for (const event of result.events) {
    if (event.type === "new_key_request") {
      const idAttr = event.attributes.find(
        (attr) => attr.key === "key_request_id"
      );
      if (idAttr) {
        return idAttr.value;
      }
    }
  }
  return null;
}
```

## 4. Fee Estimation

### Gas Limits for Common Operations

| Operation | Typical Gas | Recommended Limit |
|-----------|-------------|-------------------|
| Bank send | ~80,000 | 100,000 |
| Create workspace | ~150,000 | 200,000 |
| New key request | ~180,000 | 250,000 |
| Signature request | ~120,000 | 150,000 |
| Policy creation | ~200,000 | 250,000 |
| Action approval | ~100,000 | 150,000 |

### Fee Calculation

Fees are calculated as: `gas_limit * gas_price`

With the standard gas price of `0.0001urock`:

```typescript
// Calculate fee for a transaction
function calculateFee(gasLimit: number): { amount: Coin[]; gas: string } {
  const gasPrice = 0.0001; // urock per gas unit
  const feeAmount = Math.ceil(gasLimit * gasPrice);

  return {
    amount: [{ denom: "urock", amount: feeAmount.toString() }],
    gas: gasLimit.toString(),
  };
}

// Example: 200,000 gas * 0.0001 = 20 urock fee
const fee = calculateFee(200000);
// fee = { amount: [{ denom: "urock", amount: "20" }], gas: "200000" }
```

### Auto Gas Estimation

CosmJS can automatically estimate gas:

```typescript
// Use "auto" for automatic gas estimation
const result = await client.sendTokens(
  sender,
  recipient,
  coins("1000000", "urock"),
  "auto" // Automatically estimates gas and calculates fee
);

// Or use a multiplier for safety margin
const result = await client.sendTokens(
  sender,
  recipient,
  coins("1000000", "urock"),
  1.3 // 30% buffer on estimated gas
);
```

### Simulating Transactions

Simulate before broadcasting to get accurate gas estimates:

```typescript
async function simulateTransaction(
  client: SigningStargateClient,
  signerAddress: string,
  messages: any[],
  memo?: string
): Promise<number> {
  const gasEstimate = await client.simulate(
    signerAddress,
    messages,
    memo
  );

  // Add 20% buffer for safety
  return Math.ceil(gasEstimate * 1.2);
}
```

## Additional Resources

- [CLI Reference](./cli-reference.md) - Complete CLI command reference
- [zrChain Architecture](../zrChain/architecture.md) - Understanding the chain architecture
- [Identity Module](../zrChain/identity.md) - Workspaces and keyrings
- [Treasury Module](../zrChain/treasury.md) - Keys and signatures
- [Policy Module](../zrChain/policy.md) - Governance policies
