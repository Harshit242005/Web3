var userRegister = artifacts.require('./UserRegistry.sol')
module.exports = async function(deployer) {
    await deployer.deploy(userRegister);
}