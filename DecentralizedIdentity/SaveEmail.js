// function to save up the email 
const Web3 = require('web3');
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "CheckEmail",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "privateKey",
                "type": "string"
            }
        ],
        "name": "FinalCheckEmailMapping",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "InitialCheckEmailMapping",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "SaveEmail",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "privateKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            }
        ],
        "name": "SaveEmailMapping",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


const contractAddress = '0xc270f6f59c2c56ede636669ca6d6e27255b35e8e';

const web3 = new Web3('https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d'); 

// Create a contract instance
const myContract = new web3.eth.Contract(contractABI, contractAddress);
const privateKeySign = '7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1';
const account_address = '0x5780326e9F221afd01253C954b453ccCf4f2F30E'

function SaveEmailPrivateKey(privateKeyParam, emailParam) {
    // Encode the function call
    const encodedFunctionCall = myContract.methods.SaveEmailMapping(privateKeyParam, emailParam).encodeABI();
    const transactionObject = {
        from: account_address, 
        to: contractAddress,
        data: encodedFunctionCall,
    };

    // Dynamically estimate gas
    web3.eth.estimateGas(transactionObject)
        .then(gasEstimate => {
            // Adjust the gas limit as needed
            transactionObject.gas = gasEstimate;

            // Dynamically get gas price
            return web3.eth.getGasPrice();
        })
        .then(gasPrice => {
            // Replace with the dynamic gas price in wei
            transactionObject.gasPrice = gasPrice;

            // Sign the transaction
            return web3.eth.accounts.signTransaction(transactionObject, privateKeySign);
        })
        .then(signedTx => {
            // writing off the signed transcations
            console.log(`signed transaction: ${signedTx}`);
            // Send the signed transaction
            return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        })
        .then(receipt => {
            console.log('Transaction receipt:', receipt);
            return true;
        })
        .catch(error => {
            console.error('Error sending transaction:', error);
            return false;
        });
}


module.exports = {
    SaveEmailPrivateKey
}