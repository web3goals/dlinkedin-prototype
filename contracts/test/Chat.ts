import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Chat", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo, userThree] = await ethers.getSigners();
    // Deploy chat contract
    const chatContractFactory = await ethers.getContractFactory("Chat");
    const chatContract = await chatContractFactory.deploy();
    // Return data
    return {
      deployer,
      userOne,
      userTwo,
      userThree,
      chatContract,
    };
  }

  it("Should support the main flow", async function () {
    const { userOne, userTwo, userThree, chatContract } = await loadFixture(
      initFixture
    );
    // Send messages
    await expect(
      chatContract.connect(userOne).postMessage(userTwo, "ipfs://message-1")
    ).to.be.not.reverted;
    await expect(
      chatContract.connect(userOne).postMessage(userTwo, "ipfs://message-2")
    ).to.be.not.reverted;
    await expect(
      chatContract.connect(userOne).postMessage(userThree, "ipfs://message-3")
    ).to.be.not.reverted;
    await expect(
      chatContract.connect(userTwo).postMessage(userOne, "ipfs://message-4")
    ).to.be.not.reverted;
    // Check conversations
    expect(
      (await chatContract.connect(userOne).getConversationIds()).length
    ).to.be.equal(2);
    expect(
      (await chatContract.connect(userTwo).getConversationIds()).length
    ).to.be.equal(1);
    expect(
      (await chatContract.connect(userThree).getConversationIds()).length
    ).to.be.equal(1);
  });
});
