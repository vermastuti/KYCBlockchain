var helloWorld=artifacts.require("./incedo.sol");
module.exports = function(deployer) {
  deployer.deploy(helloWorld);  
};   