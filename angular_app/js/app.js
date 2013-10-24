var ticketApp = angular.module('ticketApp', []);

ticketApp.factory('TicketList', function(){
  var TicketList = {};
  TicketList.tickets = [{
    name: "Write the presentation",
    priority: 1,
  },
  { name: "Write the demo app",
    priority: 2
  },
  { name: "Give the presentation",
    priority: 2
  },
  { name: "Understand what I'm talking about",
    priority: 5
  }
  ];
  return TicketList;
})

function TicketsController($scope, TicketList) {
  $scope.tickets = TicketList.tickets;
}
