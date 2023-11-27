import { ethers } from "hardhat";

export async function deployMocks() {
    const [signer] = await ethers.getSigners();
    const weth = await ethers.deployContract("WETH9");

    await signer.sendTransaction({
        value: ethers.parseEther("0.001"),
        to: await weth.getAddress(),
    });

    return { weth };
}
