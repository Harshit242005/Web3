// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Counter {
  uint public counter = 0;

  function increment() public {
    counter += 1;
  }

  function decrement() public {
    counter -= 1;
  }

  function current_value() public view returns  (uint) {
    return counter;
  }

}
