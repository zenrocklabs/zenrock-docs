---
title: WalletConnect Setup 
sidebar_label: WalletConnect Setup
sidebar_position: 1
---

The following steps show how to connect the Zenrock web application to WalletConnect:

### Open WalletConnect

Go to the WalletConnect test environment: [https://react-app.walletconnect.com/](https://react-app.walletconnect.com/).

### Initiate Session

Select `Sepolia` as a network, scroll down and click on `connect`. This will prompt a QR code. On the top right, copy the payload (a WalletConnect URI) and go back to the integrations tab in the web application. Chose the key you want to connect with and enter the URI and approve the session.

<div style={{maxWidth: "300px", margin: "0 auto"}}>

![WalletConnect QR Code](../../../../static/img/wc-qr-code.png)

</div>

If you have done the previous step already, you will directly get prompted to select `Zenrock Chain Wallets`. This will let you access your mpc MPC generated keys stored in your workspace on zrChain. Alternatively, click on "New Pairing" to start a new session. In this case, we recommend to reload the page of the web application, too.

<div style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap"}}>
  <img src={require("../../../../static/img/wc-connection.png").default} alt="WalletConnect Keys Selection" style={{maxWidth: "400px", margin: "10px"}} />
  <img src={require("../../../../static/img/wc-connection2.png").default} alt="WalletConnect Pending Approval" style={{maxWidth: "400px", margin: "10px"}} />
</div>

### Approve Connection on Zenrock

Go back to the Zenrock Web Application in the tab `Integrations`. Here, click on approve to finalise the connection with WalletConnect.

<div style={{maxWidth: "800px", margin: "0 auto"}}>

![WalletConnect Approve Connection](../../../../static/img/wc-approve-connection.png)

</div>

### Verify Connection is Established

Now go back to the WalletConnect App and you see that the key from zrChain is selected in the wallet.

<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Wallet Connect Menu](../../../../static/img/wc-menu.png)

</div>
