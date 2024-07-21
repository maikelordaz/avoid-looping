# Avoid big loops
This project is a test to avoid big loops in solidity using Chainlink Functions. <br/>

- [Avoid big loops](#avoid-big-loops)
  - [:rocket: Walkthrough](#rocket-walkthrough)
    - [Requirements](#requirements)
      - [For the smart contracts](#for-the-smart-contracts)
      - [For the Chainlink Functions simulations](#for-the-chainlink-functions-simulations)
    - [Usage](#usage)
  - [:books: Deployments](#books-deployments)
    - [Deployed contracts](#deployed-contracts)
    - [Deploy your own contracts](#deploy-your-own-contracts)
  - [:dart: Requests](#dart-requests)
    - [Scripts](#scripts)

## :rocket: Walkthrough 

### Requirements

#### For the smart contracts

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [foundry](https://getfoundry.sh/)
  - Run
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  ```
  - You'll know you did it right if you can run `forge --version` and you see a response like `forge 0.2.0 (816e00b 2023-03-16T00:05:26.396218Z)`

#### For the Chainlink Functions simulations
- [deno](https://docs.deno.com/runtime/manual/) follow the instructions in the documentation

[top](#avoid-big-loops)

### Usage
- Clone this repo.
```bash
git clone https://github.com/maikelordaz/avoid-looping
cd avoid-looping
code .
```
- Install the dependencies
  - If you want to test everything
```bash
yarn install
make all
```
  - If you only want to test the Chainlink Functions
```bash
yarn install
``` 

- Create an .env file, follow the `.env.example` file: 

[top](#avoid-big-loops)

## :books: Deployments 

### Deployed contracts

The nexts are deployed in arb sepolia
[UnboundedLoop](https://sepolia.arbiscan.io/address/0x1c013307389e8ab246bbe53f743e58bb3d40a627)
[ComputationConsumer](https://sepolia.arbiscan.io/address/0x3cc54c633c8ba2cb768599236231b707ad2550d9)

### Deploy your own contracts

- If you already have a private key encripted with cast run
```bash
make deploy-sepolia ARGS="--network sepolia"
```
If not then follo the next steps to do it
- Import the wallet
```bash
cast wallet import <account_name> --interactive
```
Where `<account_name>` will be the name for your new account. Follow the steps in the terminal, this will be the only time you'll have to paste your private key somewhere

- You can verify your wallets with
```bash
cast wallet list
```

- Now you can run any script with
```bash
forge script <script_path:contract_name> --rpc-url <rpc_url> --account <account_name> --sender <address_from_private_key> --broadcast
```

> [!IMPORTANT]
> Don't forget your password

> [!CAUTION]
> Never expose private keys with real funds

[top](#avoid-big-loops)

## :dart: Requests

The requests are still WIP as they dont work as expected yet. For the moment it only adds four elements of the array, right now it is set to add the numbers from indexes 996, 997, 998, 999. This would be `996+997+998+999=3990` you can check in arbiscan sepolia the value of `s_lastResponse` this one is in bytes. If you have foundry can easily convert this bytes value in the terminal with 

```bash
cast to-dec 0x0000000000000000000000000000000000000000000000000000000000000f96
```

And you'll confirm the value is the correct one

### Scripts

The request is made with the script from `script/functions/request.js` and the code that runs it is on `sript/functions/addArrayElements.js`

```bash
node script/functions/request.js
```
> [!NOTE]
> If you deploy new contracts remember to create a subscription, fund it and add the consumer

[top](#avoid-big-loops)



