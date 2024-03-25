const Abc = artifacts.require("./ABC.sol");

module.exports =async  function(deployer) {
    await deployer.deploy(Abc, 42);
    const instance = await Abc.deployed();
    console.log(instance);
};