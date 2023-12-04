import { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json";
import { deployMocks } from "./mocks/deploy";
import { networkConfig } from "../helper_hardhat_config";

async function main() {
    const [signer] = await ethers.getSigners();
    const { proxy, verifier, link, feedsId, router } = networkConfig[421614];

    const consumer = new ethers.Contract(proxy, abi, signer);

    await consumer.initializer(router, verifier, link, Object.values(feedsId));
    console.log("Successfully initialized");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
