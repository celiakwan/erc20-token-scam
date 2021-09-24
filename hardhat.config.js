require('@nomiclabs/hardhat-ethers');

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './dapp/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
