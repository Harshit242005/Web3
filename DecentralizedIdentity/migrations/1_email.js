var Email = artifacts.require('./EmailVerification.sol');

module.exports = async function (deployer) {

    await deployer.deploy(Email);
}