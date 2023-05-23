// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract NUTS_storage {
  address public owner;
  address[] public authUsers;
  uint256 private important;
  uint256 private index;

  modifier onlyAuthUsers() {
    bool found = false;
    for (index == 0; index < authUsers.length; index++) {
      if (authUsers[index] == tx.origin) {
        found = true;
        // should we have a break here?, I think there is no reason to continue the loop if the flag (found) has been changed
      }
    }
    require(found, "NUTS: User is not authorized!");
    _;
  }

  function addAuthUser(address _authUser) public {
    authUsers.push(_authUser);
  }

  function setImportant(uint256 _important) external onlyAuthUsers {
    important = _important;
  }
}

// setting up hardhat
// playing with the contract =>  // (compile)
// => write tests for this contract (typescript)
