// for updating individual value of the code 
const Web3 = require('web3');

// contract related details 
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
const interface_2_contract = new web3.eth.Contract(contract_abi, contractAddress);

const updateValueInContract = async (valueType, value, publicAddress, privateKey) => {
    console.log(`value type is: ${ valueType }, value is: ${ value }, and public address is: ${publicAddress}`);

    switch (valueType) {
        case 'email':
            // run to create a transcation to set up new value 
            const encodedFunctionCallEmail = interface_2_contract.methods.updateEmail(publicAddress, value).encodeABI();
            const transcationObjectEmail = {
                from: publicAddress,
                to: contractAddress,
                data: encodedFunctionCallEmail
            }
            web3.eth.estimateGas(transcationObjectEmail)
                .then(gasEstimate => {
                    transcationObjectEmail.gas = gasEstimate;
                    return web3.eth.getGasPrice();
                })
                .then(gasPrice => {
                    transcationObjectEmail.gasPrice = gasPrice;
                    return web3.eth.accounts.signTransaction(transcationObjectEmail, privateKey);
                })
                .then(signedTx => {
                    console.log(`signed transaction: ${signedTx}`);
                    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                })
                .then(receipt => {
                    console.log('Transaction receipt:', receipt);
                    return { status: 200, message: 'Value updated successfully' };
                })
                .catch(error => {
                    console.error('Error sending transaction:', error);
                    return { status: 400, message: 'Failed to update value' };
                });
            break;
        case 'fullName':
            // run to create a transcation to set up new value 
            const encodedFunctionCallFullName = interface_2_contract.methods.updateUsername(publicAddress, value).encodeABI();
            const transcationObjectFullName = {
                from: publicAddress,
                to: contractAddress,
                data: encodedFunctionCallFullName
            }
            web3.eth.estimateGas(transcationObjectFullName)
                .then(gasEstimate => {
                    transcationObjectFullName.gas = gasEstimate;
                    return web3.eth.getGasPrice();
                })
                .then(gasPrice => {
                    transcationObjectFullName.gasPrice = gasPrice;
                    return web3.eth.accounts.signTransaction(transcationObjectFullName, privateKey);
                })
                .then(signedTx => {
                    console.log(`signed transaction: ${signedTx}`);
                    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                })
                .then(receipt => {
                    console.log('Transaction receipt:', receipt);
                    return { status: 200, message: 'Value updated successfully' };
                })
                .catch(error => {
                    console.error('Error sending transaction:', error);
                    return { status: 400, message: 'Failed to update value' };
                });
            break;
        
        case 'contact':
            // run to create a transcation to set up new value 
            const encodedFunctionCallContact = interface_2_contract.methods.updateContact(publicAddress, value).encodeABI();
            const transcationObjectContact = {
                from: publicAddress,
                to: contractAddress,
                data: encodedFunctionCallContact
            }
            web3.eth.estimateGas(transcationObjectContact)
                .then(gasEstimate => {
                    transcationObjectContact.gas = gasEstimate;
                    return web3.eth.getGasPrice();
                })
                .then(gasPrice => {
                    transcationObjectContact.gasPrice = gasPrice;
                    return web3.eth.accounts.signTransaction(transcationObjectContact, privateKey);
                })
                .then(signedTx => {
                    console.log(`signed transaction: ${signedTx}`);
                    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                })
                .then(receipt => {
                    console.log('Transaction receipt:', receipt);
                    return { status: 200, message: 'Value updated successfully' };

                })
                .catch(error => {
                    console.error('Error sending transaction:', error);
                    return { status: 400, message: 'Failed to update value' };
                });
            break;

        case 'dob':
            // run to create a transcation to set up new value 
            const encodedFunctionCallDob = interface_2_contract.methods.updateDOB(publicAddress, value).encodeABI();
            const transcationObjectDob = {
                from: publicAddress,
                to: contractAddress,
                data: encodedFunctionCallDob
            }
            web3.eth.estimateGas(transcationObjectDob)
                .then(gasEstimate => {
                    transcationObjectDob.gas = gasEstimate;
                    return web3.eth.getGasPrice();
                })
                .then(gasPrice => {
                    transcationObjectDob.gasPrice = gasPrice;
                    return web3.eth.accounts.signTransaction(transcationObjectDob, privateKey);
                })
                .then(signedTx => {
                    console.log(`signed transaction: ${signedTx}`);
                    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                })
                .then(receipt => {
                    console.log('Transaction receipt:', receipt);
                    return { status: 200, message: 'Value updated successfully' };

                })
                .catch(error => {
                    console.error('Error sending transaction:', error);
                    return { status: 400, message: 'Failed to update value' };
                });

            break;
    }
}

module.exports = {
    updateValueInContract
}