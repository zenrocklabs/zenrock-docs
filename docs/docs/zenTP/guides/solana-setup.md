---
title: Solana Bridging Setup
sidebar_label: Solana Setup
sidebar_position: 1
---

Welcome to the documentation for transferring $ROCK between Solana and Zenrock Mainnet using zenTP (Zenrock Transfer Protocol).

**Use zenTP:** [https://app.zenrocklabs.io/zentp](https://app.zenrocklabs.io/zentp)

## What is zenTP?

Zenrock Transfer Protocol (zenTP) enables native $ROCK transfers between zrChain (Cosmos) and Solana. Unlike traditional bridges that wrap tokens, zenTP represents $ROCK as a **native SPL token** on Solana, providing the same user experience as any native Solana asset.

### Key Benefits

- **Native representation**: $ROCK on Solana is a native SPL token, not a wrapped asset
- **Same dMPC security**: Secured by zrChain's distributed MPC infrastructure
- **No wrapping complexity**: Transfer directly without intermediate wrapped tokens
- **Full liquidity**: 200M $ROCK seeded on Solana at launch

## Prerequisites

To use zenTP, you'll need:

### For Solana to Zenrock

1. **Solana wallet**: Phantom, Backpack, or Solflare recommended
2. **$ROCK on Solana**: Available on Jupiter, Raydium, and other Solana DEXs
3. **SOL for fees**: Small amount of SOL for Solana transaction fees
4. **Cosmos wallet**: Keplr or Leap for receiving on Zenrock Mainnet

### For Zenrock to Solana

1. **Cosmos wallet**: Keplr or Leap with $ROCK on Zenrock Mainnet
2. **ROCK for fees**: Small amount of ROCK for zrChain transaction fees
3. **Solana wallet**: To receive $ROCK on Solana

## Wallet Setup

### Solana Wallet (Phantom)

1. Install Phantom from [phantom.app](https://phantom.app)
2. Create or import a wallet
3. Ensure you have some SOL for transaction fees
4. Your $ROCK balance will appear automatically when you hold tokens

### Cosmos Wallet (Keplr)

1. Install Keplr from [keplr.app](https://www.keplr.app)
2. Create or import a wallet
3. Add Zenrock Mainnet:
   - Visit [app.zenrocklabs.io](https://app.zenrocklabs.io)
   - Connect Keplr when prompted
   - Approve adding Zenrock Mainnet to Keplr
4. Your ROCK balance will appear in Keplr

## Token Information

### $ROCK on Solana

**Contract Address:** `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`

- Native SPL token (not wrapped)
- Same ticker: ROCK
- Same total supply cap: 1 billion

### $ROCK on Zenrock Mainnet

- Native staking token
- Denom: `urock` (micro-ROCK, 1 ROCK = 1,000,000 urock)
- Used for gas, staking, and governance

## How zenTP Works

zenTP uses zrChain's dMPC infrastructure to enable trustless transfers:

**Solana to Zenrock:**
1. User burns $ROCK on Solana via zenTP program
2. zrChain validators observe the burn event
3. zrChain mints equivalent ROCK to user's Cosmos address

**Zenrock to Solana:**
1. User initiates transfer on zrChain
2. zrChain creates signature request for Solana mint
3. dMPC operators sign the Solana transaction
4. $ROCK is minted to user's Solana wallet

The total supply across both chains remains constant—tokens are burned on one side and minted on the other.

## Important Notes

- **Transfer time**: Usually completes within 1-2 minutes
- **Minimum transfer**: No minimum, but consider gas costs
- **No fees**: zenTP transfers are currently free (only network gas fees apply)
- **Irreversible**: Once submitted, transfers cannot be cancelled

## Next Steps

- [Transfer Solana to Zenrock](solana-to-zenrock.md)
- [Transfer Zenrock to Solana](zenrock-to-solana.md)
- [Troubleshooting](troubleshooting.md)
