---
title: Tokenomic Design
sidebar_label: Tokenomics
sidebar_position: 3
---

# Fee Distribution

Every fee from every product built on Zenrock's infrastructure, whether developed by Zenrock Labs or an external team, is handled according to the same tokenomic framework.

## Fee Distribution Split

| Recipient | Share | Purpose |
|-----------|-------|---------|
| Zenrock Labs | 35% | Operations, development, $ROCK accumulation |
| Node Reward Pool (NRP) | 30% | Validators and stakers (36-month vesting) |
| External Builder | 30% | Product developer revenue share |
| zenBTC Yield | 5% | Direct allocation to zenBTC holders |

**Total: 100%**

## How It Works

All fees across the ecosystem are converted to $ROCK and distributed according to this framework. This creates a direct, protocol-driven bid on $ROCK. As fees increase, protocol-driven demand for the token increases.

Those tokens are then distributed across the ecosystem according to the split above and, critically, are returned to the circulating market slowly over time due to the design of the Node Reward Pool.

## Special Cases

### Labs-Built Products

When Zenrock Labs develops a product, Labs is counted as both Zenrock Labs (35%) and the External Builder (30%), receiving a combined 65% of fees from that product.

**Exception**: On zenBTC, even though developed by Zenrock Labs, the External Builder share (30%) is converted to yield on zenBTC rather than going to Labs.

### zenBTC Yield Sources

zenBTC yield comes ONLY from protocol fees. BTC is never lent out, levered up, or used as risk capital.

zenBTC holders receive:
1. **30% builder share from zenBTC fees** — On zenBTC (though developed by Zenrock Labs), the 30% builder share is redirected to zenBTC yield rather than going to Labs
2. **5% of ALL zrChain fees** — The universal zenBTC allocation from all ecosystem products

Combined, this means **35% of zenBTC custody fees** (the 30% redirected builder share + 5% direct allocation) flow to zenBTC holders, plus 5% of all other ecosystem fees.

## Zenrock Labs Alignment

Zenrock Labs receives 35% of all protocol fees, permanently enshrined in the protocol. This is not a tax on the protocol; it is an investment in everything that makes the protocol worth owning.

### Why Labs Alignment Matters

Projects that underfund their Labs end up with stalled development, missed partnerships, and slow ecosystem growth. A well-resourced Labs means more products, faster growth, stronger partnerships, and a more valuable network.

### Full Alignment Design

The 35% fee share allows Zenrock Labs to direct all offchain revenue through the tokenomics top of funnel, creating 100% alignment between Labs and the protocol.

**If Labs signs an offchain agreement, all resulting economics are treated as protocol revenue and distributed through the same fee structure.** There is no second business quietly capturing value outside the token. Labs cannot win if the token holder does not win. The token holder cannot win if Labs does not win.

### Offchain Revenue Routing

Most projects have a Labs company that needs revenue but is cut out of the tokenomic model. This leads to hidden offchain deals, backdoor arrangements, and quiet revenue streams that never touch the token. The result: usage grows but the token does not benefit.

**Zenrock Labs agrees to route all economic activity through the protocol.** If Zenrock Labs signs an offchain agreement, all resulting revenue is treated as protocol revenue and distributed through the same publicly visible tokenomic fee structure. There is no second business quietly capturing value outside the protocol.

This creates structural alignment: as a $ROCK holder, you do not have to guess whether some unseen side deal is draining your upside. All offchain revenue flows through the same tokenomics as onchain fees.

## Structural Token Sink

The 30% NRP share is vested over 36 months (not distributed immediately). This creates:

- A growing backlog of committed future payouts
- Tokens effectively removed from circulation during the vesting period
- Sustained buying pressure from fee conversion with delayed sell pressure from distributions

## Related Documentation

- [Introduction](./introduction.md) - Token basics and utility
- [Staking](./staking.md) - NRP mechanism and reward details
- [Protocol Revenue](./protocol-revenue.md) - Specific fee structures
- [Token Allocation](./allocation.md) - Initial distribution
