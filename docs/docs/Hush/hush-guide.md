---
title: Hush Protocol - User Guide
sidebar_label: User Guide
sidebar_position: 3
---

## Getting Started with Hush

This guide walks through the complete Hush workflow: shielding assets, making private transfers, and unshielding to any address.

**Use Hush:** [https://app.zenrocklabs.io/services/hush/shield](https://app.zenrocklabs.io/services/hush/shield)

### Prerequisites

- A Solana wallet (Phantom, Backpack, or Solflare recommended)
- zenBTC or jitoSOL tokens in your wallet
- Small amount of SOL for transaction fees (shield operation only)

### Understanding Your Hush Wallet

When you first connect to Hush, a deterministic spending key is derived from your wallet signature. This key:

- Controls your shielded balance
- Is never stored on any server
- Can be recovered by signing with the same wallet

Your **Full Viewing Key** is cached locally to display your balance without requiring repeated signatures.

## Shield (Deposit)

Shielding moves tokens from your Solana wallet into the Hush privacy pool.

### Steps

1. Navigate to the Hush app and connect your Solana wallet
2. Select the asset you want to shield (zenBTC or jitoSOL)
3. Enter the amount to shield
4. Click "Shield" and approve the transaction in your wallet

### What Happens

- Your tokens are transferred to the Hush vault on Solana
- A cryptographic commitment is created and added to the Merkle tree
- Your shielded balance updates after the commitment is confirmed

### Tips

- **Use common amounts** (0.1, 0.5, 1, 5, 10) to maximize your anonymity set
- **Shield fee is 0%** - there's no cost to enter the privacy pool
- The shield operation is publicly visible on Solana, but your subsequent activity is private

## Shielded Transfer

Send value to another user privately within the Hush pool.

### Steps

1. Navigate to "Transfer" in the Hush app
2. Enter the recipient's Hush address (their incoming viewing key public component)
3. Enter the amount to transfer
4. Click "Transfer" and sign the proof generation request

### What Happens

- A STARK proof is generated locally in your browser (may take a few seconds)
- The proof and encrypted amount are submitted to zrChain
- The recipient can scan and decrypt the transfer with their incoming viewing key

### Privacy Properties

- **Amount is encrypted** - only the recipient can see how much was sent
- **No on-chain link** - observers see commitments but cannot link sender to recipient
- **Flat fee**: 0.01 jitoSOL per transfer (burned from shielded supply)

### Receiving Transfers

Incoming transfers appear automatically when you load the Hush app. Your wallet scans for transfers using your incoming viewing key.

## Unshield (Withdraw)

Unshielding moves tokens from the privacy pool to any Solana address.

### Steps

1. Navigate to "Unshield" in the Hush app
2. Enter the destination Solana address (can be any address, including fresh wallets)
3. Enter the amount to unshield
4. For jitoSOL: optionally enable "Fund with SOL" if withdrawing to a fresh wallet
5. Click "Unshield" and sign the proof generation request

### What Happens

- A STARK proof is generated locally proving you own the shielded funds
- The proof is submitted to zrChain for verification
- zrChain requests an MPC signature for the Solana transfer
- Tokens are transferred from the vault to your destination address

### Fees

| Asset | Base Fee | With SOL Funding |
|-------|----------|------------------|
| zenBTC | 0.50% | N/A |
| jitoSOL | 0.50% | 0.60% (+0.01 SOL) |

### SOL Funding (jitoSOL only)

When unshielding jitoSOL, you can request 0.01 SOL to be sent along with your tokens. This is useful for:

- Withdrawing to a fresh wallet with no SOL
- Maintaining privacy by not pre-funding the destination
- Immediately using the withdrawn tokens without linking to another wallet

## Wallet Recovery

If you clear your browser data or switch devices, you can recover your shielded balance:

1. Connect the same Solana wallet you originally used
2. Sign the message to derive your spending key
3. The app will scan the blockchain for your commitments
4. Your balance will be restored

**Important**: Recovery only works with the same wallet that created the original shield. There is no seed phrase or backup mechanism—your Solana wallet IS your backup.

## Viewing Keys for Auditors

If you need to share transaction history with an auditor:

### Full Viewing Key

Reveals:
- All shielded balances
- All transfers sent and received
- Spent/unspent status of all notes

Does NOT allow:
- Spending any funds

### Incoming Viewing Key

Reveals:
- Amounts received (deposits and transfers in)

Does NOT reveal:
- Amounts sent
- Spent/unspent status
- Spending capability

> **Warning**: Sharing viewing keys grants permanent, irrevocable access. Consider providing transaction reports instead for time-limited audits.

## Troubleshooting

### Shield not appearing

- Wait for Solana confirmation (usually a few seconds)
- Validator sidecars process shields in batches; allow up to 1 minute
- Check that your address passed OFAC screening

### Unshield stuck in pending

- Unshields go through MPC signing, which may take 30-60 seconds
- Failed unshields retry automatically after ~50 blocks
- Check the transaction status on the Hush app

### Balance shows 0 after recovery

- Ensure you're using the exact same wallet
- The recovery scan may take a moment for large histories
- Try refreshing the page after the scan completes

### Proof generation is slow

- STARK proof generation happens locally in your browser
- First proof may take 10-30 seconds as WASM loads
- Subsequent proofs are faster (~5-10 seconds)
- Use a modern browser with good WebAssembly support

## Security Best Practices

1. **Never share your spending key** - it controls all your shielded funds
2. **Verify addresses carefully** - shielded transfers cannot be reversed
3. **Use privacy-preserving amounts** - round numbers blend into the crowd
4. **Wait between operations** - timing correlation is a privacy leak
5. **Consider your threat model** - Hush protects on-chain linkability, not IP/browser fingerprinting
