---
title: WalletConnect Uniswap
sidebar_label: Uniswap
sidebar_position: 3
---

In this process, we want to swap Sepolia ETH to Wrapped ETH on Uniswap’s testnet. 

### ***Fund your Sepolia Wallet***
Before we start, fund your MPC generated address to have funds for gas and the swap payload. A popular faucet you can use is [Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia). See the ETH balance of the address in the Portfolio View of the Zenrock web application and proceed when it is funded.

<div style={{maxWidth: "800px", margin: "0 auto"}}>

![Zenrock Portfolio](../../../../static/img/portfolio-key-1.png)

</div>

### ***Uniswap Testnet***
Next, go to the TESTNET version of Uniswap by clicking on this link: [https://app.uniswap.org/swap?chain=sepolia](https://app.uniswap.org/swap?chain=sepolia)
It should look like this:

<div style={{maxWidth: "600px", margin: "0 auto"}}> 

![Uniswap Testapp](../../../../static/img/uniswap.png)

</div>

### ***Establish Connection***
Now go to “Connect” and connect your WalletConnect session with the web application. Copy the URI from the “copy” icon on the top right corner above the QR code. Paste it in the WalletConnect URI input field on the `apps` tab in the web application.
Make sure you are connected by checking the connected address on Uniswap is the same as the one selected on the Zenrock web application. 

<div style={{maxWidth: "600px", margin: "0 auto"}}> 

![Uniswap Session Added](../../../../static/img/wc-uniswap-added.png)

</div>

### ***Initiate Swap***

Make sure you are connected to the correct network, which is Sepolia. When you select a counter asset, make sure it's WETH on Sepolia. For this, check on uniswaps settings on the top right corner and enable `Show testnets`. Then when you select the counterasset, check in the dropdown for Sepolia and then select WETH.

Now select WETH as the token to swap your Sepolia ETH. Select a tiny amount, for example 0.001 ETH to swap to 0.001 WETH. Click on `Swap`. 

<div style={{maxWidth: "600px", margin: "0 auto"}}> 

![Uniswap Swap](../../../../static/img/uniswap-swap.png)

</div>

### ***Execute Request on zrChain***

After you clicked on `Swap` go back to the Zenrock chain web application. Again you can see a notification in the actions tab. Approve the signature 

<div style={{maxWidth: "800px", margin: "0 auto"}}> 

![Uniswap Swap Initiation on zrChain](../../../../static/img/uniswap-swap-zrchain.png)

</div>

### ***Swap is Pending***

The MPC Network returns the signature request which gets routed to the WalletConnect. The transaction is executed and you can check its status on the block explorer. 

### ***Confirmation***

Once it is confirmed, you will see WETH in your MPC generated wallet. 