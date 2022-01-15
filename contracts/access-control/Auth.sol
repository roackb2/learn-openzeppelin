// contracts/access-control/Auth.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
  address private _adminiistrator;

  constructor(address deployer) {
    _adminiistrator = deployer;
  }

  function isAdministrator(address user) public view returns (bool)  {
    return user == _adminiistrator;
  }
}