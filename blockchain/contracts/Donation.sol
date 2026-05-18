// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Donation {
    struct DonationRecord {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;
    }

    address public owner;
    uint256 public totalDonations;

    DonationRecord[] public donations;

    event Donated(
        address indexed donor,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function donate(string memory _message) public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(
            DonationRecord(
                msg.sender,
                msg.value,
                block.timestamp,
                _message
            )
        );

        totalDonations += msg.value;

        emit Donated(
            msg.sender,
            msg.value,
            _message,
            block.timestamp
        );
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");

        payable(owner).transfer(address(this).balance);
    }

    function getDonationCount() public view returns (uint256) {
        return donations.length;
    }

    function getDonation(uint256 index)
        public
        view
        returns (
            address,
            uint256,
            uint256,
            string memory
        )
    {
        DonationRecord memory d = donations[index];
        return (d.donor, d.amount, d.timestamp, d.message);
    }
}