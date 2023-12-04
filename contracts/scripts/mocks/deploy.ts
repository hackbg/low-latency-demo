import { ethers } from "hardhat";

export async function deployMocks() {
    const [signer] = await ethers.getSigners();

    // DEPLOY WETH AND RECEIVE WETH
    const weth = await ethers.deployContract("WETH9");

    await signer.sendTransaction({
        value: ethers.parseEther("0.001"),
        to: await weth.getAddress(),
    });

    // DEPLOY USDC AND MINT
    const usdc = await ethers.deployContract("FiatTokenV1");

    await usdc.initialize(
        "USDC",
        "USDC",
        "USD",
        6,
        signer,
        signer,
        signer,
        signer
    );

    await usdc.configureMinter(signer, 1_000_000_000_000);
    await usdc.mint(signer, BigInt(1_000));

    // DEPLOY AVAX and receice

    const avax = await ethers.deployContract("WAVAX");
    await signer.sendTransaction({
        value: ethers.parseEther("0.001"),
        to: await avax.getAddress(),
    });

    const router = await ethers.deployContract("UniswapRouter");

    return { weth, usdc, avax, router };
}
