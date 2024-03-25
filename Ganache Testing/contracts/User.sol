// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {
    struct User {
        string name;
        string phoneNumber;
        string age;
    }
    
    mapping (string => User) public usersMapping;

    function addUser(string calldata gmail, string calldata name, string calldata phoneNumber, string calldata age) public returns (string memory) {
        // Check if the user already exists
        if (bytes(usersMapping[gmail].name).length != 0) {
            // User already exists, return error message
            return "User already exists";
        }
        
        // User does not exist, add the user to the mapping
        usersMapping[gmail] = User(name, phoneNumber, age);
        
        // Return success message
        return "User added successfully";
    }


     function getUser(string calldata gmail) public view returns (string memory, string memory, string memory) {
        // Get user data from the mapping
        User memory user = usersMapping[gmail];
        
        // Return user data
        return (user.name, user.phoneNumber, user.age);
    }
}
