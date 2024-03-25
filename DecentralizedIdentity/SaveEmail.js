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


// const contractAddress = '0xc270f6f59c2c56ede636669ca6d6e27255b35e8e';
const contractAddress = '0x86EBc25f04514Bd8f3Dd8c9a8253Dba583B16385';

const web3 = new Web3('http://localhost:7545'); 

// Create a contract instance
const myContract = new web3.eth.Contract(contractABI, contractAddress);

const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7'

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