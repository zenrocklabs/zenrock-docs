---
sidebar_position: 2
title: dMPC with Secure Enclaves
---

# Distributed Multi-Party Computation with Secure Enclaves

Our system combines distributed Multi-Party Computation (dMPC) with hardware-backed secure enclaves to provide strong cryptographic security, operational resilience, and verifiable trust — without relying on a single trusted machine or operator.

## Core Principle

Private keys are never stored or reconstructed in full. Instead, they are:

- Cryptographically split across multiple independent parties using MPC
- Executed inside secure enclaves, which provide hardware-enforced isolation and runtime integrity guarantees

This layered approach ensures that both key material and execution logic remain protected, even in the presence of compromised infrastructure. Even if an attacker gains control over parts of the hosting environment, they cannot extract private keys or manipulate signing behavior, because key material is cryptographically distributed and all signing operations are confined to attested, hardware-isolated environments.

## Role of Secure Enclaves

A secure enclave is a protected execution environment provided by modern hardware. Code running inside an enclave is:

- Isolated from the host operating system and hypervisor
- Protected from memory inspection or tampering
- Able to produce cryptographic attestations proving what code is running

In our architecture, each MPC participant runs inside its own enclave, ensuring that:

- Key shares are never exposed to the host machine
- Signing logic cannot be modified without detection
- Even privileged system access cannot extract sensitive material

## dMPC Signing Flow with Enclaves

**Distributed Key Generation:** The private key is generated collaboratively by multiple enclave-resident participants using an MPC protocol. Each enclave receives a unique key share. The full private key never exists anywhere.

**Attested Execution:** Each enclave can produce a signed attestation proving the exact MPC code it is running and that the code is executing inside genuine enclave hardware. Only attested enclaves are permitted to participate.

**Isolated Key Storage:** Key shares are encrypted inside their respective enclaves and cannot be accessed by the host system, administrators or cloud provider. They can only be accessed inside the enclave.

**Signing Request:** When a transaction needs to be signed, a request is sent to the required number of enclaves.

**Distributed Enclave Signing:** Each enclave computes a partial signature using its internal key share. These partial signatures reveal no information about the private key.

**Signature Assembly:** The partial signatures are combined into a standard blockchain signature, indistinguishable from one produced by a single private key.

**At no point is the private key reconstructed — inside or outside an enclave.**

## Security Features

**Defense in Depth:**

- MPC prevents any single party from controlling a key
- Enclaves prevent key shares from being extracted or tampered with
- Attestation ensures only approved code can participate

**Compromise Resistance:** An attacker would need to breach multiple independent systems, defeat hardware-level isolation, and do so simultaneously within a signing threshold. This is substantially harder than compromising a single HSM, server, or operator.

**Verifiable Trust:** Because enclaves produce cryptographic attestations, external systems can verify that signing operations originate from approved, unmodified code and that keys are being used only within expected security boundaries.

## Operational Flexibility

- Threshold policies (e.g. M-of-N signers)
- Node rotation and upgrades without changing public keys
- Geographic and administrative separation of trust
- Integration with onchain authorization and governance logic

All policy enforcement is designed to occur before and during signing, without weakening key security.

## Secure by Design

Traditional systems focus on protecting a single secret. **Our approach removes the secret entirely.**

**By distributing key ownership cryptographically and enforcing execution integrity through hardware isolation, the system ensures that no single failure (technical or human) can result in key compromise.**

This makes MPC with secure enclaves a strong foundation for high-value digital asset custody, decentralized infrastructure, and systems requiring both security and availability.
