# # calling the function from the smart contract
# from web3 import Web3

# # contract address has been uploaded
# from RegisterContractAddress import register_contract_address
# contract_address = register_contract_address

# # added the contract ABI 
# from RegisterContractABI import register_contract_abi
# contract_abi = register_contract_abi


# # Connect to the Ethereum node
# goerli_rpc_url = "https://sepolia.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
# web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))
# # Convert the address to checksum format

# checksum_address = web3.to_checksum_address(contract_address)
# print(f'checksum address {checksum_address}')

# # Create a contract instance
# contract = web3.eth.contract(address=checksum_address, abi=contract_abi)
# # Get all function names
# function_names = [func["name"] for func in contract.abi if func["type"] == "function"]
# print("Function Names:", function_names)

# # Get all event names
# event_names = [event["name"] for event in contract.abi if event["type"] == "event"]
# print("Event Names:", event_names)


# def LoginUserPassword(account_address, private_key, password):
    
#     # Estimate gas for the loginUser function
#     gas_estimate_login = contract.functions.loginUser(password).estimate_gas()

#     # Build the login transaction
#     nonce_login = web3.eth.get_transaction_count(account_address)
#     gas_price_login = web3.eth.gas_price

#     transaction_login = contract.functions.loginUser(password).build_transaction({
#         'from': account_address,
#         'gas': int(gas_estimate_login * 2),
#         'gasPrice': web3.to_wei('40', 'gwei'),
#         'nonce': nonce_login,
#     })

#     # Sign the login transaction
#     signed_transaction_login = web3.eth.account.sign_transaction(transaction_login, private_key)

#     # Send the signed transaction
#     transaction_hash_login = web3.eth.send_raw_transaction(signed_transaction_login.rawTransaction)

#     # Wait for the transaction receipt
#     tx_receipt_login = web3.eth.wait_for_transaction_receipt(transaction_hash_login)
#     # Check the event logs for UserLoginAttempt
#     event_logs_login = contract.events.SuccessfulLogin().process_receipt(tx_receipt_login)
#     print(event_logs_login)
#     if len(event_logs_login) > 0:
#         user_data = {
#             "name": event_logs_login[0]['args']['name'],
#             "email": event_logs_login[0]['args']['email'],
#             "phoneNumber": event_logs_login[0]['args']['phoneNumber'],
#             "age": event_logs_login[0]['args']['age'],
#             "gender": event_logs_login[0]['args']['gender'],
#             "location": event_logs_login[0]['args']['location'],
#         }
#         return user_data
#     else:    
#         return False




from web3 import Web3

# contract address has been uploaded
from RegisterContractAddress import register_contract_address
contract_address = register_contract_address

# added the contract ABI 
from RegisterContractABI import register_contract_abi
contract_abi = register_contract_abi

# Connect to the Ethereum node
goerli_rpc_url = "https://sepolia.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))
# Convert the address to checksum format
checksum_address = web3.to_checksum_address(contract_address)
print(f'checksum address {checksum_address}')

# Create a contract instance
contract = web3.eth.contract(address=checksum_address, abi=contract_abi)
# Get all function names
function_names = [func["name"] for func in contract.abi if func["type"] == "function"]
print("Function Names:", function_names)

# Get all event names
event_names = [event["name"] for event in contract.abi if event["type"] == "event"]
print("Event Names:", event_names)

def LoginUserPassword(account_address, password):
    # Call the loginUser function directly
    result = contract.functions.loginUser(password).call({'from': account_address})
    print(result)
    # Check the result
    if result:
        user_data = {
            "name": result[0],
            "email": result[1],
            "phoneNumber": result[2],
            "age": result[3],
            "gender": result[4],
            "location": result[5],
        }
        return user_data
    else:
        return False



print(LoginUserPassword("0xcf3Fd27A92AAc6ecbB314312eA61c6D32f8E5412", "qwerty"))