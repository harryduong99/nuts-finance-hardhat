import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { randomBytes } from "crypto";
import { ethers } from "hardhat";

describe("Storage", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Storage = await ethers.getContractFactory("NUTS_storage");
    const storage = await Storage.deploy();

    return { storage, owner, otherAccount };
  }

  describe("addAuthUser", () => {
    let randomAddress: string;
    beforeEach(() => {
      randomAddress = ethers.Wallet.createRandom().address;
    });

    it("Should add auth user to the existing list of auth user", async function () {
      const { storage } = await loadFixture(deployContractFixture);
      await storage.addAuthUser(randomAddress);

      // authUsers is defined as public then solidity will assign a getter function for it
      const authUser = await storage.authUsers(0);
      await expect(authUser).to.equal(randomAddress);
    });
  });

  describe("setImportant", () => {
    describe("onlyAuthUsers validation FAILED", () => {
      describe("When the list of authorized uses is empty", () => {
        it("Should revert with the right error", async function () {
          const { storage } = await loadFixture(deployContractFixture);
          // not calling the addAuthUser function
          await expect(
            storage.setImportant(randomBytes(32))
          ).to.be.revertedWith("NUTS: User is not authorized!");
        });
      });

      describe("When the list of authorized users is not empty", () => {
        it("Should revert with the right error if caller is not authUser", async function () {
          const { storage, owner, otherAccount } = await loadFixture(
            deployContractFixture
          );
          await storage.addAuthUser(owner.address);

          await expect(
            storage.connect(otherAccount).setImportant(randomBytes(32))
          ).to.be.revertedWith("NUTS: User is not authorized!");
        });
      });
    });

    describe("onlyAuthUsers validation SUCCESS", () => {
      it("should set the important state variable", async () => {
        const { storage, owner } = await loadFixture(deployContractFixture);
        await storage.addAuthUser(owner.address);

        await storage.setImportant(randomBytes(32));
        // the `important` state is set as private, then it is unable to access it from outside
        // as far as I know, we can verify this if the contract has a `get` method for `important` state
        // but is this the whole contract? or Azat just gave me a piece of it?
        // I just temporarily leave this case here, modifying the functionality is definitely not the way to write unit test.
      });
    });
  });
});
