---
title: Personal Sign with Policies
sidebar_label: Personal Sign with Policies
sidebar_position: 4
---

In this next step, we will use custom policies. We will add a new member and update our sign policy before making a signature request. 

### ***Create New Account***

Create a new account in your Keplr wallet. Open `Keplr` —> `Account icon on the top right` —> `Add Wallet`. Save the seed phrase somewhere secure and copy the Zenrock account address starting with “zen1…". If you switch accounts within the same browser some problems might occur. Therefore, we recommend to reload the page after the account has changed or to use a different browser. Alternatively, ask to do it with a companion on different devices.

### ***Add Member to Workspace***

Switch your account back to the original account and go to the `Members` tab in the workspace view. Here, add the address you have copied from the second account and add it to the workspace. This is an on-chain transaction that needs to be published to zrChain. The second address will be shown on the members list of the workspace. 

<div style={{maxWidth: "900px", margin: "0 auto"}}>

![Add Member to Workspace](../../../../static/img/add-member.png)

</div>

***Required - Request your First Key***: If the workspace has no keys yet, request a key to follow this guide. 

### ***Create new Policy***

Create a new policy by navigating to the Policy tab. 

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Policy Tab](../../../../static/img/empty-policy-tab.png)

</div>

Click on the `Create Policy` button which prompts a modal where you can enter a name for the policy. 

<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Policy Title Prompt](../../../../static/img/policy-title.png)

</div>

In the next step chose the participants from the workspace and select which should be part of the policy. In the case following this guide, we want both parties to approve a request, therefore, both participants are added. Also increasind the counter to 2 indicates that both parties need to approve under this policy.  

<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Policy Participants Prompt](../../../../static/img/policy-participants.png)

</div>

On the summary page, review the policy and click `Finish` and sign the transaction.

<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Policy Summary Prompt](../../../../static/img/policy-summary.png)

</div>

Afterwards, the policy is shown as an available policy in the workspace. 

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Policy Overview](../../../../static/img/published-policy.png)

</div>

Once the policy is created, it's time to set as an active policy. Click on `Set Policy` and select `Set as Sign Policy` by clicking on the button. Approve the transaction in Keplr.

<div style={{maxWidth: "600px", margin: "0 auto"}}>

![Policy Overview](../../../../static/img/policy-set.png)

</div>

Now the workspace should show your custom policy as the sign policy. 

<div style={{maxWidth: "800px", margin: "0 auto"}}>

![Policy Overview](../../../../static/img/set-policy-success.png)

</div>

### ***Connect with WalletConnect Test App***

Now go back to WalletConnect test app and if you haven't done already connect it with the frontend as in the [previous steps](walletConnect.md) and select the key you want to use. Approve the session in the web application.

### ***Make a Personal Sign Request***

Once the connection is established, select “Personal Sign”. This will again trigger a signature request on the zrChain web application. Approve the signature request and publish it on zrChain. 

<div style={{maxWidth: "800px", margin: "0 auto"}}>

![Personal Sign Request](../../../../static/img/wc-pending-sign-request.png)

</div>

### ***Pending Request***

As you may notice, the request is not yet executed as it waits for the other account to approve - this is the account which you made a member of the workspace and added as a required party in the policy.

<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Pending Action](../../../../static/img/pending-action.png)

</div>

Now switch to the second account that is a member of the workspace to continue.

### ***Prepare Second Account***

Open a new browser window and connect your second account with the zrChain frontend. Get some funds from the faucet to cover gas and transaction fees.

We are also going to support Passkeys that let you approve the action for a second device. This will add another layer of security to action approvals within a workspace.

### ***Pending Action***

For the second account, you notice that a notification is shown over the `Actions` tab. You can see it corresponds with the signature request initiated with your first account. 

<div style={{maxWidth: "800px", margin: "0 auto"}}>

![Approve Pending Action](../../../../static/img/approve-pending-action.png)

</div>

### ***Approve Action***

Approve the action with a transaction coming from Keplr to approve the action and start the execution process of the request. 

### ***Complete Personal Sign***

Once the MPC Network returns the signature, the WalletConnect page shows the successful execution of the personal sign process.
<div style={{maxWidth: "400px", margin: "0 auto"}}>

![Approved WC Personal Sign](../../../../static/img/wc-approved-sign.png)

</div>