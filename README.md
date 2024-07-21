# Avoid big loops
This project is a test to avoid big loops in solidity using Chainlink Functions. <br/>

- [Avoid big loops](#avoid-big-loops)
  - [:rocket: Walkthrough](#rocket-walkthrough)
  - [Requirements](#requirements)
    - [For the smart contracts](#for-the-smart-contracts)
    - [For the Chainlink Functions simulations](#for-the-chainlink-functions-simulations)
    - [Usage](#usage)
  - [:books: Deployed contracts](#books-deployed-contracts)
    - [Deploy your own contracts](#deploy-your-own-contracts)
  - [:dart: Simulations](#dart-simulations)

## :rocket: Walkthrough 

## Requirements

### For the smart contracts

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [foundry](https://getfoundry.sh/)
  - Run
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  ```
  - You'll know you did it right if you can run `forge --version` and you see a response like `forge 0.2.0 (816e00b 2023-03-16T00:05:26.396218Z)`

[top](#avoid-big-loops)

### For the Chainlink Functions simulations
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

## :books: Deployed contracts

The nexts are deployed in arb sepolia
[UnboundedLoop](https://sepolia.arbiscan.io/address/0x1c013307389e8ab246bbe53f743e58bb3d40a627)
[ComputationConsumer](https://sepolia.arbiscan.io/address/0x3cc54c633c8ba2cb768599236231b707ad2550d9)

[top](#avoid-big-loops)

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

## :dart: Simulations

The simulations are still WIP as they dont work yet

```bash
node script/functions/request.js
```

[top](#avoid-big-loops)

