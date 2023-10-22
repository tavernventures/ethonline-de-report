import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    console.log("Deploying DeReport...");
    const nftMarket = await NFTMarket.deploy();

    await nftMarket.deployed();

    console.log("NFTMarket contract deployed to:", nftMarket.address);

    // Add more debugging information
    console.log("Transaction hash:", nftMarket.deployTransaction.hash);
    // console.log("Gas used for deployment:", deReport.deployTransaction.gasUsed.toString());

    fs.writeFileSync('./config.ts', `
    export const stakingAddress = "${nftMarket.address}"
    `);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});