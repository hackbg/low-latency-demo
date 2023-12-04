import { ethers } from "hardhat";
import { abi } from "../artifacts/contracts/DataStreamsConsumer.sol/DataStreamsConsumer.json";
import { networkConfig } from "../helper_hardhat_config";

async function main() {
    const [signer] = await ethers.getSigners();
    const { proxy } = networkConfig["421614"];
    const {
        weth: wethAddress,
        avax: avaxAddress,
        usdc,
        feedsId,
    } = networkConfig[421614];
    const weth = await ethers.getContractAt("ERC20", wethAddress);
    const avax = await ethers.getContractAt("ERC20", avaxAddress);

    const consumer = new ethers.Contract(proxy, abi, signer);
    const amountIn = ethers.parseEther("0.001");

    // Trade WETH <> USDC
    await weth.approve(await consumer.getAddress(), amountIn);
    await consumer.trade(wethAddress, usdc, amountIn, feedsId["weth-usdc"]);
    console.log("Successfully traded WETH tokens for USDC");
    // Trade AVAX <> USDC
    await avax.approve(await consumer.getAddress(), amountIn);
    await consumer.trade(avax, usdc, amountIn, feedsId["avax-usdc"]);
    console.log("Successfully traded AVAX tokens for USDC");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
