/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-truffle5");
const deploy = require('./scripts/deploy.js')
const {
  listAccounts,
  retrieveBox,
  storeToBox,
  getBalance
} = require('./scripts/actions')
const { task } = require('hardhat/config')
const { ALCHEMY_API_KEY, RINKEBY_ACCOUNT_PRIVATE_KEY } = process.env

task("deploy", "Deploy our Box contract").setAction(deploy)
task("list-accounts", "List all accounts").setAction(listAccounts)
task('get-balance', "Get balance in first account").setAction(getBalance)
task('retrieve-box').setAction(retrieveBox)
task('store-to-box')
  .addParam('value', 'The value to store in Box. Must be integer')
  .setAction(storeToBox)

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [RINKEBY_ACCOUNT_PRIVATE_KEY]
    }
  }
};
