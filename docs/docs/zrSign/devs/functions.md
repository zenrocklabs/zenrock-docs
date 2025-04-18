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
    - `monitoring` : A `boolean` flag outlining if a wallet should be monitored by zenrocks' off-chain systems to provide ease of use.

#### Modifiers
- The function may use access control modifiers to ensure that only authorized users can request keys.
- Each key request requires a transaction fee, equivalent to the fee obtained via `estimateFee()`, to be sent with the call.

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
        bool withMonitoring = true;
        uint256 zrFee = signContract.estimateFee(withMonitoring);
        
        // Prepare the parameters for the key request
        SignTypes.ZrKeyReqParams memory params = SignTypes.ZrKeyReqParams({
            walletTypeId: walletTypeId,
            monitoring: withMonitoring
        });
        
        // Execute the key request function
        signContract.zrKeyReq{value: zrFee}(params);
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

    // keccak256(abi.encode(ChainInfo{purpose:44 coinType: 60}))
    bytes32 constant evmWalletTypeId = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a; 
    // keccak256(abi.encodePacked("eip155:11155111"));
    bytes32 constant sepoliaDstChainId = 0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7;

    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }

    // Function to sign a hash
    function signHash(bytes32 hash) external payable {
        // Fetching the wallet index for the owner
        string[] memory keys = signContract.getZrKeys(evmWalletTypeId, address(this)); 
        uint256 walletIndex = keys.length;  

        // Get fee estimate
        uint256 fee = signContract.estimateFee(evmWalletTypeId, address(this), walletIndex);
        require(msg.value >= fee, "Insufficient fee sent");

        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
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

    // keccak256(abi.encode(ChainInfo{purpose:44 coinType: 60}))
    bytes32 constant evmWalletTypeId = 0xe146c2986893c43af5ff396310220be92058fb9f4ce76b929b80ef0d5307100a;  // EVM wallet type ID
    // keccak256(abi.encodePacked("eip155:11155111"));
    bytes32 constant sepoliaDstChainId = 0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7;  // Sepolia chain ID

    constructor(address _signContractAddress) {
        signContract = ISign(_signContractAddress);
    }

    function signTransaction(bytes memory transactionData, bool shouldBroadcast) external payable {
        // Fetching the wallet index for the owner
        string[] memory keys = signContract.getZrKeys(evmWalletTypeId, address(this));
        uint256 walletIndex = keys.length;

        // Get fee estimate
        uint256 fee = signContract.estimateFee(evmWalletTypeId, address(this), walletIndex);
        require(msg.value >= fee, "Insufficient fee sent");

        SignTypes.ZrSignParams memory params = SignTypes.ZrSignParams({
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
---

### `estimateFee` Functions Overview

#### Overview
A utility function assising the user in estimating how much he needs to pay for a zrSign request and the on-chain response following his request (e.g. returning the user generated key back to the contract).

There are two functions allowing the user to estimate the fee based on the values they have available to them.

#### Parameters (Option #1): 
- `options (uint8)`: The `options` field is an enum specifiying the different "modes" of key management. Currently we offer the following:
    - `1`: Simple key creation without any added features.
    - `2`: Added monitoring to the generated key which inform the off-chain services to keep track and monitor activity. This is useful for chains such as Bitcoin where you need to keep track of UTXO's.
- `value (uint256)`: The additional value you're planning on passing within the transaction.

> **_NOTE:_**  When estimating key generation then option #1 should be used as you don't have the wallet details listed in option #2.

#### Parameters (Option #2): 
- `walletTypeId (bytes32)`:  A `bytes32` identifier that specifies the type of wallet. This identifier is used to fetch the corresponding key.
- `owner (address)`: The owner of the generated walletwallet
- `walletIndex (uint256)`: Index of the wallet which will be signing the hash.
- `value (uint256)`: The additional value you're planning on passing within the transaction.

#### Return Type
- `mpc fee (uint256)` - the fee sent to the MPC's for providing their signing services.
- `network fee (uint256)` - The fee for the on-chain transaction that will return the result. This field would also include the additional `value` if added.
- `total fee (uint256)` - The total amount from the `mpc` and `network` fees above.
