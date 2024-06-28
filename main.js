const web3 = new Web3(Web3.givenProvider || "http://192.168.43.48:7545");

const MyContract = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "CandidateAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
          }
        ],
        "name": "VotedEvent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidates",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "voters",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
          }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
]

const contractAddress = '0x0E9b491f81C22D19EC75aBdAC5235294885D486E'

const contract = new web3.eth.Contract(MyContract, contractAddress);



window.addEventListener('load', async () => {
    const candidatesCount = await contract.methods.candidatesCount().call();
    const candidatesDiv = document.getElementById('candidates');
    for (let i = 1; i <= candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        const candidateElement = document.createElement('div');
        candidateElement.className = 'candidate';
        candidateElement.innerHTML = `ID: ${candidate.id} <br> Name: ${candidate.name} <span>Votes: ${candidate.voteCount}</span>`;
        candidatesDiv.appendChild(candidateElement);
    }
});

async function vote() {
    const accounts = await web3.eth.getAccounts();
    const candidateId = document.getElementById('candidateId').value;
    try {
        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        alert('Vote cast successfully!');
        window.location.reload(); // Refresh the page to show updated vote counts
    } catch (error) {
        alert('Error voting: ' + error.message);
    }
}
