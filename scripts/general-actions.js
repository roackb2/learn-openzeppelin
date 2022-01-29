async function getBalance(args) {
  const { address } = args
  const balance = await ethers.provider.getBalance(address)
  console.log(`balance: ${balance.toString()}`)
}

async function listAccounts() {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

module.exports = {
  getBalance,
  listAccounts
}