// Imports
const ethers = await import("npm:ethers@6.13.1")

// Constants
const RPC_URL = "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"
const CONTRACT_ADDRESS = "0x1c013307389e8aB246bbE53F743e58Bb3d40a627"

// Requires are not supported so the ABI must be inlined in the script.
const abi = [
    {
        inputs: [
            { internalType: "uint256", name: "index", type: "uint256" },
            { internalType: "uint256", name: "maxLength", type: "uint256" },
        ],
        name: "IndexOutOfBounds",
        type: "error",
    },
    {
        inputs: [
            { internalType: "uint256", name: "x", type: "uint256" },
            { internalType: "uint256", name: "y", type: "uint256" },
        ],
        name: "fill",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getArrayLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "s_hugeArray",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "sum",
        outputs: [{ internalType: "uint256", name: "s", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
]

// Chainlink Functions compatible Ethers JSON RPC provider class
// (this is required for making Ethers RPC calls with Chainlink Functions)
class FunctionsJsonRpcProvider extends ethers.JsonRpcProvider {
    constructor(url) {
        super(url)
        this.url = url
    }

    async _send(payload) {
        let resp = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        return resp.json()
    }
}

console.log("Adding array elements from contract example")

const provider = new FunctionsJsonRpcProvider(RPC_URL)
// const dataFeedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

console.log("Getting contract")
const unboundLoopContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

let total

const arrayLength = await unboundLoopContract.getArrayLength()
console.log("Array length: ", arrayLength)

for (let i = 996; i < 1000; i++) {
    const result = await unboundLoopContract.s_hugeArray(i)
    console.log("Element ", i, ": ", result)
    if (total === undefined) {
        total = result
    } else {
        total = BigInt(total) + result
    }
}

console.log("Total: ", BigInt(total))

return Functions.encodeUint256(total)
