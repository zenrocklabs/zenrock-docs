---
title: Validation Module
sidebar_label: Validation Module
sidebar_position: 7
---

## Hybrid Validation Model

zrChain uses Delegated Proof-of-Stake with a **hybrid validation model**. The validator set includes two distinct roles:

### Standard Validators
- Run consensus (CometBFT)
- Participate in block production and finalization
- Run the oracle sidecar for vote extensions
- Stake $ROCK and earn rewards

### dMPC Operators
- A specialized subset of validators
- Hold cryptographic key shares for dMPC signing
- Execute threshold signature protocols (GG21)
- Subject to stricter operational requirements

### Why Separation Matters

This separation allows zrChain to:

1. **Scale decentralization**: The network can increase validator count for broader participation without requiring all validators to hold sensitive key material
2. **Maintain security**: A controlled, vetted set of dMPC operators ensures security-critical cryptographic operations meet strict standards
3. **Optimize performance**: Not all validators need the specialized infrastructure required for MPC operations

**Genesis Configuration**: zrChain launched with **8 dMPC operators** and **60+ standard validators**. Over time, the dMPC operator set will expand to 16, then 32, increasing the cryptographic threshold and security guarantees with each expansion.

---

Zenrock's **_Validation Module_** is zrChain's economic security module, effectively replacing the staking module.

Besides the features of the staking module, the validation module also facilitates the support of vote extensions which enable validators to vote on external data (such as price feeds) as part of the consensus process.

### Vote Extensions

Using Vote Extensions, validators can vote on arbitrary data as part of the consensus process in CometBFT before it is accepted on-chain. zrChain's oracle mechanism is enshrined directly into consensus through CometBFT vote extensions. Each validator runs a sidecar process that monitors external blockchains and feeds data into the consensus cycle.

#### Three-Phase Consensus Flow

During each block, external data passes through three verification phases:

1. **ExtendVote**: Validators query their sidecar for the latest external chain state (block headers, account nonces, events, prices) and include cryptographic hashes in their vote extension. Each validator independently observes the external chains and commits to what they observed.

2. **PrepareProposal**: The block proposer aggregates vote extensions from all validators and validates that hash commitments match the actual data. The proposer constructs the block including only data that can be verified against the committed hashes.

3. **PreBlocker**: Only data achieving supermajority consensus (>2/3 voting power) is applied to chain state. This final verification ensures that external chain data is verified by the majority of validators before being used in any on-chain logic.

#### Consensus Thresholds

Different types of external data require different consensus thresholds:

| Data Type | Consensus Requirement | Rationale |
|-----------|----------------------|-----------|
| Block headers (BTC, ZCash) | Supermajority (>2/3) | Critical for SPV verification of deposits |
| Account nonces (Solana) | Supermajority (>2/3) | Required for transaction sequencing |
| Mint/burn events | Supermajority (>2/3) | Critical for supply tracking |
| Gas prices (Ethereum) | Simple majority (>1/2) | Less critical, used for cost optimization |

This design ensures that all validators would run the oracle sidecar and vote on the data returned from it during the pre-block consensus process. A super-majority of zrChain stake must agree on values from the oracle, enshrining the oracle system behind the same economic security securing the blockchain network.

### Sidecar

The oracle is querying the latest price data and is running as a separate sidecar daemon running a GRPC server. This means that the blockchain node can query the GRPC port of the oracle sidecar running locally to get the most recent price data and vote on it every block.

This novel architecture enables the zenrock blockchain to offer the same level of security for our critical oracle infrastructure as the rest of the Zenrock chain.

### Cross-Chain Monitoring

The sidecar oracle monitors multiple blockchains simultaneously, providing zrChain with trustless access to external chain state:

#### Supported Chains and Monitored Data

| Chain | Data Monitored | Purpose | Confirmation Requirement |
|-------|---------------|---------|--------------------------|
| **Bitcoin** | Block headers | SPV-style verification via Merkle proofs | 6 confirmations |
| **Zcash** | Block headers | SPV-style verification via Merkle proofs | 6 confirmations |
| **Solana** | Account nonces | Transaction sequencing | Finalized slot |
| **Solana** | Mint/burn events | Supply tracking for DCTs | Finalized slot |
| **Ethereum** | Gas prices | Cost optimization for transactions | Latest block |
| **Ethereum** | Burn events | Bridge contract monitoring | 12 confirmations |

#### Block Header Storage

Block headers are stored in dedicated collections within zrChain:

- **Bitcoin headers**: `BtcBlockHeaders` collection
- **Zcash headers**: `ZcashBlockHeaders` collection

These stored headers are used to verify deposit transaction inclusion via Merkle proofs. This allows zrChain to trustlessly confirm external deposits without relying on centralized data providers.

#### SPV Verification

SPV (Simplified Payment Verification) is a lightweight method for confirming transactions:

1. The oracle sidecar fetches block headers from the external chain
2. Validators reach consensus on the block header through vote extensions
3. When a deposit is claimed, zrChain verifies a Merkle proof demonstrating the transaction's inclusion in the consensus-verified block header
4. This proves the deposit occurred without requiring zrChain to process the full external blockchain

This approach provides cryptographic proof of deposits while maintaining zrChain's light client architecture.

### Running a Validator on zrChain

For details on how to run a validator including the oracle sidecar on zrChain, please refer to the [Zenrock Validator Repository](https://github.com/zenrocklabs/zenrock-validators). 