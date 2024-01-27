// here we would be fecthing details that 
// we have saved in the contract with the help of the inidividual functions

// let's start writing the individual functions for getting each one of the thing and returning them from
// a given main function

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
const contractAddress = "0x415065cC7b943E27982772AcefA172d5E292e149";

// account details that would run this contract functions
// contract remote nodes 
const web3 = new Web3('https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d'); 
// contract instance creation
const interface_2_contract = new web3.eth.Contract(contract_abi, contractAddress);
// account details 
// const privateKeySign = '7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1';
// const account_address = '0x5780326e9F221afd01253C954b453ccCf4f2F30E'

const GetDetails = async (account_address) => {
    try {
        // Get username
        const username = await interface_2_contract.methods.getUsernameByAddress(account_address).call();

        // Get email
        const email = await interface_2_contract.methods.getEmailByAddress(account_address).call();

        // Get date of birth
        const dob = await interface_2_contract.methods.getDOBByAddress(account_address).call();

        // Get contact
        const contact = await interface_2_contract.methods.getContactByAddress(account_address).call();
        console.log('Fetching details')
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Date of Birth:", dob);
        console.log("Contact:", contact);
        
        // Return the values if needed
        return { username, email, dob, contact };
    } catch (error) {
        console.error("Error getting details:", error);
    }
}

module.exports = {
    GetDetails
}