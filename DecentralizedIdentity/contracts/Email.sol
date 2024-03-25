// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmailVerification {
    // Mapping to save the relationship between private key and email
    mapping(string => string) public SaveEmail;

    // Mapping to save the relationship between email and private key
    mapping(string => string) public CheckEmail;

    // Function to initialize the CheckEmail mapping
    function InitialCheckEmailMapping(string memory email) public view returns (bool) {
        // Check if the email exists in the CheckEmail mapping
        return bytes(CheckEmail[email]).length > 0;
    }

    // Function to check if private key exists in SaveEmail mapping and return associated email
    function FinalCheckEmailMapping(string memory privateKey) public view returns (string memory) {
        // Check if the private key exists in the SaveEmail mapping
        return SaveEmail[privateKey];
    }

    // Function to save the email and private key
    function SaveEmailMapping(string memory privateKey, string memory email) public {
        // Save the mapping in SaveEmail
        SaveEmail[privateKey] = email;

        // Save the mapping in CheckEmail
        CheckEmail[email] = privateKey;
    }
}
