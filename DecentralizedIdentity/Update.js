// // for updating individual value of the code 
// const Web3 = require('web3');
// const fs = require('fs');
// const path = require('path');

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
// const interface_2_contract = new web3.eth.Contract(contract_abi, contractAddress);

// const updateValueInContract = async (valueType, value, publicAddress, privateKey) => {
//     console.log(`value type is: ${ valueType }, value is: ${ value }, and public address is: ${publicAddress}`);

//     switch (valueType) {
//         case 'email':
//             // run to create a transcation to set up new value 
//             const encodedFunctionCallEmail = interface_2_contract.methods.updateEmail(publicAddress, value).encodeABI();
//             const transcationObjectEmail = {
//                 from: publicAddress,
//                 to: contractAddress,
//                 data: encodedFunctionCallEmail
//             }
//             web3.eth.estimateGas(transcationObjectEmail)
//                 .then(gasEstimate => {
//                     transcationObjectEmail.gas = gasEstimate;
//                     return web3.eth.getGasPrice();
//                 })
//                 .then(gasPrice => {
//                     transcationObjectEmail.gasPrice = gasPrice;
//                     return web3.eth.accounts.signTransaction(transcationObjectEmail, privateKey);
//                 })
//                 .then(signedTx => {
//                     console.log(`signed transaction: ${signedTx}`);
//                     return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//                 })
//                 .then(receipt => {
//                     console.log('Transaction receipt:', receipt);
//                     return { status: 200, message: 'Value updated successfully' };
//                 })
//                 .catch(error => {
//                     console.error('Error sending transaction:', error);
//                     return { status: 400, message: 'Failed to update value' };
//                 });
//             break;
//         case 'fullName':
//             // run to create a transcation to set up new value 
//             const encodedFunctionCallFullName = interface_2_contract.methods.updateUsername(publicAddress, value).encodeABI();
//             const transcationObjectFullName = {
//                 from: publicAddress,
//                 to: contractAddress,
//                 data: encodedFunctionCallFullName
//             }
//             web3.eth.estimateGas(transcationObjectFullName)
//                 .then(gasEstimate => {
//                     transcationObjectFullName.gas = gasEstimate;
//                     return web3.eth.getGasPrice();
//                 })
//                 .then(gasPrice => {
//                     transcationObjectFullName.gasPrice = gasPrice;
//                     return web3.eth.accounts.signTransaction(transcationObjectFullName, privateKey);
//                 })
//                 .then(signedTx => {
//                     console.log(`signed transaction: ${signedTx}`);
//                     return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//                 })
//                 .then(receipt => {
//                     console.log('Transaction receipt:', receipt);
//                     return { status: 200, message: 'Value updated successfully' };
//                 })
//                 .catch(error => {
//                     console.error('Error sending transaction:', error);
//                     return { status: 400, message: 'Failed to update value' };
//                 });
//             break;
        
//         case 'contact':
//             // run to create a transcation to set up new value 
//             const encodedFunctionCallContact = interface_2_contract.methods.updateContact(publicAddress, value).encodeABI();
//             const transcationObjectContact = {
//                 from: publicAddress,
//                 to: contractAddress,
//                 data: encodedFunctionCallContact
//             }
//             web3.eth.estimateGas(transcationObjectContact)
//                 .then(gasEstimate => {
//                     transcationObjectContact.gas = gasEstimate;
//                     return web3.eth.getGasPrice();
//                 })
//                 .then(gasPrice => {
//                     transcationObjectContact.gasPrice = gasPrice;
//                     return web3.eth.accounts.signTransaction(transcationObjectContact, privateKey);
//                 })
//                 .then(signedTx => {
//                     console.log(`signed transaction: ${signedTx}`);
//                     return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//                 })
//                 .then(receipt => {
//                     console.log('Transaction receipt:', receipt);
//                     return { status: 200, message: 'Value updated successfully' };

//                 })
//                 .catch(error => {
//                     console.error('Error sending transaction:', error);
//                     return { status: 400, message: 'Failed to update value' };
//                 });
//             break;

//         case 'dob':
//             // run to create a transcation to set up new value 
//             const encodedFunctionCallDob = interface_2_contract.methods.updateDOB(publicAddress, value).encodeABI();
//             const transcationObjectDob = {
//                 from: publicAddress,
//                 to: contractAddress,
//                 data: encodedFunctionCallDob
//             }
//             web3.eth.estimateGas(transcationObjectDob)
//                 .then(gasEstimate => {
//                     transcationObjectDob.gas = gasEstimate;
//                     return web3.eth.getGasPrice();
//                 })
//                 .then(gasPrice => {
//                     transcationObjectDob.gasPrice = gasPrice;
//                     return web3.eth.accounts.signTransaction(transcationObjectDob, privateKey);
//                 })
//                 .then(signedTx => {
//                     console.log(`signed transaction: ${signedTx}`);
//                     return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//                 })
//                 .then(receipt => {
//                     console.log('Transaction receipt:', receipt);
//                     return { status: 200, message: 'Value updated successfully' };

