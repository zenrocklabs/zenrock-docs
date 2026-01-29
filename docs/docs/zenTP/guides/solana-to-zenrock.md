---
title: Transfer Solana to Zenrock Mainnet
sidebar_label: Solana to Zenrock
sidebar_position: 2
---

This guide walks through transferring $ROCK from Solana to Zenrock Mainnet using zenTP.

## Prerequisites

Before starting, ensure you have:

- [ ] Solana wallet (Phantom, Backpack, or Solflare) with $ROCK
- [ ] Small amount of SOL for transaction fees
- [ ] Cosmos wallet (Keplr or Leap) set up with Zenrock Mainnet

## Step-by-Step Guide

### 1. Open zenTP

Navigate to [https://app.zenrocklabs.io/zentp](https://app.zenrocklabs.io/zentp)

### 2. Connect Your Wallets

1. Click "Connect Wallet" for Solana
2. Select your Solana wallet (Phantom, Backpack, etc.)
3. Approve the connection in your wallet popup
4. Click "Connect Wallet" for Cosmos
5. Select Keplr or Leap
6. Approve the connection and add Zenrock Mainnet if prompted

### 3. Select Transfer Direction

Ensure the transfer is set to:
- **From**: Solana
- **To**: Zenrock Mainnet

### 4. Enter Amount

1. Enter the amount of $ROCK you want to transfer
2. Your available balance will be displayed
3. Verify the destination address matches your Keplr/Leap wallet

### 5. Review Transaction

Before confirming, verify:
- Source: Your Solana wallet address
- Destination: Your Zenrock Mainnet address (zen1...)
- Amount: The ROCK amount you entered
- Network fees: SOL required for the Solana transaction

### 6. Confirm Transaction

1. Click "Transfer" or "Bridge"
2. Approve the transaction in your Solana wallet
3. Wait for confirmation

### 7. Wait for Completion

The transfer typically completes in 1-2 minutes:

1. **Solana confirmation**: Your burn transaction confirms on Solana
2. **zrChain detection**: Validators observe the burn event
3. **Cosmos minting**: ROCK is minted to your Zenrock Mainnet address

### 8. Verify Receipt

1. Open Keplr or Leap
2. Select Zenrock Mainnet
3. Verify your ROCK balance has increased

You can also check on the Zenrock Platform:
- Visit [app.zenrocklabs.io](https://app.zenrocklabs.io)
- Connect your Cosmos wallet
- View your portfolio

## What Happens During Transfer

```
Your Solana Wallet                    zenTP Program                    zrChain
       |                                   |                              |
       | 1. Sign burn tx                   |                              |
       |---------------------------------->|                              |
       |                                   |                              |
       |                                   | 2. Emit burn event           |
       |                                   |----------------------------->|
       |                                   |                              |
       |                                   |         3. Validators detect |
       |                                   |                              |
       |                                   |         4. Mint to Cosmos    |
       |                                   |                              v
       |                              Your Zenrock Wallet receives ROCK
```

## Expected Timing

| Step | Typical Time |
|------|--------------|
| Solana confirmation | ~10 seconds |
| zrChain detection | ~30-60 seconds |
| Total | 1-2 minutes |

## Troubleshooting

**Transaction stuck?**
- Check Solana transaction on [Solscan](https://solscan.io)
- If confirmed on Solana but not received, wait a few more minutes
- See [Troubleshooting](troubleshooting.md) for more help

**Wrong destination address?**
- Ensure you connected the correct Cosmos wallet
- The destination address should start with `zen1`

**Insufficient SOL?**
- You need a small amount of SOL for the Solana transaction fee
- Typical fee: < 0.001 SOL

## Next Steps

Once your ROCK arrives on Zenrock Mainnet, you can:

- **Stake**: Earn staking rewards on zrChain
- **Governance**: Participate in protocol governance
- **Use in Workspaces**: Create keys and manage cross-chain assets
- **Bridge elsewhere**: Transfer to other supported chains
