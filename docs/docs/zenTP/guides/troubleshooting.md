---
title: zenTP Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 10
---

This page covers common issues when bridging $ROCK between Solana and Zenrock Mainnet.

## Transfer Not Completing

### Solana to Zenrock

**Symptoms**: Transaction confirmed on Solana but ROCK not appearing on Zenrock Mainnet.

**Possible causes and solutions**:

1. **Processing delay**
   - zenTP transfers typically complete in 1-2 minutes
   - Wait up to 5 minutes before troubleshooting further

2. **Validator detection lag**
   - zrChain validators may take a moment to observe the burn event
   - Check if the burn transaction is finalized on Solana

3. **Check your Cosmos wallet**
   - Ensure you're looking at the correct wallet
   - Verify Zenrock Mainnet is selected in Keplr/Leap
   - Refresh the wallet or reconnect to the app

### Zenrock to Solana

**Symptoms**: Transaction confirmed on zrChain but $ROCK not appearing in Solana wallet.

**Possible causes and solutions**:

1. **MPC signing in progress**
   - dMPC operators need to sign the Solana mint transaction
   - This can take 30-60 seconds after zrChain confirmation

2. **Solana network congestion**
   - The mint transaction may be waiting for Solana confirmation
   - Check [Solana Status](https://status.solana.com) for network issues

3. **Token not visible in wallet**
   - Your Solana wallet may not automatically show the ROCK token
   - Manually add the token: `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`

## Wallet Connection Issues

### Phantom Not Connecting

1. Ensure Phantom extension is unlocked
2. Try disconnecting and reconnecting
3. Clear site data for app.zenrocklabs.io
4. Try a different browser

### Keplr Not Showing Zenrock Mainnet

1. Visit [app.zenrocklabs.io](https://app.zenrocklabs.io)
2. When prompted, approve adding Zenrock Mainnet
3. If the chain doesn't appear, manually add it:
   - Chain ID: `diamond-1`
   - RPC: Check [docs.zenrocklabs.io](https://docs.zenrocklabs.io) for current endpoints

### Address Mismatch

**Problem**: Connected wallet shows different address than expected.

**Solution**:
- Ensure you're using the correct wallet account
- Check if you have multiple accounts in your wallet
- Disconnect and reconnect with the correct account selected

## Transaction Errors

### "Insufficient Balance"

**For Solana transactions:**
- Ensure you have enough $ROCK to transfer
- Ensure you have SOL for transaction fees (even a tiny amount)

**For zrChain transactions:**
- Ensure you have enough ROCK on Zenrock Mainnet
- Reserve some ROCK for transaction fees

### "Transaction Failed"

1. Check the error message for specific details
2. Ensure you have sufficient funds for fees
3. Try with a smaller amount
4. If persistent, try again in a few minutes

### "Signature Request Timed Out"

**On Solana:**
- Solana may be congested
- Try again with higher priority fee if available

**On zrChain:**
- MPC operators may be temporarily unavailable
- Wait a few minutes and retry

## Balance Discrepancies

### ROCK Balance Different Than Expected

1. **Check both chains**: Your total ROCK = Solana balance + Zenrock Mainnet balance
2. **Pending transfers**: Check for any in-progress transfers
3. **Staked ROCK**: On Zenrock Mainnet, staked ROCK appears separately from available balance
4. **Token account**: On Solana, ensure you're checking the correct token (CA: `5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf`)

### Recent Transfer Not Reflected

1. Refresh your wallet
2. Disconnect and reconnect to the dApp
3. Check transaction explorers:
   - Solana: [solscan.io](https://solscan.io)
   - Zenrock: Check the Zenrock explorer

## Getting Help

If you've tried the above solutions and still have issues:

1. **Discord**: Join [discord.gg/zenrock](https://discord.gg/zenrock) for community support
2. **Transaction details**: Have your transaction hashes ready when asking for help
3. **Screenshots**: Provide screenshots of error messages

### Information to Gather

When seeking help, include:
- Your Solana address (public, safe to share)
- Your Zenrock Mainnet address (public, safe to share)
- Transaction hash (if available)
- Exact error message
- Browser and wallet versions
- Steps to reproduce the issue

## Error Code Reference

The zenTP module may return the following error codes:

| Error Code | Message | Meaning | Solution |
|------------|---------|---------|----------|
| 1100 | `expected gov account as only signer for proposal message` | Governance-only action attempted by non-governance account | This operation requires a governance proposal |
| 1102 | `invalid module account` | The specified module account is invalid | Check the module account address |
| 1103 | `insufficient balance` | Not enough ROCK to complete the transfer | Ensure you have enough ROCK including fees (0.5% + 200 ROCK flat fee) |
| 1104 | `invalid address` | The provided address format is invalid | Verify the recipient address format for the destination chain |
| 1105 | `invalid fee exemption` | Fee exemption configuration is invalid | Contact support if you believe you should be exempt |
| 1106 | `fee exemption not found` | No fee exemption exists for this address | Standard fees will apply |

## FAQ

**Q: How long should a transfer take?**
A: Typically 1-2 minutes. If longer than 5 minutes, check troubleshooting steps above.

**Q: Are there fees for zenTP transfers?**
A: Yes. zenTP charges a 0.5% bridge fee plus a 200 ROCK flat fee for transfers from Zenrock to Solana. Transfers from Solana to Zenrock incur network gas fees only (SOL on Solana). Certain addresses may be exempt from bridge fees.

**Q: Can I cancel a transfer?**
A: No, once submitted, transfers cannot be cancelled. They will complete or fail automatically.

**Q: What if I sent to the wrong address?**
A: If you entered an incorrect destination address, the tokens will be sent there and cannot be recovered. Always double-check addresses before confirming.

**Q: Is there a minimum transfer amount?**
A: No technical minimum, but consider gas costs for very small amounts.
