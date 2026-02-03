---
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 13
---

### How can I get in touch with the Zenrock Team?

You can find us on Discord and X/Twitter:

- [Discord](https://discord.gg/zenrock)
- [X/Twitter](https://x.com/zenrock)

### What are the relevant links for Zenrock?

**Mainnet (Diamond):**
- Platform Frontend: [https://app.zenrocklabs.io](https://app.zenrocklabs.io)
- Workspaces Frontend: [https://zen.app.zenrocklabs.io](https://zen.app.zenrocklabs.io)
- RPC Node: [https://rpc.diamond.zenrocklabs.io](https://rpc.diamond.zenrocklabs.io)
- API: [https://api.diamond.zenrocklabs.io](https://api.diamond.zenrocklabs.io)
- Explorer: [https://explorer.diamond.zenrocklabs.io](https://explorer.diamond.zenrocklabs.io)

**Testnet (Gardia):**
- Platform Frontend: [https://zen-platform.gardia.zenrocklabs.io](https://zen-platform.gardia.zenrocklabs.io)
- Workspaces Frontend: [https://gardia.zenrocklabs.io](https://gardia.zenrocklabs.io)
- RPC Node: [https://rpc.gardia.zenrocklabs.io](https://rpc.gardia.zenrocklabs.io)
- API: [https://api.gardia.zenrocklabs.io](https://api.gardia.zenrocklabs.io)
- Faucet: [https://faucet.gardia.zenrocklabs.io](https://faucet.gardia.zenrocklabs.io)
- Explorer: [https://explorer.gardia.zenrocklabs.io](https://explorer.gardia.zenrocklabs.io)

### Does Zenrock support smart contract development?

Yes, we are supporting CosmWasm for smart contract interaction. We are currently using `v0.53.4`.

### How do I run a validator node?

Validator setup is documented in the official Zenrock Validators repository. This includes:

- Key generation (ECDSA, BLS, CometBFT)
- Kubernetes deployment via Helm charts
- Hardware requirements and configuration
- Validator registration for testnet (Gardia) and mainnet (Diamond)

**Repository**: [https://github.com/zenrocklabs/zenrock-validators](https://github.com/zenrocklabs/zenrock-validators)

For additional support, join our [Discord](https://discord.gg/zenrock) and visit the validator-support channel.

## Developer FAQ

### What are the gas costs on zrChain?

Gas prices on zrChain are denominated in `urock` (micro-ROCK). The standard gas price is `0.0001urock`. Typical transaction costs:

- Simple transfers: ~100,000 gas
- Key requests: ~200,000 gas
- Signature requests: ~150,000 gas

### How do I deploy a CosmWasm contract?

zrChain supports CosmWasm smart contracts. To deploy:

1. Compile your Rust contract to WASM
2. Upload the WASM binary using `zenrockd tx wasm store`
3. Instantiate with `zenrockd tx wasm instantiate`

For detailed instructions, refer to the [CosmWasm documentation](https://docs.cosmwasm.com/).

### How do I test locally?

For local development:

```bash
cd zenrock/zrchain
./init.sh --localnet 1
```

This starts a local validator with sample data. See the [CLI Reference](./build/cli-reference.md) for command examples.

### What SDKs are available?

- **CosmJS**: JavaScript/TypeScript SDK for Cosmos chains
- **cosmrs**: Rust SDK for Cosmos chains
- **zenrockd CLI**: Direct command-line interface

TypeScript examples are available in the internal codebase for building custom integrations.
