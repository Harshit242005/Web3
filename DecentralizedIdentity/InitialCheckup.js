// Initial checkup for the web3 for the first stage function 
const Web3 = require('web3');
require('dotenv').config();

// getting connected with the remote node to access the contracts
const web3 = new Web3('https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d');

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
const contractAddress = "0xc270f6f59C2c56ede636669CA6d6e27255B35E8E";

const contract = new web3.eth.Contract(contractABI, contractAddress);

// calling up the function
async function checkEmailExists(email) {
    try {
        // Call the InitialCheckEmailMapping function
        const result = await contract.methods.InitialCheckEmailMapping(email).call();
        // Return the result
        return result;
    } catch (error) {
        // Handle errors
        console.error('Error checking email:', error);
        throw error; // Rethrow the error if needed
    }
}
module.exports = checkEmailExists;