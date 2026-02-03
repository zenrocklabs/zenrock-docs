---
title: Protocol Revenue
sidebar_label: Protocol Revenue
sidebar_position: 2
---

# Protocol Revenue

All Zenrock products generate fees that flow through $ROCK tokenomics. Fees are converted to $ROCK and distributed according to the 35/30/30/5 split (see [Tokenomics](./tokenomics.md)).

## Fee Structures

### DCTs (zenBTC, zenZEC, future DCTs)

| Action | Fee |
|--------|-----|
| Mint | $5 flat |
| Redeem | 50 bps (0.50%) |

DCTs (Decentralized Custody Tokens) are cross-chain assets secured by dMPC. The mint fee covers operational costs while the redemption fee scales with transaction size.

### Hush Protocol

| Action | Fee |
|--------|-----|
| Shield | Free |
| Transfer | 0.01 jitoSOL |
| Unshield | 50 bps (0.50%) |
| Unshield + SOL funding | +10 bps (0.01 SOL) |

Shielding is free to encourage pool growth and strengthen privacy guarantees. The unshield + SOL funding option enables withdrawals to fresh wallets with zero SOL balance.

## Fee Conversion

All fees collected across the ecosystem are:

1. Converted to $ROCK
2. Distributed per the tokenomics framework (35% Labs / 30% NRP / 30% Builder / 5% zenBTC)
3. This creates protocol-driven demand for $ROCK

## zenBTC Yield Mechanism

**Important**: zenBTC yield comes ONLY from protocol fees, NOT from lending or restaking.

### Yield Sources

1. **35% of zenBTC custody fees** (redemption fees from zenBTC)
2. **5% of ALL zrChain fees** (universal allocation from all products)

### Security Guarantees

The underlying BTC is:

- Never lent out
- Never levered up
- Never used as risk capital
- Held in decentralized custody only

There are no basis trades, no delta-neutral strategies, no opaque vaults, and no dependencies on other firms.

### Market-Determined Yield

Yield rate is a function of two variables:

1. Total zenBTC supply
2. Total Zenrock protocol fees

**Self-Balancing Mechanism**:
- More fees generates higher yield
- Higher yield attracts more minting, increasing supply
- Increased supply pushes yield back down
- If yield falls too low, users redeem, supply decreases, yield rises again

The result is a self-balancing mechanism that naturally discovers the market-clearing yield for low-risk BTC on Solana. No governance votes, no manual rate setting, no emissions schedules. Just supply and demand.

### Yield Payment

Unlike most yield-bearing BTCs that pay in points or governance tokens, zenBTC yield is paid directly in sats on the Bitcoin blockchain, distributed daily.

## Revenue Scaling

As more products launch and usage grows, protocol revenue scales accordingly. The universal tokenomics framework means every new product, whether built by Zenrock Labs or third-party developers, contributes to the same fee pools.

## Related Documentation

- [Introduction](./introduction.md) - Token basics
- [Tokenomics](./tokenomics.md) - Fee distribution details
- [Staking](./staking.md) - How protocol rewards reach stakers
- [Token Allocation](./allocation.md) - Initial distribution
