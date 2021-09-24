// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint _totalSupply) ERC20("Toxic", "TOX") {
        _mint(msg.sender, _totalSupply);
    }
}