---
sidebar_position: 1
title: zrChain
---

# zrChain

zrChain is a Delegated Proof-of-Stake chain built on the Cosmos SDK, purpose-built to run distributed multi-party computation with enshrined oracles that enable secure and complex cross-chain operations.

At the core of Zenrock's dMPC is a threshold signature scheme (TSS). To produce a valid signature, multiple parties exchange key fragments, but the private key is never assembled. No participant, including Zenrock, ever has enough information to reconstruct it. **The key doesn't exist in any single location because it was never created in full. Only mathematical fragments exist.**

This allows zrChain to control wallets on any third-party blockchain without any party ever knowing the underlying private key.

**dMPC signature instructions can only originate from zrChain, making the entire signing process decentralized.** Through CometBFT Vote Extensions (a mechanism allowing validators to include additional data in their consensus votes), each validator runs an enshrined oracle sidecar as part of their node. This sidecar monitors events on external chains (for example, a deposit event on Bitcoin) and submits them directly into zrChain's core consensus process. Validators collectively observe the event, reach consensus, and only then does the chain instruct the dMPC to act. **By enshrining the oracle mechanism directly into core consensus, zrChain ensures that as long as the chain itself is secure, every instruction passed to the dMPC is legitimate.**

zrChain launched with a genesis set of 8 dMPC operators and 60+ validators. These infrastructure providers possess significant cumulative stake across 50+ chains with geographic distribution across 22+ countries. Over time, the dMPC operator set will expand to 16, then 32, each time increasing the cryptographic threshold and security guarantees.
