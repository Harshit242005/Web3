


// const fs = require('fs');
// const path = require('path');
// const Web3 = require('web3');



// // Path to the build directory of your Truffle project
// const buildDir = path.resolve(__dirname, './build/contracts');
// let contract_abi = {} 
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
//             console.log(abi);
//             contract_abi = abi;
          
//         } catch (error) {
//             console.error('Error parsing JSON content:', error);
//         }
//     });
// });




// // address for the contract
// const contractAddress = "0xE680F34143E67401e57738ca5fC90Bc7F1960022";


// const web3 = new Web3('http://localhost:7545'); 
// const interface_2_contract = new web3.eth.Contract(contract_abi, contractAddress);


// const GetDetails = async (account_address) => {
//     try {
//         // Get username
//         const username = await interface_2_contract.methods.getUsernameByAddress(account_address).call();

//         // Get email
//         const email = await interface_2_contract.methods.getEmailByAddress(account_address).call();

//         // Get date of birth
//         const dob = await interface_2_contract.methods.getDOBByAddress(account_address).call();

//         // Get contact
//         const contact = await interface_2_contract.methods.getContactByAddress(account_address).call();
// 		const cid = await interface_2_contract.methods.getCidByAddress(account_address).call();
//         console.log('Fetching details')
//         console.log("Username:", username);
//         console.log("Email:", email);
//         console.log("Date of Birth:", dob);
//         console.log("Contact:", contact);
//         console.log('Cid', cid);
//         // Return the values if needed
//         return { username, email, dob, contact, cid };
//     } catch (error) {
//         console.error("Error getting details:", error);
//     }
// }

// module.exports = {
//     GetDetails
// }






const fs = require('fs');
const path = require('path');
const Web3 = require('web3');

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
module.exports = async function GetDetails(account_address) {
    try {
        // Read contract ABI
        const contractABI = await readContractABI();

        // Address for the contract
        const contractAddress = "0xE680F34143E67401e57738ca5fC90Bc7F1960022";

        // Initialize web3 instance
        const web3 = new Web3('http://localhost:7545');

        // Create a contract instance
        const interface_2_contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get details from the contract
        const username = await interface_2_contract.methods.getUsernameByAddress(account_address).call();
        const email = await interface_2_contract.methods.getEmailByAddress(account_address).call();
        const dob = await interface_2_contract.methods.getDOBByAddress(account_address).call();
        const contact = await interface_2_contract.methods.getContactByAddress(account_address).call();
        const cid = await interface_2_contract.methods.getCidByAddress(account_address).call();

        console.log('Fetching details');
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Date of Birth:", dob);
        console.log("Contact:", contact);
        console.log('Cid', cid);

        // Return the values if needed
        return { username, email, dob, contact, cid };
    } catch (error) {
        console.error("Error getting details:", error);
    }
};
