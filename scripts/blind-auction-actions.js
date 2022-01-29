async function getBlindAuctionContractAddress() {
  const network = await ethers.provider.getNetwork()
  switch (network.name) {
    case 'mainnet':
      return process.env.MAINNET_BLIND_AUCTION_CONTRACT_ADDRESS
    case 'rinkeby':
      return process.env.RINKEBY_BLIND_AUCTION_CONTRACT_ADDRESS
    default:
      return process.env.BLIND_AUCTION_CONTRACT_ADDRESS
  }
}

async function attachToBlindAuctionContract() {
  const contractAddress = await getBlindAuctionContractAddress()
  const BlindAuction = await ethers.getContractFactory('BlindAuction')
  const auction = await BlindAuction.attach(contractAddress)
  return auction
}

async function bid(args) {
  try {
    const { value, fake, secret, deposit } = args
    console.log(value, fake, secret, deposit)
    const types = ['uint', 'bool', 'string']
    const values = [
      value,
      fake === 'true' ? true : false,
      ethers.utils.formatBytes32String(secret)
    ]
    const blindedBid = await ethers.utils.solidityKeccak256(types, values)
    console.log(`The blinded bid: ${blindedBid}`)
    const contract = await attachToBlindAuctionContract()
    const txn = await contract.bid(blindedBid, {
      value: ethers.utils.parseEther(deposit)
    })
    await txn.wait()
    console.log(`Successfully place blinded bid with value: ${value}, fake ${fake} and secret: ${secret}`)
  } catch (err) {
    console.error(`Error placing blind bid: ${err}`)
  }
}

module.exports = {
  bid
}