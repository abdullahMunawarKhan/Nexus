const { expect } = require("chai");

describe("Donation Contract", function () {
  it("Should accept donations", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();

    await donation.waitForDeployment();

    await donation.donate("Helping children", {
      value: ethers.parseEther("1")
    });

    expect(await donation.totalDonations())
      .to.equal(ethers.parseEther("1"));
  });
});