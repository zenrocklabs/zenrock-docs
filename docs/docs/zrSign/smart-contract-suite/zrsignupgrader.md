---
title: ZrSignUpgrader.sol
sidebar_label: ZrSignUpgrader.sol
sidebar_position: 4
---

# ZrSignUpgrader Contract Documentation

## Overview

The `ZrSignUpgrader` contract is designed to facilitate the upgrade process for a `ZrProxy` contract. It provides functionality to upgrade the implementation of the proxy, transfer admin rights, and self-destruct after the upgrade process is complete.

## Contract Details

### State Variables

- `_proxy`: Internal variable storing the `ZrProxy` contract instance.
- `_implementation`: Internal variable storing the address of the new implementation contract.
- `_newProxyAdmin`: Internal variable storing the address of the new proxy admin.
- `_owner`: Internal variable storing the address of the contract owner.

### Modifiers

- `onlyOwner`: Ensures that only the contract owner can call the function.

### Constructor

`constructor(ZrProxy proxy, address implementation, address newProxyAdmin)`

Initializes the contract with the following parameters:
- `proxy`: The `ZrProxy` contract to be upgraded.
- `implementation`: The address of the new implementation contract.
- `newProxyAdmin`: The address of the new proxy admin.

Sets the `_owner` to the contract deployer.

### Functions

#### upgrade

`function upgrade() external onlyOwner`

Performs the upgrade process:
1. Upgrades the proxy to the new implementation.
2. Transfers the proxy admin role to the new admin.
3. Calls the `tearDown` function to self-destruct the upgrader contract.

Can only be called by the contract owner.

#### proxy

`function proxy() external view returns (address)`

Returns the address of the `ZrProxy` contract.

#### implementation

`function implementation() external view returns (address)`


Returns the address of the new implementation contract.

#### newProxyAdmin

`function newProxyAdmin() external view returns (address)`

Returns the address of the new proxy admin.

#### abortUpgrade

`function abortUpgrade() external onlyOwner`

Aborts the upgrade process:
1. Transfers the proxy admin role to the new admin.
2. Calls the `tearDown` function to self-destruct the upgrader contract.

Can only be called by the contract owner.

#### tearDown (internal)

`function tearDown() internal`

Internal function that self-destructs the contract, sending any remaining ETH to the caller.

## Security Considerations

- The contract uses the `onlyOwner` modifier to restrict access to critical functions.
- The `selfdestruct` function in `tearDown` should be used with caution, as it permanently destroys the contract.
- Ensure that the correct addresses are provided during contract deployment to avoid potential issues during the upgrade process.

## Usage

1. Deploy the `ZrSignUpgrader` contract with the appropriate parameters.
2. Call the `upgrade` function to perform the upgrade process.
3. If needed, call `abortUpgrade` to cancel the upgrade and transfer admin rights.

Note: After calling either `upgrade` or `abortUpgrade`, the contract will self-destruct and become unusable.
