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
  deployCoin,
  deploySimpleAuction,
  deployBlindAuction,
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
const {
  bid,
  withdraw,
  auctionEnd
} = require('./scripts/simple-auction-actions')
const {
  bid: blindAuctionBid,
  reveal
} = require('./scripts/blind-auction-actions')
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
 
// SimpleAuction contract actions
task('deploy-simple-auction', 'Deploy SimpleAuction contract')
  .addParam('biddingTime', 'The period of time in seconds until bidding ends')
  .addParam('beneficiary', 'Address of the beneficiary')
  .setAction(deploySimpleAuction)
task('bid', 'Place a bid in a simple auction')
  .addParam('amount', 'The amount to bid')
  .setAction(bid)
task('withdraw', 'Withdraw bids')
  .setAction(withdraw)
task('auction-end', 'End the simple auction')
  .setAction(auctionEnd)
 
// BlindAuction contract actions
task('deploy-blind-auction', 'Deploy BlindAuction contract')
  .addParam('biddingTime', 'The period of time in seconds until bidding ends')
  .addParam('revealTime', 'The period of time in seconds until the reveal stage ends after bidding end')
  .addParam('beneficiary', 'Address of the beneficiary')
  .setAction(deployBlindAuction)
task('blind-auction-bid', 'Place a blinded bid on the blind auction')
  .addParam('value', 'The amount to bid claimed in the blinded bid')
  .addParam('fake', 'Is this bid marked as fake')
  .addParam('secret', 'Some secret to salt the blinded bid')
  .addParam('deposit', 'Amount of ETH to send along with the blinded bid')
  .setAction(blindAuctionBid)

task('blind-auction-reveal', 'Reveal the blinded bid on the blind auction')
  .addParam('value', 'The amount to bid claimed in the blinded bid')
  .addParam('fake', 'Is this bid marked as fake')
  .addParam('secret', 'Some secret to salt the blinded bid')
  .setAction(reveal)
 
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
