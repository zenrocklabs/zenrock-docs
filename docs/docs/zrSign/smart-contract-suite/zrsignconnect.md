---
title: zrSignConnect.sol
sidebar_label: zrSignConnect.sol
sidebar_position: 3
---

# ZrSignConnect Contract Documentation

The `ZrSignConnect` abstract contract provides a connection to the ZrSign smart contract, allowing for wallet management and transaction signing across different blockchain networks, including EVM-compatible chains and Bitcoin.

## Constants

- `WALLET_REQUESTED`: Set to 1, indicates a wallet has been requested.
- `WALLET_REGISTERED`: Set to 2, indicates a wallet has been registered.
- `OPTIONS_MONITORING`: Set to 2, used for monitoring options.
- `SIG_REQ_IN_PROGRESS`: Set to 1, indicates a signature request is in progress.
- `SIG_REQ_ALREADY_PROCESSED`: Set to 2, indicates a signature request has already been processed.
- `EVM_WALLET_TYPE`: Constant for EVM wallet type identification.
- `BTC_WALLET_TYPE`: Constant for Bitcoin wallet type identification.

## Constructor

Initializes the contract with the address of the ZrSign contract.

## Wallet Management Functions

### `requestNewEVMWallet`

Requests a new EVM wallet from the ZrSign contract.

- `options`: Specifies additional options for the wallet request.

### `requestNewBTCWallet`

Requests a new Bitcoin wallet from the ZrSign contract.

- `options`: Specifies additional options for the wallet request.

### `getEVMWallets`

Retrieves all EVM wallets associated with this contract.

### `getEVMWallet`

Retrieves a specific EVM wallet by index.

- `index`: The index of the wallet to retrieve.

### `getBTCWallets`

Retrieves all Bitcoin wallets associated with this contract.

### `getBTCWallet`

Retrieves a specific Bitcoin wallet by index.

- `index`: The index of the wallet to retrieve.

## Signature Request Functions

### `reqSignForHash`

Requests a signature for a specific hash.

- `walletTypeId`: The ID of the wallet type (EVM or BTC).
- `walletIndex`: The index of the wallet to use for signing.
- `dstChainId`: The destination chain ID.
- `payloadHash`: The hash of the payload to be signed.

### `reqSignForTx`

Requests a signature for a transaction.

- `walletTypeId`: The ID of the wallet type (EVM or BTC).
- `walletIndex`: The index of the wallet to use for signing.
- `dstChainId`: The destination chain ID.
- `payload`: The RLP-encoded transaction data.
- `broadcast`: Flag indicating whether to broadcast the transaction immediately.

### `reqSignForSimpleTx`

Requests a signature for a simple transaction.

- `walletTypeId`: The ID of the wallet type (EVM or BTC).
- `walletIndex`: The index of the wallet to use for signing.
- `dstChainId`: The destination chain ID.
- `to`: The recipient's address.
- `value`: The amount to send.
- `data`: Additional transaction data.
- `broadcast`: Flag indicating whether to broadcast the transaction immediately.

## Utility Functions

### `rlpEncodeData`

Encodes data using RLP (Recursive Length Prefix) encoding.

### `rlpEncodeTransaction`

Encodes a transaction using RLP encoding.

### `toHexString`

Converts an address or a uint256 value to a hexadecimal string.

### `toChecksumHexString`

Converts an address to a checksum-encoded hexadecimal string.

## Events

- `Received`: Emitted when Ether is received by the contract.
- `FallbackCalled`: Emitted when the fallback function is called.

## Error

- `StringsInsufficientHexLength`: Thrown when the provided value cannot be represented within the specified hex length.

This contract provides a comprehensive set of tools for managing wallets and signing transactions across different blockchain networks, with a focus on EVM-compatible chains and Bitcoin. It leverages the ZrSign system for secure key management and transaction signing.
