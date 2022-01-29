async function deploy(name, ...args) {
  const Contract = await ethers.getContractFactory(name);
  console.log(`Deploying ${name} contract with args ${args}...`);
  const contract = await Contract.deploy(...args);
  await contract.deployed();
  console.log(`${name} contract deployed to ${contract.address}`);
}

async function deployBox() {
  await deploy('Box')
}

async function deployCoin() {
  await deploy('Coin')
}

async function deploySimpleAuction(args) {
  const { biddingTime, beneficiary } = args
  await deploy('SimpleAuction', biddingTime, beneficiary)
}

async function deployBlindAuction(args) {
  await deploy('BlindAuction', ...args)
}

module.exports = {
  deployBox,
  deployCoin,
  deploySimpleAuction,
  deployBlindAuction
}
