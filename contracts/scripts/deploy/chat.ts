import { ethers } from "hardhat";

async function main() {
  console.log("👟 Start to deploy chat contract");
  const contract = await ethers.deployContract("Chat");
  await contract.waitForDeployment();
  console.log(`✅ Chat contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
