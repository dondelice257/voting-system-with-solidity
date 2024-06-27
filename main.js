const web3 = new Web3(Web3.givenProvider || "http://192.168.0.104:7545");

const MyContract = require("./build/contracts/Voting.json");

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
