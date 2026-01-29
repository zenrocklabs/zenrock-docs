---
title: zrChain Introduction
sidebar_label: zrChain
sidebar_position: 2
---

## Overview

The Zenrock Blockchain is the flagship product of the Zenrock project to provide bedrock security infrastructure that will support an omnichain future. Through our custom modules for identity and asset management, we provide comprehensive means to build applications to **_natively_** interact with the largest blockchain networks.

### Policies

Policies define the conditions that need to be met in order for the request to be processed by the corresponding keyring, like Zenrock's MPC. The policies contain participants that are eligible to approve and reject requests.

Once a request is formed, for example by requesting a signature, actions for other workspace owners or admins are being created, as defined in the workspace's policy. Once the condition specified in the respective workspace policy is met, the request is published and can further be processed by the MPCs.

While policies on Zenrock are already very powerful and help to split risk and control across multiple accounts, Zenrock is aiming to improve its policy engine to allow more nuanced policy conditions.

### zrChain Security Model

zrChain's security is underpinned by the ROCK token, which validators stake to participate in consensus. The validation module manages stake, voting power, and slashing conditions. Misbehaving validators risk losing their staked ROCK, ensuring honest participation in the network. 

### Smart Contracts with CosmWasm

Besides providing three custom [modules](../zrChain/architecture.md), Zenrock also has support for CosmWasm. The rust-based smart contract language allows building more dynamic use cases, dapps and other features to facilitate a rapid development and cost-effective interaction.

For more detailed information about zrChain, check out the [zrChain docs](../zrChain/architecture.md).

### Cosmos SDK

zrChain is built with the Cosmos SDK which is a modular blockchain framework customized to build application-specific blockchains with their own set of validators and connected to the Cosmos ecosystem with the IBC protocol. Besides easily implementing your own custom modules, the Cosmos SDK brings standard modules that cover the basics of blockchain interaction, like for example the interface to CometBFT - the underlying consensus engine. This allows Zenrock to be highly performant, compatible and tailored for its own applications.