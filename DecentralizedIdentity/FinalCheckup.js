// final status checkup

// Initial checkup for the web3 for the first stage function 
const Web3 = require('web3');


// getting connected with the remote node to access the contracts
const web3 = new Web3('http://localhost:7545');

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
const contractAddress = "0x86EBc25f04514Bd8f3Dd8c9a8253Dba583B16385";

const contract = new web3.eth.Contract(contractABI, contractAddress);

// calling up the function
async function checkPrivateKeyExists(privateKey) {
    try {
        const test = privateKey.toString();
        console.log(typeof test);
        // Call the InitialCheckEmailMapping function
        const result = await contract.methods.FinalCheckEmailMapping(privateKey.toString()).call();
        console.log(`check final mapping result value is ${result}`);
        // Return the result
        return result;
    } catch (error) {
        // Handle errors
        console.error('Error checking email:', error);
        throw error; // Rethrow the error if needed
    }
}
module.exports = checkPrivateKeyExists;