async function deployBox() {
  const Box = await ethers.getContractFactory('Box');
  console.log('Deploying our Box...');
  const box = await Box.deploy();
  await box.deployed();
  console.log(`Our box deployed to ${box.address}`);
}

async function deployCoin() {
  const Coin = await ethers.getContractFactory('Coin');
  console.log('Deploying Coin contract...');
  const coin = await Coin.deploy();
  await coin.deployed();
  console.log(`Coin contract deployed to ${coin.address}`);
}

module.exports = {
  deployBox,
  deployCoin
}
