---
title: zrSign Connect
sidebar_position: 3
---

# Abstract Contract: zrSignConnect

This contract abstracts some functions that make use of the zrSign contract. zrSign is assumed to be a contract that manages the creation and retrieval of Ethereum wallets, as well as other operations related to wallet management.

In this contract, we are using a library Lib_RLPWriter to handle encoding of various data types into Recursive Length Prefix (RLP) format. RLP is a method of encoding arbitrarily nested arrays of binary data, and it's the main encoding method used to serialize objects in Ethereum.

```solidity
using Lib_RLPWriter for address;
using Lib_RLPWriter for uint256;
using Lib_RLPWriter for bytes;
using Lib_RLPWriter for bytes[];
```

This is the address of the zrSign contract we will be interacting with. It is set to a constant value:

```solidity
address public constant zrSign = payable(address(0x8F309C9550D0d69C3f9b8d7BCdC7C93B05Cd089e));
```

The wallet type for EVM-based wallets is defined here:

```solidity
bytes32 public constant EVMWalletType = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;
```

## Functions

### requestNewEVMWallet

This function requests a new public key for the EVM wallet type by interacting with the zrSign contract. It retrieves the current fee required for zrSign operations from the contract and then makes the request.

```solidity
function requestNewEVMWallet() public virtual {
    uint256 fee = getzrSignFee();
    IzrSign(zrSign).requestPublicKey{value: fee}(EVMWalletType);
}
```

### requestSignatureForTransaction

This function requests a signature for a transaction by interacting with the zrSign contract. It retrieves the current fee required for zrSign operations from the contract and then makes the request.

```solidity
function requestSignatureForTransaction(
    bytes32 walletTypeId,
    uint256 publicKeyIndex,
    bytes32 dstChainId,
    bytes memory rlpTransactionData,
    bool broadcast
) internal virtual {
    uint256 fee = getzrSignFee();
    IzrSign(zrSign).requestSignatureForTransaction{value: fee}(
        walletTypeId,
        publicKeyIndex,
        dstChainId,
        rlpTransactionData,
        broadcast
    );
}
```

### getEVMWallets

This function retrieves all wallets of the EVM type associated with this contract by interacting with the zrSign contract.

```solidity
function getEVMWallets() public view virtual returns (string[] memory) {
    return IzrSign(zrSign).getWallets(EVMWalletType, address(this));
}
```

### setCustomFee

This function sets the fee for zrSign operations, which is stored in an internal variable.

```solidity
function setCustomFee(uint256 fee) public virtual {
    _zrSignFee = fee;
}
```

### setDefaultFee

This function retrieves the current fee from the zrSign contract and sets the internal zrSign fee to that value.

```solidity
function setDefaultFee() public virtual {
    uint256 newFee = IzrSign(zrSign).getFee();
    setCustomFee(newFee);
}
```

### getzrSignFee

This function returns the current fee for zrSign operations.

```solidity
function getzrSignFee() public view virtual returns (uint256) {
    return _zrSignFee;
}
```

### rlpEncodeData

This function encodes data into RLP format using the RLPWriter library.

```solidity
function rlpEncodeData(bytes memory data) internal pure returns (bytes memory) {
    return data.writeBytes();
}
```

### rlpEncodeTransaction

This function encodes a transaction into RLP format using the RLPWriter library. It accepts various parameters that constitute a transaction.

```solidity
function rlpEncodeTransaction(
    uint256 nonce,
    uint256 gasPrice,
    uint256 gasLimit,
    address to,
    uint256 value,
    bytes memory data
) internal pure returns (bytes memory) {
    bytes memory encodedNonce = nonce.writeUint();
    bytes memory encodedGasPrice = gasPrice.writeUint();
    bytes memory encodedGasLimit = gasLimit.writeUint();
    bytes memory encodedTo = to.writeAddress();
    bytes memory encodedValue = value.writeUint();
    return _encodeTransaction(encodedNonce, encodedGasPrice, encodedGasLimit, encodedTo, encodedValue, data);
}
```

### _encodeTransaction

This is a helper function used by the rlpEncodeTransaction function to encode a transaction into RLP format. The function constructs the payload of a transaction as an array of bytes.

```solidity
function _encodeTransaction(
    bytes memory nonce,
    bytes memory gasPrice,
    bytes memory gasLimit,
    bytes memory to,
    bytes memory value,
    bytes memory data
) internal pure returns (bytes memory) {
    bytes memory zeroBytes = uint256(0).writeUint();
    bytes[] memory payload = new bytes[](9);
    payload[0] = nonce;
    payload[1] = gasPrice;
    payload[2] = gasLimit;
    payload[3] = to;
    payload[4] = value;
    payload[5] = data;
    payload[6] = zeroBytes;
    payload[7] = zeroBytes;
    payload[8] = zeroBytes;
    return payload.writeList();
}
```

## Full code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../interfaces/IzrSign.sol";
import "../libraries/Lib_RLPWriter.sol";

