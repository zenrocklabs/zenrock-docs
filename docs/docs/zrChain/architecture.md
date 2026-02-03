---
title: Zenrock System Architecture
sidebar_label: Zenrock Architecture
sidebar_position: 3
---

The Zenrock System Architecture defines the components involved in the blockchain-based multi-party-computation system that provides access to a broad spectrum of use cases in a secure and trustful manner.

<div style={{maxWidth: "900px", margin: "0 auto"}}>

![Zenrock Architecture](../../static/img/zenrock_architecture.png)

</div>

### Zenrock Blockchain

The central component is the **_Zenrock Blockchain_** which provides a source-of-truth that coordinates:

- New key requests e.g. using the MPC system
- Keyring registration & management
- Signature generation & management
- Policy control - enabling multi-party control of signatures
- Other standard Cosmos features such as staking, governance, IBC, etc.

Besides the standard Cosmos modules, the Zenrock blockchain incorporates several custom modules:

**Core Infrastructure Modules**:
- Create and manage workspaces and keyrings in the [**_Identity Module_**](identity.md)
- Request and manage keys as well as request signatures in the [**_Treasury Module_**](treasury.md)
- Create and define policies in the [**_Policy Module_**](policy.md)
- Managing validator stake and voting power with the [**_Validation Module_**](validation.md)

**Wrapped Asset Modules**:
- Manage Bitcoin wrapped assets in the [**_zenBTC Module_**](zenbtc.md)
- Generalized wrapped asset framework in the [**_DCT Module_**](dct.md)

**Cross-Chain & Privacy Modules**:
- Privacy-preserving shielded transactions in the [**_Hush Module_**](hush.md)
- Cross-chain token bridging in the [**_zenTP Module_**](zentp.md)

Additional modules include `x/zenex/` (exchange functionality), `x/nrp/` (network resource provisioning), and `x/mint/` (token minting).

Users can interact with the Zenrock Blockchain using a self-hosted wallet or any registered keyring - such as the Zenrock MPC system.
The Zenrock blockchain gives users the ability to interact with custom modules, stake tokens and take part in governance. As a platform agnostic signature generation & key management service, it provides unified access to some of the largest blockchain ecosystems.

### Keyrings

**_Keyrings_** define off-chain systems that manage the creation of keys and signatures. Developers are able to develop, register and use custom keyrings as required.

Keyrings are registered on the Zenrock Blockchain and thereafter receive key and signature requests that are processed off-chain.
Keyring responses are published on the Zenrock Blockchain via party-specific controllers.
The first enterprise-grade keyring is the Zenrock Multi-Party-Computation system. This provides MPC services as a keyring thereby allowing participants to diversify control and manage risk.

### Relayers

**_Relayers_** assemble unsigned transactions and the returned signatures and broadcast these to the relevant network.
In case of private transactions, where no details about the payload are disclosed, the requesting party needs to run their own relayer.

### Enshrined Oracle via Vote Extensions

zrChain's oracle mechanism is enshrined directly into consensus through CometBFT Vote Extensions. Each validator runs an **Oracle Sidecar** alongside their validator node that monitors external blockchains and feeds data into the zrChain consensus process.

**During each block:**

1. **ExtendVote**: Validators query their sidecar for the latest external chain state (block headers, account nonces, events, prices) and include cryptographic hashes in their vote extension
2. **PrepareProposal**: The block proposer aggregates vote extensions and validates that hash commitments match the actual data
3. **PreBlocker**: Only data achieving supermajority consensus (>2/3 voting power) is applied to chain state

This design ensures that external chain data is verified by the majority of validators before being used. **By enshrining the oracle mechanism directly into core consensus, zrChain ensures that as long as the chain itself is secure, every instruction passed to the dMPC is legitimate.**

Critical fields like block headers require supermajority consensus, while less critical data like gas prices can proceed with simple majority. The sidecar monitors multiple blockchains simultaneously:

| Chain | Data Observed |
|-------|---------------|
| Bitcoin & Zcash | Block headers for SPV-style verification |
| Solana | Account nonces, mint/burn events |
| Price Feeds | ROCK and BTC prices for fee calculations |

### BTC Proxy

The **_BTC Proxy_** is a component that runs alongside the zenrock blockchain and is mainly responsible for managing UTXOs and sending transactions to the Bitcoin network triggered from zrChain's workspaces and keys.

### Security Properties

zrChain inherits Cosmos SDK's Byzantine fault tolerance: the network remains secure as long as fewer than 1/3 of validators are malicious. Key security features include:

- **Distributed key custody**: dMPC ensures no party ever holds a complete private key. The key is cryptographically split across multiple independent parties using MPC and executed inside secure enclaves, which provide hardware-enforced isolation and runtime integrity guarantees.

- **Consensus-verified external data**: Block headers and events require supermajority agreement (>2/3 voting power) before being applied to chain state. This ensures external chain data is verified by the majority of validators before being used.

- **Deterministic execution**: All validators process the same data and reach identical state, ensuring consistency across the network.

- **Supply invariants**: Strict accounting ensures wrapped token supply equals custodied reserves. The invariant `Custodied = Pending + Minted` is enforced at every state transition.

These properties combine to provide defense in depth: an attacker would need to breach multiple independent systems, defeat hardware-level isolation, and do so simultaneously within a signing threshold.
