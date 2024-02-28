// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity '0.8.21';

/* test contract building for learning how truffle handles these projects */

contract Calculator {
    uint public InitialValue = 0;
    uint max_value = 10;
    int min_value = -1;

    function Increment() public returns (uint) {
        require(InitialValue < max_value, "Maximum value reached");
        InitialValue += 1;
        return InitialValue;
    }

    function Decrement() public returns (uint) {
        require(int(InitialValue) > min_value, "Value can not be less then current value");
        InitialValue -= 1;
        return InitialValue;
    }
}