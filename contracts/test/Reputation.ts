import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Reputation", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo, userThree] = await ethers.getSigners();
    // Deploy reputation contract
    const reputationContractFactory = await ethers.getContractFactory(
      "Reputation"
    );
    const reputationContract = await reputationContractFactory.deploy();
    // Return data
    return {
      deployer,
      userOne,
      userTwo,
      userThree,
      reputationContract,
    };
  }

  it("Should support the main flow", async function () {
    const { userOne, userTwo, userThree, reputationContract } =
      await loadFixture(initFixture);
    // Create and check reputation
    expect(await reputationContract.balanceOf(userOne)).to.be.equal(0);
    await expect(reputationContract.connect(userOne).create()).to.be.not
      .reverted;
    await expect(reputationContract.connect(userOne).create()).to.be.reverted;
    expect(await reputationContract.balanceOf(userOne)).to.be.equal(1);
    // Post statements
    await expect(
      reputationContract
        .connect(userTwo)
        .postStatement(userOne, 0, 5, "ipfs://statement-1")
    ).to.be.not.reverted;
    await expect(
      reputationContract
        .connect(userThree)
        .postStatement(userOne, 1, 3, "ipfs://statement-2")
    ).to.be.not.reverted;
    const statements = await reputationContract.getStatements(userOne);
    expect(statements.length).to.be.equal(2);
  });
});
