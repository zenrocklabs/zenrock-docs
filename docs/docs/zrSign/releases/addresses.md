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

In zrSign Omni with it beying closely entangled with Zenrock chain, zrSign will have only EVM support to begin with but will add more networks like more EVM chains, Bitcoin, Cosmos, and Solana to fulfill Zenrock's [omnichain vision](../../introduction.md#going-omnichain-with-zenrock) throughout testnet phase.