import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.19",
            },
            {
                version: "0.8.16",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    networks: {
        hardhat: {
            chainId: 421614,
            forking: {
                url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
            },
        },
        sepolia: {
            chainId: 421614,
            url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
            accounts: [process.env.PRIVATE_KEY || ""],
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
