const fs = require('fs');
var Email = artifacts.require('./EmailVerification.sol');

module.exports = async function (deployer) {
    
    await deployer.deploy(Email);
    const emailAbi = Email.abi;
    console.log(emailAbi);
    
    if (fs.existsSync('emailABI.json')) {
        // If ABI file exists, overwrite its contents with the new ABI data
        fs.writeFileSync('emailABI.json', JSON.stringify(emailAbi));
        console.log('ABI file for Email updated');
    } else {
        // If ABI file doesn't exist, create a new one and write ABI data
        fs.writeFileSync('emailABI.json', JSON.stringify(emailAbi));
        console.log('New ABI file created for Email');
    }
}