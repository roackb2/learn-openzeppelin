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
    const types = ['uint', 'bool', 'bytes32']
    const values = [
      value,
      fake === 'true' ? true : false,
      ethers.utils.formatBytes32String(secret)
    ]
    console.log('values:', values)
    const blindedBid = await ethers.utils.solidityKeccak256(types, values)
    console.log(`The blinded bid: ${blindedBid}`)
    const contract = await attachToBlindAuctionContract()
    const txn = await contract.bid(blindedBid, {
      value: ethers.utils.parseEther(deposit)
    })
    await txn.wait()
    console.log(`Successfully place blinded bid with value: ${value}, fake ${fake} and secret: ${secret}`)
  } catch (err) {
    console.error('Error placing blind bid', err)
  }
}

async function reveal(args) {
  try {
    const { value, fake, secret } = args
    // TODO: support reveal of multiple bids
    const values = [value]
    const fakes = [fake === 'true' ? true : false]
    const secrets = [ethers.utils.formatBytes32String(secret)]
    const contract = await attachToBlindAuctionContract()
    const txn = await contract.reveal(values, fakes, secrets)
    await txn.wait()
    console.log(`Successfully reveal the bid with value: ${value}, fake ${fake} and secret: ${secret}`)
  } catch (err) {
    console.error('Error revealing bid', err)
  }
}

module.exports = {
  bid,
  reveal
}