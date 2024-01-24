# address of the contract = 0x7cbc05451c03e4cf35eff3a6ed7f53b65c8a411b


# calling the function from the smart contract
from web3 import Web3
contract_address = "0x1Cb8F98bBF22f31F2D751c761B35A08363764CDa"

# Connect to the Ethereum node
goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))
# Convert the address to checksum format
checksum_address = web3.to_checksum_address(contract_address)
print(f'checksum address {checksum_address}')

private_key = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"

contract_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AAP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "BJP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CONGRESS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "aapVotes",
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
	},
	{
		"inputs": [],
		"name": "activateResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bjpVotes",
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "congressVotes",
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
	},
	{
		"inputs": [],
		"name": "deployerAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getElectionResult",
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
		"inputs": [],
		"name": "getVotes",
		"outputs": [
			{
				"components": [
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
				"internalType": "struct Election.User[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
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
				"internalType": "struct Election.User[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
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
				"internalType": "struct Election.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "getVotingStatus",
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
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "hasExist",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
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
		"inputs": [],
		"name": "showResult",
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
		"name": "voteAAP",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "voteBJP",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
		"name": "voteCONGRESS",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

# Create a contract instance
contract = web3.eth.contract(address=checksum_address, abi=contract_abi)
account_address = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"

# Get the list of functions
functions = contract.functions

# Extract function names
function_names = [func for func in dir(functions) if callable(getattr(functions, func)) and not func.startswith("__")]

# Print the list of function names
print("List of Functions:")
for func_name in function_names:
    print(func_name)




# # Replace with user data
name = "Harshit Agre"
email = "agreharshit610@gmail.com"
phoneNumber = "9636540730"
age = 19
gender = "Male"
location = "Jaipur, Rajasthan"


# Estimate gas for the voteAAP function
gas_estimate_vote = contract.functions.voteBJP(
    name,
    email,
    phoneNumber,
    age,
    gender,
    location
).estimate_gas()

# Build the voteAAP transaction
nonce_vote = web3.eth.get_transaction_count(account_address)
gas_price_vote = web3.eth.gas_price

transaction_vote = contract.functions.voteBJP(
    name,
    email,
    phoneNumber,
    age,
    gender,
    location
).build_transaction({
    'from': account_address,
    'gas': int(gas_estimate_vote),
    'gasPrice': gas_price_vote,
    'nonce': nonce_vote,
})
# Voting with the user 
# Sign the voteAAP transaction
signed_transaction_vote = web3.eth.account.sign_transaction(transaction_vote, private_key)

# Send the signed voteAAP transaction
transaction_hash_vote = web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)

# Wait for the voteAAP transaction receipt
tx_receipt_vote = web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
print(f'Voting function reciept: {tx_receipt_vote}')
# Check if the vote was successful
if tx_receipt_vote['status'] == 1:
    print("Vote successful!")
else:
    print("Vote failed.")


votes = contract.functions.getVotes().call({'from': account_address})
print(f'votes: {votes}')
exist = contract.functions.hasExist(account_address).call()
print(f'user exist: {exist}')
voting_status = contract.functions.getVotingStatus(account_address).call()
print(f'voting status: {voting_status}')


# # checking some details after voting
# gas_estimate_vote = contract.functions.getVotes().estimate_gas()

# # Build the voteAAP transaction
# nonce_vote = web3.eth.get_transaction_count(account_address)
# gas_price_vote = web3.eth.gas_price

# transaction_vote = contract.functions.getVotes().build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate_vote),
#     'gasPrice': gas_price_vote,
#     'nonce': nonce_vote,
# })
# # Voting with the user 
# # Sign the voteAAP transaction
# signed_transaction_vote = web3.eth.account.sign_transaction(transaction_vote, private_key)

# # Send the signed voteAAP transaction
# transaction_hash_vote = web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)

# # Wait for the voteAAP transaction receipt
# tx_receipt_vote = web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
# print(f'Getting Votes  function reciept: {tx_receipt_vote}')




# # checking some details after voting
# gas_estimate_vote = contract.functions.hasExist(account_address).estimate_gas()

# # Build the voteAAP transaction
# nonce_vote = web3.eth.get_transaction_count(account_address)
# gas_price_vote = web3.eth.gas_price

# transaction_vote = contract.functions.hasExist(account_address).build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate_vote),
#     'gasPrice': gas_price_vote,
#     'nonce': nonce_vote,
# })
# # Voting with the user 
# # Sign the voteAAP transaction
# signed_transaction_vote = web3.eth.account.sign_transaction(transaction_vote, private_key)

# # Send the signed voteAAP transaction
# transaction_hash_vote = web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)

# # Wait for the voteAAP transaction receipt
# tx_receipt_vote = web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
# print(f'Getting Votes  function reciept: {tx_receipt_vote}')




# # checking some details after voting
# gas_estimate_vote = contract.functions.getVotingStatus(account_address).estimate_gas()

# # Build the voteAAP transaction
# nonce_vote = web3.eth.get_transaction_count(account_address)
# gas_price_vote = web3.eth.gas_price

# transaction_vote = contract.functions.getVotingStatus(account_address).build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate_vote),
#     'gasPrice': gas_price_vote,
#     'nonce': nonce_vote,
# })
# # Voting with the user 
# # Sign the voteAAP transaction
# signed_transaction_vote = web3.eth.account.sign_transaction(transaction_vote, private_key)

# # Send the signed voteAAP transaction
# transaction_hash_vote = web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)

# # Wait for the voteAAP transaction receipt
# tx_receipt_vote = web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
# print(f'Getting Votes  function reciept: {tx_receipt_vote}')



# # Estimate gas for the getElectionResult function
# gas_estimate_result = contract.functions.getElectionResult().estimate_gas()

# # Build the getElectionResult transaction
# nonce_result = web3.eth.get_transaction_count(account_address)
# gas_price_result = web3.eth.gas_price

# transaction_result = contract.functions.getElectionResult().build_transaction({
#     'from': account_address,
#     'gas': gas_estimate_result,
#     'gasPrice': gas_price_result,
#     'nonce': nonce_result,
# })

# # Sign the getElectionResult transaction
# signed_transaction_result = web3.eth.account.sign_transaction(transaction_result, private_key)

# # Send the signed getElectionResult transaction
# transaction_hash_result = web3.eth.send_raw_transaction(signed_transaction_result.rawTransaction)

# # Wait for the getElectionResult transaction receipt
# tx_receipt_result = web3.eth.wait_for_transaction_receipt(transaction_hash_result)

# Check if the transaction was successful
# if tx_receipt_result['status'] == 1:
#     # Call the getElectionResult function to get the result
#     election_result = contract.functions.getElectionResult().call()
#     print(f'Election result: {election_result}')
# else:
#     print("Transaction failed.")