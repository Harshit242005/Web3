# testing with the contracts 
from web3 import Web3
from Registration import contract_abi, register_contract_address

web3 = Web3(Web3.HTTPProvider("https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"))


checksum_address = web3.to_checksum_address(register_contract_address)
      

contract = web3.eth.contract(address=checksum_address, abi=contract_abi)
username = "Zack"
gmail = "zacksynder@gmail.com"
contact = "6789235879"
dob = "15/01/2000"
password = "qazwsx"
privateKey = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"
publicKey = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"


gas_estimate_register = contract.functions.setUserPassword(password).estimate_gas()
print(f'estimate register price for final register: {gas_estimate_register}')
nonce_register = web3.eth.get_transaction_count(publicKey)
            
# print(f'user data for initial register: {username}, {dob}, {contact}, {gmail}')
# transaction for the register of the user
transaction_register = contract.functions.setUserPassword(password).build_transaction({
    'from': publicKey,
    'gas': int(gas_estimate_register),
    'gasPrice': web3.to_wei('20', 'gwei'),
    'nonce': nonce_register
})

# sign the traansactin object
signed_transaction_register = web3.eth.account.sign_transaction(transaction_register, privateKey)
transaction_hash_register = web3.eth.send_raw_transaction(signed_transaction_register.rawTransaction)
timeout_seconds = 60
receipt_set_password = web3.eth.wait_for_transaction_receipt(transaction_hash_register, timeout=timeout_seconds)
print(f'receipt register message: {receipt_set_password}')

if receipt_set_password.status == 0:
    revert_message = web3.eth.call({
        'to': receipt_set_password.contract_address,
        'data': receipt_set_password.input
    }).hex()
    print(f'Revert message: {revert_message}')

# with the use of receipt get the events working 
for event in contract.events.RegistrationStatusFinalStatus().process_receipt(receipt_set_password):
            print(event['args']['isRegistered'])