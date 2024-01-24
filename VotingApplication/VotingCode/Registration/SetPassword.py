# calling the function from the smart contract
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


def setPassword(account_address, password, private_key):
    # Estimate gas for setting the password
    gas_estimate_set_password = contract.functions.setUserPassword(password).estimate_gas()

    # Build the set password transaction
    nonce_set_password = web3.eth.get_transaction_count(account_address)
    gas_price_set_password = web3.eth.gas_price

    transaction_set_password = contract.functions.setUserPassword(password).build_transaction({
        'from': account_address,
        'gas': int(gas_estimate_set_password),
        'gasPrice': gas_price_set_password,
        'nonce': nonce_set_password,
    })

    # Sign and send the set password transaction
    signed_transaction_set_password = web3.eth.account.sign_transaction(transaction_set_password, private_key)
    transaction_hash_set_password = web3.eth.send_raw_transaction(signed_transaction_set_password.rawTransaction)
    receipt_set_password = web3.eth.wait_for_transaction_receipt(transaction_hash_set_password)
    return receipt_set_password


print(setPassword("0xcf3Fd27A92AAc6ecbB314312eA61c6D32f8E5412", "qwerty", "ca209acd8b80949c70384f6e9c983a6979ad74d2abf7db456a5add57a62d0ce0"))