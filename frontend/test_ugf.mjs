import { UGFClient, BASE_SEPOLIA_CHAIN_ID, TYI_USD_PAYMENT_COIN } from '@tychilabs/ugf-testnet-js';
import { JsonRpcProvider, Wallet } from 'ethers';

const originalFetch = global.fetch;
global.fetch = async (url, options) => {
  if (url.includes('/payment/submit')) {
    console.log("PAYMENT SUBMIT PAYLOAD:", options.body);
  }
  const res = await originalFetch(url, options);
  const clone = res.clone();
  const text = await clone.text();
  console.log(`RESPONSE ${url}: ${res.status} ${text}`);
  return res;
};

async function run() {
  try {
    const provider = new JsonRpcProvider('https://sepolia.base.org');
    const signer = new Wallet('0x71bb85cb0ab8f2de71d4234ea70783c278a3b63a86455ebc10b4df68008b4ebd').connect(provider);
    
    const client = new UGFClient();
    await client.auth.login(signer);
    
    console.log("Logged in as", signer.address);
    
    const txObject = JSON.stringify({
      from: signer.address,
      to: '0x1234567890123456789012345678901234567890',
      value: '0',
      data: '0x'
    });
    
    const quote = await client.quote.get({
      payment_coin: TYI_USD_PAYMENT_COIN,
      payer_address: signer.address,
      payment_chain: BASE_SEPOLIA_CHAIN_ID,
      payment_chain_type: "evm",
      tx_object: txObject,
      dest_chain_id: BASE_SEPOLIA_CHAIN_ID,
      dest_chain_type: "evm",
    });
    
    await client.payment.x402.signAndSubmit(quote, signer, provider);
    console.log("Paid successfully!");
  } catch (err) {
    //
  }
}
run();
