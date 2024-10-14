---
title: Sign.sol
sidebar_label: Sign.sol
sidebar_position: 2
---

# Sign Contract: Request Functions Documentation

This document provides a detailed overview of the request functions in the Sign contract, designed for developers integrating with the ZrSign protocol.

The `Sign.sol` contract contains the main functions that receive the various requests from the contract directly, or from third party smart contracts that are integrating the ZrSign contract.

## Key Request Function

### `zrKeyReq(SignTypes.ZrKeyReqParams memory params)`

This function initiates a key generation request for a specific wallet type.

#### Parameters:
- `params`: A struct containing:
  - `walletTypeId`: Identifier for the wallet type. 
  - `owner`: Address of the wallet owner
  - `options`: Flags for additional options (e.g., monitoring). Value `1` is a normal, regular wallet. Value `2` is a monitoring wallet, which means that Zenrock will actively monitor the wallet to compose UTXOs in the most efficient manner 

##### Options Parameters:
- `1`: Normal wallet. The key-holder or the key requesting smart contract needs to manage gas management and nonces.
- `2`: Monitoring wallet. Zenrock will manage everything around the key, including gas management and nonces. Also in the case of BTC, Zenrock will compose UTXOs to the most efficient manner. If you are using the `simpleTx` function, this parameter is recommended. The request fees for the monitoring wallets are higher.

#### Functionality:
1. Validates the `options` parameter is non-zero.
2. Calculates the wallet index based on existing wallets for the user.
3. Estimates fees based on options and provided value.
4. Checks if sufficient fees are provided.
5. Updates the wallet registry with request status and fees.
6. Emits a `ZrKeyRequest` event with request details.

#### Notes:
- Reverts if insufficient fees are provided.
- Reverts if invalid options are specified.
- Updates total MPC fees collected.

## Signature Request Functions

### `zrSignHash(SignTypes.ZrSignParams memory params)`

Initiates a request to sign a hash.

#### Parameters:
- `params`: A struct containing:
  - `walletTypeId`: Identifier for the wallet type
  - `walletIndex`: Index of the wallet to use
  - `dstChainId`: Destination chain ID, composed of the [supported CAIPs](../releases/addresses.md#caips-for-zrSign)
  - `payload`: Data to be signed (must be exactly 32 bytes)
  - `broadcast`: Flag for broadcasting (not applicable for hash signing)

#### Functionality:
1. Checks if broadcasting is requested (not allowed for hash signing).
2. Prepares signature request parameters.
3. Calls internal `_sigReq` function to process the request.

#### Notes:
- Reverts if broadcasting is requested.
- Uses `walletTypeGuard` and `chainIdGuard` modifiers for validation.

### `zrSignTx(SignTypes.ZrSignParams memory params)`

Initiates a request to sign a transaction.

#### Parameters:
- Similar to `zrSignHash`, but `payload` contains transaction data.

#### Functionality:
1. Prepares signature request parameters with transaction-specific flags.
2. Calls internal `_sigReq` function to process the request.

#### Notes:
- Allows for optional broadcasting of the signed transaction.
- Uses `walletTypeGuard` and `chainIdGuard` modifiers for validation.

### `zrSignSimpleTx(SignTypes.ZrSignParams memory params)`

Initiates a request to sign a simple transaction for monitored wallets. SimpleTx is a zrSign transaction type that enables users to specify only the recipient, value, and data, while all other necessary details are automatically retrieved by the nodes. This eliminates the need for users or dApps to track nonces, gas parameters for EVMs, or manage UTXO composition for BTC. The only requirement for using SimpleTx is specifying wallet option 2.

#### Parameters:
- Similar to `zrSignTx`.

#### Functionality:
1. Prepares signature request parameters with simple transaction flags.
2. Calls internal `_sigReq` function to process the request.

#### Notes:
- Requires the wallet to be registered for monitoring.
- Uses `walletTypeGuard`, `chainIdGuard`, and `monitoringGuard` modifiers.

## Internal Request Processing

### `_sigReq(SignTypes.SigReqParams memory params)`

Internal function to process all signature requests.

#### Functionality:
1. Estimates and validates fees.
2. Checks wallet registration status.
3. Increments and assigns a trace ID for the request.
4. Updates request registry with status and value.
5. Emits a `ZrSigRequest` event with request details.

#### Notes:
- Called by all public signature request functions.
- Handles fee collection and request tracking.

## Common Features

- All request functions are `payable` and require appropriate fees.
- Requests are tracked using a trace ID system.
- Events are emitted for each request for off-chain tracking.
- Extensive input validation and access control checks are performed.

## Integration Notes

- Ensure sufficient fees are provided with each request.
- Handle potential reverts due to insufficient fees or invalid parameters.
- Monitor emitted events for request tracking and processing.
- Be aware of the differences between hash, transaction, and simple transaction signing requests.

