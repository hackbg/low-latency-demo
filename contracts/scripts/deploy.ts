import { ethers, upgrades } from "hardhat";
import { deployMocks } from "./mocks/deploy";
import { networkConfig } from "../helper_hardhat_config";

async function main() {
    const [signer] = await ethers.getSigners();
    const { router } = await deployMocks();
    const routerAddress = await router.getAddress();
    const { verifier, link, feedsId } = networkConfig[421614];

    const Consumer = await ethers.getContractFactory("DataStreamsConsumer");
    const consumer = await upgrades.deployProxy(
        Consumer,
        [routerAddress, verifier, link, Object.values(feedsId)],
        { initializer: "initializer" }
    );
    await consumer.waitForDeployment();

    console.log("Consumer:");
    console.log(await consumer.getAddress());

    await signer.sendTransaction({
        value: ethers.parseEther("0.001"),
        to: await consumer.getAddress(),
    });

    console.log(`sent 0.001 ethers to consumer`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
