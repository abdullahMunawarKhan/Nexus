import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("NexusModule", (m) => {
  // Use official TYI_MOCK_USD address from environment
  const tyiMockUSD = m.getParameter("TYI_MOCK_USD_ADDRESS", "0x4Fabb1bD1b82f2361b4dce217c8F4b3a7A3e4e5a");

  const donation = m.contract("Donation", [tyiMockUSD]);

  return { donation };
});
