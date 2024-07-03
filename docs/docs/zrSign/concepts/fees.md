---
title: Fees
sidebar_label: Fees
sidebar_position: 2
---

## Transaction Fees

Interacting with the zrSign smart contract requires transaction fees like any other smart contract interaction. 
When a key was successfully created and returned to the smart contract, the corresponding address needs to be funded
in order to broadcast transactions by themselves, even though the signed transaction is valid.

zrSign is deployed on various networks with different transaction fees that could help keeping operational costs low. 

## Request Fees

zrSign additionally charges a small fee for key and signature requests which are used to support and maintain the network. 
The affordable key and signature request fee is charged during the request and is added on top of the transaction fee. 

## Relayer Fees

The relayer is responsible for picking up and assembling unsigned transactions and their signature that was returned by the dMPC. 
Furthermore, the relayer broadcasts the transaction to the indicated network. 

There are **no additional fees** for the relayer service. In fact, users can run their own relayer services since all required
information is available in the smart contract. Zenrock will provide a reference implementation in the future.