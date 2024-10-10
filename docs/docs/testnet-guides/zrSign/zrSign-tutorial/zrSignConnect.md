---
title: zrSignConnect
sidebar_label: zrSignConnect
sidebar_position: 2
---

## Overview

The ZrSignConnect smart contract is an abstract contract that serves as a crucial interface between decentralized applications (dApps) and the ZrSign service. It provides essential functionality for managing wallets, requesting signatures, and handling transactions across different blockchain networks, with a focus on Ethereum (EVM) and Bitcoin.

## Purpose

The main purposes of the ZrSignConnect contract are:

1. To facilitate the creation and management of wallets for both EVM-compatible chains and Bitcoin.
2. To enable secure signature requests for transactions and hashes.
3. To provide a standardized way of interacting with the ZrSign service.

## Key Features

1. **Wallet Management**: 
   - Request new EVM and Bitcoin wallets
   - Retrieve existing wallets

2. **Signature Requests**:
   - Request signatures for specific hashes
   - Request signatures for transactions (both standard and simplified)

3. **RLP Encoding**:
   - Utilities for RLP (Recursive Length Prefix) encoding of transaction data

4. **Address Formatting**:
   - Functions for converting addresses to hexadecimal strings and checksum formats

## Why We Need It

The ZrSignConnect contract is essential for several reasons:

1. **Abstraction**: It abstracts the complexities of interacting with the ZrSign service, providing a clean interface for dApps to use.

2. **Multi-Chain Support**: By supporting both EVM-compatible chains and Bitcoin, it allows for cross-chain functionality within a single contract.

3. **Security**: It provides a standardized way of requesting and managing signatures, enhancing the security of transactions.

4. **Flexibility**: The contract's design allows for easy extension and customization for specific use cases.

5. **Interoperability**: By using standard formats and encoding methods (like RLP), it ensures compatibility with various blockchain systems.

In summary, the ZrSignConnect contract serves as a critical link between dApps and the ZrSign service, enabling secure and efficient management of wallets and signatures across multiple blockchain networks. Its abstraction and standardization make it an invaluable tool for developers building cross-chain applications or requiring advanced signature management capabilities.
