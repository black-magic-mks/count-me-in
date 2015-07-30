angular.module('app')
.controller('authController', function($scope, $rootScope, $state, authFactory) {
  $scope.user = {};
  $scope.passwordValidation = /.*(\d(?=.*[A-Z])|[A-Z](?=.*\d)).*/;
  angular.extend($scope, authFactory);
})

