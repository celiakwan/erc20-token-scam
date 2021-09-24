const hre = require('hardhat');

const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const Token = await hre.ethers.getContractFactory('Token');
  const token = await Token.deploy(100000000000);
  console.log('Contract deployed to address:', token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
