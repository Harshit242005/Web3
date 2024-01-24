# calling the function from the smart contract
from web3 import Web3
from web3.exceptions import TimeExhausted

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


def Register(account_address, private_key, name, email, phoneNumber, age, gender, location):
    print('details in python script')
    print(account_address, private_key, name, email, phoneNumber, age, gender, location)
    try:
        # Estimate gas for registration
        gas_estimate_register = contract.functions.registerUser(name, email, phoneNumber, int(age), gender, location).estimate_gas()
        print(f'estimate gas price: {gas_estimate_register}')

        # Build the registration transaction
        nonce_register = web3.eth.get_transaction_count(account_address)
        print(f'nonce register: {nonce_register}')

        gas_price_register = web3.eth.gas_price
        print(f'gas price for register: {gas_price_register}')

        transaction_register = contract.functions.registerUser(name, email, phoneNumber, int(age), gender, location).build_transaction({
            'from': account_address,
            'gas': int(gas_estimate_register * 2),
            'gasPrice': web3.to_wei('40', 'gwei'),
            'nonce': nonce_register,
        })

        # Sign and send the registration transaction
        signed_transaction_register = web3.eth.account.sign_transaction(transaction_register, private_key)
        transaction_hash_register = web3.eth.send_raw_transaction(signed_transaction_register.rawTransaction)
        timeout_seconds = 60
        global receipt_register
        receipt_register = web3.eth.wait_for_transaction_receipt(transaction_hash_register, timeout=timeout_seconds)
        print(f'receipt register message: {receipt_register}')

        if receipt_register.status == 0:
            revert_message = web3.eth.call({
                'to': receipt_register.contract_address,
                'data': receipt_register.input
            }).hex()
            print(f"Revert Message: {revert_message}")

    except ValueError as ve:
        print(f"ValueError: {ve}")
    except TimeExhausted as te:
        print(f"TimeExhausted: {te}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

    return receipt_register