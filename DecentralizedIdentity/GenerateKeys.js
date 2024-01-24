// generating keys for the user email
// public and private key
const { Wallet } = require('ethers');

// Function to generate Ethereum-like key pair
function generateEthereumKeyPair() {
  const wallet = Wallet.createRandom();

  const privateKey = wallet.privateKey; // Hex string
  const publicKey = wallet.address; // Hex string

  return {
    privateKey,
    publicKey,
  };
}
