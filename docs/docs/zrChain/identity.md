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

**_Workspaces_** allow users (Workspace owners) to manage sets of keys. This allows key rotation and decouples the risk from managing wallets through one single account.

Apart from having associated keys, workspace settings also define [policies](policy.md) for admin and signature tasks.

Policies define governance of the Workspace. They typically specify which combination of accounts must provide approval for a signature to be considered valid.

Policies also provide a governance structure for Workspace changes and can be used to prevent giving a single account full control over the Workspace.
