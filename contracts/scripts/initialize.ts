import { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json";
import { deployMocks } from "./mocks/deploy";

async function main() {
    const [signer] = await ethers.getSigners();
    const proxyAddress = "0xcB2c15CEe8309A2442a1b0B35c475e1531C4CFE4";
    const { router } = await deployMocks();
    const verifier = "0x2ff010DEbC1297f19579B4246cad07bd24F2488A";
    const linkToken = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";

    const feedsId = [
        "0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3",
        "0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0",
    ];

    const consumer = new ethers.Contract(proxyAddress, abi, signer);

    await consumer.initializer(router, verifier, linkToken, feedsId);
    console.log("Successfully initialized");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
