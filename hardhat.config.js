/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
const deploy = require('./scripts/deploy.js')
const listAccounts = require('./scripts/list-accounts')

task("deploy", "Deploy our Box contract").setAction(deploy)
task("list-accounts", "List all accounts").setAction(listAccounts)

module.exports = {
  solidity: "0.8.4",
};
