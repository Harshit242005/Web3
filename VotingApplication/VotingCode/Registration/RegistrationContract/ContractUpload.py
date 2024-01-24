# here we would upload the contract to the testnet using the private key
# deploying a smart contract
from web3 import Web3

# Connect to the Goerli network
sepolia_rpc_url = "https://sepolia.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(sepolia_rpc_url))

# # Replace with your contract's ABI and bytecode
contract_abi = [
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"name": "RegistrationStatusFinalStatus",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"name": "RegistrationStatusInitialStatus",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "SuccessfulLogin",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "loginSuccess",
				"type": "bool"
			}
		],
		"name": "UserLoginAttempt",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "UserPasswordSet",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getUserPassword",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "loginUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phoneNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "setUserPassword",
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
		"name": "userPasswords",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

contract_bytecode = "608060405234801561000f575f80fd5b506115238061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c80631c14ce5e14610064578063a87430ba14610094578063bc191b77146100c9578063bcf26770146100e5578063c9ae6b0114610115578063d6098ed614610145575b5f80fd5b61007e60048036038101906100799190610cf9565b610161565b60405161008b9190610dba565b60405180910390f35b6100ae60048036038101906100a99190610e34565b6104fe565b6040516100c096959493929190610e77565b60405180910390f35b6100e360048036038101906100de9190610f23565b6107d3565b005b6100ff60048036038101906100fa9190610cf9565b610961565b60405161010c9190611050565b60405180910390f35b61012f600480360381019061012a9190610cf9565b61098e565b60405161013c9190611050565b60405180910390f35b61015f600480360381019061015a9190610cf9565b6109b5565b005b60605f6102315f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f0180546101b090611096565b80601f01602080910402602001604051908101604052809291908181526020018280546101dc90611096565b80156102275780601f106101fe57610100808354040283529160200191610227565b820191905f5260205f20905b81548152906001019060200180831161020a57829003601f168201915b505050505061098e565b90505f836040516020016102459190611100565b60405160208183030381529060405280519060200120821490503373ffffffffffffffffffffffffffffffffffffffff167f7775ed67e23c2440b6947417630709bf46d168bf49cb78497dba7961774d18a1826040516102a59190611130565b60405180910390a280156104be573373ffffffffffffffffffffffffffffffffffffffff167f7b5e2c6197387867208fa32e823ad725159dee7c9e1a2c9b66a556a555b977ae5f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206001015f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206002015f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20600301545f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206004015f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20600501604051610477969594939291906111dc565b60405180910390a26040518060400160405280601081526020017f4c6f67696e207375636365737366756c00000000000000000000000000000000815250925050506104f9565b6040518060400160405280600281526020017f7b7d000000000000000000000000000000000000000000000000000000000000815250925050505b919050565b5f602052805f5260405f205f91509050805f01805461051c90611096565b80601f016020809104026020016040519081016040528092919081815260200182805461054890611096565b80156105935780601f1061056a57610100808354040283529160200191610593565b820191905f5260205f20905b81548152906001019060200180831161057657829003601f168201915b5050505050908060010180546105a890611096565b80601f01602080910402602001604051908101604052809291908181526020018280546105d490611096565b801561061f5780601f106105f65761010080835404028352916020019161061f565b820191905f5260205f20905b81548152906001019060200180831161060257829003601f168201915b50505050509080600201805461063490611096565b80601f016020809104026020016040519081016040528092919081815260200182805461066090611096565b80156106ab5780601f10610682576101008083540402835291602001916106ab565b820191905f5260205f20905b81548152906001019060200180831161068e57829003601f168201915b5050505050908060030154908060040180546106c690611096565b80601f01602080910402602001604051908101604052809291908181526020018280546106f290611096565b801561073d5780601f106107145761010080835404028352916020019161073d565b820191905f5260205f20905b81548152906001019060200180831161072057829003601f168201915b50505050509080600501805461075290611096565b80601f016020809104026020016040519081016040528092919081815260200182805461077e90611096565b80156107c95780601f106107a0576101008083540402835291602001916107c9565b820191905f5260205f20905b8154815290600101906020018083116107ac57829003601f168201915b5050505050905086565b5f6040518060c00160405280888152602001878152602001868152602001858152602001848152602001838152509050805f803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f820151815f01908161085391906113e9565b50602082015181600101908161086991906113e9565b50604082015181600201908161087f91906113e9565b5060608201518160030155608082015181600401908161089f91906113e9565b5060a08201518160050190816108b591906113e9565b509050503373ffffffffffffffffffffffffffffffffffffffff167f92822564bab8864c3a47b34e8d23fbce5c46234eb5da261f94087b995ac0f33b88886040516109019291906114b8565b60405180910390a23373ffffffffffffffffffffffffffffffffffffffff167f5bb6eac17d92b21e44c63082807c8b53294b5358da84eabdae451ab0923ea62a60016040516109509190611130565b60405180910390a250505050505050565b6001818051602081018201805184825260208301602085012081835280955050505050505f915090505481565b5f60018260405161099f9190611100565b9081526020016040518091039020549050919050565b5f805f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f0180546109ff90611096565b80601f0160208091040260200160405190810160405280929190818152602001828054610a2b90611096565b8015610a765780601f10610a4d57610100808354040283529160200191610a76565b820191905f5260205f20905b815481529060010190602001808311610a5957829003601f168201915b505050505090505f82604051602001610a8f9190611100565b60405160208183030381529060405280519060200120905080600183604051610ab89190611100565b90815260200160405180910390208190555081604051610ad89190611100565b60405180910390207f2cc085e35e68b4c2aa9d58cba4abde3977efbe55e84fdf4c8589c563686accd460405160405180910390a23373ffffffffffffffffffffffffffffffffffffffff167f9a75b332e5bf551ac57b2603829f37de6b1ac04ca6cf00645896c9fb19c515715f805f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f018054610b8e90611096565b90501415604051610b9f9190611130565b60405180910390a2505050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610c0b82610bc5565b810181811067ffffffffffffffff82111715610c2a57610c29610bd5565b5b80604052505050565b5f610c3c610bac565b9050610c488282610c02565b919050565b5f67ffffffffffffffff821115610c6757610c66610bd5565b5b610c7082610bc5565b9050602081019050919050565b828183375f83830152505050565b5f610c9d610c9884610c4d565b610c33565b905082815260208101848484011115610cb957610cb8610bc1565b5b610cc4848285610c7d565b509392505050565b5f82601f830112610ce057610cdf610bbd565b5b8135610cf0848260208601610c8b565b91505092915050565b5f60208284031215610d0e57610d0d610bb5565b5b5f82013567ffffffffffffffff811115610d2b57610d2a610bb9565b5b610d3784828501610ccc565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015610d77578082015181840152602081019050610d5c565b5f8484015250505050565b5f610d8c82610d40565b610d968185610d4a565b9350610da6818560208601610d5a565b610daf81610bc5565b840191505092915050565b5f6020820190508181035f830152610dd28184610d82565b905092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610e0382610dda565b9050919050565b610e1381610df9565b8114610e1d575f80fd5b50565b5f81359050610e2e81610e0a565b92915050565b5f60208284031215610e4957610e48610bb5565b5b5f610e5684828501610e20565b91505092915050565b5f819050919050565b610e7181610e5f565b82525050565b5f60c0820190508181035f830152610e8f8189610d82565b90508181036020830152610ea38188610d82565b90508181036040830152610eb78187610d82565b9050610ec66060830186610e68565b8181036080830152610ed88185610d82565b905081810360a0830152610eec8184610d82565b9050979650505050505050565b610f0281610e5f565b8114610f0c575f80fd5b50565b5f81359050610f1d81610ef9565b92915050565b5f805f805f8060c08789031215610f3d57610f3c610bb5565b5b5f87013567ffffffffffffffff811115610f5a57610f59610bb9565b5b610f6689828a01610ccc565b965050602087013567ffffffffffffffff811115610f8757610f86610bb9565b5b610f9389828a01610ccc565b955050604087013567ffffffffffffffff811115610fb457610fb3610bb9565b5b610fc089828a01610ccc565b9450506060610fd189828a01610f0f565b935050608087013567ffffffffffffffff811115610ff257610ff1610bb9565b5b610ffe89828a01610ccc565b92505060a087013567ffffffffffffffff81111561101f5761101e610bb9565b5b61102b89828a01610ccc565b9150509295509295509295565b5f819050919050565b61104a81611038565b82525050565b5f6020820190506110635f830184611041565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806110ad57607f821691505b6020821081036110c0576110bf611069565b5b50919050565b5f81905092915050565b5f6110da82610d40565b6110e481856110c6565b93506110f4818560208601610d5a565b80840191505092915050565b5f61110b82846110d0565b915081905092915050565b5f8115159050919050565b61112a81611116565b82525050565b5f6020820190506111435f830184611121565b92915050565b5f819050815f5260205f209050919050565b5f815461116781611096565b6111718186610d4a565b9450600182165f811461118b57600181146111a1576111d3565b60ff1983168652811515602002860193506111d3565b6111aa85611149565b5f5b838110156111cb578154818901526001820191506020810190506111ac565b808801955050505b50505092915050565b5f60c0820190508181035f8301526111f4818961115b565b90508181036020830152611208818861115b565b9050818103604083015261121c818761115b565b905061122b6060830186610e68565b818103608083015261123d818561115b565b905081810360a0830152611251818461115b565b9050979650505050505050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026112a87fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261126d565b6112b2868361126d565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6112ed6112e86112e384610e5f565b6112ca565b610e5f565b9050919050565b5f819050919050565b611306836112d3565b61131a611312826112f4565b848454611279565b825550505050565b5f90565b61132e611322565b6113398184846112fd565b505050565b5b8181101561135c576113515f82611326565b60018101905061133f565b5050565b601f8211156113a15761137281611149565b61137b8461125e565b8101602085101561138a578190505b61139e6113968561125e565b83018261133e565b50505b505050565b5f82821c905092915050565b5f6113c15f19846008026113a6565b1980831691505092915050565b5f6113d983836113b2565b9150826002028217905092915050565b6113f282610d40565b67ffffffffffffffff81111561140b5761140a610bd5565b5b6114158254611096565b611420828285611360565b5f60209050601f831160018114611451575f841561143f578287015190505b61144985826113ce565b8655506114b0565b601f19841661145f86611149565b5f5b8281101561148657848901518255600182019150602085019450602081019050611461565b868310156114a3578489015161149f601f8916826113b2565b8355505b6001600288020188555050505b505050505050565b5f6040820190508181035f8301526114d08185610d82565b905081810360208301526114e48184610d82565b9050939250505056fea264697066735822122092030a549f4eeac233a663d6eeb3f06ea9c3039afa5930835ac14310b46f1cf364736f6c63430008160033"


# # # Replace with your Ethereum account private key
private_key = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"
account_address = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"

# Create a contract instance
contract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# Estimate gas for deployment
gas_estimate = contract.constructor().estimate_gas()
# Get the current gas price from the network
current_gas_price = web3.eth.generate_gas_price()
print(f'current gas price: {current_gas_price}')
# Build the deployment transaction

transaction = contract.constructor().build_transaction({
    'from': account_address,
    'gas': int(gas_estimate * 2),
    'gasPrice': web3.to_wei('40', 'gwei'),
    'nonce': web3.eth.get_transaction_count(account_address),
})

# Sign and send the deployment transaction
signed_transaction = web3.eth.account.sign_transaction(transaction, private_key)
transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)

# Wait for the transaction to be mined
receipt = web3.eth.wait_for_transaction_receipt(transaction_hash, timeout=300)

# Contract address is available in the receipt
contract_address = receipt['contractAddress']
print(f"the contract address is {contract_address}")





