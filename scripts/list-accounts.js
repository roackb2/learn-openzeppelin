async function listAccounts() {
  const accounts = await ethers.provider.listAccounts()
  console.log(accounts)
}

module.exports = listAccounts
