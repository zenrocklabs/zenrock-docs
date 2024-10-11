---
title: zrSign.sol
sidebar_label: zrSign.sol
sidebar_position: 2
---

# ZrSign Contract: Developer Documentation

This document provides a detailed overview of the `ZrSign` contract, which extends the `Sign` contract and implements the `IZrSign` interface. It is designed for developers integrating with the Zenrock protocol. 

## Contract Overview

The `ZrSign` contract manages wallet type configurations, chain ID support, fee settings, and administrative functions for the Zenrock protocol.

## Initialization

### `initializeV1()`

Initializes the contract for version 1. This function should be called only once after deployment.

- Functionality:
  1. Calls internal initialization functions
  2. Grants the `DEFAULT_ADMIN_ROLE` to the contract deployer

## Configuration Functions

### `walletTypeIdConfig(uint256 purpose, uint256 coinType, bool support)`

Configures support for specific wallet types based on purpose and coin type.

- Parameters:
  - `purpose`: The intended use or category of the wallet type
  - `coinType`: The specific coin or token type associated with the wallet
  - `support`: Boolean indicating whether to add or remove support
- Access: Restricted to `DEFAULT_ADMIN_ROLE`
- Emits: `WalletTypeIdSupport` event

### `chainIdConfig(bytes32 walletTypeId, string memory caip, bool support)`

Manages support for specific chain IDs, allowing adaptation to new blockchain networks.

- Parameters:
  - `walletTypeId`: The identifier for the wallet type associated with this chain ID
  - `caip`: The blockchain identifier (CAIP standard) to configure
  - `support`: Boolean indicating whether to add or remove support
- Access: Restricted to `DEFAULT_ADMIN_ROLE`
- Emits: `ChainIdSupport` event

## Fee Management

### `updateMPCFee(uint256 newMPCFee)`

Sets the base fee required for initiating operations within the contract.

- Parameters:
  - `newMPCFee`: The new base fee to be set for contract operations
- Access: Restricted to `FEE_ROLE`

### `updateRespGas(uint256 newRespGas)`

Updates the gas amount reserved for response transactions.

- Parameters:
  - `newRespGas`: The new gas amount for response transactions
- Access: Restricted to `FEE_ROLE`

### `updateRespGasBuffer(uint256 newRespGasBuffer)`

Updates the gas buffer for response transactions.

- Parameters:
  - `newRespGasBuffer`: The new gas buffer amount
- Access: Restricted to `FEE_ROLE`

### `withdrawMPCFees()`

Allows the withdrawal of collected fees from the contract.

- Access: Restricted to `FEE_ROLE`
- Security: Implements nonReentrant guard

## Administrative Functions

### `pause()`

Pauses the contract, preventing certain operations.

- Access: Restricted to `PAUSER_ROLE`

### `unpause()`

Unpauses the contract, re-enabling paused operations.

- Access: Restricted to `PAUSER_ROLE`

## Role-Based Access Control

The contract uses the following roles for access control:

- `DEFAULT_ADMIN_ROLE`: For administrative tasks
- `FEE_ROLE`: For fee-related operations
- `PAUSER_ROLE`: For pausing and unpausing the contract

## Events

- `WalletTypeIdSupport`: Emitted when wallet type support is configured
- `ChainIdSupport`: Emitted when chain ID support is configured

## Integration Notes

- Ensure proper role assignment for administrative functions
- Handle potential reverts due to access control or invalid parameters
- Monitor emitted events for configuration changes and support updates
- Be aware of the contract's pausable nature and its impact on operations

