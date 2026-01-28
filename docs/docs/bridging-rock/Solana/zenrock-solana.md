---
title: Transfer Zenrock Mainnet to Solana
sidebar_label: Zenrock to Solana
sidebar_position: 12
---

This guide walks through transferring $ROCK from Zenrock Mainnet to Solana using zenTP.

## Prerequisites

Before starting, ensure you have:

- [ ] Cosmos wallet (Keplr or Leap) with $ROCK on Zenrock Mainnet
- [ ] Small amount of ROCK for zrChain transaction fees
- [ ] Solana wallet (Phantom, Backpack, or Solflare) to receive tokens

## Step-by-Step Guide

### 1. Open zenTP

Navigate to [https://app.zenrocklabs.io/zentp](https://app.zenrocklabs.io/zentp)

### 2. Connect Your Wallets

1. Click "Connect Wallet" for Cosmos
2. Select Keplr or Leap
3. Approve the connection
4. Click "Connect Wallet" for Solana
5. Select your Solana wallet
6. Approve the connection

### 3. Select Transfer Direction

Ensure the transfer is set to:
- **From**: Zenrock Mainnet
- **To**: Solana

### 4. Enter Amount

1. Enter the amount of $ROCK you want to transfer
2. Your available balance will be displayed
3. Verify the destination Solana address matches your wallet

### 5. Review Transaction

Before confirming, verify:
- Source: Your Zenrock Mainnet address (zen1...)
- Destination: Your Solana wallet address
- Amount: The ROCK amount you entered
- Network fees: ROCK required for the zrChain transaction

### 6. Confirm Transaction

1. Click "Transfer" or "Bridge"
2. Approve the transaction in Keplr/Leap
3. Wait for confirmation

### 7. Wait for Completion

The transfer typically completes in 1-2 minutes:

1. **zrChain confirmation**: Your transfer request is processed
2. **MPC signing**: dMPC operators sign the Solana mint transaction
3. **Solana minting**: $ROCK is minted to your Solana wallet

### 8. Verify Receipt

1. Open your Solana wallet (Phantom, etc.)
2. Verify your ROCK balance has increased

You can also check on Solscan:
- Visit [solscan.io](https://solscan.io)
- Search for your Solana address
- View your token holdings

## What Happens During Transfer

```
Your Zenrock Wallet                   zrChain                         Solana
       │                                 │                               │
       │ 1. Sign transfer msg            │                               │
       ├────────────────────────────────▶│                               │
       │                                 │                               │
       │                                 │ 2. Validate & create request  │
       │                                 │                               │
       │                                 │ 3. Request MPC signature      │
       │                                 ├──────────────────────────────▶│
       │                                 │                               │
       │                                 │      4. Mint to Solana wallet │
       │                                 │                               ▼
       │                              Your Solana Wallet receives $ROCK
```

## Expected Timing

| Step | Typical Time |
|------|--------------|
| zrChain confirmation | ~6 seconds |
| MPC signature collection | ~30-60 seconds |
| Solana mint | ~10 seconds |
| Total | 1-2 minutes |

## Troubleshooting

**Transaction stuck?**
- Check zrChain transaction on the Zenrock explorer
- MPC signing may take up to a minute
- See [Troubleshooting](troubleshooting.md) for more help

**Wrong destination address?**
- Ensure you connected the correct Solana wallet
- The destination should be a valid Solana address (base58 encoded)

**Insufficient ROCK for fees?**
- You need a small amount of ROCK for the zrChain transaction fee
- Typical fee: < 0.01 ROCK

## Using $ROCK on Solana

Once your ROCK arrives on Solana, you can:

- **Trade**: Swap on Jupiter, Raydium, or Orca
- **Provide liquidity**: Add to ROCK liquidity pools
- **Hold**: Keep in your Solana wallet
- **Bridge back**: Transfer back to Zenrock Mainnet anytime

## Token Address

$ROCK on Solana: `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`

Add this token to your wallet if it doesn't appear automatically.
