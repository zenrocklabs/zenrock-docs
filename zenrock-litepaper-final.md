**Zenrock Comprehensive Litepaper**

**![][image1]**

*Decentralized Custody, Privacy and More                                                                      2.3.2026*

**Zenrock is on a mission to expand and grow what is possible onchain with products and services users actually want. Our technology stack and deep cryptographic and cross-chain expertise allow us to venture into areas previously untapped.**

**$ROCK is the value capture mechanism for the Zenrock ecosystem, including all products developed by Zenrock Labs or by third parties leveraging Zenrock's infrastructure.**

# **Overview**

* **Zenrock:** A permissionless ecosystem supported by Zenrock Labs and the Zenrock Foundation.   
* **zrChain:** A purpose-built Layer 1 for distributed multi-party computation (dMPC). It is flexible infrastructure powering everything in the Zenrock ecosystem  
    
* **Decentralized Custody Tokens (DCTs):** Cross-chain assets secured by dMPC, eliminating centralized vaults and single points of failure. The first two DCTs, zenBTC and zenZEC, are live on Solana  
    
* **Hush Protocol:** A Zcash inspired privacy layer on Solana. Shield assets, transfer privately, earn yield, and withdraw anywhere without exposing your wallets  
    
* **Future Products:** dMPC unlocks use cases across DeFi, privacy, identity, key management, and beyond. Zenrock enables the development of products and services that solve real problems in DeFi and cloud  
    
* **$ROCK benefits from ecosystem growth:** Every product built on zrChain, by Zenrock Labs or anyone else, flows revenue through the same tokenomics. More products, more fees, more value to $ROCK

# **zrChain**

zrChain is a Delegated Proof-of-Stake chain built on the Cosmos SDK, purpose-built to run distributed multi-party computation with enshrined oracles that enable secure and complex cross-chain operations.

At the core of Zenrock's dMPC is a threshold signature scheme (TSS). To produce a valid signature, multiple parties exchange key fragments, but the private key is never assembled. No participant, including Zenrock, ever has enough information to reconstruct it. **The key doesn't exist in any single location because it was never created in full. Only mathematical fragments exist.**

This allows zrChain to control wallets on any third-party blockchain without any party ever knowing the underlying private key. 

**dMPC signature instructions can only originate from zrChain, making the entire signing process decentralized.** Through CometBFT Vote Extensions (a mechanism allowing validators to include additional data in their consensus votes), each validator runs an enshrined oracle sidecar as part of their node. This sidecar monitors events on external chains (for example, a deposit event on Bitcoin) and submits them directly into zrChain's core consensus process. Validators collectively observe the event, reach consensus, and only then does the chain instruct the dMPC to act. **By enshrining the oracle mechanism directly into core consensus, zrChain ensures that as long as the chain itself is secure, every instruction passed to the dMPC is legitimate.**

zrChain launched with a genesis set of 8 dMPC operators and 60+ validators. These infrastructure providers possess significant cumulative stake across 50+ chains with geographic distribution across 22+ countries. Over time, the dMPC operator set will expand to 16, then 32, each time increasing the cryptographic threshold and security guarantees.

## Distributed Multi-Party Computation with Secure Enclaves

Our system combines distributed Multi-Party Computation (dMPC) with hardware-backed secure enclaves to provide strong cryptographic security, operational resilience, and verifiable trust — without relying on a single trusted machine or operator.

### Core Principle

Private keys are never stored or reconstructed in full. Instead, they are:

- Cryptographically split across multiple independent parties using MPC  
- Executed inside secure enclaves, which provide hardware-enforced isolation and runtime integrity guarantees

This layered approach ensures that both key material and execution logic remain protected, even in the presence of compromised infrastructure. Even if an attacker gains control over parts of the hosting environment, they cannot extract private keys or manipulate signing behavior, because key material is cryptographically distributed and all signing operations are confined to attested, hardware-isolated environments.

### Role of Secure Enclaves

A secure enclave is a protected execution environment provided by modern hardware. Code running inside an enclave is:

- Isolated from the host operating system and hypervisor  
- Protected from memory inspection or tampering  
- Able to produce cryptographic attestations proving what code is running

In our architecture, each MPC participant runs inside its own enclave, ensuring that:

- Key shares are never exposed to the host machine  
- Signing logic cannot be modified without detection  
- Even privileged system access cannot extract sensitive material

### dMPC Signing Flow with Enclaves

**Distributed Key Generation:** The private key is generated collaboratively by multiple enclave-resident participants using an MPC protocol. Each enclave receives a unique key share. The full private key never exists anywhere.

**Attested Execution:** Each enclave can produce a signed attestation proving the exact MPC code it is running and that the code is executing inside genuine enclave hardware. Only attested enclaves are permitted to participate.

**Isolated Key Storage:** Key shares are encrypted inside their respective enclaves and cannot be accessed by the host system, administrators or cloud provider. They can only be accessed inside the enclave.

**Signing Request:** When a transaction needs to be signed, a request is sent to the required number of enclaves.

**Distributed Enclave Signing:** Each enclave computes a partial signature using its internal key share. These partial signatures reveal no information about the private key.

**Signature Assembly:** The partial signatures are combined into a standard blockchain signature, indistinguishable from one produced by a single private key.

**At no point is the private key reconstructed — inside or outside an enclave.**

### Security Features 

**Defense in Depth:**

- MPC prevents any single party from controlling a key  
- Enclaves prevent key shares from being extracted or tampered with  
- Attestation ensures only approved code can participate

**Compromise Resistance:** An attacker would need to breach multiple independent systems, defeat hardware-level isolation, and do so simultaneously within a signing threshold. This is substantially harder than compromising a single HSM, server, or operator.

**Verifiable Trust:** Because enclaves produce cryptographic attestations, external systems can verify that signing operations originate from approved, unmodified code and that keys are being used only within expected security boundaries.

### Operational Flexibility

- Threshold policies (e.g. M-of-N signers)  
- Node rotation and upgrades without changing public keys  
- Geographic and administrative separation of trust  
- Integration with onchain authorization and governance logic

All policy enforcement is designed to occur before and during signing, without weakening key security.

### Secure by Design

Traditional systems focus on protecting a single secret. **Our approach removes the secret entirely.**

**By distributing key ownership cryptographically and enforcing execution integrity through hardware isolation, the system ensures that no single failure (technical or human) can result in key compromise.**

This makes MPC with secure enclaves a strong foundation for high-value digital asset custody, decentralized infrastructure, and systems requiring both security and availability.

## zrChain: Technical Architecture

### Consensus & Validator Architecture

zrChain uses Delegated Proof-of-Stake with a hybrid validation model. The validator set includes both standard validators running consensus and a specialized subset of dMPC operators. This separation allows the network to scale the validator count for decentralization while maintaining a controlled set of cryptographic key holders for security-critical operations.

### dMPC Integration

The treasury module manages all interactions with the MPC infrastructure. Signing requests follow this flow:

1. A module (zenBTC, DCT, or Hush) creates a `SignTransactionRequest` specifying the key ID and unsigned transaction  
2. dMPC operators poll zrChain for pending requests  
3. Operators execute the GG21 threshold signature protocol (detailed in the previous section)  
4. Each operator submits their signature share to zrChain  
5. Once sufficient signatures arrive (meeting the keyring threshold), the request is fulfilled  
6. A relayer broadcasts the signed transaction to the destination chain

### Enshrined Oracle via Vote Extensions

zrChain's oracle mechanism is enshrined directly into consensus through CometBFT Vote Extensions. Each validator runs a sidecar binary that monitors external blockchains and feeds data into the zrChain consensus process to be voted on.

During each block:

1. **ExtendVote**: Validators query their sidecar for the latest external chain state (block headers, account nonces, events, prices) and include cryptographic hashes in their vote extension  
2. **PrepareProposal**: The block proposer aggregates vote extensions and validates that hash commitments match the actual data  
3. **PreBlocker**: Only data achieving supermajority consensus (\>2/3 voting power) is applied to chain state

This design ensures that external chain data is verified by the majority of validators before being used. Critical fields like block headers require supermajority consensus, while less critical data like gas prices can proceed with simple majority.

### Cross-Chain Observation

The sidecar oracle monitors multiple blockchains simultaneously:

- **Bitcoin & Zcash**: Block headers for SPV-style verification (Simplified Payment Verification, a lightweight method for confirming transactions via Merkle proofs)  
- **Solana**: Account nonces for transaction sequencing, mint/burn events for confirmation

Block headers are stored in dedicated collections and used to verify deposit transaction inclusion via Merkle proofs. This allows zrChain to trustlessly confirm external deposits without relying on centralized data providers.

### Security Properties

zrChain inherits CometBFT’s Byzantine fault tolerance (hence the BFT in the name): the network remains secure as long as fewer than 1/3 of validators are malicious. Key security features include:

- **Distributed key custody**: dMPC ensures no party ever holds a complete private key  
- **Consensus-verified external data**: Block headers and events require supermajority agreement  
- **Deterministic execution**: All validators process the same data and reach identical state  
- **Supply invariants**: Strict accounting ensures wrapped token supply equals custodied reserves

### Workspaces

Workspaces are the core organizational primitive on zrChain. Every dMPC key belongs to a workspace, not to an individual account. A workspace is a shared governance container, analogous to a team vault, where owners request keys, authorize signatures, and control access. This decouples key management from any single blockchain account, enabling teams, institutions, and individuals to manage cross-chain wallets under a shared governance structure.

Each workspace supports multiple owners and enforces a dual-policy model: an **admin policy** governs structural changes (adding or removing owners, creating child workspaces), while a separate **sign policy** gates all cryptographic operations (key requests, signature requests). Owners configure policies through zrChain's policy module, ranging from simple single-owner approval to complex multi-signature thresholds. Workspaces can also form hierarchies, where child workspaces inherit their parent's policies by default, enabling organizational structures that mirror real-world team setups.

**Workspaces give zrChain a programmable access control layer that makes dMPC practical for real teams and institutions, not just individual users. Any organization can create a workspace, define its own governance rules, and manage cross-chain wallets without ever trusting a single custodian.**

# **Decentralized Custody Tokens (DCTs)**

A DCT is any token issued through Zenrock's decentralized custody network. Secured by dMPC and anchored by zrChain, DCTs set a new standard for cross-chain asset custody.

DCTs are more than wrappers. They're a security foundation. DeFi primitives can be built on top: structured products, leveraged vaults, restaking strategies. Developers take creative risks. Users choose their exposure. **The underlying custody stays the same.**

## Decentralized Custody Tokens: Technical Architecture

The DCT framework handles the complete lifecycle: deposit detection, verification, minting, and redemption.

### Deposit & Verification Flow

Dedicated outpost services monitor external blockchains for deposits to dMPC-controlled addresses. When a deposit achieves sufficient confirmations (typically 6 for Bitcoin), the outpost generates a Merkle proof demonstrating the transaction's inclusion in the block and submits it to zrChain.

zrChain then performs multi-step verification:

