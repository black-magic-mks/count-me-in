angular.module('app')

.controller('UserController', function($scope) {
  $scope.username = 'monica';
  console.log($scope.username);
});