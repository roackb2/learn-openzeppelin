/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
const deploy = require('./scripts/deploy.js')
const {
  listAccounts,
  retrieveBox
} = require('./scripts/actions')

task("deploy", "Deploy our Box contract").setAction(deploy)
task("list-accounts", "List all accounts").setAction(listAccounts)
task('retrieve-box')
  .addParam('address', 'Address of the Box contract')
  .setAction(retrieveBox)

module.exports = {
  solidity: "0.8.4",
};
