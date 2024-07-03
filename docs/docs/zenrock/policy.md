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

### Passkeys

**_Passkeys_** enable keys derived from biometrics to be used as workspace approvers.

When passkeys are implemented, approvals can only be sourced from a certain device or classic Web2 account. Passkeys may be used to ease access and improve the usability of policies.
