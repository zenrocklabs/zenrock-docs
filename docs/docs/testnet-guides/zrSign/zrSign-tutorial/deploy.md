---
title: Deploy Your Contract
sidebar_label: Deploy Your Contract
sidebar_position: 5
---

We have scripts prepared to deploy the contract to the testnets. You need to set environment variables and install the dependencies for it.

1. Copy `.env.example` to `.env`
    ```sh
    cp .env.example .env
    ```

2. Fill the `.env` config file with the proper variables. Make sure you have the correct infura keys for the networks you want to deploy to. Alternatively you can use your own RPC keys. Also make sure to have an etherscan key for the networks you want to verify the contracts. For deploying on base, you will need the following environment variables:
    ```sh
    MNEMONIC="your mnemonic"
    INFURA_KEY="your infura key"
    ETHERSCAN_KEY="your etherscan key"
    BASE_KEY="your base key"
    ```

3. Install dependencies
    ```sh
    npm install
    ```

4. Deploy a smart contract. In this example we are deploying to base_sepolia, but you can deploy to any network that is supported by hardhat. Make sure the address in the `.env` file is a valid address for the network you are deploying to and has sufficient balance to deploy the contract.

    ```sh
    npx hardhat run scripts/deploy.ts --network base_sepolia
    ```

Afterwards you should see a similar output to this:

    ```sh
    Deploying contracts with the account: <account address>
    zrSignCrossChainFaucetApp deployed to: <contract address>
    ```

In the case of base sepolia, you might see a note that your contract has already been verified but you can ignore that. On the block explorer, you should see your deployed contract and it's also being verified already.
When you look up the contract on etherscan you can also find the contract's ABI.

If you want to redeploy the contract on the same network, make sure to delete the deployment folder from `./deployments/base_sepolia` and run the deploy script again. 