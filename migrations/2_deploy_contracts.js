const Voting = artifacts.require("Voting");

export default function (deployer) {
    deployer.deploy(Voting);
};
