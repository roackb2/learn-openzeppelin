/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
const deploy = require('./scripts/deploy.js')
const {
  listAccounts,
  retrieveBox,
  storeToBox
} = require('./scripts/actions')
const { task } = require('hardhat/config')

task("deploy", "Deploy our Box contract").setAction(deploy)
task("list-accounts", "List all accounts").setAction(listAccounts)
task('retrieve-box')
  .addParam('address', 'Address of the Box contract')
  .setAction(retrieveBox)

task('store-to-box')
  .addParam('value', 'The value to store in Box. Must be integer')
  .addParam('address', 'The address of Box contract')
  .setAction(storeToBox)

module.exports = {
  solidity: "0.8.4",
};
