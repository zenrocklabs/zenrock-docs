---
title: Policy Module
sidebar_label: Policy Module
sidebar_position: 6
---

Zenrock's **_Policy Module_** handles permissions and conditions around managing workspaces, keyrings and assets on Zenrock.

### Policies

Policies are integrated in some messages of the [identity](identity.md) and [treasury](treasury.md) modules. Such messages are only valid if the conditions specified by the policy - for example, multiple approvals - are fulfilled.

When approvals from other owners or admins are required, an **_action_** to approve the request is issued to the respective accounts.

Actions are valid for a defined number of blocks - if the terms of the policy are not fulfilled by the specified block height, the message will be rejected.

This ensures that relevant accounts are notified of pending actions and prevents requests from getting stuck in a perpetually pending state.

Policies are generally free from admin or sign context. What gives it the context is if the policy is applied in the workspace as an admin and/or sign policy. However, it is required that participants of the policy are part of the workspace. The following list shows which messages fall under which policy.

#### Admin Policy Messages

- `MsgAddWorkspaceOwner`
- `MsgAppendChildWorkspace`
- `MsgRemoveWorkspaceOwner`
- `MsgUpdateWorkspace`

#### Sign Policy Messages

- `MsgNewICATransactionRequest`
- `MsgNewKeyRequest`
- `MsgNewSignTransactionRequest`
- `MsgNewSignatureRequest`

### Passkeys

**_Passkeys_** enable keys derived from biometrics to be used as workspace approvers. We will add them to the workspace so that users could approve an action for a trusted device they own, adding another factor to their approval process.

When passkeys are implemented, approvals can only be sourced from a certain device or classic Web2 account. This will add a second layer of security to the workspace. Passkeys may be used to ease access and improve the usability of policies.
