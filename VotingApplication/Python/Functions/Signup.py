# class based signup class for the contracts
from Contracts import Registration
from web3 import Web3

class Signup:
    def __init__(self, username, gmail, dob, contact, password, privatekey, publickey):
        self.request_api = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.privateKey = privatekey
        self.publicKey = publickey
        self.bytecode = Registration.contract_bytecode
        self.contract_address = Registration.register_contract_address
        self.contract_abi = Registration.contract_abi
        # some call back defined here
        # or some kind of checkup
        # we should be checking if the user exist or not 


        initial_checkup = self.signup_initial(username,
                                              gmail, dob, contact)
        if initial_checkup:
            final_checkup = self.signup_final(username, gmail, dob, contact, password)
            if final_checkup:
                return True
            else:
                print("Something wrong happend with final checkup")
        else:
            print("Something wrong happend with initial checkup")

    def signup_initial(self, username, gmail, dob, contact):

        return 
    
    def signup_final(self, username, gmail, dob, contact, password):
        
        return 

    