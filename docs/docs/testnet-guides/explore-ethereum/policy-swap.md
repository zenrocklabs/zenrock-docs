---
title: Personal Sign with Policies
sidebar_label: Personal Sign with Policies
sidebar_position: 4
---

In this next step, we will use custom policies. We will add a new member and update our sign policy before making a signature request. 

1. ***Create New Account***

Create a new account in your Keplr wallet. Open `Keplr` —> `Account icon on the top right` —> `Add Wallet`. Save the seed phrase somewhere secure and copy the Zenrock account address starting with “zen1…". Alternatively, ask to do it with a compagnion.

2. ***Add Member to Workspace***

Switch your account back to the original account and go to the “Members” tab in the Workspace view. Here, add the address you have copied from the second account and add it to the Workspace. This is an on-chain transaction that needs to be published to zrChain. The second address will be shown on the members list of the Workspace. 

![Add Member to Workspace](../../../static/img/add-member.png)

3. ***Create new Policy***

Create a new policy by navigating to the Policy tab. Chose New Sign Policy which prompts a modal where you can select the participants. Select both and set both addresses as “required”. This ensures that both addresses need to approve the request. Once the policy is defined, submit it by clicking on the button to create a new policy. This policy will automatically assigned to the workspace. 
(TODO - Screenshots)

4. ***Connect with WalletConnect Test App***

Now go back to WalletConnect test app and connect it with the frontend as in the previous steps and select the key you want to use. Approve the session in the web application.
(TODO - Screenshots)

5. ***Make a Personal Sign Request***

Once the connection is established, select “Personal Sign”. This will again trigger a signature request on the zrChain web application. Sign the signature request and publish it on zrChain. 
(TODO - Screenshots)

6. ***Pending Request***

As you may notice, the request is not yet executed as it waits for your other account to approve - this is the account which you made a member of the Workspace and added as a required party in the policy.
(TODO - Screenshots)

7. ***Prepare Second Account***

Open a new browser window and connect your second account with the zrChain frontend. Get some funds from the faucet to cover gas and transaction fees.
(TODO - Screenshots)

8. ***Pending Action***

For the second account, you notice that a notification is shown over the Actions tab. You can see it corresponds with the signature request initiated with your first account. 
(TODO - Screenshots)

9. ***Approve Action***

Approve the action with a transaction coming from Keplr to start the execution process of the request. 
(TODO - Screenshots)

10. ***Complete Personal Sign***

Once the MPC Network returns the signature, the WalletConnect page shows the successful execution of the personal sign process.
(TODO - Screenshots)
