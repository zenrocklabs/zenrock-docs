---
title: zrChain Introduction
sidebar_label: zrChain
sidebar_position: 2
---

## Overview

The Zenrock Blockchain is the flagship product of the Zenrock project to provide bedrock security infrastructure that will support an omnichain future. Through our custom modules for identity and asset management, we provide a comprehensive means to build applications to **_natively_** interact with the largest blockchain networks.

### Policies

Policies define the conditions that need to be met in order for the request to be processed by the corresponding keyring, like Zenrock's MPC. The policies contain participants that are eligible to approve and reject requests.

Once a request is formed, by for example requesting a signature, actions for other workspace owners or admins are being created, as defined in the workspace's policy. Once the condition specified in the respective workspace policy is met, the request is published and can further be processed by the MPCs.

While policies on Zenrock are already very powerful and help to split risk and control across multiple accounts, we are aiming to improve our policy engine to allow more nuanced policy conditions. 

### zrChain Actively Validated Services

zrChain adds economic security through an Eigenlayer integration which enables supplying economic collateral to a smart contract that is connected with zrChain's validation module. If validators misbehave, they risk getting slashed and losing their stake on zrChain directly as well as on the smart contract on Ethereum. 

### Smart Contracts with CosmWasm

Besides providing three custom [modules](../zrChain/architecture.md), Zenrock also has support for CosmWasm. The rust-based smart contract language allows building more dynamic use cases, dapps and other features to facilitate a rapid development and cost-effective interaction.

For more detailed information about zrChain, check out the [zrChain docs](../zrChain/architecture.md).

### Cosmos SDK

zrChain is built with the Cosmos SDK which is a modular blockchain framework customized to build application-specific blockchains with their own set of validators and connected to the cosmos ecosystem with the IBC protocol. Besides easily implementing your own custom modules, the Cosmos SDK brings standard modules that cover the basics of blockchain interaction, like for example the interface to CometBFT - the underlying consensus engine. This allows Zenrock to be highly performant, compatible and tailored for its own applications.