import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const DeReport = await hre.ethers.getContractFactory("DeReport");
    console.log("Deploying DeReport...");
    const deReport = await DeReport.deploy();

    await deReport.deployed();

    console.log("DeReport contract deployed to:", deReport.address);

    // Add more debugging information
    console.log("Transaction hash:", deReport.deployTransaction.hash);
    // console.log("Gas used for deployment:", deReport.deployTransaction.gasUsed.toString());

    fs.writeFileSync('./config.ts', `
    export const stakingAddress = "${deReport.address}"
    `);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

