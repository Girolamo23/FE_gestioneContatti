
var URL_BASE = 'http://ec2-15-161-107-40.eu-south-1.compute.amazonaws.com:';
var PORT_BE = '8080';
var PORT_FE = '8081';

var myApp = angular.module('myApp', ['ngRoute'])

.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: 'contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/add', {
      templateUrl: 'contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: 'contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

.controller('navCtrl', function ($scope, $http) {
  $scope.nav = {
    navItems: ['home'],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function ($scope, ContactService, $http, $window){

 $http({
        method: 'GET',
        url: URL_BASE+PORT_BE+'/api/v1/contatti',
      }).then(function successCallback(response) {
         $scope.contacts = response.data;
      }, function errorCallback(response) {
          //$log.log(response);
          $scope.contacts = ContactService.getContacts();
    });
  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $http({
        method: 'DELETE',
        url: URL_BASE+PORT_BE+'/api/v1/contatti/'+item.id,
      }).then(function successCallback(response) {
         $scope.removed = 'Contatto rimosso correttamente.';
      }, function errorCallback(response) {
         $scope.removed = 'Contatto non rimosso.';
    });
    $window.location = URL_BASE + PORT_FE;
  };


})

.controller('contactInfoCtrl', function ($scope, $routeParams, $http, $window){
  var i = 0;
  while ($scope.contacts[i]) {
      if($scope.contacts[i].id == $routeParams.contact_index){
         $scope.currentContact = $scope.contacts[i]
      }
      i++;
    }
    $http({
          method: 'PUT',
          url: URL_BASE+PORT_BE+'/api/v1/contatti/'+$scope.currentContact.id,
          data: $scope.currentContact
        }).then(
                function successCallback(response) {
                  $scope.contacts.push(contact);
                  $window.location = $window.location = URL_BASE+PORT_FE;
                }, 
                function errorCallback(response) {}
              );


})

.controller('addContactCtrl', function ($scope, $location, $http, $window) {
  $scope.path = $location.path();
  $scope.addContact = function () {
    var contact = $scope.currentContact;

      $http({
              method: 'POST',
              url: URL_BASE +PORT_BE+'/api/v1/contatti',
              data:contact
            }).then(
                    function successCallback(response) {
                      $scope.contacts.push(contact);
                      $window.location = $window.location = URL_BASE+PORT_FE;
                    }, 
                    function errorCallback(response) {}
                  );
  };
  
})

.controller('editContactCtrl', function ($scope, $routeParams, $http){
  var i = 0;
  while ($scope.contacts[i]) {
    if($scope.contacts[i].id == $routeParams.contact_index){
       $scope.currentContact = $scope.contacts[i]
    }
    i++;
  }
  
})

.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'contact.html'
  }
})

.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function () {
      return contactList;
  }

  // contact list, usually would be a separate database
  var contactList = [
    {id: 0, name: 'Girolamo Monaco', email: 'girolamo@gmail.com', phone: '123-456-7890', indirizzo: 'Via Torino 23 Roma', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 1, name: 'Cristoforo Colombo', email: 'Cristoforo@gmail.com', phone: '123-456-7890', indirizzo: 'Viale Sicilia 110 Firenze', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 2, name: 'Dante Alighieri', email: 'Dante@hotmail.it', phone: '123-456-7890', indirizzo: 'Corso Calatafimi 1 Milano', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 3, name: 'Leonardo Da Vinci', email: 'Leonardo@gmail.com', phone: '123-456-7890', indirizzo: 'Viale Rosa 32 Milano', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 4, name: 'Giovanni Falcone', email: 'falcone@hotmail.it', phone: '123-456-7890', indirizzo: 'Via Verde 23 Genova', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 5, name: 'Paolo Borsellino', email: 'Paolo@hotmail.it', phone: '123-456-7890', indirizzo: 'Via Rossi 12 Palermo', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 6, name: 'Emilio Rossi', email: 'emilio@gmail.com', phone: '123-456-7890', indirizzo: 'Via Antica 93 Torino', notes: 'prova della nota', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 7, name: 'Pino Silvestro', email: 'silvestro@hotmail.it', phone: '123-456-7890', indirizzo: 'Via Moderna 56 Milano', notes: 'test test nota', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 8, name: 'Andrea Sommo', email: 'sommo@gmail.com', phone: '123-456-7890', indirizzo: 'Viale Monte Bianco 354 Roma', notes: 'nota nota nota', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 9, name: 'Alfredo Topolino ', email: 'topolino@gmail.com', phone: '123-456-7890', indirizzo: 'Viale Avanti 87 Milano', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 10, name: 'Francesco Papera', email: 'papera@hotmail.it', phone: '123-456-7890', indirizzo: 'Via Indietro 62 Milano', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
    {id: 11, name: 'Giuseppe Colombo', email: 'colombo@gmail.com', phone: '123-456-7890', indirizzo: 'Via Destra 2 Roma', notes: '', latitudine:'45,4773', longitudine:'9,1815'},
  ];
  
  return factory;
}]);

