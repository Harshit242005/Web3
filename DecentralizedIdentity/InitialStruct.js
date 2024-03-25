// creating of the initial struct for the user account 
const { futimesSync } = require('fs');
const Web3 = require('web3');

// contract ABI
const contract_abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newContact",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "ContactUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newDOB",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "DOBUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newEmail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "EmailUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newUsername",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "UsernameUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_privateKey",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "getContactByAddress",
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
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "getDOBByAddress",
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
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "getEmailByAddress",
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
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "getUsernameByAddress",
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
				"name": "_privateKey",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "mapPrivateKeyToPublicKey",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "privateKeyToPublicKey",
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
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newContact",
				"type": "string"
			}
		],
		"name": "updateContact",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newDOB",
				"type": "string"
			}
		],
		"name": "updateDOB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newEmail",
				"type": "string"
			}
		],
		"name": "updateEmail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newUsername",
				"type": "string"
			}
		],
		"name": "updateUsername",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "userAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



// address for the contract
const contractAddress = "0x02D943C9389FBEa9aD159d9018981431474c1745";
// contract remote nodes 
const web3 = new Web3('http://localhost:7545'); 
// contract instance creation
const interface_1_contract = new web3.eth.Contract(contract_abi, contractAddress);
// account details 
const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7'

function InitialStruct(publicAddress, email, username, contact, dob, privateKey) {
    // calling the deployed contract function
    const initalStructABI = interface_1_contract.methods.createUser(publicAddress, email, username, contact, dob, privateKey).encodeABI();
    // transaction data and calling contract
    const transactionObject = {
        from: account_address, 
        to: contractAddress,
        data: initalStructABI,
    };

    return new Promise((resolve, reject) => {
        // calling out the function by adding details related to the contract
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
                // Check if the transaction was successful
                if (receipt) {
                    // with the use of the receipt, we would fire some events from the deployed contract address
                    resolve({ status: 200, message: 'User has been created' });
                } else {
                    // Transaction failed, handle error
                    reject({ status: 500, message: 'Transaction failed. Check contract logs for details.' });
                }
            })
            .catch(error => {
                console.error('Error sending transaction:', error);
                // Handle error, and send appropriate status and message
                reject({ status: 500, message: 'Error sending transaction. Check the server logs for details.' });
            });
    });
}

module.exports = {
    InitialStruct
};
