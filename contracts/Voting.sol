// SPDX-License-Identifier: NO LICENCE
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    mapping(address => Voter) public voters;
    Proposal[] public proposals;
    uint private winningProposalId; 

    bool public freeProposals = true;

    event VoterRegistered(address indexed voterAddress);
    event WorkflowStatusChange(WorkflowStatus indexed previousStatus, WorkflowStatus indexed newStatus);
    event ProposalRegistered(uint indexed proposalId);
    event Voted(address indexed voter, uint indexed proposalId);

    constructor(address initialOwner) Ownable(initialOwner) {
        workflowStatus = WorkflowStatus.RegisteringVoters;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.RegisteringVoters);
    }

    modifier onlyDuringStatus(WorkflowStatus _status) {
        require(workflowStatus == _status, "Invalid workflow status for this operation");
        _;
    }

    function startProposalsRegistration() external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    function endProposalsRegistration() external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    function startVotingSession() external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationEnded) {
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    function endVotingSession() external onlyOwner onlyDuringStatus(WorkflowStatus.VotingSessionStarted) {
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    function tallyVotes() external onlyOwner onlyDuringStatus(WorkflowStatus.VotingSessionEnded) {
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);

        // Determine the winning proposal
        winningProposalId = getWinnerInternal(); 
    }

    function registerVoter(address _voterAddress) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        require(!voters[_voterAddress].isRegistered, "Voter already registered");
        voters[_voterAddress].isRegistered = true;
        emit VoterRegistered(_voterAddress);
    }

    function registerProposal(string memory _description) external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposals.length - 1);
    }

    function votersProposal(string memory _description) external onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        require(voters[msg.sender].isRegistered, "Sender is not a registered voter");
        require(freeProposals, "Voters doesn't have the choice");
        proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposals.length - 1);
    }

    function vote(uint _proposalId) external onlyDuringStatus(WorkflowStatus.VotingSessionStarted) {
        require(voters[msg.sender].isRegistered, "Sender is not a registered voter");
        require(!voters[msg.sender].hasVoted, "Sender has already voted");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalId;
        proposals[_proposalId].voteCount++;

        emit Voted(msg.sender, _proposalId);
    }

    function getWinner() public view returns (uint) {
        return winningProposalId;
    }

    function getWinnerInternal() internal view returns (uint) {
        uint _winningProposalId = 0;
        uint winningVoteCount = 0;

        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                _winningProposalId = i;
            }
        }

        return _winningProposalId;
    }

    function unregisterVoter(address _voterAddress) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        require(voters[_voterAddress].isRegistered, "Voter not registered");
        delete voters[_voterAddress];
        emit VoterRegistered(_voterAddress);
    }

    function setFreeProposals(bool state) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters){
        freeProposals = state;
    }
}
