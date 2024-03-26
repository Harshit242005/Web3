const Web3 = require('web3');

// Create a new instance of Web3
const web3 = new Web3();
// defining the function for the calling 
const checkKeys = (PublicKey, privateKey) => {
    // Convert the private key to an account object
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    return account.address == PublicKey;
}

export default checkKeys