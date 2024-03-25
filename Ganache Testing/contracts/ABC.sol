// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ABC {
    uint public value;

    constructor(uint initialValue) {
        value = initialValue;
    }

    function setValue(uint newValue) public {
        value = newValue;
    }
}