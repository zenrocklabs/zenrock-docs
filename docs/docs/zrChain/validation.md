---
title: Validation Module
sidebar_label: Validation Module
sidebar_position: 7
---

Zenrock's **_Validation Module_** is zrChain's economic security module, effectively replacing the staking module.

Besides the features of the staking module, the validation module also facilitates the support of vote extensions which are necessary to support additional economic security through an EigenLayer integration.

### Vote Extensions

Using Vote Extensions, validators can vote on arbitrary data as part of the consensus process in CometBFT, before it is accepted on-chain. So instead of an oracle simply submitting data after being whitelisted, all validators would run the oracle sidecar, and vote on the data returned from it during the pre-block consensus process. This means a super-majority of zrChain stake will need to agree on a set of values from the oracle, enshrining the oracle system behind the same amount of economic security securing the blockchain network (CometBFT requires a super-majority of at least 2/3 of all protocol stake for consensus, including for VEs).

The oracle will be running as a separate sidecar daemon running a GRPC server. This means that the blockchain node can query the GRPC port of the oracle sidecar running locally to get the most recent price and contract state data and vote on it every block.

This novel architecture should enable us to offer the same level of security for our critical oracle infrastructure as the rest of the Zenrock chain.