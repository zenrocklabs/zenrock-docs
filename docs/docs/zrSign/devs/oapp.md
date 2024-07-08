---
title: LayerZero zrSign OApp
sidebar_label: zrSign OApp
sidebar_position: 4
---

## Introduction
LayerZero provides a solution for general message passing between custom smart contracts on different chains, called OApps. 
Such OApps can be used to forward key and signature requests from networks where zrSign is not deployed (yet) and bundle resources for zrSign-based cross-chain dapps. 

For further information on OApp implementation we can recommend the [LayerZero Docs](https://docs.layerzero.network/v2/developers/evm/oapp/overview).


### zrSign OApp
The zrSign OApp has been developed to enhance accessibility and interaction with zrSign functionalities across LayerZero-supported blockchains. 

With this OApp, users can seamlessly interact with a zrSign contract deployed on an external blockchain, providing the flexibility to manage zrSign MPC keys from various external chains where the OApp is deployed. Requests are sent from the source OApp to the destination OApp, where the zrSign contract is located, allowing the contract to receive and execute these requests efficiently.


- **Outgoing OApp**: The "outgoing" OApp is the LZ OApp that a user interacts with on a chain where the zrSign contracts are not deployed. This OApp will send a request through the LayerZero stack to the "incoming" OApp that then interacts with the zrSign contracts.

- **Incoming OApp**: The "incoming" OApp is the one receiving requests and forwarding it to the zrSign contract deployed on the same chain.

![zrsign-oapp-flow-simple](../../../static/img/zrsign-oapp-flow-simple.svg)

## Supported Networks

Full list of OApp deployments coming soon...

## Functions

- `zrKeyReq`
- `zrSigForTx`
