const fs = require("fs")
const path = require("path")
const {
    SubscriptionManager,
    simulateScript,
    ResponseListener,
    ReturnType,
    decodeResult,
    FulfillmentCode,
} = require("@chainlink/functions-toolkit")
const functionsConsumerAbi = require("./utils/computationContractAbi.json")
const { ethers } = require("ethers")
require("dotenv").config()

const consumerAddress = "0x3cC54C633C8bA2cB768599236231B707aD2550D9"
const subscriptionId = 123

const makeRequest = async () => {
    // hardcoded for Ethereum Sepolia
    const routerAddress = "0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C"
    const linkTokenAddress = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E"
    const donId = "fun-arbitrum-sepolia-1"
    const explorerUrl = "https://sepolia.arbiscan.io/"

    // Initialize functions settings
    const source = fs.readFileSync(path.resolve(__dirname, "addArrayElements.js")).toString()

    const args = []
    const gasLimit = 300000

    // Initialize ethers signer and provider to interact with the contracts onchain
    const privateKey = process.env.TESTNET_DEPLOYER_PK // fetch PRIVATE_KEY
    if (!privateKey) throw new Error("private key not provided - check your environment variables")

    const rpcUrl = "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"

    if (!rpcUrl) throw new Error(`rpcUrl not provided  - check your environment variables`)

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

    // const wallet = new ethers.Wallet(privateKey)
    const signer = new ethers.Wallet(privateKey, provider) // create ethers signer for signing transactions

    // const signer = wallet.connect(provider) // create ethers signer for signing transactions

    ///////// START SIMULATION ////////////

    console.log("Start simulation...")

    const response = await simulateScript({
        source: source,
        args: args,
        bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
        secrets: {}, // no secrets needed // todo: check how to add secrets
    })

    console.log("Simulation result", response)
    const errorString = response.errorString
    if (errorString) {
        console.log(`❌ Error during simulation: `, errorString)
    } else {
        const returnType = ReturnType.uint256
        const responseBytesHexstring = response.responseBytesHexstring
        if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
            const decodedResponse = decodeResult(response.responseBytesHexstring, returnType)
            console.log(`✅ Decoded response to ${returnType}: `, decodedResponse)
        }
    }

    //////// ESTIMATE REQUEST COSTS ////////
    console.log("\nEstimate request costs...")
    // Initialize and return SubscriptionManager

    const subscriptionManager = new SubscriptionManager({
        signer: signer,
        linkTokenAddress: linkTokenAddress,
        functionsRouterAddress: routerAddress,
    })

    await subscriptionManager.initialize()

    // estimate costs in Juels

    const gasPriceWei = await signer.getGasPrice() // get gasPrice in wei

    const estimatedCostInJuels = await subscriptionManager.estimateFunctionsRequestCost({
        donId: donId, // ID of the DON to which the Functions request will be sent
        subscriptionId: subscriptionId, // Subscription ID
        callbackGasLimit: gasLimit, // Total gas used by the consumer contract's callback
        gasPriceWei: BigInt(gasPriceWei), // Gas price in gWei
    })

    console.log(
        `Fulfillment cost estimated to ${ethers.utils.formatEther(estimatedCostInJuels)} LINK`
    )

    //////// MAKE REQUEST ////////

    // console.log("\nMake request...")

    // const functionsConsumer = new ethers.Contract(consumerAddress, functionsConsumerAbi, signer)

    // // Actual transaction call
    // const transaction = await functionsConsumer.sendRequest(
    //     source, // source
    //     "0x", // user hosted secrets - encryptedSecretsUrls
    //     0, // don hosted secrets - slot ID
    //     0, // don hosted secrets - version
    //     args,
    //     [], // bytesArgs - arguments can be encoded off-chain to bytes.
    //     subscriptionId,
    //     gasLimit,
    //     ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
    // )

    // // Log transaction details
    // console.log(
    //     `\n✅ Functions request sent! Transaction hash ${transaction.hash}. Waiting for a response...`
    // )

    // console.log(`See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`)

    // const responseListener = new ResponseListener({
    //     provider: provider,
    //     functionsRouterAddress: routerAddress,
    // }) // Instantiate a ResponseListener object to wait for fulfillment.
    // ;(async () => {
    //     try {
    //         const response = await new Promise((resolve, reject) => {
    //             responseListener
    //                 .listenForResponseFromTransaction(transaction.hash)
    //                 .then((response) => {
    //                     resolve(response) // Resolves once the request has been fulfilled.
    //                 })
    //                 .catch((error) => {
    //                     reject(error) // Indicate that an error occurred while waiting for fulfillment.
    //                 })
    //         })

    //         const fulfillmentCode = response.fulfillmentCode

    //         if (fulfillmentCode === FulfillmentCode.FULFILLED) {
    //             console.log(
    //                 `\n✅ Request ${
    //                     response.requestId
    //                 } successfully fulfilled. Cost is ${ethers.utils.formatEther(
    //                     response.totalCostInJuels
    //                 )} LINK.Complete reponse: `,
    //                 response
    //             )
    //         } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
    //             console.log(
    //                 `\n⚠️ Request ${
    //                     response.requestId
    //                 } fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
    //                     response.totalCostInJuels
    //                 )} LINK.Complete reponse: `,
    //                 response
    //             )
    //         } else {
    //             console.log(
    //                 `\n❌ Request ${
    //                     response.requestId
    //                 } not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
    //                     response.totalCostInJuels
    //                 )} LINK.Complete reponse: `,
    //                 response
    //             )
    //         }

    //         const errorString = response.errorString
    //         if (errorString) {
    //             console.log(`\n❌ Error during the execution: `, errorString)
    //         } else {
    //             const responseBytesHexstring = response.responseBytesHexstring
    //             if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
    //                 const decodedResponse = decodeResult(
    //                     response.responseBytesHexstring,
    //                     ReturnType.uint256
    //                 )
    //                 console.log(`\n✅ Decoded response to ${ReturnType.uint256}: `, decodedResponse)
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error listening for response:", error)
    //     }
    // })()
}

makeRequest().catch((e) => {
    console.error(e)
    process.exit(1)
})
