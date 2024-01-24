// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Voting {
    struct User {
        string name;
        string email;
        string phoneNumber;
        uint256 age;
        string gender;
        string location;
    }

    mapping(address => User) public users; // Mapping to store user data based on Ethereum addresses
    mapping(string => bytes32) public userPasswords; // Mapping to store passwords based on usernames

    event UserRegistered(
        address indexed userAddress,
        string name,
        string email
    );
    event UserPasswordSet(string indexed username);
    event RegistrationStatusInitialStatus(
        address indexed userAddress,
        bool isRegistered
    );
    event RegistrationStatusFinalStatus(
        address indexed userAddress,
        bool isRegistered
    );
    event UserLoginAttempt(address indexed userAddress, bool loginSuccess);
    event SuccessfulLogin(
        address indexed userAddress,
        string name,
        string email,
        string phoneNumber,
        uint256 age,
        string gender,
        string location
    );

    function registerUser(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        uint256 _age,
        string memory _gender,
        string memory _location
    ) public {
        User memory newUser = User({
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            age: _age,
            gender: _gender,
            location: _location
        });

        // Map the user data to the sender's address
        users[msg.sender] = newUser;

        // Emit an event for user registration
        emit UserRegistered(msg.sender, _name, _email);

        // Notify user registration status
        emit RegistrationStatusInitialStatus(msg.sender, true);
    }

    function setUserPassword(string memory _password) public {
        // Retrieve the username from the first mapping based on msg.sender
        string memory username = users[msg.sender].name;

        // Hash the provided password using keccak256
        bytes32 hashedPassword = keccak256(abi.encodePacked(_password));

        // Map the username to the password
        userPasswords[username] = hashedPassword;

        // Emit an event for setting the user password
        emit UserPasswordSet(username);

        // Notify user registration status
        emit RegistrationStatusFinalStatus(
            msg.sender,
            bytes(users[msg.sender].name).length != 0
        );
    }

    function getUserPassword(string memory _username) public view returns (bytes32) {
        return userPasswords[_username];
    }

    function loginUser(string memory _password) public returns (string memory) {
        // Retrieve the stored password using the getUserPassword function
        bytes32 storedPassword = getUserPassword(users[msg.sender].name);
        // Check if the stored password matches the provided password
        bool loginSuccess = storedPassword == keccak256(abi.encodePacked(_password));
        // Emit an event indicating the login attempt
        emit UserLoginAttempt(msg.sender, loginSuccess);
        // Return the JSON representation of the User struct
        if (loginSuccess) {
            emit SuccessfulLogin(
                msg.sender,
                users[msg.sender].name,
                users[msg.sender].email,
                users[msg.sender].phoneNumber,
                users[msg.sender].age,
                users[msg.sender].gender,
                users[msg.sender].location
            );
            return "Login successful";
        } else {
            return "{}"; // Return an empty JSON object if login is not successful
        }
    }
}