1. **Block Header Validation**: The referenced block header is fetched from consensus-verified storage (see zrChain's enshrined oracle above)  
2. **Merkle Proof Verification**: The transaction's inclusion is cryptographically verified against the stored block header  
3. **Deduplication**: A SHA256 hash of the transaction output prevents double-processing

Upon successful verification, a `PendingMintTransaction` is created.

### Minting Flow

Once a deposit is verified, the minting process proceeds through multiple phases:

**Phase 1 \- Consensus Verification**: The PreBlocker confirms validators have reached consensus on Solana nonce values and account states.

**Phase 2 \- Transaction Construction**: The system prepares a Solana transaction specifying the exact mint amount and recipient.

**Phase 3 \- MPC Signing**: The transaction is submitted to the treasury module, which collects threshold signatures from distributed key holders.

**Phase 4 \- Broadcast & Confirmation**: The signed transaction is broadcast to Solana. The sidecar oracle monitors for mint events and reports confirmation back to zrChain.

### Redemption Flow

When users burn wrapped tokens on Solana to redeem the underlying asset:

1. **Burn Detection**: The sidecar oracle monitors Solana for burn events  
2. **Maturity Period**: Burns enter an escrow period before being processed  
3. **Transaction Construction**: The relevant outpost constructs an unsigned transaction  
4. **MPC Signing**: The transaction is signed through the distributed MPC infrastructure  
5. **Broadcast**: The outpost broadcasts the signed transaction to the external blockchain

### Supply Accounting

The DCT system maintains strict supply invariants:

- **Custodied**: Native assets held in custody addresses on external chains  
- **Pending**: Deposits verified but not yet minted on Solana  
- **Minted**: Wrapped tokens in circulation on Solana

The invariant `Custodied = Pending + Minted` is enforced at every state transition. This ensures wrapped token supply is always fully backed by custodied reserves.

# **zenBTC**

Mint: [https://zenbtc.app.zenrocklabs.io/](https://zenbtc.app.zenrocklabs.io/)

CA: 9hX59xHHnaZXLU6quvm5uGY2iDiT3jczaReHy6A6TYKw

zenBTC is Zenrock's flagship DCT: **decentralized yield-bearing wrapped Bitcoin on Solana.**

The underlying BTC is never lent out, levered up, or used as risk capital. There are no basis trades, no delta-neutral strategies, no opaque vaults, no dependencies on other firms. **Your BTC is in decentralized custody, designed for security.**

Most yield-bearing products rely on hidden strategies or unsustainable token emissions. zenBTC does neither. **Yield is funded by real protocol fees:** 5% of all zrChain fees flow to zenBTC, plus 35% of zenBTC custody fees directly.

Yield breakdown: [https://app.zenrocklabs.io/zenbtc/yield](https://app.zenrocklabs.io/zenbtc/yield)

Because zenBTC is permissionless to mint and redeem, yield is set by the market, not by marketing.

The yield rate is a function of two variables:

1. Total zenBTC supply  
2. Total Zenrock protocol fees

As Zenrock earns more fees, yield rises. As yield rises, more users may choose to mint zenBTC to capture it, increasing supply and pushing yield back down. The cycle works in both directions: if yield falls too low, users redeem, supply decreases, and yield rises again.

**The result is a self-balancing mechanism that naturally discovers the market-clearing yield for low-risk BTC on Solana.** No governance votes, no manual rate setting, no emissions schedules. Just supply and demand.

And unlike most yield-bearing BTCs that pay in points or governance tokens, zenBTC yield is paid directly in sats on the Bitcoin blockchain, distributed daily.

# **zenZEC**

Mint: [https://app.zenrocklabs.io/zenzec/crucible](https://app.zenrocklabs.io/zenzec/crucible)

CA: JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS

zenZEC is the second DCT: **decentralized wrapped Zcash on Solana.**

Zcash pioneered zero-knowledge proofs in cryptocurrency, enabling shielded transactions where the sender, receiver, and amount are encrypted. By bringing ZEC to Solana via the DCT standard, zenZEC inherits both Zcash's privacy heritage and Zenrock's decentralized custody guarantees.

# **Hush Protocol**

Use Hush: [https://hushprotocol.xyz](https://hushprotocol.xyz)

Hush is the privacy layer for Solana.

Solana is fast, cheap, and increasingly the default venue for DeFi. But it's a public ledger. Every transaction, every balance, every decision is visible to anyone. For many users and use cases, that's a problem. And as Solana is used for more things (rent payment, salary, car payment, stock trading, and more), the need for privacy will only grow.

Hush enables anonymity via a shielded asset pool. Users deposit ("shield") jitoSOL into a pool where their assets become indistinguishable from everyone else's. They can then:

- **Transfer privately** to other Hush users without ever leaving the shielded pool  
- **Unshield to any address**—with no onchain link to the original deposit

This creates an entirely private economy within the pool. Users can receive funds, send payments, and transact multiple times—all without touching public Solana until they choose to.

Hush is designed to incorporate core compliance features:

- **OFAC wallet screening**: All shielding transactions are screened via a CipherOwl integration  
- **AML/ Theft screening:** All shielding transactions are screened via a CipherOwl integration  
- **Terrorist financing/ CSAM screening:** All shielding transactions are screened via a CipherOwl integration  
- **Regional geo-blocking**: Sanctioned regions are prohibited from interacting with Hush  
- **Viewing keys for audibility**: Users retain a record of their shielded activity that they can release to auditors at their own discretion

### The Vision

Hush is a shielded compute layer: a fully Turing-complete VM built on Solana. Any application that can be built on Solana can be built privately via Hush.

The pool is denominated in jitoSOL rather than native SOL so users do not have to sacrifice staking yield while remaining private. No opportunity cost means no reason to leave. This design allows the pool to grow continuously without tradeoffs, and as the pool grows, privacy guarantees strengthen for everyone.

At launch, shielding, unshielding, and transferring are enabled. Users can also perform partial transfers and partial withdrawals, which increases the privacy guarantees for the entire pool by allowing large deposits to strengthen anonymity for smaller ones.

Over time, Zenrock Labs and third parties will build on Hush, bringing DeFi, payments, and other applications into the shielded layer. The goal is privacy and usability without tradeoffs: everything you have on Solana, but private.

## Hush Protocol: Technical Architecture

### Zero-Knowledge Foundation

Hush uses **Miden zk-STARKs** as its proof system, chosen for two critical properties:

- **No Trusted Setup**: Unlike Groth16 or PLONK, Miden zk-STARKs require no ceremony or trusted parameters  
- **Post-Quantum Resistance**: Hash-based proofs are not vulnerable to known quantum attacks like Shor's algorithm

The cryptographic stack includes:

| Primitive | Algorithm | Purpose |
| :---- | :---- | :---- |
| Hash | RPO (Rescue Prime Optimized) | ZK-friendly hash native to Miden |
| Key Exchange | X25519 ECDH | Stealth addresses for shielded transfers |
| Encryption | ChaCha20-Poly1305 | Amount encryption and wallet recovery |

### Commitment Structure

When a user shields tokens, they create a cryptographic commitment that is added to a sparse Merkle tree (depth 24, \~16.7 million capacity) stored on zrChain. The user retains their `spending_key` privately, which is required to later prove ownership and spend the shielded funds.

### Shield Flow

1. **Client**: User generates a `spending_key` from their connected Solana wallet and derives a commitment from their deposit amount  
2. **Solana**: User calls the shield instruction, transferring tokens to a vault and emitting a `ShieldEvent`  
3. **Compliance Check**: The sidecar oracle performs OFAC screening via CipherOwl  
4. **Commitment Insertion**: Clean shield events are reported to zrChain via vote extensions and inserted into the Merkle tree  
5. **Voucher Creation**: A `ShieldedVoucher` is created with encrypted amount data

### Unshield Flow

1. **Client**: User generates a zk-STARK proof demonstrating knowledge of a valid commitment in the tree and correct nullifier derivation  
2. **Proof Submission**: User submits the nullifier, Merkle root, zk-STARK proof, and recipient address  
3. **Verification**: zrChain validates the nullifier hasn't been spent, the Merkle root is valid, and the zk-STARK proof verifies  
4. **Solana Transfer**: The PreBlocker constructs a transfer from the vault to the recipient, signed via MPC  
5. **Completion**: Once Solana confirms the transfer, the unshield is marked complete

The critical privacy property: the nullifier cannot be linked to the original commitment without knowing the `spending_key`. External observers see only that some commitment was spent, not which one.

### Shielded Transfers

Users can transfer value within the privacy pool in a fully encrypted manner without ever exposing private info on Solana—a key feature that enables private payments between Hush users’ shielded addresses:

1. Sender generates a zk-STARK proof showing they're spending a valid commitment and creating new commitments for recipient and change  
2. Transfer amounts are encrypted using ECDH with the recipient's public viewing key  
3. zrChain verifies the proof and adds new commitments to the Merkle tree  
4. Recipient scans for incoming transfers using their `incoming_viewing_key`, decrypting amounts they receive

All amounts and addresses remain private—only the commitments and fee are visible onchain. This enables an entirely private economy within the shielded pool: users can receive funds, transact multiple times, and only unshield when they need to interact with public Solana.

### Nullifier System

Nullifiers prevent double-spending while preserving privacy. Each commitment can only produce one valid nullifier, derived from the spending key. When spent, the nullifier is permanently recorded. Attempting to spend the same commitment again produces the same nullifier, which is rejected as already spent.

Crucially, knowing a nullifier reveals nothing about which commitment it corresponds to without the spending key. In addition, each transaction is padded with decoy nullifiers so that nobody is able to tell how many inputs each transaction has. **This provides an even greater level of privacy than Zcash**, where input/output counts per transaction are public and could be used to assist in probabilistically deanonymising users.

### Key Hierarchy

Hush implements tiered keys for different permission levels:

| Key | Spend | View Spent | Decrypt Incoming |
| :---- | :---- | :---- | :---- |
| `spending_key` | Yes | Yes | Yes |
| `full_viewing_key` | No | Yes | Yes |
| `incoming_viewing_key` | No | No | Yes |

- **Spending Key**: Full control, kept private by the user  
- **Full Viewing Key**: Share with auditors to reveal complete transaction history without spending ability  
- **Incoming Viewing Key**: Share to receive shielded transfers

### Fee Model

| Operation | Fee |
| :---- | :---- |
| Shield | Free |
| Transfer | 0.01 jitoSOL |
| Unshield | 0.50% |

For jitoSOL unshields, users can optionally request 0.01 SOL funding (+10 bps) to enable withdrawals to fresh wallets with zero SOL balance.

Fees are collected into a protocol fee pool and distributed according to Zenrock's tokenomic architecture, flowing value to $ROCK holders via the Node Reward Pool architecture described below.

### Privacy Guarantees

**What's Hidden:**

- Link between deposit and withdrawal addresses  
- Transfer amounts, sender and recipient addresses (encrypted with recipient's key)  
- Which commitment is being spent (only nullifiers revealed)  
- Amount of transaction inputs (decoy nullifiers are commingled with real ones)

**What's Visible:**

- Deposit/withdrawal amounts and addresses (visible on Solana)  
- Total pool size (aggregate of all shielded funds)  
- Nullifiers (but not their corresponding commitments)

---

With zrChain, DCTs, and Hush all generating fees, these revenue streams flow to a single token: $ROCK.

# **$ROCK**

**Solana CA:** 5VsPJ2EG7jjo3k2LPzQVriENKKQkNUTzujEzuaj4Aisf

zenBTC, Hush, and every future product built on zrChain share one thing: **$ROCK is the main value capture mechanism.** This is achieved via our Node Reward Pool architecture (detailed in the Staking $ROCK section).

$ROCK is the native token of zrChain, serving as gas, governance, and economic foundation. It exists natively on both Cosmos (ICS-20 implementation) and Solana (via zenTP native $ROCK bridge).

**$ROCK has a fixed supply of 1 billion tokens. With no inflation, ever.**

All rewards and incentives come from existing supply, including pre-allocated pools established at genesis. There is no mechanism to mint new tokens.

Unlike most tokens, **$ROCK had economic utility immediately at TGE.** All fees across the Zenrock ecosystem are paid in $ROCK (though often abstracted from the user). **Every revenue line generated by Zenrock Labs, onchain and offchain, as well as all onchain revenue from all other builders flows through the token.**

**This creates a direct, protocol-driven bid on $ROCK.** As fees increase, protocol-driven demand for the token increases. Those tokens are then distributed across the ecosystem according to Zenrock's tokenomic architecture (detailed in the Tokenomic Design section) and critically, are returned to the circulating market slowly over time due to the design of the Node Reward Pool.

As Zenrock Labs and others ship more products and more builders deploy on zrChain, protocol revenue grows. **More products, more fees, more protocol-driven demand for $ROCK.**

# **Protocol Revenue** 

**All Zenrock product fees flow through $ROCK. Here's how fees are structured across the ecosystem:**

**DCTs** (zenBTC, zenZEC, and future DCTs):

| Action | Fee |
| :---: | :---: |
| Mint | $5 flat |
| Redeem | 50bps |

**Hush:**

| Action | Fee |
| :---: | :---: |
| Shield | Free |
| Transfer | 0.01 JitoSOL |
| Unshield | 50bps |

All fees are converted to $ROCK and distributed according to Zenrock's tokenomic architecture (detailed in the next section). As more products launch and usage grows, protocol revenue scales accordingly.

# **Zenrock's Tokenomic Design**

**Every fee from every product built on Zenrock's infrastructure, whether developed by Zenrock Labs or any other team, is handled according to the same tokenomic framework.** Fees earned are distributed as follows:

* **35% to Zenrock Labs:** operations, development, and $ROCK accumulation  
* **30% to Node Reward Pool (NRP):** validators and stakers (distributed over 36 months per the below schedule)  
* **30% to Application Builder:** developer of the product  
  * This can be taken by the builder or otherwise directed at their discretion  
  * In instances where Zenrock Labs develops the product generating the fee, it is also counted as the application builder  
  * On zenBTC (though developed by Zenrock Labs) the application builder share is converted to yield on zenBTC  
* **5% to zenBTC:** direct allocation to yield on zenBTC

**The key insight:** it doesn't matter *what* gets built on zrChain. Custody products, privacy products, identity products, things we haven't thought of yet. They all feed the same tokenomics. **More products \= more fees \= more demand for $ROCK.**

As a permissionless chain there is no obligation or expectation that every application builder will follow Zenrock Labs and choose to funnel 100% of its offchain revenue to Zenrock’s tokenomics top of funnel. However, DAO / Foundation level support may be enhanced for those who decide to pursue this path.

# **The Role of Zenrock Labs**

Crypto loves the slogan **"all value accrues to the token."** In practice, that is usually fiction.

Real protocols need a real operating company to build product, ship integrations, support partners, run audits, handle compliance, grow awareness through BD and events, help third-party builders deploy, and maintain core infrastructure. That's Zenrock Labs. And all of this costs money.

**Zenrock Labs is the most important developer contributing to the Zenrock ecosystem and thus has a key place in zrChain tokenomics with a fixed 35% share of protocol fees. This fee share in turn will allow Zenrock Labs to direct all offchain revenue it earns to the tokenomics top of funnel, maximizing alignment while strengthening the transparency between Zenrock Labs and the protocol.**

Projects that underfund their Labs Co end up with stalled development, missed partnerships, and slow ecosystem growth. The token holder suffers. **A well-resourced Labs Co means more products, faster growth, stronger partnerships, and a more valuable network.**

**But here is the problem: very often Labs Co has no direct way to participate in the protocol's success: they are completely cut out of the tokenomic model.** So invariably they find other ways to make money. Offchain deals, backdoor arrangements, quiet revenue streams that never touch the token. **Labs Co says "all value accrues to the token" while quietly building a separate business on the side. This activity is pervasive.**

**Zenrock Labs does not operate that way.** We see transparency as a structural advantage. $ROCK tokenholders are not stakeholders in Zenrock Labs and we don’t suggest they are, but we understand that it is crucial for the protocol to align disparate economic incentives by design.  **So instead of backroom deals that benefit a Labs Co while the token flatlines, we built alignment into the protocol itself with a simple transparent revenue share that aligns and benefits all parties.**

To that end, **Zenrock Labs receives an enshrined 35% of all protocol fees.** This isn't a hidden offchain drain on the protocol. **It's a transparent investment in everything that makes the protocol worth owning.**

# **Offchain Revenues**

When projects pretend their Labs Co doesn't need durable economics, one of three things happens:

* **Opaque cash sweeps:** quiet arrangements where money flows back to Labs through hidden mechanisms  
* **Offchain deals that siphon value:** the classic "vampire economics" problem where usage and fees grow but the token does not benefit  
* **Constant token selling:** creating perpetual sell pressure of the magnitude that has destroyed countless promising projects

This is why you see protocols with explosive usage paired with tokens that go nowhere. **The onchain story says one thing. The offchain arrangements say another.**

Zenrock is structured differently. Zenrock Labs is compensated 35% of Zenrock protocol fees, and in exchange, **Zenrock** **Labs agrees to route all economic activity through the protocol.** 

**If Zenrock Labs signs an offchain agreement, all resulting revenue will be treated as protocol revenue and distributed through the same publicly visible tokenomic fee structure. Zenrock Labs will have no second business quietly capturing value outside the protocol. This way, even offchain deals are structurally designed to benefit $ROCK holders.**

As a $ROCK holder, you do not have to guess whether some unseen side deal is draining your upside. **You want Labs to pursue as many profitable offchain deals as possible, because all of that revenue will flow through the protocol as if it originated onchain.**

**To be clear:** this isn't charity. Zenrock Labs is a for-profit business and $ROCK holders are **not** stakeholders in that business. But we understand a few things that many projects seem to have forgotten:

***A thriving ecosystem benefits Labs far more than hoarding economics ever could.***

***A strong token is the most powerful tool in crypto: It attracts builders, users, partners, liquidity, attention. It creates a flywheel of decentralized support that no amount of centralized management or offchain deal-making can replicate.***

When the token succeeds alongside the project, that's where true network effects are built. That's the system we designed.

# **Staking $ROCK**

Staking rewards on $ROCK centers around the **Node Reward Pool (NRP)**: a dedicated onchain module pre-funded with 8% of total supply at genesis. The NRP receives 30% of all fees earned on zrChain. All staking rewards flow from the NRP to validators and their delegators.

Staked $ROCK earns rewards from two sources:

* Baseline Rewards  
* Protocol Rewards

The rewards a staker receives at any given point is the sum of the two.

**Baseline Rewards** are fixed block emissions paid to stakers, funded by the NRP's genesis allocation. The per-block reward follows this schedule:

| Effective Date | Block Reward | Annual Emission |
| :---- | :---- | :---- |
| 2026-01-01 | 2.25 ROCK | \~12.2M ROCK |
| 2027-01-01 | 1.0 ROCK | \~5.4M ROCK |
| 2028-01-01 | 0.5 ROCK | \~2.7M ROCK |
| 2029-01-01 | 0.25 ROCK | \~1.35M ROCK |
| 2030-01-01 | 0.1 ROCK | \~0.54M ROCK |
| 2031-01-01 | 0 ROCK | 0 |

Total baseline emissions over the 5-year schedule: \~22.2M ROCK.

**Protocol Rewards** are based on fees earned by the protocol (including offchain revenue routed through the tokenomics). The 30% share of all fees flows to the NRP and is distributed over time according to the following schedule:

* 1/3 paid linearly over 30 days following the fee event  
* 1/3 paid linearly over 5 months after that  
* 1/3 paid linearly over 30 months after that

**Implementation note:** To avoid unbounded state growth, fees are aggregated into monthly epochs (30-day periods). Each epoch accumulates all fees received during that period, then distributes them according to the schedule above. Distribution happens per-block for smooth rewards, but aggregation is monthly. This bounds onchain state to approximately 36 active epoch buckets regardless of transaction volume.

**Example:** Assume during month 1, 100 $ROCK is earned as fees. 30 $ROCK flows to the NRP per the tokenomics. When the epoch closes after 30 days:

- Over the next 30 days (month 2), 10 $ROCK is released at a constant rate (\~0.33 ROCK/day)  
- Over the following 5 months (months 3-7), 10 $ROCK is released (\~0.067 ROCK/day)  
- Over the following 30 months (months 8-37), the final 10 $ROCK is released (\~0.011 ROCK/day)

Total distribution period: 36 months from epoch close.

This schedule smooths rewards and creates predictable returns, **but more importantly, it creates a structural token sink.**

**Because rewards are distributed over 36 months rather than immediately, there is always a growing backlog of $ROCK committed to future payouts. As protocol activity increases, the pipeline of pending distributions grows. Tokens that would otherwise be liquid are locked in the distribution queue, temporarily removed from circulating supply.**

The more successful the protocol becomes, the larger this sink grows. It's not a temporary lockup or an artificial staking mechanism. It's a perpetual feature of how the protocol works, bringing stability and transparency to changes in circulating supply.

# **Token Allocation**

Fixed supply of 1 billion $ROCK:

•        **Team:** 20.24%

•        **Investors:** 21.50%

•        **Airdrop:** 13.20%

•        **Protocol Rewards:** 15.00%

•        **Ecosystem:** 17.00%

•        **Liquidity:** 7.00%

•        **Treasury:** 6.06%

Insiders (team \+ investors) are subject to a 12-month cliff followed by 24-month linear vesting. All vesting schedules began 11/11/24.

# **Build on zrChain**

**Anyone can build on Zenrock and earn a share of what they generate, subject to Zenrock tokenomics.**

### Integration Paths

**Create a New DCT**

For teams with existing assets seeking decentralized custody on Solana. Bring any token to Solana with institutional-grade security through dMPC custody. Requires asset specification, outpost infrastructure coordination, and protocol governance approval.

**Build on Existing DCTs**

For DeFi protocols, yield strategies, and structured products. Use zenBTC, zenZEC, or future DCTs as primitives for lending, structured products, vaults, and other DeFi applications.

**Build on Hush Protocol**

For privacy-focused applications and private payments. Leverage the shielded compute layer to build confidential DeFi: private lending, private trading, anonymous payments.

**Build Something New**

The dMPC infrastructure is general-purpose. Identity systems, key management, cross-chain messaging: the infrastructure is live and extensible.

### Revenue Share

**Builders have the ability to receive, or direct the distribution of 30% of all fees their products generate, distributed in $ROCK according to protocol tokenomics. In instances where multiple teams contribute to a product, revenue can be configured at the protocol level.**

### Builder Support

**Zenrock Foundation and Zenrock Labs support builders with marketing, compliance support, go-to-market strategy, and technical integration.** We want you to succeed because when you succeed, the whole ecosystem benefits.

Reach out to begin building.

# **zenTP**

Use zenTP: [https://app.zenrocklabs.io/zentp](https://app.zenrocklabs.io/zentp)

Zenrock Transfer Protocol (zenTP) enables native $ROCK transfers between zrChain (Cosmos) and Solana. Unlike traditional bridges that wrap tokens, zenTP represents $ROCK as a native SPL token on Solana, providing the same user experience as any native Solana asset.

200M $ROCK were transferred to Solana to seed liquidity as fully bridged, circulating tokens represented as a native SPL token. As users move tokens across the bridge, supply fluctuates on each side, but total supply remains unchanged.

zenTP is the first transfer protocol connecting Cosmos directly to Solana with native token representation (rather than wrapped tokens), leveraging zrChain's dMPC infrastructure for security.

# **What's Next**

zrChain is live. zenBTC is minting. Hush is shielding.

Custody and privacy are just the beginning. As Zenrock Labs and other teams ship more products, all of it feeds the same tokenomics.

**Near-term focus areas include:**

* **Expanded DCT ecosystem:** Additional assets beyond BTC and ZEC  
* **Hush applications:** DeFi primitives built on the shielded compute layer  
* **Developer tooling:** Infrastructure to accelerate third-party building  
* **Protocol upgrades:** Continued expansion of dMPC operator set and security guarantees

Expect continued shipping.

**More products. More fees. More value to $ROCK.**

**Get started:** [https://www.zenrocklabs.io/](https://www.zenrocklabs.io/)

\--------------------------------------

\[1\] This Litepaper reflects the plans and expectations of its authors as of the date listed on the first page. Plans and circumstances can change, so we cannot assure that it will be accurate as to future events, developments, or plans, and it should not be relied on with respect to any such events, developments, or plans.

[image1]: <data:image/png;base64,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xJzCY+aeeO2YyXPQxKTdS0mGWocUNsw44/yLb732+oeWX/6feSetgLsQ0ZM1roA+uc6Q3OgYOtOZNkNnqHSnTKGkWa4htWee8x9/zSJKOkqiHTshu372iRfcdOfjt69+9oobHvRWz6Mko0Hmne7pCpUPpG7sxKnVU85vOGp55RGXnnje/bfc//GrH+46e/Hd02een5k5VSQdTlFDofcACorG9IwBiapQoSvSGArg/4LST8w7unbm0lPPf9DfcHFB+b989RfUTl/acMRFEzKnUdQwkSyTkuapTY20fRolKViw8CYQwo0bNzIMA0JY3bRQZS3WuarG5hxfM+1fM+YsLi6fn118bIFvQWXD+d6qs4eNmwWdBrO7zw69IRXES1x4r/HAQMZsdZxeI6VCuwhxA033KgxidqYQlCOOhkb3SXgMmbvbxgHsvBNrCEK4H/DSY+52gqCCbH6l+IZbq0EF0XbSbA+X/wQOIsifludX15+1YXvbzvaueSdfNHxkydPPvtXZw1y2/IHkpAqJaHJ5xULQsJ0dTOO0y4ymqlGjg6+9+UFrF3iP3XvamUX/ukWiGOdKK/jfa683M92r//tK6tBypbq42HPyB1/+hKJs7npw+MisY084q7Wb2babaZh2plQ9DlwZHXh+thraxm4oGhZCk7tcbynJKZj79kebvv55dzPD/Lad+eDrPdff8Upx+Wl5nvmjM6cE60788IsNG/7qWL9h14+/Ne9oZ668de2ojCM0llKTMyhR50EJ/qqFTz337WffNj/61CcNM88dOm6KI63O5G4aNvboCy999KrrnhmXMVNtLIUm3pJULaMLJeoskXzcqHH1p555w9sfbPnsm85A7VngEsmMuTPnX7LqoZf/2MbA9eMwou27mAcefcs+JKBzB0EF5eYqvatJbQSPLddk8VfVLXrgsfd2NDNz51+qNoyadezZT699t5kNGkKLMruZl9/9ssAzS6qeYDD5bI6K4+ateO6lH66++YU8/8L0SUcPzZhbM/Oy1z/Y1dbNfPbFX48//vbxx19IUUmUaCRcLSXJAXfT4giireyoEWMmTb3lztfWPP/zpVc9k1V6qi29SQtudFqtt/L02+5+7alnvzj5tKtSh1ZQkgxK5aftUylJ/gknXdfZjT3C9o1b9kBPQqLPtw+Zmus7/cIVq7/6se2XP5jtrcyuDuatj/accf5947Lnmt0ghFgwYkgIdWyVCQ/bomgp0EK8CTtWAiKEWAvJB/wZh4+CFvKLjS/wUhA8k4qjZtDtx3+eQkEI9wMRQjwoKjeUaawoMIH/isQXRAVxsj2sgodaCKXaQqOl9I67XwDFevaVFydmBU9bdBU0wW1dTEX1QqV6slwxed7JV4IQrtu8u7ziXJWmJHNy41ffrutkOoBd7czlVz0gU02wuPPOv2wlNPdvfvzt+KwGpaYkJb3xxtsfgWL/+HP3vBPPKSqpfeGlj9t7mBtvW2Ny5hCnkLbXhIQQBYyAR1imMeQFqxe29CDZ2NLKXH3rY+AX0rZid3oNpZxIyYbWNs37c0trFxvU08kwv29lqmcsURhyrallRmeJ1V06/5SrflzHNHcwl6x8ICkdXK6hcn0eNOVKU1Bj9vsrTv7ld+b+Rz4eOrZJZShyptVoTEVDxzZMnXnO7Xc9v34D2hzn0692pQwrTx1Zc+wp1737xc5fNzNt7Lk6u5j2tp4udku5BWfdJDeXKiwVGketyozGYytrzrvgonu2N6Mv72xl5p265MSFF77/+S+/bNjRxo4S7+pu393VCU9p9nGnUZR1QkbDqadfu30n8+2PzdOOvIhS5qhsVRKDnxJPzC+b//P6zi4wRAuzft32c8+/3uosQoKtKVLRBVp9HnQ+SnwnPPjYh79vZi6/7hmT20+p88AlUpn9lHSiSDH2gqV3geDt3MOcs+SWYWPqKHG22gqSX3LcgqvbOpjm5mYQwp17ukv8x4NMGt11KouvrHLB59/tbu1hoMxHnvp6+pxLjQ4fpZis0BerjB7uuxo7QkjA4ygghyKeR8iFvPnYKQQt5BcbXxAhBBIpT6EghPuBCCFONEhSjvFfkbgjIuUsUsFDPDQq1RYMGVr15ddbWrvbn3vlfzfcev+OFgaEcNW9ryellYPPkTwkeMuq56Edf/ntzyZNPooSTfT5Z2/f2d2J2vrW3Z09d69+VmfJMthyps49HZr4jc09TbMXafQllCSzYfrpb7z3DcjG7l3Mmqdff/2tL1vama9+3O4LHi/XTzI6/Gj5PAoZJSsoyg1On1g57tLLV7OLLt6cs2CJezh4/DnmpKDFHZSpJ03IrL1v9TMd4Jx1IyVs72QWnHkj7fRqrUV6VwFtyZg7f+l7n/zZ1sN8+PlfmblTxcoxqSPrXENqwZ2Cs2gtPrV+/JpnPgZfduW1T+vMhRpzwbBxjXOOX/bHJrSBHLjCzW3M599szS2aWVl/xiVXPF4/c4mn8qRZR5+95ulX4Iw9KNIEqdozL/+gsBZpXZXOkUdobGXe8lOef/EH+O+drOYhV/iexxYuWnHs/CXTZi28+4FnWrpCx0FpmmYep7cOXX7l3Z2sl3nRJTfrLDloaDdtmjltBhoSV004Yf4Fra3odHDS7TuYo49dCg9fb69Q6fIoyYj8otmvvflbexfz8OMfj500nRKPU7LzZPAYwTOmqPS5xy9paUMX8+P6HSeetlJE50oNHp3NP++Uq1o7mD17djFMN3woDcwHIbSkTIHCjY7s/zz4yq9/Mhdccm/a6CqJZpJCnwOP3ZXeYEtB270SiAoOrhByIYqIg2VE4XnBCCHk/knCJqzgFxVfhPbHSbg8hYIQ7gfsC+KpQaKCLPE96U2jnan92BfsA+8JHERACOcet3zT5q5Opq0TmseuHtC8J//35ZjMGdDgipSZ02Zd/Pl3zTvbmQuX3+hwl6i1mWeetRLa7t/+6PjfCx9As/7xNz9m5DUpjZmZBXNee/9P0MLVa96YmHsURY1zp5VPOeJfn33+Z083UixodkEntjUz809dIaXHmZxl7CqFGiyEyFiOgN5RmpTuf+GVH5996RtP8BiJdjxFjdQYA47kqWJ5TsrQyktW3LlpK8gckoeeTuapJ982OzxyY4lraJXKMqmseu5n32+BW9jdxpx93g1a40SFNjN5WINMUyjXlVpS6l1Da9xDCq//9yNQxJ/bGH/VQko+xj3EW9lw0jc/7oDL27WHaelg/tzaXdN0YspwL7iYWksZJZ1MidKOnHXKn+s3Md1MS3Nnayfzw/ou18gqY1q1IbVCps8cObF81T2PtXf3tPa0bGvehlZY/vvRzMypalW2RDSpIG/+u+9s37OHaW1nXnvzm/yi2oYpx776xpdwxu5uZs7c0zSGSSkjpirN1ZQGpc9UGrKHjcz7+JMvkFw1t8AD/L/nvho+bpZYWSBTZoydUP/wI++B5/rzeqbQM5eSjHamVRmdVSiOVJ6r1Oer9RMXnXtVRxezZdtusNE9Dz9nGxqgNNlqc9G8U1fCGXft3NrZ0bZlS7M3uAD+iy11usFdOXJC9ZXXP3jE0YudqaWUdITZWeweWgX9FVBoGV3U510Nq+AgCiG/vuMj+9qPN0IIiRbyWwl+ybEMFkKyV07C5CkUhHA/4NlBEEJwB7W2SoOrFqef5r++/Fc8lsHuIJ7wR8FvbDj4oY4aldJ5y1c+AsLWzrS3MK17upnLr1k9avwUSjIRVNDgKLry5ifBOfvjr66yqtlSxZjkNO/Dj62FVv6xJz849Ywr8Hr56XMWKQwZSn3xmefdh6bBGObE01eYnYU6U6mazsvJnXbeedevfenLn39t3t6MvK7rb3lCbZhkdvnBSzM6QlEYYCmt3a91eLKLj71p1aujM6dQijFJw+tc6VMcydO0+nKtrqS2YdHnX20AH6kdfLJ2Zt0veyZl1NMWD5uhqdialH/VjauR19WNVN0bmGuw5JodPltyNW31m9017Cr74uQhBWtf/qQFlL+HufK6x63uYplqnN6SedU19+3YxUDhwEef/jIhq0pryjI5A7SlatSEY2l9dlpa3qMPPd0JXhjr9n3/a1v6+Fq5uVhl81jTPAr9sCOOnr/hr41dTFt7Dwgls/D0FVL5xKSkhtS0I0TigvRhM4494YbTz7wtv+hIpztzzf+9hYZY9zB//LF95lGngudqSao2JjXJTEFKm6/QZ0mVQ5ZcdBVa+s4wbW2oD3HBRQ9JlbkaevKJC1aAKwlHHn3i/eQhfqU2X6ouoWSFEtqnMfs1phKNcfLFl90G1/Dbpk27u5inX/lo1ORGSj5OrJ103IJL4QZ37tra08Ns2Nha03A2Jc+R64otyRWjJ9YfddxFSt0ElTHbmuwzu31KY5HRGXQOawoliQwnj4yFkFE8O0hqPa7sAMiAzIj2/Yl41YkQhmYQ2UlE+JXfSvBbklgGL6/EOWrwZ3Z7hAPccCB2EIQwRERWEfIZRALcJnCe8OsbA69snyVW+4W8rxHwn8DBJbJHzD5eEMInnv4UmtQ1z7zsq5g6ZIRfqcmTKTxKjU9rzD3z/OvBwwO1O+/iG4zWTJvV6/OfBL/+1dxx5nlX2ZIyn3v9YzyGaXbmq+jizJzjHnr8bTS3t6d9/sILXcnlUnmu1e7RG/OSUoIjRtfc88DadnSuj9OGBU2WgMVeZ3bWGuzVbNrkCq2zXOMIDBl7lC2tUW726JMq9EmVGmuF1dWo1ZWOHtXw7LOfg28E7fieNmZPJ3Pk8Usp1XiN3Zs0vIGixuTnz25uYdrbmO4u5ocftyWnlYKzCN6MxoZWEKpNXrGqVKMvWXzR7ZvZfFItPcz7n2402fJ1+uLkpPIVK/7ThTSuu5PpWffHzpHjKtFCDjauFfpbJpfXYM1ceeWt3T1obhKu4cd1zdmFszVGryWp1ugqU5ky6o9csHlPC7u6squjm5l38kVKOtfiqtHZkHioLD7QY9ocoMTjF5559fYdaG8X4Odft48aFzCCYKc1ggTKHR64KbklX6ErqKpb9PV3f2Ftbm7rfvON9TQ92eUs/O777e3sHOpNdzxOiUZq9DVKulGqrRap2d3atIUqQ8FZi29uYW0HFrzipifsQ/xoqJOeuOC0FSCQ23fvgjLX/95Z4lmg0RWK5aM9gRNqG88xWEvNSQGVtdSYVEk70MbohqQapdVnSK5i80diOGmTybB2zAANgtoSICMrONNIlPW4YnYDUryUgizbT4BoUu49cmdM+U8gNhGEMAQxXsRncJLkBi+86zS79pz/Bgw4kVIXHTKUgasc3ilDZQ3yn8BBhz80JNPlvvbOL+A/XbLidqszizbkS2Q5atqXPKRu2ZUPtrIt6d0PPuUJHElRQ8aPm3r7nS/Dkbc//c4TPEaqGXXm+deCE/nHtu4ll62ipGNU2uyGaWeuff1z+M6fO9qvvuHJ8RkzDJZ8tS5LrsqRqyfCWUCBPvzs9yHDykwWv9lWa7FXGRxBtA4dDbiVgxZqwUd01emTGlT2CpW93JRcbXZV6M35t9/+bPMelDMBJXtimKtvfdySHtC6y1U2nyu9QaPLb2w8G7xaNKnWzbz/4Q864ySdtVTvQgvsTCkVQyfOrGy85PwLH/1jI/KlWnvQrYFXN3JsI02XGXSeFSvuA/XqYYOAfkFCWGWyVumtU7S2Ro29Gu23Ys1eftWqzrAQ/rxuT07BbNroBZ02OSqUppy6Ixdu2tPBnr+HFcKlcjrX6K4DdYfrVNrKUDpiS5Xe7LvmhifaOthonx7mh5+3w7k0Jo85uYGi82R2cFYmSkyFlDR3bObcV976pROdDm0N+stPzSPSAyWFs7ajnX26d3W2LL38Vko2RmNooOR1IlWQUnkodbFEV0TJs7JLjr7nv8++/80vdzz4WtNRF2vMeQr9ZBU96YSTl4I3vGn7driRllamuGieQj6hvvGkW+74v+zcObTRA246q391gNwElx00ptap2VsAuEJosDXgFJK8GjGYQJvQuwZXUxRaZb9vIUS1wFim5uzEHRpp5JUcX3DnSrkeRbwgCOFe4NoSXnFwB7VsL5sI4aAOgUZKXXS4QggqqApnGeTf9aGA2yVE+2sYcnewG4eeuehakXSkQpMxfHTNvFOW3f/o2t3daO3g/73waXHZbIl8uEI9+qg55+xuQ/GQS5bdY7T6ZKq8sROnvvTGD6Ao73z6jSc4SyQfKlWMOfaEZa+/gxZONHcyr73z1aLzr2o64vQRYyut7uyzL1i2tbn1z21tuUVNRkuxyVZuQSoY0NvZdBNoB7VytbUMfBFTSgPa/9PuV5kKHSklR8w+o7kNCUd7RxcI4RvvfTcyo4ZSjLMPb4LGy+SqtrsrFp5xQzv7HeCVNz4sqzyuvG5R9YylVTOWTj32sgX/unXF9c88/uwPjzz+xb0Pvnnjqv/etfr5f696MW1Yo9laZ7IEl694oB25m50drBCOGF9lsFXRSAinaGw1aFc2a+7lV97VRwgLjwwLYZXKmFc/6/TNu7qREIKcghCedKlSm2921WntAVbjAwZ3pcZUDp2Mp/73EQqCYa/1x5+3TshokCkLjY565KObvJQuH+0dKisEyXz48TfZ6JtmcFVb9jD52dOPO+6irm4khDu7Ws668AqReixtqabkaM9xmblApM/ROnwo0ko0zj3Cl1s2e1L+XFtqFaXIoK0FGn3mCSdf2tbNbN3V3NXD7NzJZExqSkoueuX1L/7axSw84zpKPNaWjIYcZXqfMbnRlDxFYaowJDWwu1TjqUEshOi1N9hrcQpJXo0YZKBxgCZCpvdgLcRyyK8LGEpTjPcPQl5g2ClMACEkrYoghAkCMmR4mBReWfAFiQpypwf4r8JAESl10eG6g3iTQLwGln/jBxd8CjJAKmaXUoEfs6ON2dXaff/qtRctvf2Oe55984MfdrQjbwm46/6XR49vosSjlJpxdU0nv/nO16Bt7338V6HnJK3Bk5TWoDVkg2pu2N4GX77zgae8wdky5Vi5cmJ906L7HnwV2tZ2tpwNW7s//Pyvl9/8/uuf18GR37fszi5sNJiLQAjR7mL2sHPvRksJLcloz094sKakWviVUows8E17+6MvukAJ2neBdvz62+amIxaKNePswxq0rmrbkBkS2mN2lV982b1tXUxbNwhl57uffpGR3zAyY9qoyXNTx01PHd8wNLPRNjRgHxKwuYLOlPLUUYGUMf6Rk2ao9F570nSDuXzZ5UgIO5nONqbr5w1YCCtoWyMrhHUoridSCHflFszUGbx2LISGgvqZZ21mZxmREHZhISw0uxqwEBqSK41JlXJd6ZARdW++9xN8ra19D4PGJ3eX+o4RSXO1phpKU0bRXrSPmrYEfEeRLPOWVU92oi7F9m5wCrvAgTtq8eJbOtGcLnRTui+6/BaRdozK6JPoyyhNJqWbSClGgRaCJ0cpSsR0odJQIlIViNWFYlW2wVGq1E0Ce0GBO5rbO7uZdetbjj/+4quvfqCZ3Vrv/Q9/m5w7S6MvMrtr1MYA+HyOIUdo7fVqKxiigX1pw0smWAOF8kdGVoeYAM+4gyOI1yBFE0J2pQE3PRPWQn6Z8QVuW9ANsovryWhQvCAIYQj+OJ6EzdVCVBBPlfPfgAEnUuqiw1VBnFQT3eOh3wliH0KYvW7zdmj90SI5NJ/UCk0iOIKvv/fdsSdcM2rUHI26jKImeLxz33n/B9SAtjDTjliqoUuUmhxHUiklSzU5x11xHVo8197DgI5m582QyscZ9LkjR9aedPIVjz353o+/7QanE7wQENGdHczuLpSzd1J2k8HkM1lrjPZqtJrQVov2HXXWo32onUEjm7DemlynMhUnjyi79pZ7wQFq6drR2dPc3t1z6fKb5Rpwgzzp446W6MrNKdMpRQFtKVmy7C4kD90tnUzHb1u2WtzZYk0WGz1RJtLlaV2lCksu+JdyNtOQ1lEi0mUoTKVaW7Uz9UiQw0svf6AVCUw3eJU/b9g9bHwV+KnsBOEULbiMjgqDJf/yK+7uI4SFR+gMHrurnhXCosYjzt68s1cIT1xwWUgIbSi3IloliYSwOG149evvfouEsBN0vfOvbR1HHn2BTJGn1FaKNSBgPrmxUqTx2JOmUKIxl19zFzz2lq5tXVBkN1NaMnvZsrv2tIZ6GLff939S/URKloPyM9gKVa48uS1XbCyg1F5KVSU31FLKMkrlk+n9MrpIay6WqMZjIdyyY09bB/PHny0PPfwSuIYtHWg9zLZdPY8/9YHRWqgzeR3uOnCI1cYKk3uqwdmENgAK740eSWR1GGRInxh6zOAU7ncZEgghcsShLrApKUg/lV9yfIGjZkgnm7Sl/CcQmwhCGIL0X4gKQgeH7AQRS5FdkVIXHayCcCN9UksfeiHERA6NGrN/37qng+la/+fmta++cc/Dq29addf80843WDPF4hyKytZqfUfNWfH82s/B2fr1961nnHUZrc9JG1o3ekJNoXdGTnG9Oz1z9ATvZVfcuasNtc5rnn2/afoZCsVokWikUjlh6IigNzBn3inLL1728GUrH3vj/R+h+f7y+x1jM6aAE2aw1hodNVgIUeSFqw6eJ23xmZxBs61SRRfTprzTzrnmr93tnSiGpRWcwpde+cDuyFKos11pU5XGKtrRoDBVgO9oSwnMO3UFG8XaDlreyjAF3tlqY6E5ucGWNk1p9oIImZKr7KkNqcOPNrmbbEPrTamVppQ62snOddnKL1l5XwsahAwJ4QgkhAEaBcs07kMId+QWTtcZi+yu2pAQzjhnyw70VxDCrrAQWpwNKFjGWa62+gzuCtpc5koN/PfpN9ipRFDejpZ2ZsnS23XGEpnaJ9fVUBKPwlgjUnuhi0BJRi9eei3cewezC9zc3XuYgvwjzj33hmZ2gSDc44tvfjNkdC1FTZYbApRqEqUYI9JnSs3gBgXFmjqZrpFSVIAQonROmlKFroiSjZ1/KgqW2bgVrRX5c1PzeYuv+OKr9V0o1LYH9YTamGOOv1RnylPTBc7kWrW+3OxqtLqnwaMObQnrIJmTw0RWh0GGdJThQ+8+hVGEkO1ni8ObrhEt5JccZ4Q3muFWeUEI4xjua0peUK4QDrYoRkpddIgviCO8B/LV5DvZMl02iFNrN/PAw6+PHFOtUE3UGws02gKKytDry4akNy1efOcnn21gxwyZt9758pLLbr139Stvf7Du069//3H9tl837Hr34x/v+M+aZ1989+sf1qHZrB7m0y9/WbzkhorKEyzWLJlyrMGUZzCXKFWlWl3pVdev2d3OvPj6+qGjGoyWSqOt1uisMDj9tCOgc/lpt492loEmgbToDF6tvqCm8Yx3PvwVTTeyLstb733VNOU0ihruSm6wuqaK1AFryjTo7/trz80sONpXedyWPZ3soG4P/JfFF9+FJjLVXlvyVNpSBZ6Z3lpPmxsVdLVMF1BYPBqnR5/Edpz1Ab3Nd+nKu1vRuggQQubnP5rR0Ki9jN0Erl5nrbE4KozmvkK4fmtu4VSdscDuroa/agwFTRFCeNKlKm2+BdTdFgDBUFm8oMRm6AYZ81de8x9wwnpQCAwKrll195NOt0+uKkGjo1SJwlAtVnnASVVqMxadd1m4E8B8/e32oem+qVMXdnax7nsXs+7P7qOPv0JJ+6VqP20tF9MFlCqHUhdINJVSba1IVQUfKE0pyiZoDGiMXpF8womnXgH/d9P27VDgHxu3Z0zyNDYcu3FzSxc7JACn+eCj9eVV8xXq8XZXmSOpBvxCo6Nea8ZCSJzC2BVCjbUcj7TT7MLc3plCXnUglQJ/wF3tuEvPtE/Cu49yZwoHsrX5hwhC2Afi1+MQZ7SlHmtmrvLhYdLI92DgiJS66GB3EC/04c598u/94EJGREW4VoTWUeVdecPjoHOrH35fb8yTyiZr6WKxJCM5teLEk6958dXvUNJBhulgFa4TR2z2MHvYrVVAPne1ol9RKD+rlC2d6DhqTzuZL7/ZeMVVD5SUzk5KK9abcwxmz4jR05954RvwY2675yWNuQClgXXUmVwhIQS0zjKt3W+yVjnddUpNzvBRlQ888jIqtgMtDYRTn3L61RQ1yp1c53A3KbR+a1KT3l4hUWedcd6dtVPOGT6u4vv129vYdRFwGV99tyenYK6GLgbVBO/TDKJrajJap+ksDc6h043JAY2zJGlU08jMubaUWrUpd9nKVegekfvF/PJ7K4oatXsNtgo9eKtWkLogTwi35BQ10eZcu7sC/soK4dkhIWSjRk88aalKi5dPICGEW7Ok1lrc9ZR44oKFy/7agfLjdiLFZB57cm1quleuzjXYaylRgVxfIVKWKuhiky3/jHMuRc+zp3VXa+dzz3+lUIzNnFjX04UuoI21xb/vWJs6dIpU5ZFrS1CmCH2xSJWnMgSVugpKViQ3lCmtXnB/7SlNcCUSRdYJJ10OD+fPrVs6erq37WwpLKhRq9Nvu/0JOMue9q5O1ny3rXpi+EiPRjfR4fbrzdA1qUI5pPrsAYS1MBaHRrEQks/73bye9Ee5TmFiCGGfpkYQwjiCWAsbDK97hTc15Auypo209+ATKXUYvMxfa6tkNwSv1jtr4Aj8JGoUcdf8pzEAiOnC4068rq2b+fbnltqp833BWXOOP+u2u//73a8b2TaxrQ1t0gJeHJpEhGYX3KD/vfjpLXc8u2TpXeddcMeFS++9+ro1Tzz12Rff7Nq5m92frAO1pLtaO5B8sur48TdfP/LU/y2+5Iall9++o5PZ2cWcvGi5ypRhtAdR2CF+hqEkvU0GW4PJXu901+gtWcuvvKuNLWHbrk4o+bob/29Iep2G9jjcDVqT35FSZ04KUMrx9dPO/vK71kDlKZR02NU3PozDfJBOdzGrH3wjK3sqRQ0xWQqGj5rick/VGaqhWU8fO52SjszyHnPG4rtHTppJSScY7bmXLr+ZVaaetk5m3W9tBcVzpIpJRmvA7Kozu8EjDBjMOSuvvAeuBA0kMsyPv22ZXFCr1E2yp1QYLF6VLqtuyhk7W9EYY1cPWnZ/8unLxLIJFlcVbS0zJJUb3BUKk8fsagTPDFT20TWvwa1t3rYTzvjT+g2zjl5EUWkybR5tQZt3gwsrpwvVuoyb73h4a3MbmhHsYabOOFevy0t1e/5z19oedjc4lBKyh7n9zlflqkylJkuumazS5dCWEj1K6lssVk2mFGPH5R+5eOXjw8fNpcQ5BkvZ3BMuBVdy6+6d7T0dW7btLi6eplKOGTm86ok178P1/LVrBzw3kNgrr7lbbx4nV49PTkcJe1kz4Rc7/NrHngRitLYgWWGMnUIUMqMqwMsJuIjYFgb9DLc5pMONmhq2HC46dhU//4yxCYlFUFrKyVY7ES1PLHNYCyGGK4e4m4YDurBd+SYfbCIlEMNuHoaXilfhI/ABRDHWhHB81tytu5B4/NWMRhRbulErzzp24PiBcu3uZDq27+lY/fBzJy+8KFA1J3VoicGcJZGNpUQjUUCpelJyWtnknJnHH7/837c8/fV3f7WxA3dYw7buAintaEehmKFU9eu37q4/8mQxPdbgCKKYQ9yeIiFs0tmmGmxNeks1JRk/d94Fn3z9I7uYAWnwu+//NnHSUSq1hzYEnalT7ClVKmOOyjQxs2jah59v/uizbRnZs8TyseXVC9a+hvIAb9nVBQqxYxfzxJpXZx55Ump6tlQ5XCrLsNiCIFqUbPTU2ec/8sxnx5xylcacZ3V53GnFFy+7rh2tI0TS8tVXW8dPmgJCOGR4k8ro0VrKdOZiozXv6mvvb2O9Mbikn//cUVI+U23OSh5e40gO6sz5U2f+awsbLIPdtdPOugLEyZXWYHKXKy1FxuSg2hIwO6eojUGjvfC0s69et6Ede2CgPTff8ejQMeVy3WStxSdWFVOSXFdKrUgx+ta714AtdrQydz3wnCvFL5FmKmWZZy68/rf1KIB2dysaWd3Tyrz21s/ewLFWVx4lTpdpxkqVYynJ0CEj/FPnnPfOVztmLbiCtpZbkxpUdNHcecuhwK0tzdg6Hs9RWk22TJI1Zdridz/5Dv60pwN1Yr767o/jTrxAb8lU67MdqdUmF9bCOIArhDpOyAy30vUKYbjekTpI0jNxA9GJEA7qFMzfgxuUF4/56wUhDEFUkAxWxOrYfaQE8hURABVUW4IKIwpojh1ACPX2kif/9+W2VrRqEHyFb3/Z/vjTbz/0xPO/bfoTxWp29rz25lennXlzalodRU2SylCqWPBUnMmelPSAK7XYYJ0sU45GGR4Uk5NSgnOOueTeB1/a9BdSr9ZO5tkX3lh53b9vvuPBdz/a8vEXux9/9oMrbnhwVEadypwbcjJcfp3LFxpngx63I6g2lo4YV7f2jY/b0dxYc1t3y8a/mo+bf4lSk2e0VNuTpigNpRJ6ksE1uW7WSWvf/AL81HtXv+FMLjNZPVpTzpRZ/1q3EW0cs7MZb1jdvWHjb8+9uHb5ldcvPPPKcy5YtfLqJ59+4ZsdHcxjz34ybHydjM6wukuV2tE33Hz/jt0dPayb9cP37aXe+Wo6x+zyp46cZk2uVhkKHEml/779aegdoEUa4BH+vtNbOQc01ZZaAV+TqSdNOeLs9RvbkLb1gEQxp//rGrEigzaXWVOCxuSAIRma1wqDc6rOUifV5I4cX3/tTWt2taKn1I72NP+isnEeJUqjJGivNeeQJooaN2Jcw1c/gEfOPPTE61mFMyjxOIutUkRNTk+tuuba+3a3oLlCvJ0bPIRNW9ufffHD6//98FU3rr7q+gevvfnR5176Ystu5slXvnaMrKCUuVpLgBJNOHvxHe1oBcvOHW2d6zfuKS6ZrVIXqJS+lLTGfy25tjUszPDzrfd/qm44lZKOkmlz3EMbwTT7eOf5NWIwiRBCksVe1Hd4cK+dUYAblIeDD3A5XF2MC0IhP+woGnYK0Q0OVFDeP0cQwhAUG9Mc6p1x9iTjm3ywiVQ+DHYEsQrCB1BBuaEMbZTKu9NBBIRQrMlKGVnhrT6+bvrJgdrjbUlZxb4j7r7/f51oIy7mhpsezcqdBY2yTFbodFYPG9l0zLxlFy6767a7n7/3odfvvG/tFdetnnfSpWXBY9OGomwVFJU+OWfGNdc9vGETcize+fDzhunHm2wThwyrnzR5LgoWdebJ9TnGJNYLdNQiCQQhBDkMzTmV07bi6257dldouhFUqfu2Ox8WydItjqBUXSJRl2gspVmlsy+64q73vvgFjYL2MMtWrJarspzJNXqbR2HKXPivq7/4fjN2tjq60B4yaP9Ppnt3OxpgbGODNe/779tDx1eACtLWIpk6c/SEOrSZGZtusKsbBZ6ef+H9w0Y3UuLRSgs0H9lSTXZu8TFrX/0JzYmy05CgGecsXWV0l4rU2RJ1TtKwysuvfRSFrXayM5oMc8c9Lw0bNQ0lMHL5TWlBrbNM56oCr9fknq6zBcTqjIzcIy+/+pHte0JrIZ5c+0lp1TyxdhJKHyjOsCVXX3r5kzuamf889HpO8SyJZqJUk6/RBWxW6JGMmzipZtU9D2/4ayO7W3rn5t27mttDrvyOFjSW3c4OU//8BzM2p4lSjxer85GyTpj2v5d+amPndNGXexjoGRjNfrm8nBLnDxsb/PrXTXB8F1sUXNLa139pnLnEYPdKtQV9ZwTxSx6Lq+m53hvWMJzFXoTVbm95CnFdIBqJl2nhEsgaLVJsvICaSk6ewtCawvhJz3TYCSEZnSDgdxQF95sD2Jy4XxOnQgg/NdYK8AVDyYR5T2BQKZYZiilVFkWNlGozlLpJWvPEa//9MFpR18NceMndJrNXqSyhae+ocU1nnnflU2tfbw3nmMVbWQI72nu+++2Py665eepRC+wuaHCH2ZxFZ5x9zbe//gbt6Yuvf1pZczLauU3jdSQHJZpM8C2sqVNBEmj7VNRvDW3ZhRvWymnHrNjSgsrfuLMDRKulnbn2+tUjxlaOmzx7+PijfLWLz7n0v8+8+iu4dG1sk71jD3P62TeLVdl6e0XyqGkifZbGllk59aSnnv/wp1/RRmJdKNinE7fse7qY79f1XHblo2mjyyXa8c70antKzehJc8654N71G5i/tjG//dG17g/kzz365PdzT7x26MRpWofPPrS2wHvqRcseW7eBaeliNmxlftvcvf4v5okXvp9+9BWOoY0pI6Yes+C6ta//vOEvZvNfzMbNKMDng892zz/17lETjzMmBxXWIrXdi/YqszTq7dNc6VPAKaTk44eNqVtwypV33P3CL390N0O/4Yut5yxbXVy5CO50zvE33XDbW8tWPjFkZCX0MECNdLYgReVYbI1SRQElGpYyPG/hORe+8dHHOztRpCu+weZuZkcb+rBxOwMeJ/Q8KOlYiT6ftpalj52+4tqnf93A/L6J2bKD+frHPTtbmbc+2Fpeu9hgmSLTBLS2/Jfe/XHTDvRUN25jfvmdWfcn88o72xacvgpucG9rB7HV+DViMOFO6WEthM/gF4p4HmGEFnL/Co0P+e9cIYwjLcT+A2k8Q3kKBY8wZokQQvKCguXw1CDu1GBPnyyfiCUiJTBCDkEFlaaAVOcVa0tjTwjhhcuypTVakmpBDuW6zMWX3AVtKAjhuRfcNnpsk0SSrdEUz5q9/L9Pf4RlrxlNj7WsfeuTB554/qnnP/j6p+0t7L6dwNe//H7FtQ+MHFNNUcNV2vHnXnjVx1/9xK7NeHvUmFkma4U7rcqeVml0Vki0ZbR9WkgIURIDVgXZlWpNcy+7dtWLF1x273kX3bZs+d0XL71z4ZnXVtae7qk4rfGolaee/+Cl1724/IbnFi974Kzzb/rX+Teec8FtE7NnmlwVqOfrCBrTqhXWPIlhksVVVFO/cOWV965++IXHnnzxgf++cP0d/7dk+QOZBXPUphzAmV6pMvqMjhpf5ZKj590w/cjFM2afM/vYi6bNvODEU2+ZNmelp+bMoRnTZeYC65DqCTnH10xZMv+UG5pmnFM/9YxpR507/egLjz/jpsqpl4zMOHZc1nH1Ryw96YxroIQZR55b23DazNkXn3TabbVNK0dMOsE1coo+2f//7X0LkGRXed7t7umZft3br+me52qllVRYgLTah7Q77/drd2d2V6yeCCQgGAUcCIZyrIBVwcGhTEFImXIoFAcoF6lU7DxIKuRJErvYqDCuyHlYMYYCCbDskOA4RAShELz5z/nu/fv0Pf2a8cz0PXdO1Vdbd3pmb997/vP/3/+fc/7/z44uVG6+TESYqVwevumqV191Bk+lMqcd547h0fmVrT//5F/91Cc/+xsf/sQ/f+K9n7r22EfXLz01tfCuIsWjidcMulPFkTUnN5cb3nJSc/nKZrpw3kmcKIzcOb324Luf/OtP/+q//MIXv/5vvvj1f3v9q//0Xz/7N/7m33/w0Sdvvk3UpiH6pLmXry6dnnnzw2/+wNVHnlxa/4tbl/7S9tX3br/uPe9478fPzL61UNkpjV1LuPdce+znNnaeuHDl7Zvb71i98FOXH3zqJ9/19MNv+tipqSdMIUJA39XDYRkx4TUibOiCQpOhJVbjiJCXRmE8+fioKTiKRMhcyLOTZi32BVmWDWgi7zfC5AcgFizUt5gFCRQUqu+rvrU+MoeCJWeIIsKFXG2FApRXnbr0pf/44g//9MYXfvMbx2/ZSA7cWRo+99Ab/vKXfudbIvL74Y1Pffb6ztUPnpt5x8SJBa9+58ixhTPnH3/w9R9+98/8yovfFb0Mv/0/fvj0Z/7F+tZPO4m7brn94nue/PgrImvtxp974qNedc6t3jN222p5XKw7uaNXBGT5ysC2Cqsq2tDnTjqpu/LF+WxuOpW4uzI8V6xOJXKnMsPz6bLYwhHnAJ276PFqI3ND7kknc+fIiSvFYzuOO1M8sT16xzWRIFhZH8ot0B2K5elKfaY8MpMpzzpD93i1pXxldvSWC/Vbdgbc1cHiBbd+NV1YTLunnfTt5ZEpZ/A1ydz5lDeTH5tPVu51x1erN10cnrxYGdsolGcc59Zs8VS2csZJ3zFUnaNAP1vddGvr2cpcVhR5ubVSO5/JnXISry3V16tjrxsqbRUnN9PDM4WJZXdiszB6X7Z6JTMs0gozpfmB3PT4xOvc4rKTfLWTOpGpnipOzhdGVofKy97wppM+5zh3e7UVt0asSdencvULJK+hymZ5Yqc4vulk7nWc1zgDZ4fHLxDq4xuTJ9aP377mDVOIf7uTOFUobw25F53ssjN4T3FsLlu9y3GOD2TOF4qrhdIcvUsy/xMD3qlEbik3fDldoflwhlyExNAdWe+sSxw8eNZJnhkqLmarqwELIn1QXJfEnq6uDn0GDnbqpNWuTyEzX+hHemU1E8M48GEZXCCn0CAutEQoWJDAIWCYCzWR9xthClSJEFuDiAUFEcqKR5EiwqHKBSez4GTvzdfOP/GeX/z+j0Vsd/XBdzlJsun3Xnvo3V/9pjiv8aXf+ebDb3xqdHIrm19PZxYy3mmvdpqIIZ2ZybubY5NXlzfe9q9+83cRGv61D/+DSm3eSd3x+sefev4Pf0CffPLT/646Ol8enypPzqbL58iMumPbAk1EKA7lj9y2M3LblcrY9vjxB2r1y8O1i6XKysTxS/Xjm6KbUn3dG9+pTF4dOXZ18qbLldryyPF1+lW2tpYsLRWOXcxPXkgNL+fqm6X6fbWxByaOPVAb3S4Nr9YmLo7dfK00vl07dml48gJZ88HS0vDxB0dueZS4kG5406vuyw2fv+WOK6Wx1dLEVpnI79ZLmZF5PF5uWFQGr01eqI6v337nteLI/PCx9fLkFjFTeeJK9dgVt7ZSGV84fvtWZWTpphNXi/XV2rGdysQ1Iq3aict54v5j60O1ZW/ivuLE/TTyTv78YHlhoDCXSM0PZZfp70tji+nKPUnvbMqbpaky5Injo4PegpOZcgbuoRckp57ocLC64WTnnBzNmWUnu5itbLn1y8nMciq7kimuDOTpj+9K5U+XR1fdypYzsOhkNsrj9zu58+To5GpnSMpEsenccjIzPTyxkSyczI1Mi9qkznlv8qKTP5f2pjLFqaHSTNqdpYiZRqwyKUrfQToqIkuEvByq0li7PoVqgMgf0nWmssJljU0EWFAFqllpFiCiOHJEOOAtIOMVDWnpR3LEDMrX4TRBL0iQoH/pR8w8NZs1eOUlJzJARJitioBmwL1r6+oT/+kr/41469nnnp+Z317deOiLz/z+K3964/qXvr1x4S+43mwmfz4x+Nrq5Nytr714eubRk2ffODJx0StveuX1ZPruk2ce+MTf+mdIsX/LE+9/5PF3Pvvci//nxo3/8vwr9z/284Ols259rnxMZJfLoYPH0DyeyuIbajrD2ooji41FOfEf+fPSqM+j3C02aBgreiMod9C+xb9VkCcuwx2+m7ihUmAakF8nvtH/M/Gr4C0EMYjPRaaB3zD2EshenJEJkB+5OFTdSIq6erMEuU6wJDGXdGcSnoQrqyTLJQRA15qEkB3+FQhuIpqUiQNQLho7i5snCsvyb/D5tID/pfjjafmNfENRhIWYmFRS9IjOiSxe8irKxy6LAdHOoRgUMBWVPoXozUTX4sfwwPpIBolbXnDkBNSi39ks4NUQbPTP/+6OI0eEUDnuljJUXiYvjFf2TUAjCmQiFLFgUFM7NNt0NuovknlRlDkpIobXjN0895a3/9z1L3/lFWKv33vhmS8/98r/u/G1F77/hjc9lcnf5SReXR2ZXdp6/EMf+9Vnnn3xW9+58ZVv3Pj1z/3Xx9/ykWp94fiJi/ni2anZ1//6556h//7CH33vq9968Qc3bvyH3//eYz/1kcpxitJELp2ssbImHR0VciQb/GQylFY+oVUN+peTuvSFgYjAkWlL/hPm50RsNLwuyMAklWyBYtCnEAana5/CJKrSB+2ZmAv1O5uF6FMgcOSIUO2fSSyIjru6/CILxIIhLszXRLlbUiSuZ4GXFcZFo6K+YjntbaUKG87gXCo7k86dzZfPPPjok9e//ALyBAj/6PP//tafmHGStckT5x976/u+8eLL6Gr70o9E3iFd/NF3b/ydX/uN2+9YdZyx0fEzH//lX/tfL/npaL/3wnfe+PYP5kenHffu8rGVwuhykcKs0XUySXElQp0CmQi59mPEzZBKhImgRZF6hNJEYL1UrT4Km6O/vjoIXOI4NkRI1B5apormbDxyRIhYECwo7aOQllFc6FtzNXF+sNTYlIZGsWXRqKifSBSWnex62r2Yyq4NuqvZ4pKTuturzswuvuVzn//Pz7/4Y6LD775045ee/rv3PfLWn3znk1/7gz8marz+28/97Pt/4cqDj73tnT/z+S9c/6Hky/d94KPv+8DHfuXTn/v6C997+f+KPgb/5PPXd+5/Ijt8OjcyXT+xWZxYyQ4vlSaEcOXWSzMRggXjS4SuPLkXKnYVwaAwPF1ljjmZTpUI1TVSfQSiDHps9CnkJSh9BHgc8C/5ARQUEhESYkCEaioFR//66/cdR5EIaTqmcTJNOaysizCa4CJqpfFtAoWDOB0Dh4t9LrYsvK8TCRARZuhpNwbczVR2JZldTOeWBgvzmcLM8dsufeBDf+/Z3/2ff/Kynzj4B3/yksid+PZ3fvnpz2xduv/kmdmVjSu/8Iu/9NxXX0AtEvoXtUZ/69lv/pUPfvrsuYecgVcPlc6N3EoO9Vq+vkIsiNMHKMQaVyJUz3a5wZkFLIrqhzWiBraMoQmsMp+JROjKlhRYIEXRta5EiNdPKbWOY0CE9Bb0OnxqzxJhVEBzccBbIDcNW4N86Cssv6iCT8dgjTRbXR/wlpyc8LZUO5KAZYkaEbpLorn50FwyvzxYXHcGF5OZ5Vx5M1sU/XhTubOnzj380+//xBd/+xv//Qcig1B27LshAr6XBeG98mNRteVHsjbb918RidjXv/yVD33kMzPzb6iPLxQrC8OjG9WJrdLE5kBxtjguGgfmhtcqk5cpaG61LqocHzUXGgsSBZLpaXd8P2rQnxDTWD1CaTQRclCInUJ9BNRxAFVw//oYECHFtfkRkUyiCzpSOHJESCyIRVGeqbrwogyuqU2MSCyYLi77yRKaW40f9RHoK+YGynNO7t6EN5OtiXxHJzufyC2lcov1Y1cHvTln6Ewid+rmOy5cffRnP/rJf/zZf/hbz39bLHv+SPYAevnHN/74pRsv/OH/fubZr/38h/72m9/2wZNnHqqPrTrJ047z2py7eMurHnZrq7naiju6TizoSb+hNE5EuNXU1mc0PhFhiAVxZh12p2WwFTXwE+La/zE/N1haylZX2UPFhVGnu8XUgnkhUsepmQ7tmdRxSMkqV+jZq9/ZLBARFmT10bTs2RvZqXjkiBCLoqF8HYPoMLQ1mHIXkTiPYzKIAqM51STo2e5NV6cHyjOOOyUXi8TZ+gFvxUmdp7dIu/OZ0kK2MudkTg24ZyvjSzeduHzq7JvuOv3Qq09ePnP+/unFR07ee6V+bMqt3pP17h3IT1XHtm+69ZHjtz06ctP9RKgYJWJBPiAzWFobueWBgAXjRoS8I4hYkNPXEFuEZoUmjkiApytOGIpPcv4uvhoUeqYRIVxtr+c+hSoXcg8c/c6GQTm97C+QRnIqxpwIQ8RAUy0sp6giFK1idUhCHBOlWJBYkCvItMn9iiDmksWpZOmc+Lc4k/BEVhlS3PAHajabIMjC3ED+XKYwNeTNDrlzYjfRW8xXV736WnViqzq5UZ7cKo6Tibzo1re9+jXRXKlBeO0QDHJHImzZXkesbgWRVkSgjXBcIHfUMhVxaoartxjksHqBCmN1lJxvP6cwEBnE1+A/eWKWf4sGAMK/aZ6HfGf966IJNzgBS1zILSksER42VAokMaDKuxFg5vPkvCdbAORrm+ivlC4uIxw0jQhnAT+bmyHSurGDInINk/lVieVUfjrtzgyKZOSVVGFtwN3MlC/kajQUl+XJuoveuKjqlB+95I7uELoRoTLIHYlQtT7orUOGzBLh4UES4WBpiQTBPRkMIgCA3dnG6mizUQoFgixQXh3lJVbj3h3AqR9PJvO0KvcRFcScCAEcyKaJJXJ1NVFFE0oI2AB9ToEgUWCjpnYATC8d6t8cJppju0aQJyqPAO6S4805FBESitM+xI/ygE8BXLicyGPtdz7pzQseFblWa0PDRGNX3bHXueNX3fHLhfGt7PhaYWJZFNhsNJdoT4E9APEHrA+ywfxSDNrssjgIIPeOnA+iEE+JrnRJRRn82MRnNIuIC1XdbOnQME+QySJ7pbrCeH18YgpQH8AL+hT6S9+WCA8fSRkLormEQSWL+Dgr2psNlZdJi6Q5FsQAshGHRXNz/rVGgdEkQie3JpBfcfIyuRBcGCbCBREXyjpeTkFscYlgUVJmojifLC0NlNfyo5cLY1ckEe4UxjeyE0uFyXmCRoRbe2BBgE0Yb/CQddZHuL/QJ3w8wEnoXPvJLBZkuuInp7cgUvcF19ynMEyEQcodGS6OCA1tVVgIOhnwTmFSblrrEu8vjgQRol6D75toooomVOXJVFbAgrJc4RJBnI5xF3Hto7TcEvS/+gJUVtSwJOO89URhleC4y4Ln3HnHm3WKc05RRofBMimOmzvulONNgSAdT1SMS3qigA4pVX5EVNCWWM2Pr9C/TQW1gfaLn10jRTgivLtjifAwASJEUKim/BoEDuZULuSFUMiOWZC5UPyKiDDYMuQ0Er6JWUToJ4EEQWFk2zMdISL0t201UUUTFAjqkAss64zc8AaDXrAlSJH6AjJerbA+WFojpIurqeJKwluWFWcWBbwlwXMCcrPQk6WcXXG4tMGCElKsc5nacm5kxRV92EW7eXdUW/Tmc6Ft9wK7ECHCcYpI2ChTXKhTUX+hT/iYQA447xQiKNRlZARUDhuQdRATbZYHhUwlC/Jv0ZVCZT4TiVDdKRyqrmEEIoWYEyHm04BSzVYXVTQB2uMzY16gTqgsw9mEniw3KqBV2PLnn3bnwwHUNQyiq/pqvi6Knw1WF1PlZcGFhMKK465KCGqUspPtC8SeHCfjiw9BkInCVKa6lKuteGQf6xdKI9vF+nZpZIcuxLc3UWDQt6GJDnvaO1TPyMAid6gVabHPQB2W/KyTm6FhzwU7hbqYoglmvtCPensmdmh856b5UGW6uMh5z/q3GICgIrwnK4nTBZliMshhcfcbR4II+QiWQUSorqh4Cq/AfCObkOvLCDrUKLC/RNgaYxuVifXy+Jo7ukY0NlhZTpVWE55kwcI6uDDo4yPoR2wruiuNT7x5SYTTRIRDFVkkr7ZVrF8iFhREWL9SEk3ntVhwr0SYl90DVBYUa6TaHLM4EMj4W6xF52bomjwSz0wiVAmMrlHxYEAp+gPy4wvmRfwBDQJNwlBQaBBAftgpRB5FNFdHY0uE7fJyFEZpLFlY9AWiLICoB7Y1VN3gyE+cLFXP3TTCQQBZFnITUbQzpUBBpFK4I5cK9S7Etivk5NZsOjgsytGJPtMseoGaJxCy9S0RV/11ZQl4CvLEdMpO+8sM7RPtHVl9lKIoFJoBqRh06K/Z6WwAm6MMvCmE3hfElwibNY2DQtVHU9fuNflZHAjURV1PFopDZiROAPGBWIUIw5JVQa4lVrzZ69S/cW8gUwUW5M0qS4S9gHmuHfgv2QK2RFz1F8+fra5ysOvvQGsjwOOQbK4+iqmu3zmqCFMgoK4Pq1yoj8DhILZEyGD1C+XlhBYeNflZHAh4g7OxqCtr5VBsh7qpSAjhjAtdoKpkU82l+vedCAc8sTaFRVFc6+dyLVSEPH2GuvWlfq6LVZdy/PSXW1KACzsTYSLwAzgnbx/n+cEjTIEAL5CqHo8lwgOEUCQlL4cVydC8HNOhEqG6xwkupKAQgSDyQ8SPmkBVySZkH1d/93dfDQTSNzOVFZx3bZyG1c7lWqggrmqJVNCpvBfyC0k5ZvqLx6ZJJQ4h52Z8LtReXB2BRFB9dN/n+cEjTIG+vss+heLtotGnMLZEyMPqK1JzXg57lNAisxTJaKhHXtUjP4R8bbOpjHgPRIigUAQKQVCof+OewRMDZtcvcaAdR7LoBeBIXhDjOK8dYqy/eHJ6i8HSUiMo1EaAgRGgd0dQiPHUbxtVhCnQR3OfQlXifUFsiRBgLWKtGyov4wiWoe6k+dBUImBEbqnBFQM6EyHkm5DOMoLCfTQQmB64IAosT1wCF+om3kIFQpaWQD41uhD0uBQWV/3Fw9OLcK0G/d2BZKPDtn9iaH/3wg8eYWVnItT7FPaRC+NMhPA1VC1KBP0IUayB3Um2ehYHD18TOCESULkQm4WIC3WxMtiY0kUWRwr3z0CooQZceP9zzfRb9I6C7BWlhoYdEFf95UlFF8jPkfmy4dcH1AA6qZya0W8bVWgUCPUP2mfyTmFXr+hAEXci1PJyUKgCCaqqpdPkZ3Eg4H3BEBF6Igtim1Coi8LiOD7amQgRWMBZ5lUj/Rv3Blcec1cLGuAT3bhbqMDhfh2ikUKwrEfXyKruHAHEVX8xqdBbipvX668P+JM8GAoEhe7+zfODR5gCAZ4VpLnQYkuEhwok7iA/V6x0SeumCc/i4BBWCaDlwRkn23bJiI0joBoINo5Y1TTLSsYValQNgMZ0ySZlcyL9c/+3husvF9MHcrLPpdgpbN4nA/3r3JAKGunwDX3/TIbFINeIIazpPoIFc67Ercv6MHEUiRBOJaaOF9hNi8OCphJtiHDAWxKpFJoEAUfpYpOQBgJJx/xFzIKWCKMAXRBggoGg9qavnt3SKkzXX3AVEyGK2Q54TdulzII6EcLnI+ZQ74lb8c0jhrCmA8JnDXaOsTygy/owcRSJMNHc50yTnMWBIqwSALOgUJKRC9nqOnYKdQk2RBlYTJAi8szwLWBBGw5GH9gvZObrQIE+gpYUhupviLwRFBIXquSnUqDqGeDDpIyYQ3eLsDcQ1nTA38iITHumI0qESWP7nJmPsEroICLM1zaHyqvEhboEfTlypnZgOLBqxK6xyoIRNhNHHS0Dgk4GMcg34JYUxukv8xaenN6C4kK8dYgF1Xmu/gFd83KoyoWRnOdh7QZQMS46QeERJUI4lYb2OTMcYZVoiUJ9i4JC4kJdgr4cVesQ7LTTJzhGgYjQStYABMfo1ZyKrkSIlhQm6q9KVyqNNQ7FNK+Rtpvq9O401UM3MYsIC7JQDqpyU1CoLgwcPo4iEXJQaHqfMzMRVokQeLMQNUh1CfpybHWsgD5EnpnXalPKIopQ+rWyudfF3QAXfc3PpovC7wnfMNrQiRCzNNSSIjQUekRI756prOCgEBNhJM8NhRUc4CPECApxkBipFH3BUSRC/7yy7PMCo2lxiAirRAhcaAYLpLoEfTlq0QMcZwr02UB4waKoZcS+Q49XwAGcUIF+rezQ6BL3ofQppAsKjPQ7RxntHpVCIowAprE/vZWlDnVMxLX0A9SNUrOIELuDjIJMMEXRtb7gKBIhqidDkchotpuaFgcDTSWaQRRYGt9GUFiob+kSVKHGgj6CPDN8HYQbydN0Rws6XYEIubsQF9xKBFnkrcF9CrPTdI2dfoNUOPSo/CPvk/FMFnM7N4s02cb0lhADlZ3G4rCrnJ41iAi5TyFCQ+QU0hwIi/uwcOSIEHOLrSfNPHJDyBlRJxNmp11biwL4fDnWtNELQnRH0iTLSMqqjK5sBAoFEysw2p0tooBisJtLekdmnaIcfxdfEyvACwCCJ4IKnGjPxPdk0jVLf+mZyS8XHC93QDHn9RFgwHwhfRY9b2Mwz7FbDPmC9VWhHxyOHhEqtSoS0vekoSdfjIlQ1SKzFCmWUO1jj0SYOMg+hRb7C2iZWCMNEgmwWqPLFFBtIq5J1oIMmpnPRCL0ZPVRMbfl8q+/g6ONgIpU0KaR89P1e5oFPj6qLpJbItx/MAuqQSHpki4Si4gAQSHsAkOXrCri1IH1KbQ4OLiyY63ILu9AhMpSIT6BCsfAeUVYjOqj4MLO85zfnciDvD0KCkuTO/ptzQLKsieDnEKW8kHjKBKheo0AnOymqkjm6lL8gDJaTYtmHav1s4gPqE+hxb4DazDQOzBBB/mCCFOyuyFkDfD5SdZfdbHUCOCx4QpgkncmQjZf3KqwfOyyfluzwHVo8YL6Wx8QjhwRquDoMCHzcqBLnH/Ga6QWfUR54hKJg4PCHokQQeEB9Sm02F8wEcLpQR1qXaws3IQMFBqJd/k5JzeLPoVec1Bolv6yK0BTnYNCfQTUoeCpjqLzMYgIXaXQDL/pIcSFR5QIeWSZCCngwBEsm4gdKXCR4nBQqMlUBcR6EH0KLfYdoVVN7BTqMmVgXVRVYeJCiiPhy6pBoXHgEUBQ2CMRJoL+9XGY50qhmUPgP8aRI0L2KMMeh8lFm+INiEPdKexMhJCsczB9Ci0OFG7Q/UoXK4BAsMXn7jzpr9G1FNghcHvoU8gePC4QFIoFUu22hkG6rdzAWX3TA8WRJkIG8nLICyNrq2qRieoUM/DqFhnHTGXFP1PekQj9RbOD6VNocUBgCoTEdbECHCiwffSd2qBoIlZZTeRCvDtyXrv2KQzRQ7K56LzBCMpwo7wA3vQQuPDIEWE7IHcnVJTErD2G2IMXSBOyf5tuCwT/5cSv2MXhM3WQZmgVziKyIDuIomsqdLVtQBJhSH/5Ovrg9kz4kTxyBIUcAauzHZO/5fznjVJDt3i4AGl+ZIuUF6/ZRfT7AUuEPlBoBqsrPB0tEUYKbtDIlCTVzhCEKnHwkpHq1jARWvlGFtnaBscEEKius02QFWfM1d/QhOT1j3ZRkf4JJjwXnTfU2wMRYqdwSDavDwv6YGCJ0AfK+LJTaeg0ijdcpZGpLkFfjsHSN35MBsWD1FiQJWuQoTxqwEYRqjDrRr8FgpYyeqVZs8DzE4eGOBxU62GF310B/a9QVwqzgI0MN6g+emh9Ci0RBmguaW/oNIo9CrLQjEg10yUooeoMr6uoeaI2PcYIoDweYgImwk4cECTecSlqQ8FTFG5fIyJsU4A7BOJOzgQzEQVZfZTpkLhQLJDKZZ4DhSVCH2K1TelzxssLuqgs+gKIA9aBvH5dgiHAerINRZ4ZboL7WCKMMkqTO2QHcYyeaaADAbAjS/pLZGBieyZcgAh5y5Bi4tDqaGciJD8Ar2/o3EYsyDuFdEFBof6a+w5LhD6QrB3aKbREGB2wX1IIOnp3gMqCAPoUskwtC0YcqCLd++IYJ5gmZXsZ3uDQ7xxlMAvyk/OhocabdiRCxMRw5dXb6t8VUcjdQUSE6FBxOM3rLRH6aJzLl06loYoUY8BGMBfq5kAnP/VXJF+07PECFrSOTpTBG0U95lYj645VGAukZskXrl7otCe5Ai1HoO38z82ENkrZgzQC3J5JpDzJUzOH06fQEqEPcUArSNZGUIidQl1UFn2B6iwTh7U1BM0siL+hH1mm6qKolW9kAVOonpjQdVaFyDRAWxKlZ69Z8mUWxGNjitII4NBQr0Qo+xSaS4SiSpwSFLqyafMh9Cm0ROiD96ITylFDbu8CWAMaHfD5clhAXHTqWiCFSyYVniZpF1lYsRWh3dkiCoD5hqJRbEdOjF9pVpNsS6SKS0QepMJ8K09ZCdC/LrLAkxOpw0eneU7BbudarMLt8xbVovMC2p3NAiYAbwNjEMSYaCOwN1gi9KGGEQlFkULMZ4kwOuCcQoQCvRAhVx8tyIa9lggjC5UIcTxK5Mz0TITwZYkM+G6emRvD7Arg9eHzdSBCfn2/TaN0+8SGq3Zns0ATgEsNNwah5/nQFZYIWwBGk7gwHn3OYonS+MWCbNkDCuTNIV2aLFN4ymhJwdDvbBEFqOrmBoUUOsgXS4W8Eo5PSIW50op6Q4N0GU9OI4CWFAx9BHgc+IKDwhh0pWBnSB2EDuOwW1gibEBVJNYlVZHYr9TlZHHIqEwKJ7cRKAQnBnWxAkKmcvWbg0LPdqWIMFRdKwbNiTpEQiEiZBVG2gxuwvxnFhFi45CDws7zXHUFUF+QJnkMiNALys75gWBvjYt7hyVCH2FFkkaT0FKRLBf2HdynECUZuxoIX6b5uWQQFFoijDh4JRNJdX6ZWU2yDF1/6ZpcJS66ZhD/MUCEJdmpsZc+haoroAaF+p3NAsLiUC+2Do7RbmGJ0AcTYTKoZAHEo89Z/ABZQDd4waSDYqgyRVBol0aNACsdOT0ka12yKvSIkOwmcWEov94gR5bNTjEICjtHQuoIJIKgMAZ74TwHuEF3UiaM6iOwN1gibCAZtL1OKDMpZX6fs1iCT4ezbnQmQshXSDYICv1cJe3OFpECK50ru0noYgWgrRwUssSTrSrpG0SEXkDbHBTu6rQkGTQKCrM1UyuuhcCOryXCAwQTIeuSuDC/z1kswWVi6F+/Tj/SyDSxMrhPIRlN26cw4uDFzJC66WIFQl1HAFGcLNBftZYCe1FGoBD0KaShyPTWp5CNWDLIBNNvaxbYd+GwOCWTKPQR2BssEXZDUL2QV0dVqVj0C7AOuGY/UZSKDVwZRkJaSdGnUClbDOuA9kx8T1hJz8zNpCOC3fYpTMmj9lggZf4ziAi56Ch+5END6ls35rmSABYC30Gd22bN86LcLu3d8d0VLBF2AVwPXh0NzUuLfkElLVc5Xt/OQPDpJ/wKS0bi1Ewz81kijDh226cQ5nJAFtgzsRR1yODA5xMHxJqZrysR8gqKGmSbNc/5ybnAQofIeLewRNgF2JoekOX7eCYZp07xAzMWdAM7hdgzAOFx8Ac58idqUEixReg+FhGHu8s+hXyKCqWo1XUdI4BHZbfPk0EhMUHDw+s2AgCKzheVHk9mGTH1aeEN+Mkk2pvuDZYIu0BE30r1UV0qFn0EjBoUm3SDtD2hxH+JNqtGMB9JLeGajY7+RRYRwZ77FGKDAypcnjAmnSBEhPyj2pup+yBIO0auvCdDTBOJ0Gv2fQuymIYlwsMDiBA7hbzNYNwcih9gEVQC4+P1IevAXMhQ/WibJ2oW9tCnkLmQ+xNhvdEI6EQI6H0KE525MD9LzMEBsaFE6Mo1OYgP54bCr7lXWCLsAn8lWlEkg3baYwwmLSYwN+jorYaAISLkC7YdNk/ULOy2TyETIXxZPvWm39kI8CzN1jZoBGi2q25fJ8jTs+qJIbPAOs7X2CkMv+ZeYYmwC0CEzIVYIDVXkWIJlQvJOujN2xLNvMgf0rV6EsoSYfSBMgi99ylUiVANCvU7GwSapdyeCXO7KxHCiPHrGzfVWcFZdtgr1d90b7BE2AU4dQYihFeFPWddVBaHjNB6ET7B8Xo+VcgIBYiAmmfG1sEKN8rYbZ9C8B87ssZFRfoM95lAthLjsLgrF2IQ1JgYm4X6N0YT/LQYAYb+pnuDJcLdIaX0OQNcmZ8LM2rQ3kNc4QapFGz74MroogSww0QGReQUBgVIRXlG7c4WUYDqrPAxeuGkapJl+YYYAj4QK6xZfMAoKvUFOd7tMM8xFAlpwfyia7HoU6i2Z2Jl7zwOLWGJcHdINvc5A9hNs0TYdxSbK3H3QoQJWZKRm7dZIowyVCLspU9hOyLkE1KGEqEX+HyY6k5upjMRInSmoSAiJD8etXZjQIQ0Alx9tBd9bwdLhF3Ay2gJZXmNJhPEoEbrupAsDh8l2aewUZKRV8Y0yQIwlCRTFF3DWYwYFCmOK1TS4ui/AxG2A5GoflrYONAr+Icng9NA+psCqgVDz14/KNTuaRZoBLLNLSk663s7WCLsghARsoPJy6EqF1o67DuQIqbqRmfFEAKVR/ApKMzVN22fwoiD1Q3X7PToku0MtKRQVdgs4Mk9GRJhqvcYESbk6ijqC8bA4WuaA/lZioxBh/oIdIYlwu5oIsIgU5tMLZJzQ1yoi8riMMF9ClFoBgaiAxEKsQZ9ChEUxmPvJMYI7UTA6dHF2hmcNqPf3wgwhbtB7c0eiRDmC+2ZYrAFoM6BpFwi9rlQG4HOsETYE/SIUC3jy0Rorl7FBmwd1IKEXYhQsQ6xWTKKPdgB5UIKu4K51UcBjok9pb5g53kOYLZzrV39zmYBRIgR4CViS4T7D5hIDgoBcZ2fJS7k/DPPEmE0wHYN2yckI3+zUJMsi5Ilmww6eoudQu3OFpGCuhJTaN+nMKS5Cd4Vlkl1OaVPoVngx1YXSDsQAOwYv35Cun0xaM+E14ey+66AJcKDQLs+Z052miws5595lgijAezdelIcWVmnvysRohgNe8q5+qYlwsiCIyEoHT1doEUAAAX2SURBVEOXLMu3JRHCkTU3ud5tTqItdKu9yUTI18gE0+9sIrACpB4L0EegMywR7hFYkedCMyXZKIurclv0CyBC2AicKMPxerCdioT0cnjTV8g06FMoUikU+6gaHf0bLaIAlBwTDo0i0E5olV9vKCl6QZkVeheV9RvzvP2A5GStXfYdcWFQGhj8AA6Lu+aVtoMlwj0CO09wKj1lqVoXlcVhgpUZ15xo1c5A8EoRwAUTQsxniTDiyI+Inr0+ESq9R3TN9RHkG3BLCqOFCy+cbFGI+boSIZ+eVe9m0FCoRNhLXmk7WCLcIzgGJ0Vyg3r2dmm07wipNHQDpwpV2mtpInnJiOJCZj6DjMJRBvoUqi0p2knZR5BzxgukWNfR7xxNwOFT/TNXbs2oHl74lVshVHSeb65/YzShqicc3857pe1giXCPSMqjuthpwOpo0TbsjRLYOmDJKAHroPUpVK9VmoRPo/qbVrhRRnFiG7U3hRx7JkIEhbzBYVCfwhAR8ixFld2uPh+DX99TWhUa5NCruln8M+SVWiLcI0CEhJTSp9Ci72APkU0Dtk8SmnUIwf8DaUMJ2DtR7+NZLowwiAi5TyFECSnrmsv6y1yInUISrkFE6Cm7AEWlUNxu+xSGYmJWGf3rIgsehz9LXqklwj2CFUndcmeLadEvqCJQFRuHZRKKidTBTEkILRlZyUYdQZHYoeoamKAz/LPEgQoPBk1rw7eNNvSIcA99CvWNUhMdPh6BveWVWiLcI3BYhnXJtmeKFFRnGZ+061MoRBlkUCQUPxpLRpwnaiUbcaBPIUHt2duBBkhhVS7kVlz6naMJZiz1mcWq5hHrU8jgJxeD0D6vtB0sEe4RSS5znp91stP0I80kQ+dQzADroDrLdNGuT6EQZUCETJPiwvYpNArcTgE9e/2QSCYBtwQJl/OvTdzgwDIgT3VAPP+u+xT6pgxBoXFTPaTmDP1NO8MS4T6DPVOA5mVxYtsmaPcdsI9dAwWGHxfK8sQouobGFCHTAz20iA5cmUhAZp3sO3moumQ7wxu9CLgjF4Di2KXyxI7+RZGFG/QpFBveOXF+EgEiw3GXfHjyx2CzgP4MdefLxy7rtzULu80rtUS4zyCjiSbaYUbURGVxmHDl8XpS9Zaro+2Q1Hr26nfWvVGL/qIQNCcS57o1mXYGyE8lwoAaw98SWcAVEIVmXL8wVmghpEGEbuNzEGGjZ2+r2xrk9u02r9QS4T6DrC36m7DppGuxbqNFEhaHCnmSgvS89+0TICXLE6MYN92E145CCH+dxeFCdUdcGRL5Bbc0gXZGbnijUN/S40Ld1EYZGAH1AK0KlQhVbuCprnel4HHWvyuagOPbe16pJcJ9BvrXN5oYBFyoi8riMIG4vGkDSTMQKqAzvEDazkD4NzfHQMQV7JF4yuroHo7RD5ZWstV1cGFx7BIzov6NkQV7ZjhACyZQ37EdESZliUGa6vQfVSdP/4roY7d5pZYI9xmObHeO9bRGc7tWSw0WhwkE6ASSi+8ndiRClqbKhWLhKCjM6DWnalhECgVZZpa4UJdpZyQLC+niMnEhdgcJpfFtgv4VkQWzF011f/2jIxGqPl9SHhwjBQndzThS3G1eqSXCfYaTm2UuRAxh9wijAF6s5jN1uuya5BhQIKsQnOXc8BpFG2quvUHWIcYIrd0hKNxLPllujrgwFBeWJ3b4/hEHXp+JkI+PNr1jq4iQJzy4kOY5T3Xc1rCpvsu8UkuE+wx1b5bDCHQzsOgjSCXAhdCNdtsnTXKUDg1bChiIdHERufZsIywiAhaHJ4mwEFQU2hVAhAPeEnHhUHkVdEjRId3NCKgDQkSIqR5y+1Qi9D9REi0w55FeQlOdomp1tof5JqpA+OH2nFdqiXD/IUZcHlzGigRNxHRZpChZ9BGkD+BCPjKje8pNQgwie6QYKp/PoJYQDAQcZ9Rjs4gC2FjTNZlvXbKdIfPqFlLuIoHoMF1czlTW5AkaM8A+QUHOeUz1rqdGVZLAnHey06iljMoSmcoKZrtOOdHEbvNK/z+NhxL6q9Vn8gAAAABJRU5ErkJggg==>