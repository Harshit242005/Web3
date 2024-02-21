from VotingData import contract_abi, contract_bytecode, contract_address

class OwnerCheck:
    def __init__(self, publickey, privatekey):
        self.publicKey = publickey
        self.privateKey = privatekey
        return
    
    def check_owner(self):
        if self.publicKey == "0x5780326e9F221afd01253C954b453ccCf4f2F30E":
            return True
        else:
            return False