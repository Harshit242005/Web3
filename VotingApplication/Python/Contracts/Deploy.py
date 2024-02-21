# # here in this we would like to deploy the contracts

# from web3 import Web3
# from Registration import contract_abi, contract_bytecode
# # Connect to the Goerli network
# sepolia_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
# web3 = Web3(Web3.HTTPProvider(sepolia_rpc_url))


# # # # Replace with your Ethereum account private key
# private_key = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"
# account_address = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"

# # Create a contract instance
# contract = web3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# # Estimate gas for deployment
# gas_estimate = contract.constructor().estimate_gas()
# # Get the current gas price from the network
# current_gas_price = web3.eth.generate_gas_price()
# print(f'current gas price: {current_gas_price}')
# # Build the deployment transaction

# transaction = contract.constructor().build_transaction({
#     'from': account_address,
#     'gas': int(gas_estimate),
#     'gasPrice': web3.to_wei('20', 'gwei'),
#     'nonce': web3.eth.get_transaction_count(account_address),
# })

# # Sign and send the deployment transaction
# signed_transaction = web3.eth.account.sign_transaction(transaction, private_key)
# transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)

# # Wait for the transaction to be mined
# receipt = web3.eth.wait_for_transaction_receipt(transaction_hash, timeout=300)

# # Contract address is available in the receipt
# contract_address = receipt['contractAddress']
# print(f"the contract address is {contract_address}")






from web3 import Web3
from VotingData import contract_abi, contract_bytecode
# Connect to the Goerli network
goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
web3 = Web3(Web3.HTTPProvider(goerli_rpc_url))


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
    'gas': int(gas_estimate),
    'gasPrice': web3.to_wei('20', 'gwei'),
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