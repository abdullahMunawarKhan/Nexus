const hre = require("hardhat");

async function main() {
  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();

  await donation.waitForDeployment();

  console.log("Donation deployed to:", await donation.getAddress());

  const NGORegistry = await hre.ethers.getContractFactory("NGORegistry");
  const ngoRegistry = await NGORegistry.deploy();

  await ngoRegistry.waitForDeployment();

  console.log("NGORegistry deployed to:", await ngoRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});