// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalManagement {
    struct Patient {
        uint id;
        string name;
        uint age;
        string medicalHistory;
    }

    struct Doctor {
        uint id;
        string name;
        string specialty;
    }

    mapping(uint => Patient) public patients;
    mapping(uint => Doctor) public doctors;
    mapping(address => bool) public registeredDoctors;

    uint public patientsCount;
    uint public doctorsCount;

    event DoctorAdded(uint id, string name, string specialty);
    event PatientAdded(uint id, string name, uint age, string medicalHistory);

    function addDoctor(string memory _name, string memory _specialty) public {
        doctorsCount++;
        doctors[doctorsCount] = Doctor(doctorsCount, _name, _specialty);
        registeredDoctors[msg.sender] = true;
        emit DoctorAdded(doctorsCount, _name, _specialty);
    }

    function addPatient(string memory _name, uint _age, string memory _medicalHistory) public {
        require(registeredDoctors[msg.sender], "Only registered doctors can add patients");

        patientsCount++;
        patients[patientsCount] = Patient(patientsCount, _name, _age, _medicalHistory);
        emit PatientAdded(patientsCount, _name, _age, _medicalHistory);
    }

    function viewPatient(uint _patientId) public view returns (string memory, uint, string memory) {
        require(_patientId > 0 && _patientId <= patientsCount, "Invalid patient ID");
        
        Patient memory patient = patients[_patientId];
        return (patient.name, patient.age, patient.medicalHistory);
    }
}
