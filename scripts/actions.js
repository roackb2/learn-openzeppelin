async function listAccounts() {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

async function retrieveBox(args) {
  const { address } = args
  const Box = await ethers.getContractFactory('Box')
  const box = await Box.attach(address)
  const value = await box.retrieve()
  console.log(`value in box: ${value}`)
}

module.exports = {
  listAccounts,
  retrieveBox
}
