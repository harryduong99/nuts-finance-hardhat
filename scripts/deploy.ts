import { ethers } from "hardhat";

async function main() {
  const Storage = await ethers.getContractFactory("NUTS_storage");
  const storage = await Storage.deploy();

  await storage.deployed();

  console.log(
    `NUTS_storage is deployed`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
