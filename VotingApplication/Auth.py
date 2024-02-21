# class based signup class for the contracts
import Registration
from web3 import Web3

class SignupUser:
    def __init__(self, privatekey, publickey):
    
        self.request_api = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.request_api))
        self.privateKey = privatekey
        # self.publicKey = publickey
        self.publicKey = self.web3.to_checksum_address(publickey)

        self.bytecode = Registration.contract_bytecode
        self.contract_address = Registration.register_contract_address
        self.checksum_address = self.web3.to_checksum_address(self.contract_address)
        self.contract_abi = Registration.contract_abi

        self.contract = self.web3.eth.contract(address=self.checksum_address, abi=self.contract_abi)
        

    def signup_initial(self, username, gmail, dob, contact):
        print(f'data for the initial level signup: {username}, {dob}, {contact}, {gmail}')
        # get the receipt of the register
        
        gas_estimate_register = self.contract.functions.registerUser(username, gmail, contact, dob).estimate_gas()
        print(f'estimate register price for initial register: {gas_estimate_register}')
        nonce_register = self.web3.eth.get_transaction_count(self.publicKey)
            
        print(f'user data for initial register: {username}, {dob}, {contact}, {gmail}')
        # transaction for the register of the user
        transaction_register = self.contract.functions.registerUser(username, gmail, contact, dob).build_transaction({
            'from': self.publicKey,
            'gas': int(gas_estimate_register * 2),
            'gasPrice': self.web3.to_wei('40', 'gwei'),
            'nonce': nonce_register
        })

        # sign the traansactin object
        signed_transaction_register = self.web3.eth.account.sign_transaction(transaction_register, self.privateKey)
        transaction_hash_register = self.web3.eth.send_raw_transaction(signed_transaction_register.rawTransaction)
        timeout_seconds = 60
        receipt_register = self.web3.eth.wait_for_transaction_receipt(transaction_hash_register, timeout=timeout_seconds)
        print(f'receipt register message: {receipt_register}')

        

        # with the use of receipt get the events working 
        for event in self.contract.events.RegistrationStatusInitialStatus().process_receipt(receipt_register):
            return event['args']['isRegistered']
            

        
       

    
    def signup_final(self, password):
        # setting up th password this time in this call 
        
        gas_estimate_set_password = self.contract.functions.setUserPassword(password).estimate_gas()

        # Build the set password transaction
        nonce_set_password = self.web3.eth.get_transaction_count(self.publicKey)
        

        transaction_set_password = self.contract.functions.setUserPassword(password).build_transaction({
            'from': self.publicKey,
            'gas': int(gas_estimate_set_password * 2),
            'gasPrice': self.web3.to_wei('40', 'gwei'),
            'nonce': nonce_set_password,
        })

        # Sign and send the set password transaction
        signed_transaction_set_password = self.web3.eth.account.sign_transaction(transaction_set_password, self.privateKey)
        transaction_hash_set_password = self.web3.eth.send_raw_transaction(signed_transaction_set_password.rawTransaction)
        receipt_set_password = self.web3.eth.wait_for_transaction_receipt(transaction_hash_set_password)
        
        # use receipt to get the password
        for event in self.contract.events.RegistrationStatusFinalStatus().process_receipt(receipt_set_password):
            return event['args']['isRegistered']
    


class LoginUser:
    def __init__(self, publickey, password):
        self.request_api = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.request_api))
        # self.privateKey = privatekey
        self.publicKey = publickey
        
        self.bytecode = Registration.contract_bytecode
        self.contract_address = Registration.register_contract_address
        self.checksum_address = self.web3.to_checksum_address(self.contract_address)
        self.contract_abi = Registration.contract_abi

        self.contract = self.web3.eth.contract(address=self.checksum_address, abi=self.contract_abi)
        # calling up the function
        return self.Login(password, self.publicKey)

    def Login(self, password, publicKey):
        login_check = self.contract.functions.loginUser(password).call({'from': publicKey})
        return login_check    