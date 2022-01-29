async function getSimpleAuctionContractAddress() {
  const network = await ethers.provider.getNetwork()
  switch (network.name) {
    case 'mainnet':
      return process.env.MAINNET_SIMPLE_AUCTION_CONTRACT_ADDRESS
    case 'rinkeby':
      return process.env.RINKEBY_SIMPLE_AUCTION_CONTRACT_ADDRESS
    default:
      return process.env.SIMPLE_AUCTION_CONTRACT_ADDRESS
  }
}

async function attachToSimpleAuctionContract() {
  const contractAddress = await getSimpleAuctionContractAddress()
  const SimpleAuction = await ethers.getContractFactory('SimpleAuction')
  const auction = await SimpleAuction.attach(contractAddress)
  return auction
}

async function bid(args) {
  try {
    const { amount } = args
    const contract = await attachToSimpleAuctionContract()
    let txn = await contract.bid({
      value: ethers.utils.parseEther(amount)
    })
    await txn.wait()
    console.log(`Successfully place a bid with amount ${amount}`)
  } catch (err) {
    console.error(`Error placing bid: ${err}`)
  }
}

async function withdraw() {
  try {
    const contract = await attachToSimpleAuctionContract()
    let txn = await contract.withdraw()
    await txn.wait()
    console.log(`Withdraw success`)
  } catch (err) {
    console.error(`Error while withdraw: ${err}`)
  }
}

async function auctionEnd() {
  try {
    const contract = await attachToSimpleAuctionContract()
    let txn = await contract.auctionEnd()
    await txn.wait()
    console.log(`Successfully end the auction`)
  } catch (err) {
    console.error(`Error while ending the auction: ${err}`)
  }
}

module.exports = {
  bid,
  withdraw,
  auctionEnd
}