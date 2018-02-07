var PlanItToken = artifacts.require("./PlanItToken.sol");

module.exports = function (deployer) {
    deployer.deploy(PlanItToken);
};