// // function to save up the email 
// const Web3 = require('web3');
// const fs = require('fs');
// const path = require('path');

// let contractABI = {}
// // Path to the build directory of your Truffle project
// const buildDir = path.resolve(__dirname, '../build/contracts');

// // Read all files in the build directory
// fs.readdir(buildDir, (err, files) => {
//     if (err) {
//         console.error('Error reading build directory:', err);
//         return;
//     }

//     const jsonFiles = files.filter(file => file === 'EmailVerification.json');

//     // // Filter out JSON files
//     // const jsonFiles = files.filter(file => file.endsWith('.json'));

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
//             contractABI = abi;
          
//         } catch (error) {
//             console.error('Error parsing JSON content:', error);
//         }
//     });
// });


// // const contractAddress = '0xc270f6f59c2c56ede636669ca6d6e27255b35e8e';
// const contractAddress = '0x5000845ACEE861171460c580c021005aCedD6382';

// const web3 = new Web3('http://localhost:7545'); 

// // Create a contract instance
// const myContract = new web3.eth.Contract(contractABI, contractAddress);

// const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
// const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7'

// function SaveEmailPrivateKey(privateKeyParam, emailParam) {
//     // Encode the function call
//     const encodedFunctionCall = myContract.methods.SaveEmailMapping(privateKeyParam, emailParam).encodeABI();
//     const transactionObject = {
//         from: account_address, 
//         to: contractAddress,
//         data: encodedFunctionCall,
//     };

//     // Dynamically estimate gas
//     web3.eth.estimateGas(transactionObject)
//         .then(gasEstimate => {
//             // Adjust the gas limit as needed
//             transactionObject.gas = gasEstimate;

//             // Dynamically get gas price
//             return web3.eth.getGasPrice();
//         })
//         .then(gasPrice => {
//             // Replace with the dynamic gas price in wei
//             transactionObject.gasPrice = gasPrice;

//             // Sign the transaction
//             return web3.eth.accounts.signTransaction(transactionObject, privateKeySign);
//         })
//         .then(signedTx => {
//             // writing off the signed transcations
//             console.log(`signed transaction: ${signedTx}`);
//             // Send the signed transaction
//             return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//         })
//         .then(receipt => {
//             console.log('Transaction receipt:', receipt);
//             return true;
//         })
//         .catch(error => {
//             console.error('Error sending transaction:', error);
//             return false;
//         });
// }


// module.exports = {
//     SaveEmailPrivateKey
// }



const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Function to read contract ABI from JSON file
function readContractABI() {
    return new Promise((resolve, reject) => {
        // Path to the build directory of your Truffle project
        const buildDir = path.resolve(__dirname, './build/contracts');

        // Read all files in the build directory
        fs.readdir(buildDir, (err, files) => {
            if (err) {
                reject('Error reading build directory:', err);
                return;
            }

            const jsonFiles = files.filter(file => file === 'EmailVerification.json');

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
module.exports = async function SaveEmailPrivateKey(privateKeyParam, emailParam) {
    try {
        // Read contract ABI
        const contractABI = await readContractABI();

        // contract address
        const contractAddress = '0x5000845ACEE861171460c580c021005aCedD6382';

        // Initialize web3 instance
        const web3 = new Web3('http://localhost:7545');

        // Create a contract instance
        const myContract = new web3.eth.Contract(contractABI, contractAddress);

        const privateKeySign = '0xe49bcbe04943971a6bfa009586c62e53f932e4e6b733a58a878871f1c004ae89';
        const account_address = '0xA19a84eA60BEf6f5695038de0873039a82EEB6b7';

        // Encode the function call
        const encodedFunctionCall = myContract.methods.SaveEmailMapping(privateKeyParam, emailParam).encodeABI();
        const transactionObject = {
            from: account_address, 
            to: contractAddress,
            data: encodedFunctionCall,
        };

        // Dynamically estimate gas
        const gasEstimate = await web3.eth.estimateGas(transactionObject);
        // Adjust the gas limit as needed
        transactionObject.gas = gasEstimate;

        // Dynamically get gas price
        const gasPrice = await web3.eth.getGasPrice();
        // Replace with the dynamic gas price in wei
        transactionObject.gasPrice = gasPrice;

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(transactionObject, privateKeySign);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);

        return true;
    } catch (error) {
        console.error('Error sending transaction:', error);
        return false;
    }
};
