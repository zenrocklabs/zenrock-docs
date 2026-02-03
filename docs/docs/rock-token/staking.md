---
sidebar_position: 6
title: Staking $ROCK
---

# Staking $ROCK

Staking rewards on $ROCK centers around the **Node Reward Pool (NRP)**: a dedicated onchain module pre-funded with 8% of total supply at genesis. The NRP receives 30% of all fees earned on zrChain. All staking rewards flow from the NRP to validators and their delegators.

Staked $ROCK earns rewards from two sources:

* Baseline Rewards
* Protocol Rewards

The rewards a staker receives at any given point is the sum of the two.

**Baseline Rewards** are fixed block emissions paid to stakers, funded by the NRP's genesis allocation. The per-block reward follows this schedule:

| Effective Date | Block Reward | Annual Emission |
| :---- | :---- | :---- |
| 2026-01-01 | 2.25 ROCK | ~12.2M ROCK |
| 2027-01-01 | 1.0 ROCK | ~5.4M ROCK |
| 2028-01-01 | 0.5 ROCK | ~2.7M ROCK |
| 2029-01-01 | 0.25 ROCK | ~1.35M ROCK |
| 2030-01-01 | 0.1 ROCK | ~0.54M ROCK |
| 2031-01-01 | 0 ROCK | 0 |

Total baseline emissions over the 5-year schedule: ~22.2M ROCK.

**Protocol Rewards** are based on fees earned by the protocol (including offchain revenue routed through the tokenomics). The 30% share of all fees flows to the NRP and is distributed over time according to the following schedule:

* 1/3 paid linearly over 30 days following the fee event
* 1/3 paid linearly over 5 months after that
* 1/3 paid linearly over 30 months after that

**Implementation note:** To avoid unbounded state growth, fees are aggregated into monthly epochs (30-day periods). Each epoch accumulates all fees received during that period, then distributes them according to the schedule above. Distribution happens per-block for smooth rewards, but aggregation is monthly. This bounds onchain state to approximately 36 active epoch buckets regardless of transaction volume.

**Example:** Assume during month 1, 100 $ROCK is earned as fees. 30 $ROCK flows to the NRP per the tokenomics. When the epoch closes after 30 days:

- Over the next 30 days (month 2), 10 $ROCK is released at a constant rate (~0.33 ROCK/day)
- Over the following 5 months (months 3-7), 10 $ROCK is released (~0.067 ROCK/day)
- Over the following 30 months (months 8-37), the final 10 $ROCK is released (~0.011 ROCK/day)

Total distribution period: 36 months from epoch close.

This schedule smooths rewards and creates predictable returns, **but more importantly, it creates a structural token sink.**

**Because rewards are distributed over 36 months rather than immediately, there is always a growing backlog of $ROCK committed to future payouts. As protocol activity increases, the pipeline of pending distributions grows. Tokens that would otherwise be liquid are locked in the distribution queue, temporarily removed from circulating supply.**

The more successful the protocol becomes, the larger this sink grows. It's not a temporary lockup or an artificial staking mechanism. It's a perpetual feature of how the protocol works, bringing stability and transparency to changes in circulating supply.
