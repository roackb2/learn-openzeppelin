async function getContractAddress() {
  const network = await ethers.provider.getNetwork();
  switch (network.name) {
    case 'mainnet':
      return process.env.MAINNET_BOX_CONTRACT_ADDRESS
    case 'rinkeby':
      return process.env.RINKEBY_BOX_CONTRACT_ADDRESS
    default:
      return process.env.BOX_CONTRACT_ADDRESS
  }
}

async function attachBox(address) {
  const Box = await ethers.getContractFactory('Box')
  const box = await Box.attach(address)
  return box
}

async function retrieveBox() {
  const address = await getContractAddress()
  const box = await attachBox(address)
  const value = await box.retrieve()
  console.log(`value in box: ${value}`)
}

async function storeToBox(args) {
  const address = await getContractAddress()
  const { value } = args
  try {
    const num = parseInt(value, 10)
    const box = await attachBox(address)
    // CAUTION: transaction will cause gas fee
    await box.store(num)
    const stored = await box.retrieve()
    console.log(`value stored into box: ${stored}`)
  } catch (e) {
    console.log(`invalid value: ${value}`)
  }
}

module.exports = {
  retrieveBox,
  storeToBox
}
