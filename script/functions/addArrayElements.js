const { ethers } = require("ethers")
const { abi } = require("./utils/unboundContractAbi.json")

console.log("Adding array elements from contract example")

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // todo: change

const unboundLoopContract = ethers.getContractAt(abi, contractAddress)

let total = 0

const arrayLength = await unboundLoopContract.getArrayLength()

for (let i = 0; i < arrayLength; i++) {
    const result = await unboundLoopContract.add(i)
    total += result
}

console.log("Total: ", total)

return Functions.encodeUint256(total)