// Abstract contract for zrSign connections
abstract contract ZrSignConnect {
    // Use the RLPWriter library for various types
    using Lib_RLPWriter for address;
    using Lib_RLPWriter for uint256;
    using Lib_RLPWriter for bytes;
    using Lib_RLPWriter for bytes[];

    // Address of the ZrSign contract
    address internal constant zrSign =
        payable(address(0x8F309C9550D0d69C3f9b8d7BCdC7C93B05Cd089e)); // ZrSign Sepolia address

    // The wallet type for EVM-based wallets
    bytes32 internal constant EVMWalletType =
        0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;

    // Request a new EVM wallet
    // This function uses the ZrSign contract to request a new public key for the EVM wallet type
    function requestNewEVMWallet() public virtual {
        uint256 _fee = IZrSign(zrSign).getBaseFee();
        // Prepare the parameters for the key request
        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: EVMWalletType
        });
        IZrSign(zrSign).zrKeyReq{value: _fee}(params);
    }

    // Request a signature for a specific hash
    // This function uses the ZrSign contract to request a signature for a specific hash
    // Parameters:
    // - walletTypeId: The ID of the wallet type associated with the hash
    // - fromAccountIndex: The index of the public key to be used for signing
    // - dstChainId: The ID of the destination chain
    // - payloadHash: The hash of the payload to be signed
    function reqSignForHash(
        bytes32 walletTypeId,
        uint256 walletIndex,
        bytes32 dstChainId,
        bytes32 payloadHash
    ) internal virtual {
        uint256 _fee = calculateFeeForSign(abi.encode(payloadHash));
        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
            walletTypeId: walletTypeId,
            walletIndex: walletIndex,
            dstChainId: dstChainId,
            payload: abi.encodePacked(payloadHash),
            broadcast: false // Not used in this context
        });

        IZrSign(zrSign).zrSignHash{value: _fee}(params);
    }

    // Request a signature for a specific data payload
    // This function uses the ZrSign contract to request a signature for a specific data payload
    // Parameters:
    // - walletTypeId: The ID of the wallet type associated with the data payload
    // - fromAccountIndex: The index of the public key to be used for signing
    // - dstChainId: The ID of the destination chain
    // - payload: The data payload to be signed
    function reqSignForData(
        bytes32 walletTypeId,
        uint256 walletIndex,
        bytes32 dstChainId,
        bytes memory payload
    ) internal virtual {
        uint256 _fee = calculateFeeForSign(abi.encode(payload));
        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
            walletTypeId: walletTypeId,
            walletIndex: walletIndex,
            dstChainId: dstChainId,
            payload: payload,
            broadcast: false
        });
        IZrSign(zrSign).zrSignData{value: _fee}(params);
    }

    // Request a signature for a transaction
    // This function uses the zrSIgn contract to request a signature for a transaction
    // Parameters:
    // - walletTypeId: The ID of the wallet type associated with the transaction
    // - fromAccountIndex: The index of the account from which the transaction will be sent
    // - chainId: The ID of the chain on which the transaction will be executed
    // - payload: The RLP-encoded transaction data
    // - broadcast: A flag indicating whether the transaction should be broadcasted immediately

    function reqSignForTx(
        bytes32 walletTypeId,
        uint256 walletIndex,
        bytes32 dstChainId,
        bytes memory payload,
        bool broadcast
    ) internal virtual {
        uint256 _fee = calculateFeeForSign(abi.encode(payload));
        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
            walletTypeId: walletTypeId,
            walletIndex: walletIndex,
            dstChainId: dstChainId,
            payload: payload,
            broadcast: broadcast
        });

        IZrSign(zrSign).zrSignTx{value: _fee}(params);
    }

    function calculateFeeForSign(bytes memory payload)
        public
        view
        returns (uint256)
    {
        uint256 networkFee = payload.length * IZrSign(zrSign).getNetworkFee();
        uint256 totalFee = IZrSign(zrSign).getBaseFee() + networkFee;
        return totalFee;
    }

    // Get all EVM wallets associated with this contract
    // This function uses the zrSIgn contract to get all wallets of the EVM type that belong to this contract
    function getEVMWallets() public view virtual returns (string[] memory) {
        return IZrSign(zrSign).getZrKeys(EVMWalletType, address(this));
    }

    // Get an EVM wallet associated with this contract by index
    // This function uses the zrSIgn contract to get a specific EVM wallet that belongs to this contract, specified by an index
    // Parameter:
    // - index: The index of the EVM wallet to be retrieved
    function getEVMWallet(uint256 index) public view returns (string memory) {
        return IZrSign(zrSign).getZrKey(EVMWalletType, address(this), index);
    }

    // Encode data using RLP
    // This function uses the RLPWriter library to encode data into RLP format
    function rlpEncodeData(
        bytes memory data
    ) internal virtual returns (bytes memory) {
        return data.writeBytes();
    }

    // Encode a transaction using RLP
    // This function uses the RLPWriter library to encode a transaction into RLP format
    function rlpEncodeTransaction(
        uint256 nonce,
        uint256 gasPrice,
        uint256 gasLimit,
        address to,
        uint256 value,
        bytes memory data
    ) internal virtual returns (bytes memory) {
        bytes memory nb = nonce.writeUint();
        bytes memory gp = gasPrice.writeUint();
        bytes memory gl = gasLimit.writeUint();
        bytes memory t = to.writeAddress();
        bytes memory v = value.writeUint();
        return _encodeTransaction(nb, gp, gl, t, v, data);
    }

    // Helper function to encode a transaction
    // This function is used by the rlpEncodeTransaction function to encode a transaction into RLP format
    function _encodeTransaction(
        bytes memory nonce,
        bytes memory gasPrice,
        bytes memory gasLimit,
        bytes memory to,
        bytes memory value,
        bytes memory data
    ) internal pure returns (bytes memory) {
        bytes memory zb = uint256(0).writeUint();
        bytes[] memory payload = new bytes[](9);
        payload[0] = nonce;
        payload[1] = gasPrice;
        payload[2] = gasLimit;
        payload[3] = to;
        payload[4] = value;
        payload[5] = data;
        payload[6] = zb;
        payload[7] = zb;
        payload[8] = zb;
        return payload.writeList();
    }
}
```