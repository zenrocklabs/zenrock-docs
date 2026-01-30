---
title: DCT Module
sidebar_label: DCT Module
sidebar_position: 9
---

## Overview

The **DCT Module** (`x/dct/`) provides the generalized framework for Decentralized Custody Tokens - wrapped assets with institutional-grade security. While zenBTC was the first implementation, DCT enables wrapping any supported asset.

### Supported Assets

- **zenZEC**: Wrapped Zcash on Solana
- **Future Assets**: The DCT framework supports adding new wrapped assets

### Key Capabilities

- **Multi-Asset Support**: Generic framework for different source chains
- **Deposit Verification**: Chain-specific SPV verification (Zcash headers stored separately from BTC)
- **Unified Minting**: Consistent mint/burn flow across all DCT assets

### Module Separation

DCT is intentionally separate from zenBTC to ensure production stability:

- **zenBTC endpoint**: `zrchain.zenbtc.Msg/VerifyDepositBlockInclusion`
- **DCT endpoint**: `zrchain.dct.Msg/VerifyDepositBlockInclusion` (rejects ASSET_ZENBTC)
- **Header storage**: BTC headers in `BtcBlockHeaders`, ZCash headers in `ZcashBlockHeaders`

### Related Documentation

- [zenBTC Module](./zenbtc.md) - Bitcoin-specific implementation
- [Validation Module](./validation.md) - Block header consensus

*For source code, see the [DCT module on GitHub](https://github.com/zenrocklabs/zenrock/tree/main/zrchain/x/dct).*
