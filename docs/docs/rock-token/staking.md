---
title: Staking $ROCK
sidebar_label: Staking
sidebar_position: 5
---

# Staking $ROCK

Staking rewards on $ROCK center around the **Node Reward Pool (NRP)**: a dedicated on-chain module that distributes rewards to validators and their delegators.

## Node Reward Pool (NRP)

The NRP is funded from two sources:

1. **Genesis Allocation**: 8% of total supply at genesis (~61.8M ROCK)
2. **Protocol Fees**: 30% of all fees earned on zrChain (the "staker share")

All staking rewards flow from the NRP to validators and their delegators.

## Reward Sources

Staked $ROCK earns rewards from two sources, and the rewards a staker receives at any given point is the sum of both:

1. **Baseline Rewards** - Fixed block emissions
2. **Protocol Rewards** - Fee-based distributions

## Baseline Rewards

Baseline rewards are fixed block emissions paid to stakers, funded by the NRP's genesis allocation. The per-block reward follows this schedule:

| Effective Date | Block Reward | Annual Emission |
|----------------|--------------|-----------------|
| 2026-01-01 | 2.25 ROCK | ~12.2M ROCK |
| 2027-01-01 | 1.0 ROCK | ~5.4M ROCK |
| 2028-01-01 | 0.5 ROCK | ~2.7M ROCK |
| 2029-01-01 | 0.25 ROCK | ~1.35M ROCK |
| 2030-01-01 | 0.1 ROCK | ~0.54M ROCK |
| 2031-01-01 | 0 ROCK | 0 |

**Total baseline emissions over the 5-year schedule: ~22.2M ROCK**

The NRP's 8% genesis allocation (~61.8M ROCK) provides ample coverage for baseline emissions plus protocol rewards distributions.

## Protocol Rewards

Protocol rewards are based on fees earned by the protocol, including offchain revenue routed through the tokenomics. The 30% staker share of all fees flows to the NRP and is distributed over time according to the following vesting schedule:

### Vesting Schedule (36 months total)

| Period | Duration | Share |
|--------|----------|-------|
| Tranche 1 | 30 days after fee event | 1/3 |
| Tranche 2 | 5 months after Tranche 1 | 1/3 |
| Tranche 3 | 30 months after Tranche 2 | 1/3 |

### How Vesting Works

Fees are aggregated into monthly epochs (30-day periods). Distribution occurs per-block for smooth rewards, with approximately 36 active epoch buckets at any given time.

### Example Calculation

If 100 $ROCK is earned in fees during month 1:

1. **30 $ROCK flows to NRP** (30% staker share)
2. **Month 2**: 10 $ROCK released (~0.33 ROCK/day from Tranche 1)
3. **Months 3-7**: 10 $ROCK released (~0.067 ROCK/day from Tranche 2)
4. **Months 8-37**: 10 $ROCK released (~0.011 ROCK/day from Tranche 3)

### Why Vesting Matters

The 36-month vesting schedule creates a structural token sink:

- **Growing Backlog**: As fees accumulate, a larger portion of tokens are committed to future payouts
- **Reduced Circulation**: Tokens in the vesting queue are effectively removed from circulating supply
- **Aligned Incentives**: Long-term stakers benefit most, discouraging short-term speculation

## How to Stake

Stake your $ROCK with validators through the Zenrock Platform to earn both baseline and protocol rewards. Rewards are distributed proportionally based on your stake relative to the total staked amount.

## Related Documentation

- [Introduction](./introduction.md) - Token basics and utility
- [Tokenomics](./tokenomics.md) - Fee distribution framework
- [Protocol Revenue](./protocol-revenue.md) - Fee sources
- [Token Allocation](./allocation.md) - Initial distribution
