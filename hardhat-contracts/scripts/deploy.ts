import { ethers } from "hardhat";
const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const initialOwnerAddress = "0xdc3DE060FF06df185A780124E45a0115f739aFb9";

    const DeReport = await hre.ethers.getContractFactory("DeReport");
    console.log("Deploying DeReport...");
    const deReport = await DeReport.deploy(initialOwnerAddress);

    await deReport.waitForDeployment();

    console.log("DeReport contract deployed to:", deReport.address);

    // Add more debugging information
    console.log("Transaction hash:", deReport.deployTransaction.hash);
    console.log("Gas used for deployment:", deReport.deployTransaction.gasUsed.toString());

    fs.writeFileSync('./config.ts', `
    export const stakingAddress = "${deReport.address}"
    `);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
