import { ethers, upgrades } from "hardhat";
import { deployMocks } from "./mocks/deploy";

async function main() {
    const [signer] = await ethers.getSigners();
    const { router } = await deployMocks();
    const routerAddress = await router.getAddress();
    const verifier = "0x2ff010DEbC1297f19579B4246cad07bd24F2488A";
    const linkToken = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";

    const feedsId = [
        "0x00021c125c52db1459181038e065de71e67ec57f45f5da7d3197758a57b6ed20",
        "0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0",
    ];

    const Consumer = await ethers.getContractFactory("DataStreamsConsumer");
    const consumer = await upgrades.deployProxy(
        Consumer,
        [routerAddress, verifier, linkToken, feedsId],
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
