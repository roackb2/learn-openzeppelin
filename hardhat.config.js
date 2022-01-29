/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-web3')
require('@nomiclabs/hardhat-truffle5');
require('@nomiclabs/hardhat-etherscan');
const {
  deployBox,
  deployCoin
} = require('./scripts/deploy.js')
const {
  getBalance,
  listAccounts
} = require('./scripts/general-actions')
const {
  retrieveBox,
  storeToBox,
} = require('./scripts/box-actions')
const {
  mint,
  send,
  getCoinBalance,
  getSelfCoinBalance
} = require('./scripts/coin-actions')
const { task } = require('hardhat/config')
const {
  MAINNET_ALCHEMY_API_KEY,
  MAINNET_ACCOUNT_PRIVATE_KEY,
  RINKEBY_ALCHEMY_API_KEY,
  RINKEBY_ACCOUNT_PRIVATE_KEY,
  ETHERSCAN_API_KEY
} = process.env

// general actions
task('list-accounts', 'List all accounts').setAction(listAccounts)
task('get-balance', 'Get balance in first account')
  .addParam('address', 'Address of account to query')
  .setAction(getBalance)

// Box contract related actions
task('deploy-box', 'Deploy our Box contract').setAction(deployBox)
task('retrieve-box').setAction(retrieveBox)
task('store-to-box')
  .addParam('value', 'The value to store in Box. Must be integer')
  .setAction(storeToBox)

// Coin contract related actions
task('deploy-coin', 'Deploy Coin contract').setAction(deployCoin)
task('mint', 'Mint coin to someone')
  .addParam('receiver', 'Address of coin receiver')
  .addParam('amount', 'Amount to mint')
  .setAction(mint)
task('send', 'Transfer some coin')
  .addParam('receiver', 'Address of coin receiver')
  .addParam('amount', 'Amount to transfer')
  .setAction(send)
task('get-coin-balance', 'Get Coin balance of certain address')
  .addParam('address', 'Address to query')
  .setAction(getCoinBalance)
task('get-self-coin-balance', 'Get balance of your own account').setAction(getSelfCoinBalance)

module.exports = {
  solidity: '0.8.4',
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
