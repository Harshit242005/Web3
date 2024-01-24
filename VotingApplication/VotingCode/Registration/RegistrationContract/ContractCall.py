# address of the contract = 0x7cbc05451c03e4cf35eff3a6ed7f53b65c8a411b


# calling the function from the smart contract
from web3 import Web3
contract_address = "0xc4466E8bFb30c45e9491cbb47879D96129162c3A"

# Connect to the Ethereum node
goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))
# Convert the address to checksum format
checksum_address = web3.to_checksum_address(contract_address)
print(f'checksum address {checksum_address}')

private_key = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"

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

# Estimate gas for registration
gas_estimate_register = contract.functions.registerUser(name, email, phoneNumber, age, gender, location).estimate_gas()

# Build the registration transaction
nonce_register = web3.eth.get_transaction_count(account_address)
gas_price_register = web3.eth.gas_price

transaction_register = contract.functions.registerUser(name, email, phoneNumber, age, gender, location).build_transaction({
    'from': account_address,
    'gas': gas_estimate_register,
    'gasPrice': gas_price_register,
    'nonce': nonce_register,
})

# Sign and send the registration transaction
signed_transaction_register = web3.eth.account.sign_transaction(transaction_register, private_key)
transaction_hash_register = web3.eth.send_raw_transaction(signed_transaction_register.rawTransaction)
receipt_register = web3.eth.wait_for_transaction_receipt(transaction_hash_register)

# Check if the UserRegistered event is emitted
for event in contract.events.UserRegistered().process_receipt(receipt_register):
    print(f"User {event['args']['name']} registered with address {event['args']['userAddress']}")

# Check initial registration status
for event in contract.events.RegistrationStatusInitalStatus().process_receipt(receipt_register):
    print(f"Initial Registration Status: {event['args']['isRegistered']}")







# calling for setting the user password
# Set User Password
# password = "qazwsx"
# # Estimate gas for setting the password
# gas_estimate_set_password = contract.functions.setUserPassword(password).estimate_gas()

# # Build the set password transaction
# nonce_set_password = web3.eth.get_transaction_count(account_address)
# gas_price_set_password = web3.eth.gas_price

# transaction_set_password = contract.functions.setUserPassword(password).build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate_set_password * 2),
#     'gasPrice': gas_price_set_password,
#     'nonce': nonce_set_password,
# })

# # Sign and send the set password transaction
# signed_transaction_set_password = web3.eth.account.sign_transaction(transaction_set_password, private_key)
# transaction_hash_set_password = web3.eth.send_raw_transaction(signed_transaction_set_password.rawTransaction)
# receipt_set_password = web3.eth.wait_for_transaction_receipt(transaction_hash_set_password)

# # Check if the UserPasswordSet event is emitted
# for event in contract.events.UserPasswordSet().process_receipt(receipt_set_password):
#     print(f"Password set for user {event['args']['username']}")

# # Check final registration status
# for event in contract.events.RegistrationStatusFinalStatus().process_receipt(receipt_set_password):
#     print(f"Final Registration Status: {event['args']['isRegistered']}")
    


# calling for the user login if the user data is registerd with the passwrd or not 
# Replace with login data



# # Set the login details
# login_password = "qazwsx"

# # Estimate gas for the loginUser function
# gas_estimate_login = contract.functions.loginUser(login_password).estimate_gas()

# # Build the login transaction
# nonce_login = web3.eth.get_transaction_count(account_address)
# gas_price_login = web3.eth.gas_price

# transaction_login = contract.functions.loginUser(login_password).build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate_login * 2),
#     'gasPrice': gas_price_login,
#     'nonce': nonce_login,
# })

# # Sign the login transaction
# signed_transaction_login = web3.eth.account.sign_transaction(transaction_login, private_key)

# # Send the signed transaction
# transaction_hash_login = web3.eth.send_raw_transaction(signed_transaction_login.rawTransaction)

# # Wait for the transaction receipt
# tx_receipt_login = web3.eth.wait_for_transaction_receipt(transaction_hash_login)
# # Check the event logs for UserLoginAttempt
# event_logs_login = contract.events.SuccessfulLogin().process_receipt(tx_receipt_login)
# if len(event_logs_login) > 0:
#     user_data = {
#         "name": event_logs_login[0]['args']['name'],
#         "email": event_logs_login[0]['args']['email'],
#         "phoneNumber": event_logs_login[0]['args']['phoneNumber'],
#         "age": event_logs_login[0]['args']['age'],
#         "gender": event_logs_login[0]['args']['gender'],
#         "location": event_logs_login[0]['args']['location'],
#     }
#     print(f"Login success! User details: {user_data}")
# else:
#     print("Login failed.")
