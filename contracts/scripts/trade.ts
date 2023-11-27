import { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json";
import { deployMocks } from "./mocks";

async function main() {
    const [signer] = await ethers.getSigners();
    const proxyAddress = "0xcB2c15CEe8309A2442a1b0B35c475e1531C4CFE4";
    const avaxAddress = "0x586A52Ca64f75b49a72e4CaEf5B91374257e1538";
    const usdc = "0x8fb1e3fc51f3b789ded7557e680551d93ea9d892";

    const feedsId = {
        "weth-usdc":
            "0x00029584363bcf642315133c335b3646513c20f049602fc7d933be0d3f6360d3",
        "avax-usdc":
            "0x0002c407f448ffe50a15fd5f1ffe4791830c5f8fa39cd971a3d6ae337aef51a0",
    };

    const consumer = new ethers.Contract(proxyAddress, abi, signer);
    const amountIn = ethers.parseEther("0.001");

    // Trade WETH <> USDC
    const { weth } = await deployMocks();
    const wethAddress = await weth.getAddress();

    await weth.approve(await consumer.getAddress(), amountIn);
    await consumer.trade(wethAddress, usdc, amountIn, feedsId["weth-usdc"]);
    console.log("Successfully traded WETH tokens for USDC");

    // Trade AVAX <> USDC
    const avax = await ethers.getContractAt("IERC20", avaxAddress);

    await avax.approve(await consumer.getAddress(), amountIn);
    await consumer.trade(avaxAddress, usdc, amountIn, feedsId["avax-usdc"]);
    console.log("Successfully traded AVAX tokens for USDC");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
