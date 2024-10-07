---
title: Get Started
sidebar_label: Get Started
sidebar_position: 1
---

## Overview
Welcome to the developer section of the zrSign protocol. 

This section contains information about the zrSign smart contracts, how to interact with it,
the provided functions, deployed instances, and a reference implementation how to connect 
a dapp with zrSign. 

Zenrock's MPC nodes are connected asynchronously to the zrSign smart contract and are subscribed
to new key and signature requests that get published on zrSign. Only Zenrock's MPCs are 
authorized to publish responses with public keys and signatures. 

## zrSign Smart Contracts

All smart contracts are made for the evm ecosystem and are deployed in solidity.
Find the deployed and supported smart contracts in the ***[addresses](../releases/addresses.md)*** page.

### zrSign

zrSign exposes core external functions that can be called either directly or by other smart contracts.
Those are `zrKeyReq` to request a new public key as well as different signature request functions. 

- `zrSignHash` - a signature request for a hash, which can be used to obfuscate the actual signing mechanisms.
- `zrSignTx` - a signature request for unsigned transactions. Requires to assemble the unsigned tx and the signature to relay it to the destination chain.

A more detailed description can be found at the ***[functions](functions.md)*** page.

Furthermore, zrSign provides functions to query existing `keys` or `wallets` 
as well as further information such as `walletTypeInfo` or supported `chainIds`.

Signature lifecycles are tracked with a `traceId`, which allows for improved managing
and referencing of a request for the MPCs and also the caller.

Lastly, this contract also provides setters for key and signature request fees, 
which can only be called by the zrSign admin.

### zrProxy

zrSign is an upgradeable smart contract protocol enabled by the `zrProxy` smart contract.
The upgradeablity through this proxy allows Zenrock to upgrade the zrSign protocol
without introducing breaking changes to dApps that are integrating zrSign.
This backwards capability allows us to provide the best possible way of adding and improving
features while giving the best experience to our developers.

### Reference Implementations

To make adopting and integrating zrSign as seamless as possible, there are reference implementations 
available under ***[reference implementation](./references/zrsign-connect.md)***. 