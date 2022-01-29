async function getCoinContractAddress() {
  const network = await ethers.provider.getNetwork()
  switch (network.name) {
    case 'mainnet':
      return process.env.MAINNET_COIN_CONTRACT_ADDRESS
    case 'rinkeby':
      return process.env.RINKEBY_COIN_CONTRACT_ADDRESS
    default:
      return process.env.COIN_CONTRACT_ADDRESS
  }
}

async function attachToCoinContract() {
  const contractAddress = await getCoinContractAddress()
  const Coin = await ethers.getContractFactory('Coin')
  const coin = await Coin.attach(contractAddress)
  return coin
}

async function mint(args) {
  try {
    const { receiver, amount } = args
    const amountToSend = parseInt(amount, 10)
    const contract = await attachToCoinContract()
    console.log(`Minting ${amountToSend} coin to ${receiver}`)
    const txn = await contract.mint(receiver, amountToSend)
    await txn.wait()
    console.log(`Coin ${amountToSend} minted to ${receiver}`)
  } catch (err) {
    console.error(`Error minting: ${err}`)
  }
}

async function send(args) {
  try {
    const { receiver, amount } = args
    const amountToSend = parseInt(amount, 10)
    const contract = await attachToCoinContract()
    console.log(`Sending ${amountToSend} to ${receiver}`)
    const txn = await contract.send(receiver, amountToSend)
    await txn.wait()
    console.log(`Coin of amount ${amountToSend} transferred from ${txn.from} to ${receiver}`)
  } catch (err) {
    console.error(`Error sending: ${err}`)
  }
}

async function getCoinBalance(args) {
  try {
    const { address } = args
    const contract = await attachToCoinContract()
    const amount = await contract.getBalance(address)
    console.log(`Balance of ${address}: ${amount}`)
  } catch (err) {
    console.error(`Error getting Coin Balance: ${err}`)
  }
}

async function getSelfCoinBalance() {
  try {
    const contract = await attachToCoinContract()
    const amount = await contract.getSelfBalance()
    console.log(`Your balance: ${amount}`)
  } catch (err) {
    console.error(`Error getting self balance: ${err}`)
  }
}

module.exports = {
  mint,
  send,
  getCoinBalance,
  getSelfCoinBalance
}