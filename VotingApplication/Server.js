const express = require('express');
const app = express();
const port = 3003;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON requests
app.use(bodyParser.json());
const Web3 = require('web3');
// web3 instance
const web3 = new Web3("https://sepolia.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d");

const contract_abi = [
    {
        "inputs": [],
        "name": "activateResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
                "internalType": "string",
                "name": "_dob",
                "type": "string"
            }
        ],
        "name": "voteAAP",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
                "internalType": "string",
                "name": "_dob",
                "type": "string"
            }
        ],
        "name": "voteBJP",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
                "internalType": "string",
                "name": "_dob",
                "type": "string"
            }
        ],
        "name": "voteCONGRESS",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "AAP",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "aapVotes",
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
                "internalType": "string",
                "name": "dob",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "BJP",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "bjpVotes",
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
                "internalType": "string",
                "name": "dob",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "CONGRESS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "congressVotes",
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
                "internalType": "string",
                "name": "dob",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deployerAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDeployedContractAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getElectionResult",
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
        "inputs": [],
        "name": "getVotes",
        "outputs": [
            {
                "components": [
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
                        "internalType": "string",
                        "name": "dob",
                        "type": "string"
                    }
                ],
                "internalType": "struct Election.User[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "components": [
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
                        "internalType": "string",
                        "name": "dob",
                        "type": "string"
                    }
                ],
                "internalType": "struct Election.User[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "components": [
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
                        "internalType": "string",
                        "name": "dob",
                        "type": "string"
                    }
                ],
                "internalType": "struct Election.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "getVotingStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "showResult",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contract_address = "0x91bA62857279F00a32c9FF58d6c6bb5e3DEb8670"
const contract_checksum_address = web3.utils.toChecksumAddress(contract_address);
const contract = new web3.eth.Contract(contract_abi, contract_checksum_address);

// const voterAddress = "0xcf3Fd27A92AAc6ecbB314312eA61c6D32f8E5412";

// // Call the getVotingStatus method
// contract.methods.getVotingStatus(voterAddress).call({ gas: 200000 })
//     .then(async result => {
//         // The result contains the return value of the method
//         const hasVoted = await result;

//         // Use the result as needed
//         console.log(`Has the voter at address ${voterAddress} voted? ${hasVoted}`);
//     })
//     .catch(error => {
//         console.error("Error calling getVotingStatus:", error);
//     });


app.get('/AlreadyVoted/:publickey', async (req, res) => {
    const publickey = req.params.publickey;
    console.log('public key is', publickey);
    //const check_sum_publickey  = web3.utils.toChecksumAddress(publickey)
    has_voted = await contract.methods.getVotingStatus(publickey).call()
    if (has_voted) {
        console.log('user has voted already');
        res.json({ 'status': 200, 'has_voted': true });
    }
    else {
        console.log('user has not voted yet');
        res.json({ 'status': 200, 'has_voted': false });
    }
});

app.post('/Vote', async (req, res) => {
    const { publickey, privatekey, selected_party, username, email, dob, contact } = req.body.doc;

    try {
        const gasPrice = await web3.eth.getGasPrice();
        const nonce = await web3.eth.getTransactionCount(publickey);

        // Build transaction data
        const transactionData = contract.methods[`vote${selected_party}`](username, email, contact, dob).encodeABI();
        const transactionObject = {
            from: publickey,
            to: contract_address,
            gas: 200000, // Adjust gas based on your contract requirements
            gasPrice: gasPrice,
            nonce: nonce,
            data: transactionData,
        };

        // Estimate gas and get gas price
        const gasEstimate = await web3.eth.estimateGas(transactionObject);
        transactionObject.gas = gasEstimate;

        const dynamicGasPrice = await web3.eth.getGasPrice();
        transactionObject.gasPrice = dynamicGasPrice;

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(transactionObject, privatekey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Check if the transaction was successful
        if (receipt) {
            res.status(200).json({ success: true, transactionHash: receipt.transactionHash });
        } else {
            res.status(500).json({ error: 'Transaction failed. Check contract logs for details.' });
        }
    } catch (error) {
        console.error(`Error executing vote${selected_party}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a simple route
app.get('/OwnerCheck/:publicKey', (req, res) => {
    console.log(req.params.publicKey);
    const publicKey = req.params.publicKey;
    const electionBoard = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"
    // converting checksum address
    publicKey_CheckSumAddress = web3.utils.toChecksumAddress(publicKey);
    electionBoard_CheckSumAddress = web3.utils.toChecksumAddress(electionBoard);

    if (publicKey_CheckSumAddress == electionBoard_CheckSumAddress) {
        console.log('public key matches with election board')
        res.json({ 'status': 200, 'owner': true });
    }
    else {
        res.json({ 'status': 200, 'owner': false });
    }
});

// activating result 
app.get('/Activate_result', async (req, res) => {
    const publickey = req.body.publickey;
    const activate_result = contract.methods.activateResult().call({ 'from': publickey });
    if (activate_result == "Election result can only be activated by committee") {
        res.json({ 'status': 200, 'result_announced': false });
    }
    else {
        res.json({ 'status': 200, 'result_announced': true });
    }
})

// getting the result 
app.get('/CheckResults', async (req, res) => {
    const result_status = await contract.methods.getElectionResult().call();
    console.log(result_status);
    if (result_status == "Results are not accounted yet") {
        res.json({ 'status': 200, 'success': false });
    }
    else {
        res.json({ 'status': 200, 'success': true, 'result_message': result_status });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
