async function listAccounts() {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

async function attachBox(address) {
  const Box = await ethers.getContractFactory('Box')
  const box = await Box.attach(address)
  return box
}

async function retrieveBox() {
  const address = process.env.CONTRACT_ADDRESS
  const box = await attachBox(address)
  const value = await box.retrieve()
  console.log(`value in box: ${value}`)
}

async function storeToBox(args) {
  const address = process.env.CONTRACT_ADDRESS
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
  listAccounts,
  retrieveBox,
  storeToBox
}
