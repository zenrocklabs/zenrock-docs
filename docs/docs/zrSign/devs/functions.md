---
title: zrSign Functions
sidebar_label: zrSign Functions
sidebar_position: 2
---

### `zrKeyReq` Function Overview

#### Overview
The `zrKeyReq` function is a part of the `Sign.sol` smart contract and is utilized for requesting specific keys from a designated wallet type in a blockchain environment. This function is crucial for operations that involve secure and verified access to wallet keys based on predefined wallet types.

#### Description
The `zrKeyReq` function interacts with wallet-related functionalities by using the `ZrKeyReqParams` struct to specify the wallet type from which the key is to be retrieved. This function is essential for extracting specific cryptographic keys associated with user wallets, enhancing security and functionality in decentralized applications. The function requires the caller to send an amount of ether equivalent to the base fee for processing the request.

#### Parameters
- `ZrKeyReqParams` : A struct defined in `SignTypes.sol` that contains the following field:
- `walletTypeId` : A `bytes32` identifier that specifies the type of wallet. This identifier is used to fetch the corresponding key.

#### Modifiers
- The function may use access control modifiers to ensure that only authorized users can request keys.
- Each key request requires a transaction fee, equivalent to the base fee obtained via `getBaseFee()`, to be sent with the call.

#### Return Type
- None

#### Usage Example
In the following example, the `WalletInteraction` contract interacts with the `Sign` contract to request a wallet key. It ensures that the base fee is covered by the transaction.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./ISign.sol";  // Importing the contract where `zrKeyReq` is defined
import "./SignTypes.sol";  // Importing the types used by the contract
contract WalletInteraction {
    ISign public signContract;
    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }
    // Function to request a key from the wallet
    function getKey(bytes32 walletTypeId) external payable {
        uint256 baseFee = signContract.getBaseFee();
        // Prepare the parameters for the key request
        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: walletTypeId
        });
        // Execute the key request function
        signContract.zrKeyReq{value: baseFee}(params);
    }
}
```

---

### `zrSignHash` Function Overview

#### Overview
The `zrSignHash` function is part of the `Sign.sol` smart contract and is specifically designed for signing hashes on the blockchain. This function uses parameters from the `zrSignParams` struct to ensure secure and verified operations across blockchain networks.

#### Description
The `zrSignHash` function enables the signing of a hash to verify its integrity and authenticity across different platforms or within blockchain operations. The function is integral to operations requiring secure data verification and authentication through digital signatures. It requires that the hash be in a specific format and size, with checks in place to ensure compliance. Additionally, the function requires a fee to be sent with the request, which is calculated based on the payload length and network conditions.

#### Parameters
- `zrSignParams` : A struct from `SignTypes.sol` with the following fields:
  - `walletTypeId`: Identifier for the wallet type involved in the signing.
  - `walletIndex`: Index of the wallet which will be signing the hash.
  - `dstChainId`: Destination chain ID where the hash might be used or verified.
  - `payload`: Array of bytes containing the hash to be signed, which must be exactly 32 bytes.
  - `broadcast`: Must be set to `false` as this function does not handle broadcasting.

#### Modifiers
- `walletTypeGuard(params.walletTypeId)`: Ensures the wallet type is onboarded for the signing operation.
- `chainIdGuard(params.walletTypeId, params.dstChainId)`: Checks the chain ID to ensure the destination chain is onboarded.

#### Return Type
- None

#### Usage Example
Here is an example of interacting with the `zrSignHash` function, including fee calculation and wallet interactions to fetch the appropriate wallet index:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./ISign.sol";  // Importing the Sign contract
import "./SignTypes.sol";  // Importing the types used by the Sign contract
contract WalletInteraction {
    ISign public signContract;
    bytes32 constant evmWalletTypeId = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;  // EVM wallet type ID
    bytes32 constant sepoliaDstChainId = 0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7;  // Sepolia chain ID
    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }
    function calculateFeeForSign(bytes memory payload) public view returns(uint256) {
        uint256 networkFee = payload.length * signContract.getNetworkFee();
        uint256 totalFee = signContract.getBaseFee() + networkFee;
        return totalFee;
    }
    // Function to sign a hash
    function signHash(bytes32 hash) external payable {
        uint256 fee = calculateFeeForSign(abi.encodePacked(hash));
        require(msg.value >= fee, "Insufficient fee sent");
        // Fetching the wallet index for the owner
        string[] memory keys = signContract.getZrKeys(walletTypeId, address(this)); // optional if you want to fetch the keys
        uint256 walletIndex = 0;  //  The first key index for simplicity
        SignTypes.zrSignParams memory params = SignTypes.zrSignParams({
            walletTypeId: evmWalletTypeId,
            walletIndex: walletIndex,
            dstChainId: sepoliaDstChainId,
            payload: abi.encodePacked(hash),
            broadcast: false
        });
        // Execute the signing function with the prepared parameters and the required fee
        signContract.zrSignHash{value: fee}(params);
    }
}
```
---

### `zrSignData` Function Overview

#### Overview
The `zrSignData` function is also part of the `Sign.sol` smart contract, designed to handle the signing of arbitrary data on the blockchain. This function, similar to `zrSignHash`, employs the `zrSignParams` struct to ensure secure and compliant operations across blockchain networks, specifically tailored to data other than hashes.

#### Description
`zrSignData` facilitates the signing of general data, ensuring the integrity and authenticity of information as it moves or is utilized across different blockchain platforms. This function is crucial for validating transactions, agreements, or any data that requires verified approval through digital signatures. It requires data to be formatted properly before signing and includes fee assessments similar to `zrSignHash`.

