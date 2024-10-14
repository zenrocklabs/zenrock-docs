---
title: Overview
sidebar_label: Overview
sidebar_position: 1
---

# ZrSign Smart Contract Suite Documentation

## Overview

The smart contract suite is referring to the [ZrSign](https://github.com/zenrocklabs/zr-sign) project repository, in particular the [contracts/zr](https://github.com/zenrocklabs/zr-sign/tree/main/contracts/zr) folder.

The ZrSign smart contract suite provides a robust and flexible system for managing keys, signatures, and wallet operations across multiple blockchain networks. This suite is designed for developers who need to integrate MPC-based key and signing capabilities into their decentralized applications.

## Core Components

### 1. Sign.sol

`Sign.sol` is the abstract base contract that implements core signing functionalities:

- Key request and response handling
- Signature request and response processing
- Wallet type and chain ID management
- Fee structure and access control

### 2. ZrSign.sol

`ZrSign.sol` extends `Sign.sol` to provide a concrete implementation with additional features:

- Specific role definitions (FEE_ROLE, PAUSER_ROLE)
- External configuration functions
- Fee management and withdrawal of generated fees

The deployed ZrSign smart contract is the one that is used to request wallets, signatures and manage transactions and where the MPC instances are subscribed to. You can find the deployed ZrSign smart contracts on the [releases page](../releases/addresses.md).

### 3. zrSignConnect.sol

`zrSignConnect.sol` is an abstract contract that facilitates interaction with ZrSign. It's primary purpose is to provide a common interface for interacting with the deployed ZrSign smart contracts. It can be used as a base smart contract for developers to extend it to their own requirements, as described in the [ZrSign Direct Guide](../../testnet-guides/zrSign/zrSign-tutorial/build-zrSign-hello-world.md):

- Helper functions for wallet requests
- Signature and transaction signing requests
- Utility functions for RLP encoding and address formatting

### 4. ZrSignUpgrader.sol

`ZrSignUpgrader.sol` manages the upgrade process for the ZrSign contract. This one is primarily for the ZrSign team to use:

- Handles implementation upgrades
- Transfers proxy admin roles
- Includes safety measures and self-destruct functionality

## Key Features

- Multi-chain support
- Flexible wallet type management
- Secure key and signature request handling
- Upgradeable contract architecture
- Fee management and economic incentives

## Integration Guide

To integrate ZrSign into your project. You can use the [ZrSign Direct Guide](../../testnet-guides/zrSign/zrSign-tutorial/build-zrSign-hello-world.md) to get started.

1. Deploy ZrSign using a proxy pattern for upgradeability.
2. Inherit from zrSignConnect in your contract to interact with ZrSign.
3. Use the provided functions to request wallets, signatures, and manage transactions.
