const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const contractABI = [

    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "name": "votedEvent",
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
    // Paste the ABI generated by Truffle here
];

const contractAddress = '0xAF03DA502C682194b49028819d984b2A2F35F876'

const contract = new web3.eth.Contract(contractABI, contractAddress);



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