#### Parameters
- `zrSignParams`: This struct is used to pass necessary information for the signing process:
  - `walletTypeId`: Identifier for the wallet type involved in the signing.
  - `walletIndex`: Index of the wallet that will perform the signing.
  - `dstChainId`: The destination chain ID where the signed data might be used or verified.
  - `payload`: General data to be signed, provided as an array of bytes.
  - `broadcast`: Must be set to `false` as broadcasting is handled in other specific functions.

#### Modifiers
- `walletTypeGuard(params.walletTypeId)`: Ensures that only wallets of a certain type can perform the operation.
- `chainIdGuard(params.walletTypeId, params.dstChainId)`: Validates that the signing operation pertains to the correct blockchain.

#### Return Type
- None

#### Usage Example
Below is a hypothetical example of how to interact with the `zrSignData` function, including the steps to calculate the necessary fees and determine the wallet index:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./ISign.sol";  // Importing the Sign contract
import "./SignTypes.sol";  // Importing the types used by the Sign contract
contract WalletInteraction {
    ISign public signContract;
    address public owner = msg.sender;
    bytes32 constant evmWalletTypeId = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;  // EVM wallet type ID
    bytes32 constant sepoliaDstChainId = 0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7;  // Sepolia chain ID
    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }
    function calculateFeeForSign(bytes memory payload) public view returns(uint256) {
        uint256 networkFee = payload.length * signContract.getNetworkFee();
        uint256 totalFee = signContract.getBaseFee() + networkFee;
        return totalFee;
    }
    // Function to sign data
    function signData(bytes memory data) external payable {
        uint256 fee = calculateFeeForSign(data);
        require(msg.value >= fee, "Insufficient fee sent");
        // Fetching the wallet index for the owner
        string[] memory keys = signContract.getZrKeys(evmWalletTypeId, owner);
        uint256 walletIndex = 0;  //  The first key index for simplicity
        SignTypes.zrSignParams memory params = SignTypes.zrSignParams({
            walletTypeId: evmWalletTypeId,
            walletIndex: walletIndex,
            dstChainId: sepoliaDstChainId,
            payload: data,
            broadcast: false
        });
        // Execute the signing function with the prepared parameters and the required fee
        signContract.zrSignData{value: fee}(params);
    }
}
```
---

### `zrSignTx` OFFchain Encoding Function Overview

#### Overview
The `zrSignTx` function is a critical component of the `Sign.sol` smart contract, specifically designed to handle the signing of transactions on the blockchain. This function utilizes the `zrSignParams` struct to ensure secure and compliant operations across blockchain networks, with particular focus on transactional data.

#### Description
`zrSignTx` facilitates the signing of transactions, verifying the integrity and authenticity of transactional data as it moves or is utilized across different blockchain platforms. This function is essential for authorizing transactions, ensuring that they are conducted securely and in accordance with network and contract policies. Unlike the `zrSignHash` function, `zrSignTx` also involves the potential for broadcasting the signed transaction based on the parameters provided.

#### Parameters
- `zrSignParams`: A struct from `SignTypes.sol` with the following fields:
  - `walletTypeId`: Identifier for the wallet type involved in the transaction signing.
  - `walletIndex`: Index of the wallet that will perform the signing.
  - `dstChainId`: The destination chain ID where the signed transaction might be used or verified.
  - `payload`: Transaction data to be signed, provided as an array of bytes.
  - `broadcast`: A boolean flag indicating whether the signed transaction should be broadcast immediately.

#### Modifiers
- `walletTypeGuard(params.walletTypeId)`: Ensures that only wallets of a specific type can perform the transaction signing.
- `chainIdGuard(params.walletTypeId, params.dstChainId)`: Ensures the operation is relevant to the correct blockchain, verifying that the destination chain is properly onboarded.

#### Return Type
- None

#### Usage Example
Below is an example of how to interact with the `zrSignTx` function, including the steps to calculate the necessary fees and determine the wallet index:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "./ISign.sol";  // Importing the Sign contract
import "./SignTypes.sol";  // Importing the types used by the Sign contract
contract WalletInteraction {
    ISign public signContract;
    address public owner = msg.sender;
    bytes32 constant evmWalletTypeId = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;  // EVM wallet type ID
    bytes32 constant sepoliaDstChainId = 0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7;  // Sepolia chain ID
    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }
    function calculateFeeForSign(bytes memory payload) public view returns(uint256) {
        uint256 networkFee = payload.length * signContract.getNetworkFee();
        uint256 totalFee = signContract.getBaseFee() + networkFee;
        return totalFee;
    }
    // Function to sign and possibly broadcast a transaction
    function signTransaction(bytes memory transactionData, bool shouldBroadcast) external payable {
        uint256 fee = calculateFeeForSign(transactionData);
        require(msg.value >= fee, "Insufficient fee sent");
        // Fetching the wallet index for the owner
        string[] memory keys = signContract.getZrKeys(evmWalletTypeId, owner);
        uint256 walletIndex = 0;  // Assume the first key is the correct index for simplicity
        SignTypes.zrSignParams memory params = SignTypes.zrSignParams({
            walletTypeId: evmWalletTypeId,
            walletIndex: walletIndex,
            dstChainId: sepoliaDstChainId,
            payload: transactionData,
            broadcast: shouldBroadcast
        });
        // Execute the transaction signing function with the prepared parameters and the required fee
        signContract.zrSignTx{value: fee}(params);
    }
}
```
