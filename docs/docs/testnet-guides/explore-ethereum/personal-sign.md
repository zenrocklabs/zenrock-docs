---
title: WalletConnect Personal Sign 
sidebar_label: Personal Sign
sidebar_position: 2
---

1. After establishing a connection with a zrChain key within WalletConnect, you should see a list of methods that WalletConnect provides. We are interested in the first one - "Personal Sign".

Personal sign is a simple signature request that is not used to sign a transaction. It can be used for authentication purposes to prove ownership of this address.

![WalletConnect Menu](../../../static/img/wc-menu.png)

2. Click on it and you will see it prompts a sign request for the connected wallet.

![WalletConnect Approve Connection](../../../static/img/wc-approve-connection.png)

3. Check the Zenrock web application frontend. You should see a counter over “Sign Requests”. This request is the one coming from WalletConnect. Approving it creates a signature request transaction on zrChain with the payload provided by the request from WalletConnect. Approve the request. 

![WalletConnect Personal Sign](../../../static/img/wc-personal-sign.png)

4. The MPC Network processes the request and returns a signature. This signature gets returned to the WalletConnect app where it gets verified. After successful verification, WalletConnect gives an approved notification with the details. The result is the signature returned by the MPC Network which is successfully verified.

![WalletConnect Approved Personal Sign](../../../static/img/wc-approved-sign.png)
