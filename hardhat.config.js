/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require("@nomiclabs/hardhat-web3")
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
const deploy = require('./scripts/deploy.js')
const {
  listAccounts,
  retrieveBox,
  storeToBox,
  getBalance
} = require('./scripts/actions')
const { task } = require('hardhat/config')
const {
  MAINNET_ALCHEMY_API_KEY,
  MAINNET_ACCOUNT_PRIVATE_KEY,
  RINKEBY_ALCHEMY_API_KEY,
  RINKEBY_ACCOUNT_PRIVATE_KEY,
  ETHERSCAN_API_KEY
} = process.env

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
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_API_KEY}`,
      accounts: [MAINNET_ACCOUNT_PRIVATE_KEY]
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_ALCHEMY_API_KEY}`,
      accounts: [RINKEBY_ACCOUNT_PRIVATE_KEY]
    },
    etherscan: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${MAINNET_ALCHEMY_API_KEY}`,
      apiKey: ETHERSCAN_API_KEY
    }
  }
};
