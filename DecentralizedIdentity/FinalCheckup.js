


// const Web3 = require('web3');
// const fs = require('fs');
// const path = require('path');

// // getting connected with the remote node to access the contracts
// const web3 = new Web3('http://localhost:7545');

// let contractABI = {};
// const buildDir = path.resolve(__dirname, '../build/contracts');

// // Read all files in the build directory
// fs.readdir(buildDir, (err, files) => {
//     if (err) {
//         console.error('Error reading build directory:', err);
//         return;
//     }

//     const jsonFiles = files.filter(file => file === 'EmailVerification.json');

   

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
//             console.log(abi);
//             contractABI = abi;
          
//         } catch (error) {
//             console.error('Error parsing JSON content:', error);
//         }
//     });
// });



// const contractAddress = "0x5000845ACEE861171460c580c021005aCedD6382";

// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // calling up the function
// async function checkPrivateKeyExists(privateKey) {
//     try {
//         const test = privateKey.toString();
//         console.log(typeof test);
//         // Call the InitialCheckEmailMapping function
//         const result = await contract.methods.FinalCheckEmailMapping(privateKey.toString()).call();
//         console.log(`check final mapping result value is ${result}`);
//         // Return the result
//         return result;
//     } catch (error) {
//         // Handle errors
//         console.error('Error checking email:', error);
//         throw error; // Rethrow the error if needed
//     }
// }
// module.exports = checkPrivateKeyExists;



const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// getting connected with the remote node to access the contracts
const web3 = new Web3('http://localhost:7545');

let contractABI = {};
const buildDir = path.resolve(__dirname, './build/contracts');

// Function to read contract ABI from JSON file
async function readContractABI() {
    return new Promise((resolve, reject) => {
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
module.exports = async function checkPrivateKeyExists(privateKey) {
    try {
        // Read contract ABI
        const contractABI = await readContractABI();

        const contractAddress = "0x5000845ACEE861171460c580c021005aCedD6382";

        // Initialize contract with ABI and address
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const test = privateKey.toString();
        console.log(typeof test);
        // Call the FinalCheckEmailMapping function
        const result = await contract.methods.FinalCheckEmailMapping(privateKey.toString()).call();
        console.log(`check final mapping result value is ${result}`);
        // Return the result
        return result;
    } catch (error) {
        // Handle errors
        console.error('Error checking email:', error);
        throw error; // Rethrow the error if needed
    }
};
