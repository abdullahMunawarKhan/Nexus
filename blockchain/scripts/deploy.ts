import hre from "hardhat";

const UGF_TOKEN_ADDRESS = "0x27DC1C167AeF232bb1e21073304B526726a8727e";

async function main() {
  const network = await hre.network.getOrCreate();
  const { ethers } = network;

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Option 1: Use official TYI_MOCK_USD (recommended for hackathon/UGF)
  // Option 2: Deploy custom MockUSD (for local testing)
  let donationTokenAddress;
  let tokenType;

  // On Base Sepolia, use the official UGF token by default.
  // On local networks, deploy MockUSD unless the address is explicitly overridden.
  const configuredMockUsdAddress = process.env.TYI_MOCK_USD_ADDRESS?.trim();
  const useLocalMock = hre.network.name === "hardhat" || hre.network.name === "localhost";

  if (useLocalMock && !configuredMockUsdAddress) {
    const MockUSD = await ethers.getContractFactory("MockUSD");
    const mockUSD = await MockUSD.deploy();
    await mockUSD.waitForDeployment();
    donationTokenAddress = await mockUSD.getAddress();
    tokenType = "Custom MockUSD";
    console.log("Custom MockUSD deployed to:", donationTokenAddress);
  } else {
    donationTokenAddress = configuredMockUsdAddress || UGF_TOKEN_ADDRESS;
    tokenType = "TYI_MOCK_USD";
    console.log("Using TYI_MOCK_USD at:", donationTokenAddress);
  }

  // Deploy Donation
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy(donationTokenAddress);
  await donation.waitForDeployment();
  const donationAddress = await donation.getAddress();
  console.log("Donation deployed to:", donationAddress);

  console.log("\nDeployment complete!");
  console.log("Token used:", tokenType);
  console.log("Token address:", donationTokenAddress);
  console.log("Donation address:", donationAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
