import "@nomicfoundation/hardhat-toolbox";
// import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/types";

const GOERLI_URL = process.env.GOERLI_URL as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY as string;

interface MyHardhatConfig extends HardhatUserConfig {
  etherscan: {
    apiKey: string;
  };
}

const config: MyHardhatConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};

export default config;
