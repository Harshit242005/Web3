
const fs = require('fs');
var userRegister = artifacts.require('./UserRegistry.sol');


module.exports = async function(deployer) {

    await deployer.deploy(userRegister);
    const registerContractAbi = userRegister.abi;
    
    
    if (fs.existsSync('userRegisterABI.json')) {
        // If ABI file exists, overwrite its contents with the new ABI data
        fs.writeFileSync('userRegisterABI.json', JSON.stringify(registerContractAbi));
        console.log('ABI file for userRegister updated');
    } else {
        // If ABI file doesn't exist, create a new one and write ABI data
        fs.writeFileSync('userRegisterABI.json', JSON.stringify(registerContractAbi));
        console.log('New ABI file created for userRegister');
    }
}

