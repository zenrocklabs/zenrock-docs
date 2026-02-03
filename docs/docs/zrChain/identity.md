---
title: Identity Module
sidebar_label: Identity Module
sidebar_position: 4
---

Zenrock's **_Identity Module_** is responsible for identity management on Zenrock. There are currently two objects that are stored and managed using this module: Keyrings & Workspaces.

### Keyrings

**_Keyrings_** represent off-chain systems that provide keys and signatures. One example of this is the Zenrock MPC system.

Keyrings have a distinct address. This is used to select the keyring when performing key and signature requests.

Keyrings also define how many parties are involved. Only parties inside the keyring object are eligible to broadcast responses on-chain.

Lastly, a keyring provider can set the costs that occur for each key and signature request.

### Workspaces

**_Workspaces_** are the core organizational primitive on zrChain. Every dMPC key belongs to a workspace, not to an individual account. A workspace is a shared governance container, analogous to a team vault, where owners request keys, authorize signatures, and control access. This decouples key management from any single blockchain account, enabling teams, institutions, and individuals to manage cross-chain wallets under a shared governance structure.

#### Dual-Policy Model

Each workspace supports multiple owners and enforces a dual-policy model:

- **Admin Policy**: Governs structural changes including adding or removing owners, creating child workspaces, and modifying workspace settings
- **Sign Policy**: Gates all cryptographic operations including key requests and signature requests

Owners configure policies through zrChain's [policy module](policy.md), ranging from simple single-owner approval to complex multi-signature thresholds.

#### Workspace Hierarchies

Workspaces can form hierarchies where **child workspaces inherit their parent's policies by default**. This enables organizational structures that mirror real-world team setups:

- A parent workspace can define organization-wide security policies
- Child workspaces inherit these policies automatically
- Child workspaces can override inherited policies with stricter requirements
- This hierarchy allows departments, teams, or projects to operate with appropriate autonomy while maintaining organizational security standards

#### Institutional Use Cases

Workspaces give zrChain a programmable access control layer that makes dMPC practical for real teams and institutions:

- **Treasury management**: Multiple signers required for large transactions
- **Departmental autonomy**: Engineering, operations, and finance teams can each have child workspaces with appropriate policies
- **Audit compliance**: Admin policy changes can require board-level approval while day-to-day signing uses team-level thresholds
- **Key rotation**: Rotate keys without changing the workspace governance structure
