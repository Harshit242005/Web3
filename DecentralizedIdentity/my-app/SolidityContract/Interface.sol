// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    // inital user struct to save on blockchain
    struct User {
        address userAddress;
        string email;
        string username;
        string image;
        string contact;
        string dob;
    }
    // mapping user with the provided address [ private key ]
    mapping(address => User) public users;
    // mapping of private to public key
    mapping(string => string) public privateKeyToPublicKey;


    // adding about the events
    event ImageUpdated(address indexed userAddress, string newImage, bool success);
    event UsernameUpdated(address indexed userAddress, string newUsername, bool success);
    event EmailUpdated(address indexed userAddress, string newEmail, bool success);
    event DOBUpdated(address indexed userAddress, string newDOB, bool success);
    event ContactUpdated(address indexed userAddress, string newContact, bool success);

    function createUser(
        address _userAddress,
        string memory _email,
        string memory _username,
        string memory _image,
        string memory _contact,
        string memory _dob,
        string memory _privateKey
    ) public {
        // Ensure the user doesn't exist already
        require(
            users[_userAddress].userAddress == address(0),
            "User already exists"
        );

        // Ensure the private key is not already associated with a public key
        require(
            bytes(privateKeyToPublicKey[_privateKey]).length == 0,
            "Private key already in use"
        );

        User memory newUser = User({
            userAddress: _userAddress,
            email: _email,
            username: _username,
            image: _image,
            contact: _contact,
            dob: _dob
        });
        // map it up for the user
        users[_userAddress] = newUser;
        // Convert the address to a string
        string memory userAddressStr = addressToString(_userAddress);
        // map the user to string [ string => string ]
        mapPrivateKeyToPublicKey(_privateKey, userAddressStr);
    }

    // Function to convert an address to a string
    function addressToString(
        address _address
    ) internal pure returns (string memory) {
        bytes32 data = bytes32(uint256(uint160(_address)));
        bytes memory bytesString = new bytes(42);

        for (uint256 i = 0; i < 20; i++) {
            bytes1 char = bytes1(bytes32(uint256(data) * 2 ** (8 * i)));
            bytesString[i * 2] = char;
        }

        return string(bytesString);
    }

    function mapPrivateKeyToPublicKey(
        string memory _privateKey,
        string memory _userAddress
    ) public {
        // Ensure the private key is not already associated with a public key
        require(
            bytes(privateKeyToPublicKey[_privateKey]).length == 0,
            "Private key already mapped"
        );

        privateKeyToPublicKey[_privateKey] = _userAddress;
    }

    function getImageByAddress(
        address _userAddress
    ) public view returns (string memory) {
        // Retrieve the image based on the provided Ethereum address
        return users[_userAddress].image;
    }

    function updateImage(address _userAddress, string memory _newImage) public {
        // Update the image for the user
        users[_userAddress].image = _newImage;
        // Emit ImageUpdated event
        emit ImageUpdated(_userAddress, _newImage, true);
    }

    function getUsernameByAddress(
        address _userAddress
    ) public view returns (string memory) {
        // Retrieve the username based on the provided Ethereum address
        return users[_userAddress].username;
    }

    function updateUsername(
        address _userAddress,
        string memory _newUsername
    ) public {
        // Update the username for the user
        users[_userAddress].username = _newUsername;
        // Emit UsernameUpdated event
        emit UsernameUpdated(_userAddress, _newUsername, true);
    }

    function getEmailByAddress(
        address _userAddress
    ) public view returns (string memory) {
        // Retrieve the email based on the provided Ethereum address
        return users[_userAddress].email;
    }

    function updateEmail(address _userAddress, string memory _newEmail) public {
        // Update the email for the user
        users[_userAddress].email = _newEmail;
        // Emit EmailUpdated event
        emit EmailUpdated(_userAddress, _newEmail, true);
    }

    function getDOBByAddress(
        address _userAddress
    ) public view returns (string memory) {
        // Retrieve the date of birth based on the provided Ethereum address
        return users[_userAddress].dob;
    }

    function updateDOB(address _userAddress, string memory _newDOB) public {
        // Update the date of birth for the user
        users[_userAddress].dob = _newDOB;
        // Emit DOBUpdated event
        emit DOBUpdated(_userAddress, _newDOB, true);
    }

    function getContactByAddress(
        address _userAddress
    ) public view returns (string memory) {
        // Retrieve the contact information based on the provided Ethereum address
        return users[_userAddress].contact;
    }

    function updateContact(
        address _userAddress,
        string memory _newContact
    ) public {
        // Update the contact information for the user
        users[_userAddress].contact = _newContact;
        // Emit ContactUpdated event
        emit ContactUpdated(_userAddress, _newContact, true);
    }
}