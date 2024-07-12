---
title: Frequently Asked Questions
sidebar_label: FAQ
sidebar_position: 7
---

### How can I get in touch with the Zenrock Team? 

You can find us on Discord and X/Twitter: 

- [Discord](https://discord.gg/zenrockfoundation)
- [X/Twitter](https://x.com/OfficialZenrock) 

### What are the relevant links for Zenrock? 

- UI Frontend: [https://gardia.zenrocklabs.io](https://gardia.zenrocklabs.io)
- RPC Node: [https://rpc.gardia.zenrocklabs.io](https://rpc.gardia.zenrocklabs.io)
- Faucet: [https://faucet.gardia.zenrocklabs.io](https://faucet.gardia.zenrocklabs.io)
- API: [https://api.gardia.zenrocklabs.io](https://api.gardia.zenrocklabs.io)

You can find our Big Dipper explorer here: 

- [Testnet](https://explorer.gardia.zenrocklabs.io)
- [Mainnet - Coming Soon](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

### Does Zenrock support smart contract development? 

Yes, we are supporting CosmWasm for smart contract interaction. We are currently using ```v0.51.0```.

## zrSign FAQs

### What does it take to build a DApp with zrSign?
The dApp team needs to integrate the zrSign interface into their contracts to make appropriate calls, that will allow cross-chain messaging right away.

### Where is zrSign deployed? 
Currently zrSign is deployed on several evm networks under the address ```0xA7AdF06a1D3a2CA827D4EddA96a1520054713E1c```. To find the list of deployed instances, check the [address page](./zrSign/releases/addresses.md)! We will update the list frequently.

### Can a single contract control several wallets within single or multiple networks?
Yes, a single contract can have as many wallets on supported chains as needed.

### Can a user contract send multiple messages in a single go?
Generally it's possible, but currently that functionality is not supported.

### How long does a cross-chain transaction take?
This depends on the chains involved. The main factor here is that before broadcasting the message to chain B, the relayer needs to make sure of its finality, so it needs to wait for a certain predetermined number of confirmations. Furthermore, higher transaction volume also can affect the processing time.

### What is the current state of zrSign development and integrations?
The zrSign contract was successfully audited and is fit for interaction. The zrSign team can easily integrate the network with the managed wallet, we also support `CAIPs`. It's also possible to integrate non-EVM chains on the controller side, and we will be happy to discuss that with potential clients. You can find the supported contracts under ***[addresses](./zrSign/releases/addresses.md)***.

### How much does it cost to use zrSign? Who pays transaction fees?
Sending a message from chain A to chain B involves the following fees:

- The network fee for initiating the process on chain A
  - The user pays it by default.
- The network fee for the transaction on chain B
  - This fee is paid from the managed public address on chain B.
- The network fee for delivering the update on chain A
  - The user pays it when the transaction is initiated.
- zrSign service fee
  - Currently, there is a base fee in gas tokens that the user pays together with the request to fund the subsequent transactions and cover the service fee. The base fee is calculated by the amount of bytes in the request. The smaller the request the smaller the fee.

### How is the zrSign service monetized?
There is a small zrSign service fee involved. It is supplied as a part of the base fee the user pays when calling the zrSign contract.

### Do you plan to open access to MPC directly via API?
We are planning to add direct API access via ecosystem partners at a later point. 

### Which chains are supported?
zrSign currently works on EVM testnets. Check out our deployed contracts under ***[addresses](./zrSign/releases/addresses.md)***. We update new deployments constantly. 

If you run your own relayer you can broadcast transactions to other chains as well. zrSign facilitates to get valid signatures for your keys created through our MPC.