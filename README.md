# Avoid big loops
This project is a test to avoid big loops in solidity using Chainlink Functions. <br/>

- [Avoid big loops](#avoid-big-loops)
  - [:rocket: Walkthrough](#rocket-walkthrough)
  - [:books: Deployed contracts](#books-deployed-contracts)
  - [:dart: Simulations](#dart-simulations)

## :rocket: Walkthrough 

1. Clone this repo.
```bash
git clone https://github.com/maikelordaz/avoid-looping
cd avoid-looping
code .
```
2. Install the dependencies
```bash
yarn install
make all
```

3. Create an .env file, follow the `.env.example` file: 

[top](#avoid-big-loops)

## :books: Deployed contracts

The nexts are deployed in arb sepolia
[UnboundedLoop](https://sepolia.arbiscan.io/address/0x1c013307389e8ab246bbe53f743e58bb3d40a627)
[ComputationConsumer](https://sepolia.arbiscan.io/address/0x3cc54c633c8ba2cb768599236231b707ad2550d9)

[top](#avoid-big-loops)

## :dart: Simulations

The simulations are still WIP as they dont work yet

```bash
node script/functions/request.js
```

