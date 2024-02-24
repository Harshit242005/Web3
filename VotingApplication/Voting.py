from VotingData import contract_abi, contract_bytecode, contract_address
from web3 import Web3

class OwnerCheck:
    def __init__(self, publickey):
        self.goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.goerli_rpc_url))
        self.publicKey = publickey
    
    def check_owner(self):
        # Convert the hardcoded address to checksum
        election_board_address = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"
        check_sum_address = self.web3.to_checksum_address(election_board_address)
        print(f'Checksum election board address is: {check_sum_address} and the public key is: {self.publicKey}')

        # Convert the provided public key to checksum
        input_public_key_checksum = self.web3.to_checksum_address(self.publicKey)

        # Compare the checksum addresses
        if input_public_key_checksum == check_sum_address:
            print('Typed account is from the election board itself')
            return True
        else:
            print('Typed account is not from the election board')
            return False

        

class CheckResult:
    def __init__(self, publickey, privatekey):
        self.goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.goerli_rpc_url))
        self.contract_checksum_address = self.web3.to_checksum_address(contract_address)
        self.contract = self.web3.eth.contract(address= self.contract_checksum_address, abi=contract_abi)

        self.publicKey = publickey
        self.privateKey = privatekey

    def show_results(self):
        result = self.contract.functions.showResult().call({'from': self.publicKey})
        print(result)
        return result

class Get_Result:
    def __init__(self):
        self.goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.goerli_rpc_url))
        self.contract_checksum_address = self.web3.to_checksum_address(contract_address)
        self.contract = self.web3.eth.contract(address= self.contract_checksum_address, abi=contract_abi)
    
    def get_results(self):
        result = self.contract.functions.getElectionResult().call()
        return result


class AlreadyVoted:
    def __init__(self, publickey):
        self.goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.goerli_rpc_url))
        self.contract_checksum_address = self.web3.to_checksum_address(contract_address)
        self.contract = self.web3.eth.contract(address= self.contract_checksum_address, abi=contract_abi)
        # user details
        self.publicKey = publickey
        # self.privateKey = privatekey

    def alreadyVoted(self):
        has_voted = self.contract.functions.getVotingStatus(self.publicKey).call({'from': self.publicKey})
        if has_voted:
            return True
        else:
            print(has_voted)
            return False

class Vote:
    def __init__(self, publickey, privatekey, username, email, dob, contact, partyName):
        self.goerli_rpc_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"
        self.web3 = Web3(Web3.HTTPProvider(self.goerli_rpc_url))
        self.contract_checksum_address = self.web3.to_checksum_address(contract_address)
        self.contract = self.web3.eth.contract(address= self.contract_checksum_address, abi=contract_abi)
        # user details
        self.publicKey = publickey
        self.privateKey = privatekey
        self.username = username
        self.email = email
        self.dob = dob
        self.contact = contact
        self.partyName = partyName

    def vote_party(self):
        print(f'party name is: {self.partyName}')
        if self.partyName == 'AAP':
            # function call to vote the user data to the aap party
            gas_estimate = self.contract.functions.voteAAP(self.username, self.email, self.contact, self.dob).estimate_gas()
            nonce_vote = self.web3.eth.get_transaction_count(self.publicKey)
            transaction_vote = self.contract.functions.voteAAP(
                self.username,
                self.email,
                self.contact,
                self.dob
            ).build_transaction({
                'from': self.publicKey,
                'gas': int(gas_estimate),
                'gasPrice': self.web3.to_wei('20', 'gewi'),
                'nonce': nonce_vote
            })

            signed_transaction_vote = self.web3.eth.account.sign_transaction(transaction_vote , self.privateKey)
            transaction_hash_vote = self.web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)
            # Wait for the voteAAP transaction receipt
            tx_receipt_vote = self.web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
            # Check if the vote was successful
            if tx_receipt_vote['status'] == 1:
                return True
            else:
               return False
            

        if self.partyName == 'BJP':
            # function call to vote the user data to the aap party
            gas_estimate = self.contract.functions.voteBJP(self.username, self.email, self.contact, self.dob).estimate_gas()
            nonce_vote = self.web3.eth.get_transaction_count(self.publicKey)
            transaction_vote = self.contract.functions.voteBJP(
                self.username,
                self.email,
                self.contact,
                self.dob
            ).build_transaction({
                'from': self.publicKey,
                'gas': int(gas_estimate),
                'gasPrice': self.web3.to_wei('20', 'gewi'),
                'nonce': nonce_vote
            })

            signed_transaction_vote = self.web3.eth.account.sign_transaction(transaction_vote , self.privateKey)
            transaction_hash_vote = self.web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)
            # Wait for the voteAAP transaction receipt
            tx_receipt_vote = self.web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
            # Check if the vote was successful
            if tx_receipt_vote['status'] == 1:
                return True
            else:
               return False
            
        if self.partyName == 'CONGRESS':
            # function call to vote the user data to the aap party
            gas_estimate = self.contract.functions.voteCONGRESS(self.username, self.email, self.contact, self.dob).estimate_gas()
            nonce_vote = self.web3.eth.get_transaction_count(self.publicKey)
            transaction_vote = self.contract.functions.voteCONGRESS(
                self.username,
                self.email,
                self.contact,
                self.dob
            ).build_transaction({
                'from': self.publicKey,
                'gas': int(gas_estimate),
                'gasPrice': self.web3.to_wei('20', 'gewi'),
                'nonce': nonce_vote
            })

            signed_transaction_vote = self.web3.eth.account.sign_transaction(transaction_vote , self.privateKey)
            transaction_hash_vote = self.web3.eth.send_raw_transaction(signed_transaction_vote.rawTransaction)
            # Wait for the voteAAP transaction receipt
            tx_receipt_vote = self.web3.eth.wait_for_transaction_receipt(transaction_hash_vote)
            # Check if the vote was successful
            if tx_receipt_vote['status'] == 1:
                return True
            else:
               return False
            

