// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    address public deployerAddress;

    // Constructor to set deployer address during contract deployment
    constructor() {
        deployerAddress = msg.sender;
    }

    // function to get the deployed address
    function getDeployedContractAddress() public view returns (address) {
        return deployerAddress;
    }

    uint256 public AAP;
    uint256 public BJP;
    uint256 public CONGRESS;

    bool public showResult = false;

    mapping(address => bool) public hasVoted;

    function getVotingStatus(address _voter) public view returns (bool) {
        return hasVoted[_voter];
    }

    struct User {
        string name;
        string email;
        string phoneNumber;
        string dob;
    }

    User[] public aapVotes;
    User[] public bjpVotes;
    User[] public congressVotes;

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    function voteAAP(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        string memory _dob
    ) public hasNotVoted returns (bool) {
        AAP++;
        User memory newUser = User(
            _name,
            _email,
            _phoneNumber,
            _dob
        );
        aapVotes.push(newUser);
        hasVoted[msg.sender] = true;

        return true; // Vote successful
    }

    function voteBJP(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        string memory _dob
    ) public hasNotVoted returns (bool) {
        BJP++;
        User memory newUser = User(
            _name,
            _email,
            _phoneNumber,
            _dob
        );
        bjpVotes.push(newUser);
        hasVoted[msg.sender] = true;

        return true; // Vote successful
    }

    function voteCONGRESS(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        string memory _dob
    ) public hasNotVoted returns (bool) {
        CONGRESS++;
        User memory newUser = User(
            _name,
            _email,
            _phoneNumber,
            _dob
        );
        congressVotes.push(newUser);
        hasVoted[msg.sender] = true;

        return true; // Vote successful
    }

    function getVotes()
        public
        view
        returns (User[] memory, User[] memory, User[] memory)
    {
        require(msg.sender == deployerAddress, "You are not authorized");
        return (aapVotes, bjpVotes, congressVotes);
    }

    function activateResult() public {
        require(
            msg.sender == deployerAddress,
            "Election result can only be activated by committee"
        );
        showResult = true;
    }

    function getElectionResult() public view returns (string memory) {
        if (!showResult) {
            return "Results are not accounted yet";
        }

        if (AAP > BJP && AAP > CONGRESS) {
            return "AAP";
        } else if (BJP > AAP && BJP > CONGRESS) {
            return "BJP";
        } else if (CONGRESS > AAP && CONGRESS > BJP) {
            return "CONGRESS";
        } else {
            // In case of a tie or all parties have 0 votes
            return "No clear winner";
        }
    }
}
