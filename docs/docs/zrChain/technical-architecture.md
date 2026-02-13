---
sidebar_position: 3
title: Technical Architecture
---

# zrChain: Technical Architecture

## Consensus & Validator Architecture

![Consensus Architecture](/img/litepaper/consensus%20architecture%201.png)

zrChain uses Delegated Proof-of-Stake with a hybrid validation model. The validator set includes both standard validators running consensus and a specialized subset of dMPC operators. This separation allows the network to scale the validator count for decentralization while maintaining a controlled set of cryptographic key holders for security-critical operations.

## dMPC Integration

The treasury module manages all interactions with the MPC infrastructure. Signing requests follow this flow:

1. A module (zenBTC, DCT, or Hush) creates a `SignTransactionRequest` specifying the key ID and unsigned transaction
2. dMPC operators poll zrChain for pending requests
3. Operators execute the GG21 threshold signature protocol (detailed in the previous section)
4. Each operator submits their signature share to zrChain
5. Once sufficient signatures arrive (meeting the keyring threshold), the request is fulfilled
6. A relayer broadcasts the signed transaction to the destination chain

## Enshrined Oracle via Vote Extensions

zrChain's oracle mechanism is enshrined directly into consensus through CometBFT Vote Extensions. Each validator runs a sidecar binary that monitors external blockchains and feeds data into the zrChain consensus process to be voted on.

During each block:

1. **ExtendVote**: Validators query their sidecar for the latest external chain state (block headers, account nonces, events, prices) and include cryptographic hashes in their vote extension
2. **PrepareProposal**: The block proposer aggregates vote extensions and validates that hash commitments match the actual data
3. **PreBlocker**: Only data achieving supermajority consensus (>2/3 voting power) is applied to chain state

This design ensures that external chain data is verified by the majority of validators before being used. Critical fields like block headers require supermajority consensus, while less critical data like gas prices can proceed with simple majority.

## Cross-Chain Observation

![Cross-Chain Observation Security](/img/litepaper/cross%20chain%20observation%20security%20properties%201.png)

The sidecar oracle monitors multiple blockchains simultaneously:

- **Bitcoin & Zcash**: Block headers for SPV-style verification (Simplified Payment Verification, a lightweight method for confirming transactions via Merkle proofs)
- **Solana**: Account nonces for transaction sequencing, mint/burn events for confirmation

Block headers are stored in dedicated collections and used to verify deposit transaction inclusion via Merkle proofs. This allows zrChain to trustlessly confirm external deposits without relying on centralized data providers.

## Security Properties

zrChain inherits CometBFT's Byzantine fault tolerance (hence the BFT in the name): the network remains secure as long as fewer than 1/3 of validators are malicious. Key security features include:

- **Distributed key custody**: dMPC ensures no party ever holds a complete private key
- **Consensus-verified external data**: Block headers and events require supermajority agreement
- **Deterministic execution**: All validators process the same data and reach identical state
- **Supply invariants**: Strict accounting ensures wrapped token supply equals custodied reserves

## Workspaces

![Workspaces on zrChain](/img/litepaper/workspaces%20zrChain%201.png)

Workspaces are the core organizational primitive on zrChain. Every dMPC key belongs to a workspace, not to an individual account. A workspace is a shared governance container, analogous to a team vault, where owners request keys, authorize signatures, and control access. This decouples key management from any single blockchain account, enabling teams, institutions, and individuals to manage cross-chain wallets under a shared governance structure.

Each workspace supports multiple owners and enforces a dual-policy model: an **admin policy** governs structural changes (adding or removing owners, creating child workspaces), while a separate **sign policy** gates all cryptographic operations (key requests, signature requests). Owners configure policies through zrChain's policy module, ranging from simple single-owner approval to complex multi-signature thresholds. Workspaces can also form hierarchies, where child workspaces inherit their parent's policies by default, enabling organizational structures that mirror real-world team setups.

**Workspaces give zrChain a programmable access control layer that makes dMPC practical for real teams and institutions, not just individual users. Any organization can create a workspace, define its own governance rules, and manage cross-chain wallets without ever trusting a single custodian.**
