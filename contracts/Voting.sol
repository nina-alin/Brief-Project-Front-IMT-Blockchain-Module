// SPDX-License-Identifier: NO LICENSE
// pragma solidity version >=0.8.2 <0.9.0;

// Importation du contrat Ownable depuis OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @dev Contrat de vote permettant l'enregistrement des électeurs, la soumission de propositions,
 *      le déroulement des sessions de vote et le décompte des votes.
 */
contract Voting is Ownable {
    // Définition des états du workflow
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    // État actuel du workflow
    WorkflowStatus public workflowStatus;

    // Structure représentant un électeur
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    // Structure représentant une proposition
    struct Proposal {
        string description;
        uint voteCount;
    }

    // Mappage des électeurs
    mapping(address => Voter) public voters;

    // Tableau des propositions
    Proposal[] public proposals;

    // Identifiant de la proposition gagnante
    uint private winningProposalId;

    // Indicateur permettant aux électeurs de soumettre des propositions libres
    bool public freeProposals = true;

    // Événements émis lors des actions importantes
    event VoterRegistered(address indexed voterAddress);
    event WorkflowStatusChange(WorkflowStatus indexed previousStatus, WorkflowStatus indexed newStatus);
    event ProposalRegistered(uint indexed proposalId);
    event Voted(address indexed voter, uint indexed proposalId);

    /**
     * @dev Constructeur du contrat.
     * @param initialOwner Adresse initiale du propriétaire du contrat.
     */
    constructor(address initialOwner) Ownable(initialOwner) {
        workflowStatus = WorkflowStatus.RegisteringVoters;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.RegisteringVoters);
    }

    /**
     * @dev Modificateur qui permet l'exécution d'une fonction uniquement pendant un état donné du workflow.
     */
    modifier onlyDuringStatus(WorkflowStatus _status) {
        require(workflowStatus == _status, "Invalid workflow status for this operation");
        _;
    }

    /**
     * @dev Démarre l'enregistrement des propositions.
     */
    function startProposalsRegistration() external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
     * @dev Met fin à l'enregistrement des propositions.
     */
    function endProposalsRegistration() external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
     * @dev Démarre la session de vote.
     */
    function startVotingSession() external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationEnded) {
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
     * @dev Met fin à la session de vote.
     */
    function endVotingSession() external onlyOwner onlyDuringStatus(WorkflowStatus.VotingSessionStarted) {
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
     * @dev Effectue le décompte des votes et détermine la proposition gagnante.
     */
    function tallyVotes() external onlyOwner onlyDuringStatus(WorkflowStatus.VotingSessionEnded) {
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);

        // Détermine la proposition gagnante
        winningProposalId = getWinnerInternal(); 
    }

    /**
     * @dev Enregistre un électeur.
     * @param _voterAddress Adresse de l'électeur à enregistrer.
     */
    function registerVoter(address _voterAddress) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        require(!voters[_voterAddress].isRegistered, "Voter already registered");
        voters[_voterAddress].isRegistered = true;
        emit VoterRegistered(_voterAddress);
    }

    /**
     * @dev Enregistre une proposition.
     * @param _description Description de la proposition.
     */
    function registerProposal(string memory _description) external onlyOwner onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposals.length - 1);
    }

    /**
     * @dev Permet aux électeurs de soumettre des propositions.
     * @param _description Description de la proposition.
     */
    function votersProposal(string memory _description) external onlyDuringStatus(WorkflowStatus.ProposalsRegistrationStarted) {
        require(voters[msg.sender].isRegistered, "Sender is not a registered voter");
        require(freeProposals, "Voters doesn't have the choice");
        proposals.push(Proposal(_description, 0));
        emit ProposalRegistered(proposals.length - 1);
    }

    /**
     * @dev Permet à un électeur de voter pour une proposition.
     * @param _proposalId Identifiant de la proposition pour laquelle voter.
     */
    function vote(uint _proposalId) external onlyDuringStatus(WorkflowStatus.VotingSessionStarted) {
        require(voters[msg.sender].isRegistered, "Sender is not a registered voter");
        require(!voters[msg.sender].hasVoted, "Sender has already voted");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalId;
        proposals[_proposalId].voteCount++;

        emit Voted(msg.sender, _proposalId);
    }

    /**
     * @dev Obtenir l'identifiant de la proposition gagnante.
     */
    function getWinner() public view returns (uint) {
        return winningProposalId;
    }

    /**
     * @dev Fonction interne pour déterminer la proposition gagnante.
     */
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

    /**
     * @dev Désenregistre un électeur.
     * @param _voterAddress Adresse de l'électeur à désenregistrer.
     */
    function unregisterVoter(address _voterAddress) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters) {
        require(voters[_voterAddress].isRegistered, "Voter not registered");
        delete voters[_voterAddress];
        emit VoterRegistered(_voterAddress);
    }

    /**
     * @dev Définit l'indicateur permettant ou non aux électeurs de soumettre des propositions.
     * @param state Nouvel état de l'indicateur.
     */
    function setFreeProposals(bool state) external onlyOwner onlyDuringStatus(WorkflowStatus.RegisteringVoters){
        freeProposals = state;
    }
}
