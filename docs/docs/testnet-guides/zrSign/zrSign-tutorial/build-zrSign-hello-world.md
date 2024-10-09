---
title: Build ZrSignHelloWorld.sol
sidebar_label: Build ZrSignHelloWorld.sol
sidebar_position: 4
---

# Writing ZrSignHelloWorld.sol from Scratch

In this section you have the choice to either write the ZrSignHelloWorld contract from scratch or use the existing one. If you want to build it from scratch please erase the existing code in the file. To understand the code, it's helpful to go through it step by step. 
Alternatively, keep the code and read through the steps below to understand the logic.

To create the ZrSignHelloWorld.sol contract, follow these steps:

1. Create a new file named `ZrSignHelloWorld.sol` in your contracts directory or erase the existing code in the file.

2. Add the SPDX license identifier and specify the Solidity version:
   ```solidity
   // SPDX-License-Identifier: UNLICENSED
   pragma solidity 0.8.19;
   ```

3. Import the necessary contracts and libraries:
   ```solidity
   import {ZrSignConnect} from "./zrSignConnect.sol";
   import {Strings} from "./libraries/Strings.sol";
   ```

As described in the previous section, we are using the `zrSignConnect.sol`. This smart contract comes with interfaces to the deployed zrSign smart contracts that Zenrock's MPCs are subscribed to and which contain the MPC-generated keys and signatures for all users on the network. The ZrSignHelloWorld contract inherits these interfaces and allows to add your custom logic on top of it. 

4. Define the contract, inheriting from ZrSignConnect:
   ```solidity
   contract ZrSignHelloWorld is ZrSignConnect {
       constructor(address payable zrSignAddress) ZrSignConnect(zrSignAddress) {}
   ```

Establish the constructor of the contract, which takes in the address of the zrSign smart contract as a parameter. This is the only required parameter for the ZrSignConnect contract. This ensures that your contract can hold funds to cover transaction fees and fees coming with the key and signature requests.

5. Implement the `signMessage` function:
   ```solidity
       function signMessage(
           string memory message,
           uint256 walletIndex,
           bytes32 dstChainId
       ) external payable {
           bytes32 prefixedHash = keccak256(
               abi.encodePacked(
                   "\x19Ethereum Signed Message:\n",
                   Strings.toString(bytes(message).length),
                   message
               )
           );

           reqSignForHash(EVM_WALLET_TYPE, walletIndex, dstChainId, prefixedHash);
       }
   ```

For a general signature message, you can use the `reqSignForHash` function. This function takes in the wallet type, wallet index, destination chain ID, and the hash of the message to be signed. The wallet index is the index of the wallet on zrSign that is used to sign the message. The destination chain ID is the ID of the chain to which the message is being sent. This can be used for any arbitrary message.

6. Implement the `transfer` function:
   ```solidity
       function transfer(
           address to,
           uint256 value,
           bytes memory data,
           uint256 nonce,
           uint256 gasPrice,
           uint256 gasLimit,
           uint256 walletIndex,
           bytes32 dstChainId
       ) external payable {
           bytes memory payload = rlpEncodeTransaction(
               nonce,
               gasPrice,
               gasLimit,
               to,
               value,
               data
           );

           reqSignForTx(EVM_WALLET_TYPE, walletIndex, dstChainId, payload, true);
       }
   ```

   If you want to sign an EVM transaction, you can use the `reqSignForTx` function. This function takes in the wallet type, wallet index, destination chain ID, the transaction payload, and a boolean indicating whether the transaction is a contract creation.

7. Make sure to close the contract at the end:
   ```solidity
   }
   ```

At this point you have a working ZrSignHelloWorld contract. You can now proceed by adding functionality custom to your smart contract.

We will also provide a step to test the contract locally with hardhat later.