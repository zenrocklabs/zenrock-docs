---
sidebar_position: 2
title: zrChain
---

# zrChain

![zrChain](/img/litepaper/zrChain.png)

zrChain is a Delegated Proof-of-Stake chain built on the Cosmos SDK, purpose-built to run distributed multi-party computation with enshrined oracles that enable secure and complex cross-chain operations.

At the core of Zenrock's dMPC is a threshold signature scheme (TSS). To produce a valid signature, multiple parties exchange key fragments, but the private key is never assembled. No participant, including Zenrock, ever has enough information to reconstruct it. **The key doesn't exist in any single location because it was never created in full. Only mathematical fragments exist.**

This allows zrChain to control wallets on any third-party blockchain without any party ever knowing the underlying private key.

**dMPC signature instructions can only originate from zrChain, making the entire signing process decentralized.** Through CometBFT Vote Extensions (a mechanism allowing validators to include additional data in their consensus votes), each validator runs an enshrined oracle sidecar as part of their node. This sidecar monitors events on external chains (for example, a deposit event on Bitcoin) and submits them directly into zrChain's core consensus process. Validators collectively observe the event, reach consensus, and only then does the chain instruct the dMPC to act. **By enshrining the oracle mechanism directly into core consensus, zrChain ensures that as long as the chain itself is secure, every instruction passed to the dMPC is legitimate.**

zrChain launched with a genesis set of 8 dMPC operators and 60+ validators. These infrastructure providers possess significant cumulative stake across 50+ chains with geographic distribution across 22+ countries. Over time, the dMPC operator set will expand to 16, then 32, each time increasing the cryptographic threshold and security guarantees.

![Zenrock Validators](/img/litepaper/Zenrock%20Validators.png)

## dMPC with Secure Enclaves

Our system combines distributed Multi-Party Computation (dMPC) with hardware-backed secure enclaves to provide strong cryptographic security, operational resilience, and verifiable trust — without relying on a single trusted machine or operator.

### Core Principle

Private keys are never stored or reconstructed in full. Instead, they are:

- Cryptographically split across multiple independent parties using MPC
- Executed inside secure enclaves, which provide hardware-enforced isolation and runtime integrity guarantees

This layered approach ensures that both key material and execution logic remain protected, even in the presence of compromised infrastructure. Even if an attacker gains control over parts of the hosting environment, they cannot extract private keys or manipulate signing behavior, because key material is cryptographically distributed and all signing operations are confined to attested, hardware-isolated environments.

### Role of Secure Enclaves

A secure enclave is a protected execution environment provided by modern hardware. Code running inside an enclave is:

- Isolated from the host operating system and hypervisor
- Protected from memory inspection or tampering
- Able to produce cryptographic attestations proving what code is running

In our architecture, each MPC participant runs inside its own enclave, ensuring that:

- Key shares are never exposed to the host machine
- Signing logic cannot be modified without detection
- Even privileged system access cannot extract sensitive material

### dMPC Signing Flow with Enclaves

**Distributed Key Generation:** The private key is generated collaboratively by multiple enclave-resident participants using an MPC protocol. Each enclave receives a unique key share. The full private key never exists anywhere.

**Attested Execution:** Each enclave can produce a signed attestation proving the exact MPC code it is running and that the code is executing inside genuine enclave hardware. Only attested enclaves are permitted to participate.

**Isolated Key Storage:** Key shares are encrypted inside their respective enclaves and cannot be accessed by the host system, administrators or cloud provider. They can only be accessed inside the enclave.

**Signing Request:** When a transaction needs to be signed, a request is sent to the required number of enclaves.

**Distributed Enclave Signing:** Each enclave computes a partial signature using its internal key share. These partial signatures reveal no information about the private key.

**Signature Assembly:** The partial signatures are combined into a standard blockchain signature, indistinguishable from one produced by a single private key.

**At no point is the private key reconstructed — inside or outside an enclave.**

### Security Features

**Defense in Depth:**

- MPC prevents any single party from controlling a key
- Enclaves prevent key shares from being extracted or tampered with
- Attestation ensures only approved code can participate

**Compromise Resistance:** An attacker would need to breach multiple independent systems, defeat hardware-level isolation, and do so simultaneously within a signing threshold. This is substantially harder than compromising a single HSM, server, or operator.

**Verifiable Trust:** Because enclaves produce cryptographic attestations, external systems can verify that signing operations originate from approved, unmodified code and that keys are being used only within expected security boundaries.

### Operational Flexibility

