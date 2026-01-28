---
title: zenZEC - Introduction
sidebar_label: Introduction
sidebar_position: 1
---

## zenZEC: Decentralized Wrapped Zcash

zenZEC is Zenrock's second Decentralized Custody Token (DCT): **decentralized wrapped Zcash on Solana.**

**Mint zenZEC:** [https://app.zenrocklabs.io/zenzec/crucible](https://app.zenrocklabs.io/zenzec/crucible)

**Solana CA:** JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS

### Privacy Heritage

Zcash pioneered zero-knowledge proofs in cryptocurrency, enabling shielded transactions where the sender, receiver, and amount are encrypted. By bringing ZEC to Solana via the DCT standard, zenZEC inherits both:

- **Zcash's privacy heritage**: The underlying asset comes from the most battle-tested privacy-preserving blockchain
- **Zenrock's decentralized custody guarantees**: No centralized vault, no single point of failure

### Why zenZEC?

**Bring Zcash liquidity to Solana**: Access Solana's DeFi ecosystem with your Zcash holdings

**Decentralized security**: Your ZEC is secured by dMPC—no single entity controls the custody keys

**Transparent backing**: All zenZEC is fully backed by ZEC held in dMPC-controlled addresses

**Permissionless**: Anyone can mint or redeem without KYC or approval

### How It Works

zenZEC uses the same DCT framework as zenBTC:

1. **Deposit**: Send ZEC to a dMPC-controlled address
2. **Verification**: zrChain verifies the deposit via Merkle proof against consensus-verified block headers
3. **Mint**: zenZEC SPL tokens are minted to your Solana address
4. **Use**: Trade, lend, or use zenZEC in any Solana DeFi protocol
5. **Redeem**: Burn zenZEC to receive ZEC back to any Zcash address

### Fees

| Action | Fee |
|--------|-----|
| Mint | $5 flat |
| Redeem | 50 bps |

Fees are converted to $ROCK and distributed according to Zenrock's tokenomic architecture.

### Differences from zenBTC

| Feature | zenBTC | zenZEC |
|---------|--------|--------|
| Underlying | Bitcoin | Zcash |
| Native Yield | Yes (from protocol fees) | No |
| Privacy (underlying) | Transparent | Optional shielded txs |
| Block Confirmations | ~6 | ~6 |

zenZEC does not currently offer native yield. It is a straightforward wrapped asset providing decentralized custody and Solana liquidity for Zcash.

### Security

zenZEC inherits all security properties of the DCT framework:

- **dMPC custody**: No single party holds the complete private key
- **Consensus verification**: All deposits verified by zrChain validators
- **Supply invariants**: Minted supply always equals custodied reserves
- **Transparent auditing**: All custody addresses and balances are verifiable

### Use Cases

- **DeFi participation**: Use ZEC in Solana lending and trading protocols
- **Liquidity provision**: Provide zenZEC liquidity on DEXs
- **Portfolio diversification**: Hold Zcash exposure alongside other Solana assets
- **Cross-chain arbitrage**: Take advantage of price differences across chains

### Getting Started

1. Ensure you have ZEC in a Zcash wallet
2. Visit the [zenZEC Crucible](https://app.zenrocklabs.io/zenzec/crucible)
3. Connect your Solana wallet
4. Generate a deposit address
5. Send ZEC to the provided address
6. Receive zenZEC after confirmation (~6 blocks)

For detailed technical information, see the [DCT Technical Architecture](../DCT/dct-technical.md).
