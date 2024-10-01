---
title: WalletConnect Setup 
sidebar_label: WalletConnect Setup
sidebar_position: 1
---

The following steps show how to connect the Zenrock web application to WalletConnect:

### Open WalletConnect

Go to the WalletConnect test environment: [https://react-app.walletconnect.com/](https://react-app.walletconnect.com/).

### Initiate Session

Select `Sepolia` as a network, scroll down and click on `connect`. This will prompt a QR code. On the top right, copy the payload (a WalletConnect URI) and go back to the `Apps` tab in the web application for your workspace. Chose the key you want to connect with and click on `Add New Session` enter the URI and approve the session.

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![WalletConnect QR Code](../../../../static/img/new-wc-session.png)

</div>

Afterwards, you can enter the URI that you copied from WalletConnect in the field `Enter WalletConnect URI` and click on `Add Session`. Next you need to approve it to tie it to the MPC key in your workspace.

<div style={{maxWidth: "300px", margin: "0 auto"}}>

![WalletConnect QR Code](../../../../static/img/add-wc-session-prompt.png)

</div>

If you have done the previous step already, you will directly get prompted to select `Zenrock Chain Wallets`. This will let you access your MPC generated keys stored in your workspace on zrChain. Alternatively, click on "New Pairing" to start a new session. In this case, we recommend to reload the page of the web application, too.

<div style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap"}}>
  <img src={require("../../../../static/img/wc-connection.png").default} alt="WalletConnect Keys Selection" style={{maxWidth: "400px", margin: "10px"}} />
  <img src={require("../../../../static/img/wc-connection2.png").default} alt="WalletConnect Pending Approval" style={{maxWidth: "400px", margin: "10px"}} />
</div>

### Verify Connection is Established

On the Apps tab in the web application you can see that the Session for WalletConnect is added. You can also see it on the WalletConnect App directly.

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Wallet Connect Menu](../../../../static/img/wc-established.png)

</div>

Now go back to the WalletConnect App and you see that the key from zrChain is selected in the wallet.

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Wallet Connect Menu](../../../../static/img/wc-menu.png)

</div>
