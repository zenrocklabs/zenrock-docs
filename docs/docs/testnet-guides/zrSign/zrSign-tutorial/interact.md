---
title: Interact With Your Contract
sidebar_label: Interact With Your Contract
sidebar_position: 6
---

Now that the contract is deployed on the testnet, we can interact with it. Go to etherscan and find the contract address you got from the deployment step.

1. Request an EVM key

As the first step, you need to request your first EVM key. Go to your contract on Etherscan and click on the `Write Contract` tab, alternatively you can craft a transaction directly via your own wallet. Connect with your wallet. 
Click on `requestNewEvmKey()` and set the right parameters. Attribute `requestNewEVMWallet` is for funding your contract to be able to pay for the request fee for zrSign. Funding it with 0.01 ETH should be enough to begin with. Next, in `options` you should type `1` to indicate that you want an EVM key. 

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Request EVM Key](../../../../static/img/requestNewEvmWallet.png)

</div>

When executing, Metamask might encounter difficulties with assessign the right amount of gas. If this is the case, try bumping up the gas limit by adding a 0 and clicking on `Write` again. 

2. Verify you Wallet Address

Once your transaction was successful, retrieve your wallet address from the contract. Go to the `Read Contract` tab and click on `getEVMWallets` which should list the list of your requested EVM wallets. The wallets are being specified by their wallet index.

3. Request a signature

Lastly, request a signature for a message of your choice. Go to the `Write Contract` tab and click on `signMessage`. You need to set the right parameters. 
`signMessage` can be left with 0 if the contract has enough funds in it. `message` contains the message that you want to have signed. This can be any arbitrary string like `helloworld` or an unsigned transaction hash. `walletIndex` is the index of the wallet you want to sign with and `dstChainId` is the chain you want to sign the message for. For Base Sepolia the chain id is: 

```bash
0x8a9a9c58b754a98f1ff302a7ead652cfd23eb36a5791767b5d185067dd9481c2
```

:::info

Make sure to add the `0x` prefix to the chain id when interacting with the contract.

:::

For more information about CAIP-2 chain ids that are currently supported, check out the [support document](../../../zrSign/releases/addresses.md).

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![SignMessage](../../../../static/img/signMessage.png)

</div>

Once the transaction succeeded, the MPCs have published their responses for your signature request. You can find it on your transaction details page at `Input Data` and then look for the `params.signature` field.

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Signature Details](../../../../static/img/signatureDetails.png)

</div>

***Congratulations! You have successfully deployed your zrSign smart contract, requested an EVM key, and requested a signature for your your MPC key.***