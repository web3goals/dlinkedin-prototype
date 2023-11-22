import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network",
      chainId: 4201,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
