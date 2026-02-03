---
title: Distributed Multi-Party Computation (dMPC)
sidebar_label: dMPC
sidebar_position: 2
---

# Distributed Multi-Party Computation

At the core of Zenrock's dMPC is a threshold signature scheme (TSS). To produce a valid signature, multiple parties exchange key fragments, but the private key is never assembled. No participant, including Zenrock, ever has enough information to reconstruct it.

**The key doesn't exist in any single location because it was never created in full. Only mathematical fragments exist.**

This allows zrChain to control wallets on any third-party blockchain without any party ever knowing the underlying private key.

zrChain launched with a genesis set of 8 dMPC operators and 60+ validators. These infrastructure providers possess significant cumulative stake across 50+ chains with geographic distribution across 22+ countries. Over time, the dMPC operator set will expand to 16, then 32, each time increasing the cryptographic threshold and security guarantees.

## dMPC with Secure Enclaves

Zenrock combines distributed Multi-Party Computation with hardware-backed secure enclaves to provide strong cryptographic security, operational resilience, and verifiable trust—without relying on a single trusted machine or operator.

### Core Principle

Private keys are never stored or reconstructed in full. Instead, they are:

- **Cryptographically split** across multiple independent parties using MPC
- **Executed inside secure enclaves**, which provide hardware-enforced isolation and runtime integrity guarantees

This layered approach ensures that both key material and execution logic remain protected, even in the presence of compromised infrastructure.

### What is a Secure Enclave?

A secure enclave is a protected execution environment provided by modern hardware. Code running inside an enclave is:

- Isolated from the host operating system and hypervisor
- Protected from memory inspection or tampering
- Able to produce cryptographic attestations proving what code is running

In Zenrock's architecture, each MPC participant runs inside its own enclave, ensuring that:

- Key shares are never exposed to the host machine
- Signing logic cannot be modified without detection
- Even privileged system access cannot extract sensitive material

## dMPC Signing Flow

**Distributed Key Generation:** The private key is generated collaboratively by multiple enclave-resident participants using an MPC protocol. Each enclave receives a unique key share. The full private key never exists anywhere.

**Attested Execution:** Each enclave produces a signed attestation proving the exact MPC code it is running and that the code is executing inside genuine enclave hardware. Only attested enclaves are permitted to participate.

**Isolated Key Storage:** Key shares are encrypted inside their respective enclaves and cannot be accessed by the host system, administrators, or cloud provider.

**Signing Request:** When a transaction needs to be signed, a request is sent to the required number of enclaves.

**Distributed Signing:** Each enclave computes a partial signature using its internal key share. These partial signatures reveal no information about the private key.

**Signature Assembly:** The partial signatures are combined into a standard blockchain signature, indistinguishable from one produced by a single private key.

**At no point is the private key reconstructed—inside or outside an enclave.**

### Threshold Signature Protocol: GG21

Zenrock's dMPC uses the **GG21 threshold signature protocol** for distributed signing. GG21 (Gennaro & Goldfeder, 2020) is a state-of-the-art threshold ECDSA protocol that enables:

- **Non-interactive signing**: Participants can compute signature shares independently after an initial setup phase
- **Identifiable abort**: If a participant misbehaves, they can be identified and excluded
- **Efficient resharing**: Key shares can be refreshed or redistributed without changing the public key

The protocol ensures that even with a threshold number of participants, the full private key is never reconstructed during the signing process.

For technical details on the GG21 protocol, see the original paper: *"Fast Multiparty Threshold ECDSA with Fast Trustless Setup"* (Gennaro, Goldfeder, 2020).

## Security Guarantees

### Defense in Depth

- **MPC** prevents any single party from controlling a key
- **Enclaves** prevent key shares from being extracted or tampered with
- **Attestation** ensures only approved code can participate

### Compromise Resistance

An attacker would need to breach multiple independent systems, defeat hardware-level isolation, and do so simultaneously within a signing threshold. This is substantially harder than compromising a single HSM, server, or operator.

### Verifiable Trust

Because enclaves produce cryptographic attestations, external systems can verify that signing operations originate from approved, unmodified code and that keys are being used only within expected security boundaries.

## Operational Flexibility

Zenrock's dMPC supports:

- Threshold policies (e.g., M-of-N signers)
- Key refresh without changing public keys
- Geographic distribution requirements
- Custom approval workflows via zrChain policies

## Comparison to Other Approaches

### vs. Multisig Wallets

Multisig wallets require multiple signatures from different private keys. Each key exists in full somewhere—creating multiple single points of failure. Multisig is also chain-specific: a Bitcoin multisig doesn't work on Ethereum.

dMPC is chain-agnostic. The same key infrastructure works across any blockchain that supports standard signatures.

### vs. Shamir's Secret Sharing

Shamir's scheme splits a secret into shares that must be reassembled on a single machine to reconstruct the key. This reintroduces a single point of failure at reconstruction time.

With dMPC, the key is **never reconstructed**. Signing happens distributedly—each party computes a partial signature, and these are combined without ever assembling the key.

### vs. Single HSM

Hardware Security Modules protect keys but create a single point of failure. If the HSM is compromised or destroyed, the key is lost or exposed.

dMPC distributes trust across multiple independent parties and hardware environments. No single compromise can affect the key.

## Learn More

- [zrChain Architecture](./architecture.md) - How dMPC integrates with the blockchain
- [Treasury Module](./treasury.md) - Managing signing requests
- [Workspaces](./identity.md) - Organizational key management
