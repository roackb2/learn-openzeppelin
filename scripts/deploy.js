async function deploy() {
  const Box = await ethers.getContractFactory('Box');
  console.log('Deploying our Box...');
  const box = await Box.deploy();
  await box.deployed();
  console.log(`Our box deployed to ${box.address}`);
}

module.exports = deploy