//                 })
//                 .catch(error => {
//                     console.error('Error sending transaction:', error);
//                     return { status: 400, message: 'Failed to update value' };
//                 });

// 			// to update the cid value 
// 			case 'cid':
// 				 // run to create a transcation to set up new value 
// 				 const encodedFunctionCallCid = interface_2_contract.methods.updateCid(publicAddress, value).encodeABI();
// 				 const transcationObjectCid = {
// 					 from: publicAddress,
// 					 to: contractAddress,
// 					 data: encodedFunctionCallCid
// 				 }
// 				 web3.eth.estimateGas(transcationObjectCid)
// 					 .then(gasEstimate => {
// 						transcationObjectCid.gas = gasEstimate;
// 						 return web3.eth.getGasPrice();
// 					 })
// 					 .then(gasPrice => {
// 						transcationObjectCid.gasPrice = gasPrice;
// 						 return web3.eth.accounts.signTransaction(transcationObjectCid, privateKey);
// 					 })
// 					 .then(signedTx => {
// 						 console.log(`signed transaction: ${signedTx}`);
// 						 return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
// 					 })
// 					 .then(receipt => {
// 						 console.log('Transaction receipt:', receipt);
// 						 return { status: 200, message: 'Value updated successfully' };
	 
// 					 })
// 					 .catch(error => {
// 						 console.error('Error sending transaction:', error);
// 						 return { status: 400, message: 'Failed to update value' };
// 					 });

//             break;
//     }
// }

// module.exports = {
//     updateValueInContract
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
module.exports = async function updateValueInContract(valueType, value, publicAddress, privateKey) {
    try {
        // Read contract ABI
        const contractABI = await readContractABI();

        // contract address
        const contractAddress = "0xE680F34143E67401e57738ca5fC90Bc7F1960022";

        // Initialize web3 instance
        const web3 = new Web3('http://localhost:7545');

        // Create a contract instance
        const myContract = new web3.eth.Contract(contractABI, contractAddress);

        console.log(`value type is: ${valueType}, value is: ${value}, and public address is: ${publicAddress}`);

        // Define the switch cases for different value types
        switch (valueType) {
            case 'email':
                // Run to create a transaction to set up a new value for email
                const encodedFunctionCallEmail = myContract.methods.updateEmail(publicAddress, value).encodeABI();
                const transactionObjectEmail = {
                    from: publicAddress,
                    to: contractAddress,
                    data: encodedFunctionCallEmail
                };

                await sendTransaction(web3, privateKey, transactionObjectEmail);
                break;

            case 'fullName':
                // Run to create a transaction to set up a new value for full name
                const encodedFunctionCallFullName = myContract.methods.updateUsername(publicAddress, value).encodeABI();
                const transactionObjectFullName = {
                    from: publicAddress,
                    to: contractAddress,
                    data: encodedFunctionCallFullName
                };

                await sendTransaction(web3, privateKey, transactionObjectFullName);
                break;

            case 'contact':
                // Run to create a transaction to set up a new value for contact
                const encodedFunctionCallContact = myContract.methods.updateContact(publicAddress, value).encodeABI();
                const transactionObjectContact = {
                    from: publicAddress,
                    to: contractAddress,
                    data: encodedFunctionCallContact
                };

                await sendTransaction(web3, privateKey, transactionObjectContact);
                break;

            case 'dob':
                // Run to create a transaction to set up a new value for date of birth
                const encodedFunctionCallDob = myContract.methods.updateDOB(publicAddress, value).encodeABI();
                const transactionObjectDob = {
                    from: publicAddress,
                    to: contractAddress,
                    data: encodedFunctionCallDob
                };

                await sendTransaction(web3, privateKey, transactionObjectDob);
                break;

            case 'cid':
                // Run to create a transaction to set up a new value for CID
                const encodedFunctionCallCid = myContract.methods.updateCid(publicAddress, value).encodeABI();
                const transactionObjectCid = {
                    from: publicAddress,
                    to: contractAddress,
                    data: encodedFunctionCallCid
                };

                await sendTransaction(web3, privateKey, transactionObjectCid);
                break;

            default:
                console.error('Invalid value type.');
                break;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to send a transaction
async function sendTransaction(web3, privateKey, transactionObject) {
    try {
        // Dynamically estimate gas
        const gasEstimate = await web3.eth.estimateGas(transactionObject);
        transactionObject.gas = gasEstimate;

        // Dynamically get gas price
        const gasPrice = await web3.eth.getGasPrice();
        transactionObject.gasPrice = gasPrice;

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(transactionObject, privateKey);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}
