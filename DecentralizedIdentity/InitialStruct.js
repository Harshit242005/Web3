

// const Web3 = require('web3');
// const fs = require('fs');
// const path = require('path');


// // contract ABI
// let contract_abi = {}
// // Path to the build directory of your Truffle project
// const buildDir = path.resolve(__dirname, '../build/contracts');

// // Read all files in the build directory
// fs.readdir(buildDir, (err, files) => {
//     if (err) {
//         console.error('Error reading build directory:', err);
//         return;
//     }

//     const jsonFiles = files.filter(file => file === 'UserRegistry.json');

   

//     // Check if there are any JSON files
//     if (jsonFiles.length === 0) {
//         console.error('No JSON files found in the build directory.');
//         return;
//     }

//     // Get the path to the first JSON file
//     const firstJsonFile = jsonFiles[0];
//     const filePath = path.join(buildDir, firstJsonFile);

//     // Read the content of the JSON file
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading JSON file:', err);
//             return;
//         }

//         try {
//             // Parse the JSON content to extract the ABI
//             const { abi } = JSON.parse(data);
//             contract_abi = abi;
          
//         } catch (error) {
//             console.error('Error parsing JSON content:', error);
//         }
//     });
// });



// // address for the contract
// const contractAddress = "0xE680F34143E67401e57738ca5fC90Bc7F1960022";
// // contract remote nodes 
// const web3 = new Web3('http://localhost:7545'); 
// // contract instance creation
// const interface_1_contract = new web3.eth.Contract(contract_abi, contractAddress);
// // account details 
// const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
// const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7'

// function InitialStruct(publicAddress, email, username, contact, dob, privateKey, cid) {
//     // calling the deployed contract function
//     const initalStructABI = interface_1_contract.methods.createUser(publicAddress, email, username, contact, dob, privateKey, cid).encodeABI();
//     // transaction data and calling contract
//     const transactionObject = {
//         from: account_address, 
//         to: contractAddress,
//         data: initalStructABI,
//     };

//     return new Promise((resolve, reject) => {
//         // calling out the function by adding details related to the contract
//         web3.eth.estimateGas(transactionObject)
//             .then(gasEstimate => {
//                 // Adjust the gas limit as needed
//                 transactionObject.gas = gasEstimate;

//                 // Dynamically get gas price
//                 return web3.eth.getGasPrice();
//             })
//             .then(gasPrice => {
//                 // Replace with the dynamic gas price in wei
//                 transactionObject.gasPrice = gasPrice;

//                 // Sign the transaction
//                 return web3.eth.accounts.signTransaction(transactionObject, privateKeySign);
//             })
//             .then(signedTx => {
//                 // writing off the signed transcations
//                 console.log(`signed transaction: ${signedTx}`);
//                 // Send the signed transaction
//                 return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//             })
//             .then(receipt => {
//                 console.log('Transaction receipt:', receipt);
//                 // Check if the transaction was successful
//                 if (receipt) {
//                     // with the use of the receipt, we would fire some events from the deployed contract address
//                     resolve({ status: 200, message: 'User has been created' });
//                 } else {
//                     // Transaction failed, handle error
//                     reject({ status: 500, message: 'Transaction failed. Check contract logs for details.' });
//                 }
//             })
//             .catch(error => {
//                 console.error('Error sending transaction:', error);
//                 // Handle error, and send appropriate status and message
//                 reject({ status: 500, message: 'Error sending transaction. Check the server logs for details.' });
//             });
//     });
// }

// module.exports = {
//     InitialStruct
// };






const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// getting connected with the remote node to access the contracts
const web3 = new Web3('http://localhost:7545');

// Function to read contract ABI from JSON file
async function readContractABI() {
    return new Promise((resolve, reject) => {
        // Path to the build directory of your Truffle project
        const buildDir = path.resolve(__dirname, './build/contracts');

        // Read all files in the build directory
        fs.readdir(buildDir, (err, files) => {
            if (err) {
                reject('Error reading build directory:', err);
                return;
            }

            const jsonFiles = files.filter(file => file === 'UserRegistry.json');

            // Check if there are any JSON files
            if (jsonFiles.length === 0) {
                reject('No JSON files found in the build directory.');
                return;
            }

            // Get the path to the first JSON file
            const firstJsonFile = jsonFiles[0];
            const filePath = path.join(buildDir, firstJsonFile);

            // Read the content of the JSON file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject('Error reading JSON file:', err);
                    return;
                }

                try {
                    // Parse the JSON content to extract the ABI
                    const { abi } = JSON.parse(data);
                    resolve(abi);
                } catch (error) {
                    reject('Error parsing JSON content:', error);
                }
            });
        });
    });
}

// Export the function after initializing contract ABI
module.exports = async function InitialStruct(publicAddress, email, username, contact, dob, privateKey, cid) {
    try {
        // Read contract ABI
        const contractABI = await readContractABI();

        // contract address
        const contractAddress = "0xE680F34143E67401e57738ca5fC90Bc7F1960022";

        // contract instance creation
        const interface_1_contract = new web3.eth.Contract(contractABI, contractAddress);

        // account details
        const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
        const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7';

        // calling the deployed contract function
        const initalStructABI = interface_1_contract.methods.createUser(publicAddress, email, username, contact, dob, privateKey, cid).encodeABI();
        // transaction data and calling contract
        const transactionObject = {
            from: account_address, 
            to: contractAddress,
            data: initalStructABI,
        };

        return new Promise((resolve, reject) => {
            // calling out the function by adding details related to the contract
            web3.eth.estimateGas(transactionObject)
                .then(gasEstimate => {
                    // Adjust the gas limit as needed
                    transactionObject.gas = gasEstimate;

                    // Dynamically get gas price
                    return web3.eth.getGasPrice();
                })
                .then(gasPrice => {
                    // Replace with the dynamic gas price in wei
                    transactionObject.gasPrice = gasPrice;

                    // Sign the transaction
                    return web3.eth.accounts.signTransaction(transactionObject, privateKeySign);
                })
                .then(signedTx => {
                    // writing off the signed transcations
                    console.log(`signed transaction: ${signedTx}`);
                    // Send the signed transaction
                    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
                })
                .then(receipt => {
                    console.log('Transaction receipt:', receipt);
                    // Check if the transaction was successful
                    if (receipt) {
                        // with the use of the receipt, we would fire some events from the deployed contract address
                        resolve({ status: 200, message: 'User has been created' });
                    } else {
                        // Transaction failed, handle error
                        reject({ status: 500, message: 'Transaction failed. Check contract logs for details.' });
                    }
                })
                .catch(error => {
                    console.error('Error sending transaction:', error);
                    // Handle error, and send appropriate status and message
                    reject({ status: 500, message: 'Error sending transaction. Check the server logs for details.' });
                });
        });
    } catch (error) {
        console.error('Error initializing contract ABI:', error);
        throw error;
    }
};
