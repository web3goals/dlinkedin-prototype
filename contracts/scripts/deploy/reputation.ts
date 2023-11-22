import { ethers } from "hardhat";

async function main() {
  console.log("👟 Start to deploy reputation contract");
  const contract = await ethers.deployContract("Reputation");
  await contract.waitForDeployment();
  console.log(`✅ Reputation contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