- Threshold policies (e.g. M-of-N signers)
- Node rotation and upgrades without changing public keys
- Geographic and administrative separation of trust
- Integration with onchain authorization and governance logic

All policy enforcement is designed to occur before and during signing, without weakening key security.

### Secure by Design

Traditional systems focus on protecting a single secret. **Our approach removes the secret entirely.**

**By distributing key ownership cryptographically and enforcing execution integrity through hardware isolation, the system ensures that no single failure (technical or human) can result in key compromise.**

This makes MPC with secure enclaves a strong foundation for high-value digital asset custody, decentralized infrastructure, and systems requiring both security and availability.

## Technical Architecture

### Consensus & Validator Architecture

![Consensus Architecture](/img/litepaper/consensus%20architecture%201.png)

zrChain uses Delegated Proof-of-Stake with a hybrid validation model. The validator set includes both standard validators running consensus and a specialized subset of dMPC operators. This separation allows the network to scale the validator count for decentralization while maintaining a controlled set of cryptographic key holders for security-critical operations.

### dMPC Integration

The treasury module manages all interactions with the MPC infrastructure. Signing requests follow this flow:

1. A module (zenBTC, DCT, or Hush) creates a `SignTransactionRequest` specifying the key ID and unsigned transaction
2. dMPC operators poll zrChain for pending requests
3. Operators execute the GG21 threshold signature protocol (detailed in the previous section)
4. Each operator submits their signature share to zrChain
5. Once sufficient signatures arrive (meeting the keyring threshold), the request is fulfilled
6. A relayer broadcasts the signed transaction to the destination chain

### Enshrined Oracle via Vote Extensions

zrChain's oracle mechanism is enshrined directly into consensus through CometBFT Vote Extensions. Each validator runs a sidecar binary that monitors external blockchains and feeds data into the zrChain consensus process to be voted on.

During each block:

1. **ExtendVote**: Validators query their sidecar for the latest external chain state (block headers, account nonces, events, prices) and include cryptographic hashes in their vote extension
2. **PrepareProposal**: The block proposer aggregates vote extensions and validates that hash commitments match the actual data
3. **PreBlocker**: Only data achieving supermajority consensus (>2/3 voting power) is applied to chain state

This design ensures that external chain data is verified by the majority of validators before being used. Critical fields like block headers require supermajority consensus, while less critical data like gas prices can proceed with simple majority.

### Cross-Chain Observation

![Cross-Chain Observation Security](/img/litepaper/cross%20chain%20observation%20security%20properties%201.png)

The sidecar oracle monitors multiple blockchains simultaneously:

- **Bitcoin & Zcash**: Block headers for SPV-style verification (Simplified Payment Verification, a lightweight method for confirming transactions via Merkle proofs)
- **Solana**: Account nonces for transaction sequencing, mint/burn events for confirmation

Block headers are stored in dedicated collections and used to verify deposit transaction inclusion via Merkle proofs. This allows zrChain to trustlessly confirm external deposits without relying on centralized data providers.

### Security Properties

zrChain inherits CometBFT's Byzantine fault tolerance (hence the BFT in the name): the network remains secure as long as fewer than 1/3 of validators are malicious. Key security features include:

- **Distributed key custody**: dMPC ensures no party ever holds a complete private key
- **Consensus-verified external data**: Block headers and events require supermajority agreement
- **Deterministic execution**: All validators process the same data and reach identical state
- **Supply invariants**: Strict accounting ensures wrapped token supply equals custodied reserves

### Workspaces

![Workspaces on zrChain](/img/litepaper/workspaces%20zrChain%201.png)

Workspaces are the core organizational primitive on zrChain. Every dMPC key belongs to a workspace, not to an individual account. A workspace is a shared governance container, analogous to a team vault, where owners request keys, authorize signatures, and control access. This decouples key management from any single blockchain account, enabling teams, institutions, and individuals to manage cross-chain wallets under a shared governance structure.

Each workspace supports multiple owners and enforces a dual-policy model: an **admin policy** governs structural changes (adding or removing owners, creating child workspaces), while a separate **sign policy** gates all cryptographic operations (key requests, signature requests). Owners configure policies through zrChain's policy module, ranging from simple single-owner approval to complex multi-signature thresholds. Workspaces can also form hierarchies, where child workspaces inherit their parent's policies by default, enabling organizational structures that mirror real-world team setups.

**Workspaces give zrChain a programmable access control layer that makes dMPC practical for real teams and institutions, not just individual users. Any organization can create a workspace, define its own governance rules, and manage cross-chain wallets without ever trusting a single custodian.**
