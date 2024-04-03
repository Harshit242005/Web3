// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string userAddress; // Change the data type from address to string
        string email;
        string username;
        string contact;
        string dob;
        string cid;
    }

    mapping(string => User) public users; // Change the mapping key to string
    mapping(string => string) public privateKeyToPublicKey;

    event UsernameUpdated(string indexed userAddress, string newUsername, bool success);
    event EmailUpdated(string indexed userAddress, string newEmail, bool success);
    event DOBUpdated(string indexed userAddress, string newDOB, bool success);
    event ContactUpdated(string indexed userAddress, string newContact, bool success);
    event CidUpdated(string indexed userAddress, string newCid, bool success);
    
    
    function createUser(
        string memory _userAddress,
        string memory _email,
        string memory _username,
        string memory _contact,
        string memory _dob,
        string memory _privateKey,
        string memory _cid
    ) public {
        require(bytes(users[_userAddress].userAddress).length == 0, "User already exists");
        require(bytes(privateKeyToPublicKey[_privateKey]).length == 0, "Private key already in use");

        User memory newUser = User({
            userAddress: _userAddress,
            email: _email,
            username: _username,
            contact: _contact,
            dob: _dob,
            cid: _cid
        });

        users[_userAddress] = newUser;
        mapPrivateKeyToPublicKey(_privateKey, _userAddress);
    }

    function mapPrivateKeyToPublicKey(
        string memory _privateKey,
        string memory _userAddress
    ) public {
        require(bytes(privateKeyToPublicKey[_privateKey]).length == 0, "Private key already mapped");
        privateKeyToPublicKey[_privateKey] = _userAddress;
    }

    function getUsernameByAddress(
        string memory _userAddress
    ) public view returns (string memory) {
        return users[_userAddress].username;
    }

    function updateUsername(
        string memory _userAddress,
        string memory _newUsername
    ) public {
        users[_userAddress].username = _newUsername;
        emit UsernameUpdated(_userAddress, _newUsername, true);
    }

    // get the cid for the user
    function getCidByAddress(string memory _userAddress) public view returns (string memory) {
        return users[_userAddress].cid;
    }

    // function to update the cid of the user with new cid
    function updateCid(string memory _userAddress, string memory _newCid) public {
        users[_userAddress].cid = _newCid;
        // emit a event to retify the correction of the update of the cid
        emit CidUpdated(_userAddress, _newCid, true);
    }

    function getEmailByAddress(
        string memory _userAddress
    ) public view returns (string memory) {
        return users[_userAddress].email;
    }

    function updateEmail(string memory _userAddress, string memory _newEmail) public {
        users[_userAddress].email = _newEmail;
        emit EmailUpdated(_userAddress, _newEmail, true);
    }

    function getDOBByAddress(
        string memory _userAddress
    ) public view returns (string memory) {
        return users[_userAddress].dob;
    }

    function updateDOB(string memory _userAddress, string memory _newDOB) public {
        users[_userAddress].dob = _newDOB;
        emit DOBUpdated(_userAddress, _newDOB, true);
    }

    function getContactByAddress(
        string memory _userAddress
    ) public view returns (string memory) {
        return users[_userAddress].contact;
    }

    function updateContact(
        string memory _userAddress,
        string memory _newContact
    ) public {
        users[_userAddress].contact = _newContact;
        emit ContactUpdated(_userAddress, _newContact, true);
    }
}
