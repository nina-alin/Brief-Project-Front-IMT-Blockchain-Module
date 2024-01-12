import { ethers } from "hardhat";

async function main() {
  const token = await ethers.deployContract("Voting");

  await token.waitForDeployment();

  console.log(`Contract deployed to ${token.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
