// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BusTicketBooking {
    struct BusRoute {
        uint id;
        string departure;
        string destination;
        uint departureTime;
        uint ticketPrice;
        uint ticketsAvailable;
    }

    struct Ticket {
        uint id;
        uint routeId;
        address owner;
    }

    mapping(uint => BusRoute) public routes;
    mapping(uint => Ticket) public tickets;
    mapping(address => uint[]) public userTickets;
    
    uint public routeCount;
    uint public ticketCount;

    event RouteCreated(uint id, string departure, string destination, uint departureTime, uint ticketPrice, uint ticketsAvailable);
    event TicketPurchased(uint ticketId, uint routeId, address owner);

    function createRoute(string memory _departure, string memory _destination, uint _departureTime, uint _ticketPrice, uint _ticketsAvailable) public {
        routeCount++;
        routes[routeCount] = BusRoute(routeCount, _departure, _destination, _departureTime, _ticketPrice, _ticketsAvailable);
        emit RouteCreated(routeCount, _departure, _destination, _departureTime, _ticketPrice, _ticketsAvailable);
    }

    function bookTicket(uint _routeId) public payable {
        BusRoute storage route = routes[_routeId];
        require(route.id != 0, "Route does not exist");
        require(route.departureTime > block.timestamp, "Route has already departed");
        require(msg.value == route.ticketPrice, "Incorrect ticket price");
        require(route.ticketsAvailable > 0, "No tickets available");

        route.ticketsAvailable--;
        ticketCount++;
        tickets[ticketCount] = Ticket(ticketCount, _routeId, msg.sender);
        userTickets[msg.sender].push(ticketCount);

        emit TicketPurchased(ticketCount, _routeId, msg.sender);
    }

    function getTickets(address _owner) public view returns (uint[] memory) {
        return userTickets[_owner];
    }
}
