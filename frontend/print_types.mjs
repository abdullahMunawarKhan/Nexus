import { JsonRpcProvider, Contract } from 'ethers';

async function run() {
  const provider = new JsonRpcProvider('https://sepolia.base.org');
  const tokenAddress = '0x27DC1C167AeF232bb1e21073304B526726a8727e';
  const abi = [
    'function nonces(address owner) view returns (uint256)'
  ];
  const contract = new Contract(tokenAddress, abi, provider);
  
  try {
    const nonce = await contract.nonces('0x1234567890123456789012345678901234567890');
    console.log("Token nonces():", nonce.toString());
  } catch(e) { console.error("nonces err", e.message) }
}
run();
