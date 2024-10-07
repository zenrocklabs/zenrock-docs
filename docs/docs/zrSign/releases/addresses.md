---
title: zrSign Chain Support
sidebar_label: zrSign Chain Support
sidebar_position: 1
---

### zrSign Direct

In zrSign Direct, zrSign is deployed as a solidity smart contract on selected evm blockchains and receives key and signature requests. 
Destination blockchains can be specified through `CAIPs` and may require a custom relayer implementation to broadcast the transaction.

<!-- TODO: update zrSign contract addresses. -->

Currently supported networks in v1 are:

| Network Name            | Chain Id | Status    | Address                                                                                        | Destination Chains                                                                           |
|-------------------------|----------|-----------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Eth Sepolia             | 11155111 | Deployed  | [0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c](https://sepolia.etherscan.io/address/0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c) | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Polygon Amoy            | 80002    | Deployed   | [0xa7adf06a1d3a2ca827d4edda96a1520054713e1c](https://amoy.polygonscan.com/address/0xa7adf06a1d3a2ca827d4edda96a1520054713e1c)   | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Avalanche Fuji testnet  | 43113    | Deployed  | [0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c](https://testnet.snowtrace.io/address/0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c) | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Arb Sepolia             | 421614   | Deployed  | [0xa7adf06a1d3a2ca827d4edda96a1520054713e1c](https://sepolia.arbiscan.io/address/0xa7adf06a1d3a2ca827d4edda96a1520054713e1c)   | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Optimism Sepolia        | 11155420 | Deployed  | [0xa7adf06a1d3a2ca827d4edda96a1520054713e1c](https://sepolia-optimism.etherscan.io/address/0xa7adf06a1d3a2ca827d4edda96a1520054713e1c) | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Binance Testnet         | 97       | Deployed  | [0xa7adf06a1d3a2ca827d4edda96a1520054713e1c](https://testnet.bscscan.com/address/0xa7adf06a1d3a2ca827d4edda96a1520054713e1c)   | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| Base Sepolia            | 84532    | Deployed  | [0xa7adf06a1d3a2ca827d4edda96a1520054713e1c](https://sepolia.basescan.org/address/0xa7adf06a1d3a2ca827d4edda96a1520054713e1c)  | Sepolia, Amoy, Fuji, Arb Sepolia, Binance testnet, Base sepolia, Optimism Sepolia            |
| ZkSync Era              | 300      | Pending   |                                                                                                |                                                                                              |


More EVM chains will be announced soon!

### zrSign Omni

In zrSign Omni with it beying closely entangled with Zenrock chain, zrSign will have only EVM support to begin with but will add more networks like more EVM chains, Bitcoin, Cosmos, and Solana to fulfill Zenrock's [omnichain vision](../../introduction/introduction.md#going-omnichain-with-zenrock) throughout testnet phase.


## CAIPS for zrSign

In order to specify the destination chain for a message that is being requested, we use CAIPS (Common Address and Index Prefix Specification). 

For EVM chains, the CAIP-2 compliant chain ID is the chain ID of the EVM chain. For Bitcoin, the CAIP-2 compliant chain ID is 0. For Cosmos, the CAIP-2 compliant chain ID is the bech32 prefix of the chain. For Solana, the CAIP-2 compliant chain ID is the Solana program ID. Read more about CAIPS [here](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md).

:::info

Make sure to add the `0x` prefix to the chain id when interacting with the contract. For example, `0xafa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7` for Eth Sepolia.

:::

Here are the CAIP-2 compliant chain IDs for the supported chains:

| Network Name            | Chain Id | CAIP-2 |
|-------------------------|----------|------------------------------------------------------------------|
| Eth Sepolia             | 11155111 | afa90c317deacd3d68f330a30f96e4fa7736e35e8d1426b2e1b2c04bce1c2fb7 |
| Polygon Amoy            | 80002    | 4df3b2a1df4e086e001def1ba6466078aa6aaf12e7a183f590364b811b18ee5b |
| Avalanche Fuji testnet  | 43113    | 5f3f93115d7efd19d933ee81a3fe76ec1e0f35d41927d6fe0875a4f4c29345da |
| Arb Sepolia             | 421614   | f0b5e5225193cfd0cd1b399b5597eb35e33f77deb76267030dc6d28cf2a8d16b |
| Optimism Sepolia        | 11155420 | ed0d19ae6067b72db99bcb0dc8751b7d9a0733d390cef703366aa5c2ab3cc467 |
| Binance Testnet         | 97       | 42a13880db2f2fe1c95fc8d04876a774745355a97dfe8f3397694d11f135eccf |
| Base Sepolia            | 84532    | 8a9a9c58b754a98f1ff302a7ead652cfd23eb36a5791767b5d185067dd9481c2 |
| BTC Testnet             |          | cc8dcc74cf3de5b0154f437b295f5d0709e6527ffb67b1201e78769ff0cccbf7 |
