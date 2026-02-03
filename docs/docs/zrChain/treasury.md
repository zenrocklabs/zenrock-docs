---
title: Treasury Module
sidebar_label: Treasury Module
sidebar_position: 5
---

Zenrock's **_Treasury Module_** is responsible for requesting and managing keys.

The treasury module facilitates a wide-range of applications - including cross-chain interaction - by fulfilling key and signature requests.

### Supported Keys

Zenrock has the capacity to generate **_ecdsa secp256k1_**, **_eddsa ed25519_**, and **_bitcoin secp256k1_** keys. The bitcoin key type uses the same curve as ecdsa secp256k1 but with Bitcoin-specific derivation paths and address formats. Key requests are processed off-chain by registered Keyrings, which subsequently store generated keys on-chain.

Keys can be used to derive valid **_EVM_**, **_Cosmos_**, **_Solana_**, and **_Bitcoin_** addresses.

Zenrock-generated addresses behave like standard self-hosted wallets and are able to interact with the relevant network natively. This exposes users to a broad range of the most popular networks.

### Signatures

Zenrock provides a **_signature request_** service that allows users to either request arbitrary signatures or request for transactions to be signed.

The transaction signing service may include broadcasting the transaction to the relevant layer one network as necessary.

The web application allows users to either manually define a transaction payload or use services like WalletConnect to submit unsigned transactions/messages to the Zenrock system.

### Supported Networks

When submitting transaction signing requests, the following Solana network types are supported:

| Network Type | Value | Description |
|--------------|-------|-------------|
| `UNDEFINED` | 0 | Not specified |
| `MAINNET` | 1 | Solana mainnet |
| `DEVNET` | 2 | Solana devnet |
| `TESTNET` | 3 | Solana testnet |
| `REGNET` | 4 | Local regression testing network |

### Signing Request Flow

The treasury module manages all interactions with the dMPC infrastructure. When a signing request is submitted, it follows this simplified 6-step flow:

> **Note**: This is a high-level overview. For detailed step-by-step flows including all intermediate states, see the [Signing Request Process](./processes/signRequests.md) documentation.

1. **Request Creation**: A module (zenBTC, DCT, or Hush) creates a `SignTransactionRequest` specifying the key ID and unsigned transaction
2. **Operator Polling**: dMPC operators poll zrChain for pending requests
3. **Threshold Signing**: Operators execute the GG21 threshold signature protocol (see [dMPC](./dmpc.md) for protocol details)
4. **Share Submission**: Each operator submits their signature share to zrChain
5. **Request Fulfillment**: Once sufficient signatures arrive (meeting the required threshold), the request is fulfilled
6. **Broadcast**: A relayer broadcasts the signed transaction to the destination chain

This flow ensures that signing authority is distributed across multiple parties and that no single operator can unilaterally sign transactions.

### Block-Time-Lock (BTL) Mechanism

Signing requests follow a Block-Time-Lock (BTL) mechanism to prevent the system from stalling on unresponsive operators:

- **Timeout**: If a request is not fulfilled within the configured **Block-Time-Lock (BTL)** period, it times out automatically. The default BTL is **20 blocks** (hardcoded fallback), but production deployments typically configure this via the `default_btl` parameter (commonly set to **1000 blocks** for mainnet).
- **Fee Refund**: When a request times out, escrowed fees are refunded to the requester
- **Retry**: Users may submit a new request after timeout if the operation is still needed

This mechanism ensures liveness: even if dMPC operators are temporarily unavailable or unresponsive, the system recovers gracefully and users are not penalized with lost fees.

**Example Timeline** (assuming ~6 second blocks and default 20 block BTL):
- Block N: Request submitted, fees escrowed
- Block N+BTL: If unfulfilled, request times out
- Block N+BTL+1: Escrowed fees returned to requester

> **Note**: The actual BTL value is configurable per deployment. Check the current network parameters with `zenrockd query treasury params` to see the active `default_btl` value.
