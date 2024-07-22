// Imports
const ethers = await import("npm:ethers@6.13.1")

// Constants
const RPC_URL = "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"
const CONTRACT_ADDRESS = "0x96D3c43893f79F4Ae543A7297b0378Cb15746d83"

// Requires are not supported so the ABI must be inlined in the script.
const abi = [
    {
        type: "function",
        name: "indexId",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "s_hugeMapping",
        inputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
        outputs: [{ name: "value", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
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

console.log("Getting contract")
const unboundLoopContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

let total

const lastIndex = await unboundLoopContract.indexId()
console.log("Last index: ", lastIndex)

for (let i = 996; i < lastIndex; i++) {
    const result = await unboundLoopContract.s_hugeMapping(i)
    console.log("Element ", i, ": ", result)
    if (total === undefined) {
        total = result
    } else {
        total = BigInt(total) + result
    }
}

console.log("Total: ", BigInt(total))

return Functions.encodeUint256(total)
