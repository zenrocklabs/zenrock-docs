---
title: Signature Request Process 
sidebar_label: Signature Requests
sidebar_position: 2
---

This sequence diagram follows and explains each step in the process of requesting- 
and generating a signature for a specific key. 
The overall process has many similarities to the [key request process](keyRequests.md), 
with differences in additional policy verification and storage of the requests.

![Signature Request Process](../../../static/img/signrequest_process.png)

1. ***Workspace Owner Initiates Signature Request***: The process starts with an owner of a workspace sending a signature request for a specific key inside the workspace to Zenrock.
2. ***Storing of Signature Request***: Zenrock stores this request with a status that depends on the sign policy within the workspace. If other approvers are required, the status will be "partial". This indicates that the signature process requires approval from other workspace owners. If no other approvers are required, the status will be changed to "pending", indicating that the MPC can start processing the request. 
3. ***Approval by Required Approvers***: If additional approvals are required, eligible Approvers receive an action to respond to the signature request and approve or reject it. This step is repeated until all required approvals or rejections are obtained, ensuring that the signPolicy is satisfied.
4. ***Updating Request Status to Pending***: Once all approvals are received to satisfy the signPolicy, Zenrock updates the status of the signature request to "pending", indicating it is ready for further processing.
5. ***MPC Connector Detects Pending Request***: Similar to the key request process, the MPC Connector monitors for any pending signature requests for keys associated with the respective keyring. 
6. ***Forwarding Request to MPC Federation***: The MPC Connector forwards the signature request to the MPC Federation, which will handle the cryptographic signing process.
7. ***MPC Federation Creates Signature***: The MPC Federation starts creating the signature. This step is simplified in the diagram, but typically involves complex cryptographic operations. The parties within the MPC Federation exchange information with each other, with the result of a valid signature in respect to the signature request. 
8. ***Signature Request Restult***: Once a signature is generated, the individual parties of the MPC federation forward their result to their individual MPC connector with their individual signature.
9. ***Broadcasting of Signature***: Using the signature from the individual MPC party, the MPC Connector broadcasts the response for every party individually to Zenrock.
10. ***Zenrock Checks Threshold***: When the signature request response from the MPCs are broadcasted, Zenrock then verifies if the keyring threshold is met, which is defined in the keyring object, is fulfilled or rejected. 
11. ***Request Fulfillment***: Once the threshold criteria are satisfied, Zenrock updates the status of the signature request from "pending" to "fulfilled" or "rejected", indicating the successful creation of the signature or the rejection of the request.
12. ***Querying Signature Request***: If the request was successfully fulfilled, the user can query the complete signature request and can use it for its service who requested the response.